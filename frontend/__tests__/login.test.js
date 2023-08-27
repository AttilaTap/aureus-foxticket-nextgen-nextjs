import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "@/app/components/login";

describe("Login Component", () => {
  it("renders login form when isVisible is true", () => {
    render(<Login isVisible={true} onCloseLog={() => {}} openReg={() => {}} />);

    expect(screen.getByText("Log in and find your NEXTicket")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("example@gmail.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("******************")).toBeInTheDocument();
  });
});
