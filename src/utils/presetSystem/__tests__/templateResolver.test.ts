import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  resolveTemplate,
  resolveTemplateInGridState,
} from "../templateResolver";
import type { GridState } from "../../gridStateUtils";
import {
  startOfDay,
  subDays,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
} from "date-fns";

// Mock date to have a consistent "today"
const mockToday = new Date("2023-07-15T12:00:00Z");

describe("templateResolver", () => {
  const baseOptions = { baseDate: mockToday };

  // Helper to merge options with base options
  const withBaseOptions = (options?: any) => ({ ...baseOptions, ...options });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("resolveTemplate", () => {
    it("should resolve {{today}} to today's date", () => {
      const result = resolveTemplate("{{today}}", baseOptions);
      expect(result).toEqual(startOfDay(mockToday));
    });

    it("should resolve {{last7Days}} to 7 days ago", () => {
      const result = resolveTemplate("{{last7Days}}", baseOptions);
      expect(result).toEqual(startOfDay(subDays(mockToday, 7)));
    });

    it("should resolve {{startOfMonth}} to start of current month", () => {
      const result = resolveTemplate("{{startOfMonth}}", baseOptions);
      expect(result).toEqual(startOfMonth(mockToday));
    });

    it("should resolve {{endOfMonth}} to end of current month", () => {
      const result = resolveTemplate("{{endOfMonth}}", baseOptions);
      expect(result).toEqual(endOfMonth(mockToday));
    });

    it("should resolve {{startOfQuarter}} to start of current quarter", () => {
      const result = resolveTemplate("{{startOfQuarter}}", baseOptions);
      expect(result).toEqual(startOfQuarter(mockToday));
    });

    it("should resolve {{endOfQuarter}} to end of current quarter", () => {
      const result = resolveTemplate("{{endOfQuarter}}", baseOptions);
      expect(result).toEqual(endOfQuarter(mockToday));
    });

    it("should resolve {{startOfYear}} to start of current year", () => {
      const result = resolveTemplate("{{startOfYear}}", baseOptions);
      expect(result).toEqual(startOfYear(mockToday));
    });

    it("should resolve {{endOfYear}} to end of current year", () => {
      const result = resolveTemplate("{{endOfYear}}", baseOptions);
      expect(result).toEqual(endOfYear(mockToday));
    });

    it("should resolve {{currentUser}} when user is provided", () => {
      const result = resolveTemplate(
        "{{currentUser}}",
        withBaseOptions({
          currentUser: "john.doe",
        }),
      );
      expect(result).toBe("john.doe");
    });

    it("should return empty string for {{currentUser}} when no user is provided", () => {
      const result = resolveTemplate("{{currentUser}}", baseOptions);
      expect(result).toBe("");
    });

    it("should return original value if not a template", () => {
      const result = resolveTemplate("some regular value", baseOptions);
      expect(result).toBe("some regular value");
    });

    it("should return original value for unknown templates", () => {
      const result = resolveTemplate("{{unknownTemplate}}", baseOptions);
      expect(result).toBe("{{unknownTemplate}}");
    });

    it("should handle malformed templates", () => {
      expect(resolveTemplate("{{today", baseOptions)).toBe("{{today");
      expect(resolveTemplate("today}}", baseOptions)).toBe("today}}");
      expect(resolveTemplate("{today}", baseOptions)).toBe("{today}");
    });

    it("should handle custom date formats", () => {
      const result = resolveTemplate(
        "{{today}}",
        withBaseOptions({
          dateFormat: "yyyy-MM-dd",
        }),
      );
      expect(result).toBe("2023-07-15");
    });

    it("should handle relative date calculations", () => {
      const result = resolveTemplate("{{today-30}}", baseOptions);
      expect(result).toEqual(startOfDay(subDays(mockToday, 30)));
    });

    it("should handle future date calculations", () => {
      const result = resolveTemplate("{{today+7}}", baseOptions);
      expect(result).toEqual(startOfDay(subDays(mockToday, -7)));
    });

    it("should resolve nested templates in objects", () => {
      const obj = {
        startDate: "{{today-7}}",
        endDate: "{{today}}",
        user: "{{currentUser}}",
      };
      const result = resolveTemplate(
        obj,
        withBaseOptions({ currentUser: "jane.doe" }),
      );
      expect(result).toEqual({
        startDate: startOfDay(subDays(mockToday, 7)),
        endDate: startOfDay(mockToday),
        user: "jane.doe",
      });
    });

    it("should resolve templates in arrays", () => {
      const arr = ["{{today}}", "{{last7Days}}", "regular value"];
      const result = resolveTemplate(arr, baseOptions);
      expect(result).toEqual([
        startOfDay(mockToday),
        startOfDay(subDays(mockToday, 7)),
        "regular value",
      ]);
    });

    it("should handle null and undefined values", () => {
      expect(resolveTemplate(null, baseOptions)).toBe(null);
      expect(resolveTemplate(undefined, baseOptions)).toBe(undefined);
    });
  });

  describe("resolveTemplateInGridState", () => {
    it("should resolve templates in filter values", () => {
      const gridState: GridState = {
        filters: {
          dateColumn: {
            filterType: "date",
            type: "after",
            filter: "{{last7Days}}",
          },
          textColumn: {
            filterType: "text",
            type: "equals",
            filter: "{{currentUser}}",
          },
        },
      };

      const result = resolveTemplateInGridState(
        gridState,
        withBaseOptions({
          currentUser: "admin",
        }),
      );

      expect(result.filters?.dateColumn.filter).toEqual(
        startOfDay(subDays(mockToday, 7)),
      );
      expect(result.filters?.textColumn.filter).toBe("admin");
    });

    it("should resolve templates in date range filters", () => {
      const gridState: GridState = {
        filters: {
          dateRange: {
            filterType: "date",
            type: "inRange",
            dateFrom: "{{startOfMonth}}",
            dateTo: "{{endOfMonth}}",
          },
        },
      };

      const result = resolveTemplateInGridState(gridState, baseOptions);

      expect(result.filters?.dateRange.dateFrom).toEqual(
        startOfMonth(mockToday),
      );
      expect(result.filters?.dateRange.dateTo).toEqual(endOfMonth(mockToday));
    });

    it("should handle grid state without filters", () => {
      const gridState: GridState = {
        columns: [{ colId: "name", width: 200 }],
        sort: [{ colId: "name", sort: "asc" }],
      };

      const result = resolveTemplateInGridState(gridState, baseOptions);
      expect(result).toEqual(gridState);
    });

    it("should preserve non-template filter values", () => {
      const gridState: GridState = {
        filters: {
          status: {
            filterType: "text",
            type: "equals",
            filter: "active",
          },
          date: {
            filterType: "date",
            type: "before",
            filter: "{{today}}",
          },
        },
      };

      const result = resolveTemplateInGridState(gridState, baseOptions);

      expect(result.filters?.status.filter).toBe("active");
      expect(result.filters?.date.filter).toEqual(startOfDay(mockToday));
    });

    it("should handle complex nested filter structures", () => {
      const gridState: GridState = {
        filters: {
          combined: {
            filterType: "combined",
            operator: "AND",
            conditions: [
              {
                filterType: "date",
                type: "after",
                filter: "{{last7Days}}",
              },
              {
                filterType: "text",
                type: "contains",
                filter: "{{currentUser}}",
              },
            ],
          },
        },
      };

      const result = resolveTemplateInGridState(
        gridState,
        withBaseOptions({
          currentUser: "john",
        }),
      );

      const conditions = result.filters?.combined.conditions;
      expect(conditions[0].filter).toEqual(startOfDay(subDays(mockToday, 7)));
      expect(conditions[1].filter).toBe("john");
    });

    it("should return original grid state if resolution fails", () => {
      const gridState: GridState = {
        filters: {
          date: {
            filterType: "date",
            type: "equals",
            filter: "{{invalid}}",
          },
        },
      };

      const result = resolveTemplateInGridState(gridState, baseOptions);
      expect(result.filters?.date.filter).toBe("{{invalid}}");
    });

    it("should handle ISO date string templates", () => {
      const gridState: GridState = {
        filters: {
          dateColumn: {
            filterType: "date",
            type: "equals",
            filter: "{{today}}",
          },
        },
      };

      const result = resolveTemplateInGridState(
        gridState,
        withBaseOptions({
          dateFormat: "iso",
        }),
      );

      expect(result.filters?.dateColumn.filter).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
      );
    });
  });

  describe("Template Options", () => {
    it("should use custom template variables when provided", () => {
      const customVariables = {
        projectStart: new Date("2023-01-01"),
        projectEnd: new Date("2023-12-31"),
      };

      const result = resolveTemplate(
        "{{projectStart}}",
        withBaseOptions({
          customVariables,
        }),
      );

      expect(result).toEqual(customVariables.projectStart);
    });

    it("should prioritize custom variables over built-in ones", () => {
      const customVariables = {
        today: new Date("2020-01-01"),
      };

      const result = resolveTemplate(
        "{{today}}",
        withBaseOptions({
          customVariables,
        }),
      );

      expect(result).toEqual(customVariables.today);
    });

    it("should handle template functions", () => {
      const templateFunctions = {
        randomId: () => Math.random().toString(36).substr(2, 9),
      };

      const result = resolveTemplate(
        "{{randomId}}",
        withBaseOptions({
          templateFunctions,
        }),
      );

      expect(result).toMatch(/^[a-z0-9]{9}$/);
    });
  });
});
