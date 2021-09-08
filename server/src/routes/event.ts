import express from "express"
import { getCMSEvent } from "../cms"
import { createNew} from "../entity/database";
import { IUser, User} from "../entity/User"
import { IInteraction, Interaction, IInteractionInstance} from "../entity/Interaction"

import moment from "moment-timezone";
import dotenv from "dotenv"

dotenv.config();

const fetch = require('node-fetch');

export let eventRoutes = express.Router();

eventRoutes.route("/inpersonInteraction").post(async (req, res) => {
    const user = await User.findById(req.body.uuid);
    const event = await getCMSEvent(req.body.eventID);
    if (event && user) {
        const startTime = moment(event.startDate).tz("America/New_York");
        const endTime = moment(event.endDate).tz("America/New_York");
        const now = moment.utc().tz("America/New_York");
        console.log(process.env.TZ)
        const differenceStart = startTime.diff(now, "minutes");
        const differenceStartSeconds = startTime.diff(now, "seconds");
        const differenceEnd = endTime.diff(now, "minutes");
        const differenceOpen = startTime.diff(now,"minutes")-10;
        const differenceOpenSeconds = startTime.diff(now, "seconds")-60*10;

        //console.log('start time:', startTime,event.startDate, endTime, event.endDate, now, UNSAFE_toUTC(event.startDate), UNSAFE_toUTC(event.endDate))
        console.log(startTime, endTime, differenceStart, differenceEnd)
        let eventInSession = differenceEnd >= -10 && differenceStart <= 10;
        let interaction = await Interaction.findOne({uuid: req.body.uuid, eventID: req.body.eventID })
        if (interaction) {
            interaction.instances?.push({
                timeIn: now.toDate(),
                timeOut: undefined,
                eventType: 'inperson'
            }  as IInteractionInstance)
            await interaction.save()
        } else {
            interaction = createNew(Interaction, {
                uuid: req.body.uuid,
                eventID: req.body.eventID,
                instances: [{
                    timeIn: now.toDate(),
                    timeOut: undefined,
                    eventType: 'inperson'
                }  as IInteractionInstance],
                employees: req.body.employees.map(employee => ({
                    uuid: employee.uuid,
                    name: employee.name,
                    email: employee.email
                }))
            });
            await interaction.save()
        }
        let status= "";
        let timebeforestart = {
            hours:0,
            minutes:0,
            seconds:0
        }
        if (differenceEnd<-10) {
            status= "eventEnded";
        } else if (eventInSession) {
            status="eventInSession";
        } else if (differenceStart <60*24){
            status= "eventWithin24Hours";
            timebeforestart.hours = Math.floor(differenceOpen / 60);
            timebeforestart.minutes = differenceOpen % 60
            timebeforestart.seconds = differenceOpenSeconds % 60

//             timebeforestart.hours = Math.floor(differenceStart / 60);
//             timebeforestart.minutes = differenceStart % 60
//             timebeforestart.seconds = differenceStartSeconds % 60
        } else {
            status = "eventNotWithin24Hours"
        }
        return res.send({'status': status})

        // if(event.url && status==="eventInSession")
        //     return res.send({"name":event.name, "url": event.url, "timebeforestart":timebeforestart, "status": status})
        // else if (event.url) {
        //     return res.send({"name":event.name,  "timebeforestart":timebeforestart, "status": status})
        // } else {
        //     return res.status(400).send('no link')
        // }
    } else {
        return res.status(400).send("Invalid request"); 
    }
        // return res.send(event)
})

eventRoutes.route("/updateEnd").post(async (req, res) => {
    let data = req.body;
    const reqUser = req.user as IUser;
    const user = await User.findById(reqUser._id);
    let interaction = await Interaction.findOne({uuid: reqUser._id.toHexString(), eventID: req.body.eventID })
    if (!interaction) {
        return res.status(400).send('User never attended meeting to begin with')
    } else if (interaction.instances){
        let latestPair = interaction.instances[interaction.instances.length - 1]
        if (latestPair.timeOut) {
            return res.status(400).send('End already recorded')
        } else {
            latestPair.timeOut = new Date()
        }
    }
    return res.status(200).send("updated the end time");
})


eventRoutes.route("/virtualInteraction/:getEventID").get(async (req, res) => {
    const reqUser = req.user as IUser;
    const user = await User.findById(reqUser._id);

    const event = await getCMSEvent(req.params.getEventID);
    if (event && user && req.user) {
        
        const startTime = moment(event.startDate).tz("America/New_York");
        const endTime = moment(event.endDate).tz("America/New_York");
        const now = moment.utc().tz("America/New_York");
        console.log(process.env.TZ)
        const differenceStart = startTime.diff(now, "minutes");
        const differenceStartSeconds = startTime.diff(now, "seconds");
        const differenceEnd = endTime.diff(now, "minutes");
        const differenceOpen = startTime.diff(now,"minutes")-10;
        const differenceOpenSeconds = startTime.diff(now, "seconds")-60*10;
        console.log(`differenceOpen ${differenceOpen}`);
        console.log(`differenceEnd ${differenceEnd}`);
        console.log(`differenceStart ${differenceStart}`);
        console.log(`differenceOpenSeconds ${differenceOpenSeconds}`);
        console.log(`differenceStartSeconds ${differenceStartSeconds}`);

        //console.log('start time:', startTime,event.startDate, endTime, event.endDate, now, UNSAFE_toUTC(event.startDate), UNSAFE_toUTC(event.endDate))
        console.log(startTime, endTime, differenceStart, differenceEnd)
        let eventInSession = differenceEnd >= -10 && differenceStart <= 10;
        let interaction = await Interaction.findOne({uuid: reqUser._id.toHexString(), eventID: req.params.getEventID })
        console.log(interaction)
        if (interaction && interaction.instances) {
            if (interaction.instances[interaction.instances?.length - 1].timeOut!==undefined) {
                interaction.instances?.push({
                    timeIn: now.toDate(),
                    timeOut: undefined,
                    eventType: 'virtual'
                } as IInteractionInstance)
                await interaction.save();
            }
        } else {
            console.log('here boi')
            interaction = createNew(Interaction, {
                uuid: reqUser._id.toHexString(),
                eventID: event.id,
                instances: [{
                    timeIn: now.toDate(),
                    timeOut: undefined,
                    eventType: 'virtual'
                } as IInteractionInstance] 
            });
            await interaction.save();
        }
        let status= "";
        let timebeforestart = {
            hours:0,
            minutes:0,
            seconds:0
        }
        if (differenceEnd<-10) {
            status= "eventEnded";
        } else if (eventInSession) {
            status="eventInSession";
        } else if (differenceStart <60*24){
            status= "eventWithin24Hours";
            timebeforestart.hours = Math.floor(differenceOpen / 60);
            timebeforestart.minutes = differenceOpen % 60
            timebeforestart.seconds = differenceOpenSeconds % 60
//             timebeforestart.hours = Math.floor(differenceStart / 60);
//             timebeforestart.minutes = differenceStart % 60
//             timebeforestart.seconds = differenceStartSeconds % 60
        } else {
            status = "eventNotWithin24Hours"
        }
        if (event.url && event.url.includes("daily") && status==="eventInSession") {
            const fetch_url = 'https://api.daily.co/v1/meeting-tokens';
            const room_name = event.url.split('/')[event.url.split('/').length-1];
            const options = {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + String(process.env.DAILY_KEY)
                },
                body: JSON.stringify({properties: {room_name: room_name, is_owner: false, user_name: reqUser.name, user_id: reqUser._id.toHexString()}})
              };
              const response = await fetch(fetch_url, options)
                .then(res => res.json())
                .catch(err => console.error('error:' + err));
            return res.send({"name":event.name, "url": event.url + "?t=" + response.token, "timebeforestart":timebeforestart, "status": status}); 
        } else if(event.url && status==="eventInSession")
            return res.send({"name":event.name, "url": event.url, "timebeforestart":timebeforestart, "status": status})
        else if (event.url) {
            return res.send({"name":event.name,  "timebeforestart":timebeforestart, "status": status})
        } else {
            return res.status(400).send('no link')
        }
    } else {
        return res.status(400).send("Invalid request");
    }
})