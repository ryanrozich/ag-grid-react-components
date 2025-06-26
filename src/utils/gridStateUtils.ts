/**
 * Grid State Persistence Utilities
 * Provides comprehensive state persistence for AG Grid including filters, columns, sorting, and more
 * Uses LZ-String compression to minimize URL length
 */

import {
  GridApi,
  ColumnState,
  SortModelItem,
  FilterModel,
} from "ag-grid-community";
import LZString from "lz-string";
import {
  serializeFilterModel,
  deserializeFilterModel,
} from "./filterStateUtils";
import { createLogger } from "./logger";

const logger = createLogger("gridStateUtils");

/**
 * Grid state configuration options
 */
export interface GridStateOptions {
  /** Include filter state (default: true) */
  includeFilters?: boolean;
  /** Include column state - visibility, order, width, pinning (default: true) */
  includeColumns?: boolean;
  /** Include sort state (default: true) */
  includeSort?: boolean;
  /** Include row group state for enterprise (default: true) */
  includeRowGrouping?: boolean;
  /** Use compression for URL (default: true) */
  useCompression?: boolean;
  /** URL parameter name (default: "gridState") */
  paramName?: string;
  /** Callback when state is loaded */
  onStateLoad?: (state: GridState) => void;
  /** Callback when state is saved */
  onStateSave?: (state: GridState) => void;
  /** Maximum URL length before warning (default: 2000) */
  maxUrlLength?: number;
}

/**
 * Complete grid state interface
 */
export interface GridState {
  /** Filter models for all columns */
  filters?: FilterModel;
  /** Column states including visibility, width, order */
  columns?: ColumnState[];
  /** Sort model */
  sort?: SortModelItem[];
  /** Row grouping columns (enterprise) */
  rowGroup?: string[];
  /** Pivot columns (enterprise) */
  pivot?: string[];
  /** Aggregation columns (enterprise) */
  aggregation?: string[];
  /** State version for future compatibility */
  version?: number;
}

/**
 * Serializes grid state for URL storage
 */
function serializeGridState(state: GridState): string {
  // Deep clone and prepare state for serialization
  const serializable = {
    ...state,
    version: 1, // Version for future compatibility
  };

  // Serialize filter models if present
  if (serializable.filters) {
    serializable.filters = serializeFilterModel(
      serializable.filters,
    ) as FilterModel;
  }

  return JSON.stringify(serializable);
}

/**
 * Deserializes grid state from URL storage
 */
function deserializeGridState(stateString: string): GridState | null {
  try {
    const state = JSON.parse(stateString) as GridState;

    // Deserialize filter models if present
    if (state.filters) {
      state.filters = deserializeFilterModel(state.filters) as FilterModel;
    }

    return state;
  } catch (error) {
    logger.error("Failed to deserialize grid state:", error);
    return null;
  }
}

/**
 * Captures current grid state
 */
/**
 * Captures the current state of the AG Grid instance.
 * Can be used for manual state persistence or custom state management.
 *
 * @param gridApi - The AG Grid API instance
 * @param options - Configuration options for state capture
 * @param options.includeFilters - Include filter state (default: true)
 * @param options.includeColumns - Include column state (default: true)
 * @param options.includeSort - Include sort state (default: true)
 * @param options.includeRowGrouping - Include row grouping state (default: true)
 * @returns GridState object containing the captured state
 *
 * @example
 * ```typescript
 * const state = captureGridState(gridApi, {
 *   includeFilters: true,
 *   includeColumns: true
 * });
 *
 * // Save to localStorage
 * localStorage.setItem('gridState', JSON.stringify(state));
 *
 * // Or send to server
 * await saveGridStateToServer(state);
 * ```
 */
export function captureGridState(
  gridApi: GridApi,
  options: GridStateOptions = {},
): GridState {
  const {
    includeFilters = true,
    includeColumns = true,
    includeSort = true,
    includeRowGrouping = true,
  } = options;

  const state: GridState = {};

  // Capture filter state
  if (includeFilters) {
    const filterModel = gridApi.getFilterModel();
    if (filterModel && Object.keys(filterModel).length > 0) {
      state.filters = filterModel;
    }
  }

  // Capture column state
  if (includeColumns) {
    const columnState = gridApi.getColumnState();
    if (columnState && columnState.length > 0) {
      // Only store non-default values to reduce size
      state.columns = columnState.map((col) => {
        const minimal: ColumnState = { colId: col.colId };

        // Only include changed properties
        if (col.width !== null && col.width !== undefined)
          minimal.width = col.width;
        if (col.hide) minimal.hide = true;
        if (col.pinned) minimal.pinned = col.pinned;
        if (col.sort) minimal.sort = col.sort;
        if (col.sortIndex !== null && col.sortIndex !== undefined)
          minimal.sortIndex = col.sortIndex;
        if (col.aggFunc) minimal.aggFunc = col.aggFunc;
        if (col.rowGroup) minimal.rowGroup = col.rowGroup;
        if (col.rowGroupIndex !== null && col.rowGroupIndex !== undefined)
          minimal.rowGroupIndex = col.rowGroupIndex;
        if (col.pivot) minimal.pivot = col.pivot;
        if (col.pivotIndex !== null && col.pivotIndex !== undefined)
          minimal.pivotIndex = col.pivotIndex;

        return minimal;
      });
    }
  }

  // Capture sort state
  if (includeSort) {
    const sortModel = (
      gridApi as GridApi & { getSortModel?: () => SortModelItem[] }
    ).getSortModel?.();
    if (sortModel && sortModel.length > 0) {
      state.sort = sortModel;
    }
  }

  // Capture enterprise features if available
  if (includeRowGrouping && gridApi.getRowGroupColumns) {
    try {
      const rowGroupColumns = gridApi.getRowGroupColumns();
      if (rowGroupColumns && rowGroupColumns.length > 0) {
        state.rowGroup = rowGroupColumns.map((col) => col.getColId());
      }

      const pivotColumns = gridApi.getPivotColumns();
      if (pivotColumns && pivotColumns.length > 0) {
        state.pivot = pivotColumns.map((col) => col.getColId());
      }
    } catch {
      logger.debug("Enterprise features not available");
    }
  }

  return state;
}

/**
 * Applies grid state
 */
/**
 * Applies a previously captured grid state to the AG Grid instance.
 * Can be used for manual state restoration or custom state management.
 *
 * @param gridApi - The AG Grid API instance
 * @param state - The grid state to apply
 * @param options - Configuration options for state application
 * @param options.includeFilters - Apply filter state (default: true)
 * @param options.includeColumns - Apply column state (default: true)
 * @param options.includeSort - Apply sort state (default: true)
 * @param options.includeRowGrouping - Apply row grouping state (default: true)
 *
 * @example
 * ```typescript
 * // Restore from localStorage
 * const savedState = localStorage.getItem('gridState');
 * if (savedState) {
 *   const state = JSON.parse(savedState);
 *   applyGridState(gridApi, state);
 * }
 *
 * // Or restore from server
 * const state = await loadGridStateFromServer();
 * applyGridState(gridApi, state, {
 *   includeFilters: true,
 *   includeColumns: false // Don't restore column state
 * });
 * ```
 */
export function applyGridState(
  gridApi: GridApi,
  state: GridState,
  options: GridStateOptions = {},
): void {
  const {
    includeFilters = true,
    includeColumns = true,
    includeSort = true,
    includeRowGrouping = true,
  } = options;

  // Apply column state first (includes sort)
  if (includeColumns && state.columns) {
    gridApi.applyColumnState({
      state: state.columns,
      applyOrder: true,
    });
  }

  // Apply sort state if not included in column state
  if (includeSort && state.sort && !includeColumns) {
    (
      gridApi as GridApi & { setSortModel?: (model: SortModelItem[]) => void }
    ).setSortModel?.(state.sort);
  }

  // Apply filter state
  if (includeFilters && state.filters) {
    gridApi.setFilterModel(state.filters);
  }

  // Apply enterprise features if available
  if (includeRowGrouping && gridApi.setRowGroupColumns) {
    try {
      if (state.rowGroup) {
        gridApi.setRowGroupColumns(state.rowGroup);
      }
      if (state.pivot && gridApi.setPivotColumns) {
        gridApi.setPivotColumns(state.pivot);
      }
    } catch {
      logger.debug("Enterprise features not available");
    }
  }
}

/**
 * Compresses state string using LZ-String
 */
function compressState(stateString: string): string {
  return LZString.compressToEncodedURIComponent(stateString);
}

/**
 * Decompresses state string using LZ-String
 */
function decompressState(compressed: string): string | null {
  return LZString.decompressFromEncodedURIComponent(compressed);
}

/**
 * Gets the state from URL
 */
function getStateFromUrl(
  paramName: string,
  useCompression: boolean,
): GridState | null {
  const url = new URL(window.location.href);
  const stateParam = url.searchParams.get(paramName);

  if (!stateParam) {
    return null;
  }

  try {
    let stateString: string | null;

    if (useCompression) {
      stateString = decompressState(stateParam);
      if (!stateString) {
        logger.error("Failed to decompress state from URL");
        return null;
      }
    } else {
      stateString = decodeURIComponent(stateParam);
    }

    return deserializeGridState(stateString);
  } catch (error) {
    logger.error("Failed to parse state from URL:", error);
    return null;
  }
}

/**
 * Updates URL with current state
 */
function updateUrlWithState(
  state: GridState,
  paramName: string,
  useCompression: boolean,
  maxUrlLength: number,
): void {
  const url = new URL(window.location.href);
  const hasState =
    state.filters || state.columns || state.sort || state.rowGroup;

  if (!hasState) {
    // Remove parameter if no state
    if (url.searchParams.has(paramName)) {
      url.searchParams.delete(paramName);
      window.history.pushState({}, "", url.toString());
    }
    return;
  }

  const stateString = serializeGridState(state);
  let stateParam: string;

  if (useCompression) {
    stateParam = compressState(stateString);
  } else {
    stateParam = encodeURIComponent(stateString);
  }

  url.searchParams.set(paramName, stateParam);
  const newUrl = url.toString();

  // Check URL length
  if (newUrl.length > maxUrlLength) {
    logger.warn(
      `URL length (${newUrl.length}) exceeds recommended maximum (${maxUrlLength})`,
    );

    // Log compression stats
    const compressionRatio = useCompression
      ? (
          (1 - stateParam.length / encodeURIComponent(stateString).length) *
          100
        ).toFixed(1)
      : "0";
    logger.info(
      `State size: ${stateString.length} chars, compressed: ${stateParam.length} chars (${compressionRatio}% reduction)`,
    );
  }

  window.history.pushState({ gridState: state }, "", newUrl);
}

/**
 * Sets up comprehensive grid state persistence with URL synchronization
 * This is an enhanced version that supports full grid state, not just filters
 */
/**
 * Sets up automatic grid state persistence with URL synchronization.
 * Captures and restores complete grid state including filters, columns, sorting, and grouping.
 *
 * @param gridApi - The AG Grid API instance
 * @param options - Configuration options for state persistence
 * @param options.includeFilters - Include filter state (default: true)
 * @param options.includeColumns - Include column state like visibility, order, width, pinning (default: true)
 * @param options.includeSort - Include sort state (default: true)
 * @param options.includeRowGrouping - Include row grouping state for AG Grid Enterprise (default: true)
 * @param options.useCompression - Use LZ-String compression for shorter URLs (default: true)
 * @param options.paramName - URL parameter name (default: 'gridState')
 * @param options.maxUrlLength - Maximum URL length before warning (default: 2000)
 * @param options.onStateLoad - Callback when state is loaded from URL
 * @param options.onStateSave - Callback when state is saved to URL
 * @returns Cleanup function to remove all event listeners
 *
 * @example
 * ```typescript
 * const cleanup = setupGridStatePersistence(params.api, {
 *   useCompression: true,
 *   maxUrlLength: 2000,
 *   onStateLoad: (state) => {
 *     console.log('Grid state loaded:', state);
 *   }
 * });
 *
 * // Later, clean up listeners
 * cleanup();
 * ```
 */
export function setupGridStatePersistence(
  gridApi: GridApi,
  options: GridStateOptions = {},
): () => void {
  const {
    paramName = "gridState",
    useCompression = true,
    maxUrlLength = 2000,
    onStateLoad,
    onStateSave,
    ...captureOptions
  } = options;

  let isUpdatingFromUrl = false;

  // Load initial state from URL
  const initialState = getStateFromUrl(paramName, useCompression);
  if (initialState) {
    isUpdatingFromUrl = true;
    applyGridState(gridApi, initialState, captureOptions);
    if (onStateLoad) {
      onStateLoad(initialState);
    }
    isUpdatingFromUrl = false;
  }

  // Listen for all state changes
  const stateChangeListener = () => {
    if (isUpdatingFromUrl) return;

    const state = captureGridState(gridApi, captureOptions);
    updateUrlWithState(state, paramName, useCompression, maxUrlLength);

    if (onStateSave) {
      onStateSave(state);
    }
  };

  // Add listeners for various state changes
  const listeners = [
    { event: "filterChanged", listener: stateChangeListener },
    { event: "sortChanged", listener: stateChangeListener },
    { event: "columnVisible", listener: stateChangeListener },
    { event: "columnPinned", listener: stateChangeListener },
    { event: "columnResized", listener: stateChangeListener },
    { event: "columnMoved", listener: stateChangeListener },
    { event: "columnRowGroupChanged", listener: stateChangeListener },
    { event: "columnPivotChanged", listener: stateChangeListener },
  ] as const;

  // Add all listeners
  listeners.forEach(({ event, listener }) => {
    gridApi.addEventListener(event, listener);
  });

  // Handle browser navigation
  const handlePopState = (_event: PopStateEvent) => {
    const state = getStateFromUrl(paramName, useCompression);
    if (state) {
      isUpdatingFromUrl = true;
      applyGridState(gridApi, state, captureOptions);
      if (onStateLoad) {
        onStateLoad(state);
      }
      isUpdatingFromUrl = false;
    } else {
      // Clear all state
      isUpdatingFromUrl = true;
      gridApi.setFilterModel({});
      (
        gridApi as GridApi & { setSortModel?: (model: SortModelItem[]) => void }
      ).setSortModel?.([]);
      // Reset column state would require storing default state
      isUpdatingFromUrl = false;
    }
  };

  window.addEventListener("popstate", handlePopState);

  // Return cleanup function
  return () => {
    listeners.forEach(({ event, listener }) => {
      gridApi.removeEventListener(event, listener);
    });
    window.removeEventListener("popstate", handlePopState);
  };
}

/**
 * Backward compatibility: Export the original setupFilterStatePersistence
 * that only handles filters
 */
export { setupFilterStatePersistence } from "./filterStateUtils";
