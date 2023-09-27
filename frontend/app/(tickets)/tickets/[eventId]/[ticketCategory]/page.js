"use client";
import { useEffect, useState } from "react";
import TicketView from "@/app/components/ticket-view";
import getBackendUrl from "@/app/components/utils/environment";

export default function TicketPage({ params }) {
  const [eventData, setEventData] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    if (!params.eventId) {
      console.log("Missing params or eventId");
      return;
    }

    async function fetchEvent() {
      const url = `${getBackendUrl()}event/${params.eventId}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch event data");
        }
        const eData = await response.json();
        setEventData(eData);
      } catch (error) {
        console.log("Fetch event error:", error);
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
      } catch (error) {
        console.log("Fetch tickets error:", error);
      }
    }

    async function fetchCategory() {
      const url = `${getBackendUrl()}tickets/${params.eventId}/${decodeURIComponent(params.ticketCategory)}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch category data");
        }
        const cData = await response.json();
        setCategoryData(cData);
      } catch (error) {
        console.log("Fetch category error:", error);
      }
    }

    async function fetchData() {
      await fetchEvent();
      await fetchTickets();
      await fetchCategory();
    }

    fetchData();
  }, [params.eventId, params.ticketCategory]);

  const decodedCategory = decodeURIComponent(params.ticketCategory);

  return <div>{eventData && ticketData ? <TicketView eventData={eventData} ticketData={ticketData.tickets} ticketCategory={decodedCategory} /> : <div>Loading...</div>}</div>;
}
