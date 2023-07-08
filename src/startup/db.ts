
import mongoose from "mongoose";

export default function () {
    //TODO: move connection string to environment variables for security
    const con = "mongodb+srv://farzadnadiri:xC3VFQNv5MoBehKM@cluster0.7hk9jtt.mongodb.net/?retryWrites=true&w=majority";

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