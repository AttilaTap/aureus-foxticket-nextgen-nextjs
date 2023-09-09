import * as ticketService from "../services/ticket-service.js";
import { getConnection } from "../utils/db-connection.js";

export async function ticketById(req, res) {
  const { id } = req.params;
  try {
    const connection = await getConnection();
    const ticket = await ticketService.getTicketById(connection, id);
    if (ticket) {
      res.status(200).json({ ticket: ticket });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

export async function tickets(req, res) {
  try {
    const connection = await getConnection();
    const tickets = await ticketService.getTickets(connection);
    if (tickets) {
      res.status(200).json({ tickets: tickets });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

export async function getAvailableTickets(req, res) {
  const { eventId } = req.params;
  try {
    const connection = await getConnection();
    const { availableTickets, tickets } = await ticketService.fetchAvailableTickets(connection, eventId);
    res.json({ availableTickets, tickets });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
