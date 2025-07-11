import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  exportPresets,
  importPresets,
  validateImportData,
  generateExportFilename,
} from "./importExport";
import type { FilterPreset, PresetExportFormat } from "./types";

describe("importExport", () => {
  const mockPresets: FilterPreset[] = [
    {
      id: "preset-1",
      name: "Sales Q4",
      description: "Q4 sales filters",
      tags: ["sales", "q4"],
      gridState: {
        filters: {
          date: {
            type: "inRange",
            dateFrom: "2024-10-01",
            dateTo: "2024-12-31",
          },
          status: { type: "equals", value: "active" },
        },
      },
      createdAt: "2024-01-01T10:00:00Z",
    },
    {
      id: "preset-2",
      name: "Active Customers",
      gridState: {
        filters: {
          status: { type: "equals", value: "active" },
          lastOrder: { type: "after", dateFrom: "2024-01-01" },
        },
      },
      createdAt: "2024-01-02T10:00:00Z",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-20T10:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("exportPresets", () => {
    it("should export presets in correct format", () => {
      const result = exportPresets(mockPresets);

      expect(result.version).toBe("1.0.0");
      expect(result.exportDate).toBe("2024-01-20T10:00:00.000Z");
      expect(result.source).toBe("ag-grid-react-components");
      expect(result.presets).toHaveLength(2);
      expect(result.presets).toEqual(mockPresets);
    });

    it("should handle empty preset array", () => {
      const result = exportPresets([]);

      expect(result.version).toBe("1.0.0");
      expect(result.presets).toHaveLength(0);
    });

    it("should export single preset", () => {
      const result = exportPresets([mockPresets[0]]);

      expect(result.presets).toHaveLength(1);
      expect(result.presets[0]).toEqual(mockPresets[0]);
    });

    it("should create JSON string for download", () => {
      const result = exportPresets(mockPresets);
      const jsonString = JSON.stringify(result, null, 2);

      expect(jsonString).toContain('"version": "1.0.0"');
      expect(jsonString).toContain('"Sales Q4"');
      expect(() => JSON.parse(jsonString)).not.toThrow();
    });
  });

  describe("importPresets", () => {
    const validExportData: PresetExportFormat = {
      version: "1.0.0",
      exportDate: "2024-01-15T10:00:00Z",
      source: "ag-grid-react-components",
      presets: mockPresets,
    };

    describe("replace mode", () => {
      it("should replace all existing presets", () => {
        const existingPresets: FilterPreset[] = [
          {
            id: "existing-1",
            name: "Existing Preset",
            gridState: {},
            createdAt: "2023-01-01T00:00:00Z",
          },
        ];

        const result = importPresets(
          validExportData,
          existingPresets,
          "replace",
        );

        expect(result.imported).toHaveLength(2);
        // Check that presets have updatedAt added
        expect(result.imported[0].id).toBe(mockPresets[0].id);
        expect(result.imported[0].name).toBe(mockPresets[0].name);
        expect(result.imported[0].updatedAt).toBe("2024-01-20T10:00:00.000Z");
        expect(result.skipped).toHaveLength(0);
        expect(result.errors).toHaveLength(0);
      });
    });

    describe("merge mode", () => {
      it("should merge with existing presets, skipping duplicates", () => {
        const existingPresets: FilterPreset[] = [
          mockPresets[0], // Duplicate
          {
            id: "existing-1",
            name: "Existing Preset",
            gridState: {},
            createdAt: "2023-01-01T00:00:00Z",
          },
        ];

        const result = importPresets(validExportData, existingPresets, "merge");

        expect(result.imported).toHaveLength(1);
        expect(result.imported[0].id).toBe("preset-2");
        expect(result.skipped).toHaveLength(1);
        expect(result.skipped[0].id).toBe("preset-1");
        expect(result.errors).toHaveLength(0);
      });

      it("should handle name conflicts by renaming", () => {
        const existingPresets: FilterPreset[] = [
          {
            id: "different-id",
            name: "Sales Q4", // Same name as preset-1
            gridState: {},
            createdAt: "2023-01-01T00:00:00Z",
          },
        ];

        const result = importPresets(validExportData, existingPresets, "merge");

        expect(result.imported).toHaveLength(2);
        // First preset should be renamed
        expect(result.imported[0].name).toBe("Sales Q4 (imported)");
        expect(result.imported[1].name).toBe("Active Customers");
      });
    });

    describe("add mode", () => {
      it("should add all presets with new IDs", () => {
        const existingPresets: FilterPreset[] = [mockPresets[0]];

        const result = importPresets(validExportData, existingPresets, "add");

        expect(result.imported).toHaveLength(2);
        // All imported presets should have new IDs
        expect(result.imported[0].id).not.toBe("preset-1");
        expect(result.imported[1].id).not.toBe("preset-2");
        expect(result.imported[0].id).toMatch(/^preset-/);
        expect(result.errors).toHaveLength(0);
      });

      it("should handle name conflicts in add mode", () => {
        const existingPresets: FilterPreset[] = [
          {
            id: "existing",
            name: "Sales Q4",
            gridState: {},
            createdAt: "2023-01-01T00:00:00Z",
          },
        ];

        const result = importPresets(validExportData, existingPresets, "add");

        expect(result.imported[0].name).toBe("Sales Q4 (1)");
        expect(result.imported[1].name).toBe("Active Customers");
      });
    });

    it("should handle invalid preset data", () => {
      const invalidData: PresetExportFormat = {
        ...validExportData,
        presets: [
          ...mockPresets,
          { name: "Invalid - missing required fields" } as any,
        ],
      };

      const result = importPresets(invalidData, [], "replace");

      expect(result.imported).toHaveLength(2); // Valid presets should still import
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].error).toContain("Invalid preset at index 2");
    });

    it("should generate new timestamps for imported presets", () => {
      const result = importPresets(validExportData, [], "replace");

      result.imported.forEach((preset) => {
        expect(preset.updatedAt).toBe("2024-01-20T10:00:00.000Z");
      });
    });
  });

  describe("validateImportData", () => {
    it("should validate correct export format", () => {
      const validData: PresetExportFormat = {
        version: "1.0.0",
        exportDate: "2024-01-15T10:00:00Z",
        source: "ag-grid-react-components",
        presets: mockPresets,
      };

      const result = validateImportData(validData);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject data without version", () => {
      const invalidData = {
        exportDate: "2024-01-15T10:00:00Z",
        source: "ag-grid-react-components",
        presets: mockPresets,
      };

      const result = validateImportData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Missing required field: version");
    });

    it("should reject data without presets array", () => {
      const invalidData = {
        version: "1.0.0",
        exportDate: "2024-01-15T10:00:00Z",
        source: "ag-grid-react-components",
      };

      const result = validateImportData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Missing required field: presets");
    });

    it("should handle unsupported version gracefully", () => {
      const futureVersion = {
        version: "2.0.0",
        exportDate: "2024-01-15T10:00:00Z",
        source: "ag-grid-react-components",
        presets: mockPresets,
      };

      const result = validateImportData(futureVersion);

      expect(result.isValid).toBe(true); // Should still work
      expect(result.errors).toHaveLength(0);
      // Could add a warning about version mismatch
    });

    it("should not validate individual presets during import data validation", () => {
      const dataWithInvalidPreset = {
        version: "1.0.0",
        exportDate: "2024-01-15T10:00:00Z",
        source: "ag-grid-react-components",
        presets: [mockPresets[0], { invalid: "preset" }],
      };

      const result = validateImportData(dataWithInvalidPreset);

      // Should be valid at the structure level
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject non-object data", () => {
      const result = validateImportData("not an object" as any);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Import data must be an object");
    });

    it("should reject null data", () => {
      const result = validateImportData(null as any);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Import data must be an object");
    });
  });

  describe("generateExportFilename", () => {
    it("should generate filename with timestamp", () => {
      const filename = generateExportFilename();

      expect(filename).toBe("filter-presets-2024-01-20-10-00-00.json");
    });

    it("should include preset count if provided", () => {
      const filename = generateExportFilename(5);

      expect(filename).toBe(
        "filter-presets-2024-01-20-10-00-00-5-presets.json",
      );
    });

    it("should handle single preset", () => {
      const filename = generateExportFilename(1);

      expect(filename).toBe("filter-presets-2024-01-20-10-00-00-1-preset.json");
    });
  });

  describe("file operations", () => {
    it("should create downloadable blob", () => {
      const exportData = exportPresets(mockPresets);
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });

      expect(blob.type).toBe("application/json");
      expect(blob.size).toBeGreaterThan(0);
    });

    it("should handle file reading", async () => {
      const exportData = exportPresets(mockPresets);
      const content = JSON.stringify(exportData);

      // Mock File object with text method
      const file = {
        name: "test.json",
        type: "application/json",
        text: vi.fn().mockResolvedValue(content),
      } as unknown as File;

      const { readImportFile } = await import("./importExport");
      const result = await readImportFile(file);

      expect(result.error).toBeUndefined();
      expect(result.data).toEqual(exportData);
    });
  });
});
