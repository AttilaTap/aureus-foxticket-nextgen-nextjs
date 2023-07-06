import mysql from 'mysql';

let pool;

const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: 'localhost',
      user: 'your_username',
      password: 'your_password',
      database: 'your_database',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  return pool;
};

export default getPool;
