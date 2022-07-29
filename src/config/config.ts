import dotenv from "dotenv";

dotenv.config();

const { PORT, DB_USERNAME, DB_NAME, DB_PORT, HOST, JWT_SECRET } = process.env;

export default {
  port: parseInt(PORT as string, 10) || 8800,
  db_username: DB_USERNAME,
  db_port: parseInt(DB_PORT as string, 10) || 5432,
  db_name: DB_NAME,
  host: HOST,
  jwt_secret: JWT_SECRET,
};
