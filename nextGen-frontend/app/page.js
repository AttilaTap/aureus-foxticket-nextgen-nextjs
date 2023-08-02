import Image from "next/image";
import EventCard from "./components/eventCard";
export default function Home() {
  return (
    <div className="min-w-fit w-6/12">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-full p-2 border border-solid  border-stone-200"
        ></input>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          className="w-6 h-6 absolute bottom-2 right-2 stroke-stone-500 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <EventCard />
      <EventCard />
    </div>
  );
}
