export async function getAllEvents(connection) {
  try {
    const [events] = await connection.query("SELECT * FROM events");
    return events;
  } catch (error) {
    console.log("Error while selecting all events from db");
    return [];
  }
}
