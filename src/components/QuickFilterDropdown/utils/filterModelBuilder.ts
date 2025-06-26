import type { GridApi, FilterModel } from "ag-grid-community";
import type { QuickFilterOption } from "../types";
import { applyFilterModelWithWorkaround } from "./agGridWorkaround";

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
    if (columnId === "_multi") {
      // For multi-column filters, we need to clear all affected columns
      // This is a simplified approach - in production you might track which columns
      api.setFilterModel({});
      return;
    } else {
      delete currentModel[columnId];
    }
  } else if (option.buildFilterModel) {
    // Use custom filter builder if provided
    const filterModel = option.buildFilterModel(api, columnId);
    if (filterModel) {
      // If clearing multi-column filter first
      if (columnId === "_multi") {
        // Clear columns that might be affected by multi-column filters
        Object.keys(currentModel).forEach((key) => {
          if (key === "category" || key === "priority" || key === "status") {
            delete currentModel[key];
          }
        });
      }
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

  // Use workaround for AG Grid bug where setModel is not called on custom filters
  if (option && option.filterModel && columnId && columnId !== "_multi") {
    console.log("[QuickFilter] Applying workaround for column:", columnId);
    // The workaround will call setFilterModel internally and properly set up the filter
    await applyFilterModelWithWorkaround(api, columnId, option.filterModel);
  } else {
    // For clearing filters or multi-column filters, use standard approach
    api.setFilterModel(currentModel);

    // For multi-column filters with buildFilterModel, apply workaround to each column
    if (option && option.buildFilterModel && columnId === "_multi") {
      const filterModel = option.buildFilterModel(api, columnId);
      if (filterModel) {
        // Apply workaround for each column in the filter model
        for (const [colId, colFilter] of Object.entries(filterModel)) {
          if (colId === "dueDate" && colFilter) {
            console.log(
              "[QuickFilter] Applying workaround for multi-column filter:",
              colId,
            );
            await applyFilterModelWithWorkaround(
              api,
              colId,
              colFilter as FilterModel,
            );
          }
        }
      }
    }

    api.onFilterChanged();
  }

  // Verify the result after a small delay
  setTimeout(() => {
    const actualModel = api.getFilterModel();
    console.log("[QuickFilter] Filter model after applying:", actualModel);

    const displayedRowCount = api.getDisplayedRowCount();
    console.log("[QuickFilter] Displayed row count:", displayedRowCount);
  }, 500);
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
