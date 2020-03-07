// modules
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import nconf from "nconf";

// custom services & configurations
import { AppConfig } from "./config/config";
import Routes from "./routes";

// initializations
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

AppConfig();

const routes = new Routes(app);
const port: number = nconf.get("http:port");

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server has been started at http://127.0.0.1:${port}`);
});

export default app;
