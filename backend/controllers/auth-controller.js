import * as jwtService from "../services/jwt-service.js";
import * as userService from "../services/user-service.js";
import jwt from "jsonwebtoken";
import { getConnection } from "../utils/db-connection.js";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const connection = await getConnection();
    const emailExists = await userService.checkEmailExists(connection, email);
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    await userService.registerUser(connection, email, password);

    await userService.sendSuccessEmail(email);

    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    return res.status(402).json({ message: `Unexpected registration error: ${error.message}` });
  }
};
//authentication for Secure Endpoints
export const authorizeAcess = async (req, res, next) => {
  const { token } = req.header("Authorization");
  if (!token || token === "" || token === undefined || token === null) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return res.status(401).json({ message: `failed to verify ${error.message}` });
  }

  console.log(decodedToken);

  if (!decodedToken.email) {
    return res.status(401).json({ message: decodedToken });
  }
  req.userEmail = decodedToken.email;
  next();
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const connection = await getConnection();
    const verified = await userService.verifyUser(connection, email, password);
    if (!verified) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = await jwtService.createToken(connection, { email });
    return res.status(200).json({
      token: token,
      login: email,
    });
  } catch (error) {
    return res.status(402).json({ message: `Unexpected login error: ${error.message}` });
  }
};
