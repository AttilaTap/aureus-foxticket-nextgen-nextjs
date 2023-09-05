import Image from "next/image";
import trash from "@/public/trash-can.svg";
import getBackendUrl from "./utils/environment";
import useTicketStore from "@/store/store";

//const [ticketToBuy, setTicketToBuy] = useTicketStore((state) => [state.ticketToBuy, state.setTicketToBuy]);
const id = "1";
const res = await fetch(`${getBackendUrl()}tickets/${id}`);
const ticketById = await res.json();
console.log(ticketById);
//setTicketToBuy(ticketById);
//console.log(ticketToBuy);
const TicketsToBuy = [
  {
    name: "Esti Kornél Ráadásnap",
    start_date: "2023.09.22.",
    location: "Kobuci kert",
    user_picture: "",
    currency: "HUF",
    price: "5000",
  },
  {
    name: "Esti Kornél Ráadásnap",
    start_date: "2023.09.22.",
    location: "Kobuci kert",
    user_picture: "",
    currency: "HUF",
    price: "5000",
  },
];

export default function TicketToBuy() {
  return TicketsToBuy.map((ticket) => {
    return (
      <div className="p-2 text-stone-700 border-b-2 border-slate-200">
        <p className="font-bold text-2xl">{ticket.name}</p>
        <div className="flex gap-2">
          <p className="text-xl">{ticket.start_date}</p>
          <p className=" text-xl">"event_location"</p>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2">
            {/* <Image src="/" width={30} height={30} alt="The picture of the seller"> */}
            {/* Img
          </Image> */}
            <p className=" text-xl">{ticket.currency}</p>
            <p className=" text-xl">{ticket.price}</p>
            <p className=" text-xl">/ ticket</p>
          </div>
          <button>
            <Image src={trash} alt="trash-can"></Image>
          </button>
        </div>
      </div>
    );
  });
}
