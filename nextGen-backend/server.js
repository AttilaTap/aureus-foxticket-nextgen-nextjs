import express from 'express';
import getConnection from './utils/database.js';

try {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  let conn = getConnection();

  // TODO(ANF-15) DUMMY db test and endpoint test. Delete later when there is valid code here.
  // conn.query(
  //     'INSERT INTO usersdb (email, password) VALUES ("joshka@freemail.hu", "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f");',
  //     function(err, results, fields) {
  //       console.log(results);
  //       console.log(fields);
  //     }
  //   );
  //
  // app.get('/', (req, res) => {
  //     res.send('Hello World, from express');
  // });

  app.listen(9000, () => {
    console.log("I'm running");
  });
} catch (error) {
  console.log('Application crashed');
  console.log(error);
}
