import type { GridApi } from "ag-grid-community";
import type {
  ViewDropdownLoader,
  SavedViewOption,
} from "../components/QuickFilterDropdown/loaders/types";

export type ResetType = "default-view" | "factory";

export interface ResetGridOptions {
  /** AG Grid API instance */
  api: GridApi;
  /** ID of the default saved view (if any) */
  defaultViewId?: string;
  /** View loader instance for accessing saved views */
  loader?: ViewDropdownLoader;
}

/**
 * Applies a saved view to the grid
 */
export const applyGridView = (api: GridApi, view: SavedViewOption): void => {
  // Apply filters
  if (view.filterModel !== undefined) {
    api.setFilterModel(view.filterModel);
  }

  // Apply full grid state if available
  if (view.saveType === "full-view" && view.gridState) {
    // Apply column state
    if (view.gridState.columnState) {
      api.applyColumnState({
        state: view.gridState.columnState as any[],
        applyOrder: true,
      });
    }

    // Apply sort model
    if (view.gridState.sortModel && "applySortModel" in api) {
      (api as any).applySortModel(view.gridState.sortModel);
    }

    // Apply grouping state
    if (view.gridState.groupState && "setColumnGroupState" in api) {
      (api as any).setColumnGroupState(view.gridState.groupState);
    }

    // Apply any other custom state
    if (view.gridState.pivotMode !== undefined && "setPivotMode" in api) {
      (api as any).setPivotMode(view.gridState.pivotMode);
    }
  }
};

/**
 * Resets the grid to factory defaults
 */
export const resetGridToFactory = (api: GridApi): void => {
  // Clear all filters
  api.setFilterModel(null);

  // Reset column state to original
  api.resetColumnState();

  // Clear sorting
  if ("removeSortModel" in api) {
    (api as any).removeSortModel();
  } else if ("setSortModel" in api) {
    (api as any).setSortModel(null);
  }

  // Clear row grouping
  if ("setRowGroupColumns" in api) {
    (api as any).setRowGroupColumns([]);
  }

  // Clear pivot
  if ("setPivotColumns" in api) {
    (api as any).setPivotColumns([]);
  }

  // Turn off pivot mode
  if ("setPivotMode" in api) {
    (api as any).setPivotMode(false);
  }

  // Reset column visibility to defaults
  const allColumns = api.getColumns();
  if (allColumns) {
    api.setColumnsVisible(
      allColumns.map((col) => col.getColId()),
      true,
    );
  }

  // Clear any advanced filter
  if ("setAdvancedFilterModel" in api) {
    (api as any).setAdvancedFilterModel(null);
  }

  // Ensure grid redraws
  api.refreshCells({ force: true });

  // Re-size columns to fit
  api.sizeColumnsToFit();
};

/**
 * Resets the grid to either the default saved view or factory defaults
 * @returns The type of reset that was performed
 */
export const resetGrid = async (
  options: ResetGridOptions,
): Promise<ResetType> => {
  const { api, defaultViewId, loader } = options;

  // Try to apply default saved view first
  if (defaultViewId && loader) {
    try {
      const views = await loader.loadOptions();
      const defaultView = views.find((v) => v.id === defaultViewId);

      if (defaultView) {
        applyGridView(api, defaultView);
        return "default-view";
      }
    } catch (error) {
      console.error(
        "Error loading default view, falling back to factory reset:",
        error,
      );
    }
  }

  // Fall back to factory reset
  resetGridToFactory(api);
  return "factory";
};
