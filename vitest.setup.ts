import { afterEach, vi, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

afterEach(() => {
  cleanup();
});

// Mock matchMedia for jsdom compatibility
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = function () {
    return {
      matches: false,
      media: "",
      onchange: null,
      addListener: function () {},
      removeListener: function () {},
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () {
        return true;
      },
    };
  };
}

// Mock CSS imports for component styles
try {
  vi.mock("./src/index.css", () => ({}));
  vi.mock("react-datepicker/dist/react-datepicker.css", () => ({}));
} catch (e) {
  // ignore if not needed
}
