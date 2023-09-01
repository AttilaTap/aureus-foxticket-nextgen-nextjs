import express from "express";
import * as authController from "../controllers/auth-controller.js";
import * as testController from "../controllers/test-controller.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
//mock secure endpoint
router.post("/securePlace", authController.secureEndpoint, (req, res) => {
  return res.status(200).json({ message: "Secure endpoint accessed successfully" });
});

router.get("/isAvailable", testController.isAvailable);

export default router;
