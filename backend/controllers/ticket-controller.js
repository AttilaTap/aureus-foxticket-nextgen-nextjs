import * as ticketService from "../services/ticket-service.js";
import { getConnection } from "../utils/db-connection.js";

export async function ticketById(req, res) {
  const { id } = req.params;
  try {
    const connection = await getConnection();
    const ticket = await ticketService.getTicketById(connection, id);
    if (ticket) {
      res.status(200).json({ ticket: ticket });
    } else {
      res.status(400).json({ error: "Invalid ticket ID" });
    }
  } catch (error) {
    res.status(401).json({ error: `Request error: ${error}` });
  }
}

export async function tickets(req, res) {
  try {
    const connection = await getConnection();
    const tickets = await ticketService.getTickets(connection);
    res.status(200).json({ tickets: tickets });
  } catch (error) {
    res.status(401).json({ error });
  }
}

export async function getAvailableTickets(req, res) {
  try {
    const { eventId } = req.params;
    if (eventId === undefined) {
      throw new Error("Undefined event ID");
    }
    const connection = await getConnection();
    const { availableTickets, tickets } = await ticketService.fetchAvailableTickets(connection, eventId);
    res.json({ availableTickets, tickets });
  } catch (error) {
    console.log(`error in getAvailableTickets: ${error.message}`);
    res.status(401).json({ error: error.message });
  }
}
