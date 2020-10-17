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
const bodyParser = require('body-parser')

import { IUser, User, Event } from "./schema";
import { authRoutes } from "./routes/auth";
import { isAuthenticated } from "./auth/auth";


dotenv.config();

const VERSION_NUMBER = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")).version;

app.use(morgan("dev"));
app.use(compression());
app.use(com)
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



// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(/\/((?!graphql).)*/, bodyParser.json());
// apiRouter.use("/user", userRoutes);
app.use(bodyParser.json());
app.use("/auth", authRoutes);




/*
var uuid = "ea655e36-97b8-429b-ba0f-d87b78bef33e"
var query = `query($uuid: String!) {
    user(uuid: $uuid) {
        name,
        points,
        id
    }
}`

app.post('/clicked', (req, res) => {
    const click = {clickTime: new Date()};
    console.log(click);        
    console.log(req.body);
    // res.send({data: "data"});

    
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
    // res.redirect("/");
});

app.get('/dashboard', (req, res) => {
    // Get the user's points
    // Get the user's email        
    const variables = {
        //uuid: "ea655e36-97b8-429b-ba0f-d87b78bef33e"
        uuid: "hello"
    }
    const options = { method: 'GET',
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
})
*/

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

function isAdmin(request: express.Request, response: express.Response, next: express.NextFunction) {
    response.setHeader("Cache-Control", "private");
    let user = request.user as IUser;
    const auth = request.headers.authorization;

    if (auth && typeof auth === "string" && auth.indexOf(" ") > -1) {
        const key = Buffer.from(auth.split(" ")[1], "base64").toString();
        if (key === process.env.SECRET) {
            next();
        }
        else {
            response.status(401).json({
                "error": "Incorrect auth token!"
            });
        }
    }
    else if (!request.isAuthenticated()) {
        response.status(401).json({
            "error": "You must log in to access this endpoint"
        });
    }
    else {
        next();
    }
}

var apigraphql = require('./graphqlrouter')
app.use('/graphql', isAdmin, apigraphql)




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


app.listen(process.env.PORT, () => {
    console.log(`Virtual Check-in system v${VERSION_NUMBER} started on port ${process.env.PORT}`);
});
