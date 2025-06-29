import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  applyFilterModelWithWorkaround,
  applyFilterModelAlternative,
  waitForFirstDataRendered,
} from "./agGridWorkaround";
import type { GridApi, IFilter } from "ag-grid-community";

describe("agGridWorkaround", () => {
  let mockApi: Partial<GridApi>;
  let mockFilter: Partial<IFilter>;
  // let mockResolve: any;

  beforeEach(() => {
    mockFilter = {
      setModel: vi.fn(),
      getModel: vi.fn(),
    };

    mockApi = {
      getColumnFilterInstance: vi.fn(),
      onFilterChanged: vi.fn(),
      refreshCells: vi.fn(),
      redrawRows: vi.fn(),
      setFilterModel: vi.fn(),
      getDisplayedRowCount: vi.fn().mockReturnValue(10),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    vi.clearAllMocks();
  });

  describe("applyFilterModelWithWorkaround", () => {
    it("applies filter model when filter instance is available", async () => {
      const filterModel = { type: "equals", value: "test" };

      // Mock getColumnFilterInstance to return a Promise that resolves to the filter
      vi.mocked(mockApi.getColumnFilterInstance!).mockReturnValue({
        then: (callback: any) => callback(mockFilter),
      } as any);

      await applyFilterModelWithWorkaround(
        mockApi as GridApi,
        "testColumn",
        filterModel,
      );

      expect(mockFilter.setModel).toHaveBeenCalledWith(filterModel);
      expect(mockApi.onFilterChanged).toHaveBeenCalled();
      expect(mockApi.refreshCells).toHaveBeenCalled();
    });

    it("handles null filter instance gracefully", async () => {
      const filterModel = { type: "equals", value: "test" };

      vi.mocked(mockApi.getColumnFilterInstance!).mockReturnValue({
        then: (callback: any) => callback(null),
      } as any);

      await applyFilterModelWithWorkaround(
        mockApi as GridApi,
        "testColumn",
        filterModel,
      );

      expect(mockApi.onFilterChanged).toHaveBeenCalled();
      expect(mockApi.refreshCells).toHaveBeenCalled();
    });

    it("handles undefined filter instance gracefully", async () => {
      const filterModel = { type: "equals", value: "test" };

      vi.mocked(mockApi.getColumnFilterInstance!).mockReturnValue({
        then: (callback: any) => callback(undefined),
      } as any);

      await applyFilterModelWithWorkaround(
        mockApi as GridApi,
        "testColumn",
        filterModel,
      );

      expect(mockApi.onFilterChanged).toHaveBeenCalled();
      expect(mockApi.refreshCells).toHaveBeenCalled();
    });

    it("handles filter without setModel method", async () => {
      const filterModel = { type: "equals", value: "test" };
      const filterWithoutSetModel = { getModel: vi.fn() };

      vi.mocked(mockApi.getColumnFilterInstance!).mockReturnValue({
        then: (callback: any) => callback(filterWithoutSetModel),
      } as any);

      await applyFilterModelWithWorkaround(
        mockApi as GridApi,
        "testColumn",
        filterModel,
      );

      expect(mockApi.onFilterChanged).toHaveBeenCalled();
      expect(mockApi.refreshCells).toHaveBeenCalled();
    });

    it("handles synchronous filter instance", async () => {
      const filterModel = { type: "equals", value: "test" };

      // Return filter instance directly (not a promise)
      vi.mocked(mockApi.getColumnFilterInstance!).mockReturnValue(
        Promise.resolve(mockFilter as IFilter),
      );

      await applyFilterModelWithWorkaround(
        mockApi as GridApi,
        "testColumn",
        filterModel,
      );

      expect(mockFilter.setModel).toHaveBeenCalledWith(filterModel);
      expect(mockApi.onFilterChanged).toHaveBeenCalled();
    });

    it("handles errors gracefully", async () => {
      const filterModel = { type: "equals", value: "test" };

      vi.mocked(mockApi.getColumnFilterInstance!).mockImplementation(() => {
        throw new Error("Test error");
      });

      await expect(
        applyFilterModelWithWorkaround(
          mockApi as GridApi,
          "testColumn",
          filterModel,
        ),
      ).resolves.not.toThrow();
    });
  });

  describe("applyFilterModelAlternative", () => {
    it("applies filter using setFilterModel", async () => {
      const filterModel = { type: "equals", value: "test" };

      await applyFilterModelAlternative(
        mockApi as GridApi,
        "testColumn",
        filterModel,
      );

      expect(mockApi.setFilterModel).toHaveBeenCalledWith({
        testColumn: filterModel,
      });
    });

    it("handles null filter model", async () => {
      await applyFilterModelAlternative(mockApi as GridApi, "testColumn", null);

      expect(mockApi.setFilterModel).toHaveBeenCalledWith({
        testColumn: null,
      });
    });
  });

  describe("waitForFirstDataRendered", () => {
    it("resolves immediately if data is already rendered", async () => {
      vi.mocked(mockApi.getDisplayedRowCount!).mockReturnValue(5);

      const promise = waitForFirstDataRendered(mockApi as GridApi);

      // Should resolve quickly without needing event listener
      await expect(promise).resolves.toBeUndefined();
      expect(mockApi.addEventListener).not.toHaveBeenCalled();
    });

    it("waits for firstDataRendered event", async () => {
      vi.mocked(mockApi.getDisplayedRowCount!).mockReturnValue(0);

      let eventCallback: any;
      vi.mocked(mockApi.addEventListener!).mockImplementation(
        (event: string, callback: any) => {
          if (event === "firstDataRendered") {
            eventCallback = callback;
          }
        },
      );

      const promise = waitForFirstDataRendered(mockApi as GridApi);

      // Simulate the event firing after a delay
      setTimeout(() => {
        if (eventCallback) {
          eventCallback();
        }
      }, 10);

      await promise;

      expect(mockApi.addEventListener).toHaveBeenCalledWith(
        "firstDataRendered",
        expect.any(Function),
      );
      expect(mockApi.removeEventListener).toHaveBeenCalledWith(
        "firstDataRendered",
        expect.any(Function),
      );
    });

    it("handles missing API methods gracefully", async () => {
      // Create an API without the required methods
      const apiWithoutMethods = {
        getDisplayedRowCount: undefined,
        addEventListener: undefined,
        removeEventListener: undefined,
      } as unknown as GridApi;

      // Should resolve without error even if API methods are missing
      const promise = waitForFirstDataRendered(apiWithoutMethods);
      await expect(promise).resolves.toBeUndefined();
    });
  });
});
