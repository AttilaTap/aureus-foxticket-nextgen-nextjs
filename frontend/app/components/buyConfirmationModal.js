import React from "react";
import { formatDate, formatTime } from "./utils/date-utils";

const ConfirmModal = ({ isVisible, onClose, ableToBuy, ticket, onConfirm }) => {
  if (!ticket) {
    return null;
  }
  //variables
  const ticketStartDate = new Date(ticket.start_time);
  const ticketEndDate = new Date(ticket.end_time);
  const title = "Add the following ticket to the Basket?";
  const message = (
    <div className="flex flex-col px-7 min-w-[500px]">
      <span className="block text-black-500 text-xl self-center font-bold mb-4">{ticket.name}</span>
      <div className="flex justify-between flex-row">
        <div className="min-w-[300px] flex flex-col">
          <span className="block text-stone-700 text-m font-bold ">Start Time: {[formatDate(ticketStartDate), " - ", formatTime(ticketStartDate)]}</span>
          <span className="block text-stone-700 text-m font-bold ">End Time: {ticketEndDate !== null ? [formatDate(ticketEndDate), " - ", formatTime(ticketEndDate)] : " - "}</span>
          <span className="block text-stone-700 text-m font-bold ">
            Price: {ticket.price} {ticket.currency}
          </span>
        </div>
        <div className="w-full min-w-[200px] pl-8 flex flex-col">
          <span className="block text-stone-700 text-m font-bold ">Seat: {ticket.seat !== null ? ticket.seat : " - "}</span>
          <span className="block text-stone-700 text-m font-bold ">Section: {ticket.section !== null ? ticket.section : " - "} </span>
          <span className="block text-stone-700 text-m font-bold ">Row Seating: {ticket.row_seating !== null ? ticket.row_seating : " - "}</span>
        </div>
      </div>
    </div>
  );
  if (!isVisible) {
    return null;
  }
  function handleClose(e) {
    if (e.target.id === "wrapper" || e.target.id === "close") {
      onClose();
    }
  }
  console.log(ableToBuy(ticket.ticket_id));
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-10" id="wrapper" onClick={handleClose}>
      <div className="flex flex-col justify-center items-center w-1/3 min-w-min h-auto relative rounded-lg bg-modern-gray">
        <button
          onClick={() => {
            onClose();
          }}
          className="absolute top-4 right-4 font-stone-100"
        >
          <svg viewBox="0 0 800 1000" fill="currentColor" height="1em" width="1em">
            <path d="M700 100c28 0 51.667 9.667 71 29s29 43 29 71v600c0 26.667-9.667 50-29 70s-43 30-71 30H100c-26.667 0-50-10-70-30S0 826.667 0 800V200c0-28 10-51.667 30-71s43.333-29 70-29h600M554 738l86-86-154-152 154-154-86-86-154 152-152-152-88 86 154 154-154 152 88 86 152-152 154 152" />
          </svg>
        </button>

        <h2 className="px-2 text-2xl font-bold text-center my-4  text-stone-950">{title}</h2>

        {message}

        <div className="flex items-center justify-center gap-6 mt-7 mb-3">
          {ableToBuy(ticket.ticket_id) ? (
            <button
              className="bg-sky-700 hover:bg-sky-800 text-stone-100 font-bold p-4 rounded-lg md:w-28 md:h-15 focus:outline-none focus:shadow-outline"
              onClick={() => {
                onConfirm(ticket.ticket_id);
                onClose();
              }}
            >
              Confirm
            </button>
          ) : (
            <button className="bg-stone-400 text-stone-600 font-bold p-4 rounded-lg md:w-28 md:h-15 cursor-not-allowed" disabled>
              Already in Basket
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
