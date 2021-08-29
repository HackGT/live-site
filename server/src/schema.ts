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
    points?: number;
    events: {
        id: string,
        name: string,
        eventType: string,
        points?: number,
        // attended: Date,
        attended: {
            enter: Date,
            exit: Date
         }[];
    }[];
}

export interface IInteraction extends RootDocument {
    uuid: string;
    eventID: string;
    timeIn?: Date;
    timeOut?: Date | undefined;
    timeInOutPairs?: {
        timeIn: Date,
        timeOut: Date | undefined,
        type: string
    }[];
    employees?: {
        uuid: string;
        name: string;
        email: string;
    }[]; // Single scanner can be associated with multiple employees
}

export const Interaction = mongoose.model<IInteraction & mongoose.Document>("Interaction", new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        index: true
    },
    eventID: {
        type: String,
        required: true,
        index: true
    },
    timeIn: {
        type: Date,
        required: true
    },
    timeOut: {
        type: Date
    }, 

    timeInOutPairs: [{
        timeIn: Date,
        timeOut: Date,
        type: String
    }],
    employees: [{
        uuid: String,
        name: String,
        email: String
    }]
}))

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
        required: false,
        default: 0
    },
    events: {
        type: [
            {
                id: String,
                name: String,
                eventType: String,
                points: {
                    type: Number,
                    required: false,
                    default: 0
                },
                attended: {
                    type: [
                        {
                            enter:Date,
                            exit:Date
                        }
                    ],
                    default:[]
                }
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
    user_id: {type: String, required: false}
});

export const Time: mongoose.Model<ITime> = mongoose.model('Time', TimeSchema);