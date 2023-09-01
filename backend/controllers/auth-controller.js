import * as jwtService from "../services/jwt-service.js";
import * as userService from "../services/user-service.js";
import { checkExpirationOnToken, tokenInDatabase } from "../services/jwt-service.js";
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
    next(error);
  }
};
//authentication for Secure Endpoints
export const secureEndpoint = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  if (!checkExpirationOnToken(token)) {
    return res.status(401).json({ message: "Token expired" });
  }
  const connection = getConnection();
  if (await tokenInDatabase(connection, token)) {
    return res.status(401).json({ message: "Not the latest version of the Token" });
  }
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
    console.error("Error in login:", error);
    next(error);
  }
};
