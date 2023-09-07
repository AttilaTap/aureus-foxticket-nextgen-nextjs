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


const TicketButton = ({ ticket }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    // OnClick goes here!
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="hover:bg-gray-400 w-[115px] inline-flex justify-center items-center border border-white px-4 rounded-3xl"
    >
      <span className="pr-2">{ticket.how_many}</span>
      <Ticket fillColor={isHovered ? "rgb(255, 191, 0)" : "rgb(255, 255, 255)"} />
    </button>
  );
};

const EventView = ({ eventData, ticketData, availableTicketData }) => {
  
  if (!eventData || !ticketData) {
    return <div>Loading...</div>;
  }

  const eventStartDate = new Date(eventData.start_time);

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
          {ticketData.map((ticket, index) => {
            const ticketStartDate = new Date(ticket.start_time);
            const ticketEndDate = new Date(ticket.end_time);

            return (
              <div key={index} className="card bg-gray-800 min-w-[590px]">
                <div className="min-w-[115px] w-44 flex flex-col justify-center items-center">
                  <span className="font-bold">{formatDate(ticketStartDate)}</span>
                  <span className="font-bold">{eventData.is_festival ? formatDate(ticketEndDate) : ""}</span>
                </div>
                <div className="m-4 w-full min-w-[260px]">
                  <span className="font-bold text-lg">{ticket.category}</span>
                  <span className="block text-black-500 text-sm">{ticket.name}</span>
                  <span className="font-italic block text-black-500 text-sm mt-2">
                    <span className="mr-4">Section: {ticket.section}</span> /
                    <i className="ml-4">
                      <span className="mr-4">Row: {ticket.row_seating}</span>-<span className="ml-4">Seat: {ticket.seat}</span>
                    </i>
                  </span>
                </div>
                <div className="w-48 p-2 flex flex-row justify-end items-center" style={{ marginRight: "0.5cm" }}>
                  <TicketButton ticket={ticket} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventView;
