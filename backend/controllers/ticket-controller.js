import * as ticketService from "../services/ticket-service.js";
import DB from "../utils/db-connection.js";

export class TicketController {
  async ticketById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID parameter is required" });
    }

    let db = new DB();
    try {
      await db.init();
      const ticket = await ticketService.getTicketById(db.getConnection(), id);

      if (!ticket) {
        return res.status(400).json({ error: "Ticket not found" });
      }

      res.status(200).json({ ticket });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    } finally {
      db.close();
    }
  }

  async tickets(req, res) {
    let db = new DB();
    try {
      await db.init();
      const tickets = await ticketService.getTickets(db.getConnection());
      if (!tickets) {
        return res.status(404).json({ error: "No tickets found" });
      }
      res.status(200).json({ tickets });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    } finally {
      db.close();
    }
  }

  async getAvailableTickets(req, res) {
    const { eventId } = req.params;
    if (!eventId) {
      return res.status(400).json({ error: "Event ID is required" });
    }

    let db = new DB();
    try {
      await db.init();
      const { availableTickets, tickets } = await ticketService.fetchAvailableTickets(db.getConnection(), eventId);
      res.status(200).json({ availableTickets, tickets });
    } catch (error) {
      console.log(`error in getAvailableTickets: ${error.message}`);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      db.close();
    }
  }

  async ticketsByCategory(req, res) {
    const { eventId, category } = req.params;
    if (!eventId || !category) {
      return res.status(400).json({ error: "Event ID and Category parameters are required" });
    }

    let db = new DB();
    try {
      await db.init();
      const tickets = await ticketService.getTicketsByCategoryAndEventId(db.getConnection(), eventId, category);
      if (!tickets || tickets.length === 0) {
        return res.status(404).json({ error: "No tickets found for this category and event ID" });
      }
      return res.status(200).json({ tickets: tickets });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    } finally {
      db.close();
    }
  }
}
