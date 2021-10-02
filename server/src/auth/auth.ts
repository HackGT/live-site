import mongoose = require("mongoose");
import express = require("express");
import passport = require("passport");
import session = require("express-session");
const MongoStore = require("connect-mongo")(session);
import dotenv from "dotenv";
import { Strategy as GroundTruthStrategy } from "passport-ground-truth";

import { app } from "../app";
import { createNew } from "../entity/database";
import { IUser, User } from "../entity/User";

dotenv.config();

if (process.env.PRODUCTION === "true") {
  app.enable("trust proxy");
} else {
  console.warn("OAuth callback(s) running in development mode");
}

const session_secret = process.env.SECRET;
if (!session_secret) {
  throw new Error("Secret not specified");
}

app.use(
  session({
    secret: session_secret,
    saveUninitialized: false,
    resave: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

export function isAuthenticated(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
): void {
  response.setHeader("Cache-Control", "private");
  if (!request.isAuthenticated() || !request.user) {
    if (request.session) {
      request.session.returnTo = request.originalUrl;
    }
    response.redirect("/auth/login");
  } else {
    next();
  }
}

export function isAdmin(request: express.Request, response: express.Response, next: express.NextFunction): void {
    const user = request.user as IUser;
    const auth = request.headers.authorization;
    if (auth && typeof auth === "string" && auth.includes(" ")) {
        var origin = request.get('origin');
        const key = auth.split(" ")[1];
        if (key === process.env.ADMIN_SECRET) {
            next();
        } else {
            response.status(401).json({
            error: "Incorrect auth token",
            });
        }
    }
    else if (!request.isAuthenticated() || !user) {
        if (request.session) {
            request.session.returnTo = request.originalUrl;
        }
        response.redirect("/auth/login");
    } else {
        if (user['admin']==true) {
            next();
        } else {
            response.redirect('/auth/login');
        }
    }
}

passport.use(
  new GroundTruthStrategy(
    {
      clientID: process.env.GROUND_TRUTH_ID,
      clientSecret: process.env.GROUND_TRUTH_SECRET,
      baseURL: process.env.GROUND_TRUTH_URL,
      callbackURL: "/auth/login/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      //   const query = `
      //             query($search: String!) {
      //                 search_user(search: $search, offset: 0, n: 1) {
      //                     users {
      //                         confirmed
      //                     }
      //                 }
      //             }
      //         `;

      //   const variables = {
      //     search: profile.email,
      //   };

      // const res = await fetch(process.env.GRAPHQL_URL || "https://registration.hack.gt/graphql", {
      //     method: 'POST',
      //     headers: {
      //         "Authorization": "Bearer " + (process.env.GRAPHQL_AUTH || "secret"),
      //         "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //         query,
      //         variables
      //     })
      // });

      // const data = await res.json();

      // if (!data || data.data.search_user.users.length === 0 || !data.data.search_user.users[0].confirmed) {
      //     done(new Error("User is not confirmed in registration"), undefined);
      // }

      let user = await User.findOne({ uuid: profile.uuid });

      if (!user) {
        user = createNew<IUser>(User, {
          ...profile,
          admin: false,
        });
      } else {
        user.token = accessToken;
      }
      await user.save();
      done(null, user);
    }
  )
);

passport.serializeUser<IUser, string>((user, done) => {
  done(null, user.uuid);
});
passport.deserializeUser<IUser, string>((id, done) => {
  User.findOne({ uuid: id }, (err, user) => {
    done(err, user!);
  });
});
