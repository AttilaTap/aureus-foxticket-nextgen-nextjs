import HomePage from "@/app/(main)/page";
import { render, screen } from "@testing-library/react";

describe("Home page - Rendering", () => {
  it("Should render the Home Page and find the wrapper div", () => {
    render(<HomePage />);
    screen.findByTestId("wrapper");
  });
});
