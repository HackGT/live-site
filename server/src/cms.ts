const fetch = require('node-fetch');
import { User } from "entity/User";
import { IInteraction, Interaction, IInteractionInstance } from "./entity/Interaction";
import { createNew} from "./entity/database";
import e from "express";
import moment from "moment-timezone";


export interface ICMSEvent {
    id: string
    name: string
    startDate: string
    endDate: string
    type: {
        name: string
        points: number
    }
    url: string
}

const query = `
    query eventData($id: ID!) {
        Event(where: { id: $id }) {
            id
            name
            startDate
            endDate
            type {
                name
                points
            }
            url
        }
    }
`;

export const getCMSEvent = async (eventId) => {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    const variables = {
        "id": eventId
    }

    const res = await fetch(process.env.CMS_URL || "https://cms.hack.gt/admin/api", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    });

    const data = await res.json();

    return data.data?.Event as ICMSEvent | null;
}
export const getEndedEvents = async(minInterval) =>  {
    var curr  = new Date(); // this is the sample event ive been working with later on change this to new Date()
    var prev = new Date(curr.getTime() - minInterval * 60000);
    const queryEndEvents = 
        `query {
            allEvents  (where: {AND:[
              {endDate_gte: "${prev.toISOString()}"},
              {endDate_lte: "${curr.toISOString()}"}
            ]}, orderBy: "startDate") {
              name
              endTime
              endDate
              startTime
              startDate
              url
              id
            }
        }
    `;

    const res = await fetch(process.env.CMS_URL , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            query: queryEndEvents,
        })
    });

    // then get the most relevant events
    const cmsData = await res.json();
    const allEvents = cmsData.data?.allEvents;
    console.log(cmsData, allEvents)
    var i = 0
    while(allEvents.length > i) {
        let meetingurl = allEvents[i].url
        let id = meetingurl.split("/").slice(-1)[0];
        var url = "https://api.daily.co/v1/meetings/" + '?room=' + id;
        const meetingInfo = await fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + String(process.env.DAILY_KEY)
            }
        });

        const dailySessionInfo = await meetingInfo.json();
        const sessionInfo =  dailySessionInfo.data[0]; // we only want to check the lastest session for every room 
        const participants = sessionInfo.participants;
        let map = new Map();
        
        const startTime = moment(allEvents[i].startDate).tz("America/New_York");
        const endTime = moment(allEvents[i].endDate).tz("America/New_York");
        console.log(participants[0].join_time*1000)
        console.log(startTime.diff(moment(participants[0].join_time)))
        console.log('LKSJFLKDSJFLKDSJFLSDKFJ', dailySessionInfo)
        for(var j = 0; j < participants.length; j++) {
            let js_jointime = new Date(participants[j].join_time*1000)
            let js_endtime = new Date((participants[j].join_time+ participants[j].duration)*1000)
            let js_duration;
            if (moment(js_endtime).tz("America/New_York").diff(startTime, "seconds") < 0) {
                js_duration = 0
            } else {
                // js_duration = moment(js_jointime).tz("America/New_York").diff(startTime, "seconds") 
                js_duration = startTime.diff(moment(js_jointime).tz("America/New_York"), "seconds") 
                if (js_duration > 0) {
                    js_duration = participants[j].duration - js_duration
                } else {
                    js_duration = participants[j].duration
                }
            }

            if (moment(js_jointime).tz("America/New_York").diff(endTime, "seconds") > 0) {
                js_duration = 0
            } else {
                let js_duration_end = moment(js_endtime).tz("America/New_York").diff(endTime, "seconds") 
                if (js_duration > 0) {
                    js_duration = js_duration - js_duration_end
            }

            if(map.has(participants[j].user_id)) { // update the duration
                var current = map.get(participants[j].user_id);
                current.virtualDuration += js_duration;
                current.instances.push({
                    timeIn: js_jointime,
                    timeOut: js_endtime,
                    eventType: 'virtual' 
                })
            } else {
                let interaction = await Interaction.findOne({uuid: participants[j].user_id, 
                    eventID: allEvents[i].id })
                if (!interaction) {
                    interaction = createNew(Interaction, {
                        uuid: participants[j].user_id,
                        eventID: allEvents[i].id,
                        instances: [{
                            timeIn: js_jointime,
                            timeOut: js_endtime,
                            eventType: 'virtual'
                        } as IInteractionInstance],
                        virtualDuration: js_duration
                    })
                } else {
                    interaction.instances = [{
                        timeIn: js_jointime,
                        timeOut: js_endtime,
                        eventType: 'virtual'
                    } as IInteractionInstance]
                    interaction.virtualDuration =  js_duration
                }
                map.set(participants[j].user_id, interaction);
            }
        }

        map.forEach((value)=> {
            value.virtualDuration = Math.min(value.virtualDuration, endTime.diff(startTime, "seconds"))
            // console.log(value)
            value.save()
        })
        i++
    }
}
