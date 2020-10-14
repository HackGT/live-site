import fs from "fs";
import path from "path";
import express from "express";
import fetch from "node-fetch";
import compression from "compression";
import morgan from "morgan";
import passport from "passport";
import session from "express-session"
import request from "request"

import cors from "cors"
import dotenv from "dotenv"
import { buildSchema } from "graphql"
export let app = express();
const { ApolloServer, gql } = require('apollo-server-express');
const express_graphql = require("express-graphql")
const bodyParser = require('body-parser')


// import { GroundTruthStrategy } from "./routes/strategies"
import { IUser, User, Event } from "./schema";
import { userRoutes } from "./routes/user";
import { isAuthenticated } from "./auth";
import { authRoutes } from "./routes/auth";


dotenv.config();

const PORT = 3000;
// const typeDefs = gql`${fs.readFileSync(path.resolve(__dirname, "../api.graphql"), "utf8")}`;

const typeDefs = fs.readFileSync(path.resolve(__dirname, "../api.graphql"), "utf8");
const VERSION_NUMBER = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")).version;
//const VERSION_HASH = require("git-rev-sync").short();




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
    secret: session_secret,
    saveUninitialized: false,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());



app.use(bodyParser.urlencoded({ extended: true }));
// app.use(/\/((?!graphql).)*/, bodyParser.json());
// apiRouter.use("/user", userRoutes);
app.use("/auth", authRoutes);





var uuid = "ea655e36-97b8-429b-ba0f-d87b78bef33e"
var query = `query($uuid: String!) {
    user(uuid: $uuid) {
        name,
        points,
        id
    }
}`

// const response =  fetch(`/graphql`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   body: JSON.stringify({
//     query,
//     variables: { uuid },
//   })
// })
//   .then(r => r.json())
//   .then(data => console.log('data returned:', data));
 // console.log('reached here boiboiboiboiboi')




// const variables = {
//     uuid: "ea655e36-97b8-429b-ba0f-d87b78bef33e"
// }
// const options = { method: 'POST',
//     url: 'http://localhost:3000/graphql',
//     headers:
//     {
//         'Content-Type': "application/json"
//     },
//     body: JSON.stringify({
//         query,
//         variables
//     })
//  };
// request(options,  (err, res, body) => {
//     // if (err) { return console.log(err); }
//     // if (JSON.parse(body).data.search_user.users.length > 0) {
//     //     confirmed = JSON.parse(body).data.search_user.users[0].confirmed;
//     // }
//     // if (!process.env.ISPRODUCTION || confirmed) {
//     //     console.log("here")
//     //     user = createNew<IUser>(User, {
//     //         ...profile,
//     //         visible: 1
//     //     });
//     //     await user.save();
//     //     done(null, user);
//     // } else {
//     //     done(null, undefined);
//     // }
//     console.log('boiboiboiboi')
//     if (err) {return console.log(err)};
//     console.log(body)
// });







app.post('/clicked', (req, res) => {
    const click = {clickTime: new Date()};
    console.log(click);
    console.log(req.body);  


    const variables = {
        uuid: "ea655e36-97b8-429b-ba0f-d87b78bef33e"
    }
    const options = { method: 'POST',
        url: 'http://localhost:3000/graphql',
        headers:
        {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            query,
            variables
        })
     };
    request(options, (err, res, body) => {
  
        if (err) {return console.log(err)};
        console.log(body)
    });

    res.redirect("/");
 
});

// apiRouter.get("/", function(req, res, next) {

//     res.render('index', {title: 'cool huh'})
// });

// let s = {} //hardcode put the bluejeans links there!
// let c = 0
// apiRouter.get("/bluejeans/:event", function(req, res, next) {
//     console.log('hidhfiodhf')
//     console.log(req.params.event)
//     s[req.params.event] = c
//     c = c+1
//     console.log(s)
//     res.send({output: req.params.event})
// });

// app.use("/auth", authRoutes)
// app.use("/api", apiRouter);
// let apiRouter = express.Router();
// apiRouter.use(bodyParser.text({ type: 'application/graphql' }));
// const root = {
//     user: getUser,
//     // completed: getCompleted,
//     // update_user_to_admin: updateToAdmin,
//     // check_user_solved: checkUserSolved,
//     // add_completed: addCompleted
// };

// apiRouter.use('/', express_graphql({
//     schema: buildSchema(typeDefs),
//     rootValue: root,
//     graphiql:process.env.ISPRODUCTION !== 'true'
// }))

// app.use("/graphql", isAuthenticated, apiRouter);
var apigraphql = require('./graphqlrouter')
app.use('/graphql', apigraphql)




// const server = new ApolloServer({
//     typeDefs, resolvers, 
//     context: ({ req }) => {
//         return req.user
//     }, playground: {
//         settings: {
//             'editor.theme': 'dark',
//             'request.credentials': 'include'
//         },
//     }
// });
// server.applyMiddleware({ app });
// app.use('/graphql', express_graphql({
//     schema: buildSchema(typeDefs),
//     graphiql: true
// }));

app.use(
    isAuthenticated,
    express.static(path.join(__dirname, "../../client")));
app.get("/", isAuthenticated, (request, response) => {
    response.sendFile(path.join(__dirname, "../../client", "index.html"));
});
app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../../client", "index.html"));
});


app.get("/*", function (req, res) {
    res.sendFile(
        path.join(__dirname, "../../client", "index.html"),
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