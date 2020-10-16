import express = require("express");
import passport = require("passport");
import session = require("express-session");
import { app } from "./app";
import { IUser, User } from "./schema";
import { GroundTruthStrategy } from "./routes/strategies";

if (process.env.PRODUCTION === 'true') {
    app.enable("trust proxy");
}
else {
    console.warn("OAuth callback(s) running in development mode");
}

const session_secret = process.env.SECRET;
if (!session_secret) {
    throw new Error("Secret not specified");
}
// console.log(app)
app.use(session({
    secret: session_secret,
    saveUninitialized: false,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

export function isAuthenticated(request: express.Request, response: express.Response, next: express.NextFunction): void {
    response.setHeader("Cache-Control", "private");
    if (!request.isAuthenticated() || !request.user) {
        console.log("HELLO");
        console.log(request.isAuthenticated(), request.user)
        if (request.session) {
            // console.log(request.session.returnTo, request.originalUrl)
            request.session.returnTo = request.originalUrl;
        }
        // console.log('here a lot boi!')
        response.redirect("/auth/login");
    } else {
        next();
    }
}

const groundTruthStrategy = new GroundTruthStrategy(String(process.env.GROUNDTRUTHURL));
console.log(groundTruthStrategy.url)
passport.use(groundTruthStrategy);
passport.serializeUser<IUser, string>((user, done) => {
    done(null, user.uuid);
});
passport.deserializeUser<IUser, string>((id, done) => {
    User.findOne({ uuid: id }, (err, user) => {
        done(err, user!);
    });
});