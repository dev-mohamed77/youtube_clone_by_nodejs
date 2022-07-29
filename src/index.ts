import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import config from "../src/config/config";
import db_connection from "./config/db.config/connection";

const app = express();

app.use(helmet());

app.use(morgan("common"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const result = await db_connection("SELECT NOW()", []);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
});

app.listen(config.port, () => {
  console.log("start app ...." + config.port);
});
