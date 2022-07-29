import pool from "./pool";

const db_connection = async (query: string, values?: any[]) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, connect) => {
      if (err) {
        reject(err);
      }
      connect.query(query, values!, (err, result) => {
        connect.release();
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      });
    });
  });
};

export = db_connection;
