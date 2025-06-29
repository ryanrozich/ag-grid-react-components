import type { GridApi } from "ag-grid-community";
import type {
  GridState,
  GridStatePersistenceOptions,
  CompressionAdapter,
} from "./types";

// No compression adapter (default)
export const noCompressionAdapter: CompressionAdapter = {
  compress: (data: string) => data,
  decompress: (data: string) => data,
};

// Capture current grid state
export function captureGridState(
  api: GridApi,
  options: Partial<GridStatePersistenceOptions> = {},
): GridState {
  const {
    includeFilters = true,
    includeColumns = true,
    includeSort = true,
    includeRowGrouping = true,
  } = options;

  const state: GridState = {};

  if (includeFilters) {
    state.filterModel = api.getFilterModel();
  }

  if (includeColumns) {
    state.columnState = api.getColumnState();
  }

  if (includeSort) {
    state.sortModel = api.getSortModel();
  }

  if (includeRowGrouping) {
    const columnModel = api.getColumnModel();
    if (columnModel && "getRowGroupColumns" in columnModel) {
      state.rowGroupState = (columnModel as any).getRowGroupColumns?.();
    }
  }

  return state;
}

// Apply grid state
export function applyGridState(api: GridApi, state: GridState): void {
  if (state.filterModel !== undefined) {
    api.setFilterModel(state.filterModel);
  }

  if (state.columnState) {
    api.applyColumnState({ state: state.columnState });
  }

  if (state.sortModel) {
    api.setSortModel(state.sortModel);
  }

  if (state.rowGroupState) {
    const columnModel = api.getColumnModel();
    if (columnModel && "setRowGroupColumns" in columnModel) {
      (columnModel as any).setRowGroupColumns?.(state.rowGroupState);
    }
  }
}

// Setup grid state persistence with URL
export function setupGridStatePersistence(
  api: GridApi,
  options: GridStatePersistenceOptions = {},
): () => void {
  const {
    compressionAdapter = noCompressionAdapter,
    maxUrlLength = 2000,
    onStateChange,
    onStateLoad,
    ...captureOptions
  } = options;

  let isUpdatingFromUrl = false;

  const updateUrl = async (state: GridState) => {
    if (isUpdatingFromUrl) return;

    const stateJson = JSON.stringify(state);
    const compressed = await compressionAdapter.compress(stateJson);

    const params = new URLSearchParams(window.location.search);

    if (compressed.length > maxUrlLength) {
      console.warn(
        `Grid state too large for URL (${compressed.length} > ${maxUrlLength})`,
      );
      params.delete("gridState");
    } else {
      params.set("gridState", compressed);
      if (compressionAdapter !== noCompressionAdapter) {
        params.set("compressed", "1");
      } else {
        params.delete("compressed");
      }
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);

    onStateChange?.(state);
  };

  const loadFromUrl = async () => {
    const params = new URLSearchParams(window.location.search);
    const stateParam = params.get("gridState");

    if (stateParam) {
      try {
        isUpdatingFromUrl = true;

        const isCompressed = params.get("compressed") === "1";
        const decompressed = isCompressed
          ? await compressionAdapter.decompress(stateParam)
          : stateParam;

        const state = JSON.parse(decompressed);
        applyGridState(api, state);
        onStateLoad?.(state);
      } catch (error) {
        console.error("Failed to load grid state from URL:", error);
      } finally {
        isUpdatingFromUrl = false;
      }
    }
  };

  // Grid event handlers
  const onGridStateChanged = () => {
    if (!isUpdatingFromUrl) {
      const state = captureGridState(api, captureOptions);
      updateUrl(state);
    }
  };

  // Initial load
  loadFromUrl();

  // Listen to grid events
  api.addEventListener("filterChanged", onGridStateChanged);
  api.addEventListener("sortChanged", onGridStateChanged);
  api.addEventListener("columnMoved", onGridStateChanged);
  api.addEventListener("columnResized", onGridStateChanged);
  api.addEventListener("columnVisible", onGridStateChanged);
  api.addEventListener("columnPinned", onGridStateChanged);

  // Listen to browser navigation
  const onPopState = () => {
    loadFromUrl();
  };
  window.addEventListener("popstate", onPopState);

  // Return cleanup function
  return () => {
    api.removeEventListener("filterChanged", onGridStateChanged);
    api.removeEventListener("sortChanged", onGridStateChanged);
    api.removeEventListener("columnMoved", onGridStateChanged);
    api.removeEventListener("columnResized", onGridStateChanged);
    api.removeEventListener("columnVisible", onGridStateChanged);
    api.removeEventListener("columnPinned", onGridStateChanged);
    window.removeEventListener("popstate", onPopState);
  };
}
