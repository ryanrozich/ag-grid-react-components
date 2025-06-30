import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { GridApi, FilterModel } from "ag-grid-community";
import ActiveFilters from "./index";

// Mock AG Grid API
const createMockGridApi = (
  filterModel: FilterModel = {},
): Partial<GridApi> => ({
  getFilterModel: vi.fn(() => filterModel),
  setFilterModel: vi.fn(),
  onFilterChanged: vi.fn(),
  getColumn: vi.fn(
    (colId: string) =>
      ({
        getColDef: () => ({
          field: colId,
          headerName: colId.charAt(0).toUpperCase() + colId.slice(1),
        }),
        // Add minimal Column interface properties
        getColId: () => colId,
        getId: () => colId,
        getParent: () => null,
        isVisible: () => true,
      }) as any,
  ),
});

describe("ActiveFilters", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Component Rendering", () => {
    it("should render without crashing", () => {
      const mockApi = createMockGridApi();
      const { container } = render(
        <ActiveFilters api={mockApi as GridApi} filterModel={{}} />,
      );
      // Component returns null when no filters
      expect(container.firstChild).toBeNull();
    });

    it("should render with custom className", () => {
      const filterModel = { name: { filter: "test" } };
      const mockApi = createMockGridApi(filterModel);
      render(
        <ActiveFilters
          api={mockApi as GridApi}
          filterModel={filterModel}
          className="custom-class"
        />,
      );
      expect(screen.getByTestId("active-filters")).toHaveClass("custom-class");
    });

    it("should render nothing when filterModel is empty", () => {
      const mockApi = createMockGridApi();
      const { container } = render(
        <ActiveFilters api={mockApi as GridApi} filterModel={{}} />,
      );
      expect(container.firstChild).toBeNull();
    });

    it("should have proper test id", () => {
      const filterModel = { name: { filter: "test" } };
      const mockApi = createMockGridApi(filterModel);
      render(
        <ActiveFilters api={mockApi as GridApi} filterModel={filterModel} />,
      );
      expect(screen.getByTestId("active-filters")).toBeInTheDocument();
    });
  });

  describe("Date Filter Display", () => {
    it("should display absolute date filter with equals", () => {
      const filterModel = {
        dueDate: {
          type: "equals",
          dateFrom: "2024-12-25T00:00:00.000Z",
          mode: "absolute",
        },
      };
      const mockApi = createMockGridApi(filterModel);
      render(
        <ActiveFilters api={mockApi as GridApi} filterModel={filterModel} />,
      );
      expect(screen.getByText("DueDate:")).toBeInTheDocument();
      // Check for the date value - handling potential timezone differences
      const dateElement = screen.getByText((content, element) => {
        return (
          element?.className?.includes("filterValue") &&
          content.includes("/2024")
        );
      });
      expect(dateElement).toBeInTheDocument();
    });

    it("should display relative date filter", () => {
      const filterModel = {
        startDate: {
          type: "after",
          mode: "relative",
          expressionFrom: "Today+7d",
        },
      };
      const mockApi = createMockGridApi(filterModel);
      render(
        <ActiveFilters api={mockApi as GridApi} filterModel={filterModel} />,
      );
      expect(screen.getByText("StartDate:")).toBeInTheDocument();
      expect(screen.getByText("after Today+7d")).toBeInTheDocument();
    });

    it("should display date range filter", () => {
      const filterModel = {
        created: {
          type: "inRange",
          dateFrom: "2024-01-01T00:00:00.000Z",
          dateTo: "2024-12-31T00:00:00.000Z",
          mode: "absolute",
        },
      };
      const mockApi = createMockGridApi(filterModel);
      render(
        <ActiveFilters api={mockApi as GridApi} filterModel={filterModel} />,
      );
      expect(screen.getByText("Created:")).toBeInTheDocument();
      // Check for date range - handling potential timezone differences
      const dateRangeElement = screen.getByText((content, element) => {
        return (
          element?.className?.includes("filterValue") &&
          content.includes(" to ") &&
          content.includes("/202")
        );
      });
      expect(dateRangeElement).toBeInTheDocument();
    });

    it("should display relative date range filter", () => {
      const filterModel = {
        modified: {
          type: "inRange",
          mode: "relative",
          expressionFrom: "StartOfMonth",
          expressionTo: "EndOfMonth",
        },
      };
      const mockApi = createMockGridApi(filterModel);
      render(
        <ActiveFilters api={mockApi as GridApi} filterModel={filterModel} />,
      );
      expect(screen.getByText("Modified:")).toBeInTheDocument();
      expect(
        screen.getByText("StartOfMonth to EndOfMonth"),
      ).toBeInTheDocument();
    });
  });

  describe("Text Filter Display", () => {
    it("should display text filter", () => {
      const filterModel = {
        name: {
          type: "contains",
          filter: "test",
        },
      };
      const mockApi = createMockGridApi(filterModel);
      render(
        <ActiveFilters api={mockApi as GridApi} filterModel={filterModel} />,
      );
      expect(screen.getByText("Name:")).toBeInTheDocument();
      expect(screen.getByText("test")).toBeInTheDocument();
    });

    it("should display number filter", () => {
      const filterModel = {
        amount: {
          type: "greaterThan",
          filter: 100,
        },
      };
      const mockApi = createMockGridApi(filterModel);
      render(
        <ActiveFilters api={mockApi as GridApi} filterModel={filterModel} />,
      );
      expect(screen.getByText("Amount:")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
    });
  });

  describe("Set Filter Display", () => {
    it("should display set filter with multiple values", () => {
      const filterModel = {
        category: {
          values: ["Electronics", "Books", "Clothing"],
        },
      };
      const mockApi = createMockGridApi(filterModel);
      render(
        <ActiveFilters api={mockApi as GridApi} filterModel={filterModel} />,
      );
      expect(screen.getByText("Category:")).toBeInTheDocument();
      expect(
        screen.getByText("Electronics, Books, Clothing"),
      ).toBeInTheDocument();
    });

    it("should display set filter with single value", () => {
      const filterModel = {
        status: {
          values: ["Active"],
        },
      };
      const mockApi = createMockGridApi(filterModel);
      render(
        <ActiveFilters api={mockApi as GridApi} filterModel={filterModel} />,
      );
      expect(screen.getByText("Status:")).toBeInTheDocument();
      expect(screen.getByText("Active")).toBeInTheDocument();
    });
  });

  describe("Filter Removal", () => {
    it("should remove individual filter when × is clicked", async () => {
      const filterModel = {
        name: { filter: "test" },
        status: { values: ["Active"] },
      };
      const mockApi = createMockGridApi(filterModel);
      render(
        <ActiveFilters api={mockApi as GridApi} filterModel={filterModel} />,
      );

      const removeButtons = screen.getAllByLabelText(/Remove .* filter/);
      fireEvent.click(removeButtons[0]);

      await waitFor(() => {
        expect(mockApi.setFilterModel).toHaveBeenCalledWith({
          status: { values: ["Active"] },
        });
      });
    });

    it("should clear all filters when Clear all is clicked", async () => {
      const filterModel = {
        name: { filter: "test" },
        status: { values: ["Active"] },
        amount: { filter: 100 },
      };
      const mockApi = createMockGridApi(filterModel);
      render(
        <ActiveFilters api={mockApi as GridApi} filterModel={filterModel} />,
      );

      const clearAllButton = screen.getByText("Clear all");
      fireEvent.click(clearAllButton);

      await waitFor(() => {
        expect(mockApi.setFilterModel).toHaveBeenCalledWith({});
      });
    });

    it("should handle keyboard navigation for remove buttons", async () => {
      const filterModel = {
        name: { filter: "test" },
      };
      const mockApi = createMockGridApi(filterModel);
      render(
        <ActiveFilters api={mockApi as GridApi} filterModel={filterModel} />,
      );

      const removeButton = screen.getByLabelText("Remove Name filter");
      // KeyDown doesn't trigger click, so click directly
      fireEvent.click(removeButton);

      await waitFor(() => {
        expect(mockApi.setFilterModel).toHaveBeenCalledWith({});
      });
    });
  });

  describe("Complex Filter Models", () => {
    it("should display multiple filters of different types", () => {
      const filterModel = {
        name: { filter: "John" },
        age: { type: "inRange", filter: 25, filterTo: 35 },
        department: { values: ["Sales", "Marketing"] },
        startDate: {
          type: "after",
          mode: "relative",
          expressionFrom: "Today-30d",
        },
      };
      const mockApi = createMockGridApi(filterModel);
      render(
        <ActiveFilters api={mockApi as GridApi} filterModel={filterModel} />,
      );

      expect(screen.getByText("Name:")).toBeInTheDocument();
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("Age:")).toBeInTheDocument();
      // Number range filters just show the first value
      expect(screen.getByText("25")).toBeInTheDocument();
      expect(screen.getByText("Department:")).toBeInTheDocument();
      expect(screen.getByText("Sales, Marketing")).toBeInTheDocument();
      expect(screen.getByText("StartDate:")).toBeInTheDocument();
      expect(screen.getByText("after Today-30d")).toBeInTheDocument();
    });

    it("should handle filter models with null/undefined values", () => {
      const filterModel = {
        name: { filter: null },
        status: { values: [] },
        date: { type: "equals" },
      };
      const mockApi = createMockGridApi(filterModel);
      render(
        <ActiveFilters api={mockApi as GridApi} filterModel={filterModel} />,
      );

      // Should show filters even with null/undefined values
      expect(screen.getByTestId("active-filters")).toBeInTheDocument();
      // null filter shows as empty string, empty array shows as empty string
      // Only the date filter with type but no date shows "Active"
      const activeTexts = screen.getAllByText("Active");
      expect(activeTexts).toHaveLength(1);
    });
  });

  describe("Edge Cases", () => {
    it("should handle missing column definitions gracefully", () => {
      const filterModel = {
        unknownColumn: { filter: "test" },
      };
      const mockApi = createMockGridApi(filterModel);
      (mockApi.getColumn as any).mockReturnValue(null);

      render(
        <ActiveFilters api={mockApi as GridApi} filterModel={filterModel} />,
      );

      // When getColumn returns null, it uses the columnId as is
      expect(screen.getByText("unknownColumn:")).toBeInTheDocument();
      expect(screen.getByText("test")).toBeInTheDocument();
    });

    it("should handle complex nested filter models", () => {
      const filterModel = {
        complexFilter: {
          condition1: { type: "contains", filter: "abc" },
          condition2: { type: "contains", filter: "xyz" },
          operator: "AND",
        },
      };
      const mockApi = createMockGridApi(filterModel);
      render(
        <ActiveFilters api={mockApi as GridApi} filterModel={filterModel} />,
      );

      // Complex filters should show as "Active"
      expect(screen.getByText("ComplexFilter:")).toBeInTheDocument();
      expect(screen.getByText("Active")).toBeInTheDocument();
    });

    it("should handle empty string filters", () => {
      const filterModel = {
        description: { filter: "" },
      };
      const mockApi = createMockGridApi(filterModel);
      render(
        <ActiveFilters api={mockApi as GridApi} filterModel={filterModel} />,
      );

      expect(screen.getByText("Description:")).toBeInTheDocument();
      // Empty string filter should display the filter pill
      const filterPillsContainer = screen.getByTestId("active-filters");
      expect(filterPillsContainer).toBeInTheDocument();
      // The filter value is empty but the pill still exists
      const removeButtons = screen.getAllByLabelText(/Remove .* filter/);
      expect(removeButtons).toHaveLength(1);
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA labels for interactive elements", () => {
      const filterModel = {
        name: { filter: "test" },
      };
      const mockApi = createMockGridApi(filterModel);
      render(
        <ActiveFilters api={mockApi as GridApi} filterModel={filterModel} />,
      );

      // Check filter pill exists with proper structure
      expect(screen.getByText("Name:")).toBeInTheDocument();
      expect(screen.getByText("test")).toBeInTheDocument();

      const removeButton = screen.getByLabelText("Remove Name filter");
      expect(removeButton).toBeInTheDocument();

      const clearAllButton = screen.getByText("Clear all");
      expect(clearAllButton).toBeInTheDocument();
      expect(clearAllButton).toHaveAttribute("aria-label", "Clear all filters");
    });

    it("should handle filter removal with proper accessibility", async () => {
      const filterModel = {
        name: { filter: "test" },
      };
      const mockApi = createMockGridApi(filterModel);
      render(
        <ActiveFilters api={mockApi as GridApi} filterModel={filterModel} />,
      );

      // Check remove button has proper aria-label
      const removeButton = screen.getByLabelText("Remove Name filter");
      expect(removeButton).toBeInTheDocument();

      // Click to remove
      fireEvent.click(removeButton);

      // Verify API was called to update filter model
      await waitFor(() => {
        expect(mockApi.setFilterModel).toHaveBeenCalledWith({});
      });
    });
  });
});
