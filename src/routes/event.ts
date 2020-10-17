import express from "express"
import { getCMSEvent, ICMSEvent } from "../cms"
// import moment from "moment-timezone"
import { IUser, User } from "../schema";
// import { DateTime } from "luxon";
import { moment } from "moment-timezone";
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

eventRoutes.route("/:eventId").get(async (req, res) => {
    const reqUser = req.user as IUser;
    const user = await User.findById(reqUser._id);

    if (!user) {
        res.status(500).send("User not found");
    }

    const event = await getCMSEvent(req.params.eventId);
    // let url = "";
    // let name = "";
    if (event) {
        const url = event.url;
        const startTime = moment(UNSAFE_toUTC(event.startDate)).tz("America/New_York");
        const endTime = moment(UNSAFE_toUTC(event.endDate)).tz("America/New_York");

        // const startTime = event.startTime;
        const now = moment.utc().tz("America/New_York");
        const differenceStart = startTime.diff(now, "minutes");
        const differenceEnd = startTime.diff(now, "minutes");
        if (differenceStart >= 30) {
            return res.status(500).send("Event is not in session. Please check back later")
        }
        const eventInSession = differenceEnd >= -10 && differenceStart <= 30
        const alreadyAttended = user!.events.filter(userEvent => userEvent.id == event.id).length != 0

        if(eventInSession && alreadyAttended) {
            user!.events.push({
                id: event.id,
                name: event.name,
                points: event.type.points
            })

            await user!.save((err, doc) => {
                console.log(err);
            })
        }


        return res.redirect(url);
    } else {
        return res.status(500).send("Invalid event id")
    }

});
