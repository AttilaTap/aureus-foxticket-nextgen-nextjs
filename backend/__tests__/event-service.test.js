import * as eventService from "../services/event-service";

const EVENTS = [{ eventOne: "eventOne" }, { eventTwo: "eventTwo" }];
const EVENT_ID = 2;

describe("get all events", () => {
  describe("given events in db", () => {
    it("will return an array of events", async () => {
      let mockConnection = {
        query: jest.fn((formatString) => {
          return [EVENTS];
        }),
      };
      expect(await eventService.getAllEvents(mockConnection)).toEqual(EVENTS);
    });
  });

  describe("given an error", () => {
    it("will throw an error and console a message, return an empty arrey", async () => {
      let mockConnection = {
        query: jest.fn((formatString) => {
          throw Error();
        }),
      };
      let logSpy = jest.spyOn(global.console, "log");
      expect(await eventService.getAllEvents(mockConnection)).toEqual([]);
      expect(logSpy).toHaveBeenCalledTimes(1);
    });
  });
});

describe("fetch specific event", () => {
  describe("given event id", () => {
    it("will return sepcific event", async () => {
      let mockConnection = {
        query: jest.fn((formatString) => {
          return [[{ specificEvent: "event" }]];
        }),
      };
      expect(await eventService.fetchSpecificEvent(mockConnection, EVENT_ID)).toEqual({ specificEvent: "event" });
    });
  });
  describe("given an error", () => {
    it("will throw an error and console a message, return null", async () => {
      let mockConnection = {
        query: jest.fn((formatString) => {
          throw Error();
        }),
      };
      let logSpy = jest.spyOn(global.console, "log");
      expect(await eventService.fetchSpecificEvent(mockConnection)).toEqual(null);
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith("Error while fetching specific event from db");
    });
  });
});
