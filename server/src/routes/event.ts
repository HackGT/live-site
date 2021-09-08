import express from "express"
import { getCMSEvent } from "../cms"
import { IUser, User} from "../schema";
import moment from "moment-timezone";
import dotenv from "dotenv"

dotenv.config();

const fetch = require('node-fetch');

export let eventRoutes = express.Router();

eventRoutes.route("/:getEventID").get(async (req, res) => {
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
        const notAttended = user.events.filter(userEvent => userEvent.id === event.id).length === 0;
        // eventInSession = true
        if (eventInSession) {
            if (notAttended) {
                user.events.push({
                    id: event.id,
                    name: event.name,
                    eventType: event.type.name,
                    attended: []
                    // points: event.type.points
                });
                // user.points += event.type.points;
            }
            console.log(user.events)

            for (var i = 0; i < user.events.length; i++) {
                if (user.events[i].id===event.id) {
                    user.events[i].attended.push({
                       enter: now.toDate(),
                       exit: endTime.toDate()
                    })
                }
            }          

            await user.save(err => console.log(err));

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
                body: JSON.stringify({properties: {room_name: room_name, is_owner: false, user_name: reqUser.name}})
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
        // return res.send(event)
   
})