import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()

const MONGO_URL = String(process.env.MONGO_URL);
console.log(MONGO_URL);
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
    throw err;
});

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
interface RootDocument {
    _id: mongoose.Types.ObjectId;
}
export function createNew<T extends RootDocument>(model: mongoose.Model<T & mongoose.Document, {}>, doc: Omit<T, "_id">) {
    return new model(doc);
}

export interface IUser extends RootDocument {
    uuid: string;
    email: string;
    name: string;
    token: string;
    admin: boolean;
    points: number;
    events: {
        id: string,
        name: string,
        points: number
    }[];
}

export const User = mongoose.model<IUser & mongoose.Document>("User", new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    token: String,
    admin: {
        type: Boolean,
        default: false
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    events: {
        type: [
            {
                id: String,
                name: String,
                points: Number
            }
        ],
        default: []
    }
},
    {
        usePushEach: true
    }
));

export interface ITime extends mongoose.Document {
    time: string,
    user: IUser
}

export const TimeSchema: mongoose.Schema = new mongoose.Schema({
    time: {type: String, required: true},
    user_id: {type: String, required: true}
});

export const Time: mongoose.Model<ITime> = mongoose.model('Time', TimeSchema);

/*
import { model, Schema, Model, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

const User: Model<IUser> = model('User', UserSchema);*/