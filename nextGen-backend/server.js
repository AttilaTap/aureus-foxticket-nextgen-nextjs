import express from 'express';
import cors from 'cors';
import getConnection from './utils/database.js';
import bcrypt from 'bcrypt';
import sgMail from '@sendgrid/mail';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/user/reg', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email already exists
    const connection = await getConnection();
    let users;
    try {
      [users] = await connection.query(
        'SELECT * FROM usersDb WHERE email = ?',
        [email],
      );
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }

    if (users.length) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    let hashedPassword;
    try {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    } catch (error) {
      console.error('Password hashing error:', error);
      throw error;
    }

    // Insert the user into the database
    try {
      await connection.execute(
        'INSERT INTO usersDb (email, password) VALUES (?, ?)',
        [email, hashedPassword],
      );
    } catch (error) {
      console.error('Database insert error:', error);
      throw error;
    }

    // Send a success email
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: email,
        from: process.env.EMAIL_USERNAME,
        subject: 'Registration Successful',
        text: 'Congratulations on your successful registration!',
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent');
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error('Email sending error:', error);
      throw error;
    }

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

const server = app.listen(9000, () => {
  console.log("I'm running");
});

export { app, server };
