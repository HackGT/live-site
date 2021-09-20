import express = require("express");
import request = require("request");
import passport = require("passport");
import { IUser } from "../entity/User";

export let authRoutes = express.Router();

authRoutes.get("/login", passport.authenticate("groundtruth"));

authRoutes.route("/login/callback").get((req, res, next) => {
  if (req.query.error === "access_denied") {
    res.redirect("/auth/login");
    return;
  }

  passport.authenticate("groundtruth", {
    failureRedirect: "/",
    successReturnToOrRedirect: "/",
  })(req, res, next);
});

authRoutes.route("/check").get((req, res) => {
  if (req.user) {
    return res.status(200).json(req.user);
  } else {
    return res.status(400).json({ success: false });
  }
});

authRoutes.route("/logout").all(async (req, res) => {
  const user = req.user as IUser | undefined;

  if (user) {
    const options = {
      method: "POST",
      url: process.env.GROUND_TRUTH_URL + "/auth/logout",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    await request(options, async (err, response, body) => {
      if (err) {
        return console.log(err);
      }
      await req.logout();
      res.redirect("/auth/login");
    });
  } else {
    res.redirect("/auth/login");
  }
});
