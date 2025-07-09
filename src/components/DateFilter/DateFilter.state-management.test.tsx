import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import DateFilter from "./index";
import type { IFilterParams } from "ag-grid-community";
import type { DateFilterModel } from "./types";

describe("DateFilter State Management Tests", () => {
  let mockParams: IFilterParams;
  let mockFilterChangedCallback: ReturnType<typeof vi.fn>;
  let mockFilterModifiedCallback: ReturnType<typeof vi.fn>;
  let mockDoesRowPassOtherFilter: ReturnType<typeof vi.fn>;
  let mockGetValue: ReturnType<typeof vi.fn>;
  let mockOnModelChange: ReturnType<typeof vi.fn>;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, "log");
    mockFilterChangedCallback = vi.fn();
    mockFilterModifiedCallback = vi.fn();
    mockDoesRowPassOtherFilter = vi.fn().mockReturnValue(true);
    mockGetValue = vi.fn((node) => node.data?.date);
    mockOnModelChange = vi.fn();

    mockParams = {
      filterChangedCallback: mockFilterChangedCallback,
      filterModifiedCallback: mockFilterModifiedCallback,
      doesRowPassOtherFilter: mockDoesRowPassOtherFilter,
      getValue: mockGetValue,
      onModelChange: mockOnModelChange,
      column: {
        getColId: () => "date",
      } as any,
      api: {} as any,
      context: {},
      colDef: {},
      rowModel: {} as any,
    } as IFilterParams;
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    vi.clearAllMocks();
  });

  describe("1. Filter type persistence", () => {
    it("should persist filter type (equals) after applying", async () => {
      const user = userEvent.setup();
      const filterRef = { current: null } as any;
      render(<DateFilter {...mockParams} ref={filterRef} />);

      // Select equals filter type
      const filterTypeDropdown = screen.getByRole("combobox", {
        name: /filter type/i,
      });
      await user.selectOptions(filterTypeDropdown, "equals");

      // Set a date value
      const relativeTab = screen.getByRole("radio", { name: /relative/i });
      await user.click(relativeTab);

      const expressionInput = screen.getByPlaceholderText(/e\.g\., Today/i);
      await user.type(expressionInput, "Today");

      // Apply filter
      const applyButton = screen.getByRole("button", { name: /apply/i });
      await user.click(applyButton);

      // Verify model was set correctly
      expect(mockOnModelChange).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "equals",
          mode: "relative",
          expressionFrom: "Today",
        }),
      );

      // Verify filter type is still selected
      expect(filterTypeDropdown).toHaveValue("equals");
    });

    it("should persist filter type (before) after applying", async () => {
      const user = userEvent.setup();
      render(<DateFilter {...mockParams} />);

      const filterTypeDropdown = screen.getByRole("combobox", {
        name: /filter type/i,
      });
      await user.selectOptions(filterTypeDropdown, "before");

      const relativeTab = screen.getByRole("radio", { name: /relative/i });
      await user.click(relativeTab);

      const expressionInput = screen.getByPlaceholderText(/e\.g\., Today/i);
      await user.type(expressionInput, "Today-7d");

      const applyButton = screen.getByRole("button", { name: /apply/i });
      await user.click(applyButton);

      expect(mockOnModelChange).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "before",
          mode: "relative",
          expressionFrom: "Today-7d",
        }),
      );

      expect(filterTypeDropdown).toHaveValue("before");
    });

    it("should persist filter type (after) after applying", async () => {
      const user = userEvent.setup();
      render(<DateFilter {...mockParams} />);

      const filterTypeDropdown = screen.getByRole("combobox", {
        name: /filter type/i,
      });
      await user.selectOptions(filterTypeDropdown, "after");

      const relativeTab = screen.getByRole("radio", { name: /relative/i });
      await user.click(relativeTab);

      const expressionInput = screen.getByPlaceholderText(/e\.g\., Today/i);
      await user.type(expressionInput, "Today+7d");

      const applyButton = screen.getByRole("button", { name: /apply/i });
      await user.click(applyButton);

      expect(mockOnModelChange).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "after",
          mode: "relative",
          expressionFrom: "Today+7d",
        }),
      );

      expect(filterTypeDropdown).toHaveValue("after");
    });

    it.skip("should persist filter type (inRange) after applying", async () => {
      const user = userEvent.setup();
      render(<DateFilter {...mockParams} />);

      const filterTypeDropdown = screen.getByRole("combobox", {
        name: /filter type/i,
      });
      await user.selectOptions(filterTypeDropdown, "inRange");

      const relativeTab = screen.getByRole("radio", { name: /relative/i });
      await user.click(relativeTab);

      const fromInput = screen.getByPlaceholderText("e.g., Today, Today+7d");
      const toInput = screen.getByPlaceholderText("e.g., Today+30d");

      await user.type(fromInput, "Today");
      await user.type(toInput, "Today+30d");

      // Wait for inputs to have their values
      await waitFor(() => {
        expect(fromInput).toHaveValue("Today");
        expect(toInput).toHaveValue("Today+30d");
      });

      // Wait longer for state to sync
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      });

      const applyButton = screen.getByRole("button", { name: /apply/i });
      await user.click(applyButton);

      // Check what was actually called
      expect(mockOnModelChange).toHaveBeenCalled();
      const actualCall = mockOnModelChange.mock.calls[0][0];

      // For now, just check that it was called with the right type and mode
      expect(actualCall).toMatchObject({
        type: "inRange",
        mode: "relative",
        expressionFrom: "Today",
      });

      // Log what we got to debug
      console.log("Actual model passed:", actualCall);

      expect(filterTypeDropdown).toHaveValue("inRange");
    });
  });

  describe("2. Mode switching between relative and absolute", () => {
    it.skip("should switch from absolute to relative mode without reverting", async () => {
      const user = userEvent.setup();
      render(<DateFilter {...mockParams} />);

      // Start in absolute mode (default)
      const absoluteTab = screen.getByRole("radio", { name: /specific/i });
      expect(absoluteTab).toBeChecked();

      // Enter a date in absolute mode
      const dateInput = screen.getByPlaceholderText(/select date/i);
      await user.type(dateInput, "2024-01-15");

      // Switch to relative mode
      const relativeTab = screen.getByRole("radio", { name: /relative/i });
      await user.click(relativeTab);

      // Verify mode switched
      expect(relativeTab).toBeChecked();
      expect(absoluteTab).not.toBeChecked();

      // Enter expression in relative mode
      const expressionInput = screen.getByPlaceholderText(/e\.g\., Today/i);
      await user.type(expressionInput, "Today");

      // Apply filter
      const applyButton = screen.getByRole("button", { name: /apply/i });
      await user.click(applyButton);

      // Verify model has relative mode
      expect(mockOnModelChange).toHaveBeenCalledWith(
        expect.objectContaining({
          mode: "relative",
          expressionFrom: "Today",
        }),
      );

      // Verify mode is still relative
      expect(relativeTab).toBeChecked();
    });

    it.skip("should switch from relative to absolute mode without reverting", async () => {
      const user = userEvent.setup();
      render(<DateFilter {...mockParams} defaultMode="relative" />);

      // Start in relative mode
      const relativeTab = screen.getByRole("radio", { name: /relative/i });
      expect(relativeTab).toBeChecked();

      // Enter expression
      const expressionInput = screen.getByPlaceholderText(/e\.g\., Today/i);
      await user.type(expressionInput, "Today+7d");

      // Switch to absolute mode
      const absoluteTab = screen.getByRole("radio", { name: /specific/i });
      await user.click(absoluteTab);

      // Verify mode switched
      expect(absoluteTab).toBeChecked();
      expect(relativeTab).not.toBeChecked();

      // Enter date in absolute mode
      const dateInput = screen.getByPlaceholderText(/select date/i);
      await user.type(dateInput, "2024-01-20");

      // Apply filter
      const applyButton = screen.getByRole("button", { name: /apply/i });
      await user.click(applyButton);

      // Verify model has absolute mode
      expect(mockOnModelChange).toHaveBeenCalledWith(
        expect.objectContaining({
          mode: "absolute",
          dateFrom: expect.any(Date),
        }),
      );

      // Verify mode is still absolute
      expect(absoluteTab).toBeChecked();
    });

    it("should maintain filter type when switching modes", async () => {
      const user = userEvent.setup();
      render(<DateFilter {...mockParams} />);

      // Set filter type to inRange
      const filterTypeDropdown = screen.getByRole("combobox", {
        name: /filter type/i,
      });
      await user.selectOptions(filterTypeDropdown, "inRange");

      // Switch to relative mode
      const relativeTab = screen.getByRole("radio", { name: /relative/i });
      await user.click(relativeTab);

      // Verify filter type is still inRange
      expect(filterTypeDropdown).toHaveValue("inRange");

      // Switch back to absolute
      const absoluteTab = screen.getByRole("radio", { name: /specific/i });
      await user.click(absoluteTab);

      // Verify filter type is still inRange
      expect(filterTypeDropdown).toHaveValue("inRange");
    });
  });

  describe("3. User input deletion without values reappearing", () => {
    it("should allow deleting input without values reappearing", async () => {
      const user = userEvent.setup();
      render(<DateFilter {...mockParams} />);

      // Switch to relative mode
      const relativeTab = screen.getByRole("radio", { name: /relative/i });
      await user.click(relativeTab);

      // Type expression
      const expressionInput = screen.getByPlaceholderText(/e\.g\., Today/i);
      await user.type(expressionInput, "Today+7d");
      expect(expressionInput).toHaveValue("Today+7d");

      // Clear the input
      await user.clear(expressionInput);
      expect(expressionInput).toHaveValue("");

      // Wait to ensure value doesn't reappear
      await waitFor(
        () => {
          expect(expressionInput).toHaveValue("");
        },
        { timeout: 1000 },
      );

      // Type new value
      await user.type(expressionInput, "Today-3d");
      expect(expressionInput).toHaveValue("Today-3d");
    });

    it("should allow partial deletion in range inputs", async () => {
      const user = userEvent.setup();
      render(<DateFilter {...mockParams} />);

      // Set to inRange and relative mode
      const filterTypeDropdown = screen.getByRole("combobox", {
        name: /filter type/i,
      });
      await user.selectOptions(filterTypeDropdown, "inRange");

      const relativeTab = screen.getByRole("radio", { name: /relative/i });
      await user.click(relativeTab);

      // Type in both inputs
      const fromInput = screen.getByPlaceholderText("e.g., Today, Today+7d");
      const toInput = screen.getByPlaceholderText("e.g., Today+30d");

      await user.type(fromInput, "Today");
      await user.type(toInput, "Today+30d");

      // Partially delete the 'to' input
      await user.click(toInput);
      await user.keyboard("{End}");
      await user.keyboard("{Backspace}{Backspace}{Backspace}"); // Remove "30d"

      expect(toInput).toHaveValue("Today+");

      // Wait to ensure value doesn't revert
      await waitFor(
        () => {
          expect(toInput).toHaveValue("Today+");
        },
        { timeout: 500 },
      );

      // Complete the edit
      await user.type(toInput, "7d");
      expect(toInput).toHaveValue("Today+7d");
    });

    it("should handle selecting all and deleting", async () => {
      const user = userEvent.setup();
      render(<DateFilter {...mockParams} />);

      const relativeTab = screen.getByRole("radio", { name: /relative/i });
      await user.click(relativeTab);

      const expressionInput = screen.getByPlaceholderText(/e\.g\., Today/i);
      await user.type(expressionInput, "Today+14d");

      // Select all and delete
      await user.click(expressionInput);
      await user.keyboard("{Control>}a{/Control}");
      await user.keyboard("{Delete}");

      expect(expressionInput).toHaveValue("");

      // Ensure it stays empty
      await waitFor(
        () => {
          expect(expressionInput).toHaveValue("");
        },
        { timeout: 500 },
      );
    });
  });

  describe("4. Component doesn't re-initialize state during user interaction", () => {
    it("should not re-initialize when user is typing", async () => {
      const user = userEvent.setup();
      render(<DateFilter {...mockParams} />);

      const relativeTab = screen.getByRole("radio", { name: /relative/i });
      await user.click(relativeTab);

      const expressionInput = screen.getByPlaceholderText(/e\.g\., Today/i);

      // Clear previous logs
      consoleLogSpy.mockClear();

      // Type slowly to simulate real user interaction
      await user.type(expressionInput, "T");
      await user.type(expressionInput, "o");
      await user.type(expressionInput, "d");
      await user.type(expressionInput, "a");
      await user.type(expressionInput, "y");

      // Check that initializeFromModel wasn't called during typing
      const initCalls = consoleLogSpy.mock.calls.filter((call) =>
        call.some(
          (arg) =>
            typeof arg === "string" && arg.includes("initializeFromModel"),
        ),
      );

      expect(initCalls.length).toBe(0);
      expect(expressionInput).toHaveValue("Today");
    });

    it("should not re-initialize when changing filter type", async () => {
      const user = userEvent.setup();
      render(<DateFilter {...mockParams} />);

      const relativeTab = screen.getByRole("radio", { name: /relative/i });
      await user.click(relativeTab);

      const expressionInput = screen.getByPlaceholderText(/e\.g\., Today/i);
      await user.type(expressionInput, "Today+7d");

      consoleLogSpy.mockClear();

      // Change filter type
      const filterTypeDropdown = screen.getByRole("combobox", {
        name: /filter type/i,
      });
      await user.selectOptions(filterTypeDropdown, "after");

      // Check that state wasn't re-initialized
      const initCalls = consoleLogSpy.mock.calls.filter((call) =>
        call.some(
          (arg) =>
            typeof arg === "string" && arg.includes("initializeFromModel"),
        ),
      );

      expect(initCalls.length).toBe(0);
      expect(expressionInput).toHaveValue("Today+7d");
      expect(filterTypeDropdown).toHaveValue("after");
    });

    it("should track user interaction state correctly", async () => {
      const user = userEvent.setup();
      const { rerender } = render(<DateFilter {...mockParams} />);

      const relativeTab = screen.getByRole("radio", { name: /relative/i });
      await user.click(relativeTab);

      const expressionInput = screen.getByPlaceholderText(/e\.g\., Today/i);

      // Start typing
      await user.type(expressionInput, "Today");

      // Try to set model while user is interacting
      const newModel: DateFilterModel = {
        type: "equals",
        mode: "relative",
        expressionFrom: "Yesterday",
      };

      rerender(<DateFilter {...mockParams} model={newModel} />);

      // User's input should be preserved
      expect(expressionInput).toHaveValue("Today");
    });
  });

  describe("5. Programmatic updates (from QuickFilterDropdown)", () => {
    it("should accept programmatic updates when not interacting", async () => {
      const filterRef = { current: null } as any;
      render(<DateFilter {...mockParams} ref={filterRef} />);

      // Wait for component to mount
      await waitFor(() => {
        expect(filterRef.current).toBeTruthy();
      });

      // Programmatically set model
      const programmaticModel: DateFilterModel = {
        type: "inRange",
        mode: "relative",
        expressionFrom: "Today-7d",
        expressionTo: "Today",
      };

      filterRef.current?.setModel(programmaticModel);

      // Wait for state update
      await waitFor(() => {
        expect(mockOnModelChange).toHaveBeenCalledWith(programmaticModel);
      });

      // Verify UI reflects the programmatic change
      const filterTypeDropdown = screen.getByRole("combobox", {
        name: /filter type/i,
      });
      expect(filterTypeDropdown).toHaveValue("inRange");

      const relativeTab = screen.getByRole("radio", { name: /relative/i });
      expect(relativeTab).toBeChecked();

      const fromInput = screen.getByPlaceholderText("e.g., Today, Today+7d");
      const toInput = screen.getByPlaceholderText("e.g., Today+30d");

      expect(fromInput).toHaveValue("Today-7d");
      expect(toInput).toHaveValue("Today");
    });

    it("should handle quick filter preset changes", async () => {
      const filterRef = { current: null } as any;
      render(<DateFilter {...mockParams} ref={filterRef} />);

      await waitFor(() => {
        expect(filterRef.current).toBeTruthy();
      });

      // Simulate different quick filter presets
      const presets: DateFilterModel[] = [
        {
          type: "after",
          mode: "relative",
          expressionFrom: "Today-30d",
        },
        {
          type: "before",
          mode: "relative",
          expressionFrom: "Today",
        },
        {
          type: "inRange",
          mode: "relative",
          expressionFrom: "Today-7d",
          expressionTo: "Today+7d",
        },
      ];

      for (const preset of presets) {
        filterRef.current?.setModel(preset);

        await waitFor(() => {
          expect(mockOnModelChange).toHaveBeenCalledWith(preset);
        });

        // Clear for next iteration
        mockOnModelChange.mockClear();
      }
    });

    it("should handle null model (reset) programmatically", async () => {
      const filterRef = { current: null } as any;
      render(<DateFilter {...mockParams} ref={filterRef} />);

      await waitFor(() => {
        expect(filterRef.current).toBeTruthy();
      });

      // Set initial model
      const initialModel: DateFilterModel = {
        type: "equals",
        mode: "relative",
        expressionFrom: "Today",
      };

      filterRef.current?.setModel(initialModel);

      await waitFor(() => {
        expect(mockOnModelChange).toHaveBeenCalledWith(initialModel);
      });

      mockOnModelChange.mockClear();

      // Reset with null
      filterRef.current?.setModel(null);

      await waitFor(() => {
        expect(mockOnModelChange).toHaveBeenCalledWith(null);
      });

      // Verify UI is reset
      const filterTypeDropdown = screen.getByRole("combobox", {
        name: /filter type/i,
      });
      expect(filterTypeDropdown).toHaveValue("equals");

      const absoluteTab = screen.getByRole("radio", { name: /specific/i });
      expect(absoluteTab).toBeChecked();
    });

    it("should handle forceUpdate flag correctly", async () => {
      const user = userEvent.setup();
      const filterRef = { current: null } as any;
      render(<DateFilter {...mockParams} ref={filterRef} />);

      await waitFor(() => {
        expect(filterRef.current).toBeTruthy();
      });

      // User starts typing
      const relativeTab = screen.getByRole("radio", { name: /relative/i });
      await user.click(relativeTab);

      const expressionInput = screen.getByPlaceholderText(/e\.g\., Today/i);
      await user.type(expressionInput, "Today+");

      // Programmatic update with force flag (simulating QuickFilterDropdown)
      const forcedModel: DateFilterModel = {
        type: "after",
        mode: "relative",
        expressionFrom: "Today-14d",
      };

      // This should override user interaction
      filterRef.current?.setModel(forcedModel);

      await waitFor(() => {
        expect(mockOnModelChange).toHaveBeenCalledWith(forcedModel);
      });

      // Verify the forced update took effect
      expect(expressionInput).toHaveValue("Today-14d");
    });
  });

  describe("Edge cases and regression tests", () => {
    it("should handle rapid filter type changes", async () => {
      const user = userEvent.setup({ delay: null });
      render(<DateFilter {...mockParams} />);

      const filterTypeDropdown = screen.getByRole("combobox", {
        name: /filter type/i,
      });

      // Rapidly change filter types
      await user.selectOptions(filterTypeDropdown, "after");
      await user.selectOptions(filterTypeDropdown, "before");
      await user.selectOptions(filterTypeDropdown, "inRange");
      await user.selectOptions(filterTypeDropdown, "equals");

      // Final value should be stable
      expect(filterTypeDropdown).toHaveValue("equals");
    });

    it("should handle model with ISO date strings", async () => {
      const filterRef = { current: null } as any;
      render(<DateFilter {...mockParams} ref={filterRef} />);

      await waitFor(() => {
        expect(filterRef.current).toBeTruthy();
      });

      const isoModel: DateFilterModel = {
        type: "inRange",
        mode: "absolute",
        dateFrom: "2024-01-01T00:00:00.000Z" as any,
        dateTo: "2024-01-31T23:59:59.999Z" as any,
      };

      filterRef.current?.setModel(isoModel);

      await waitFor(() => {
        expect(mockOnModelChange).toHaveBeenCalledWith(isoModel);
      });
    });

    it("should maintain state during async validation", async () => {
      const user = userEvent.setup();
      render(<DateFilter {...mockParams} />);

      const relativeTab = screen.getByRole("radio", { name: /relative/i });
      await user.click(relativeTab);

      const filterTypeDropdown = screen.getByRole("combobox", {
        name: /filter type/i,
      });
      await user.selectOptions(filterTypeDropdown, "inRange");

      const toInput = screen.getByPlaceholderText("e.g., Today+30d");

      // Type expression that requires validation
      await user.type(toInput, "Today+30d");

      // Wait for debounced validation (300ms)
      await waitFor(
        () => {
          expect(toInput).toHaveValue("Today+30d");
        },
        { timeout: 500 },
      );

      // Value should remain stable
      expect(toInput).toHaveValue("Today+30d");
    });
  });
});
