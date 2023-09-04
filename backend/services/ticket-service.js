export const TICKET_NOT_FOUND = "Ticket not found";

export async function getTicketById(connection, id) {
  try {
    console.log(id);
    const [rows] = await connection.execute("SELECT * FROM tickets WHERE ticket_id = ?", [id]);
    if (rows.length === 0) {
      throw new Error(TICKET_NOT_FOUND);
    }
    const ticket = rows[0];
    console.log(ticket);
    return ticket;
  } catch (error) {
    return { error };
  }
}

export async function getTickets(connection) {
  try {
    const [rows] = await connection.execute("SELECT * FROM tickets");
    if (rows.length === 0) {
      throw new Error(TICKET_NOT_FOUND);
    }
    return rows;
  } catch (error) {
    return { error };
  }
}

export async function fetchAvailableTickets(eventId) {
  try {
    const connection = await getConnection();
    const [results] = await connection.query('SELECT * FROM tickets WHERE event_id = ? AND available = "YES"', [eventId]);

    const availableTickets = results.reduce((sum, ticket) => sum + ticket.how_many, 0);

    return { availableTickets, tickets: results };
  } catch (error) {
    console.error("Error fetching available tickets:", error);
    return { availableTickets: 0, tickets: [] };
  }
}
