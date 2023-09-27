import getBackendUrl from "@/app/components/utils/environment";

export async function sendBuyRequest(basket, userId, token) {
  try {
    const ticket_Ids = basket.map((ticket) => ticket.ticket_id);
    console.log(ticket_Ids);
    const data = { ticket_Ids: ticket_Ids };
    const response = await fetch(`${getBackendUrl()}buy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return "success";
    } else {
      const errorData = await response.json();
      console.log(`Error: ${response.status} - ${errorData.message}`);
      return "error";
    }
  } catch (error) {
    console.log("An error occurred:", error);
    return "error";
  }
}
