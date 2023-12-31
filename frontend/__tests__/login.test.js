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
});
