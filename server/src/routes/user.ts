import express from "express";
import { IUser, User} from "../entity/User";
import { Interaction } from "../entity/Interaction";
import { getCMSEvent } from "../cms"
import { isAdmin } from "../auth/auth";
import moment from "moment-timezone";

export let userRoutes = express.Router();

// userRoutes.route("/points/:userId").get(async (req, res) => {
//     const userId = req.params.userId;
//     if (!userId) {
//         return res.status(400).send("userId not defined");
//     }
//     let user = await User.findOne({ uuid: userId });
//     if (!user) {
//         return res.status(400).send("User not found");
//     }
//     return res.send({ points: user.points });
// });

userRoutes.route("/events/:userId").get(async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).send("userId not defined");
    }

    let interactions = await Interaction.find({ uuid: userId });

    if (!interactions || interactions.length == 0) {
        return res.status(400).send("User not found or User has not attended any events");
    }
    return res.send({ interactions: interactions });
});

userRoutes.route("/interaction").post(async (req, res) => {
    if (!req.body.uuid) {
        return res.status(400).send("userId not defined");
    }

    let interaction = await Interaction.findOne({ uuid: req.body.uuid, eventID: req.body.eventID });

    if (!interaction ) {
        return res.status(400).send("User has not attended this event");
    }
    const event = await getCMSEvent(req.body.eventID);
    if (!event) {
        return res.status(400).send("Event id not correct!");
    } 
    return res.send({ interaction: interaction });
});


// userRoutes.route("/events/:userId").get(async (req, res) => {
//     const userId = req.params.userId;

//     if (!userId) {
//         return res.status(400).send("userId not defined");
//     }

//     let user = await User.findOne({ uuid: userId });

//     if (!user) {
//         return res.status(400).send("User not found");
//     }

//     return res.send({ events: user.events });
// });

// userRoutes.route("/updateEnd").post(async (req, res) => {
//     let data = req.body;
//     const reqUser = req.user as IUser;
//     const user = await User.findById(reqUser._id);

//     if(user != null) {
//         let events = user?.events;
//         for(var i = 0; i < events.length; i++) {
//             if(events[i].id  === data.EventID) {
//                 events[i].attended[events[i].attended.length - 1].exit = data.endDate;
//                 await user.save(err => console.log(err));
//                 // console.log(events[i].attended[events[i].attended.length - 1])
//             } 
//         }
//     }


//     return res.status(200).send("updated the end time");
// }) 

//     if (!data.userId || !data.event) {
//         return res.status(400).send({ error: true, message: "Invalid request" });
//     }

//     let user = await User.findOne({ uuid: data.userId });

//     if (!user) {
//         return res.status(400).send({ error: true, message: "User not found" });
//     }

//     const notAttended = user.events.filter(userEvent => userEvent.id === data.event.id).length === 0;

//     if (notAttended) {
//         user.events.push({
//             id: data.event.id,
//             name: data.event.name,
//             attended: [],
//             points: data.event.type.points
//         });
//         user.points += data.event.type.points;

//         await user.save(err => console.log(err));
//     }

//     return res.send({ error: false });
// });