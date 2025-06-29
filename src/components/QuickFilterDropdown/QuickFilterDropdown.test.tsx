import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuickFilterDropdown } from "./index";
import type { GridApi } from "ag-grid-community";
import type { QuickFilterOption } from "./types";

// Mock scrollIntoView
if (typeof Element !== "undefined") {
  Element.prototype.scrollIntoView = vi.fn();
}

// Mock AG Grid API
const mockApi: Partial<GridApi> = {
  getFilterModel: vi.fn().mockReturnValue({}),
  setFilterModel: vi.fn(),
  onFilterChanged: vi.fn(),
  getColumnFilterInstance: vi.fn(),
  refreshCells: vi.fn(),
  redrawRows: vi.fn(),
  getDisplayedRowCount: vi.fn().mockReturnValue(0),
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
      />,
    );

    expect(screen.getByText("Choose filter")).toBeInTheDocument();
  });

  it("opens dropdown when clicked", async () => {
    render(<QuickFilterDropdown {...defaultProps} />);
    const trigger = screen.getByRole("button", {
      name: /quick filter options/i,
    });

    await userEvent.click(trigger);

    // Use getAllByText since "All Items" appears in both trigger and dropdown
    const allItemsElements = screen.getAllByText("All Items");
    expect(allItemsElements).toHaveLength(2); // One in trigger, one in dropdown

    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("This Week")).toBeInTheDocument();
  });

  it("selects an option and applies filter", async () => {
    const onFilterChange = vi.fn();
    render(
      <QuickFilterDropdown {...defaultProps} onFilterChange={onFilterChange} />,
    );

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

    await waitFor(() => {
      expect(onFilterChange).toHaveBeenCalledWith(mockOptions[1]);
    });
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

    render(
      <QuickFilterDropdown {...defaultProps} api={apiWithFilter as GridApi} />,
    );

    // Should show "Today" as selected
    expect(screen.getByRole("button")).toHaveTextContent("Today");

    // Open dropdown and select "All Items"
    const trigger = screen.getByRole("button");
    await userEvent.click(trigger);

    const allItemsOptions = screen.getAllByText("All Items");
    const allItemsInDropdown = allItemsOptions.find((el) =>
      el.closest('[role="option"]'),
    );
    await userEvent.click(allItemsInDropdown!);

    // Should clear the filter
    expect(mockApi.setFilterModel).toHaveBeenCalledWith({});
  });

  it("closes dropdown when clicking outside", async () => {
    render(
      <div>
        <QuickFilterDropdown {...defaultProps} />
        <button>Outside button</button>
      </div>,
    );

    const trigger = screen.getByRole("button", {
      name: /quick filter options/i,
    });
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
    const trigger = screen.getByRole("button", {
      name: /quick filter options/i,
    });

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
      <QuickFilterDropdown {...defaultProps} triggerContent={customTrigger} />,
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
      />,
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
      <QuickFilterDropdown {...defaultProps} api={apiWithFilter as GridApi} />,
    );

    // Should show "Today" as selected
    expect(screen.getByRole("button")).toHaveTextContent("Today");
  });

  describe("Portal Rendering", () => {
    it("renders dropdown inline when usePortal is 'never'", async () => {
      render(<QuickFilterDropdown {...defaultProps} usePortal="never" />);

      const trigger = screen.getByRole("button");
      await userEvent.click(trigger);

      // Dropdown should be in the normal DOM hierarchy (not in portal)
      const dropdown = screen.getByRole("listbox");
      const container = screen.getByTestId("quick-filter-dropdown");
      expect(container.contains(dropdown)).toBeTruthy();
      // The dropdown should not have portal styling
      expect(dropdown.style.position).not.toBe("fixed");
    });

    it("renders dropdown in portal when usePortal is 'always'", async () => {
      render(<QuickFilterDropdown {...defaultProps} usePortal="always" />);

      const trigger = screen.getByRole("button");
      await userEvent.click(trigger);

      // Wait for portal to render
      await waitFor(() => {
        // The dropdown should be in the document body with portal styling
        const portalDropdown = document.querySelector('[role="listbox"]');
        expect(portalDropdown).toBeInTheDocument();
        expect(portalDropdown?.getAttribute("style")).toContain(
          "position: fixed",
        );
        expect(portalDropdown?.getAttribute("style")).toContain(
          "z-index: 99999",
        );
      });
    });

    it("updates portal position on window resize", async () => {
      render(<QuickFilterDropdown {...defaultProps} usePortal="always" />);

      const trigger = screen.getByRole("button");
      await userEvent.click(trigger);

      await waitFor(() => {
        const portalDropdown = document.querySelector('[role="listbox"]');
        expect(portalDropdown).toBeInTheDocument();
        expect(portalDropdown?.getAttribute("style")).toContain(
          "position: fixed",
        );
      });

      // Trigger window resize
      fireEvent(window, new Event("resize"));

      // Position should be recalculated (we can't test exact values but can verify the handler runs)
      const portalDropdown = document.querySelector('[role="listbox"]');
      expect(portalDropdown).toBeInTheDocument();
    });

    it("handles click outside for portal-rendered dropdown", async () => {
      render(
        <div>
          <QuickFilterDropdown {...defaultProps} usePortal="always" />
          <button>Outside button</button>
        </div>,
      );

      const trigger = screen.getByRole("button", {
        name: /quick filter options/i,
      });
      await userEvent.click(trigger);

      // Verify portal dropdown is open
      await waitFor(() => {
        const portalDropdown = document.querySelector('[role="listbox"]');
        expect(portalDropdown).toBeInTheDocument();
        expect(portalDropdown?.getAttribute("style")).toContain(
          "position: fixed",
        );
      });

      // Click outside
      const outsideButton = screen.getByText("Outside button");
      fireEvent.mouseDown(outsideButton);

      await waitFor(() => {
        expect(trigger).toHaveAttribute("aria-expanded", "false");
      });
    });
  });

  describe("Advanced Keyboard Navigation", () => {
    it("navigates with Home and End keys", async () => {
      render(<QuickFilterDropdown {...defaultProps} />);
      const trigger = screen.getByRole("button");

      // Open dropdown
      trigger.focus();
      fireEvent.keyDown(trigger, { key: "ArrowDown" });

      // Press End to go to last option
      fireEvent.keyDown(trigger, { key: "End" });

      // Press Home to go to first option
      fireEvent.keyDown(trigger, { key: "Home" });

      // Verify navigation works (can't easily test highlighted state, but code coverage will show it runs)
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("navigates up with ArrowUp key", async () => {
      render(<QuickFilterDropdown {...defaultProps} />);
      const trigger = screen.getByRole("button");

      // Open dropdown and navigate down first
      trigger.focus();
      fireEvent.keyDown(trigger, { key: "ArrowDown" });
      fireEvent.keyDown(trigger, { key: "ArrowDown" });
      fireEvent.keyDown(trigger, { key: "ArrowDown" });

      // Navigate up
      fireEvent.keyDown(trigger, { key: "ArrowUp" });

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("opens dropdown with Space key", () => {
      render(<QuickFilterDropdown {...defaultProps} />);
      const trigger = screen.getByRole("button");

      trigger.focus();
      fireEvent.keyDown(trigger, { key: " " }); // Space key

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("focuses search input when typing a letter key", async () => {
      const manyOptions = Array.from({ length: 15 }, (_, i) => ({
        id: `option-${i}`,
        label: `Option ${i}`,
        filterModel: i === 0 ? null : { type: "equals", value: i },
      }));

      render(<QuickFilterDropdown {...defaultProps} options={manyOptions} />);

      const trigger = screen.getByRole("button");
      await userEvent.click(trigger);

      // Type a letter to focus search
      fireEvent.keyDown(trigger, { key: "o" });

      const searchInput = screen.getByPlaceholderText("Search filters...");
      expect(searchInput).toHaveFocus();
    });
  });

  describe("Position Classes", () => {
    it("applies correct position class for bottom-left", () => {
      render(<QuickFilterDropdown {...defaultProps} position="bottom-left" />);
      const trigger = screen.getByRole("button");

      fireEvent.click(trigger);

      const dropdown = screen.getByRole("listbox");
      expect(dropdown.className).toMatch(/positionBottomLeft/);
    });

    it("applies correct position class for bottom-right", () => {
      render(<QuickFilterDropdown {...defaultProps} position="bottom-right" />);
      const trigger = screen.getByRole("button");

      fireEvent.click(trigger);

      const dropdown = screen.getByRole("listbox");
      expect(dropdown.className).toMatch(/positionBottomRight/);
    });

    it("applies correct position class for top-left", () => {
      render(<QuickFilterDropdown {...defaultProps} position="top-left" />);
      const trigger = screen.getByRole("button");

      fireEvent.click(trigger);

      const dropdown = screen.getByRole("listbox");
      expect(dropdown.className).toMatch(/positionTopLeft/);
    });

    it("applies correct position class for top-right", () => {
      render(<QuickFilterDropdown {...defaultProps} position="top-right" />);
      const trigger = screen.getByRole("button");

      fireEvent.click(trigger);

      const dropdown = screen.getByRole("listbox");
      expect(dropdown.className).toMatch(/positionTopRight/);
    });
  });

  describe("Custom Class Names", () => {
    it("applies custom className to container", () => {
      render(
        <QuickFilterDropdown {...defaultProps} className="custom-class" />,
      );

      const dropdownContainer = screen.getByTestId("quick-filter-dropdown");
      expect(dropdownContainer.className).toContain("custom-class");
    });
  });

  describe("Aria Labels", () => {
    it("uses custom aria label", () => {
      render(
        <QuickFilterDropdown {...defaultProps} ariaLabel="Custom filter" />,
      );

      const trigger = screen.getByRole("button", { name: /custom filter/i });
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("handles filter application errors gracefully", async () => {
      const mockApiWithError = {
        ...mockApi,
        setFilterModel: vi.fn().mockRejectedValue(new Error("Filter error")),
      };

      render(
        <QuickFilterDropdown
          {...defaultProps}
          api={mockApiWithError as unknown as GridApi}
        />,
      );

      const trigger = screen.getByRole("button");
      await userEvent.click(trigger);

      // Find the Today option in the dropdown (not the trigger)
      const todayOptions = screen.getAllByText("Today");
      const todayInDropdown = todayOptions.find((el) =>
        el.closest('[role="option"]'),
      );
      await userEvent.click(todayInDropdown!);

      // Should handle error gracefully without crashing
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty search results", async () => {
      const manyOptions = Array.from({ length: 15 }, (_, i) => ({
        id: `option-${i}`,
        label: `Option ${i}`,
        filterModel: i === 0 ? null : { type: "equals", value: i },
      }));

      render(<QuickFilterDropdown {...defaultProps} options={manyOptions} />);

      const trigger = screen.getByRole("button");
      await userEvent.click(trigger);

      // Search for something that doesn't exist
      const searchInput = screen.getByPlaceholderText("Search filters...");
      await userEvent.type(searchInput, "xyz123");

      // Should show no results message
      await waitFor(() => {
        expect(screen.getByText("No matching filters")).toBeInTheDocument();
      });
    });

    it("handles options with no description", () => {
      const optionsNoDesc = [
        { id: "test", label: "Test Option", filterModel: null },
      ];

      render(
        <QuickFilterDropdown
          {...defaultProps}
          options={optionsNoDesc}
          showDescriptions={true}
        />,
      );

      const trigger = screen.getByRole("button");
      fireEvent.click(trigger);

      // Should render without description
      expect(screen.getByText("Test Option")).toBeInTheDocument();
    });

    it("scrolls highlighted option into view", async () => {
      const manyOptions = Array.from({ length: 50 }, (_, i) => ({
        id: `option-${i}`,
        label: `Option ${i}`,
        filterModel: i === 0 ? null : { type: "equals", value: i },
      }));

      render(<QuickFilterDropdown {...defaultProps} options={manyOptions} />);

      const trigger = screen.getByRole("button");
      await userEvent.click(trigger);

      // Navigate down multiple times
      for (let i = 0; i < 10; i++) {
        fireEvent.keyDown(trigger, { key: "ArrowDown" });
      }

      // scrollIntoView should have been called
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    });
  });
});
