import * as jwtService from "../services/jwt-service";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Im1vY2sgdG9rZW4iLCJpYXQiOjE1MTYyMzkwMjJ9.cGEfpKVXZd4RZMzCDfFf9bDGAKlUwdXlitzt7DXPxVM";

describe("it will check if the token is in the db", () => {
  describe("given the token is in the db", () => {
    it("will return true", async () => {
      let mockConnection = {
        execute: jest.fn((formatString, arr) => {
          return [[{ user: "user" }]];
        }),
      };
      expect(await jwtService.tokenInDatabase(mockConnection, TOKEN)).toBe(true);
    });
  });

  describe("given the token is not in the db", () => {
    it("will return false", async () => {
      let mockConnection = {
        execute: jest.fn((formatString, arr) => {
          return [[]];
        }),
      };
      expect(await jwtService.tokenInDatabase(mockConnection, TOKEN)).toBe(false);
    });
  });
});
