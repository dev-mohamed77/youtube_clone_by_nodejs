import dotenv from "dotenv";

dotenv.config();

const {
  PORT,
  DB_USERNAME,
  DB_NAME,
  DB_PORT,
  DB_PASSWORD,
  HOST,
  JWT_SECRET,
  DATABASE_URL,
} = process.env;

export default {
  port: parseInt(PORT as string, 10) || 8800,
  db_username: DB_USERNAME,
  db_port: parseInt(DB_PORT as string, 10) || 5432,
  db_name: DB_NAME,
  db_password: DB_PASSWORD,
  host: HOST,
  database_url: DATABASE_URL,
  jwt_secret: JWT_SECRET,
};
