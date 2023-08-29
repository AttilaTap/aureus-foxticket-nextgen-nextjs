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
  it("should register user and send success email if email is not taken", async () => {
    userService.checkEmailExists.mockResolvedValue(false);

    const req = mockRequest({ email: "test@example.com", password: "password" });
    const res = mockResponse();

    await register(req, res);
    expect(userService.registerUser).toHaveBeenCalledWith("test@example.com", "password");
    expect(userService.sendSuccessEmail).toHaveBeenCalledWith("test@example.com");
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "Registration successful" });
  });
});

describe("login", () => {
  it("should return 401 if email or password is incorrect", async () => {
    userService.verifyUser.mockResolvedValue(false);

    const req = mockRequest({ email: "test@example.com", password: "wrongPassword" });
    const res = mockResponse();

    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid email or password" });
  });

  it("should return 200 and a token if login is successful", async () => {
    userService.verifyUser.mockResolvedValue(true);
    jwtService.createToken.mockReturnValue("sampleToken");

    const req = mockRequest({ email: "test@example.com", password: "password" });
    const res = mockResponse();

    await login(req, res);
    expect(jwtService.createToken).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: "sampleToken", login: "test@example.com" });
  });
});
