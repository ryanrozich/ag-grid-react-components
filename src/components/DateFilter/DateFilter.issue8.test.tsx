import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import DateFilter from "./index";
import type { IFilterParams } from "ag-grid-community";

describe("Issue #8: Relative date range 'to' field clearing", () => {
  // Add console spy to track state changes
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;
  let mockParams: IFilterParams;
  let mockFilterChangedCallback: ReturnType<typeof vi.fn>;
  let mockFilterModifiedCallback: ReturnType<typeof vi.fn>;
  let mockDoesRowPassOtherFilter: ReturnType<typeof vi.fn>;
  let mockGetValue: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, "log");
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  beforeEach(() => {
    mockFilterChangedCallback = vi.fn();
    mockFilterModifiedCallback = vi.fn();
    mockDoesRowPassOtherFilter = vi.fn().mockReturnValue(true);
    mockGetValue = vi.fn((node) => node.data?.date);

    mockParams = {
      filterChangedCallback: mockFilterChangedCallback,
      filterModifiedCallback: mockFilterModifiedCallback,
      doesRowPassOtherFilter: mockDoesRowPassOtherFilter,
      getValue: mockGetValue,
      column: {
        getColId: () => "date",
      },
      api: {},
      context: {},
      colDef: {},
      rowModel: {},
    } as IFilterParams;
  });

  it("should retain the 'to' field value when typing in relative date range mode", async () => {
    const user = userEvent.setup();
    render(<DateFilter {...mockParams} />);

    // Switch to relative mode
    const relativeTab = screen.getByRole("radio", { name: /relative/i });
    await user.click(relativeTab);

    // Select "In Range" filter type
    const filterTypeDropdown = screen.getByRole("combobox", {
      name: /filter type/i,
    });
    await user.selectOptions(filterTypeDropdown, "inRange");

    // Type in the 'from' field
    const fromInput = screen.getByPlaceholderText("e.g., Today, Today+7d");
    await user.type(fromInput, "Today");

    // Verify 'from' field retains value
    expect(fromInput).toHaveValue("Today");

    // Find and type in the 'to' field
    const toInput = screen.getByPlaceholderText("e.g., Today+30d");

    // Type one character at a time to simulate real user behavior
    await user.type(toInput, "T");
    expect(toInput).toHaveValue("T");

    await user.type(toInput, "o");
    expect(toInput).toHaveValue("To");

    await user.type(toInput, "d");
    expect(toInput).toHaveValue("Tod");

    await user.type(toInput, "a");
    expect(toInput).toHaveValue("Toda");

    await user.type(toInput, "y");
    expect(toInput).toHaveValue("Today");

    await user.type(toInput, "+");
    expect(toInput).toHaveValue("Today+");

    await user.type(toInput, "7");
    expect(toInput).toHaveValue("Today+7");

    await user.type(toInput, "d");
    expect(toInput).toHaveValue("Today+7d");

    // Wait a bit for any potential state updates
    await waitFor(() => {
      // The 'to' field should retain its value
      expect(toInput).toHaveValue("Today+7d");
    });

    // Verify both fields still have their values after a delay
    await waitFor(
      () => {
        expect(fromInput).toHaveValue("Today");
        expect(toInput).toHaveValue("Today+7d");
      },
      { timeout: 1000 },
    );
  });

  it("should NOT clear the 'to' field when filter model changes", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<DateFilter {...mockParams} />);

    // Switch to relative mode
    const relativeTab = screen.getByRole("radio", { name: /relative/i });
    await user.click(relativeTab);

    // Select "In Range" filter type
    const filterTypeDropdown = screen.getByRole("combobox", {
      name: /filter type/i,
    });
    await user.selectOptions(filterTypeDropdown, "inRange");

    // Type in both fields
    const fromInput = screen.getByPlaceholderText("e.g., Today, Today+7d");
    const toInput = screen.getByPlaceholderText("e.g., Today+30d");

    await user.type(fromInput, "Today");
    await user.type(toInput, "Today+7d");

    // Both should have values
    expect(fromInput).toHaveValue("Today");
    expect(toInput).toHaveValue("Today+7d");

    // Simulate a filter model change (which might trigger the bug)
    const newModel = {
      type: "inRange" as const,
      mode: "relative" as const,
      expressionFrom: "Today",
      expressionTo: "Today+7d",
    };

    // Re-render with the model (simulating AG Grid updating the filter)
    rerender(<DateFilter {...mockParams} model={newModel} />);

    // Wait and verify both fields still have their values
    await waitFor(() => {
      expect(screen.getByDisplayValue("Today")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Today+7d")).toBeInTheDocument();
    });
  });

  it("should handle rapid typing in the 'to' field", async () => {
    const user = userEvent.setup({ delay: null }); // No delay between keystrokes
    render(<DateFilter {...mockParams} />);

    // Switch to relative mode
    const relativeTab = screen.getByRole("radio", { name: /relative/i });
    await user.click(relativeTab);

    // Select "In Range" filter type
    const filterTypeDropdown = screen.getByRole("combobox", {
      name: /filter type/i,
    });
    await user.selectOptions(filterTypeDropdown, "inRange");

    // Type in the 'to' field rapidly
    const toInput = screen.getByPlaceholderText("e.g., Today+30d");

    // Type rapidly without waiting
    await user.type(toInput, "Today+7d", { delay: null });

    // The value should be retained
    expect(toInput).toHaveValue("Today+7d");
  });

  it("should track state reinitializations to identify the bug", async () => {
    const user = userEvent.setup();
    render(<DateFilter {...mockParams} />);

    // Switch to relative mode
    const relativeTab = screen.getByRole("radio", { name: /relative/i });
    await user.click(relativeTab);

    // Select "In Range" filter type
    const filterTypeDropdown = screen.getByRole("combobox", {
      name: /filter type/i,
    });
    await user.selectOptions(filterTypeDropdown, "inRange");

    // Clear console logs from setup
    consoleLogSpy.mockClear();

    // Type in the 'to' field and monitor logs
    const toInput = screen.getByPlaceholderText("e.g., Today+30d");

    // Type a single character
    await user.type(toInput, "T");

    // Check if initializeFromModel was called (which would indicate the bug)
    const initCalls = consoleLogSpy.mock.calls.filter((call) =>
      call.some(
        (arg) => typeof arg === "string" && arg.includes("initializeFromModel"),
      ),
    );

    // Log all console calls for debugging
    console.log("Console calls after typing 'T':", consoleLogSpy.mock.calls);

    // There should be no initializeFromModel calls during typing
    expect(initCalls.length).toBe(0);

    // The field should still have the value
    expect(toInput).toHaveValue("T");
  });
});
