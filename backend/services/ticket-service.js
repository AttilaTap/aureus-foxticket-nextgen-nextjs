export const TICKET_NOT_FOUND = "Ticket not found";

export async function getTicketById(connection, id) {
  const [rows] = await connection.execute('SELECT * FROM tickets WHERE ticket_id = ? AND available = "YES"', [id]);
  if (rows.length === 0) {
    return null;
  }
  const ticket = rows[0];
  return ticket;
}

export async function getTickets(connection) {
  const [rows] = await connection.execute("SELECT * FROM tickets");
  if (rows.length === 0) {
    throw new Error("No tickets found");
  }
  return rows;
}

export async function fetchAvailableTickets(connection, eventId) {
  const [results] = await connection.query('SELECT * FROM tickets WHERE event_id = ? AND available = "YES"', [eventId]);
  if (results.length === 0) {
    return { availableTickets: 0, tickets: {} };
  }
  const availableTickets = results.reduce((sum, ticket) => sum + ticket.how_many, 0);
  return { availableTickets, tickets: results };
}

export async function getTicketsByCategoryAndEventId(connection, eventId, category) {
  try {
    const [rows] = await connection.execute('SELECT * FROM tickets WHERE event_id = ? AND category = ? AND available = "YES"', [eventId, category]);
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (error) {
    console.log("Error in getTicketsByCategoryAndEventId:", error.message);
    return null;
  }
}
export async function updateTicketAvailability(connection, ticketId, buyer_id, available) {
  try {
    const query = "UPDATE tickets SET available = ? , buyer_id = ? WHERE ticket_id = ?";
    await connection.query(query, [available, buyer_id, ticketId]);
  } catch (error) {
    throw error;
  }
}
