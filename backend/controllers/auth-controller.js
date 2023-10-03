import * as jwtService from "../services/jwt-service.js";
import * as userService from "../services/user-service.js";
import DB from "../utils/db-connection.js";

export class AuthController {
  async register(req, res) {
    let db = new DB();
    try {
      await db.init();
      const { email, password } = req.body;

      const emailExists = await userService.checkEmailExists(db.getConnection(), email);
      if (emailExists) {
        return res.status(400).json({ error: "Email already exists" });
      }

      await userService.registerUser(db.getConnection(), email, password);

      await userService.sendSuccessEmail(email);

      return res.status(201).json({ message: "Registration successful" });
    } catch (error) {
      return res.status(402).json({ message: `Unexpected registration error: ${error.message}` });
    } finally {
      db.close();
    }
  }

  async authorizeAcess(req, res, next) {
    const token = req.get("Authorization");
    console.log(token);
    if (!token || token === "" || token === undefined || token === null) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decodedToken = jwtService.verifyToken(token);
      console.log(decodedToken);
      if (!decodedToken.email) {
        return res.status(401).json({ message: "Can not authorize user" });
      }
      req.userEmail = decodedToken.email;
    } catch (error) {
      return res.status(401).json({ message: `failed to verify ${error.message}` });
    }
    next();
  }

  async login(req, res) {
    let db = new DB();
    try {
      await db.init();
      const { email, password } = req.body;
      const verified = await userService.verifyUser(db.getConnection(), email, password);
      if (!verified) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const token = await jwtService.createToken(db.getConnection(), { email });
      return res.status(200).json({
        token: token,
        login: email,
      });
    } catch (error) {
      return res.status(402).json({ message: `Unexpected login error: ${error.message}` });
    } finally {
      db.close();
    }
  }
}
