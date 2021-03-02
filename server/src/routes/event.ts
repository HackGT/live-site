import express from "express"
import { getCMSEvent } from "../cms"
import { IUser, User } from "../schema";
import moment from "moment-timezone";
export let eventRoutes = express.Router();

// tslint:disable-next-line
const UNSAFE_parseAsLocal = (t: string) => { // Parse iso-formatted string as local time
    let localString = t;
    if (t.slice(-1).toLowerCase() === "z") {
        localString = t.slice(0, -1);
    }
    return moment(localString);
};

// tslint:disable-next-line
const UNSAFE_toUTC = (t: string) => UNSAFE_parseAsLocal(t).utc();

eventRoutes.route("/:getEventID").get(async (req, res) => {
    const event = await getCMSEvent(req.params.getEventID);
    if (event) {
        return res.send(event)
    }
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
