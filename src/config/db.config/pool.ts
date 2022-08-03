import { Pool } from "pg";
import config from "../config";

const pool = new Pool({
  host: config.host,
  database: config.db_name,
  port: config.db_port,
  user: config.db_username,
  password: config.db_password,
  connectionTimeoutMillis: 300,
  max: 4,
});

pool.on("connect", (connect) => {
  console.log("connect" + connect);
});

pool.on("error", (err: Error) => {
  console.log(`Error in Database + ${err.message}`);
});

export = pool;
