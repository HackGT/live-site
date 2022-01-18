import fs from "fs";
import path from "path";
import express, { response } from "express";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
// import * as cron from 'node-cron'


import http from "http";

dotenv.config();

const VERSION_NUMBER = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")).version;
const PORT = process.env.PORT || 3000;



export let app = express();


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

import { isAuthenticated, isAdmin } from "./auth/auth";
import { authRoutes } from "./routes/auth";
import { inpersonRoutes, virtualRoutes } from "./routes/event";
import { userRoutes } from "./routes/user";
import { getEndedEvents } from "./cms"
// import { Time, User, IUser, ITime } from "./schema";

app.get("/status", (req, res) => {
    res.status(200).send("Success");
});


// app.get("/", (req, res) => {
//     res.redirect("https://live.hack.gt");
// });


app.use("/auth", authRoutes);
app.use("/virtual", isAuthenticated, virtualRoutes);
app.use("/inperson", isAdmin, inpersonRoutes);
app.use("/user", userRoutes);


// app.get("*", (req, res) => {
//     res.status(404).send("Sorry :( this is an invalid url");
// })

// app.listen(process.env.PORT, () => {
//     console.log(`Virtual Check-in system v${VERSION_NUMBER} started on port ${process.env.PORT}`);
// });











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

// cron.schedule('*/5 * * * *', () => {
//    let minInterval = 5;
//    console.log('running a task every ' + minInterval + ' minute ' + new Date().toISOString());
//    getEndedEvents(minInterval);
//  });





app.disable('etag');
