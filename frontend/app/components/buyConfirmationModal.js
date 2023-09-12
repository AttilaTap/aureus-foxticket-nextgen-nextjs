import React from "react";

const ConfirmModal = ({ isVisible, onClose, ticket, onConfirm }) => {
  if (!ticket) {
    return null;
  }
  const message = `Are you sure you want to buy ${ticket.name} for ${ticket.how_many} person(s) for ${ticket.price} ${ticket.currency}?`;
  if (!isVisible) {
    return null;
  }
  function handleClose(e) {
    console.log("Handle close");
    if (e.target.id === "wrapper" || e.target.id === "close") {
      onClose();
    }
  }
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

        <h2 className="px-2 text-2xl font-bold text-center mt-4 text-stone-950">Add the following ticket to the Basket?</h2>

        <h5 className="text-stone-700 text-m font-bold mt-4">{message}</h5>
        {/* <p className="text-stone-700 text-m font-bold mt-4">{details}</p> */}

        <div className="flex items-center justify-center gap-6 mt-7 mb-3">
          <button
            className="bg-sky-700 hover:bg-sky-800 text-stone-100 font-bold p-4 rounded-lg md:w-28 md:h-15 focus:outline-none focus:shadow-outline"
            onClick={() => {
              onConfirm(ticket.ticket_id);
              onClose();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
