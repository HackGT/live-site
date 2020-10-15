import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()

// const MONGO_URL = String(process.env.MONGO_URL);
// mongoose.connect(MONGO_URL).catch((err:any) => {
//     throw err;
// });
// export {mongoose};

const MONGO_URL = String(process.env.MONGO_URL);
mongoose.connect(MONGO_URL).catch(err => {
    throw err;
});
export {mongoose};

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
    token?: string | null;
    admin?: boolean;
    visible?: number;
    points?: number;
    events?: IEvent[];



}

export interface IEvent{
    name: string;
    type: string;
    startime:Date;
    endtime:Date;
    points: number;
    meetingId:number;
    passcode:number
}

export type IUserMongoose = IUser & mongoose.Document;
export type IEventMongoose = IEvent & mongoose.Document;
export const Event = mongoose.model<IEventMongoose>("Event", new mongoose.Schema({
    name: String,
    type: String,
    starttime:  Date,
    endtime: Date,
    points: Number, 
    meetingId: Number,
    passcode: Number

}));

export const User = mongoose.model<IUserMongoose>("User", new mongoose.Schema({
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
            required: false
        },
        token: String,
        // auth_keys: [String],
        admin: Boolean,
        visible: Number,
        points: {
            type: Number,
            required: true
        },
        events: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Event"
            }]
        }
    },
    {
        usePushEach: true
    }
));








