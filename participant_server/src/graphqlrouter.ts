import fs from "fs";
import path from "path";
import { buildSchema } from "graphql"
import { IUser, User, Event, UserEvent, IEvent, IUserEvent} from "./schema";
var express = require('express')
const bodyParser = require('body-parser')
const express_graphql = require("express-graphql")
const typeDefs = fs.readFileSync(path.resolve(__dirname, "../api.graphql"), "utf8");
var apiRouter = express.Router()
let getUser = async function (args, req) {
    // if (!context._id) {
    //     throw new Error('User not logged in')
    // }
    //     const getUser = async function (args, req) {
    //     var user = await User.find({ uuid: args.uuid });
    //     return user[0];
    // }
    // let user = await User.findById(args.user_id);
    // let query_str = args.body.query;
    // let starting_idx = query_str.indexOf("user_id");
    // let ending_idx = query_str.indexOf(")");
    
    // let info1 = query_str.substring(starting_idx, ending_idx);
    // console.log(info1);
    // let start2 = info1.indexOf(":");
    // info1 = info1.substring(start2 + 2, info1.length - 1);
    // console.log(info1);
    // console.log(args)
    //let info1 = args.uuid
    //console.log(args.uuid);
    // console.log(args.uuid)
    // console.log(req);
    console.log("Get User Reached!");
    var user = await User.findById(req.user._id);    
    // console.log(user);
    // var user = await User.find({ uuid: info1 });
    // console.log(user);
    // console.log(user)
    /*
    if (!user || user.length ==0) {
        throw new Error("User not found");
    } 
    */          
    //return user[0];
    // return user;
     return user;
}

let modifyUser = async function (args, req) {
    var user = await User.findById(req.user._id)
    // var user = await User.find({ uuid: args.uuid});
    // console.log(user)
    // console.log(req.user._id)
    // console.log(args.uuid)
    console.log("Modify User Reached!");
    // console.log(user);
    /*
    if (!user) {
        throw new Error("User not found");
    }  
    let oldPoints = user.points
    var user2 = await User.findByIdAndUpdate(req.user._id, {
        "$set": {
            points: oldPoints+args.points
        }
     });
     */
    // var user2 = await User.findByIdAndUpdate({ _id: req.user._id },
    // { points: oldPoints+args.points })
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
/*
let modifyUserEvent = async function (args, req) {

    var user = await User.findById(req.user._id)
    if (!user) {
        throw new Error("User not found");
    }
    let events = user.userevents
    if (!events) {
        throw new Error("Event not found");
    }
    // let oldPoints = user.points
    var event = await Event.find({name:args.event_name});
    if (!event || event.length ==0) {
        throw new Error("Event not found");
    }

    // for (let i = 0; i < events.length;  i++) {
    //     var event = await Event.find({name:events[i].event});
    //     if (!event || event.length ==0) {
    //         throw new Error("Event not found");
    //     }
    //     let point = event[0].points
    //     let date = Date.now()
    //     console.log(event[0].starttime)
    //     console.log(event[0].endtime)
    // var user2 = await User.findByIdAndUpdate(req.user._id, {
    //     "$set": {
    //         points: oldPoints+args.points
    //     }
    // });
    let inBounds = true

    let maxpoints = event[0].points
    let start = event[0].starttime
    let end = event[0].endtime
    let type = event[0].type
    let now = Date.now()    
    let half = (end - start) / 2 + start
    let quarter = end - (end - start)/4
    let fifteen_before = Date.now() - 15*60000
    if (event.type!=="Emerging Workshop") {
        if (Date.now() < start - 30*60000) {
            inBounds = false
        } else if (Date.now() > end + 30 * 60000){
            inBounds = false
        }
        if (!inBounds) {
            console('not in bounds!')
            throw new Error("Event not in bounds")
            return null
        }
    }
    
    if (Date.now() > end + 5*60000) {
        maxpoints = 0
    }
    if (Date.now()>quarter) {
       maxpoints = maxpoints/4
    } else if (Date.now()> half) {
        maxpoints = maxpoints/2
    } 
    const userevent = {
        event: event[0].name
        points: maxpoints
    }
    var user2 = await User.findByIdAndUpdate(req.user._id, {
        "$push": {
            userevents: userevent
        }
    })

    }
    return user
}
*/

// let getUser async function
// apiRouter.use(bodyParser.text({ type: 'application/graphql' }));
// apiRouter.use(/\/((?!graphql).)*/, bodyParser.urlencoded({ extended: true }));
// apiRouter.use(/\/((?!graphql).)*/, bodyParser.json());
const root = {
    user: getUser,
    modify_user: modifyUser,
    event: getEvent,
    // modify_user_event: modifyUserEvent
    // update_user_to_admin: updateToAdmin,
    // check_user_solved: checkUserSolved,
    // add_completed: addCompleted
};


apiRouter.use('/', express_graphql({
    schema: buildSchema(typeDefs),
    rootValue: root,
    graphiql:process.env.ISPRODUCTION !== 'true'
}))
module.exports = apiRouter