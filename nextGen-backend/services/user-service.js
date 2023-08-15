import getConnection from "../utils/database.js";
import bcrypt from "bcrypt";
import sgMail from "@sendgrid/mail";

export async function checkEmailExists(email) {
  const connection = await getConnection();
  const [users] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
  return users.length > 0;
}

export async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function registerUser(email, hashedPassword) {
  const connection = await getConnection();
  await connection.execute("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);
}

export async function sendSuccessEmail(toEmail) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: toEmail,
    from: process.env.EMAIL_USERNAME,
    subject: "Registration Successful",
    text: "Congratulations on your successful registration!",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: 'Arial', sans-serif; background-color: #f3f4f6; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 0.5rem;">
        <div style="text-align: center;">
            <h2 style="font-size: 1.5rem; font-weight: 700; color: #1f2937; margin-bottom: 1rem;">Registration Successful</h2>
            <p style="font-size: 1rem; color: #4b5563;">Congratulations on your successful registration!</p>
        </div>
    </div>
</body>
</html>
`,
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
  return match;
}
