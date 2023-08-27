import { register, login } from "../controllers/auth-controller";
import * as userService from "../services/user-service";
import * as jwtService from "../services/jwt-service";

// Mocking the imported modules
jest.mock("../services/user-service");
jest.mock("../services/jwt-service");

// Mocked request and response objects
const mockRequest = (body) => {
  return { body };
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Controller Tests", () => {
  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });
});
