import * as userService from "../services/user-service";

const USER_EMAIL = "littlejohn@gmail.com";
const USER_ID = "123456";

describe("check email exists", () => {
  describe("given user email exists", () => {
    it("should return true", async () => {
      let mockConnection = {
        query: jest.fn((emailAddress, arr) => {
          return [["this@email.com"]];
        }),
      };
      expect(await userService.checkEmailExists(mockConnection, USER_EMAIL)).toBe(true);
    });
  });

  describe("given user email doesn't exist", () => {
    it("should return false", async () => {
      let mockConnection = {
        query: jest.fn((emailAddress, arr) => {
          return [[]];
        }),
      };
      expect(await userService.checkEmailExists(mockConnection, USER_EMAIL)).toBe(false);
    });
  });
});

describe("find user id", () => {
  describe("given user exists", () => {
    it("should return user id", async () => {
      let mockConnection = {
        execute: jest.fn((formatString, emailAddress) => {
          return [[{ user_id: USER_ID }]];
        }),
      };
      expect(await userService.findUserId(mockConnection, USER_EMAIL)).toBe(USER_ID);
    });
  });

  describe("given user doesn't exist", () => {
    it("should throw error", async () => {
      let mockConnection = {
        execute: jest.fn((formatString, emailAddress) => {
          return [[]];
        }),
      };

      async function runFindUserId() {
        await userService.findUserId(mockConnection, USER_EMAIL);
      }

      await expect(runFindUserId).rejects.toThrow(userService.USER_NOT_FOUND);
    });
  });
});
