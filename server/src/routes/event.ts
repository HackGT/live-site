import express from "express"
import { getCMSEvent } from "../cms"
import { IUser, User} from "../schema";
import moment from "moment-timezone";
import dotenv from "dotenv"

dotenv.config();


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
        console.log(status);
        if(event.url && status==="eventInSession")
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



// eventRoutes.route("/:eventId").get(async (req, res) => {
//     const reqUser = req.user as IUser;
//     const user = await User.findById(reqUser._id);

//     const event = await getCMSEvent(req.params.eventId);

//     if (event && user) {
//         console.log(event);
//         const startTime = moment(UNSAFE_toUTC(event.startDate)).tz("America/New_York");
//         const endTime = moment(UNSAFE_toUTC(event.endDate)).tz("America/New_York");

//         const now = moment.utc().tz("America/New_York");
//         const differenceStart = startTime.diff(now, "minutes");
//         const differenceEnd = endTime.diff(now, "minutes");

//         if (differenceStart >= 30) {
//             return res.status(400).send("Event is not in session. Please check back later")
//         }
//         console.log('here')
//         const eventInSession = differenceEnd >= -10 && differenceStart <= 30;
//         const notAttended = user.events.filter(userEvent => userEvent.id === event.id).length === 0;

//         if (eventInSession && notAttended) {
//             user.events.push({
//                 id: event.id,
//                 name: event.name,
//                 points: event.type.points
//             });
//             user.points += event.type.points;

//             await user.save(err => console.log(err));
//         }

//         // return res.redirect(event.url);
//         if( event.url)
//             return res.send({"url": event.url})
//         else {
//             return res.status(400).send('no link')
//         }
//     } else {
//         return res.status(400).send("Invalid request");
//     }
// });
