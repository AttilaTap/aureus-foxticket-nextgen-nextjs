import { ControllerBase } from "./controller-base";
import * as ticketService from "../services/ticket-service.js";
import * as userService from "../services/user-service.js";
import DB from "../utils/db-connection.js";

export class PurchaseController {
  async buyTickets(req, res) {
    const { ticket_Ids } = req.body;
    if (!ticket_Ids || !Array.isArray(ticket_Ids)) {
      return res.status(400).json({ error: "Ticket IDs are required" });
    }
    const userEmail = req.userEmail;
    if (!userEmail) {
      return res.status(400).json({ error: "Logged in user required" });
    }

    let db = new DB();
    try {
      await db.init();
      const successMessages = [];
      const errorMessages = [];
      const buyer_id = await userService.findUserId(db.getConnection(), [userEmail]);

      for (const ticket_Id of ticket_Ids) {
        const ticket = await ticketService.getTicketById(db.getConnection(), ticket_Id);
        if (!ticket) {
          errorMessages.push(`Ticket with ID ${ticket_Id} not found`);
          continue;
        }
        if (ticket.available !== "YES") {
          errorMessages.push(`Ticket with ID ${ticket_Id} is not available for purchase`);
          continue;
        }

        await ticketService.updateTicketAvailability(db.getConnection(), ticket_Id, buyer_id, "SOLD");
        successMessages.push(`Ticket with ID ${ticket_Id} purchased successfully`);
      }
      const responseMessage = {
        success: successMessages,
        error: errorMessages,
      };

      res.status(200).json(responseMessage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error1" });
    } finally {
      db.close();
    }
  }
}
