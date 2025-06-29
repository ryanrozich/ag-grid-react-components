import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  applyQuickFilter,
  createClearFilterOption,
  getActiveFilterOption,
  DATE_FILTER_PRESETS,
} from "./filterModelBuilder";
import type { GridApi } from "ag-grid-community";
import type { QuickFilterOption } from "../types";

describe("filterModelBuilder", () => {
  const mockApi: Partial<GridApi> = {
    getFilterModel: vi.fn(),
    setFilterModel: vi.fn(),
    onFilterChanged: vi.fn(),
    getColumnFilterInstance: vi.fn(),
    refreshCells: vi.fn(),
    redrawRows: vi.fn(),
    getDisplayedRowCount: vi.fn().mockReturnValue(0),
  };

  describe("createClearFilterOption", () => {
    it("creates a clear filter option with default values", () => {
      const option = createClearFilterOption();
      expect(option).toEqual({
        id: "clear",
        label: "Clear Filter",
        description: "Remove all filters",
        icon: "🚫",
        filterModel: null,
      });
    });
  });

  describe("getActiveFilterOption", () => {
    it("returns null when API is not provided", () => {
      const options: QuickFilterOption[] = [
        { id: "test", label: "Test", filterModel: null },
      ];
      const result = getActiveFilterOption(null as any, "testColumn", options);
      expect(result).toBeNull();
    });

    it("returns clear option when no filter is applied", () => {
      vi.mocked(mockApi.getFilterModel!).mockReturnValue({});
      const options: QuickFilterOption[] = [
        { id: "clear", label: "All", filterModel: null },
        {
          id: "test",
          label: "Test",
          filterModel: { type: "equals", value: "test" },
        },
      ];
      const result = getActiveFilterOption(
        mockApi as GridApi,
        "testColumn",
        options,
      );
      expect(result).toEqual(options[0]);
    });

    it("returns matching option for applied filter", () => {
      const filterModel = {
        mode: "relative",
        type: "equals",
        expressionFrom: "Today",
      };
      vi.mocked(mockApi.getFilterModel!).mockReturnValue({
        dateColumn: filterModel,
      });
      const options: QuickFilterOption[] = [
        { id: "clear", label: "All", filterModel: null },
        {
          id: "today",
          label: "Today",
          filterModel: filterModel,
        },
      ];
      const result = getActiveFilterOption(
        mockApi as GridApi,
        "dateColumn",
        options,
      );
      expect(result).toEqual(options[1]);
    });

    it("returns null when no matching option is found", () => {
      vi.mocked(mockApi.getFilterModel!).mockReturnValue({
        dateColumn: { type: "equals", value: "unknown" },
      });
      const options: QuickFilterOption[] = [
        { id: "clear", label: "All", filterModel: null },
        {
          id: "test",
          label: "Test",
          filterModel: { type: "equals", value: "test" },
        },
      ];
      const result = getActiveFilterOption(
        mockApi as GridApi,
        "dateColumn",
        options,
      );
      expect(result).toBeNull();
    });
  });

  describe("applyQuickFilter", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("clears filter when option is null", async () => {
      vi.mocked(mockApi.getFilterModel!).mockReturnValue({
        dateColumn: { type: "equals", value: "test" },
      });

      await applyQuickFilter(mockApi as GridApi, "dateColumn", null);

      expect(mockApi.setFilterModel).toHaveBeenCalledWith({});
    });

    it("clears filter when option has null filterModel", async () => {
      vi.mocked(mockApi.getFilterModel!).mockReturnValue({
        dateColumn: { type: "equals", value: "test" },
        otherColumn: { type: "contains", value: "other" },
      });

      const clearOption: QuickFilterOption = {
        id: "clear",
        label: "All",
        filterModel: null,
      };

      await applyQuickFilter(mockApi as GridApi, "dateColumn", clearOption);

      expect(mockApi.setFilterModel).toHaveBeenCalledWith({
        otherColumn: { type: "contains", value: "other" },
      });
    });

    it("applies filter model from option", async () => {
      vi.mocked(mockApi.getFilterModel!).mockReturnValue({});

      const filterOption: QuickFilterOption = {
        id: "today",
        label: "Today",
        filterModel: {
          mode: "relative",
          type: "equals",
          expressionFrom: "Today",
        },
      };

      await applyQuickFilter(mockApi as GridApi, "dateColumn", filterOption);

      expect(mockApi.setFilterModel).toHaveBeenCalledWith({
        dateColumn: {
          mode: "relative",
          type: "equals",
          expressionFrom: "Today",
        },
      });
    });

    it("handles API errors gracefully", async () => {
      vi.mocked(mockApi.setFilterModel!).mockRejectedValue(
        new Error("API Error"),
      );

      const filterOption: QuickFilterOption = {
        id: "test",
        label: "Test",
        filterModel: { type: "equals", value: "test" },
      };

      // Should not throw
      await expect(
        applyQuickFilter(mockApi as GridApi, "dateColumn", filterOption),
      ).resolves.not.toThrow();
    });
  });

  describe("DATE_FILTER_PRESETS", () => {
    it("contains expected preset options", () => {
      expect(DATE_FILTER_PRESETS).toHaveLength(11);

      const presetIds = DATE_FILTER_PRESETS.map((p) => p.id);
      expect(presetIds).toContain("all");
      expect(presetIds).toContain("today");
      expect(presetIds).toContain("yesterday");
      expect(presetIds).toContain("this-week");
      expect(presetIds).toContain("last-week");
      expect(presetIds).toContain("this-month");
      expect(presetIds).toContain("last-month");
      expect(presetIds).toContain("last-7-days");
      expect(presetIds).toContain("last-30-days");
    });

    it("has correct filter models for presets", () => {
      const todayPreset = DATE_FILTER_PRESETS.find((p) => p.id === "today");
      expect(todayPreset?.filterModel).toEqual({
        mode: "relative",
        type: "equals",
        expressionFrom: "Today",
      });

      const thisWeekPreset = DATE_FILTER_PRESETS.find(
        (p) => p.id === "this-week",
      );
      expect(thisWeekPreset?.filterModel).toEqual({
        mode: "relative",
        type: "inRange",
        expressionFrom: "Today-6d",
        expressionTo: "Today+1d",
      });

      const allPreset = DATE_FILTER_PRESETS.find((p) => p.id === "all");
      expect(allPreset?.filterModel).toBeNull();
    });
  });
});
