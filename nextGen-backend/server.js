import express from 'express';
import getConnection from './utils/database.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

try {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  let conn = getConnection();

  app.post('/user/reg', async (req, res) => {
    const { email, password } = req.body;

    // Check if email already exists
    const connection = getConnection();
    const [users] = await connection.execute(
      'SELECT * FROM usersDb WHERE email = ?',
      [email],
    );

    if (users.length) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user into the database
    await connection.execute(
      'INSERT INTO usersDb (email, password) VALUES (?, ?)',
      [email, hashedPassword],
    );

    // Send a success email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Registration Successful',
      text: 'Congratulations on your successful registration!',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.json({ message: 'User registered successfully' });
  });

  app.listen(9000, () => {
    console.log("I'm running");
  });
} catch (error) {
  console.log('Application crashed');
  console.log(error);
}
