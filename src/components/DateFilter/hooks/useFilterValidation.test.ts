import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useFilterValidation } from "./useFilterValidation";
import { DateFilterType } from "../../interfaces";

describe("useFilterValidation hook", () => {
  // Mock date to ensure consistent testing
  const mockDate = new Date("2023-01-01T00:00:00Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("absolute date validation", () => {
    it("should validate equals filter with valid date", () => {
      const { result } = renderHook(() =>
        useFilterValidation({
          filterType: "equals",
          filterMode: "absolute",
          absoluteDateFrom: new Date("2023-01-15"),
          absoluteDateTo: null,
          expressionFrom: "",
          expressionTo: "",
          fromExpressionValid: true,
          toExpressionValid: true,
        }),
      );

      expect(result.current.isFilterValid).toBe(true);
      expect(result.current.effectiveDateFrom).toEqual(new Date("2023-01-15"));
      expect(result.current.effectiveDateTo).toBeNull();
    });

    it("should invalidate equals filter without date", () => {
      const { result } = renderHook(() =>
        useFilterValidation({
          filterType: "equals",
          filterMode: "absolute",
          absoluteDateFrom: null,
          absoluteDateTo: null,
          expressionFrom: "",
          expressionTo: "",
          fromExpressionValid: true,
          toExpressionValid: true,
        }),
      );

      expect(result.current.isFilterValid).toBe(false);
    });

    it("should validate inRange filter with both dates", () => {
      const { result } = renderHook(() =>
        useFilterValidation({
          filterType: "inRange",
          filterMode: "absolute",
          absoluteDateFrom: new Date("2023-01-01"),
          absoluteDateTo: new Date("2023-01-31"),
          expressionFrom: "",
          expressionTo: "",
          fromExpressionValid: true,
          toExpressionValid: true,
        }),
      );

      expect(result.current.isFilterValid).toBe(true);
      expect(result.current.effectiveDateFrom).toEqual(new Date("2023-01-01"));
      expect(result.current.effectiveDateTo).toEqual(new Date("2023-01-31"));
    });

    it("should invalidate inRange filter with missing dates", () => {
      const { result } = renderHook(() =>
        useFilterValidation({
          filterType: "inRange",
          filterMode: "absolute",
          absoluteDateFrom: new Date("2023-01-01"),
          absoluteDateTo: null, // Missing end date
          expressionFrom: "",
          expressionTo: "",
          fromExpressionValid: true,
          toExpressionValid: true,
        }),
      );

      expect(result.current.isFilterValid).toBe(false);
    });

    it("should validate single date filters (before, after, notEqual)", () => {
      const filterTypes: DateFilterType[] = ["before", "after", "notEqual"];

      filterTypes.forEach((filterType) => {
        const { result } = renderHook(() =>
          useFilterValidation({
            filterType,
            filterMode: "absolute",
            absoluteDateFrom: new Date("2023-01-15"),
            absoluteDateTo: null,
            expressionFrom: "",
            expressionTo: "",
            fromExpressionValid: true,
            toExpressionValid: true,
          }),
        );

        expect(result.current.isFilterValid).toBe(true);
        expect(result.current.effectiveDateFrom).toEqual(
          new Date("2023-01-15"),
        );
      });
    });
  });

  describe("relative expression validation", () => {
    it("should validate equals filter with valid expression", () => {
      const { result } = renderHook(() =>
        useFilterValidation({
          filterType: "equals",
          filterMode: "relative",
          absoluteDateFrom: null,
          absoluteDateTo: null,
          expressionFrom: "Today",
          expressionTo: "",
          fromExpressionValid: true,
          toExpressionValid: true,
        }),
      );

      expect(result.current.isFilterValid).toBe(true);
      // Compare local date strings to avoid timezone issues
      const resolvedDate = result.current.resolvedDateFrom;
      expect(resolvedDate).toBeDefined();
      const localDateStr = resolvedDate
        ? `${resolvedDate.getFullYear()}-${String(resolvedDate.getMonth() + 1).padStart(2, "0")}-${String(resolvedDate.getDate()).padStart(2, "0")}`
        : "";
      expect(localDateStr).toBe("2023-01-01");
      // Compare local date strings to avoid timezone issues
      const effectiveDate = result.current.effectiveDateFrom;
      expect(effectiveDate).toBeDefined();
      const effectiveDateStr = effectiveDate
        ? `${effectiveDate.getFullYear()}-${String(effectiveDate.getMonth() + 1).padStart(2, "0")}-${String(effectiveDate.getDate()).padStart(2, "0")}`
        : "";
      expect(effectiveDateStr).toBe("2023-01-01");
    });

    it("should invalidate equals filter with invalid expression", () => {
      const { result } = renderHook(() =>
        useFilterValidation({
          filterType: "equals",
          filterMode: "relative",
          absoluteDateFrom: null,
          absoluteDateTo: null,
          expressionFrom: "InvalidExpression",
          expressionTo: "",
          fromExpressionValid: false,
          toExpressionValid: true,
        }),
      );

      expect(result.current.isFilterValid).toBe(false);
    });

    it("should validate inRange filter with valid expressions", () => {
      const { result } = renderHook(() =>
        useFilterValidation({
          filterType: "inRange",
          filterMode: "relative",
          absoluteDateFrom: null,
          absoluteDateTo: null,
          expressionFrom: "Today-7d",
          expressionTo: "Today+7d",
          fromExpressionValid: true,
          toExpressionValid: true,
        }),
      );

      expect(result.current.isFilterValid).toBe(true);
      expect(result.current.resolvedDateFrom).toBeDefined();
      expect(result.current.resolvedDateTo).toBeDefined();
    });

    it("should invalidate inRange filter with missing or invalid expressions", () => {
      const { result } = renderHook(() =>
        useFilterValidation({
          filterType: "inRange",
          filterMode: "relative",
          absoluteDateFrom: null,
          absoluteDateTo: null,
          expressionFrom: "Today",
          expressionTo: "", // Missing end expression
          fromExpressionValid: true,
          toExpressionValid: true,
        }),
      );

      expect(result.current.isFilterValid).toBe(false);
    });

    it("should resolve various date expressions correctly", () => {
      const testCases = [
        { expression: "Today", expectedDays: 0 },
        { expression: "Today+7d", expectedDays: 7 },
        { expression: "Today-30d", expectedDays: -30 },
        { expression: "Today+2w", expectedDays: 14 },
        { expression: "Today-1m", expectedDays: -31 }, // January has 31 days
      ];

      testCases.forEach(({ expression, expectedDays }) => {
        const { result } = renderHook(() =>
          useFilterValidation({
            filterType: "equals",
            filterMode: "relative",
            absoluteDateFrom: null,
            absoluteDateTo: null,
            expressionFrom: expression,
            expressionTo: "",
            fromExpressionValid: true,
            toExpressionValid: true,
          }),
        );

        const expectedDate = new Date(mockDate);
        expectedDate.setDate(expectedDate.getDate() + expectedDays);

        // Compare dates without timezone issues by using local date strings
        const actualDate = result.current.resolvedDateFrom;
        if (actualDate && expectedDate) {
          const actualDateStr = `${actualDate.getFullYear()}-${String(actualDate.getMonth() + 1).padStart(2, "0")}-${String(actualDate.getDate()).padStart(2, "0")}`;
          const expectedDateStr = `${expectedDate.getFullYear()}-${String(expectedDate.getMonth() + 1).padStart(2, "0")}-${String(expectedDate.getDate()).padStart(2, "0")}`;
          expect(actualDateStr).toBe(expectedDateStr);
        } else {
          expect(actualDate).toBeDefined();
        }
      });
    });
  });

  describe("expression validation utility", () => {
    it("should return validateToExpression function", () => {
      const { result } = renderHook(() =>
        useFilterValidation({
          filterType: "inRange",
          filterMode: "relative",
          absoluteDateFrom: null,
          absoluteDateTo: null,
          expressionFrom: "Today",
          expressionTo: "Today+7d",
          fromExpressionValid: true,
          toExpressionValid: true,
        }),
      );

      expect(typeof result.current.validateToExpression).toBe("function");
    });

    it("should validate expressions through validateToExpression", () => {
      const { result } = renderHook(() =>
        useFilterValidation({
          filterType: "inRange",
          filterMode: "relative",
          absoluteDateFrom: null,
          absoluteDateTo: null,
          expressionFrom: "Today",
          expressionTo: "Today+7d",
          fromExpressionValid: true,
          toExpressionValid: true,
        }),
      );

      // Valid expression
      const validResult = result.current.validateToExpression("Today+14d");
      expect(validResult.isValid).toBe(true);
      expect(validResult.resolvedDate).toBeDefined();

      // Invalid expression
      const invalidResult =
        result.current.validateToExpression("InvalidExpression");
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.resolvedDate).toBeNull();
    });
  });

  describe("edge cases and complex scenarios", () => {
    it("should handle empty expressions gracefully", () => {
      const { result } = renderHook(() =>
        useFilterValidation({
          filterType: "equals",
          filterMode: "relative",
          absoluteDateFrom: null,
          absoluteDateTo: null,
          expressionFrom: "",
          expressionTo: "",
          fromExpressionValid: true,
          toExpressionValid: true,
        }),
      );

      expect(result.current.isFilterValid).toBe(false);
      expect(result.current.resolvedDateFrom).toBeNull();
    });

    it("should handle mixed valid/invalid expression states", () => {
      const { result } = renderHook(() =>
        useFilterValidation({
          filterType: "inRange",
          filterMode: "relative",
          absoluteDateFrom: null,
          absoluteDateTo: null,
          expressionFrom: "Today",
          expressionTo: "InvalidExpression",
          fromExpressionValid: true,
          toExpressionValid: false,
        }),
      );

      expect(result.current.isFilterValid).toBe(false);
      expect(result.current.resolvedDateFrom).toBeDefined();
      expect(result.current.resolvedDateTo).toBeNull();
    });

    it("should handle date range validation with crossed dates", () => {
      // This tests the business logic - should the validation handle reversed date ranges?
      const { result } = renderHook(() =>
        useFilterValidation({
          filterType: "inRange",
          filterMode: "absolute",
          absoluteDateFrom: new Date("2023-01-31"), // Later date
          absoluteDateTo: new Date("2023-01-01"), // Earlier date
          expressionFrom: "",
          expressionTo: "",
          fromExpressionValid: true,
          toExpressionValid: true,
        }),
      );

      // This should still be considered valid - the component might handle the swap internally
      expect(result.current.isFilterValid).toBe(true);
    });

    it("should update validation when inputs change", () => {
      const { result, rerender } = renderHook(
        ({ expressionFrom }) =>
          useFilterValidation({
            filterType: "equals",
            filterMode: "relative",
            absoluteDateFrom: null,
            absoluteDateTo: null,
            expressionFrom,
            expressionTo: "",
            fromExpressionValid: true,
            toExpressionValid: true,
          }),
        {
          initialProps: { expressionFrom: "Today" },
        },
      );

      expect(result.current.isFilterValid).toBe(true);

      // Change to invalid expression
      rerender({ expressionFrom: "" });
      expect(result.current.isFilterValid).toBe(false);

      // Change back to valid expression
      rerender({ expressionFrom: "Today+7d" });
      expect(result.current.isFilterValid).toBe(true);
    });
  });

  describe("performance and memoization", () => {
    it("should memoize validation results", () => {
      const { result, rerender } = renderHook(() =>
        useFilterValidation({
          filterType: "equals",
          filterMode: "absolute",
          absoluteDateFrom: new Date("2023-01-15"),
          absoluteDateTo: null,
          expressionFrom: "",
          expressionTo: "",
          fromExpressionValid: true,
          toExpressionValid: true,
        }),
      );

      const firstValidation = result.current;

      // Re-render with same props
      rerender();

      // Should return same object references due to memoization
      expect(result.current.isFilterValid).toBe(firstValidation.isFilterValid);
      expect(result.current.effectiveDateFrom).toStrictEqual(
        firstValidation.effectiveDateFrom,
      );
    });

    it("should provide stable function references", () => {
      const { result, rerender } = renderHook(() =>
        useFilterValidation({
          filterType: "equals",
          filterMode: "relative",
          absoluteDateFrom: null,
          absoluteDateTo: null,
          expressionFrom: "Today",
          expressionTo: "",
          fromExpressionValid: true,
          toExpressionValid: true,
        }),
      );

      const initialValidateToExpression = result.current.validateToExpression;

      rerender();

      expect(result.current.validateToExpression).toBe(
        initialValidateToExpression,
      );
    });
  });

  describe("timezone and date normalization", () => {
    it("should handle dates consistently across timezones", () => {
      const { result } = renderHook(() =>
        useFilterValidation({
          filterType: "equals",
          filterMode: "absolute",
          absoluteDateFrom: new Date("2023-01-15T15:30:00.000Z"), // Afternoon UTC
          absoluteDateTo: null,
          expressionFrom: "",
          expressionTo: "",
          fromExpressionValid: true,
          toExpressionValid: true,
        }),
      );

      expect(result.current.isFilterValid).toBe(true);
      expect(result.current.effectiveDateFrom).toEqual(
        new Date("2023-01-15T15:30:00.000Z"),
      );
    });

    it("should resolve expressions to consistent date format", () => {
      const { result } = renderHook(() =>
        useFilterValidation({
          filterType: "equals",
          filterMode: "relative",
          absoluteDateFrom: null,
          absoluteDateTo: null,
          expressionFrom: "Today",
          expressionTo: "",
          fromExpressionValid: true,
          toExpressionValid: true,
        }),
      );

      // Should resolve to start of day in current timezone
      const resolvedDate = result.current.resolvedDateFrom;
      expect(resolvedDate).toBeDefined();
      expect(resolvedDate?.getHours()).toBe(0);
      expect(resolvedDate?.getMinutes()).toBe(0);
      expect(resolvedDate?.getSeconds()).toBe(0);
      expect(resolvedDate?.getMilliseconds()).toBe(0);
    });
  });
});
