import { getAllEvents, fetchSpecificEvent } from "../services/event-service.js";
import DB from "../utils/db-connection.js";

export class EventController {
  constructor() {
    this.getEventsError = { error: "Internal server error" };
  }

  async getEvents(req, res) {
    let db = new DB();
    try {
      await db.init();
      const events = await getAllEvents(db.getConnection());
      res.json(events);
    } catch (error) {
      console.log(error);
      res.status(500).json(getEventsError);
    } finally {
      db.close();
    }
  }

  async getEventById(req, res) {
    const eventId = req.params.eventId;
    if (!eventId) {
      return res.status(400).json({ error: "Event ID is required" });
    }

    let db = new DB();
    try {
      await db.init();
      const event = await fetchSpecificEvent(db.getConnection(), eventId);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    } finally {
      db.close();
    }
  }
}
