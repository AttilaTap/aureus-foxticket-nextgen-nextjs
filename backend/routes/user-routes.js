import express from "express";
import * as userControllerFile from "../controllers/user-controller.js";

const router = express.Router();

{
  let controller = new userControllerFile.UserController();
  router.get("/:id/email", controller.getEmailById);
}

export default router;
