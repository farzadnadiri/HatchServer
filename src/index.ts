import express from 'express';
import http from "http";
import tasksRoute from "./routes/tasks.route";
import db from "./startup/db"; db();
import cors from "cors";

const app = express();
app.use(express.json())
var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use("/api/tasks", tasksRoute);

var httpServer = http.createServer(app);
httpServer.listen(8443, () => {
    return console.log(`Express is listening at http://localhost:8443`);
});