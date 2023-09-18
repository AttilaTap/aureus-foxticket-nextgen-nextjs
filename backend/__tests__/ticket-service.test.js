import * as ticketService from "../services/ticket-service";

const TICKET_ID = "123456";
const ticket = {
  id: TICKET_ID,
  name: "Concert",
};
const EVENT_ID = "3";
const CATEGORY = "Regular";

describe("get ticket by id", () => {
  describe("given ticket exists", () => {
    it("should return a ticket object", async () => {
      let mockConnection = {
        execute: jest.fn((formatString, id) => {
          return [[{ ticket }]];
        }),
      };

      expect(await ticketService.getTicketById(mockConnection, TICKET_ID)).toEqual({ ticket });
    });
  });

  describe("given ticket not exits", () => {
    it("should return null", async () => {
      let mockConnection = {
        execute: jest.fn((formatString, id) => {
          return [[]];
        }),
      };

      expect(await ticketService.getTicketById(mockConnection, TICKET_ID)).toBe(null);
    });
  });
});

describe("get ticket by event id", () => {
  describe("given tickets exist", () => {
    it("should return the number of available tickets and the tickets", async () => {
      let mockConnection = {
        query: jest.fn((eventId, arr) => {
          return [[{ how_many: 2 }, { how_many: 3 }]];
        }),
      };

      expect(await ticketService.fetchAvailableTickets(mockConnection, EVENT_ID)).toEqual({ availableTickets: 5, tickets: [{ how_many: 2 }, { how_many: 3 }] });
    });
  });

  describe("given tickets not exist", () => {
    it("should return 0 available tickets and an empty object", async () => {
      let mockConnection = {
        query: jest.fn((eventId, arr) => {
          return [[]];
        }),
      };

      expect(await ticketService.fetchAvailableTickets(mockConnection, EVENT_ID)).toEqual({ availableTickets: 0, tickets: {} });
    });
  });
});

describe("get ticket by category and event id", () => {
  describe("given tickets exist", () => {
    it("should return an array of tickets", async () => {
      let mockConnection = {
        execute: jest.fn((formatString, eventId, category) => {
          return [[{ ticket1: "ticket1" }, { ticket2: "ticket2" }]];
        }),
      };

      expect(await ticketService.getTicketsByCategoryAndEventId(mockConnection, EVENT_ID, CATEGORY)).toEqual([{ ticket1: "ticket1" }, { ticket2: "ticket2" }]);
    });
  });

  describe("given tickets not exist", () => {
    it("should return 0 available tickets and an empty object", async () => {
      let mockConnection = {
        execute: jest.fn((formatString, eventId, category) => {
          return [[]];
        }),
      };

      expect(await ticketService.getTicketsByCategoryAndEventId(mockConnection, EVENT_ID, CATEGORY)).toBe(null);
    });
  });
});
