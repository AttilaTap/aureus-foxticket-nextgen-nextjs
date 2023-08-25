import EventView from "../../../components/eventView";

export default function EventPage() {
  return (
    <>
      <EventView
        eventImage="/background-img/bg-image-event-one.jpg"
        dateFromDb="2023-08-05T18:00:00"
        eventName="The best Event in the History"
        eventLocation="Wasserschloss Klaffenbach"
        eventCity="Chemnitz, Germany"
        availableTickets={7}
        soldTickets={20}
        wantedTickets={100}
        numOfAvailTickets={2}
        typeOfAvailTicket="Regular"
        descriptionOfAvailTicket={`"regular ticket"`}
        priceOfAvailTicket={47.59}
        numOfSoldTickets={3}
        typeOfSoldTicket="Regular"
        descriptionOfSoldTicket={`"regular ticket"`}
        priceOfSoldTicket={50.09}
      />
    </>
  );
}
