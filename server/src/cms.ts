import { User } from "entity/User";
const fetch = require('node-fetch');
import { IInteraction, Interaction, IInteractionInstance } from "./entity/Interaction";
import { createNew} from "./entity/database";
import e from "express";

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
    var curr  = new Date("2021-09-29T06:45:00.000Z"); // this is the sample event ive been working with later on change this to new Date()
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
    var i = 0
    while(allEvents.length > i) {
        var url = process.env.DAILY_URL + '?room=' + allEvents[i].id;
        console.log(url)
        const meetingInfo = await fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + String(process.env.DAILY_KEY)
            }
        });

        const dailySessionInfo = await meetingInfo.json();
        const sessionInfo =  dailySessionInfo.data[0]; // we only want to check the first session for every room 
        const participants = sessionInfo.participants;
        let map = new Map();
        
        for(var j = 0; j < participants.length; j++) {
            if(map.has(participants[j].user_name)) { // update the duration
                var current = map.get(participants[j].user_name);
                current.virtualDuration += participants[j].duration;
                current.instances.push({
                    timeIn: participants[j].join_time,
                    timeOut: participants[j].join_time + participants[j].duration,
                    eventType: 'virtual' 
                })
                
            } else {
                map.set(participants[j].user_name, createNew(Interaction, {
                    uuid: participants[j].user_name,
                    eventID: allEvents[i].id,
                    instances: [{
                        timeIn: participants[j].join_time,
                        timeOut: participants[j].join_time + participants[j].duration,
                        eventType: 'virtual'
                    } as IInteractionInstance],
                    virtualDuration: participants[j].duration
                }));
            }
        }
        map.forEach((value)=> {
            console.log(value)
            // value.save()
        })
        i++
    }
}

