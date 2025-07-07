/**
 * Test Setup File
 *
 * This file runs before all tests and sets up the testing environment.
 * CUSTOMIZE: Add your specific setup requirements.
 */

import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, vi } from "vitest";

// Auto cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia (common requirement for component testing)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver (for virtualized lists, lazy loading)
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver (for responsive components)
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock scrollTo (for scroll-related tests)
window.scrollTo = vi.fn();
Element.prototype.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();

// Setup console mocks to catch errors in tests
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  // Fail tests on console.error
  console.error = (...args: any[]) => {
    originalError(...args);
    throw new Error(`Console error: ${args.join(" ")}`);
  };

  // Optionally fail on console.warn
  console.warn = (...args: any[]) => {
    originalWarn(...args);
    // Uncomment to fail on warnings:
    // throw new Error(`Console warning: ${args.join(' ')}`);
  };
});

// Mock date/time for consistent testing
// CUSTOMIZE: Set your test date/time
vi.useFakeTimers();
vi.setSystemTime(new Date("2024-01-01T00:00:00.000Z"));

// Global test utilities
global.testUtils = {
  // Wait for async updates
  waitForAsync: async (ms = 0) => {
    await new Promise((resolve) => setTimeout(resolve, ms));
  },

  // Advance timers and wait for effects
  advanceTimersAndFlush: async (ms: number) => {
    vi.advanceTimersByTime(ms);
    await global.testUtils.waitForAsync();
  },

  // Mock fetch globally
  mockFetch: (response: any) => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => response,
      text: async () => JSON.stringify(response),
      headers: new Headers(),
      status: 200,
      statusText: "OK",
    });
  },
};

// Type augmentation for global test utilities
declare global {
  var testUtils: {
    waitForAsync: (ms?: number) => Promise<void>;
    advanceTimersAndFlush: (ms: number) => Promise<void>;
    mockFetch: (response: any) => void;
  };
}

// Performance marks (useful for performance testing)
if (typeof performance !== "undefined" && performance.mark) {
  performance.mark("test-setup-complete");
}
