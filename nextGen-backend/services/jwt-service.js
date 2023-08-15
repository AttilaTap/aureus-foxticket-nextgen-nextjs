import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;
export function createToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

export function verifyToken(token) {
  return jwt.verify(token, secretKey);
}
