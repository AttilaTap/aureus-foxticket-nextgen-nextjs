"use client";

import Image from "next/image";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Pointer from "@/app/components/svg/pointer";
import City from "@/app/components/svg/city";
import IconTextPair from "./utils/icon-text-pair";
import { formatDate, formatTime } from "./utils/date-utils";
import UserIcon from "./svg/user";
import ConfirmModal from "./buyConfirmationModal";
import useTicketStore from "@/store/store";

const TicketView = ({ ticketCategory, eventData, ticketData }) => {
  //states
  const [tickets, setTickets] = useState(ticketData || []);
  const [userEmails, setUserEmails] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [basket, addToBasket] = useTicketStore((state) => [state.basket, state.addToBasket]);
  const [userEmailFromLocalStorage, setUserEmailFromLocalStorage] = useTicketStore((state) => [state.userEmailFromLocalStorage, state.setUserEmailFromLocalStorage]);

  //variables
  const eventStartDate = new Date(eventData.start_time);
  const eventEndDate = new Date(eventData.end_time);
  //functions
  const availableToBuy = (ticketId) => {
    if (basket.length === 0) {
      return true;
    } else {
      const ticketAlreadyInBasket = basket.some((basketItem) => basketItem.ticket_id === ticketId);
      return !ticketAlreadyInBasket;
    }
  };
  const findTicketById = (ticketId) => {
    return tickets.find((ticket) => ticket.ticket_id === ticketId);
  };

  const openConfirmModal = (ticketId) => {
    if (!userEmailFromLocalStorage) {
      alert("please login in order to buy!");
      return;
    }
    setSelectedTicketId(ticketId);
    setShowConfirm(true);
  };

  const closeConfirmModal = () => {
    setSelectedTicketId(null);
    setShowConfirm(false);
  };

  const handleConfirmAction = (ticketId) => {
    const boughtTicket = findTicketById(ticketId);
    addToBasket(boughtTicket);
    console.log(basket);
    closeConfirmModal();
  };
  useEffect(() => {
    if (!eventData.id || !ticketCategory) {
      return;
    }

    const fetchTickets = async () => {
      try {
        const res = await fetch(`http://localhost:9000/tickets/${eventData.id}/${ticketCategory}`);
        const data = await res.json();
        setTickets(data.tickets);
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      }
    };

    fetchTickets();
  }, [eventData.id, ticketCategory]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const userIds = [...new Set(tickets.map((ticket) => ticket.user_id))];
        for (const userId of userIds) {
          const res = await fetch(`http://localhost:9000/users/${userId}/email`);
          const data = await res.json();
          if (data.email) {
            const emailBeforeAt = data.email.split("@")[0];
            setUserEmails((prev) => ({ ...prev, [userId]: emailBeforeAt }));
          }
        }
      } catch (error) {
        console.error("Failed to fetch emails:", error);
      }
    };
    fetchEmails();
  }, [tickets]);

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
            <div className="flex justify-between items-center pt-12"></div>
            <div className="flex flex-row space-x-2 pb-10"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-12">
        <div className="w-3/5">
          <h1 className="text-xl font-bold pb-2">Available</h1>
          {tickets.map((ticket) => {
            const currencyOptions = {
              style: "currency",
              currency: ticket.currency,
              minimumFractionDigits: ticket.currency === "HUF" ? 0 : 2,
              maximumFractionDigits: ticket.currency === "HUF" ? 0 : 2,
            };

            const currencyFormatter = new Intl.NumberFormat("en-US", currencyOptions);

            return (
              <div
                key={ticket.ticket_id}
                onClick={() => openConfirmModal(ticket.ticket_id)}
                className="card bg-gray-800 min-w-[850px] flex justify-between hover:bg-custom-gray mt-4 mb-4"
              >
                <div className="min-w-[160px] flex flex-col justify-center items-center pl-4">
                  <UserIcon className="w-6 h-6 mr-2" />
                  <span className="text-black-500 text-sm">{userEmails[ticket.user_id] || "Unknown"}</span>
                </div>
                <div className="w-full min-w-[160px] pl-4 flex flex-col">
                  <div className="flex">
                    <div className="min-w-[300px] flex flex-col">
                      <span className="font-bold text-lg">{ticket.category}</span>
                      <span className="block text-black-500 text-sm font-bold">{ticket.name}</span>
                      <span className="block text-black-500 text-sm">Start Time: {[formatDate(eventStartDate), " - ", formatTime(eventStartDate)]}</span>
                      <span className="block text-black-500 text-sm">End Time: {eventEndDate !== null ? [formatDate(eventEndDate), " - ", formatTime(eventEndDate)] : " - "}</span>
                    </div>
                    <div className="mt-4 w-full min-w-[200px] pl-8 flex flex-col">
                      <span className="block text-black-500 text-sm">Seat: {ticket.seat !== null ? ticket.seat : " - "}</span>
                      <span className="block text-black-500 text-sm">Section: {ticket.section !== null ? ticket.section : " - "} </span>
                      <span className="block text-black-500 text-sm">Row Seating: {ticket.row_seating !== null ? ticket.row_seating : " - "}</span>
                    </div>
                  </div>
                </div>
                <div className="mr-4 flex flex-col justify-center items-center min-w-[220px]">
                  <span className="font-bold text-lg mb-2 justify-center">Ticket for: {ticket.how_many}</span>
                  <span className="flex justify-center">{currencyFormatter.format(ticket.price)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ConfirmModal
        isVisible={showConfirm}
        onClose={closeConfirmModal}
        ableToBuy={(ticketId) => availableToBuy(ticketId)}
        ticket={selectedTicketId !== null ? findTicketById(selectedTicketId) : null}
        onConfirm={(ticketId) => handleConfirmAction(ticketId)}
      />
    </div>
  );
};

export default TicketView;
