import fs from "fs";
import mongoose from "mongoose";
import nconf from "nconf";

const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

export const AppConfig = () => {
    nconf.argv({
        p: {
            alias: "http:port",
            describe: "The port to listen"
        }
    });
    nconf.file("./config.json");
    nconf.defaults({
        http: {
            port: 8000
        }
    });
    mongoose.connect(config.mongodb.url, { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection.once("open", () => {
        // tslint:disable-next-line:no-console
        console.log("MongoDB connection successfull !");
    }).on("error", (err) => {
        // tslint:disable-next-line:no-console
        console.error("Error while making connection with mongo db error: %s", err);
    });
};
