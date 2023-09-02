export default function BasketView() {
  return (
    <div className="flex flex-col w-5/6 sm:w-1/3 h-5/6 md:h-3/4 lg:h-1/2 bg-stone-200 rounded-lg p-4 grow">
      <h1 className="font-bold text-3xl text-stone-600 mb-2">Card</h1>
      <p className="text-xl text-stone-600 mb-2">Message</p>

      <div className="h-full w-full border-1 self-center rounded bg-stone-100  mb-2"></div>
      <div className="flex justify-between mt-2">
        <p className="font-bold text-xl text-stone-600 mb-2">Total: 5000 EUR</p>
        <button className="w-32 h-30 bg-stone-600 rounded-full font-bold text-xl text-stone-100">Buy ticket</button>
      </div>
    </div>
  );
}
