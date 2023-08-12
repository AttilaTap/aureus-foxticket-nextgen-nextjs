import jwt from "jsonwebtoken";

const secretKey = "";
export default function createToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

export default function verifyToken(token) {
return jwt.verify(token,secretKey);
}
