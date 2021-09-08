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
        eventType: string
    }[];
    employees?: {
        uuid: string;
        name: string;
        email: string;
    }[]; // Single scanner can be associated with multiple employees
    duration?: number
}


const InteractionSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
    },
    eventID: {
        type: String,
        required: true,
    },
    timeIn: {
        type: Date,
        required: false
    },
    timeOut: {
        type: Date,
        required: false
    }, 
    timeInOutPairs: {
        type:[{
            timeIn: Date,
            timeOut: Date,
            eventType: String
        }],
        default: []
    },
    employees: [{
        uuid: String,
        name: String,
        email: String
    }],
    duration: Number
})
InteractionSchema.index({ uuid: 1, eventID: 1}, { unique: true });


export const Interaction = mongoose.model<IInteraction & mongoose.Document>("Interaction", InteractionSchema
)



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