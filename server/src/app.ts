import fs from "fs";
import path from "path";
import express, { response } from "express";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
// import {Server} from "ws";
import expressWs from 'express-ws';
import moment from "moment-timezone";
import { getCMSEvent } from "./cms";
import { model, Schema, Model, Document } from 'mongoose';

dotenv.config();

const VERSION_NUMBER = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")).version;
const PORT = process.env.PORT || 3000;
// export let app = express();
export const { app, getWss, applyTo } = expressWs(express());


app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });


// Throw and show a stack trace on an unhandled Promise rejection instead of logging an unhelpful warning
process.on("unhandledRejection", err => {
    throw err;
});

import { isAuthenticated } from "./auth/auth";
import { authRoutes } from "./routes/auth";
import { eventRoutes } from "./routes/event";
import { userRoutes } from "./routes/user";
import { IUser, User} from "./schema";
import { start } from "repl";

app.get("/status", (req, res) => {
    res.status(200).send("Success");
});


// app.get("/", (req, res) => {
//     res.redirect("https://live.hack.gt");
// });


app.use("/auth", authRoutes);
app.use("/event", isAuthenticated, eventRoutes);
app.use("/user", userRoutes);


// app.get("*", (req, res) => {
//     res.status(404).send("Sorry :( this is an invalid url");
// })

// app.listen(process.env.PORT, () => {
//     console.log(`Virtual Check-in system v${VERSION_NUMBER} started on port ${process.env.PORT}`);
// });






const router = express.Router() as expressWs.Router;
// var router = express.Router();
router.ws('/echo', async (ws, req) => {
    const startTime = moment.utc().tz("America/New_York");
    

    ws.on('close', async () => {
        const reqUser = req.user as IUser;
        const endTime = moment.utc().tz("America/New_York");
        const user = await User.findById(reqUser._id);
        const event = getCMSEvent(req.params.getEventID);
        
        if (event && user) {
            const notAttended = user.events.filter(userEvent => userEvent.id === event.id).length === 0;

            if (notAttended) {
                user.events.push({
                    id: event.id,
                    name: event.name,
                    attended: []
                });
            }

            for (var i = 0; i < user.events.length; i++) {
                if (user.events[i].id===event.id) {
                    user.events[i].attended.push({
                    enter: startTime.toDate(),
                    exit: endTime.toDate()
                    })
                }
            } 
        }
    })
});
app.use("/ws-stuff", isAuthenticated, router);

app.use(isAuthenticated, express.static(path.join(__dirname, "../../client/build")));

app.get("/", isAuthenticated, (request, response) => {
    response.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});


app.get("*", function (req, res) {
    res.sendFile(
        path.join(__dirname, "../../client/build", "index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

app.get("/*", function (req, res) {
    res.sendFile(
        path.join(__dirname, "../../client/build", "index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});
app.listen(PORT, () => {
    console.log(`Virtual Check-in system v${VERSION_NUMBER} started on port ${PORT}`);
});

app.disable('etag');