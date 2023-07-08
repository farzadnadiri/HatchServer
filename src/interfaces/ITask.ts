import mongoose from "mongoose";

export interface ITask extends mongoose.Document {
    name: string,
    updatedOn: number,
    done: boolean,
};