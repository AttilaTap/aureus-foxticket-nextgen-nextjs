import TicketToBuy from "./tickets-to-buy";

export default function BasketView() {
  return (
    <div className="flex flex-col w-1/2 h-fit bg-stone-200 rounded-lg p-4 mb-10">
      <h1 className="font-bold text-3xl text-stone-600 mb-2">Card</h1>
      <p className="text-xl text-stone-600 mb-2">Message</p>

      <div className="h-fit w-full border-1 self-center rounded bg-stone-100  mb-2">
        <TicketToBuy />
      </div>
      <div className="flex justify-between mt-2">
        <p className="font-bold text-xl text-stone-600 mb-2">Total: 5000 EUR</p>
        <button className="w-32 h-30 bg-stone-600 rounded-full font-bold text-xl text-stone-100">Buy ticket</button>
      </div>
    </div>
  );
}
