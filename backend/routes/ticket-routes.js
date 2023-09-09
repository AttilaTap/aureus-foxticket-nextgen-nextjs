import express from "express";
import * as ticketController from "../controllers/ticket-controller.js";

const router = express.Router();

/**
 * @openapi
 * /ticket/{id}:
 *   get:
 *     tags:
 *       - ticket
 *     description: Returns a single ticket by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the ticket
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
                type: object
 */
router.get("/ticket/:id", ticketController.ticketById);
router.get("/tickets", ticketController.tickets);
router.get("/tickets/:eventId", ticketController.getAvailableTickets);

export default router;
