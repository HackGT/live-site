import express from "express"
import { User } from "../schema";
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