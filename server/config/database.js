import mysql from "mysql2/promise";
import {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_SERVER_PORT,
  // CA_CERT,
} from "./envVar.js";

let connection;

export const connectDB = async () => {
  try {
    connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_SERVER_PORT,
      // ssl: {
      //   ca: CA_CERT,
      // },
    });
    console.log("Connected to databse successfully!");
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
};

export { connection };
