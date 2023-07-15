import mysql from 'mysql2/promise'; // to use mysql12
import dotenv from 'dotenv';

dotenv.config();

let pool;

const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    }).catch(err => {
      console.log("Failed to create a connection pool: ", err);
    });
  }

  return pool;
};

export default getPool;
