import express from "express";
import mongoose from "mongoose";
import { ITask } from "../interfaces/ITask";
import { Task } from "../models/task.mode";

const router = express.Router();

router.post("/save", async (req: any, res: any) => {

    if (!req.body || !req.body.name) {
        return res.status(400);
    }

    var id = new mongoose.Types.ObjectId();
    const task: ITask = new Task({
        _id: id,
        name: req.body.name,
        updatedOn: Date.now(),
        done: false
    });
    await task.save();

    return res.send(task);
});


router.put("/update/:id", async (req: any, res: any) => {
    const status = parseInt(req.query.status, 0);

    console.log(req.params.id);
    console.log(status);

    const task = await Task.findOne({
        _id: req.params.id,
    }).exec();

    if (!task) return res.status(404);

    task.done = (status > 0 ? true : false);
    task.updatedOn = Date.now();
    await task.save();

    return res.send(req.params.id);
});


router.delete("/deleteAll", async (req: any, res: any) => {

    console.log("delete all");
    await Task.deleteMany({});
    return res.status(200);
});


// get todo list by page
router.get("/todoList", async (req: any, res: any) => {
    const keyword = req.query.term;
    const page = parseInt(req.query.pageNumber, 0);
    const size = parseInt(req.query.pageSize, 0);

    console.log("testss");
    const taks = await Task.find({
        name: new RegExp(keyword),
        done: false
    })
        .sort("name")
        .skip((page - 1) * size)
        .limit(size)
        .select("");

    return res.send(taks);

});

// get done list just 10 items
router.get("/doneList", async (req: any, res: any) => {
    const keyword = req.query.term;

    const taks = await Task.find({
        name: new RegExp(keyword),
        done: true
    })
        .sort("-updatedOn")
        .limit(10)
        .select("")
        .sort("name");

    return res.send(taks);
});


export default router;