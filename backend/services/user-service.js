import bcrypt from "bcrypt";
import sgMail from "@sendgrid/mail";
import { emailTemplate } from "../utils/templates/email-templates.js";

export const USER_NOT_FOUND = "User not Found";

export async function checkEmailExists(connection, email) {
  const [users] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
  return users.length > 0;
}
//function for looking up users by their email
export async function findUserId(connection, email) {
  const [rows] = await connection.execute("SELECT user_id FROM users WHERE email = ?", email);
  if (rows.length === 0) {
    throw new Error(USER_NOT_FOUND);
  }
  const user_id = rows[0].user_id;
  return user_id;
}
export async function registerUser(connection, email, hashedPassword) {
  await connection.execute("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);
}

export async function sendSuccessEmail(toEmail) {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const emailSubject = "Registration Successful";
    const emailText = "Congratulations on your successful registration!";
    const msg = {
      to: toEmail,
      from: process.env.NEXTICKET_COMPANY_EMAIL,
      subject: emailSubject,
      text: emailText,
      html: emailTemplate(emailSubject, emailText),
    };
    await sgMail.send(msg);
    console.log("Email sent successfully!");
  } catch (error) {
    console.log("Error sending email:", error);
  }
}

export async function verifyUser(connection, email, password) {
  const [users] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
  if (users.length === 0) {
    return null;
  }
  const user = users[0];
  const match = await bcrypt.compare(password, user.password);
  console.log(`Pass match: ${match}`);
  return match;
}

export async function getEmailById(connection, id) {
  try {
    const [rows] = await connection.execute("SELECT email FROM users WHERE user_id = ?", [id]);
    return rows[0]?.email || null;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
}
