import mysql from 'mysql2/promise'; // to use mysql12
import dotenv from 'dotenv'; // to use env

dotenv.config();

let pool;

const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,  // to use the env template
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    }).catch(err => {
      console.log("Failed to create a connection pool: ", err); // check error while create the database
    });
  }

  return pool;
};

export default getPool;
