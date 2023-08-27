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

  describe("register", () => {
    it("should return 400 if email already exists", async () => {
      userService.checkEmailExists.mockResolvedValue(true);

      const req = mockRequest({ email: "test@example.com", password: "password" });
      const res = mockResponse();

      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Email already exists" });
    });
  });
});
