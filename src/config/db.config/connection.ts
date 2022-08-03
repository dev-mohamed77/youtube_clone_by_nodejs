import { QueryResult } from "pg";
import pool from "./pool";

const db_connection = async <T>(query: string, values?: any[]) => {
  return new Promise<QueryResult<T>>((resolve, reject) => {
    pool.connect((err, connect) => {
      if (err) {
        reject(err);
      } else {
        connect.query(query, values!, (err, result) => {
          connect.release();
          if (err) {
            reject(err);
          } else {
            resolve(result as QueryResult<T>);
          }
        });
      }
    });
  });
};

export = db_connection;
