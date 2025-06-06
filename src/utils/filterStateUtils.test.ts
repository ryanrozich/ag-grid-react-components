import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  serializeFilterModel,
  deserializeFilterModel,
  setupFilterStatePersistence,
} from "./filterStateUtils";
import type { GridApi } from "ag-grid-community";

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

      const serialized = serializeFilterModel(model) as any;
      
      expect(serialized.column1.dateFrom).toBe("2024-01-15T12:00:00.000Z");
      expect(serialized.column1.dateTo).toBeNull();
      expect(serialized.column1.fromInclusive).toBe(false);
      expect(serialized.column1.toInclusive).toBe(false);
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

      const serialized = serializeFilterModel(model) as any;
      
      expect(serialized.column1.dateFrom).toBe("2024-01-15T12:00:00.000Z");
      expect(serialized.column1.dateTo).toBe("2024-01-20T12:00:00.000Z");
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
      expect(serializeFilterModel(null as any)).toEqual(null);
      expect(serializeFilterModel(undefined as any)).toEqual(undefined);
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

      const serialized = serializeFilterModel(model) as any;
      
      expect(serialized.column1.fromInclusive).toBe(true);
      expect(serialized.column1.toInclusive).toBe(true);
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

      const deserialized = deserializeFilterModel(model) as any;
      
      expect(deserialized.column1.dateFrom).toBeInstanceOf(Date);
      expect(deserialized.column1.dateFrom.toISOString()).toBe("2024-01-15T12:00:00.000Z");
      expect(deserialized.column1.dateTo).toBeNull();
    });

    it("should handle multiple date fields", () => {
      const model = {
        column1: {
          type: "inRange",
          dateFrom: "2024-01-15T12:00:00.000Z",
          dateTo: "2024-01-20T12:00:00.000Z",
        },
      };

      const deserialized = deserializeFilterModel(model) as any;
      
      expect(deserialized.column1.dateFrom).toBeInstanceOf(Date);
      expect(deserialized.column1.dateTo).toBeInstanceOf(Date);
      expect(deserialized.column1.dateFrom.toISOString()).toBe("2024-01-15T12:00:00.000Z");
      expect(deserialized.column1.dateTo.toISOString()).toBe("2024-01-20T12:00:00.000Z");
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
      
      expect(deserialized).toEqual(model);
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

      const deserialized = deserializeFilterModel(model) as any;
      
      // Only dateFrom and dateTo should be converted
      expect(deserialized.column1.dateFrom).toBeInstanceOf(Date);
      expect(deserialized.column1.dateTo).toBeInstanceOf(Date);
      expect(deserialized.column1.otherDate).toBe("2024-01-25T12:00:00.000Z");
      expect(deserialized.column1.filter).toBe("2024-01-30T12:00:00.000Z");
    });

    it("should handle empty and null models", () => {
      expect(deserializeFilterModel({})).toEqual({});
      expect(deserializeFilterModel(null as any)).toEqual(null);
      expect(deserializeFilterModel(undefined as any)).toEqual(undefined);
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
      
      expect(mockApi.addEventListener).toHaveBeenCalledWith("filterChanged", expect.any(Function));
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
      Object.defineProperty(window, 'location', {
        value: {
          ...originalLocation,
          href: mockHref,
          search: `?filter=${encodedFilter}`,
        },
        writable: true,
      });

      setupFilterStatePersistence(mockApi as GridApi);
      
      expect(mockApi.setFilterModel).toHaveBeenCalledWith({
        date: {
          type: "equals",
          dateFrom: expect.any(Date),
        },
      });
      
      // Restore location
      Object.defineProperty(window, 'location', {
        value: originalLocation,
        writable: true,
      });
    });

    it("should update URL when filters change", () => {
      const cleanup = setupFilterStatePersistence(mockApi as GridApi);
      
      // Get the filterChanged callback
      const filterChangedCallback = (mockApi.addEventListener as any).mock.calls[0][1];
      
      // Simulate filter change
      const newFilterModel = {
        date: {
          type: "equals",
          dateFrom: new Date("2024-01-15T12:00:00Z"),
        },
      };
      (mockApi.getFilterModel as any).mockReturnValue(newFilterModel);
      
      filterChangedCallback();
      
      // Should update URL with serialized filter
      expect(mockPushState).toHaveBeenCalled();
      const [, , url] = mockPushState.mock.calls[0];
      expect(url).toContain("filter=");
    });

    it("should clear URL params when filters are cleared", () => {
      // Mock location with existing params
      const mockHref = "http://localhost:3000/?filter=test&other=param";
      Object.defineProperty(window, 'location', {
        value: {
          ...originalLocation,
          href: mockHref,
          search: "?filter=test&other=param",
        },
        writable: true,
      });
      
      const cleanup = setupFilterStatePersistence(mockApi as GridApi);
      
      const filterChangedCallback = (mockApi.addEventListener as any).mock.calls[0][1];
      
      // Simulate clearing filters
      (mockApi.getFilterModel as any).mockReturnValue({});
      filterChangedCallback();
      
      // Should remove filter param but keep other params
      expect(mockPushState).toHaveBeenCalled();
      const [, , url] = mockPushState.mock.calls[0];
      expect(url).toContain("other=param");
      expect(url).not.toContain("filter=");
      
      // Restore location
      Object.defineProperty(window, 'location', {
        value: originalLocation,
        writable: true,
      });
    });

    it("should handle popstate events", () => {
      const cleanup = setupFilterStatePersistence(mockApi as GridApi);
      
      // Simulate browser back button with filter in URL
      const filterModel = {
        date: { type: "equals", value: "test" },
      };
      const encodedFilter = encodeURIComponent(JSON.stringify(filterModel));
      
      // Mock location with filter parameter for popstate event
      const mockHref = `http://localhost:3000/?filter=${encodedFilter}`;
      Object.defineProperty(window, 'location', {
        value: {
          ...originalLocation,
          href: mockHref,
          search: `?filter=${encodedFilter}`,
        },
        writable: true,
      });
      
      window.dispatchEvent(new PopStateEvent("popstate"));
      
      expect(mockApi.setFilterModel).toHaveBeenCalledWith(filterModel);
      
      // Restore location
      Object.defineProperty(window, 'location', {
        value: originalLocation,
        writable: true,
      });
    });

    it("should cleanup event listeners when cleanup function is called", () => {
      const cleanup = setupFilterStatePersistence(mockApi as GridApi);
      
      cleanup();
      
      expect(mockApi.removeEventListener).toHaveBeenCalledWith("filterChanged", expect.any(Function));
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
      const cleanup = setupFilterStatePersistence(mockApi as GridApi);
      const filterChangedCallback = (mockApi.addEventListener as any).mock.calls[0][1];
      
      // Create a circular reference that can't be serialized
      const circularModel: any = { date: {} };
      circularModel.date.circular = circularModel;
      (mockApi.getFilterModel as any).mockReturnValue(circularModel);
      
      // This will throw due to circular reference in JSON.stringify
      expect(() => {
        filterChangedCallback();
      }).toThrow();
    });

    it("should handle callback options", () => {
      const onFilterLoad = vi.fn();
      const onFilterSave = vi.fn();
      
      const cleanup = setupFilterStatePersistence(mockApi as GridApi, {
        onFilterLoad,
        onFilterSave,
      });
      
      // Should call onFilterLoad with empty model initially
      expect(onFilterLoad).toHaveBeenCalledWith({});
      
      // Trigger filter change
      const filterChangedCallback = (mockApi.addEventListener as any).mock.calls[0][1];
      const newFilterModel = { date: { type: "equals" } };
      (mockApi.getFilterModel as any).mockReturnValue(newFilterModel);
      filterChangedCallback();
      
      // Should call onFilterSave
      expect(onFilterSave).toHaveBeenCalledWith(newFilterModel);
    });

    it("should use custom param name", () => {
      const cleanup = setupFilterStatePersistence(mockApi as GridApi, {
        paramName: "customFilter",
      });
      
      const filterChangedCallback = (mockApi.addEventListener as any).mock.calls[0][1];
      (mockApi.getFilterModel as any).mockReturnValue({ date: { type: "equals" } });
      filterChangedCallback();
      
      expect(mockPushState).toHaveBeenCalled();
      const [, , url] = mockPushState.mock.calls[0];
      expect(url).toContain("customFilter=");
    });
  });
});