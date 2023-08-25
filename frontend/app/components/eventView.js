import Image from "next/image";

const EventView = ({
  eventImage,
  dateFromDb,
  eventName,
  eventLocation,
  eventCity,
  availableTickets,
  soldTickets,
  wantedTickets,
  numOfAvailTickets,
  typeOfAvailTicket,
  descriptionOfAvailTicket,
  priceOfAvailTicket,
  numOfSoldTickets,
  typeOfSoldTicket,
  descriptionOfSoldTicket,
  priceOfSoldTicket,
}) => {
  const date = new Date(dateFromDb);
  console.log(dateFromDb);
  console.log(date);
  // Functions for making the date usefull
  const getDayOfWeek = () => {
    const daysOfWeek = [
      "Sunday ",
      "Monday ",
      "Tuesday ",
      "Wednesday ",
      "Thursday ",
      "Friday ",
      "Saturday ",
    ];
    return daysOfWeek[date.getDay()];
  };
  const formatDate = () => {
    const day = date.getDay();
    const month = date.getMonth();
    return `${day}. ${month}. `;
  };
  const formatTime = () => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const getPriceForAvailable = () => {
    const currencySymbol = "€";
    const price = priceOfAvailTicket;
    return `${currencySymbol} ${price.toFixed(2)}`;
  };
  const getPriceForSold = () => {
    const currencySymbol = "€";
    const price = priceOfSoldTicket;
    return `${currencySymbol} ${price.toFixed(2)}`;
  };
  return (
    <div className="w-2/3">
      <div>
        <div className="flex justify-center -mt-20">
          <Image
            src={eventImage}
            width={500}
            height={500}
            className="rounded-md"
            alt="Picture of the event"
          />
        </div>
        <div className="w-full justify-center">
          <h1 className="text-4xl font-bold pt-9 text-center">{eventName}</h1>
          <div className="flex flex-row space-x-1 justify-center pt-3">
            <svg
              width="22px"
              height="22px"
              viewBox="-5 2 28.80 28.80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke=""
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7"
                  stroke="#5dd9a7"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>{" "}
                <rect
                  x="6"
                  y="12"
                  width="3"
                  height="3"
                  rx="0.5"
                  fill="#5dd9a7"
                ></rect>{" "}
                <rect
                  x="10.5"
                  y="12"
                  width="3"
                  height="3"
                  rx="0.5"
                  fill="#5dd9a7"
                ></rect>{" "}
                <rect
                  x="15"
                  y="12"
                  width="3"
                  height="3"
                  rx="0.5"
                  fill="#5dd9a7"
                ></rect>{" "}
              </g>
            </svg>
            <span className="text-xs text-emerald-400 font-bold pr-3">
              {[getDayOfWeek(), formatDate(), formatTime()]}
            </span>
            <svg
              width="18px"
              height="18px"
              viewBox="-2 2 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                  stroke="#5dd9a7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                  stroke="#5dd9a7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <span className="text-xs text-emerald-400 font-bold pr-3">
              {eventLocation}
            </span>
            <svg
              fill="#5dd9a7"
              width="15px"
              height="15px"
              viewBox="1 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M22,11H19V2a1,1,0,0,0-1-1H6A1,1,0,0,0,5,2V7H2A1,1,0,0,0,1,8V22a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V12A1,1,0,0,0,22,11Zm-9,1v9H3V9H13Zm1-5H7V3H17v8H15V8A1,1,0,0,0,14,7Zm7,14H19V19a1,1,0,0,0-2,0v2H15V13h6ZM4,10H6v2H4Zm4,0h4v2H8ZM4,14H6v2H4Zm4,0h4v2H8ZM4,18H6v2H4Zm4,0h4v2H8Z"></path>
              </g>
            </svg>
            <span className="text-xs text-emerald-400 font-bold">
              {eventCity}
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center pt-12">
          <h1 className="text-3xl font-bold">Tickets</h1>
          <button
            type="submit"
            className="bg-stone-600 w-28 h-8 rounded-full font-semibold text-stone-100 mt-6"
            // onClick={}
          >
            Sell tickets
          </button>
        </div>
        <div className="flex flex-row space-x-2 pb-10">
          <span className="text-base text-emerald-400 font-bold">
            {availableTickets} available
          </span>
          <svg
            fill="#000000"
            width="15px"
            height="15px"
            viewBox="-10 -8 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <title>next</title>{" "}
              <path d="M0 24.781v-17.594l15.281 8.813z"></path>{" "}
            </g>
          </svg>
          <span className="text-base text-emerald-400 font-bold">
            {soldTickets} sold
          </span>
          <svg
            fill="#000000"
            width="15px"
            height="15px"
            viewBox="-10 -8 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <title>next</title>{" "}
              <path d="M0 24.781v-17.594l15.281 8.813z"></path>{" "}
            </g>
          </svg>
          <span className="text-base text-emerald-400 font-bold">
            {wantedTickets} wanted
          </span>
        </div>
      </div>

      <div className="w-full pb-12">
        <h1 className="text-xl font-bold pb-2">Available</h1>
        <div className="card">
          <div className="flex flex-col w-full m-1 pl-3">
            <span className="font-bold">{numOfAvailTickets} tickets</span>
            <span className="block text-black-500 text-sm">
              {typeOfAvailTicket}
            </span>
            <span className="block text-black-500 text-sm pt-2">
              {descriptionOfAvailTicket}
            </span>
          </div>
          <div className="w-44 p-1 flex flex-row justify-end items-center">
            <span className="font-bold pr-3">
              {getPriceForAvailable()} / ticket
            </span>
          </div>
        </div>
      </div>
      <div className="w-full pb-12">
        <h1 className="text-xl font-bold pb-2">Sold</h1>
        <div className="card">
          <div className="flex flex-col w-full m-1 pl-3">
            <span className="font-bold">{numOfSoldTickets} tickets</span>
            <span className="block text-black-500 text-sm">
              {typeOfSoldTicket}
            </span>
            <span className="block text-black-500 text-sm pt-2">
              {descriptionOfSoldTicket}
            </span>
          </div>
          <div className="w-44 p-1 flex flex-row justify-end items-center">
            <span className="font-bold pr-3">{getPriceForSold()} / ticket</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventView;
