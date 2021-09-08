import { mongoose, RootDocument } from './database'
//single interaction instance
export interface IInteractionInstance {
    timeIn: Date,
    timeOut: Date | undefined,
    duration: number| undefined,
    type: string //virtual or inperson
}


const InteractionInstanceSchema = {
    timein: {type: Date, required: true},
    timeout: Date,
    duration: Number,
    type: String
}

//unique interaction for each event/user combo
export interface IInteraction extends RootDocument {
    uuid: string;
    eventId: string;
    timeInOutPairs?: IInteractionInstance[];
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
    instances: [InteractionInstanceSchema]
}))


