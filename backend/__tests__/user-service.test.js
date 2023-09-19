import * as userService from "../services/user-service";

const USER_EMAIL = "littlejohn@gmail.com";
const USER_ID = "123456";
const USER_PASSWORD = "$2a$04$bndG28M4SctvpZ4J2dgsZeynekhXNaonzGijetJrGVRZQ0kOWzJdu";

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

describe("verify if user exists and match with stored", () => {
  describe("given user not exists", () => {
    it("should return null", async () => {
      let mockConnection = {
        query: jest.fn((emailAddress, arr) => {
          return [[]];
        }),
      };
      expect(await userService.verifyUser(mockConnection, USER_EMAIL, USER_PASSWORD)).toBe(null);
    });
  });
});

describe("get email by id", () => {
  describe("given email exists", () => {
    it("should return the email", async () => {
      let mockConnection = {
        execute: jest.fn((formatString, id) => {
          return [[{ email: USER_EMAIL }]];
        }),
      };

      expect(await userService.getEmailById(mockConnection, USER_ID)).toBe(USER_EMAIL);
    });
  });

  describe("given email not exists", () => {
    it("should return null", async () => {
      let mockConnection = {
        execute: jest.fn((formatString, id) => {
          return [[]];
        }),
      };

      expect(await userService.getEmailById(mockConnection, USER_ID)).toBe(null);
    });
  });
});
