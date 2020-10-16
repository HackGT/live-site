import fs from "fs";
import path from "path";
import { buildSchema } from "graphql"
import { IUser, User, Event, UserEvent, IEvent, IUserEvent} from "./schema";
import request from "request"

var express = require('express')
const bodyParser = require('body-parser')
const express_graphql = require("express-graphql")
const typeDefs = fs.readFileSync(path.resolve(__dirname, "../api.graphql"), "utf8");
var apiRouter = express.Router()
let getUser = async function (args, req) {

    // if (!context._id) {
    //     throw new Error('User not logged in')
    // }
    if (args.uuid) {
        var userArr = await User.find({uuid: args.uuid});
        if (userArr.length <= 0) {
            throw new Error("User not found");
        } 
                  
         return userArr[0];
    }
        
    var user = await User.findById(req.user._id)
    
    if (!user) {
        throw new Error("User not found");
    } 
              
     return user;
}


let getEvent = async function(args, req) {
    console.log(args.event_name);
    var event = await Event.find({name:args.event_name});
    if (!event || event.length ==0) {
        throw new Error("Event not found");
    }
    return event[0]
}

let modifyUserEvent = async function (args, req) {


    var user = await User.findById(req.user._id)
    if (!user) {
        throw new Error("User not found");
    }

    // const GRAPHQLURL = process.env.GRAPHQLURL || 'https://registration.hack.gt/graphql'
    // let confirmed = false;
    // const query = `
    // query ($search: String!) {
    //     search_user(search: $search, offset: 0, n: 1) {
    //         users {
    //             confirmed
    //         }
    //     }
    // }`;
    // const variables = {
    //     search: user.email
    // };
    // const options = { method: 'POST',
    //     url: GRAPHQLURL,
    //     headers:
    //     {
    //         Authorization: 'Bearer ' + process.env.GRAPHQLAUTH,
    //         'Content-Type': "application/json"
    //     },
    //     body: JSON.stringify({
    //         query,
    //         variables
    //     })
    // };

    // await request(options, async (err, res, body) => {
    //     if (err) { return console.log(err); }
    //     if (JSON.parse(body).data.search_user.users.length > 0) {
    //         confirmed = JSON.parse(body).data.search_user.users[0].confirmed;
    //     }
    //     console.log(confirmed)
    // });

    let events = user.userevents
    if (!events) {
        throw new Error("Event not found");
    }


    // let oldPoints = user.points
    var event = await Event.find({name:args.event_name});
    if (!event || event.length ==0) {
        throw new Error("Event not found");
    }


    // if(!confirmed && !(event.type=='Opening Ceremonies' && event.type=='Closing Ceremonies' && event.type=='Speakers')) {
    //     throw new Error('User not confirmed for HackGT 7!')
    // }

    let inBounds = true

    let maxpoints = event[0].points
    let start = event[0].starttime.getTime()
    let end = event[0].endtime.getTime()
    let type = event[0].type
    let now = Date.now()
    // now = new Date("October 16, 2020 20:30:10 EDT").getTime()
    let half = (end - start) / 2 + start
    let quarter = end - (end - start)/4
    // let fifteen_before = new Date(now - 15*60000)

    if (now < start - 30*60000) {
        inBounds = false
    } else if (now > end + 30 * 60000){
        inBounds = false
    }
    if (!inBounds && event[0].type!=="Emerging Workshop") {
        console.log('not in bounds!')
        throw new Error("Event not in bounds")
        // return null
    }
    if (!inBounds && event[0].type=="Emerging Workshop") {
        return user
        // return null
    }

    if (user.userevents) {
        for (let i = 0; i < user.userevents.length; i++) {
            if (user.userevents[i].event==args.event_name) {
                console.log(user.userevents[i].event)
                return user
            }
        }
    }
    // console.log(now, half, quarter)
    if (now > end + 5*60000) {
        maxpoints = 0
    } else if (now>quarter) {
       maxpoints = maxpoints/4
    } else if (now> half) {
        maxpoints = maxpoints/2
    } 
    // console.log(maxpoints)

    var user2 = await User.findByIdAndUpdate(req.user._id, {
        "$push": {
            userevents: {
                event: args.event_name,
                points:maxpoints
            }
        }
    }, {new: true});
    var pts = 0
    if (user.points!=null && user.points !=undefined) {
        pts = user.points+maxpoints
    } else {
        pts = maxpoints
    }


    var user2 = await User.findByIdAndUpdate(req.user._id, {
        "$set": {
            points: pts
        }
    }, {new: true});

    console.log(user2)


    return user2
}
    




// apiRouter.use(bodyParser.text({ type: 'application/graphql' }));
// apiRouter.use(/\/((?!graphql).)*/, bodyParser.urlencoded({ extended: true }));
// apiRouter.use(/\/((?!graphql).)*/, bodyParser.json());
const root = {
    user: getUser,
    event: getEvent,
    modify_user_event: modifyUserEvent

};


apiRouter.use('/', express_graphql({
    schema: buildSchema(typeDefs),
    rootValue: root,
    graphiql:process.env.ISPRODUCTION !== 'true'
}))
module.exports = apiRouter