import express from "express";
import * as purchaseControllerFile from "../controllers/purchase-controller.js";
import * as authControllerFile from "../controllers/auth-controller.js";

const router = express.Router();

{
  let purchaseController = new purchaseControllerFile.PurchaseController();
  let authController = new authControllerFile.AuthController();
  router.post("/buy", authController.authorizeAcess, purchaseController.buyTickets);
}

export default router;
