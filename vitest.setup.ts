import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

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
