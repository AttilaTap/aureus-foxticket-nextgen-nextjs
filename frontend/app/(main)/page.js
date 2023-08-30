"use client";

// HomePage.js
import { useEffect, useState } from "react";
import EventCard from "../components/eventCard";
import Welcome from "../components/welcome";
import Link from "next/link";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchUrl = "http://localhost:9000/events";

      try {
        const res = await fetch(fetchUrl);
        if (res.ok) {
          let data = await res.json();

          data = data.map((event) => {
            if (event.start_time) {
              const dateString = event.start_time;
              const [datePart, timePart] = dateString.split(" ");
              const [year, month, day] = datePart.split("-");
              const [hour, minute, second] = timePart.split(":");

              const date = new Date(year, month - 1, day, hour, minute, second);
              return { ...event, start_time: date };
            }
            return event;
          });

          setError(null);
          setEvents(data);
        } else {
          setError("Failed to fetch events");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "An error occurred");
      }
    }

    fetchData();
  }, []);

  function renderEventCards() {
    if (!events) return null;

    const flatEvents = events.flat().filter((item) => typeof item === "object" && item !== null && item.hasOwnProperty("id"));

    return flatEvents.map((event, index) => {
      return (
        <Link key={event.id || index} href={`/event/${event.id}`} passHref>
          <EventCard dateFromDb={event.start_time} eventName={event.name} eventLocation={event.location} eventDescription={event.description} availableTickets={10} />
        </Link>
      );
    });
  }

  return (
    <div className="min-w-fit w-6/12">
      <div className="relative">
        <Welcome />
        <input type="text" placeholder="Search..." className="w-full rounded-full p-2 border border-solid border-stone-200"></input>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-6 h-6 absolute bottom-2 right-2 stroke-stone-500 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      {error && <p>{error}</p>}
      {renderEventCards()}
    </div>
  );
}
