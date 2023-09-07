export async function getAllEvents(connection) {
  try {
    const [events] = await connection.query("SELECT * FROM events");
    return events;
  } catch (error) {
    console.log("Error while selecting all events from db");
    return [];
  }
}

export async function fetchSpecificEvent(connection, eventId) {
  try {
    const [specificEvents] = await connection.query("SELECT * FROM events WHERE id = ?", [eventId]);
    return specificEvents[0];
  } catch (error) {
    console.log("Error while fetching specific event from db");
    return null;
  }
}
