import getConnection from '../utils/database.js';
import bcrypt from 'bcrypt';
import sgMail from '@sendgrid/mail';

export async function checkEmailExists(email) {
  const connection = await getConnection();
  const [users] = await connection.query(
    'SELECT * FROM usersDb WHERE email = ?',
    [email],
  );
  return users.length > 0;
}

export async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function registerUser(email, hashedPassword) {
  const connection = await getConnection();
  await connection.execute(
    'INSERT INTO usersDb (email, password) VALUES (?, ?)',
    [email, hashedPassword],
  );
}

export async function sendSuccessEmail(toEmail) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: toEmail,
    from: process.env.EMAIL_USERNAME,
    subject: 'Registration Successful',
    text: 'Congratulations on your successful registration!',
  };

  await sgMail.send(msg);
  console.log('Email sent to:', toEmail);
}
