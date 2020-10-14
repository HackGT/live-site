import express = require("express");
import request = require("request")
import passport = require("passport");
import { createLink, AuthenticateOptions } from "./strategies"
import { IUser } from "../schema";

export let authRoutes = express.Router();

authRoutes.route("/login").get((req, response, next) => {
    const callbackURL = createLink(req, "auth/login/callback");
    passport.authenticate('oauth2', { callbackURL } as AuthenticateOptions)(req, response, next);
});

authRoutes.route("/login/callback").get((req, response, next) => {
    const callbackURL = createLink(req, "auth/login/callback");

    if (req.query.error === "access_denied") {
        response.redirect("/auth/login");
        return;
    }

    passport.authenticate("oauth2", {
        failureRedirect: "/",
        successReturnToOrRedirect: "/",
        callbackURL
    } as AuthenticateOptions)(req, response, next);
});

authRoutes.route("/check").get((req, response, next) => {
    if (req.user) {
        return response.status(200).json(req.user);
    } else {
        return response.status(400).json({"success": false});
    }
});

authRoutes.route("/logout").all(async (req, response) => {
    const user = req.user as IUser | undefined;
    if (user) {
        const options = {
            method: 'POST',
            url: process.env.GROUND_TRUTH_URL + '/auth/logout',
            headers:
            {
                Authorization: `Bearer ${user.token}`
            }
        };
        
        await request(options, async (err, res, body) => {
            if (err) { return console.log(err); }
            await req.logout();
            response.redirect("/auth/login");
        });
    }
    else {
        response.redirect("/auth/login");
    }
});