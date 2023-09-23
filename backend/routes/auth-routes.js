import express from "express";
import * as authController from "../controllers/auth-controller.js";

const router = express.Router();

{
  let controller = new authController.AuthController();
  router.post("/register", controller.register);
  router.post("/login", controller.login);
  //mock secure endpoint
  router.post("/securePlace", controller.authorizeAcess, (req, res) => {
    return res.status(200).json({ message: "Secure endpoint accessed successfully" });
  });
}

export default router;
