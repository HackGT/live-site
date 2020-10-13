import fs from "fs";
import path from "path";
import { buildSchema } from "graphql"
import { IUser, User, Event } from "./schema";
var express = require('express')
const bodyParser = require('body-parser')
const express_graphql = require("express-graphql")
const typeDefs = fs.readFileSync(path.resolve(__dirname, "../api.graphql"), "utf8");
var apiRouter = express.Router()
let getUser = async function (parent, args, context, info) {
    // if (!context._id) {
    //     throw new Error('User not logged in')
    // }
    //     const getUser = async function (args, req) {
    //     var user = await User.find({ uuid: args.uuid });
    //     return user[0];
    // }
    // let user = await User.findById(args.user_id);
    var user = await User.find({ uuid: args.uuid });
    console.log(user)
    if (!user) {
        throw new Error("User not found");
    }
    return user[0];
    // return user;
    // return user
}
// apiRouter.use(bodyParser.text({ type: 'application/graphql' }));
apiRouter.use(/\/((?!graphql).)*/, bodyParser.urlencoded({ extended: true }));
apiRouter.use(/\/((?!graphql).)*/, bodyParser.json());
const root = {
    user: getUser,
    // completed: getCompleted,
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