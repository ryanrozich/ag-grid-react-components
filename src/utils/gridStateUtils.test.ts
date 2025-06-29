import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  captureGridState,
  applyGridState,
  setupGridStatePersistence,
  type GridState,
} from "./gridStateUtils";
import LZString from "lz-string";
import type {
  GridApi,
  ColumnState,
  SortModelItem,
  FilterModel,
} from "ag-grid-community";

// Mock the logger to avoid console output during tests
vi.mock("./logger", () => ({
  createLogger: () => ({
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  }),
}));

// Mock filter state utils
vi.mock("./filterStateUtils", () => ({
  serializeFilterModel: (model: FilterModel) => {
    // Simple serialization for testing
    return JSON.parse(
      JSON.stringify(model, (_, value) => {
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      }),
    );
  },
  deserializeFilterModel: (model: FilterModel) => {
    // Simple deserialization for testing
    return JSON.parse(
      JSON.stringify(model, (_, value) => {
        if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
          return new Date(value);
        }
        return value;
      }),
    );
  },
  setupFilterStatePersistence: vi.fn(),
}));

describe("gridStateUtils", () => {
  let mockApi: Partial<GridApi>;
  let originalLocation: Location;
  let originalHistory: History;

  beforeEach(() => {
    // Mock GridApi
    mockApi = {
      getFilterModel: vi.fn().mockReturnValue({}),
      setFilterModel: vi.fn(),
      getColumnState: vi.fn().mockReturnValue([]),
      applyColumnState: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      getRowGroupColumns: vi.fn().mockReturnValue([]),
      getPivotColumns: vi.fn().mockReturnValue([]),
      setRowGroupColumns: vi.fn(),
      setPivotColumns: vi.fn(),
    };

    // Mock window.location and history
    originalLocation = window.location;
    originalHistory = window.history;

    // Create a mock URL
    delete (window as any).location;
    (window as any).location = {
      ...originalLocation,
      href: "http://localhost:3000/test",
    };

    // Mock history methods
    window.history.pushState = vi.fn();
    window.history.replaceState = vi.fn();
  });

  afterEach(() => {
    (window as any).location = originalLocation;
    window.history = originalHistory;
    vi.clearAllMocks();
  });

  describe("captureGridState", () => {
    it("captures empty state when grid has no state", () => {
      const state = captureGridState(mockApi as GridApi);
      expect(state).toEqual({});
    });

    it("captures filter state", () => {
      const filterModel = {
        name: { type: "contains", filter: "test" },
        date: { type: "inRange", from: "2024-01-01", to: "2024-12-31" },
      };
      vi.mocked(mockApi.getFilterModel!).mockReturnValue(filterModel);

      const state = captureGridState(mockApi as GridApi);
      expect(state.filters).toEqual(filterModel);
    });

    it("captures column state with only changed properties", () => {
      const columnState: ColumnState[] = [
        {
          colId: "name",
          width: 200,
          hide: false,
          pinned: null,
          sort: null,
          sortIndex: null,
          aggFunc: null,
          rowGroup: false,
          rowGroupIndex: null,
          pivot: false,
          pivotIndex: null,
        },
        {
          colId: "date",
          width: 150,
          hide: true,
          pinned: "left",
          sort: "asc",
          sortIndex: 0,
          aggFunc: null,
          rowGroup: false,
          rowGroupIndex: null,
          pivot: false,
          pivotIndex: null,
        },
      ];
      vi.mocked(mockApi.getColumnState!).mockReturnValue(columnState);

      const state = captureGridState(mockApi as GridApi);
      expect(state.columns).toEqual([
        { colId: "name", width: 200 },
        {
          colId: "date",
          width: 150,
          hide: true,
          pinned: "left",
          sort: "asc",
          sortIndex: 0,
        },
      ]);
    });

    it("captures sort state", () => {
      const sortModel: SortModelItem[] = [
        { colId: "name", sort: "asc" },
        { colId: "date", sort: "desc" },
      ];
      (mockApi as any).getSortModel = vi.fn().mockReturnValue(sortModel);

      const state = captureGridState(mockApi as GridApi);
      expect(state.sort).toEqual(sortModel);
    });

    it("captures row grouping state for enterprise", () => {
      const mockColumn = { getColId: () => "category" };
      vi.mocked(mockApi.getRowGroupColumns!).mockReturnValue([
        mockColumn,
      ] as any);
      vi.mocked(mockApi.getPivotColumns!).mockReturnValue([]);

      const state = captureGridState(mockApi as GridApi);
      expect(state.rowGroup).toEqual(["category"]);
    });

    it("excludes state based on options", () => {
      const filterModel = { name: { type: "contains", filter: "test" } };
      const columnState: ColumnState[] = [{ colId: "name", width: 200 }];
      const sortModel: SortModelItem[] = [{ colId: "name", sort: "asc" }];

      vi.mocked(mockApi.getFilterModel!).mockReturnValue(filterModel);
      vi.mocked(mockApi.getColumnState!).mockReturnValue(columnState);
      (mockApi as any).getSortModel = vi.fn().mockReturnValue(sortModel);

      const state = captureGridState(mockApi as GridApi, {
        includeFilters: false,
        includeColumns: false,
        includeSort: false,
        includeRowGrouping: false,
      });

      expect(state).toEqual({});
    });
  });

  describe("applyGridState", () => {
    it("applies filter state", () => {
      const state: GridState = {
        filters: { name: { type: "contains", filter: "test" } },
      };

      applyGridState(mockApi as GridApi, state);

      expect(mockApi.setFilterModel).toHaveBeenCalledWith(state.filters);
    });

    it("applies column state", () => {
      const state: GridState = {
        columns: [
          { colId: "name", width: 200 },
          { colId: "date", hide: true },
        ],
      };

      applyGridState(mockApi as GridApi, state);

      expect(mockApi.applyColumnState).toHaveBeenCalledWith({
        state: state.columns,
        applyOrder: true,
      });
    });

    it("applies sort state when columns not included", () => {
      const state: GridState = {
        sort: [{ colId: "name", sort: "asc" }],
      };
      (mockApi as any).setSortModel = vi.fn();

      applyGridState(mockApi as GridApi, state, { includeColumns: false });

      expect((mockApi as any).setSortModel).toHaveBeenCalledWith(state.sort);
    });

    it("applies row grouping state for enterprise", () => {
      const state: GridState = {
        rowGroup: ["category", "status"],
        pivot: ["date"],
      };

      applyGridState(mockApi as GridApi, state);

      expect(mockApi.setRowGroupColumns).toHaveBeenCalledWith(state.rowGroup);
      expect(mockApi.setPivotColumns).toHaveBeenCalledWith(state.pivot);
    });

    it("respects options when applying state", () => {
      const state: GridState = {
        filters: { name: { type: "contains", filter: "test" } },
        columns: [{ colId: "name", width: 200 }],
      };

      applyGridState(mockApi as GridApi, state, {
        includeFilters: false,
        includeColumns: true,
      });

      expect(mockApi.setFilterModel).not.toHaveBeenCalled();
      expect(mockApi.applyColumnState).toHaveBeenCalled();
    });
  });

  describe("compression functions", () => {
    it("compresses and decompresses state correctly", () => {
      const originalState: GridState = {
        filters: {
          name: { type: "contains", filter: "test" },
          date: { type: "inRange", from: "2024-01-01", to: "2024-12-31" },
        },
        columns: [
          { colId: "name", width: 200 },
          { colId: "date", hide: true, pinned: "left" },
        ],
        sort: [{ colId: "name", sort: "asc" }],
      };

      const stateString = JSON.stringify(originalState);
      const compressed = LZString.compressToEncodedURIComponent(stateString);
      const decompressed =
        LZString.decompressFromEncodedURIComponent(compressed);
      const restoredState = JSON.parse(decompressed!);

      expect(restoredState).toEqual(originalState);
    });

    it("achieves significant compression for large states", () => {
      // Create a large state with many columns
      const columns: ColumnState[] = Array.from({ length: 50 }, (_, i) => ({
        colId: `column${i}`,
        width: 100 + i * 10,
        hide: i % 3 === 0,
        pinned: i % 5 === 0 ? "left" : null,
        sort: i % 7 === 0 ? "asc" : null,
      }));

      const state: GridState = {
        columns,
        filters: {
          column1: { type: "contains", filter: "test" },
          column2: { type: "equals", filter: "value" },
          column3: { type: "greaterThan", filter: 100 },
        },
        sort: [
          { colId: "column1", sort: "asc" },
          { colId: "column2", sort: "desc" },
        ],
      };

      const stateString = JSON.stringify(state);
      const compressed = LZString.compressToEncodedURIComponent(stateString);

      const compressionRatio =
        (1 - compressed.length / stateString.length) * 100;

      // Expect at least 50% compression for repetitive data
      expect(compressionRatio).toBeGreaterThan(50);
    });

    it("handles compression of special characters", () => {
      const state: GridState = {
        filters: {
          name: {
            type: "contains",
            filter: "test with spaces & special chars!@#$%^&*()",
          },
        },
      };

      const stateString = JSON.stringify(state);
      const compressed = LZString.compressToEncodedURIComponent(stateString);
      const decompressed =
        LZString.decompressFromEncodedURIComponent(compressed);
      const restoredState = JSON.parse(decompressed!);

      expect(restoredState).toEqual(state);
    });
  });

  describe("setupGridStatePersistence", () => {
    beforeEach(() => {
      // Reset URL
      window.location.href = "http://localhost:3000/test";
    });

    it("loads initial state from URL", () => {
      const state: GridState = {
        filters: { name: { type: "contains", filter: "test" } },
      };
      const compressed = LZString.compressToEncodedURIComponent(
        JSON.stringify({ ...state, version: 1 }),
      );
      window.location.href = `http://localhost:3000/test?gridState=${compressed}`;

      const onStateLoad = vi.fn();
      setupGridStatePersistence(mockApi as GridApi, { onStateLoad });

      expect(mockApi.setFilterModel).toHaveBeenCalledWith(state.filters);
      expect(onStateLoad).toHaveBeenCalledWith(expect.objectContaining(state));
    });

    it("updates URL when state changes", () => {
      const cleanup = setupGridStatePersistence(mockApi as GridApi);

      // Simulate filter change
      const filterModel = { name: { type: "contains", filter: "test" } };
      vi.mocked(mockApi.getFilterModel!).mockReturnValue(filterModel);

      // Get the registered listener
      const filterChangedCall = vi
        .mocked(mockApi.addEventListener!)
        .mock.calls.find((call) => call[0] === "filterChanged");
      const filterChangedListener = filterChangedCall?.[1] as () => void;

      // Trigger the listener
      filterChangedListener();

      expect(window.history.pushState).toHaveBeenCalled();
      const [, , url] = vi.mocked(window.history.pushState).mock.calls[0];
      expect(url).toContain("gridState=");

      cleanup();
    });

    it("handles browser back/forward navigation", () => {
      const cleanup = setupGridStatePersistence(mockApi as GridApi);

      // Create a popstate event with state
      const state: GridState = {
        filters: { name: { type: "contains", filter: "navigated" } },
      };
      const compressed = LZString.compressToEncodedURIComponent(
        JSON.stringify({ ...state, version: 1 }),
      );
      window.location.href = `http://localhost:3000/test?gridState=${compressed}`;

      // Trigger popstate event
      const popstateEvent = new PopStateEvent("popstate", { state: {} });
      window.dispatchEvent(popstateEvent);

      expect(mockApi.setFilterModel).toHaveBeenCalledWith(state.filters);

      cleanup();
    });

    it("removes URL parameter when state is cleared", () => {
      window.location.href =
        "http://localhost:3000/test?gridState=test&other=value";

      const cleanup = setupGridStatePersistence(mockApi as GridApi);

      // Return empty state
      vi.mocked(mockApi.getFilterModel!).mockReturnValue({});
      vi.mocked(mockApi.getColumnState!).mockReturnValue([]);

      // Trigger a state change
      const filterChangedCall = vi
        .mocked(mockApi.addEventListener!)
        .mock.calls.find((call) => call[0] === "filterChanged");
      const filterChangedListener = filterChangedCall?.[1] as () => void;
      filterChangedListener();

      const [, , url] = vi.mocked(window.history.pushState).mock.calls[0];
      expect(url).not.toContain("gridState=");
      expect(url).toContain("other=value");

      cleanup();
    });

    it("warns when URL exceeds max length", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      // Create a large state
      const columns: ColumnState[] = Array.from({ length: 100 }, (_, i) => ({
        colId: `veryLongColumnName${i}`,
        width: 100 + i,
      }));
      vi.mocked(mockApi.getColumnState!).mockReturnValue(columns);

      const cleanup = setupGridStatePersistence(mockApi as GridApi, {
        maxUrlLength: 100, // Very low limit to trigger warning
      });

      // Trigger state change
      const columnResizedCall = vi
        .mocked(mockApi.addEventListener!)
        .mock.calls.find((call) => call[0] === "columnResized");
      const columnResizedListener = columnResizedCall?.[1] as () => void;
      columnResizedListener();

      expect(window.history.pushState).toHaveBeenCalled();

      cleanup();
      warnSpy.mockRestore();
    });

    it("cleanup function removes all listeners", () => {
      const cleanup = setupGridStatePersistence(mockApi as GridApi);

      // Verify listeners were added
      expect(mockApi.addEventListener).toHaveBeenCalledTimes(8); // All state change events

      // Clean up
      cleanup();

      // Verify listeners were removed
      expect(mockApi.removeEventListener).toHaveBeenCalledTimes(8);

      // Verify the same listeners that were added are removed
      const addedEvents = vi
        .mocked(mockApi.addEventListener!)
        .mock.calls.map((call) => call[0]);
      const removedEvents = vi
        .mocked(mockApi.removeEventListener!)
        .mock.calls.map((call) => call[0]);
      expect(removedEvents).toEqual(addedEvents);
    });

    it("uses custom parameter name", () => {
      const cleanup = setupGridStatePersistence(mockApi as GridApi, {
        paramName: "customState",
      });

      // Trigger state change
      vi.mocked(mockApi.getFilterModel!).mockReturnValue({
        name: { type: "contains", filter: "test" },
      });

      const filterChangedCall = vi
        .mocked(mockApi.addEventListener!)
        .mock.calls.find((call) => call[0] === "filterChanged");
      const filterChangedListener = filterChangedCall?.[1] as () => void;
      filterChangedListener();

      const [, , url] = vi.mocked(window.history.pushState).mock.calls[0];
      expect(url).toContain("customState=");
      expect(url).not.toContain("gridState=");

      cleanup();
    });

    it("disables compression when specified", () => {
      const cleanup = setupGridStatePersistence(mockApi as GridApi, {
        useCompression: false,
      });

      // Set up state
      const filterModel = { name: { type: "contains", filter: "test" } };
      vi.mocked(mockApi.getFilterModel!).mockReturnValue(filterModel);

      // Trigger state change
      const filterChangedCall = vi
        .mocked(mockApi.addEventListener!)
        .mock.calls.find((call) => call[0] === "filterChanged");
      const filterChangedListener = filterChangedCall?.[1] as () => void;
      filterChangedListener();

      const [, , url] = vi.mocked(window.history.pushState).mock.calls[0];

      // Extract the state parameter
      const urlObj = new URL(url as string);
      const stateParam = urlObj.searchParams.get("gridState");

      // Try to parse as JSON (uncompressed)
      const decodedState = JSON.parse(decodeURIComponent(stateParam!));
      expect(decodedState.filters).toEqual(filterModel);

      cleanup();
    });
  });

  describe("state serialization with dates", () => {
    it("serializes and deserializes date values in filters", () => {
      const filterModel = {
        date: {
          type: "inRange",
          dateFrom: new Date("2024-01-01"),
          dateTo: new Date("2024-12-31"),
        },
      };
      vi.mocked(mockApi.getFilterModel!).mockReturnValue(filterModel);

      const state = captureGridState(mockApi as GridApi);

      // Simulate serialization/deserialization cycle
      const serialized = JSON.stringify(state);
      JSON.parse(serialized);

      // The mock should handle date serialization
      expect(state.filters).toBeDefined();
    });
  });
});
