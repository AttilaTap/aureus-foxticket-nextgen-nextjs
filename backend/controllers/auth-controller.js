import * as jwtService from "../services/jwt-service.js";
import * as userService from "../services/user-service.js";
import { verifyToken } from "../services/jwt-service.js";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const emailExists = await userService.checkEmailExists(email);
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    await userService.registerUser(email, password);

    await userService.sendSuccessEmail(email);

    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
};

export const authorizationJWT = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  if (!checkExpirationOnToken(token)) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const verified = await userService.verifyUser(email, password);
    if (!verified) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwtService.createToken({ email });

    return res.status(200).json({
      token: token,
      login: email,
    });
  } catch (error) {
    console.error("Error in login:", error);
    next(error);
  }
};
