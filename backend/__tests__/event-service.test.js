import * as eventService from "../services/event-service";

const EVENTS = [{ eventOne: "eventOne" }, { eventTwo: "eventTwo" }];

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
