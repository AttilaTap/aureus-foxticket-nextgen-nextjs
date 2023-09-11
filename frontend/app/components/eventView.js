"use client";

import Image from "next/image";
import React from "react";
import Arrow from "@/app/components/svg/arrow";
import Calendar from "@/app/components/svg/calendar";
import Pointer from "@/app/components/svg/pointer";
import City from "@/app/components/svg/city";
import IconTextPair from "./utils/icon-text-pair";
import NumberTextPair from "./utils/number-text-pair";
import { getDayOfWeek, formatDate, formatTime } from "./utils/date-utils";
import Ticket from "./svg/ticket";
import { useState } from "react";
import { useRouter } from "next/navigation";

const TicketButton = ({ category, eventId }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    router.push(`/tickets/${eventId}/${category}`);
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="hover:bg-gray-400 w-[115px] inline-flex justify-center items-center border border-white px-4 rounded-3xl"
    >
      <span className="pr-2">Buy</span>
      <Ticket fillColor={isHovered ? "rgb(255, 191, 0)" : "rgb(255, 255, 255)"} />
    </button>
  );
};

const EventView = ({ eventData, ticketData, availableTicketData }) => {
  if (!eventData || !ticketData) {
    return <div>Loading...</div>;
  }

  const eventStartDate = new Date(eventData.start_time);

  const groupedTickets = ticketData.reduce((acc, ticket) => {
    const perTicketPrice = ticket.price / ticket.how_many;

    if (!acc[ticket.category]) {
      acc[ticket.category] = {
        how_many: 0,
        min_price: Infinity,
        max_price: -Infinity,
        currency: ticket.currency,
      };
    }

    acc[ticket.category].how_many += ticket.how_many;
    acc[ticket.category].min_price = Math.min(acc[ticket.category].min_price, perTicketPrice);
    acc[ticket.category].max_price = Math.max(acc[ticket.category].max_price, perTicketPrice);

    return acc;
  }, {});

  return (
    <div className="w-full mx-auto">
      <div>
        <div className="flex justify-center">
          <div className="w-3/5">
            <div className="flex justify-center -mt-20">
              <Image src="/background-img/bg-image-event-one.jpg" width={600} height={600} className="rounded-md" alt="Picture of the event" />
            </div>
            <div className="w-full justify-center">
              <h1 className="text-5xl font-bold pt-9 text-center">{eventData.name}</h1>
              <div className="flex flex-row space-x-4 justify-center pt-3">
                <IconTextPair icon={Calendar} text={[getDayOfWeek(eventStartDate), " - ", formatDate(eventStartDate), " - ", formatTime(eventStartDate)]} />
                <IconTextPair icon={Pointer} text={eventData.location} />
                <IconTextPair icon={City} text={`${eventData.city}, ${eventData.country}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center">
          <div className="w-3/5">
            <div className="flex justify-between items-center pt-12">
              <h1 className="text-3xl font-bold">Tickets</h1>
              <button type="submit" className="bg-stone-600 w-28 h-8 rounded-full font-semibold text-stone-100 mt-6">
                Sell tickets
              </button>
            </div>
            <div className="flex flex-row space-x-2 pb-10">
              <NumberTextPair number={availableTicketData} text="available" />
              <Arrow />
              <NumberTextPair number={Math.floor(Math.random() * 1000) + 1} text="sold" />
              <Arrow />
              <NumberTextPair number={Math.floor(Math.random() * 1000) + 1} text="wanted" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-12">
        <div className="w-3/5">
          <h1 className="text-xl font-bold pb-2">Available</h1>

          {Object.keys(groupedTickets).map((category, index) => {
            const currency = groupedTickets[category].currency;
            const options = {
              style: "currency",
              currency: currency,
              minimumFractionDigits: currency === "HUF" ? 0 : 2,
              maximumFractionDigits: currency === "HUF" ? 0 : 2,
            };

            const currencyFormatter = new Intl.NumberFormat("en-US", options);

            return (
              <div key={index} className="card bg-gray-800 min-w-[590px] flex justify-between mb-4">
                <div className="m-4 w-full min-w-[160px] pl-8">
                  <span className="font-bold text-lg">{category}</span>
                  <span className="block text-black-500 text-sm">Total available: {groupedTickets[category].how_many.toLocaleString()}</span>
                </div>
                <div className="m-4 flex flex-grow justify-center items-center pr-16">
                  <span className="mr-4">{currencyFormatter.format(groupedTickets[category].min_price)}</span>
                  {" - "}
                  <span className="ml-4">{currencyFormatter.format(groupedTickets[category].max_price)}</span>
                </div>
                <div className="w-48 flex flex-row justify-end items-center pr-8">{<TicketButton category={category} eventId={eventData.id} />}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventView;
