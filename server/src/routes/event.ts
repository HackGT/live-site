import express from "express"
import { getCMSEvent } from "../cms"
import { createNew} from "../entity/database";
import { IUser, User} from "../entity/User"
import { Interaction, IInteractionInstance, IInteraction} from "../entity/Interaction"

import moment, {Moment} from "moment-timezone";
import dotenv from "dotenv"
import {InteractionType, IsCMSEvent, EventType} from "../utils/utils";
import {Date} from "mongoose";
dotenv.config();
const fetch = require('node-fetch');

export let virtualRoutes = express.Router();
export let inpersonRoutes = express.Router();


const inpersonRequestParams = ['uuid', 'name', 'email', 'eventID', 'eventType', 'interactionType']

inpersonRoutes.route("/inpersonInteraction").post(async (req, res) => {
   
    //validate request to make sure types are there
    for (let param of inpersonRequestParams){
        if (!req.body[param]){
            console.log(`no ${param}`);
            return res.status(400).send(`no ${param}`);
        }
    }

    //check interactiontype is valid
    if (!Object.values(InteractionType).includes(req.body.interactionType)){
        console.log(`interactionType not valid`);
        return res.status(400).send(`interactionType not valid`);
    }

    //check eventType is valid
    if (!Object.values(EventType).includes(req.body.eventType)){
        console.log(`eventType not valid`);
        return res.status(400).send(`eventType not valid`);
    }
    
    let endTime: Moment;
    let warnOnDup: boolean = false;
    const now = moment.utc().tz("America/New_York");

    //cms stuff if its inperson
    if (Object.values(IsCMSEvent).includes(req.body.eventType)){
        
        //cms event validation
        const event = await getCMSEvent(req.body.eventID);
        if (!event) {
            console.log("eventID not CMS event but eventType is CMS event")
            return res.status(400).send("eventID not CMS event but eventType is CMS event")
        }

        //eventType validation
        if (event.type.name != req.body.eventType){
            console.log("cms eventType not same as req eventType")
            return res.status(400).send("cms eventType not same as req eventType")
        }

        endTime = moment(event.endDate).tz("America/New_York");
        
        //event already over check
        if (moment.duration(endTime.diff(now)).minutes() < 0) {
            console.log("Event already ended")
            return res.status(400).send("Event already ended")
        }

        //don't allow multiple food stuff
        if (req.body.eventType==EventType.Food){
            warnOnDup=true;
        }

    } else {
        endTime = now;
    }

    //gets user, adds user if it isn't already there
    //atomic so maybe shouldnt break
    try {
        let user = await User.findOneAndUpdate(
            {uuid:req.body.uuid},
            {$setOnInsert: 
                createNew<IUser>(User, {
                    uuid: req.body.uuid,
                    email: req.body.email,
                    name: req.body.name,
                    token: "",
                    admin: false
            })},
            { upsert: true, new: true, runValidators: true });
    } catch (e) {
        console.log(`Error when getting/inserting user: ${e}`) 
        return res.status(400).send("error when get/insert user");
    }


    if (warnOnDup) {
        try {
            let interaction = await Interaction.findOneAndUpdate(
                {uuid:req.body.uuid, eventID: req.body.eventID},
                {$setOnInsert: 
                    createNew<IInteraction>(Interaction, {
                        eventID: req.body.eventID,
                        uuid: req.body.uuid,
                        instances: [
                            {
                                timeIn: now.toDate(),
                                timeOut: endTime.toDate(),
                                interactionType: req.body.interactionType
                            }  as IInteractionInstance
                        ]
                })},
                { upsert: true, new: true, runValidators: true });
            
            //if the times are the same it means we just inserted it
            //TODO: make less jank, we don't need to be atomic if in person (race condition prob wont happen in time for it to matter)
            if (interaction.instances && interaction.instances[0].timeIn.getTime() == now.toDate().getTime()){
                return res.status(200).send("success");
            } else if (interaction.instances && interaction.instances[0].timeIn.getTime() != now.toDate().getTime()){
                console.log(interaction.instances[0].timeIn.getTime());
                console.log(now.toDate().getTime());
                return res.status(201).send("WarnOnDup true, user already checked in");
            } else {
                throw "interaction instances not found"

            }
        } catch (e) {
            console.log(`Error when getting/inserting user: ${e}`) 
            return res.status(400).send("error when get/insert user");
        }
    } else {
        //pushes interaction instance, adds if it isnt already there
        try {
            let interaction = await Interaction.updateOne(
                {uuid: req.body.uuid, eventID: req.body.eventID},
                {$push:
                    {   instances:    
                        { 
                            timeIn: now.toDate(),
                            timeOut: endTime.toDate(),
                            interactionType: req.body.interactionType
                        }  as IInteractionInstance
                    },
                $inc: {_v: 1}
                },
                { upsert: true, new: true, runValidators: true });
        } catch (e) {
            console.log(`Error when getting/inserting interaction: Error: ${e}`) 
            return res.status(400).send("error when get/insert interaction");
        }
    return res.status(200).send("success");
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
