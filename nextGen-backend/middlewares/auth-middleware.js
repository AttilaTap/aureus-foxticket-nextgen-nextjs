import { verifyToken } from "../services/jwt-service";

export default function tokenAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      verifyToken(token);
      next();
    } catch (e) {
      res.status(401).send({ error: "Invalid token" });
    }
  } else {
    res.status(401).send({ message: "There is no token" });
  }
}
