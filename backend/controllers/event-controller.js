import { getAllEvents } from "../services/event-service.js";
import { getConnection } from "../utils/db-connection.js";

export default async function getEvents(req, res) {
  try {
    const connection = await getConnection();
    const events = await getAllEvents(connection);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
