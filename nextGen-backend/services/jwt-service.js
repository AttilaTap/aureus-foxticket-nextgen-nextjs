import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;
export function createToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: process.env.TOKEN_AGE });
}

export function verifyToken(token) {
  return jwt.verify(token, secretKey);
}
