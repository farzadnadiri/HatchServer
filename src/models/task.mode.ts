import mongoose from "mongoose";
import { ITask } from "../interfaces/ITask";

const schema = new mongoose.Schema({
    name: String,
    updatedOn: Number,
    done: Boolean,
});

export const Task = mongoose.model<ITask>("Task", schema);