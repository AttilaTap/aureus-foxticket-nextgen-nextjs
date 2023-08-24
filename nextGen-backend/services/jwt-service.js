import jwt from 'jsonwebtoken';

export function createToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_AGE });
}

export function verifyToken(token) {
  const secretKey = process.env.SECRET_KEY;
  return jwt.verify(token, secretKey);
}

