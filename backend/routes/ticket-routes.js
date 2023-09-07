import express from "express";
import * as ticketController from "../controllers/ticket-controller.js";

const router = express.Router();

router.get("/ticket/:id", ticketController.ticketById);
router.get("/tickets", ticketController.tickets);
router.get("/tickets/:eventId", ticketController.getAvailableTickets);

export default router;
