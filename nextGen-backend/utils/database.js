const mysql = require('mysql2'); // to use mysql12
import dotenv from 'dotenv'; // to use env

dotenv.config();

let connection;

const getConnection = () => {
  if (!connection) {
    connection = mysql.createConnection({
      host: process.env.DB_HOST,  // to use the env template
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    }).catch(err => {
      console.log("Failed to create a connection: ", err); // check error while create the database
    });
  }

  return connection;
};

export default getConnection;
