/**
 * AG Grid Test Utilities
 *
 * These utilities help with testing AG Grid components by providing
 * easy access to the grid's API and common test operations.
 */

import type { GridApi, IRowNode, FilterModel } from "ag-grid-community";
import type { Page } from "@playwright/test";

interface GridTestData {
  api: GridApi;
}

declare global {
  interface Window {
    __AG_GRID_TEST__: Record<string, GridTestData>;
  }
}

/**
 * Gets the grid API for a specific grid ID
 */
export const getGridApi = (gridId: string) => {
  const grid = window.__AG_GRID_TEST__?.[gridId];
  if (!grid) {
    throw new Error(
      `Grid with ID "${gridId}" not found. Make sure AGGridTestHarness is properly set up.`,
    );
  }
  return grid.api;
};

/**
 * Gets all row data from the grid
 */
export const getRowData = <TData = unknown>(gridId: string): TData[] => {
  const api = getGridApi(gridId);
  const rowData: TData[] = [];
  api.forEachNode((node: IRowNode<TData>) => {
    if (node.data) {
      rowData.push(node.data);
    }
  });
  return rowData;
};

/**
 * Gets the current filter model from the grid
 */
export const getFilterModel = (gridId: string): FilterModel | null => {
  const api = getGridApi(gridId);
  return api.getFilterModel();
};

/**
 * Applies a date filter to a specific column
 */
export const applyDateFilter = async (
  page: Page,
  _gridId: string, // Kept for backward compatibility, not used
  columnId: string,
  filterType: string,
  dateFrom: string,
  dateTo?: string,
): Promise<void> => {
  // Open the filter menu
  const columnHeader = page.locator(`[col-id="${columnId}"] .ag-header-cell`);
  await columnHeader.hover();
  await columnHeader.locator(".ag-header-cell-menu-button").click();

  // Wait for the filter to be visible
  await page.waitForSelector(".ag-filter-wrapper");

  // Set the filter type if needed
  const filterSelect = page.locator(".ag-filter-select");
  if (await filterSelect.isVisible()) {
    await filterSelect.selectOption(filterType);
  }

  // Set the date inputs
  const fromInput = page.locator('input[placeholder="From"]');
  await fromInput.fill(dateFrom);

  if (dateTo) {
    const toInput = page.locator('input[placeholder="To"]');
    await toInput.fill(dateTo);
  }

  // Apply the filter
  await page.click(".ag-filter-apply-panel-button");
};

/**
 * Clears all filters from the grid
 */
export const clearAllFilters = (): void => {
  // Get all grids and clear filters from each
  Object.values(window.__AG_GRID_TEST__ || {}).forEach(({ api }) => {
    api.setFilterModel(null);
  });
};

/**
 * Gets the displayed row count from the grid
 */
export const getDisplayedRowCount = (gridId: string): number => {
  const api = getGridApi(gridId);
  return api.getDisplayedRowCount();
};

/**
 * Gets the selected rows from the grid
 */
export const getSelectedRows = <TData = unknown>(gridId: string): TData[] => {
  const api = getGridApi(gridId);
  return api.getSelectedRows();
};

/**
 * Initializes the test environment
 * This should be called in the test setup file
 */
export const initTestEnvironment = (): void => {
  // Initialize the global test object if it doesn't exist
  if (typeof window !== "undefined" && !window.__AG_GRID_TEST__) {
    window.__AG_GRID_TEST__ = {};
  }
};

// Initialize the test environment when this module is loaded
if (typeof window !== "undefined") {
  initTestEnvironment();
}
