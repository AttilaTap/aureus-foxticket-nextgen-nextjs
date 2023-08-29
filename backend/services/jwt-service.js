import jwt from "jsonwebtoken";
import { getConnection } from "../utils/db-connection.js";
import { findUserId } from "./user-service.js";

export async function createToken(payload) {
  const user_id = await findUserId([payload.email]);
  console.log(user_id);
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
export function checkExpirationOnToken(token) {
  try {
    const decodedToken = verifyToken(token);
    if (Date.now() >= decodedToken.exp * 1000) {
      return res.status(401).json({ message: "Token has expired" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

  return res.status(401).json({ message: "Token has expired" });
}

// jwtservices
