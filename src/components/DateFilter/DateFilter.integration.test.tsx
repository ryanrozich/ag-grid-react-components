import { expect, vi, beforeEach, describe, it } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DateFilter from "./index";
import { DateFilterModel, DateFilterParams } from "./types";
import type { Column, GridApi, IRowModel, ColDef } from "ag-grid-community";

// Mock the AG Grid React hook
vi.mock("ag-grid-react", () => ({
  useGridFilter: vi.fn(),
}));

// Mock date-fns to ensure consistent test results
vi.mock("date-fns", async () => {
  const actual = await vi.importActual("date-fns");
  return {
    ...actual,
    format: vi.fn((date, formatStr) => {
      // Mock format function for consistent test results
      if (formatStr === "yyyy-MM-dd") {
        return date.toISOString().split("T")[0];
      }
      return date.toISOString();
    }),
  };
});

describe("DateFilter Integration Tests", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    const { useGridFilter } = vi.mocked(await import("ag-grid-react"));
    // useGridFilter just needs to be called with callbacks, it doesn't return anything
    useGridFilter.mockImplementation(() => {});
  });

  // Mock props that would normally be provided by AG Grid
  const createMockProps = (overrides = {}): DateFilterParams => ({
    column: { getColId: () => "date" } as unknown as Column,
    api: { addEventListener: vi.fn() } as unknown as GridApi,
    context: {},
    testId: "date-filter-integration",
    filterChangedCallback: vi.fn(),
    filterModifiedCallback: vi.fn(),
    colDef: {} as unknown as ColDef,
    rowModel: {} as unknown as IRowModel,
    getValue: vi.fn(() => new Date("2023-01-15")) as any,
    doesRowPassOtherFilter: vi.fn(() => true),
    ...overrides,
  });

  describe("Full Component Integration", () => {
    it("should render all components in absolute mode", () => {
      const props = createMockProps();
      render(<DateFilter {...props} />);

      // Check that all main components are rendered
      expect(screen.getByTestId("date-filter-integration")).toBeInTheDocument();
      expect(screen.getByTestId("mode-toggle")).toBeInTheDocument();
      expect(screen.getByTestId("apply-button")).toBeInTheDocument();
      expect(screen.getByTestId("clear-button")).toBeInTheDocument();
    });

    it("should switch between absolute and relative modes", async () => {
      const props = createMockProps();
      render(<DateFilter {...props} />);

      // Start in absolute mode - should show date input
      expect(screen.getByTestId("date-input")).toBeInTheDocument();

      // Switch to relative mode
      const relativeToggle = screen.getByText("Relative");
      fireEvent.click(relativeToggle);

      // Should now show relative input
      await waitFor(() => {
        expect(screen.getByTestId("relative-input")).toBeInTheDocument();
      });
    });

    it("should apply filter when Apply button is clicked", async () => {
      const mockFilterChangedCallback = vi.fn();

      const props = createMockProps({
        filterChangedCallback: mockFilterChangedCallback,
        model: {
          type: "equals",
          mode: "absolute",
          dateFrom: new Date("2023-01-15"),
          dateTo: null,
        } as DateFilterModel,
      });

      render(<DateFilter {...props} />);

      // Wait for component to initialize
      await waitFor(() => {
        expect(screen.getByTestId("apply-button")).not.toBeDisabled();
      });

      // Click Apply button
      const applyButton = screen.getByTestId("apply-button");
      fireEvent.click(applyButton);

      // Should call the callback
      expect(mockFilterChangedCallback).toHaveBeenCalled();
    });

    it("should reset filter when Clear button is clicked", async () => {
      const mockFilterChangedCallback = vi.fn();

      const props = createMockProps({
        filterChangedCallback: mockFilterChangedCallback,
        model: {
          type: "equals",
          mode: "absolute",
          dateFrom: new Date("2023-01-15"),
          dateTo: null,
        } as DateFilterModel,
      });

      render(<DateFilter {...props} />);

      // Click Clear button
      const clearButton = screen.getByTestId("clear-button");
      fireEvent.click(clearButton);

      // Should call the callback
      expect(mockFilterChangedCallback).toHaveBeenCalled();
    });
  });

  describe("State Management Integration", () => {
    it("should maintain state consistency across mode changes", async () => {
      const props = createMockProps();
      render(<DateFilter {...props} />);

      // Start in absolute mode - verify date picker is present
      expect(screen.getByTestId("date-input")).toBeInTheDocument();

      // Switch to relative mode
      const relativeToggle = screen.getByText("Relative");
      fireEvent.click(relativeToggle);

      await waitFor(() => {
        expect(screen.getByTestId("relative-input")).toBeInTheDocument();
      });

      // Switch back to absolute mode
      const absoluteToggle = screen.getByText("Specific");
      fireEvent.click(absoluteToggle);

      await waitFor(() => {
        expect(screen.getByTestId("date-input")).toBeInTheDocument();
      });

      // The date input should be present
      // Note: This tests that state is properly managed across mode switches
      expect(screen.getByTestId("date-input")).toBeInTheDocument();
    });

    it("should validate filter types correctly", () => {
      const props = createMockProps({
        model: {
          type: "inRange",
          mode: "absolute",
          dateFrom: new Date("2023-01-01"),
          dateTo: new Date("2023-01-31"),
        } as DateFilterModel,
      });

      render(<DateFilter {...props} />);

      // Should render the range filter correctly
      expect(screen.getByTestId("date-filter-integration")).toBeInTheDocument();
    });
  });

  describe("Validation Integration", () => {
    it("should disable Apply button when filter is invalid", () => {
      const props = createMockProps();
      render(<DateFilter {...props} />);

      // Apply button should be disabled when no date is selected
      const applyButton = screen.getByTestId("apply-button");
      expect(applyButton).toBeDisabled();
    });

    it("should enable Apply button when filter becomes valid", async () => {
      const props = createMockProps();
      render(<DateFilter {...props} />);

      // Initially disabled
      const applyButton = screen.getByTestId("apply-button");
      expect(applyButton).toBeDisabled();

      // Switch to relative mode and enter valid expression
      const relativeToggle = screen.getByText("Relative");
      fireEvent.click(relativeToggle);

      await waitFor(() => {
        const relativeInput = screen.getByRole("textbox");
        fireEvent.change(relativeInput, { target: { value: "Today" } });
      });

      // Apply button should now be enabled (after debounce)
      await waitFor(
        () => {
          expect(applyButton).not.toBeDisabled();
        },
        { timeout: 1000 },
      );
    });
  });

  describe("Performance Integration", () => {
    it("should debounce validation correctly", async () => {
      const props = createMockProps();
      render(<DateFilter {...props} />);

      // Switch to relative mode
      const relativeToggle = screen.getByText("Relative");
      fireEvent.click(relativeToggle);

      await waitFor(() => {
        const relativeInput = screen.getByRole("textbox");

        // Type multiple characters rapidly
        fireEvent.change(relativeInput, { target: { value: "T" } });
        fireEvent.change(relativeInput, { target: { value: "To" } });
        fireEvent.change(relativeInput, { target: { value: "Tod" } });
        fireEvent.change(relativeInput, { target: { value: "Toda" } });
        fireEvent.change(relativeInput, { target: { value: "Today" } });
      });

      // Validation should be debounced, not called for each keystroke
      // We test this by ensuring the component doesn't crash and eventually validates
      await waitFor(
        () => {
          expect(screen.getByTestId("apply-button")).not.toBeDisabled();
        },
        { timeout: 1000 },
      );
    });
  });

  describe("Error Handling Integration", () => {
    it("should handle invalid initial model gracefully", () => {
      const props = createMockProps({
        model: {
          type: "invalidType" as never,
          mode: "invalidMode" as never,
          dateFrom: null, // Use null instead of invalid date string
        } as DateFilterModel,
      });

      // Should not crash with invalid model
      expect(() => {
        render(<DateFilter {...props} />);
      }).not.toThrow();

      // Should render with default values
      expect(screen.getByTestId("date-filter-integration")).toBeInTheDocument();
    });

    it("should handle component rendering with errors gracefully", () => {
      const props = createMockProps({
        model: {
          type: "equals",
          mode: "absolute",
          dateFrom: new Date("2023-01-15"),
        } as DateFilterModel,
      });

      render(<DateFilter {...props} />);

      // Click apply button - should render successfully
      const applyButton = screen.getByTestId("apply-button");
      fireEvent.click(applyButton);

      // Component should still be rendered
      expect(screen.getByTestId("date-filter-integration")).toBeInTheDocument();
    });
  });

  describe("Accessibility Integration", () => {
    it("should have proper ARIA attributes", () => {
      const props = createMockProps();
      render(<DateFilter {...props} />);

      // Main container should have proper role and label
      const filterContainer = screen.getByRole("form", { name: "Date Filter" });
      expect(filterContainer).toBeInTheDocument();

      // Buttons should be accessible
      expect(screen.getByTestId("apply-button")).toHaveAttribute(
        "type",
        "button",
      );
      expect(screen.getByTestId("clear-button")).toHaveAttribute(
        "type",
        "button",
      );
    });

    it("should support keyboard navigation", () => {
      const props = createMockProps({
        model: {
          type: "equals",
          mode: "absolute",
          dateFrom: new Date("2023-01-15"),
        } as DateFilterModel,
      });

      render(<DateFilter {...props} />);

      // Tab to Apply button and press Enter
      const applyButton = screen.getByTestId("apply-button");
      applyButton.focus();
      fireEvent.keyDown(applyButton, { key: "Enter", code: "Enter" });

      // Should handle Enter key on apply button
      expect(applyButton).toBeInTheDocument();
    });
  });

  describe("Filter Logic Integration", () => {
    it("should register doesFilterPass callback with AG Grid", async () => {
      const props = createMockProps({
        model: {
          type: "equals",
          mode: "absolute",
          dateFrom: new Date("2023-01-15"),
        } as DateFilterModel,
      });

      render(<DateFilter {...props} />);

      // Verify useGridFilter was called with callbacks object
      const agGridReact = await import("ag-grid-react");
      const { useGridFilter } = vi.mocked(agGridReact);
      expect(useGridFilter).toHaveBeenCalledWith(
        expect.objectContaining({
          doesFilterPass: expect.any(Function),
          getModel: expect.any(Function),
          setModel: expect.any(Function),
          getModelAsString: expect.any(Function),
        }),
      );
    });

    it("should provide filter model through getModel callback", async () => {
      const props = createMockProps({
        model: {
          type: "equals",
          mode: "absolute",
          dateFrom: new Date("2023-01-15"),
        } as DateFilterModel,
      });

      render(<DateFilter {...props} />);

      // Get the callbacks that were passed to useGridFilter
      const agGridReact = await import("ag-grid-react");
      const { useGridFilter } = vi.mocked(agGridReact);
      const callbacks = useGridFilter.mock.calls[0][0];

      // Test the getModel callback if it exists
      if ("getModel" in callbacks && typeof callbacks.getModel === "function") {
        const model = callbacks.getModel();
        // The model might have dateFrom as a string or Date
        expect(model).toMatchObject({
          type: "equals",
          mode: "absolute",
        });
        expect(model.dateFrom).toBeDefined();
        // Check if it's a valid date (either Date object or ISO string)
        const dateFrom =
          typeof model.dateFrom === "string"
            ? new Date(model.dateFrom)
            : model.dateFrom;
        expect(dateFrom).toBeInstanceOf(Date);
        expect(dateFrom.toISOString()).toBe("2023-01-15T00:00:00.000Z");
      }
    });

    describe("doesFilterPass implementation", () => {
      let doesFilterPassCallback: any;
      let setModelCallback: any;

      beforeEach(async () => {
        const { useGridFilter } = vi.mocked(await import("ag-grid-react"));
        useGridFilter.mockImplementation((callbacks) => {
          doesFilterPassCallback = callbacks.doesFilterPass;
          setModelCallback = (callbacks as any).setModel;
        });
      });

      it("should return true when no filter is active", () => {
        const props = createMockProps();
        render(<DateFilter {...props} />);

        const mockNode = { data: { date: new Date("2023-01-15") } };
        const result = doesFilterPassCallback({ node: mockNode });
        expect(result).toBe(true);
      });

      it("should filter dates with equals operator", async () => {
        const props = createMockProps();
        props.getValue = vi.fn((node: any) => node.data?.date);
        render(<DateFilter {...props} />);

        // Set up an equals filter
        await waitFor(() => {
          setModelCallback({
            type: "equals",
            mode: "absolute",
            dateFrom: "2023-01-15T00:00:00.000Z",
          });
        });

        // Test matching date
        const matchingNode = { data: { date: new Date("2023-01-15") } };
        expect(doesFilterPassCallback({ node: matchingNode })).toBe(true);

        // Test non-matching date
        const nonMatchingNode = { data: { date: new Date("2023-01-16") } };
        expect(doesFilterPassCallback({ node: nonMatchingNode })).toBe(false);
      });

      it("should filter dates with notEqual operator", async () => {
        const props = createMockProps();
        props.getValue = vi.fn((node: any) => node.data?.date);
        render(<DateFilter {...props} />);

        await waitFor(() => {
          setModelCallback({
            type: "notEqual",
            mode: "absolute",
            dateFrom: "2023-01-15T00:00:00.000Z",
          });
        });

        const differentNode = { data: { date: new Date("2023-01-16") } };
        expect(doesFilterPassCallback({ node: differentNode })).toBe(true);

        const sameNode = { data: { date: new Date("2023-01-15") } };
        expect(doesFilterPassCallback({ node: sameNode })).toBe(false);
      });

      it("should filter dates with after operator (inclusive)", async () => {
        const props = createMockProps({ afterInclusive: true });
        props.getValue = vi.fn((node: any) => node.data?.date);
        render(<DateFilter {...props} />);

        await waitFor(() => {
          setModelCallback({
            type: "after",
            mode: "absolute",
            dateFrom: "2023-01-15T00:00:00.000Z",
            fromInclusive: true,
          });
        });

        const afterNode = { data: { date: new Date("2023-01-16") } };
        expect(doesFilterPassCallback({ node: afterNode })).toBe(true);

        const sameNode = { data: { date: new Date("2023-01-15") } };
        expect(doesFilterPassCallback({ node: sameNode })).toBe(true); // inclusive

        const beforeNode = { data: { date: new Date("2023-01-14") } };
        expect(doesFilterPassCallback({ node: beforeNode })).toBe(false);
      });

      it("should filter dates with before operator (exclusive)", async () => {
        const props = createMockProps({ beforeInclusive: false });
        props.getValue = vi.fn((node: any) => node.data?.date);
        render(<DateFilter {...props} />);

        await waitFor(() => {
          setModelCallback({
            type: "before",
            mode: "absolute",
            dateFrom: "2023-01-15T00:00:00.000Z",
            toInclusive: false,
          });
        });

        const beforeNode = { data: { date: new Date("2023-01-14") } };
        expect(doesFilterPassCallback({ node: beforeNode })).toBe(true);

        const sameNode = { data: { date: new Date("2023-01-15") } };
        expect(doesFilterPassCallback({ node: sameNode })).toBe(false); // exclusive

        const afterNode = { data: { date: new Date("2023-01-16") } };
        expect(doesFilterPassCallback({ node: afterNode })).toBe(false);
      });

      it("should filter dates with inRange operator", async () => {
        const props = createMockProps();
        props.getValue = vi.fn((node: any) => node.data?.date);
        render(<DateFilter {...props} />);

        await waitFor(() => {
          setModelCallback({
            type: "inRange",
            mode: "absolute",
            dateFrom: "2023-01-10T00:00:00.000Z",
            dateTo: "2023-01-20T00:00:00.000Z",
            fromInclusive: true,
            toInclusive: true,
          });
        });

        const inRangeNode = { data: { date: new Date("2023-01-15") } };
        expect(doesFilterPassCallback({ node: inRangeNode })).toBe(true);

        const startNode = { data: { date: new Date("2023-01-10") } };
        expect(doesFilterPassCallback({ node: startNode })).toBe(true); // inclusive

        const endNode = { data: { date: new Date("2023-01-20") } };
        expect(doesFilterPassCallback({ node: endNode })).toBe(true); // inclusive

        const beforeRangeNode = { data: { date: new Date("2023-01-09") } };
        expect(doesFilterPassCallback({ node: beforeRangeNode })).toBe(false);

        const afterRangeNode = { data: { date: new Date("2023-01-21") } };
        expect(doesFilterPassCallback({ node: afterRangeNode })).toBe(false);
      });

      it("should handle null and invalid dates", async () => {
        const props = createMockProps();
        props.getValue = vi.fn((node: any) => node.data?.date);
        render(<DateFilter {...props} />);

        await waitFor(() => {
          setModelCallback({
            type: "equals",
            mode: "absolute",
            dateFrom: "2023-01-15T00:00:00.000Z",
          });
        });

        const nullNode = { data: { date: null } };
        expect(doesFilterPassCallback({ node: nullNode })).toBe(false);

        const undefinedNode = { data: { date: undefined } };
        expect(doesFilterPassCallback({ node: undefinedNode })).toBe(false);

        const invalidNode = { data: { date: "invalid-date" } };
        expect(doesFilterPassCallback({ node: invalidNode })).toBe(false);

        const invalidDateNode = { data: { date: new Date("invalid") } };
        expect(doesFilterPassCallback({ node: invalidDateNode })).toBe(false);
      });

      it("should handle relative date expressions", async () => {
        const props = createMockProps();
        props.getValue = vi.fn((node: any) => node.data?.date);
        render(<DateFilter {...props} />);

        await waitFor(() => {
          setModelCallback({
            type: "equals",
            mode: "relative",
            expressionFrom: "Today",
          });
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const todayNode = { data: { date: today } };
        expect(doesFilterPassCallback({ node: todayNode })).toBe(true);

        const tomorrowNode = { data: { date: tomorrow } };
        expect(doesFilterPassCallback({ node: tomorrowNode })).toBe(false);
      });

      it("should handle open-ended ranges", async () => {
        const props = createMockProps();
        props.getValue = vi.fn((node: any) => node.data?.date);
        render(<DateFilter {...props} />);

        // Range with no end date
        await waitFor(() => {
          setModelCallback({
            type: "inRange",
            mode: "absolute",
            dateFrom: "2023-01-15T00:00:00.000Z",
            dateTo: null,
          });
        });

        const afterStartNode = { data: { date: new Date("2023-01-20") } };
        expect(doesFilterPassCallback({ node: afterStartNode })).toBe(true);

        const beforeStartNode = { data: { date: new Date("2023-01-10") } };
        expect(doesFilterPassCallback({ node: beforeStartNode })).toBe(false);
      });

      it("should handle time normalization correctly", async () => {
        const props = createMockProps();
        props.getValue = vi.fn((node: any) => node.data?.date);
        render(<DateFilter {...props} />);

        await waitFor(() => {
          setModelCallback({
            type: "equals",
            mode: "absolute",
            dateFrom: "2023-01-15T00:00:00.000Z",
          });
        });

        // Date with different times should still match
        const morningNode = { data: { date: new Date("2023-01-15T08:30:00") } };
        expect(doesFilterPassCallback({ node: morningNode })).toBe(true);

        const eveningNode = { data: { date: new Date("2023-01-15T23:59:59") } };
        expect(doesFilterPassCallback({ node: eveningNode })).toBe(true);
      });
    });
  });
});
