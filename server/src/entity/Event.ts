import { mongoose, RootDocument } from './database'


export interface IEvent extends RootDocument {
    id: string;
    name: string;
    hackathon: string;
    timeZone: string;
    startDay: Date;
    startTime: Date;
    endDay: boolean;
    endTime: boolean;
    duration: Number;
    type: String
    url: String
}

export const User = mongoose.model<IEvent & mongoose.Document>("Event", new mongoose.Schema({
    id: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    hackathon: {
        type: String
        },
    timeZone: String,
    startDay: {
        type: Date,
        default: false
    },
    startTime: {
        type: Date,
        default: false
    },
    endDay: {
        type: Date,
        default: false
    },
    endTime: {
        type: Date,
        default: false
    },
    duration: {
        type: Number,
        default: false
    },
    type: {
        type: String,
        default: false
    },
    url: {
        type: String, 
        default: false
    }
},
    {
        usePushEach: true
    }
));


