import fs from "fs";
import path from "path";
import express from "express";
import compression from "compression";
import morgan from "morgan";
import passport from "passport";
import session from "express-session"

import cors from "cors"
import dotenv from "dotenv"
import { buildSchema } from "graphql"
import { GroundTruthStrategy } from "./routes/strategies"
import { IUser, User, Event} from "./schema";
import { userRoutes } from "./routes/user";
const { ApolloServer, gql } = require('apollo-server-express');
const express_graphql = require("express-graphql")
dotenv.config();

const PORT = 3000;
//const typeDefs = gql`${fs.readFileSync(path.resolve(__dirname, "../api.graphql"), "utf8")}`;

const typeDefs = fs.readFileSync(path.resolve(__dirname, "../api.graphql"), "utf8");
const VERSION_NUMBER = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")).version;
//const VERSION_HASH = require("git-rev-sync").short();


export let app = express();

if (process.env.ISPRODUCTION === 'true') {
	app.enable("trust proxy");
}
else {
	console.warn("OAuth callback(s) running in development mode");
}

app.use(morgan("dev"));
app.use(compression());
app.use(cors());
const session_secret = process.env.SECRET;
if (!session_secret) {
    throw new Error("Secret not specified");
}
app.use(session({
    secret:session_secret,
    saveUninitialized: false,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

export function loggedInErr(req:any, res:any, next:any) {
    if (req.user) {
        res.status(200).json({
            success: true
        });
        next();
    }
    else {
        res.status(401).json({ "error": "User not logged in", success: false });
        return;
    }
}

const gturl = String(process.env.GROUNDTRUTHURL || "login.hack.gt");
const groundTruthStrategy = new GroundTruthStrategy(gturl);
passport.use(groundTruthStrategy);
passport.serializeUser<IUser, string>((user, done) => {
    done(null, user.uuid);
});
passport.deserializeUser<IUser, string>((id, done) => {
    User.findOne({ uuid: id }, (err:any, user:any) => {
        done(err, user!);
    });
});

let apiRouter = express.Router();

let getUser = async function(parent, args, context, info) {
    // if (!context._id) {
    //     throw new Error('User not logged in')
    // }
    let user = await User.findById(context._id)
    if (!user) {
        throw new Error('User not found')
    }
    return user
}

let getEvent = async function(parent, args, context, info) {
    // if (!context._id) {
    //     throw new Error('User not logged in')
    // }
    let event = await Event.findById(context._id)
    if (!event) {
        throw new Error('Event not found')
    }
    return event
}

const resolvers = {
    Query: {
        user: getUser,
        event: getEvent
    }
}

apiRouter.use("/user", userRoutes);

app.use("/api", apiRouter);

const server = new ApolloServer({
    typeDefs, resolvers, 
    // context: ({ req }) => {
    //     return req.user
    // }, playground: {
    //     settings: {
    //         'editor.theme': 'dark',
    //         'request.credentials': 'include'
    //     },
    // }
});
server.applyMiddleware({ app });
// app.use('/graphql', express_graphql({
//     schema: buildSchema(typeDefs),
//     graphiql: true
// }));

app.use(express.static(path.join(__dirname, "../../client")));
app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../../client", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Virtual Check-in system v${VERSION_NUMBER} started on port ${PORT}`);
});