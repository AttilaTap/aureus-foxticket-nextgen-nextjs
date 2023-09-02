import { useEffect, useState } from "react";
import Link from "next/link";
import EventCard from "../components/eventCard";
import getBackendUrl from "../components/utils/environment";

export default function EventShow() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchUrl = `${getBackendUrl()}events`;

      try {
        const res = await fetch(fetchUrl);
        if (res.ok) {
          let data = await res.json();
          data = data.map((event) => {
            if (event.start_time) {
              const dateString = event.start_time;
              const [datePart, timePart] = dateString.split("T");
              const [year, month, day] = datePart.split("-");

              const [hour, minute, second] = timePart.split(":");
              const [realSec, garbage] = second.split(".");

              const date = new Date(year, month - 1, day, hour, minute, realSec);
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
    <div>
      {error && <p>{error}</p>}
      {renderEventCards()}
    </div>
  );
}
