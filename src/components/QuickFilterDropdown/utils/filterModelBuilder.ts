import type { GridApi } from "ag-grid-community";
import type { QuickFilterOption } from "../types";

/**
 * Builds and applies a filter model to the grid
 */
export async function applyQuickFilter(
  api: GridApi,
  columnId: string,
  option: QuickFilterOption | null,
): Promise<void> {
  if (!api || !columnId) {
    console.warn("[QuickFilter] Missing api or columnId", {
      api: !!api,
      columnId,
    });
    return;
  }

  console.log("[QuickFilter] Applying filter:", {
    option: option?.label,
    columnId,
    filterModel: option?.filterModel,
  });

  // Get current filter model
  const currentModel = api.getFilterModel() || {};
  console.log("[QuickFilter] Current grid filter model:", currentModel);

  if (!option) {
    // Clear the filter for this column
    console.log("[QuickFilter] Clearing filter for column:", columnId);
    delete currentModel[columnId];
  } else if (option.buildFilterModel) {
    // Use custom filter builder if provided
    const filterModel = option.buildFilterModel(api, columnId);
    if (filterModel) {
      // If the filter model contains multiple columns, apply all of them
      Object.assign(currentModel, filterModel);
    } else {
      delete currentModel[columnId];
    }
  } else if (option.filterModel) {
    // Use the provided filter model
    console.log(
      "[QuickFilter] Setting filter model for column",
      columnId,
      ":",
      option.filterModel,
    );
    currentModel[columnId] = option.filterModel;
  } else {
    // Clear filter if no model provided
    delete currentModel[columnId];
  }

  console.log("[QuickFilter] Final filter model to apply:", currentModel);

  // Apply the updated filter model
  api.setFilterModel(currentModel);

  console.log(
    "[QuickFilter] Filter model applied. Checking what was actually set:",
  );

  // Verify the filter was applied
  const actualModel = api.getFilterModel();
  console.log("[QuickFilter] Actual filter model after setting:", actualModel);

  // Force the grid to re-evaluate which rows pass the filter
  api.onFilterChanged();

  // Add a small delay to ensure the filter model propagates
  setTimeout(async () => {
    try {
      const filterInstance = await api.getColumnFilterInstance(columnId);
      console.log(
        "[QuickFilter] Got filter instance after delay:",
        filterInstance,
      );

      // Check if it's our custom DateFilter
      if (filterInstance) {
        const model = api.getFilterModel();
        console.log(
          "[QuickFilter] Re-checking filter model after delay:",
          model,
        );

        // Get displayed row count to verify filtering
        const displayedRowCount = api.getDisplayedRowCount();
        console.log(
          "[QuickFilter] Displayed row count after filtering:",
          displayedRowCount,
        );
      }
    } catch (error) {
      console.error("[QuickFilter] Error checking filter instance:", error);
    }
  }, 100);
}

/**
 * Gets the currently active filter option based on the grid's filter state
 */
export function getActiveFilterOption(
  api: GridApi,
  columnId: string,
  options: QuickFilterOption[],
): QuickFilterOption | null {
  if (!api || !columnId) {
    return null;
  }

  const filterModel = api.getFilterModel();
  const columnFilter = filterModel?.[columnId];

  if (!columnFilter) {
    // Check if any option represents "no filter"
    return options.find((opt) => opt.filterModel === null) || null;
  }

  // Try to find matching option by comparing filter models
  return (
    options.find((option) => {
      if (option.buildFilterModel) {
        // For dynamic filters, we can't easily compare
        return false;
      }
      return (
        JSON.stringify(option.filterModel) === JSON.stringify(columnFilter)
      );
    }) || null
  );
}

/**
 * Common date filter presets for AG Grid
 */
export const DATE_FILTER_PRESETS: QuickFilterOption[] = [
  {
    id: "all",
    label: "All Dates",
    description: "Show all items",
    icon: "📅",
    filterModel: null,
  },
  {
    id: "today",
    label: "Today",
    description: "Items with today's date",
    icon: "📆",
    filterModel: {
      mode: "relative",
      type: "equals",
      expressionFrom: "Today",
    },
  },
  {
    id: "yesterday",
    label: "Yesterday",
    description: "Items from yesterday",
    icon: "📆",
    filterModel: {
      mode: "relative",
      type: "equals",
      expressionFrom: "Today-1d",
    },
  },
  {
    id: "this-week",
    label: "This Week",
    description: "Items from the current week",
    icon: "📅",
    filterModel: {
      mode: "relative",
      type: "inRange",
      expressionFrom: "Today-6d",
      expressionTo: "Today+1d",
    },
  },
  {
    id: "last-week",
    label: "Last Week",
    description: "Items from the previous week",
    icon: "📅",
    filterModel: {
      mode: "relative",
      type: "inRange",
      expressionFrom: "Today-13d",
      expressionTo: "Today-6d",
    },
  },
  {
    id: "this-month",
    label: "This Month",
    description: "Items from the current month",
    icon: "📅",
    filterModel: {
      mode: "relative",
      type: "inRange",
      expressionFrom: "StartOfMonth",
      expressionTo: "EndOfMonth",
    },
  },
  {
    id: "last-month",
    label: "Last Month",
    description: "Items from the previous month",
    icon: "📅",
    filterModel: {
      mode: "relative",
      type: "inRange",
      expressionFrom: "StartOfMonth-1M",
      expressionTo: "EndOfMonth-1M",
    },
  },
  {
    id: "last-7-days",
    label: "Last 7 Days",
    description: "Items from the past week",
    icon: "7️⃣",
    filterModel: {
      mode: "relative",
      type: "inRange",
      expressionFrom: "Today-7d",
      expressionTo: "Today",
    },
  },
  {
    id: "last-30-days",
    label: "Last 30 Days",
    description: "Items from the past month",
    icon: "📅",
    filterModel: {
      mode: "relative",
      type: "inRange",
      expressionFrom: "Today-30d",
      expressionTo: "Today",
    },
  },
  {
    id: "future",
    label: "Future",
    description: "Items with future dates",
    icon: "🔮",
    filterModel: {
      mode: "relative",
      type: "after",
      expressionFrom: "Today",
    },
  },
  {
    id: "past",
    label: "Past",
    description: "Items with past dates",
    icon: "🕐",
    filterModel: {
      mode: "relative",
      type: "before",
      expressionFrom: "Today",
    },
  },
];

/**
 * Creates a filter option for clearing filters
 */
export function createClearFilterOption(): QuickFilterOption {
  return {
    id: "clear",
    label: "Clear Filter",
    description: "Remove all filters",
    icon: "🚫",
    filterModel: null,
  };
}
