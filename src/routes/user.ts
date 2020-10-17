import express from "express"
import { getCMSEvent } from "../cms"
import { IUser, User } from "../schema";
import moment from "moment-timezone";
export let userRoutes = express.Router();

userRoutes.route("/points/:userId").get(async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).send("userId not defined");
    }
    const user = await User.findById(userId);

    if(!user) {
        return res.status(400).send("user not found");
    }
    return res.send({points: user.points})
})
