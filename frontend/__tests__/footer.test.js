// import dependencies
import React from "react";

// import react-testing methods
import { render, fireEvent, screen, getByAltText } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom";
// the component to test
import Footer from "@/app/components/footer";

describe("test signal image loading", () => {
  describe("given fetch response is ok", () => {
    test("it will load the image", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
      });

      const { getByAltText } = render(<Footer />);
      const image = getByAltText("align-middle backend connection indicator");

      expect(image.src).toContain("green");
    });
  });

  describe("given fetch response is not ok", () => {
    test("it will not load", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
      });
      const { getByAltText } = render(<Footer />);
      const image = getByAltText("align-middle backend connection indicator");
      expect(image.src).toContain("red");
    });
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});
