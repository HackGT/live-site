import { mongoose, RootDocument } from './database'
//single interaction instance
export interface IInteractionInstance {
    timeIn: Date;
    timeOut?: Date | undefined;
    eventType: string; //virtual or inperson
}


const InteractionInstanceSchema = {
    timeIn: {type: Date, required: true},
    timeOut: Date,
    eventType: String
}

//unique interaction for each event/user combo
export interface IInteraction extends RootDocument {
    uuid: string;
    eventID: string;
    instances?: IInteractionInstance[];
    employees?: {
        uuid: string;
        name: string;
        email: string;
    }[]; // Single scanner can be associated with multiple employees
    virtualDuration?: number;
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
    instances: {
        type: [InteractionInstanceSchema],
        default: []
    },
    employees: {
        type: [{
            uuid: String,
            name: String,
            email: String
        }],
        default: [],
        required: false
    },
    virtualDuration: {
        type: Number,
        required: false,
        default: 0
    }
}))


