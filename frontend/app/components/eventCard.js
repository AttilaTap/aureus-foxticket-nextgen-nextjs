import { useEffect, useState } from "react";
import getBackendUrl from "../components/utils/environment";
import Ticket from "./svg/ticket";

const EventCard = ({ event }) => {
  const [ticketData, setTicketData] = useState({ availableTickets: 0, tickets: [] });
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    async function fetchTicketData() {
      try {
        // console.log(`Event ID to fetch: ${event.id}`);
        const response = await fetch(`${getBackendUrl()}tickets/${event.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch ticket data 1");
        }
        const data = await response.json();
        setTicketData(data);
        // setFetchError(null);
      } catch (error) {
        console.error("Fetch error:", error);
        // setFetchError("Failed to fetch ticket data 2");
      }
    }

    fetchTicketData();
  }, [event.id]);

  const date = new Date(event.start_time);
  // Functions for making the date usefull
  const getDayOfWeek = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getDay()];
  };
  const formatDate = () => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}. ${month}. ${year}`;
  };
  const formatTime = () => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  if (fetchError) {
    return <div className="error-message">{fetchError}</div>;
  }
  return (
    <div className="card bg-gray-800 hover:bg-custom-gray">
      <div className="min-w-[100px] w-44 flex flex-col justify-center items-center">
        <span className="font-bold">{getDayOfWeek()}</span>
        <span className="font-bold">{formatDate()}</span>
        <span className="block text-black-500 text-sm">{formatTime()}</span>
      </div>
      <div className="m-4 w-full">
        <span className="font-bold text-lg">{event.name}</span>
        <span className="block text-black-500 text-sm">{event.description}</span>
        <span className="font-italic block text-black-500 text-sm mt-2">
          {event.location} -{" "}
          <i>
            {event.city}, {event.country}
          </i>
        </span>
      </div>
      <div className="w-48 p-2 flex flex-row justify-end items-center" style={{ marginRight: "0.5cm" }}>
        <span className="pr-4">{ticketData.availableTickets}</span>
        <Ticket />
      </div>
    </div>
  );
};
export default EventCard;
