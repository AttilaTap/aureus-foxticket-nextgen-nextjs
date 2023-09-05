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
