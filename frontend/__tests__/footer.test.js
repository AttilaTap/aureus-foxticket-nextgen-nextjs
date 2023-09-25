// import dependencies
import React from "react";

// import react-testing methods
import { render, fireEvent, screen, getByAltText } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom";
// the component to test
import Footer from "@/app/components/footer";

describe("test signal image loading", () => {
  describe("given fetch response ok is true", () => {
    test("it will set the signal to green", async () => {
      global.fetch = jest.fn(() => Promise.resolve({ status: 200 }));
      const { getByAltText } = render(<Footer />);
      const image = getByAltText("align-middle backend connection indicator");
      setTimeout(() => {
        expect(image.src).toContain("green");
      }, 3000);
    });
  });

  describe("given fetch response ok is false", () => {
    test("it will set the singal to red", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
        })
      );
      const { getByAltText } = render(<Footer />);
      const image = getByAltText("align-middle backend connection indicator");
      setTimeout(() => {
        expect(image.src).toContain("red");
      });
    });
  });
});
