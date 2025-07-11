import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  exportPreset,
  exportPresets,
  downloadJson,
  generateExportFilename,
  importPresets,
} from "./export";
import type { FilterPreset } from "../types";
import type { GridApi } from "ag-grid-community";

describe("Export utilities", () => {
  const mockApi = {
    getColumnState: vi.fn(() => [{ colId: "name", width: 200 }]),
  } as unknown as GridApi;

  const mockPreset: FilterPreset = {
    id: "test-123",
    name: "Test Preset",
    category: "Sales",
    filterModel: { status: { type: "equals", filter: "active" } },
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-02T00:00:00Z"),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("exportPreset", () => {
    it("should export a single preset with grid state", () => {
      const result = exportPreset(mockPreset, mockApi);

      expect(result).toMatchObject({
        version: "1.0.0",
        exportedAt: expect.any(String),
        preset: expect.objectContaining({
          id: "test-123",
          name: "Test Preset",
          category: "Sales",
          filterModel: { status: { type: "equals", filter: "active" } },
        }),
        gridState: {
          filterModel: { status: { type: "equals", filter: "active" } },
          columnState: [{ colId: "name", width: 200 }],
          sortModel: null,
        },
      });

      expect(mockApi.getColumnState).toHaveBeenCalled();
    });

    it("should handle presets with Date objects correctly", () => {
      const result = exportPreset(mockPreset, mockApi);

      expect(result.preset.createdAt).toBeInstanceOf(Date);
      expect(result.preset.updatedAt).toBeInstanceOf(Date);
    });

    it("should handle presets without updatedAt", () => {
      const presetWithoutUpdate = { ...mockPreset, updatedAt: undefined };
      const result = exportPreset(presetWithoutUpdate, mockApi);

      expect(result.preset.updatedAt).toBeUndefined();
    });
  });

  describe("exportPresets", () => {
    it("should export multiple presets", () => {
      const presets = [
        mockPreset,
        { ...mockPreset, id: "test-456", name: "Another Preset" },
      ];

      const result = exportPresets(presets, mockApi);

      expect(result).toMatchObject({
        version: "1.0.0",
        exportedAt: expect.any(String),
        presets: expect.arrayContaining([
          expect.objectContaining({
            preset: expect.objectContaining({ id: "test-123" }),
          }),
          expect.objectContaining({
            preset: expect.objectContaining({ id: "test-456" }),
          }),
        ]),
      });

      expect(result.presets).toHaveLength(2);
    });

    it("should handle empty presets array", () => {
      const result = exportPresets([], mockApi);

      expect(result.presets).toHaveLength(0);
    });
  });

  describe("generateExportFilename", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2024-01-15T14:30:45.123Z"));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should generate filename with preset name", () => {
      const filename = generateExportFilename("My Preset");
      expect(filename).toBe("filter-preset-my-preset-2024-01-15T14-30-45.json");
    });

    it("should generate filename without preset name", () => {
      const filename = generateExportFilename();
      expect(filename).toBe("filter-presets-2024-01-15T14-30-45.json");
    });

    it("should handle preset names with spaces", () => {
      const filename = generateExportFilename("Sales Report Q1");
      expect(filename).toBe(
        "filter-preset-sales-report-q1-2024-01-15T14-30-45.json",
      );
    });

    it("should handle preset names with special characters", () => {
      const filename = generateExportFilename("Sales & Marketing (2024)");
      expect(filename).toBe(
        "filter-preset-sales---marketing--2024--2024-01-15T14-30-45.json",
      );
    });
  });

  describe("downloadJson", () => {
    let createElementSpy: ReturnType<typeof vi.spyOn>;
    let appendChildSpy: ReturnType<typeof vi.spyOn>;
    let removeChildSpy: ReturnType<typeof vi.spyOn>;
    let clickSpy: ReturnType<typeof vi.fn>;
    let revokeObjectURLSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      clickSpy = vi.fn();
      createElementSpy = vi.spyOn(document, "createElement").mockReturnValue({
        click: clickSpy,
        href: "",
        download: "",
      } as unknown as HTMLElement);
      appendChildSpy = vi
        .spyOn(document.body, "appendChild")
        .mockImplementation(() => null as unknown as HTMLElement);
      removeChildSpy = vi
        .spyOn(document.body, "removeChild")
        .mockImplementation(() => null as unknown as HTMLElement);
      revokeObjectURLSpy = vi
        .spyOn(URL, "revokeObjectURL")
        .mockImplementation(() => {});
      vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:mock-url");
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should download JSON data as a file", () => {
      const data = { test: "data" };
      downloadJson(data, "test.json");

      expect(createElementSpy).toHaveBeenCalledWith("a");
      expect(appendChildSpy).toHaveBeenCalled();
      expect(clickSpy).toHaveBeenCalled();
      expect(removeChildSpy).toHaveBeenCalled();
      expect(revokeObjectURLSpy).toHaveBeenCalledWith("blob:mock-url");
    });

    it("should format JSON with proper indentation", () => {
      const data = { nested: { value: 123 } };
      let blobData: string = "";

      vi.spyOn(window, "Blob").mockImplementation((parts: BlobPart[]) => {
        blobData = parts[0] as string;
        return new Blob(parts);
      });

      downloadJson(data, "test.json");

      expect(blobData).toBe(JSON.stringify(data, null, 2));
    });
  });

  describe("importPresets", () => {
    it("should import a single preset from file", async () => {
      const exportData = {
        version: "1.0.0",
        exportedAt: "2024-01-01T00:00:00Z",
        preset: {
          ...mockPreset,
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-02T00:00:00Z",
        },
      };

      const file = new File([JSON.stringify(exportData)], "preset.json", {
        type: "application/json",
      });

      const result = await importPresets(file);

      expect(result).toMatchObject({
        version: "1.0.0",
        exportedAt: "2024-01-01T00:00:00Z",
        preset: expect.objectContaining({
          id: "test-123",
          name: "Test Preset",
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      });

      // Check dates are converted properly
      expect(result.preset.createdAt).toBeInstanceOf(Date);
      expect(result.preset.updatedAt).toBeInstanceOf(Date);
    });

    it("should import multiple presets from file", async () => {
      const exportData = {
        version: "1.0.0",
        exportedAt: "2024-01-01T00:00:00Z",
        presets: [
          {
            preset: {
              ...mockPreset,
              createdAt: "2024-01-01T00:00:00Z",
            },
          },
        ],
      };

      const file = new File([JSON.stringify(exportData)], "presets.json", {
        type: "application/json",
      });

      const result = await importPresets(file);

      expect("presets" in result).toBe(true);
      if ("presets" in result) {
        expect(result.presets).toHaveLength(1);
        expect(result.presets[0].preset.createdAt).toBeInstanceOf(Date);
      }
    });

    it("should reject invalid file format", async () => {
      const file = new File(["invalid json"], "preset.json", {
        type: "application/json",
      });

      await expect(importPresets(file)).rejects.toThrow(
        "Failed to parse preset file",
      );
    });

    it("should reject file without version", async () => {
      const file = new File(
        [JSON.stringify({ preset: mockPreset })],
        "preset.json",
        {
          type: "application/json",
        },
      );

      await expect(importPresets(file)).rejects.toThrow(
        "Invalid preset file format",
      );
    });

    it("should handle presets without updatedAt", async () => {
      const exportData = {
        version: "1.0.0",
        exportedAt: "2024-01-01T00:00:00Z",
        preset: {
          ...mockPreset,
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: null,
        },
      };

      const file = new File([JSON.stringify(exportData)], "preset.json", {
        type: "application/json",
      });

      const result = await importPresets(file);

      expect(result.preset.updatedAt).toBeUndefined();
    });
  });
});
