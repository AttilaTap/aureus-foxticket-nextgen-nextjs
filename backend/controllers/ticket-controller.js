import * as ticketService from "../services/ticket-service.js";
import { getConnection } from "../utils/db-connection.js";

export async function ticketById(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID parameter is required" });
  }

  try {
    const connection = await getConnection();
    const ticket = await ticketService.getTicketById(connection, id);

    if (!ticket) {
      return res.status(400).json({ error: "Ticket not found" });
    }

    res.status(200).json({ ticket });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function tickets(req, res) {
  try {
    const connection = await getConnection();
    const tickets = await ticketService.getTickets(connection);

    if (!tickets) {
      return res.status(404).json({ error: "No tickets found" });
    }

    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAvailableTickets(req, res) {
  const { eventId } = req.params;

  if (!eventId) {
    return res.status(400).json({ error: "Event ID is required" });
  }

  try {
    const { eventId } = req.params;
    if (eventId === undefined) {
      throw new Error("Undefined event ID");
    }
    const connection = await getConnection();
    const { availableTickets, tickets } = await ticketService.fetchAvailableTickets(connection, eventId);
    res.status(200).json({ availableTickets, tickets });
  } catch (error) {
    console.log(`error in getAvailableTickets: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function ticketsByCategory(req, res) {
  const { eventId, category } = req.params;

  if (!eventId || !category) {
    return res.status(400).json({ error: "Event ID and Category parameters are required" });
  }

  try {
    const connection = await getConnection();
    const tickets = await ticketService.getTicketsByCategoryAndEventId(connection, eventId, category);

    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ error: "No tickets found for this category and event ID" });
    }

    res.status(200).json({ tickets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
