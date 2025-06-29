import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  serializeFilterModel,
  deserializeFilterModel,
  setupFilterStatePersistence,
} from "./filterStateUtils";
import type { GridApi, FilterChangedEvent } from "ag-grid-community";
import type { SerializedFilterModel } from "../types";

describe("filterStateUtils", () => {
  describe("serializeFilterModel", () => {
    it("should serialize Date objects to ISO strings", () => {
      const date = new Date("2024-01-15T12:00:00Z");
      const model = {
        column1: {
          type: "equals",
          dateFrom: date,
          dateTo: null,
        },
      };

      const serialized = serializeFilterModel(model) as SerializedFilterModel;

      expect((serialized.column1 as any).dateFrom).toBe(
        "2024-01-15T12:00:00.000Z",
      );
      expect((serialized.column1 as any).dateTo).toBeNull();
      expect((serialized.column1 as any).fromInclusive).toBe(false);
      expect((serialized.column1 as any).toInclusive).toBe(false);
    });

    it("should handle multiple date fields", () => {
      const date1 = new Date("2024-01-15T12:00:00Z");
      const date2 = new Date("2024-01-20T12:00:00Z");
      const model = {
        column1: {
          type: "inRange",
          dateFrom: date1,
          dateTo: date2,
        },
      };

      const serialized = serializeFilterModel(model) as SerializedFilterModel;

      expect((serialized as any).column1.dateFrom).toBe(
        "2024-01-15T12:00:00.000Z",
      );
      expect((serialized as any).column1.dateTo).toBe(
        "2024-01-20T12:00:00.000Z",
      );
    });

    it("should preserve non-Date values", () => {
      const model = {
        column1: {
          type: "equals",
          value: "test",
          filterType: "text",
        },
        column2: {
          type: "greaterThan",
          filter: 100,
          filterType: "number",
        },
      };

      const serialized = serializeFilterModel(model);

      expect(serialized).toEqual(model);
    });

    it("should handle empty and null models", () => {
      expect(serializeFilterModel({})).toEqual({});
      expect(serializeFilterModel(null as never)).toEqual(null);
      expect(serializeFilterModel(undefined as never)).toEqual(undefined);
    });

    it("should handle filters without date fields", () => {
      const model = {
        column1: {
          type: "equals",
          filter: "test",
        },
        column2: {
          type: "contains",
          filter: 123,
        },
      };

      const serialized = serializeFilterModel(model);

      expect(serialized).toEqual(model);
    });

    it("should preserve existing inclusivity settings", () => {
      const date = new Date("2024-01-15T12:00:00Z");
      const model = {
        column1: {
          type: "equals",
          dateFrom: date,
          fromInclusive: true,
          toInclusive: true,
        },
      };

      const serialized = serializeFilterModel(model) as SerializedFilterModel;

      expect((serialized as any).column1.fromInclusive).toBe(true);
      expect((serialized as any).column1.toInclusive).toBe(true);
    });
  });

  describe("deserializeFilterModel", () => {
    it("should deserialize ISO date strings to Date objects", () => {
      const model = {
        column1: {
          type: "equals",
          dateFrom: "2024-01-15T12:00:00.000Z",
          dateTo: null,
        },
      };

      const deserialized = deserializeFilterModel(model);

      expect((deserialized as any).column1.dateFrom).toBeInstanceOf(Date);
      expect((deserialized as any).column1.dateFrom.toISOString()).toBe(
        "2024-01-15T12:00:00.000Z",
      );
      expect((deserialized as any).column1.dateTo).toBeNull();
    });

    it("should handle multiple date fields", () => {
      const model = {
        column1: {
          type: "inRange",
          dateFrom: "2024-01-15T12:00:00.000Z",
          dateTo: "2024-01-20T12:00:00.000Z",
        },
      };

      const deserialized = deserializeFilterModel(model);

      expect((deserialized as any).column1.dateFrom).toBeInstanceOf(Date);
      expect((deserialized as any).column1.dateTo).toBeInstanceOf(Date);
      expect((deserialized as any).column1.dateFrom.toISOString()).toBe(
        "2024-01-15T12:00:00.000Z",
      );
      expect((deserialized as any).column1.dateTo.toISOString()).toBe(
        "2024-01-20T12:00:00.000Z",
      );
    });

    it("should preserve non-date string values", () => {
      const model = {
        column1: {
          type: "equals",
          value: "test",
          filterType: "text",
        },
        column2: {
          type: "contains",
          filter: "not-a-date",
        },
      };

      const deserialized = deserializeFilterModel(model);

      expect(deserialized as any).toEqual(model);
    });

    it("should only convert dateFrom and dateTo fields", () => {
      const model = {
        column1: {
          dateFrom: "2024-01-15T12:00:00.000Z",
          dateTo: "2024-01-20T12:00:00.000Z",
          otherDate: "2024-01-25T12:00:00.000Z",
          filter: "2024-01-30T12:00:00.000Z",
        },
      };

      const deserialized = deserializeFilterModel(model);

      // Only dateFrom and dateTo should be converted
      expect((deserialized as any).column1.dateFrom).toBeInstanceOf(Date);
      expect((deserialized as any).column1.dateTo).toBeInstanceOf(Date);
      expect((deserialized as any).column1.otherDate).toBe(
        "2024-01-25T12:00:00.000Z",
      );
      expect((deserialized as any).column1.filter).toBe(
        "2024-01-30T12:00:00.000Z",
      );
    });

    it("should handle empty and null models", () => {
      expect(deserializeFilterModel({})).toEqual({});
      expect(deserializeFilterModel(null as never)).toEqual(null);
      expect(deserializeFilterModel(undefined as never)).toEqual(undefined);
    });
  });

  describe("setupFilterStatePersistence", () => {
    let mockApi: Partial<GridApi>;
    let originalLocation: Location;
    let mockPushState: ReturnType<typeof vi.fn>;
    let mockReplaceState: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      // Mock GridApi
      mockApi = {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        getFilterModel: vi.fn().mockReturnValue({}),
        setFilterModel: vi.fn(),
      };

      // Store original location
      originalLocation = window.location;

      // Mock history methods
      mockPushState = vi.fn();
      mockReplaceState = vi.fn();
      window.history.pushState = mockPushState;
      window.history.replaceState = mockReplaceState;
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it("should setup event listeners on initialization", () => {
      const cleanup = setupFilterStatePersistence(mockApi as GridApi);

      expect(mockApi.addEventListener).toHaveBeenCalledWith(
        "filterChanged",
        expect.any(Function),
      );
      expect(cleanup).toBeInstanceOf(Function);
    });

    it("should restore filters from URL on initialization", () => {
      const filterModel = {
        date: {
          type: "equals",
          dateFrom: "2024-01-15T12:00:00.000Z",
        },
      };
      const encodedFilter = encodeURIComponent(JSON.stringify(filterModel));

      // Mock location.href with the filter parameter
      const mockHref = `http://localhost:3000/?filter=${encodedFilter}`;
      Object.defineProperty(window, "location", {
        value: {
          ...originalLocation,
          href: mockHref,
          search: `?filter=${encodedFilter}`,
        },
        writable: true,
      });

      setupFilterStatePersistence(mockApi as GridApi);

      expect(mockApi.setFilterModel!).toHaveBeenCalledWith({
        date: {
          type: "equals",
          dateFrom: expect.any(Date),
        },
      });

      // Restore location
      Object.defineProperty(window, "location", {
        value: originalLocation,
        writable: true,
      });
    });

    it("should update URL when filters change", () => {
      setupFilterStatePersistence(mockApi as GridApi);

      // Get the filterChanged callback
      const filterChangedCallback = vi.mocked(mockApi.addEventListener!).mock
        .calls[0][1];

      // Simulate filter change
      const newFilterModel = {
        date: {
          type: "equals",
          dateFrom: new Date("2024-01-15T12:00:00Z"),
        },
      };
      vi.mocked(mockApi.getFilterModel!).mockReturnValue(newFilterModel);

      filterChangedCallback({} as FilterChangedEvent);

      // Should update URL with serialized filter
      expect(mockPushState).toHaveBeenCalled();
      const [, , url] = mockPushState.mock.calls[0];
      expect(url).toContain("filter=");
    });

    it("should clear URL params when filters are cleared", () => {
      // Mock location with existing params - use valid JSON for filter
      const validFilter = encodeURIComponent(
        JSON.stringify({ date: { type: "equals" } }),
      );
      const mockHref = `http://localhost:3000/?filter=${validFilter}&other=param`;
      Object.defineProperty(window, "location", {
        value: {
          ...originalLocation,
          href: mockHref,
          search: `?filter=${validFilter}&other=param`,
        },
        writable: true,
      });

      setupFilterStatePersistence(mockApi as GridApi);

      // Wait for addEventListener to be called
      expect(mockApi.addEventListener).toHaveBeenCalled();
      const filterChangedCallback = vi.mocked(mockApi.addEventListener!).mock
        .calls[0][1];

      // Simulate clearing filters
      vi.mocked(mockApi.getFilterModel!).mockReturnValue({});
      filterChangedCallback({} as FilterChangedEvent);

      // Should remove filter param but keep other params
      expect(mockPushState).toHaveBeenCalled();
      const [, , url] = mockPushState.mock.calls[0];
      expect(url).toContain("other=param");
      expect(url).not.toContain("filter=");

      // Restore location
      Object.defineProperty(window, "location", {
        value: originalLocation,
        writable: true,
      });
    });

    it("should handle popstate events", () => {
      // First set up the location with filter in URL
      const filterModel = {
        date: { type: "equals", dateFrom: "2024-01-15T12:00:00.000Z" },
      };
      const encodedFilter = encodeURIComponent(JSON.stringify(filterModel));
      const mockHref = `http://localhost:3000/?filter=${encodedFilter}`;

      Object.defineProperty(window, "location", {
        value: {
          ...originalLocation,
          href: mockHref,
          search: `?filter=${encodedFilter}`,
        },
        writable: true,
      });

      setupFilterStatePersistence(mockApi as GridApi);

      // Clear previous calls from initialization
      vi.mocked(mockApi.setFilterModel!).mockClear();

      // Now trigger popstate event
      window.dispatchEvent(new PopStateEvent("popstate"));

      // Should deserialize and set the filter model
      expect(mockApi.setFilterModel!).toHaveBeenCalledWith({
        date: { type: "equals", dateFrom: expect.any(Date) },
      });

      // Restore location
      Object.defineProperty(window, "location", {
        value: originalLocation,
        writable: true,
      });
    });

    it("should cleanup event listeners when cleanup function is called", () => {
      const cleanup = setupFilterStatePersistence(mockApi as GridApi);

      cleanup();

      expect(mockApi.removeEventListener).toHaveBeenCalledWith(
        "filterChanged",
        expect.any(Function),
      );
    });

    it("should handle invalid filter data in URL gracefully", () => {
      window.location.search = "?filter=invalid-json";

      expect(() => {
        setupFilterStatePersistence(mockApi as GridApi);
      }).not.toThrow();

      // Should not set filter if invalid
      expect(mockApi.setFilterModel).not.toHaveBeenCalled();
    });

    it("should handle errors in filter serialization gracefully", () => {
      setupFilterStatePersistence(mockApi as GridApi);
      const filterChangedCallback = vi.mocked(mockApi.addEventListener!).mock
        .calls[0][1];

      // Create a circular reference that can't be serialized
      const circularModel = { date: {} as Record<string, unknown> };
      circularModel.date.circular = circularModel;
      vi.mocked(mockApi.getFilterModel!).mockReturnValue(circularModel);

      // This will throw due to circular reference in JSON.stringify
      expect(() => {
        filterChangedCallback({} as FilterChangedEvent);
      }).toThrow();
    });

    it("should handle callback options", () => {
      const onFilterLoad = vi.fn();
      const onFilterSave = vi.fn();

      setupFilterStatePersistence(mockApi as GridApi, {
        onFilterLoad,
        onFilterSave,
      });

      // Should call onFilterLoad with empty model initially
      expect(onFilterLoad).toHaveBeenCalledWith({});

      // Trigger filter change
      const filterChangedCallback = vi.mocked(mockApi.addEventListener!).mock
        .calls[0][1];
      const newFilterModel = { date: { type: "equals" } };
      vi.mocked(mockApi.getFilterModel!).mockReturnValue(newFilterModel);
      filterChangedCallback({} as FilterChangedEvent);

      // Should call onFilterSave
      expect(onFilterSave).toHaveBeenCalledWith(newFilterModel);
    });

    it("should use custom param name", () => {
      setupFilterStatePersistence(mockApi as GridApi, {
        paramName: "customFilter",
      });

      const filterChangedCallback = vi.mocked(mockApi.addEventListener!).mock
        .calls[0][1];
      vi.mocked(mockApi.getFilterModel!).mockReturnValue({
        date: { type: "equals" },
      });
      filterChangedCallback({} as FilterChangedEvent);

      expect(mockPushState).toHaveBeenCalled();
      const [, , url] = mockPushState.mock.calls[0];
      expect(url).toContain("customFilter=");
    });
  });
});

// Create new test file for gridStateUtils
// File: src/utils/gridStateUtils.test.ts
