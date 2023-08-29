import { getConnection } from "../utils/db-connection.js";
import bcrypt from "bcrypt";
import sgMail from "@sendgrid/mail";
import { emailTemplate } from "../utils/templates/email-templates.js";

export async function checkEmailExists(email) {
  const connection = await getConnection();
  const [users] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
  return users.length > 0;
}
export async function findUserId(email) {
  const connection = await getConnection();
  const [rows] = await connection.execute("SELECT user_id FROM users WHERE email = ?", email);
  if (rows.length === 0) {
    throw new Error("User not Found");
  }
  const user_id = rows[0].user_id;
  return user_id;
}
export async function registerUser(email, hashedPassword) {
  const connection = await getConnection();
  await connection.execute("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);
}

export async function sendSuccessEmail(toEmail) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: toEmail,
    from: process.env.NEXTICKET_COMPANY_EMAIL,
    subject: "Registration Successful",
    text: "Congratulations on your successful registration!",
    html: emailTemplate(subject, text),
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function verifyUser(email, password) {
  const connection = await getConnection();
  const [users] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
  if (users.length === 0) {
    return null;
  }
  const user = users[0];
  const match = await bcrypt.compare(password, user.password);
  console.log(`Does it really match: ${match}`);
  return match;
}
