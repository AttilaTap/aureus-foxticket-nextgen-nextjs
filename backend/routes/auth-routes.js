import express from "express";
import * as authController from "../controllers/auth-controller.js";
import * as testController from "../controllers/test-controller.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/securePlace", authController.securePlace);

router.get("/isAvailable", testController.isAvailable);

export default router;
