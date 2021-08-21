import express from "express";
import { IUser, User } from "../schema";
import { isAdmin } from "../auth/auth";

export let userRoutes = express.Router();

userRoutes.route("/points/:userId").get(async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).send("userId not defined");
    }

    let user = await User.findOne({ uuid: userId });

    if (!user) {
        return res.status(400).send("User not found");
    }

    return res.send({ points: user.points });
});

userRoutes.route("/events/:userId").get(async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).send("userId not defined");
    }

    let user = await User.findOne({ uuid: userId });

    if (!user) {
        return res.status(400).send("User not found");
    }

    return res.send({ events: user.events });
});

userRoutes.route("/points/add").post(isAdmin, async (req, res) => {
    const data = req.body;

    if (!data.userId || !data.event) {
        return res.status(400).send({ error: true, message: "Invalid request" });
    }

    let user = await User.findOne({ uuid: data.userId });

    if (!user) {
        return res.status(400).send({ error: true, message: "User not found" });
    }

    const notAttended = user.events.filter(userEvent => userEvent.id === data.event.id).length === 0;

    if (notAttended) {
        user.events.push({
            id: data.event.id,
            name: data.event.name,
            attended: [],
            points: data.event.type.points
        });
        user.points += data.event.type.points;

        await user.save(err => console.log(err));
    }

    return res.send({ error: false });
});

userRoutes.route("/updateEnd").post(async (req, res) => {
    let data = req.body;
    const reqUser = req.user as IUser;
    const user = await User.findById(reqUser._id);

    if(user != null) {
        let events = user?.events;
        for(var i = 0; i < events.length; i++) {
            if(events[i].id  === data.EventID) {
                events[i].attended[events[i].attended.length - 1].exit = data.endDate;
                await user.save(err => console.log(err));
            } 
        }
    }
    

    return res.status(200).send("updated the end time");
})