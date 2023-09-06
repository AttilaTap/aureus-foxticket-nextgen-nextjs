"use client";
import { useEffect, useState } from "react";
import EventView from "@/app/components/eventView";
import getBackendUrl from "@/app/components/utils/environment";

export default function EventPage({ params }) {
  const [eventData, setEventData] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [availableTicketData, setAvailableTicketData] = useState(null);

  useEffect(() => {
    if (!params.eventId) {
      console.error("Missing params or eventId");
      return;
    }

    async function fetchEvent() {
      const url = `${getBackendUrl()}events/${params.eventId}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch event data");
        }
        const eData = await response.json();
        setEventData(eData);
      } catch (error) {
        console.error("Fetch event error:", error);
      }
    }

    async function fetchTickets() {
      const url = `${getBackendUrl()}tickets/${params.eventId}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch tickets data");
        }
        const tData = await response.json();
        setTicketData(tData);
        setAvailableTicketData(tData);
      } catch (error) {
        console.error("Fetch tickets error:", error);
      }
    }

    async function fetchData() {
      await fetchEvent();
      await fetchTickets();
    }

    fetchData();
  }, [params.eventId]);

  return (
    <div>
      {eventData && ticketData ? <EventView eventData={eventData} ticketData={ticketData.tickets} availableTicketData={ticketData.availableTickets} /> : <div>Loading...</div>}
    </div>
  );
}
