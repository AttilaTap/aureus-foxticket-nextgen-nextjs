import * as ticketService from "../services/ticket-service.js";
import { getConnection } from "../utils/db-connection.js";

export const ticketById = async (req, res) => {
  const { id } = req.params;
  console.log("params", id);
  try {
    const connection = await getConnection();
    const ticket = await ticketService.getTicketById(connection, id);
    if (ticket) {
      res.status(200).json({ ticket: ticket });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const tickets = async (req, res) => {
  try {
    const connection = await getConnection();
    const tickets = await ticketService.getTickets(connection);
    if (tickets) {
      res.status(200).json({ tickets: tickets });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
