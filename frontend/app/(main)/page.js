"use client";

import EventCard from "../components/eventCard";
import Link from "next/link";
import useTicketStore from "@/store/store";

export default function HomePage() {
  const user = useTicketStore((state) => state.user);
  return (
    <div className="min-w-fit w-6/12">
      <div className="relative">
        {user && <h1 className="text-2xl font-semibold text-indigo-600 bg-white p-4 rounded-lg shadow-md mb-4">Hello, {user}!👋</h1>}
        <input type="text" placeholder="Search..." className="w-full rounded-full p-2 border border-solid  border-stone-200"></input>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-6 h-6 absolute bottom-2 right-2 stroke-stone-500 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <Link href="/event/">
        <EventCard dateFromDb="2023-08-05T18:00:00" eventName="The best Event in the History" eventLocation="Wasserschloss Klaffenbach, Chemnitz, Germany" availableTickets={7} />
      </Link>
    </div>
  );
}
