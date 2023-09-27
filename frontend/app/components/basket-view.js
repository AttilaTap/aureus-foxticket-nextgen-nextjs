"use client";
import TicketToBuy from "./tickets-to-buy";
import useTicketStore from "@/store/store";
import { useState } from "react";
import { sendBuyRequest } from "./utils/buyRequest";

export default function BasketView() {
  const [buyStatus, setBuyStatus] = useState(null);
  const [userEmailFromLocalStorage] = useTicketStore((state) => [state.userEmailFromLocalStorage]);
  const [basket, clearBasket] = useTicketStore((state) => [state.basket, state.clearBasket]);
  const [showNoTicketsError, setShowNoTicketsError] = useState(false);

  async function requestToBuy() {
    try {
      let token = null;
      if (window) {
        token = localStorage.getItem(process.env.NEXT_PUBLIC_COOKIE_NAME) || null;
      }
      if (basket.length === 0) {
        // Show the "No tickets selected" error message
        setShowNoTicketsError(true);
        return;
      }
      const buyResult = await sendBuyRequest(basket, userEmailFromLocalStorage, token);
      setBuyStatus(buyResult);
      if (buyResult === "success") {
        clearBasket();
      }
    } catch (error) {
      console.log("An error occurred:", error);
      return "error";
    }
  }
  let currency = "EUR";
  if (basket.length > 0) {
    currency = basket[0].currency;
  }
  const totalPrice = basket.reduce((acc, ticket) => {
    const value = parseFloat(ticket.price);
    if (value != NaN) {
      return acc + value;
    } else {
      return accumulator;
    }
  }, 0);

  return (
    <div className="flex flex-col w-1/3 h-fit bg-stone-200 rounded-lg p-4 mb-10 border border-solid border-stone-300">
      <h1 className="font-bold text-3xl text-stone-600 mb-2">Cart</h1>
      {buyStatus === "success" && <p className="text-green-500 font-semibold">Purchase successful!</p>}

      {buyStatus === "error" && <p className="text-red-500 font-semibold">Purchase failed. Have you logged in?</p>}
      {showNoTicketsError && <p className="text-red-500 font-semibold">No tickets selected.</p>}
      <p className="text-xl text-stone-600 mb-2">Your tickets are reserved for 10 minutes.</p>
      <div className="h-fit w-full border-1 self-center rounded bg-stone-100 min min-h-[60px] mb-2">
        <TicketToBuy />
      </div>
      <div className="flex justify-between mt-2">
        <p className="font-bold text-2xl text-stone-600 mb-2">
          Total: {totalPrice} {currency}
        </p>
        <button onClick={async () => requestToBuy()} type="submit" className="w-36 h-30 bg-stone-600 rounded-full font-bold text-xl text-stone-100">
          Buy ticket(s)
        </button>
      </div>
    </div>
  );
}
