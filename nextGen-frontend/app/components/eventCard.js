const EventCard = ({
  dateFromDb,
  eventName,
  eventLocation,
  availableTickets,
}) => {
  const destinationUrl = "https://tailwindcss.com/docs/padding";
  //assuming in mySQL we use the DATETIME format to store date and time
  const date = new Date(dateFromDb);
  console.log(dateFromDb);
  console.log(date);
  // Functions for making the date usefull
  const getDayOfWeek = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[date.getDay()];
  };
  const formatDate = () => {
    const day = date.getDay();
    const month = date.getMonth();
    return `${day}. ${month}`;
  };
  const formatTime = () => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  return (
    <div className="card">
      <div className="w-24 flex flex-col justify-center items-center">
        <span className="font-bold">{getDayOfWeek()}</span>
        <span className="font-bold">{formatDate()}</span>
        <span className="block text-black-500 text-sm">{formatTime()}</span>
      </div>
      <div className="m-4 w-full">
        <span className="font-bold">{eventName}</span>
        <span className="block text-black-500 text-sm">{eventLocation}</span>
      </div>
      <div className="w-44 p-1 flex flex-row justify-end items-center">
        <span className="pr-2">{availableTickets}</span>
        <svg
          className="hover:fill-amber-500"
          fill="#5dd9a7"
          width="40px"
          height="40px"
          viewBox="0 -4 40 40"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>ticket</title>
          <path d="M39.5 23h0.5v1c-0.299 0-0.628 0-1 0-1.104 0-2 0.896-2 2 0 0.366 0 0.705 0 1h-34c0-0.295 0-0.634 0-1 0-1.104-0.896-2-2-2-0.319 0-0.666 0-1 0v-1h0.5c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-0.5v-1h0.5c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-0.5v-1h0.5c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-0.5v-1h0.5c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-0.5v-1h0.5c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-0.5v-1h0.5c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-0.5v-1h0.5c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-0.5v-1c0.299 0 0.628 0 1 0 1.104 0 2-0.896 2-2 0-0.366 0-0.705 0-1h34c0 0.295 0 0.634 0 1 0 1.104 0.896 2 2 2 0.372 0 0.701 0 1 0v1h-0.5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h0.5v1h-0.5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h0.5v1h-0.5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h0.5v1h-0.5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h0.5v1h-0.5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h0.5v1h-0.5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h0.5v1h-0.5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5zM36 11c0-1.104-0.896-2-2-2h-28c-1.104 0-2 0.896-2 2v11c0 1.104 0.896 2 2 2h28c1.104 0 2-0.896 2-2v-11zM34 23h-28c-0.553 0-1-0.448-1-1v-11c0-0.553 0.447-1 1-1h28c0.552 0 1 0.447 1 1v11c0 0.552-0.448 1-1 1zM11.387 13.988h-3.973v0.59h1.652v4.422h0.664v-4.422h1.656v-0.59zM12.768 13.988h-0.664v5.012h0.664v-5.012zM14.759 15.49c0.104-0.312 0.287-0.56 0.546-0.744 0.258-0.185 0.58-0.277 0.965-0.277 0.335 0 0.613 0.083 0.834 0.25 0.222 0.166 0.39 0.432 0.506 0.797l0.652-0.154c-0.134-0.462-0.372-0.821-0.714-1.076s-0.764-0.383-1.265-0.383c-0.442 0-0.847 0.101-1.215 0.303s-0.651 0.497-0.852 0.886c-0.199 0.389-0.299 0.844-0.299 1.365 0 0.479 0.089 0.927 0.266 1.344s0.434 0.736 0.771 0.956c0.339 0.22 0.778 0.33 1.318 0.33 0.521 0 0.963-0.143 1.324-0.429s0.611-0.701 0.75-1.246l-0.664-0.168c-0.091 0.422-0.266 0.74-0.522 0.955-0.258 0.214-0.571 0.321-0.943 0.321-0.305 0-0.589-0.079-0.851-0.236s-0.455-0.395-0.579-0.713-0.187-0.69-0.187-1.117c0.002-0.332 0.054-0.653 0.159-0.964zM23.363 13.988h-0.898l-2.488 2.48v-2.48h-0.664v5.012h0.664v-1.738l0.822-0.795 1.783 2.533h0.875l-2.195-2.98 2.101-2.032zM27.938 18.41h-3.074v-1.707h2.77v-0.59h-2.77v-1.535h2.957v-0.59h-3.621v5.012h3.738v-0.59zM32.625 13.988h-3.973v0.59h1.652v4.422h0.664v-4.422h1.656v-0.59z"></path>
        </svg>
      </div>
    </div>
  );
};
export default EventCard;
