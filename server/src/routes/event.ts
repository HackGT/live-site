import express from "express"
import { getCMSEvent } from "../cms"
import { createNew} from "../entity/database";
import { IUser, User} from "../entity/User"
import { Interaction, IInteractionInstance} from "../entity/Interaction"

import moment from "moment-timezone";
import dotenv from "dotenv"
dotenv.config();
const fetch = require('node-fetch');

export let virtualRoutes = express.Router();
export let inpersonRoutes = express.Router();

inpersonRoutes.route("/inpersonInteraction").post(async (req, res) => {
    const user = await User.findOne({uuid:req.body.uuid});
    const event = await getCMSEvent(req.body.eventID);
    const eventType = req.body.eventType || 'inperson';

    if (event && user && eventType) {
        const endTime = moment(event.endDate).tz("America/New_York");
        const now = moment.utc().tz("America/New_York");
        
        //event already over check
        if (moment.duration(endTime.diff(now)).minutes() < 0) {
            return res.status(400).send("Event already ended")
        }

        let interaction = await Interaction.findOne({uuid: user.uuid, 
                                                    eventID: req.body.eventID })
        if (interaction) {
            interaction.instances?.push({
                timeIn: now.toDate(),
                timeOut: endTime.toDate(),
                interactionType: eventType 
            }  as IInteractionInstance)
            await interaction.save()
        } else {
            interaction = createNew(Interaction, {
                uuid: req.body.uuid,
                eventID: req.body.eventID,
                instances: [{
                    timeIn: now.toDate(),
                    timeOut: endTime.toDate(),
                    interactionType: eventType
                }  as IInteractionInstance],
            });
            await interaction.save()
        }
        return res.status(200).send();
    } else if (!user) {
       return res.status(400).send("Invalid user uuid");
    } else if (!event) {
        return res.status(400).send("Invalid eventID");
    } else {
        return res.status(400).send("Invalid request"); 
    }
})


virtualRoutes.route("/virtualInteraction/:getEventID").get(async (req, res) => {
    const reqUser = req.user as IUser;
    const user = await User.findById(reqUser._id);

    const event = await getCMSEvent(req.params.getEventID);
    console.log(event)
    if (event && user && req.user) {
        const startTime = moment(event.startDate).tz("America/New_York");
        const endTime = moment(event.endDate).tz("America/New_York");
        const now = moment.utc().tz("America/New_York");
        const differenceStart = startTime.diff(now, "minutes");
        const differenceStartSeconds = startTime.diff(now, "seconds");
        const differenceEnd = endTime.diff(now, "minutes");
        const differenceOpen = startTime.diff(now,"minutes")-10;
        const differenceOpenSeconds = startTime.diff(now, "seconds")-60*10;

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
                body: JSON.stringify({properties: {room_name: room_name, is_owner: false, user_name: reqUser.name, user_id: user.uuid}})
              };
              const response = await fetch(fetch_url, options)
                .then(res => res.json())
                .catch(err => console.error('error:' + err));
            return res.send({"name":event.name, "url": event.url + "?t=" + response.token, "timebeforestart":timebeforestart, "status": status}); 
        } else if(event.url && status==="eventInSession") {
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
