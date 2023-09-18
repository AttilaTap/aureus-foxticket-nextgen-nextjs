import * as ticketService from "../services/ticket-service";

const USER_EMAIL = "littlejohn@gmail.com";
const TICKET_ID = "123456";
const ticket = {
  id: TICKET_ID,
  name: "Concert",
};

describe("get ticket by id", () => {
  describe("should return ticket if exists", () => {
    it("should return a ticket object", async () => {
      let mockConnection = {
        execute: jest.fn((formatString, id) => {
          return [[{ ticket }]];
        }),
      };

      expect(await ticketService.getTicketById(mockConnection, TICKET_ID)).toEqual({ ticket });
    });
  });

  describe("should return ticket if exists", () => {
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
