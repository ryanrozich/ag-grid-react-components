import { expect } from "vitest";
import { describe, it, vi, beforeEach, afterEach } from "vitest";
import {
  parseDateExpression,
  isValidDateExpression,
  resolveDateExpression,
} from "./dateExpressionParser";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  subDays,
  subMonths,
  subWeeks,
  subYears,
  startOfDay,
} from "date-fns";

describe("dateExpressionParser", () => {
  // Mock date to ensure consistent testing
  const mockDate = new Date("2023-01-01T00:00:00Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("parseDateExpression", () => {
    it("should handle empty expressions", () => {
      expect(parseDateExpression("")).toEqual({
        isValid: false,
        resolvedDate: null,
        error: "Expression cannot be empty",
      });
    });

    it('should handle "Today" expression', () => {
      const today = startOfDay(new Date());
      const result = parseDateExpression("Today");

      expect(result.isValid).toBe(true);
      expect(result.resolvedDate?.getTime()).toBe(today.getTime());
    });

    it('should handle "today" case insensitive', () => {
      const today = startOfDay(new Date());
      const result = parseDateExpression("today");

      expect(result.isValid).toBe(true);
      expect(result.resolvedDate?.getTime()).toBe(today.getTime());
    });

    it('should handle "Today+Nd" expression', () => {
      const today = startOfDay(new Date());
      const expected = addDays(today, 7);
      const result = parseDateExpression("Today+7d");

      expect(result.isValid).toBe(true);
      expect(result.resolvedDate?.getTime()).toBe(expected.getTime());
    });

    it('should handle "Today-Nd" expression', () => {
      const today = startOfDay(new Date());
      const expected = subDays(today, 3);
      const result = parseDateExpression("Today-3d");

      expect(result.isValid).toBe(true);
      expect(result.resolvedDate?.getTime()).toBe(expected.getTime());
    });

    it("should handle weeks", () => {
      const today = startOfDay(new Date());
      const resultAdd = parseDateExpression("Today+2w");
      const resultSub = parseDateExpression("Today-1w");

      expect(resultAdd.isValid).toBe(true);
      expect(resultAdd.resolvedDate?.getTime()).toBe(
        addWeeks(today, 2).getTime(),
      );

      expect(resultSub.isValid).toBe(true);
      expect(resultSub.resolvedDate?.getTime()).toBe(
        subWeeks(today, 1).getTime(),
      );
    });

    it("should handle months", () => {
      const today = startOfDay(new Date());
      const resultAdd = parseDateExpression("Today+3m");
      const resultSub = parseDateExpression("Today-6m");

      expect(resultAdd.isValid).toBe(true);
      expect(resultAdd.resolvedDate?.getTime()).toBe(
        addMonths(today, 3).getTime(),
      );

      expect(resultSub.isValid).toBe(true);
      expect(resultSub.resolvedDate?.getTime()).toBe(
        subMonths(today, 6).getTime(),
      );
    });

    it("should handle years", () => {
      const today = startOfDay(new Date());
      const resultAdd = parseDateExpression("Today+1y");
      const resultSub = parseDateExpression("Today-2y");

      expect(resultAdd.isValid).toBe(true);
      expect(resultAdd.resolvedDate?.getTime()).toBe(
        addYears(today, 1).getTime(),
      );

      expect(resultSub.isValid).toBe(true);
      expect(resultSub.resolvedDate?.getTime()).toBe(
        subYears(today, 2).getTime(),
      );
    });

    it("should handle invalid formats", () => {
      expect(parseDateExpression("Tomorrow")).toEqual({
        isValid: false,
        resolvedDate: null,
        error:
          'Invalid format. Use "Today", "Today+Nd", "Today-Nd" (where N is a number and d=days, w=weeks, m=months, y=years)',
      });

      expect(parseDateExpression("Today+")).toEqual({
        isValid: false,
        resolvedDate: null,
        error:
          'Invalid format. Use "Today", "Today+Nd", "Today-Nd" (where N is a number and d=days, w=weeks, m=months, y=years)',
      });

      expect(parseDateExpression("Today+7")).toEqual({
        isValid: false,
        resolvedDate: null,
        error:
          'Invalid format. Use "Today", "Today+Nd", "Today-Nd" (where N is a number and d=days, w=weeks, m=months, y=years)',
      });
    });

    it("should handle invalid numeric values", () => {
      expect(parseDateExpression("Today+Xd")).toEqual({
        isValid: false,
        resolvedDate: null,
        error:
          'Invalid format. Use "Today", "Today+Nd", "Today-Nd" (where N is a number and d=days, w=weeks, m=months, y=years)',
      });
    });
  });

  describe("isValidDateExpression", () => {
    it("should return true for valid expressions", () => {
      expect(isValidDateExpression("Today")).toBe(true);
      expect(isValidDateExpression("Today+5d")).toBe(true);
      expect(isValidDateExpression("Today-2w")).toBe(true);
      expect(isValidDateExpression("Today+1m")).toBe(true);
      expect(isValidDateExpression("Today-10y")).toBe(true);
    });

    it("should return false for invalid expressions", () => {
      expect(isValidDateExpression("")).toBe(false);
      expect(isValidDateExpression("Tomorrow")).toBe(false);
      expect(isValidDateExpression("Today+5")).toBe(false);
      expect(isValidDateExpression("Today-")).toBe(false);
      expect(isValidDateExpression("Today+5x")).toBe(false);
    });
  });

  describe("resolveDateExpression", () => {
    it("should return the correct date for valid expressions", () => {
      const today = startOfDay(new Date());

      expect(resolveDateExpression("Today")?.getTime()).toBe(today.getTime());
      expect(resolveDateExpression("Today+5d")?.getTime()).toBe(
        addDays(today, 5).getTime(),
      );
      expect(resolveDateExpression("Today-2w")?.getTime()).toBe(
        subWeeks(today, 2).getTime(),
      );
    });

    it("should return null for invalid expressions", () => {
      expect(resolveDateExpression("")).toBeNull();
      expect(resolveDateExpression("Tomorrow")).toBeNull();
      expect(resolveDateExpression("Today+5")).toBeNull();
    });
  });
});
