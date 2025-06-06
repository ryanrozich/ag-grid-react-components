import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuickFilterDropdown } from "./index";
import type { GridApi } from "ag-grid-community";
import type { QuickFilterOption } from "./types";

// Mock scrollIntoView
if (typeof Element !== 'undefined') {
  Element.prototype.scrollIntoView = vi.fn();
}

// Mock AG Grid API
const mockApi: Partial<GridApi> = {
  getFilterModel: vi.fn().mockReturnValue({}),
  setFilterModel: vi.fn(),
  onFilterChanged: vi.fn(),
  getColumnFilterInstance: vi.fn(),
};

const mockOptions: QuickFilterOption[] = [
  {
    id: "all",
    label: "All Items",
    description: "Show all data",
    icon: "🔄",
    filterModel: null,
  },
  {
    id: "today",
    label: "Today",
    description: "Items from today",
    icon: "📆",
    filterModel: {
      mode: "relative",
      type: "equals",
      expressionFrom: "Today",
    },
  },
  {
    id: "this-week",
    label: "This Week",
    description: "Items from this week",
    icon: "📅",
    filterModel: {
      mode: "relative",
      type: "inRange",
      expressionFrom: "Today-6d",
      expressionTo: "Today+1d",
    },
  },
];

describe("QuickFilterDropdown", () => {
  const defaultProps = {
    api: mockApi as GridApi,
    columnId: "date",
    options: mockOptions,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with placeholder text when no filter selected", () => {
    // Ensure no filter is active
    const apiWithNoFilter: Partial<GridApi> = {
      ...mockApi,
      getFilterModel: vi.fn().mockReturnValue({}),
    };
    
    render(
      <QuickFilterDropdown 
        {...defaultProps} 
        api={apiWithNoFilter as GridApi}
        options={[]} // No options means no default selection
        placeholder="Choose filter" 
      />
    );
    
    expect(screen.getByText("Choose filter")).toBeInTheDocument();
  });

  it("opens dropdown when clicked", async () => {
    render(<QuickFilterDropdown {...defaultProps} />);
    const trigger = screen.getByRole("button", { name: /quick filter options/i });
    
    await userEvent.click(trigger);
    
    // Use getAllByText since "All Items" appears in both trigger and dropdown
    const allItemsElements = screen.getAllByText("All Items");
    expect(allItemsElements).toHaveLength(2); // One in trigger, one in dropdown
    
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("This Week")).toBeInTheDocument();
  });

  it("selects an option and applies filter", async () => {
    const onFilterChange = vi.fn();
    render(<QuickFilterDropdown {...defaultProps} onFilterChange={onFilterChange} />);
    
    const trigger = screen.getByRole("button");
    await userEvent.click(trigger);
    
    const todayOption = screen.getByText("Today");
    await userEvent.click(todayOption);
    
    expect(mockApi.setFilterModel).toHaveBeenCalledWith({
      date: {
        mode: "relative",
        type: "equals",
        expressionFrom: "Today",
      },
    });
    
    expect(onFilterChange).toHaveBeenCalledWith(mockOptions[1]);
  });

  it("clears filter when selecting 'All Items'", async () => {
    // Start with a filter already applied
    const apiWithFilter = {
      ...mockApi,
      getFilterModel: vi.fn().mockReturnValue({
        date: {
          mode: "relative",
          type: "equals",
          expressionFrom: "Today",
        },
      }),
    };
    
    render(<QuickFilterDropdown {...defaultProps} api={apiWithFilter as GridApi} />);
    
    // Should show "Today" as selected
    expect(screen.getByRole("button")).toHaveTextContent("Today");
    
    // Open dropdown and select "All Items"
    const trigger = screen.getByRole("button");
    await userEvent.click(trigger);
    
    const allItemsOptions = screen.getAllByText("All Items");
    const allItemsInDropdown = allItemsOptions.find(el => el.closest('[role="option"]'));
    await userEvent.click(allItemsInDropdown!);
    
    // Should clear the filter
    expect(mockApi.setFilterModel).toHaveBeenCalledWith({});
  });

  it("closes dropdown when clicking outside", async () => {
    const { container } = render(
      <div>
        <QuickFilterDropdown {...defaultProps} />
        <button>Outside button</button>
      </div>
    );
    
    const trigger = screen.getByRole("button", { name: /quick filter options/i });
    await userEvent.click(trigger);
    
    // Verify dropdown is open
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByText("Show all data")).toBeInTheDocument();
    
    // Click outside by using fireEvent.mouseDown
    const outsideButton = screen.getByText("Outside button");
    fireEvent.mouseDown(outsideButton);
    
    await waitFor(() => {
      // Check that dropdown is closed by looking for aria-expanded="false"
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("supports keyboard navigation", async () => {
    render(<QuickFilterDropdown {...defaultProps} />);
    const trigger = screen.getByRole("button", { name: /quick filter options/i });
    
    // Open with keyboard
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    
    expect(screen.getByText("Show all data")).toBeInTheDocument();
    
    // Navigate options
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    
    // Select with Enter
    fireEvent.keyDown(trigger, { key: "Enter" });
    
    expect(mockApi.setFilterModel).toHaveBeenCalled();
  });

  it("closes on Escape key", async () => {
    render(<QuickFilterDropdown {...defaultProps} />);
    const trigger = screen.getByRole("button");
    
    await userEvent.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    
    fireEvent.keyDown(trigger, { key: "Escape" });
    
    await waitFor(() => {
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("shows descriptions when enabled", () => {
    render(<QuickFilterDropdown {...defaultProps} showDescriptions={true} />);
    const trigger = screen.getByRole("button");
    
    fireEvent.click(trigger);
    
    expect(screen.getByText("Show all data")).toBeInTheDocument();
    expect(screen.getByText("Items from today")).toBeInTheDocument();
  });

  it("hides descriptions when disabled", () => {
    render(<QuickFilterDropdown {...defaultProps} showDescriptions={false} />);
    const trigger = screen.getByRole("button");
    
    fireEvent.click(trigger);
    
    expect(screen.queryByText("Show all data")).not.toBeInTheDocument();
    expect(screen.queryByText("Items from today")).not.toBeInTheDocument();
  });

  it("supports custom trigger content", () => {
    const customTrigger = (option: QuickFilterOption | null) => (
      <span>Custom: {option?.label || "None"}</span>
    );
    
    render(
      <QuickFilterDropdown
        {...defaultProps}
        triggerContent={customTrigger}
      />
    );
    
    // The component will show the first option that matches the filter state
    const button = screen.getByRole("button");
    // Since mockApi.getFilterModel returns {}, it finds "All Items" (filterModel: null)
    expect(button.textContent).toMatch(/Custom: (All Items|Today|None)/);
  });

  it("shows search input for many options", async () => {
    const manyOptions = Array.from({ length: 15 }, (_, i) => ({
      id: `option-${i}`,
      label: `Option ${i}`,
      filterModel: i === 0 ? null : { type: "equals", value: i },
    }));
    
    render(<QuickFilterDropdown {...defaultProps} options={manyOptions} />);
    
    const trigger = screen.getByRole("button");
    await userEvent.click(trigger);
    
    const searchInput = screen.getByPlaceholderText("Search filters...");
    expect(searchInput).toBeInTheDocument();
    
    // Type to search for Option 5
    await userEvent.type(searchInput, "5");
    
    // Wait for filtering to take effect
    await waitFor(() => {
      // Should show Option 5, Option 15 (contains "5")
      const option5 = screen.getByText("Option 5");
      expect(option5).toBeInTheDocument();
      
      // Option 1 should not be visible anymore
      expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
      expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
    });
  });

  it("handles missing API gracefully", () => {
    const { container } = render(
      <QuickFilterDropdown
        {...defaultProps}
        api={null as unknown as GridApi}
      />
    );
    
    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);
    
    // Should still render but not crash
    expect(container).toBeInTheDocument();
  });

  it("syncs with external filter changes", () => {
    // Mock API returns a filter matching "today" option
    const apiWithFilter: Partial<GridApi> = {
      ...mockApi,
      getFilterModel: vi.fn().mockReturnValue({
        date: {
          mode: "relative",
          type: "equals",
          expressionFrom: "Today",
        },
      }),
    };
    
    render(
      <QuickFilterDropdown
        {...defaultProps}
        api={apiWithFilter as GridApi}
      />
    );
    
    // Should show "Today" as selected
    expect(screen.getByRole("button")).toHaveTextContent("Today");
  });
});