"use client";
import TicketToBuy from "./tickets-to-buy";
import useTicketStore from "@/store/store";

export default function BasketView() {
  const [basket] = useTicketStore((state) => [state.basket, state.removeFromBasket]);
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
      <h1 className="font-bold text-3xl text-stone-600 mb-2">Card</h1>
      <p className="text-xl text-stone-600 mb-2">Your tickets are reserved for 10 minutes.</p>
      <div className="h-fit w-full border-1 self-center rounded bg-stone-100  mb-2">
        <TicketToBuy />
      </div>
      <div className="flex justify-between mt-2">
        <p className="font-bold text-xl text-stone-600 mb-2">
          Total: {totalPrice} {currency}
        </p>
        <button className="w-32 h-30 bg-stone-600 rounded-full font-bold text-xl text-stone-100">Buy ticket</button>
      </div>
    </div>
  );
}
