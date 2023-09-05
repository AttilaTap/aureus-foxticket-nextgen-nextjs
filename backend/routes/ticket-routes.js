import express from "express";
import * as ticketController from "../controllers/ticket-controller.js";

const router = express.Router();

router.get("/tickets/:id", ticketController.ticketById);
router.get("/tickets", ticketController.tickets);
export default router;
