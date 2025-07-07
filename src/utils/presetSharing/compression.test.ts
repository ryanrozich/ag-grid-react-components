import { describe, it, expect } from "vitest";
import { compress, decompress } from "./compression";

describe("compression", () => {
  describe("compress", () => {
    it("should compress a simple string", () => {
      const input = "Hello, World!";
      const compressed = compress(input);

      expect(compressed).toBeDefined();
      expect(compressed.length).toBeLessThan(input.length * 2); // Base64 encoding can make small strings larger
      expect(compressed).not.toBe(input);
    });

    it("should compress JSON data", () => {
      const data = {
        id: "preset-123",
        name: "Q4 Sales Analysis",
        filters: {
          date: {
            type: "inRange",
            dateFrom: "2024-01-01",
            dateTo: "2024-03-31",
          },
          amount: { type: "greaterThan", value: 1000 },
        },
      };
      const input = JSON.stringify(data);
      const compressed = compress(input);

      expect(compressed).toBeDefined();
      expect(compressed).not.toContain('"id"');
      expect(compressed).not.toContain('"name"');
    });

    it("should significantly reduce size for large data", () => {
      const largeData = {
        presets: Array(50)
          .fill(null)
          .map((_, i) => ({
            id: `preset-${i}`,
            name: `Preset ${i}`,
            description:
              "This is a long description that repeats for each preset to simulate real data",
            filters: {
              date: {
                type: "inRange",
                dateFrom: "2024-01-01",
                dateTo: "2024-12-31",
              },
              status: { type: "equals", value: "active" },
              category: { type: "contains", value: "sales" },
            },
          })),
      };
      const input = JSON.stringify(largeData);
      const compressed = compress(input);

      expect(compressed.length).toBeLessThan(input.length * 0.5); // Should achieve >50% compression
    });

    it("should handle empty strings", () => {
      const compressed = compress("");
      expect(compressed).toBeDefined();
      expect(compressed).toBe("");
    });

    it("should handle special characters and unicode", () => {
      const input = "Special chars: !@#$%^&*() Unicode: 你好世界 🎉";
      const compressed = compress(input);
      expect(compressed).toBeDefined();
    });

    it("should produce URL-safe output", () => {
      const input = JSON.stringify({
        test: "data with spaces and/slashes+plus",
      });
      const compressed = compress(input);

      // URL-safe base64 should not contain +, /, or =
      expect(compressed).not.toMatch(/[+/=]/);
    });
  });

  describe("decompress", () => {
    it("should decompress back to original string", () => {
      const original = "Hello, World!";
      const compressed = compress(original);
      const decompressed = decompress(compressed);

      expect(decompressed).toBe(original);
    });

    it("should decompress JSON data correctly", () => {
      const data = {
        id: "preset-123",
        name: "Q4 Sales Analysis",
        filters: {
          date: {
            type: "inRange",
            dateFrom: "2024-01-01",
            dateTo: "2024-03-31",
          },
          amount: { type: "greaterThan", value: 1000 },
        },
        tags: ["sales", "q4", "analysis"],
      };
      const original = JSON.stringify(data);
      const compressed = compress(original);
      const decompressed = decompress(compressed);

      expect(decompressed).toBe(original);
      expect(JSON.parse(decompressed)).toEqual(data);
    });

    it("should handle empty strings", () => {
      const compressed = compress("");
      const decompressed = decompress(compressed);
      expect(decompressed).toBe("");
    });

    it("should handle special characters correctly", () => {
      const original = "Special chars: !@#$%^&*() Unicode: 你好世界 🎉";
      const compressed = compress(original);
      const decompressed = decompress(compressed);

      expect(decompressed).toBe(original);
    });

    it("should throw error for invalid compressed data", () => {
      expect(() => decompress("invalid-data")).toThrow();
    });

    it("should handle malformed base64", () => {
      expect(() => decompress("!!!invalid!!!")).toThrow();
    });
  });

  describe("round-trip compression", () => {
    it("should maintain data integrity through multiple compressions", () => {
      const original = JSON.stringify({
        complex: {
          nested: {
            data: ["with", "arrays", 123, true, null],
          },
        },
      });

      let data = original;
      for (let i = 0; i < 5; i++) {
        data = decompress(compress(data));
      }

      expect(data).toBe(original);
    });

    it("should handle large preset data", () => {
      const preset = {
        id: "complex-preset",
        name: "Complex Filter Preset",
        description: "A preset with many filters and complex configuration",
        gridState: {
          filters: {
            date: {
              type: "inRange",
              dateFrom: "2024-01-01",
              dateTo: "2024-12-31",
            },
            status: { type: "equals", value: "active" },
            category: { type: "contains", value: "sales" },
            amount: { type: "greaterThan", value: 1000 },
            region: { type: "notEquals", value: "excluded" },
          },
          sort: [
            { colId: "date", sort: "desc" },
            { colId: "amount", sort: "asc" },
          ],
          columns: {
            date: { width: 150, pinned: "left" },
            amount: { width: 120 },
            status: { width: 100 },
          },
        },
        tags: ["sales", "yearly", "active", "filtered"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const original = JSON.stringify(preset);
      const compressed = compress(original);
      const decompressed = decompress(compressed);

      expect(JSON.parse(decompressed)).toEqual(preset);
      expect(compressed.length).toBeLessThan(original.length);
    });
  });

  describe("compression performance", () => {
    it("should compress within reasonable time for typical data", () => {
      const data = JSON.stringify({
        presets: Array(10)
          .fill(null)
          .map((_, i) => ({
            id: `preset-${i}`,
            name: `Preset ${i}`,
            filters: { date: { type: "equals", value: "2024-01-01" } },
          })),
      });

      const start = performance.now();
      compress(data);
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(50); // Should compress in under 50ms
    });

    it("should decompress within reasonable time", () => {
      const data = JSON.stringify({
        presets: Array(10)
          .fill(null)
          .map((_, i) => ({
            id: `preset-${i}`,
            name: `Preset ${i}`,
            filters: { date: { type: "equals", value: "2024-01-01" } },
          })),
      });
      const compressed = compress(data);

      const start = performance.now();
      decompress(compressed);
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(50); // Should decompress in under 50ms
    });
  });
});
