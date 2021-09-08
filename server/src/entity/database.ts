import mongoose from "mongoose";

const MONGO_URL = String(process.env.MONGO_URL);

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
    throw err;
});

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface RootDocument {
    _id: mongoose.Types.ObjectId;
}
export function createNew<T extends RootDocument>(model: mongoose.Model<T & mongoose.Document, {}>, doc: Omit<T, "_id">) {
    return new model(doc);
}

export { mongoose }

