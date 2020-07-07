import express from "express";
import request from "request"
import passport from "passport";
import { createLink, AuthenticateOptions } from "./strategies"
import { IUser } from "../schema";
export let userRoutes = express.Router();

userRoutes.route("/login").get((req, response, next) => {
    const callbackURL = createLink(req, "api/user/login/callback");
    passport.authenticate('oauth2', { callbackURL } as AuthenticateOptions)(req, response, next);
});

userRoutes.route("/login/callback").get((req, response, next) => {
    const callbackURL = createLink(req, "api/user/login/callback");

    if (req.query.error === "access_denied") {
        response.redirect("/login");
        return;
    }

    passport.authenticate("oauth2", {
        failureRedirect: "/",
        successReturnToOrRedirect: "/",
        callbackURL
    } as AuthenticateOptions)(req, response, next);
});

userRoutes.route("/check").get((req, response, next) => {
    if (req.user) {
        return response.status(200).json(req.user);
    } else {
        return response.status(400).json({"success": false});
    }
})

userRoutes.route("/logout").all(async (req, response) => {
    const user = req.user as IUser | undefined;
    const gturl = process.env.GROUNDTRUTHURL || 'https://login.hack.gt'
    if (user) {
        const options = {

            method: 'POST',
            url: gturl + '/api/user/logout',
            headers:
            {
                Authorization: `Bearer ${user.token}`
            }
        };
        await request(options, async (err:any, res:any, body:any) => {
            if (err) { return console.log(err); }
            await req.logout();
            response.redirect("/api/user/login");
        });
    }
    else {
        response.redirect("/api/user/login");
    }
});