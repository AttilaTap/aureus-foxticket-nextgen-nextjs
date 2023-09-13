"use client";

// HomePage.js
import Link from "next/link";
import Welcome from "../components/welcome";
import EventShow from "../components/eventShow";
import EventCard from "../components/eventCard";
import SearchBar from "../components/searchBar";
import getBackendUrl from "../components/utils/environment";
import { useCallback, useEffect, useState } from "react";

export default function HomePage() {
  const [inputValue, setInputValue] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [events, setEvents] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      const fetchUrl = `${getBackendUrl()}events`;

      try {
        const response = await fetch(fetchUrl);
        if (response.ok) {
          const data = await response.json();
          data.sort((a, b) => a.name.localeCompare(b.name));
          setEvents(data);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("An error occurred while fetching events");
      }
    }

    fetchData();
  }, []);

  const searchHandler = useCallback(() => {
    const minInputLength = 1;

    if (inputValue.length >= minInputLength) {
      const filteredData = filterEvents(events, inputValue);
      setFilteredList(filteredData.slice(0, 4));
      setShowAllEvents(filteredData.length > 4);
      setNoResults(filteredData.length === 0);
    } else {
      setFilteredList(events.slice(0, 4));
      setShowAllEvents(false);
      setNoResults(false);
    }
  }, [events, inputValue]);

  useEffect(() => {
    searchHandler();
  }, [searchHandler, inputValue]);

  function filterEvents(events, inputValue) {
    const searchInput = inputValue.toLowerCase();
    return events.filter((event) => {
      const eventName = event.name || "";
      const words = eventName.toLowerCase().split(" ");
      return words.some((word) => word.startsWith(searchInput));
    });
  }

  return (
    <>
      <div className="min-w-fit w-6/12" id="wrapper">
        <div className="relatives">
          <Welcome />
          <SearchBar inputValue={inputValue} setInputValue={setInputValue} />
        </div>
        {inputValue.length > 0 ? (
          <div>
            {noResults ? (
              <p className="text-emerald-400 font-semibold text-lg mt-10 text-center">{`We couldn't find any results for that - try searching again.`}</p>
            ) : (
              filteredList.map((event) => (
                <Link key={event.id} href={`/event/${event.id}`} passHref>
                  <EventCard event={event} />
                </Link>
              ))
            )}
            {showAllEvents && (
              <button
                className="float-right mt-3 text-stone-100 bg-gradient-to-br from-gray-800 via-gray-600 to-emerald-400 hover:bg-gradient-to-bl font-semibold rounded-lg text-sm px-4 py-2"
                onClick={() => {
                  const filteredData = filterEvents(events, inputValue);
                  setFilteredList(filteredData);
                  setShowAllEvents(false);
                }}
              >
                Show All
              </button>
            )}
          </div>
        ) : (
          <EventShow />
        )}
      </div>
    </>
  );
}
