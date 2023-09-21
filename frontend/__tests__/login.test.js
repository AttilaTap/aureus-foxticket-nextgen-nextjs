import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "@/app/components/login";
import { act } from "@testing-library/react";

describe("Login Component", () => {
  it("renders login form when isVisible is true", () => {
    act(() => {
      render(<Login isVisible={true} onCloseLog={() => {}} openReg={() => {}} />);
    });

    expect(screen.getByText("Log in and find your NEXTicket")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("example@gmail.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("******************")).toBeInTheDocument();
  });

  it("calls onCloseLog when clicking close button", () => {
    const onCloseLogMock = jest.fn();
    act(() => {
      render(<Login isVisible={true} onCloseLog={onCloseLogMock} openReg={() => {}} />);
    });

    const closeButton = screen.getByRole("button", { name: "" });
    act(() => {
      fireEvent.click(closeButton);
    });

    expect(onCloseLogMock).toHaveBeenCalled();
  });

  it('navigates to registration modal when "Register Here!" is clicked', () => {
    const onCloseLogMock = jest.fn();
    const openRegMock = jest.fn();
    act(() => {
      render(<Login isVisible={true} onCloseLog={onCloseLogMock} openReg={openRegMock} />);
    });

    const registerLink = screen.getByText("Register Here!");
    act(() => {
      fireEvent.click(registerLink);
    });

    expect(openRegMock).toHaveBeenCalled();
    expect(onCloseLogMock).toHaveBeenCalled();
  });

  it("makes a fetch call with correct parameters on form submission", async () => {
    // Mock the fetch API and simulate a successful response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ token: "sample_token" }),
    });
    act(() => {
      render(<Login isVisible={true} onCloseLog={() => {}} openReg={() => {}} />);
    });

    // Fill in email and password fields
    act(() => {
      fireEvent.change(screen.getByPlaceholderText("example@gmail.com"), {
        target: { value: "test@example.com" },
      });
    });

    act(() => {
      fireEvent.change(screen.getByPlaceholderText("******************"), {
        target: { value: "testPassword" },
      });
    });

    // Simulate form submission
    act(() => {
      fireEvent.click(screen.getByText("Sign In"));
    });

    // Ensure fetch was called with the correct parameters
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:9000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@example.com",
        password: "testPassword",
      }),
    });
  });
});
