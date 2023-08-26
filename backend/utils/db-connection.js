import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let connection;

export async function getConnection() {
  try {
    if (!connection) {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
      });
    }

    console.log("Successfully connected");

    return connection;
  } catch (error) {
    console.log("Error while connecting to db");
    throw error;
  }
}
