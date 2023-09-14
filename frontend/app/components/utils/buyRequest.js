export async function sendBuyRequest(basket, userId, token) {
  try {
    const ticket_Ids = basket.map((ticket) => ticket.ticket_id);
    console.log(ticket_Ids);
    const data = { ticket_Ids: ticket_Ids };
    const response = await fetch("http://localhost:9000/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return "success";
    } else {
      const errorData = await response.json();
      console.error(`Error: ${response.status} - ${errorData.message}`);
      return "error";
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return "error";
  }
}
