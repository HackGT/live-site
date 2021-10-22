import express from "express"
import { getCMSEvent } from "../cms"
import { createNew} from "../entity/database";
import { IUser, User} from "../entity/User"
import { Interaction, IInteractionInstance, IInteraction} from "../entity/Interaction"

import moment, {Moment} from "moment-timezone";
import dotenv from "dotenv"
import {Date} from "mongoose";
dotenv.config();
const fetch = require('node-fetch');

export let virtualRoutes = express.Router();
export let inpersonRoutes = express.Router();

virtualRoutes.route("/virtualInteraction/:getEventID").get(async (req, res) => {
    const reqUser = req.user as IUser;
    const user = await User.findById(reqUser._id);

    const event = await getCMSEvent(req.params.getEventID);
    // console.log(event)
    if (event && user && req.user && event.type) {
        const startTime = moment(event.startDate).tz("America/New_York");
        const endTime = moment(event.endDate).tz("America/New_York");
        const now = moment.utc().tz("America/New_York");
        const differenceStart = startTime.diff(now, "minutes");
        const differenceStartSeconds = startTime.diff(now, "seconds");
        const differenceEnd = endTime.diff(now, "minutes");
        const differenceEndSeconds = endTime.diff(now, "seconds");
        const differenceOpen = startTime.diff(now,"minutes")-10;
        const differenceOpenSeconds = startTime.diff(now, "seconds")-60*10;
        const differenceTotalDuration = endTime.diff(startTime, "seconds");

        //console.log('start time:', startTime,event.startDate, endTime, event.endDate, now, UNSAFE_toUTC(event.startDate), UNSAFE_toUTC(event.endDate))
        console.log(startTime, endTime, differenceStart, differenceEnd)
        let eventInSession = differenceEnd >= -10 && differenceStart <= 10;
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
        } else {
            status = "eventNotWithin24Hours"
        } if (event.url && event.url.includes("daily") && status==="eventInSession") {
            const fetch_url = 'https://api.daily.co/v1/meeting-tokens';
            const room_name = event.url.split('/')[event.url.split('/').length-1];
            const options = {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + String(process.env.DAILY_KEY)
                },
                body: JSON.stringify({properties: {room_name: room_name, is_owner: false, user_name: reqUser.name, user_id: user.uuid}})
              };
              const response = await fetch(fetch_url, options)
                .then(res => res.json())
                .catch(err => console.error('error:' + err));
            return res.send({"name":event.name, "url": event.url + "?t=" + response.token, "timebeforestart":timebeforestart, "status": status}); 
        } else if(event.url && status==="eventInSession") {
            console.log('any here???')

            const url = process.env.VIRTUAL_CHECKIN_URL || "https://log.2021.hack.gt";
            ['uuid', 'eventID', 'eventType', 'virtualDuration']
            let data = {
                'uuid': user.uuid,
                'eventID':  event.id,
                'eventType': event.name,
                'virtualDuration': Math.min(differenceEndSeconds, differenceTotalDuration)
            }

            const response = await fetch(`${url}/log/virtualinteraction`, {
                method: 'POST',
                headers: {
                    "Authorization": "Bearer " + (process.env.VIRTUAL_CHECKIN_SECRET || "secret"),
                    "Content-Type": "application/json",
                    body: JSON.stringify(data)
                }, 
            });

            if (response.status >= 400) {
                return {
                    success: false
                }
            }

            const respJson = await response.json();
            console.log('bdsdfdfdfsd')
            console.log(respJson)


            let interaction = await Interaction.findOne({uuid: user.uuid, 
                eventID: event.id })
            if (!interaction) {
                interaction = createNew(Interaction, {
                    uuid:  user.uuid, 
                    eventID:  event.id,
                    instances: [{
                        timeIn: now.toDate(),
                        timeOut: endTime.toDate(),
                        interactionType: 'virtual'
                    } as IInteractionInstance],
                    virtualDuration: Math.min(differenceEndSeconds, differenceTotalDuration),
                    eventTotalDuration: differenceTotalDuration,
                    eventName: event.name,
                    eventType: event.type.name,
                    eventStartTime: event.startDate,
                    eventEndTime: event.endDate
                })
                await interaction.save();
            }
            return res.send({"name":event.name, "url": event.url, "timebeforestart":timebeforestart, "status": status})
        }
        else if (event.url) {
            return res.send({"name":event.name,  "timebeforestart":timebeforestart, "status": status})
        } else {
            return res.status(400).send('no link')
        }
    } else {
        return res.status(400).send("Invalid request");
    }
})
