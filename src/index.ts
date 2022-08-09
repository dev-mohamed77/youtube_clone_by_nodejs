import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import config from "../src/config/config";
import db_connection from "./config/db.config/connection";
import db_queries from "../src/config/db.config/queries";
import { error_handler } from "./services/error_handler";
import router from "../src/routes/index";

const app = express();

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: "30mb" }));

app.use("/api/v1", router);

app.use(error_handler);

app.get("*", async (_req: express.Request, res: express.Response) => {
  res.status(404).json({
    status: false,
    message: "Page not found",
  });
});

app.listen(config.port, () => {
  console.log("start app .... " + config.port);
});
