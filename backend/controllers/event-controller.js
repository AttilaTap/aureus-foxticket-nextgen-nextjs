import { getAllEvents, fetchSpecificEvent } from "../services/event-service.js";
import { getConnection } from "../utils/db-connection.js";

export async function getEvents(req, res) {
  try {
    const connection = await getConnection();
    const events = await getAllEvents(connection);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getEventById(req, res) {
  const eventId = req.params.eventId;
  if (!eventId) {
    return res.status(400).json({ error: "Event ID is required" });
  }
  try {
    const connection = await getConnection();
    const event = await fetchSpecificEvent(connection, eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
