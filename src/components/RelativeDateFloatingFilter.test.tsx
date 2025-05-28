import { expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import RelativeDateFloatingFilter from "./RelativeDateFloatingFilter";

// Mock the AG Grid React hook
vi.mock("ag-grid-react", () => ({
  useGridFloatingFilter: vi.fn(),
}));

describe("RelativeDateFloatingFilter", () => {
  const defaultProps = {
    column: { getColId: () => "date" },
    api: { addEventListener: vi.fn() },
    filterParams: {},
    currentParentModel: null,
    parentFilterInstance: () => null,
    showParentFilter: vi.fn(),
    context: {},
  } as any;

  it('should render with "No filter" text when no model is provided', async () => {
    render(<RelativeDateFloatingFilter {...defaultProps} />);
    
    await waitFor(() => {
      expect(screen.getByText("No filter")).toBeInTheDocument();
    });
  });

  it("should display filter indicator when model is provided", async () => {
    const propsWithModel = {
      ...defaultProps,
      currentParentModel: {
        type: "equals",
        mode: "absolute",
        dateFrom: new Date("2023-01-15"),
        dateTo: null,
      },
    };

    render(<RelativeDateFloatingFilter {...propsWithModel} />);
    
    await waitFor(() => {
      // Check that component renders with correct data-test-id
      const filterElement = screen.getByTestId("relative-date-floating-filter");
      expect(filterElement).toBeInTheDocument();
      // Should show the formatted date instead of "No filter"
      expect(screen.queryByText("No filter")).not.toBeInTheDocument();
      // Should show the filter indicator (check the actual rendered date)
      expect(screen.getByText("= 2023-01-15")).toBeInTheDocument();
    });
  });
});
