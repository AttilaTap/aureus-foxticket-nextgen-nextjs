import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
export default class DB {
  constructor() {
    this._connection = null;
  }

  async init() {
    try {
      let host = process.env.DB_HOST;
      let port = process.env.DB_PORT;
      let user = process.env.DB_USER;
      let database = process.env.DB_NAME;
      let password = process.env.DB_PASSWORD;

      const isTest = process.env.NODE_ENV === "test";
      if (isTest) {
        console.log("Heyyy, that's a testing DB connection being created here.");
        host = process.env.DB_TEST_HOST;
        port = process.env.DB_TEST_PORT;
        user = process.env.DB_TEST_USER;
        database = process.env.DB_TEST_NAME;
        password = process.env.DB_TEST_PASSWORD;
      }

      if (!this._connection) {
        this._connection = await mysql.createPool({ host, port, user, database, password, waitForConnections: true, connectionLimit: 10 });
        const connectionType = isTest ? "testing" : "production";
        console.log(`Successfully connected to ${connectionType} database`);
      }
    } catch (error) {
      console.log(`Error while connecting to db: ${error.message}`);
      throw error;
    }
  }

  getConnection() {
    return this._connection;
  }

  close() {
    this._connection.end((error) => {
      if (error) {
        console.error("Error closing MySQL connection:", error);
        return;
      }
    });
  }
}
