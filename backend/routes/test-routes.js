import express from "express";
import * as testController from "../controllers/test-controller.js";

const router = express.Router();

/**
 * @openapi
 * /isAvailable:
 *   get:
 *     tags:
 *       - test
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get("/isAvailable", testController.isAvailable);

export default router;
