import { describe, it, expect, vi, beforeEach } from "vitest";
import { serializeToUrl, createShareableUrl } from "./urlSerializer";
import type { FilterPreset, ShareOptions } from "./types";
import * as compression from "./compression";

// Mock the compression module
vi.mock("./compression", () => ({
  compress: vi.fn((data: string) => "cmprs_" + data.substring(0, 50)), // Simulate compression
  shouldCompress: vi.fn(() => true),
  getCompressionRatio: vi.fn(() => 75),
}));

describe("urlSerializer", () => {
  const mockPreset: FilterPreset = {
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

  describe("serializeToUrl", () => {
    it("should serialize preset in embedded mode with compression", () => {
      const options: ShareOptions = {
        mode: "embedded",
        compress: true,
      };

      const result = serializeToUrl(mockPreset, options);

      expect(result.compressed).toBe(true);
      expect(result.url).toContain("preset=cmprs_");
      expect(result.finalSize).toBeLessThan(result.originalSize);
      expect(compression.compress).toHaveBeenCalled();
    });

    it("should serialize preset in embedded mode without compression", () => {
      const options: ShareOptions = {
        mode: "embedded",
        compress: false,
      };

      const result = serializeToUrl(mockPreset, options);

      expect(result.compressed).toBe(false);
      expect(result.url).toContain("preset=");
      expect(result.url).not.toContain("cmprs_");
      expect(compression.compress).not.toHaveBeenCalled();
    });

    it("should serialize preset in reference mode", () => {
      const options: ShareOptions = {
        mode: "reference",
      };

      const result = serializeToUrl(mockPreset, options);

      expect(result.url).toBe("presetId=preset-123");
      expect(result.compressed).toBe(false);
      expect(result.finalSize).toBeLessThan(50); // Just the ID
    });

    it("should handle presets without optional fields", () => {
      const minimalPreset: FilterPreset = {
        id: "minimal",
        name: "Minimal Preset",
        gridState: {
          filters: {
            status: { type: "equals", value: "active" },
          },
        },
        createdAt: "2024-01-01T00:00:00Z",
      };

      const options: ShareOptions = {
        mode: "embedded",
        compress: true,
      };

      const result = serializeToUrl(minimalPreset, options);

      expect(result.url).toContain("preset=");
      expect(result.compressed).toBe(true);
    });

    it("should auto-compress large presets when compress is undefined", () => {
      vi.mocked(compression.shouldCompress).mockReturnValue(true);

      const options: ShareOptions = {
        mode: "embedded",
        // compress is undefined, should auto-detect
      };

      const result = serializeToUrl(mockPreset, options);

      expect(compression.shouldCompress).toHaveBeenCalled();
      expect(result.compressed).toBe(true);
    });

    it("should not compress when explicitly disabled", () => {
      vi.mocked(compression.shouldCompress).mockReturnValue(true);

      const options: ShareOptions = {
        mode: "embedded",
        compress: false,
      };

      const result = serializeToUrl(mockPreset, options);

      expect(compression.shouldCompress).not.toHaveBeenCalled();
      expect(result.compressed).toBe(false);
    });

    it("should encode special characters properly", () => {
      const presetWithSpecialChars: FilterPreset = {
        ...mockPreset,
        name: "Test & Special < > Characters",
        description: "Description with \"quotes\" and 'apostrophes'",
      };

      const options: ShareOptions = {
        mode: "embedded",
        compress: false,
      };

      const result = serializeToUrl(presetWithSpecialChars, options);

      expect(result.url).not.toContain("&");
      expect(result.url).not.toContain("<");
      expect(result.url).not.toContain(">");
      expect(result.url).toContain("preset=");

      // Should be properly encoded
      const params = new URLSearchParams(result.url);
      const encodedData = params.get("preset");
      expect(encodedData).toBeTruthy();
    });
  });

  describe("createShareableUrl", () => {
    it("should create a complete URL with base URL", () => {
      const options: ShareOptions = {
        mode: "reference",
        baseUrl: "https://app.example.com/dashboard",
      };

      const result = createShareableUrl(mockPreset, options);

      expect(result.url).toBe(
        "https://app.example.com/dashboard?presetId=preset-123",
      );
    });

    it("should append to existing query parameters", () => {
      const options: ShareOptions = {
        mode: "reference",
        baseUrl: "https://app.example.com/dashboard?tab=analysis&view=grid",
      };

      const result = createShareableUrl(mockPreset, options);

      expect(result.url).toBe(
        "https://app.example.com/dashboard?tab=analysis&view=grid&presetId=preset-123",
      );
    });

    it("should handle base URL with hash", () => {
      const options: ShareOptions = {
        mode: "reference",
        baseUrl: "https://app.example.com/dashboard#section",
      };

      const result = createShareableUrl(mockPreset, options);

      expect(result.url).toBe(
        "https://app.example.com/dashboard?presetId=preset-123#section",
      );
    });

    it("should use current location when no base URL provided", () => {
      // Mock window.location
      const originalLocation = window.location;
      delete (window as any).location;
      window.location = {
        href: "https://current.example.com/page",
        origin: "https://current.example.com",
        pathname: "/page",
        search: "",
        hash: "",
      } as any;

      const options: ShareOptions = {
        mode: "reference",
      };

      const result = createShareableUrl(mockPreset, options);

      expect(result.url).toBe(
        "https://current.example.com/page?presetId=preset-123",
      );

      // Restore
      window.location = originalLocation;
    });

    it("should handle very large presets with compression", () => {
      // Mock compress to return a reasonably short string for large data
      vi.mocked(compression.compress).mockImplementationOnce(
        () => "shortCompressedData123",
      );

      const largePreset: FilterPreset = {
        ...mockPreset,
        gridState: {
          filters: Object.fromEntries(
            Array(50)
              .fill(null)
              .map((_, i) => [
                `column${i}`,
                { type: "contains", value: `filter value ${i}` },
              ]),
          ),
        },
      };

      const options: ShareOptions = {
        mode: "embedded",
        baseUrl: "https://app.example.com",
        compress: true,
      };

      const result = createShareableUrl(largePreset, options);

      expect(result.compressed).toBe(true);
      expect(result.compressionRatio).toBeDefined();
      expect(result.url.length).toBeLessThan(2000); // Should fit in URL length limit
    });

    it("should validate URL length and warn if too long", () => {
      // Mock compression to return a very long string
      vi.mocked(compression.compress).mockReturnValue("x".repeat(3000));

      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const options: ShareOptions = {
        mode: "embedded",
        baseUrl: "https://app.example.com",
        compress: true,
      };

      const result = createShareableUrl(mockPreset, options);

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "[URLSerializer] Generated URL exceeds 2000 characters",
        ),
      );

      consoleSpy.mockRestore();
    });

    it("should strip unnecessary fields to reduce size", () => {
      const presetWithExtra = {
        ...mockPreset,
        _internalField: "should be removed",
        tempData: "should also be removed",
      };

      const options: ShareOptions = {
        mode: "embedded",
        compress: false,
      };

      const result = serializeToUrl(
        presetWithExtra as unknown as FilterPreset,
        options,
      );
      const params = new URLSearchParams(result.url);
      const data = params.get("preset");

      expect(data).toBeTruthy();
      expect(data).not.toContain("_internalField");
      expect(data).not.toContain("tempData");
    });
  });

  describe("URL format", () => {
    it("should use correct parameter names", () => {
      const embeddedResult = serializeToUrl(mockPreset, {
        mode: "embedded",
        compress: false,
      });
      expect(embeddedResult.url).toMatch(/^preset=/);

      const referenceResult = serializeToUrl(mockPreset, { mode: "reference" });
      expect(referenceResult.url).toMatch(/^presetId=/);
    });

    it("should produce valid URL-encoded strings", () => {
      const options: ShareOptions = {
        mode: "embedded",
        compress: false,
      };

      const result = serializeToUrl(mockPreset, options);

      // Should be able to parse as URL params
      const params = new URLSearchParams(result.url);
      const preset = params.get("preset");

      expect(preset).toBeTruthy();
      expect(() => JSON.parse(preset!)).not.toThrow();
    });
  });
});
