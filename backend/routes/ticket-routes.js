import express from "express";
import * as ticketControllerFile from "../controllers/ticket-controller.js";

const router = express.Router();
{
  let controller = new ticketControllerFile.TicketController();
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
  router.get("/ticket/:id", controller.ticketById);

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
  router.get("/tickets", controller.tickets);

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
  router.get("/tickets/:eventId", controller.getAvailableTickets);
  router.get("/tickets/:eventId/:category", controller.ticketsByCategory);
}

export default router;
