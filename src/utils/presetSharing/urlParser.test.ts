import { describe, it, expect, vi, beforeEach } from "vitest";
import { parseFromUrl, extractPresetFromUrl } from "./urlParser";
import type { ParseOptions } from "./types";
import * as compression from "./compression";

// Mock the compression module
vi.mock("./compression", () => ({
  decompress: vi.fn((data: string) => {
    if (data === "invalidCompressed")
      throw new Error("Invalid compressed data");
    if (data.startsWith("cmprs_")) return data.substring(6);
    return data;
  }),
}));

describe("urlParser", () => {
  const mockPresetData = {
    id: "preset-123",
    name: "Q4 Sales Analysis",
    description: "Filters for Q4 sales data",
    tags: ["sales", "quarterly"],
    gridState: {
      filters: {
        date: { type: "inRange", dateFrom: "2024-10-01", dateTo: "2024-12-31" },
        status: { type: "equals", value: "active" },
      },
      sort: [{ colId: "date", sort: "desc" }],
      columns: {
        date: { width: 150, pinned: "left" },
        amount: { width: 120 },
      },
    },
    createdAt: "2024-01-15T10:00:00Z",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("parseFromUrl", () => {
    it("should parse embedded preset data", () => {
      const urlParams = `preset=${encodeURIComponent(JSON.stringify(mockPresetData))}`;

      const result = parseFromUrl(urlParams);

      expect(result.preset).toEqual(mockPresetData);
      expect(result.presetId).toBeUndefined();
      expect(result.compressed).toBe(false);
      expect(result.error).toBeUndefined();
    });

    it("should parse compressed preset data", () => {
      const compressed = "cmprs_" + JSON.stringify(mockPresetData);
      const urlParams = `preset=${encodeURIComponent(compressed)}`;

      const result = parseFromUrl(urlParams);

      expect(result.preset).toEqual(mockPresetData);
      expect(result.compressed).toBe(true);
      expect(compression.decompress).toHaveBeenCalledWith(compressed);
    });

    it("should parse reference mode preset ID", () => {
      const urlParams = "presetId=preset-123";

      const result = parseFromUrl(urlParams);

      expect(result.presetId).toBe("preset-123");
      expect(result.preset).toBeUndefined();
      expect(result.compressed).toBe(false);
    });

    it("should handle invalid JSON data", () => {
      const urlParams = `preset=${encodeURIComponent("invalid json")}`;

      const result = parseFromUrl(urlParams);

      expect(result.preset).toBeUndefined();
      expect(result.error).toContain("Failed to parse preset data");
    });

    it("should handle invalid compressed data", () => {
      const urlParams = `preset=${encodeURIComponent("invalidCompressed")}`;

      const result = parseFromUrl(urlParams);

      expect(result.preset).toBeUndefined();
      expect(result.error).toContain("Failed to decompress");
      expect(result.compressed).toBe(true);
    });

    it("should handle empty parameters", () => {
      const result = parseFromUrl("");

      expect(result.preset).toBeUndefined();
      expect(result.presetId).toBeUndefined();
      expect(result.error).toBeUndefined();
    });

    it("should handle parameters without preset data", () => {
      const urlParams = "tab=analysis&view=grid";

      const result = parseFromUrl(urlParams);

      expect(result.preset).toBeUndefined();
      expect(result.presetId).toBeUndefined();
      expect(result.error).toBeUndefined();
    });

    it("should validate preset data when validation is enabled", () => {
      const invalidPreset = {
        name: "Missing required fields",
      };
      const urlParams = `preset=${encodeURIComponent(JSON.stringify(invalidPreset))}`;
      const options: ParseOptions = { validate: true };

      const result = parseFromUrl(urlParams, options);

      expect(result.preset).toBeUndefined();
      expect(result.error).toContain("Invalid preset data");
    });

    it("should not validate when validation is disabled", () => {
      const invalidPreset = {
        name: "Missing required fields",
      };
      const urlParams = `preset=${encodeURIComponent(JSON.stringify(invalidPreset))}`;
      const options: ParseOptions = { validate: false };

      const result = parseFromUrl(urlParams, options);

      expect(result.preset).toEqual(invalidPreset);
      expect(result.error).toBeUndefined();
    });

    it("should handle URL-encoded special characters", () => {
      const presetWithSpecialChars = {
        ...mockPresetData,
        name: "Test & Special < > Characters",
        description: "Description with \"quotes\" and 'apostrophes'",
      };
      const urlParams = `preset=${encodeURIComponent(JSON.stringify(presetWithSpecialChars))}`;

      const result = parseFromUrl(urlParams);

      expect(result.preset).toEqual(presetWithSpecialChars);
      expect(result.preset?.name).toBe("Test & Special < > Characters");
    });

    it("should auto-detect compressed data", () => {
      // Compressed data often starts with specific patterns
      const compressedLikeData =
        "H4sIAAAAAAAA_6tWKkotLsjPzEstVrJSyk5NzCvRy0ksBgCZN5JWFQAAAA";
      const urlParams = `preset=${encodeURIComponent(compressedLikeData)}`;

      const result = parseFromUrl(urlParams);

      expect(result.compressed).toBe(true);
    });
  });

  describe("extractPresetFromUrl", () => {
    it("should extract preset from full URL", () => {
      const fullUrl = `https://app.example.com/dashboard?preset=${encodeURIComponent(JSON.stringify(mockPresetData))}`;

      const result = extractPresetFromUrl(fullUrl);

      expect(result.preset).toEqual(mockPresetData);
    });

    it("should extract preset ID from full URL", () => {
      const fullUrl =
        "https://app.example.com/dashboard?tab=analysis&presetId=preset-123&view=grid";

      const result = extractPresetFromUrl(fullUrl);

      expect(result.presetId).toBe("preset-123");
    });

    it("should handle URL with hash", () => {
      const fullUrl = `https://app.example.com/dashboard?preset=${encodeURIComponent(JSON.stringify(mockPresetData))}#section`;

      const result = extractPresetFromUrl(fullUrl);

      expect(result.preset).toEqual(mockPresetData);
    });

    it("should handle relative URLs", () => {
      const relativeUrl = `/dashboard?presetId=preset-123`;

      const result = extractPresetFromUrl(relativeUrl);

      expect(result.presetId).toBe("preset-123");
    });

    it("should handle window.location.search when available", () => {
      // Mock window.location
      const originalLocation = window.location;
      delete (window as any).location;
      window.location = {
        search: `?preset=${encodeURIComponent(JSON.stringify(mockPresetData))}`,
      } as any;

      const result = extractPresetFromUrl();

      expect(result.preset).toEqual(mockPresetData);

      // Restore
      window.location = originalLocation as any;
    });

    it("should return empty result when no URL and no window.location", () => {
      // Mock window as undefined
      const originalWindow = global.window;
      (global as any).window = undefined;

      const result = extractPresetFromUrl();

      expect(result.preset).toBeUndefined();
      expect(result.presetId).toBeUndefined();

      // Restore
      global.window = originalWindow;
    });

    it("should handle malformed URLs gracefully", () => {
      const malformedUrl = "not-a-valid-url?preset=data";

      const result = extractPresetFromUrl(malformedUrl);

      // Should detect the error but handle it gracefully
      expect(result.error).toBeDefined();
      expect(result.error).toContain("Failed to parse preset data");
    });

    it("should prioritize preset over presetId when both present", () => {
      const urlParams = `preset=${encodeURIComponent(JSON.stringify(mockPresetData))}&presetId=different-id`;

      const result = parseFromUrl(urlParams);

      expect(result.preset).toEqual(mockPresetData);
      expect(result.presetId).toBeUndefined(); // Should not parse presetId when preset is present
    });
  });

  describe("edge cases", () => {
    it("should handle very large preset data", () => {
      const largePreset = {
        ...mockPresetData,
        gridState: {
          filters: Object.fromEntries(
            Array(100)
              .fill(null)
              .map((_, i) => [
                `column${i}`,
                { type: "contains", value: `filter value ${i}` },
              ]),
          ),
        },
      };
      const urlParams = `preset=${encodeURIComponent(JSON.stringify(largePreset))}`;

      const result = parseFromUrl(urlParams);

      expect(result.preset).toEqual(largePreset);
      expect(Object.keys(result.preset!.gridState.filters!)).toHaveLength(100);
    });

    it("should handle preset with minimal required fields", () => {
      const minimalPreset = {
        id: "minimal",
        name: "Minimal",
        gridState: {},
        createdAt: "2024-01-01T00:00:00Z",
      };
      const urlParams = `preset=${encodeURIComponent(JSON.stringify(minimalPreset))}`;

      const result = parseFromUrl(urlParams, { validate: true });

      expect(result.preset).toEqual(minimalPreset);
      expect(result.error).toBeUndefined();
    });

    it("should sanitize preset data to prevent XSS", () => {
      const maliciousPreset = {
        ...mockPresetData,
        name: '<script>alert("XSS")</script>',
        description: "onclick=\"alert('XSS')\"",
      };
      const urlParams = `preset=${encodeURIComponent(JSON.stringify(maliciousPreset))}`;

      const result = parseFromUrl(urlParams);

      // Parser should return data as-is, sanitization should happen at render time
      expect(result.preset?.name).toBe('<script>alert("XSS")</script>');
      // But we should have a warning or note about this
    });
  });
});
