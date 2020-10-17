import express from "express"
import { getCMSEvent } from "../cms"
// import moment from "moment-timezone"
import { IUser, User } from "../schema";
// import { DateTime } from "luxon";

export let eventRoutes = express.Router();


eventRoutes.route("/:eventId").get(async (req, res) => {
    const event: any = await getCMSEvent(req.params.eventId);

    let url = "";
    let name = "";
    if (event) {
        url = event.url;
        name = event.name;
        const startTime = event.startTime;
        var user = await User.findById(req.user.id);
        if (!user) {
            throw new Error("User not found");
        }
        console.log(user.email)
        user.events.push({
            id: event.id,
            name: event.name,
            points: event.type.points
        })
        return res.redirect(url);
    } else {
        return res.status(500).send("Invalid event id")
    }

});
