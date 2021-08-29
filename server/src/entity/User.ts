import { mongoose, RootDocument } from './database'

export interface IUser extends RootDocument {
    uuid: string;
    email: string;
    name: string;
    token: string;
    admin: boolean;
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
},
    {
        usePushEach: true
    }
));


