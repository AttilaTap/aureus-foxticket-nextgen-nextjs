import express from "express";
import * as ticketController from "../controllers/ticket-controller.js";
import * as authController from "../controllers/auth-controller.js";

const router = express.Router();

/**
 * @openapi
 * /ticket/{ticketId}:
 *   get:
 *     tags:
 *       - ticket
 *     description: Returns a single ticket by ID
 *     parameters:
 *       - name: ticketId
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
 *               type: object
 *       400:
 *         description: invalid id
 *       401:
 *         description: request error
 */
router.get("/ticket/:id", ticketController.ticketById);

/**
 * @openapi
 * /tickets:
 *   get:
 *     tags:
 *       - ticket
 *     description: Returns all tickets
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: request error
 */
router.get("/tickets", ticketController.tickets);
// endpoint for buying tickets
/**
 * @openapi
 * /tickets/{eventId}:
 *   get:
 *     tags:
 *       - ticket
 *     description: Returns all available tickets for an event
 *     parameters:
 *       - name: eventId
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
 *               type: object
 *       401:
 *         description: request error
 */
router.get("/tickets/:eventId", ticketController.getAvailableTickets);
router.get("/tickets/:eventId/:category", ticketController.ticketsByCategory);
router.post("/buy", authController.authorizeAcess, ticketController.buyTickets);

export default router;
