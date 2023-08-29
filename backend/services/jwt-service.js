import jwt from "jsonwebtoken";
import { getConnection } from "../utils/db-connection.js";
import { findUserId } from "./user-service.js";

export async function createToken(payload) {
  const user_id = await findUserId([payload.email]);
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_AGE });
  const decodedToken = verifyToken(token);
  const expiryDate = new Date(decodedToken.exp * 1000);
  const connection = await getConnection();

  await connection.execute("UPDATE users SET authToken = ?, tokenExpiry = ? Where user_id = ?", [token, expiryDate, user_id]);

  return token;
}
export function verifyToken(token) {
  return jwt.verify(token, process.env.SECRET_KEY);
}
// Function for finding if there is a token in the db
export async function tokenInDatabase(token) {
  const connection = await getConnection();
  const [rows] = await connection.execute("SELECT FROM users Where authToken = ?,", [token]);
  return rows.length > 0 ? true : false;
}
// checking whether the token is expired and valid withou contacting the db
export function checkExpirationOnToken(token) {
  try {
    const decodedToken = verifyToken(token);
    return Date.now() >= decodedToken.exp * 1000;
  } catch (err) {
    return false;
  }
}
