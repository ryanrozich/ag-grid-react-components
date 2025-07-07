/**
 * Test Utilities
 *
 * Common testing utilities and custom render functions.
 * CUSTOMIZE: Add your specific test utilities and providers.
 */

import React, { ReactElement, ReactNode } from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

// Custom render options
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  // Add your provider props here
  initialState?: any;
  theme?: "light" | "dark";
  locale?: string;
  // CUSTOMIZE: Add more provider options
}

// All providers wrapper
interface AllProvidersProps {
  children: ReactNode;
  options?: CustomRenderOptions;
}

/**
 * Wrapper component that includes all necessary providers
 * CUSTOMIZE: Add your app's providers
 */
function AllProviders({ children, options = {} }: AllProvidersProps) {
  return (
    <>
      {/* Add your providers here */}
      {/* Example: <ThemeProvider theme={options.theme}> */}
      {/* Example: <IntlProvider locale={options.locale}> */}
      {/* Example: <StateProvider initialState={options.initialState}> */}
      {children}
    </>
  );
}

/**
 * Custom render function that includes all providers
 */
function customRender(
  ui: ReactElement,
  options?: CustomRenderOptions,
): RenderResult & { user: ReturnType<typeof userEvent.setup> } {
  const user = userEvent.setup();

  const rendered = render(ui, {
    wrapper: ({ children }) => (
      <AllProviders options={options}>{children}</AllProviders>
    ),
    ...options,
  });

  return {
    ...rendered,
    user,
  };
}

/**
 * Render hook with providers
 */
export { renderHook } from "@testing-library/react";

/**
 * Create mock component for testing
 */
export function createMockComponent(name: string) {
  return vi.fn(({ children, ...props }) => (
    <div data-testid={`mock-${name}`} {...props}>
      {children}
    </div>
  ));
}

/**
 * Wait for element to be removed from DOM
 */
export async function waitForElementToBeRemoved(
  element: HTMLElement,
  timeout = 5000,
) {
  const startTime = Date.now();

  while (document.body.contains(element)) {
    if (Date.now() - startTime > timeout) {
      throw new Error(`Element was not removed within ${timeout}ms`);
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

/**
 * Mock API response helper
 */
export function mockApiResponse<T>(data: T, delay = 0) {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
}

/**
 * Create controlled promise for testing async flows
 */
export function createControlledPromise<T>() {
  let resolve: (value: T) => void;
  let reject: (error: any) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    resolve: resolve!,
    reject: reject!,
  };
}

/**
 * Test data generators
 * CUSTOMIZE: Add your domain-specific generators
 */
export const generate = {
  id: () => Math.random().toString(36).substr(2, 9),

  user: (overrides = {}) => ({
    id: generate.id(),
    name: "Test User",
    email: "test@example.com",
    ...overrides,
  }),

  date: (daysFromNow = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date;
  },

  // CUSTOMIZE: Add more generators
};

/**
 * Accessibility testing helpers
 */
export const a11y = {
  /**
   * Check if element is accessible by screen readers
   */
  isAccessible: (element: HTMLElement) => {
    const style = window.getComputedStyle(element);
    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      element.getAttribute("aria-hidden") !== "true"
    );
  },

  /**
   * Get accessible name of element
   */
  getAccessibleName: (element: HTMLElement) => {
    return (
      element.getAttribute("aria-label") ||
      element.getAttribute("aria-labelledby") ||
      element.textContent ||
      ""
    );
  },
};

/**
 * Performance testing helpers
 */
export const performance = {
  /**
   * Measure render time
   */
  measureRender: async (renderFn: () => void) => {
    const start = performance.now();
    renderFn();
    await new Promise((resolve) => setTimeout(resolve, 0));
    const end = performance.now();
    return end - start;
  },

  /**
   * Count re-renders
   */
  countRenders: () => {
    let count = 0;
    const Counter = () => {
      count++;
      return null;
    };
    return { Counter, getCount: () => count };
  },
};

// Re-export everything from React Testing Library
export * from "@testing-library/react";

// Export custom render as default and named
export { customRender as render };
export default customRender;
