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
          const data = await res.json();
          setError(null);
          setEvents(data);
        } else {
          setError("Failed to fetch events");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("An error occurred while fetching events");
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {events.map((event) => (
        <Link key={event.id} href={`/event/${event.id}`} passHref>
          <EventCard event={event} />
        </Link>
      ))}
    </div>
  );
}
