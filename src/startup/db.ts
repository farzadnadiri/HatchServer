
import mongoose from "mongoose";

export default function () {
    //TODO: move connection string to environment variables for security
    const con = process.env.ConnectionString;
    mongoose.connect(con as string)
        .then(
            async () => {
                console.log("Connected to MongoDB..." + new Date().toISOString());
            }
        );

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, con + 'connection error:'));
    db.once('open', function callback() {
        console.log("connection opened to database" + new Date().toISOString());
    });
}
