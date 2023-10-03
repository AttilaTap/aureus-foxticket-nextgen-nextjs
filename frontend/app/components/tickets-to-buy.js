"use client";
import Image from "next/image";
import trash from "@/public/delete-ticket.svg";
import useTicketStore from "@/store/store";

export default function TicketToBuy() {
  const [basket, removeFromBasket] = useTicketStore((state) => [state.basket, state.removeFromBasket]);

  const removeTicketFromCart = (ticketId) => {
    removeFromBasket(ticketId);
    console.log(basket);
  };

  return basket.length === 0 ? (
    <p>The cart is empty</p>
  ) : (
    basket.map((ticket) => {
      return (
        <div key={ticket.id} className="p-2 text-stone-600 border-b-2 border-stone-200">
          <p className="font-bold text-2xl">{ticket.name}</p>
          <div className="flex gap-2">
            <p className="text-xl">{ticket.start_date}</p>
            <p className=" text-xl">{ticket.location}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <p className=" text-xl">{ticket.currency}</p>
              <p className=" text-xl">{ticket.price}</p>
              <p className=" text-xl">/ ticket</p>
            </div>
            <button onClick={() => removeTicketFromCart(ticket.ticket_id)}>
              <Image src={trash} alt="trash-can" className="w-5 h-5"></Image>
            </button>
          </div>
        </div>
      );
    })
  );
}
