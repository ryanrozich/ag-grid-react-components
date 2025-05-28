import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useFilterState } from "./useFilterState";
import {
  DateFilterModel,
  DateFilterType,
  DateFilterMode,
} from "../../../interfaces";

describe("useFilterState hook", () => {
  // Mock date to ensure consistent testing
  const mockDate = new Date("2023-01-01T00:00:00Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("initialization", () => {
    it("should initialize with default values when no model provided", () => {
      const { result } = renderHook(() => useFilterState(null));

      expect(result.current.filterType).toBe("equals");
      expect(result.current.filterMode).toBe("absolute");
      expect(result.current.absoluteDateFrom).toBeNull();
      expect(result.current.absoluteDateTo).toBeNull();
      expect(result.current.expressionFrom).toBe("");
      expect(result.current.expressionTo).toBe("");
      expect(result.current.fromExpressionValid).toBe(true);
      expect(result.current.toExpressionValid).toBe(true);
    });

    it("should initialize with default mode preference", () => {
      const { result } = renderHook(() => useFilterState(null, "relative"));

      expect(result.current.filterMode).toBe("relative");
    });

    it("should initialize from absolute date model", () => {
      const model: DateFilterModel = {
        type: "inRange",
        mode: "absolute",
        dateFrom: new Date("2023-01-15"),
        dateTo: new Date("2023-01-20"),
        fromInclusive: true,
        toInclusive: false,
      };

      const { result } = renderHook(() => useFilterState(model));

      expect(result.current.filterType).toBe("inRange");
      expect(result.current.filterMode).toBe("absolute");
      expect(result.current.absoluteDateFrom).toEqual(new Date("2023-01-15"));
      expect(result.current.absoluteDateTo).toEqual(new Date("2023-01-20"));
    });

    it("should initialize from relative date model", () => {
      const model: DateFilterModel = {
        type: "before",
        mode: "relative",
        expressionFrom: "Today+7d",
        expressionTo: "Today+14d",
      };

      const { result } = renderHook(() => useFilterState(model));

      expect(result.current.filterType).toBe("before");
      expect(result.current.filterMode).toBe("relative");
      expect(result.current.expressionFrom).toBe("Today+7d");
      expect(result.current.expressionTo).toBe("Today+14d");
    });

    it("should handle partial models gracefully", () => {
      const model: Partial<DateFilterModel> = {
        type: "after",
        mode: "absolute",
        // Missing dateFrom/dateTo
      };

      const { result } = renderHook(() =>
        useFilterState(model as DateFilterModel),
      );

      expect(result.current.filterType).toBe("after");
      expect(result.current.filterMode).toBe("absolute");
      expect(result.current.absoluteDateFrom).toBeNull();
      expect(result.current.absoluteDateTo).toBeNull();
    });
  });

  describe("filter type management", () => {
    it("should update filter type", () => {
      const { result } = renderHook(() => useFilterState(null));

      act(() => {
        result.current.setFilterType("inRange");
      });

      expect(result.current.filterType).toBe("inRange");
    });

    it("should preserve existing dates when changing filter type", () => {
      const model: DateFilterModel = {
        type: "equals",
        mode: "absolute",
        dateFrom: new Date("2023-01-15"),
      };

      const { result } = renderHook(() => useFilterState(model));

      act(() => {
        result.current.setFilterType("inRange");
      });

      expect(result.current.filterType).toBe("inRange");
      expect(result.current.absoluteDateFrom).toEqual(new Date("2023-01-15"));
    });
  });

  describe("filter mode management", () => {
    it("should toggle between absolute and relative modes", () => {
      const { result } = renderHook(() => useFilterState(null));

      expect(result.current.filterMode).toBe("absolute");

      act(() => {
        result.current.toggleFilterMode();
      });

      expect(result.current.filterMode).toBe("relative");

      act(() => {
        result.current.toggleFilterMode();
      });

      expect(result.current.filterMode).toBe("absolute");
    });

    it("should preserve data when switching modes", () => {
      const { result } = renderHook(() => useFilterState(null));

      // Set up absolute date
      act(() => {
        result.current.setAbsoluteDateFrom(new Date("2023-01-15"));
      });

      // Switch to relative mode
      act(() => {
        result.current.toggleFilterMode();
      });

      // Set up relative expression
      act(() => {
        result.current.setExpressionFrom("Today+7d");
      });

      // Switch back to absolute mode
      act(() => {
        result.current.toggleFilterMode();
      });

      // Should preserve absolute date
      expect(result.current.absoluteDateFrom).toEqual(new Date("2023-01-15"));
      expect(result.current.filterMode).toBe("absolute");
    });
  });

  describe("absolute date management", () => {
    it("should set absolute dateFrom", () => {
      const { result } = renderHook(() => useFilterState(null));
      const testDate = new Date("2023-01-15");

      act(() => {
        result.current.setAbsoluteDateFrom(testDate);
      });

      expect(result.current.absoluteDateFrom).toEqual(testDate);
    });

    it("should set absolute dateTo", () => {
      const { result } = renderHook(() => useFilterState(null));
      const testDate = new Date("2023-01-20");

      act(() => {
        result.current.setAbsoluteDateTo(testDate);
      });

      expect(result.current.absoluteDateTo).toEqual(testDate);
    });

    it("should handle null dates", () => {
      const { result } = renderHook(() => useFilterState(null));

      act(() => {
        result.current.setAbsoluteDateFrom(new Date("2023-01-15"));
        result.current.setAbsoluteDateTo(new Date("2023-01-20"));
      });

      act(() => {
        result.current.setAbsoluteDateFrom(null);
        result.current.setAbsoluteDateTo(null);
      });

      expect(result.current.absoluteDateFrom).toBeNull();
      expect(result.current.absoluteDateTo).toBeNull();
    });
  });

  describe("relative expression management", () => {
    it("should set expression from", () => {
      const { result } = renderHook(() => useFilterState(null));

      act(() => {
        result.current.setExpressionFrom("Today+7d");
      });

      expect(result.current.expressionFrom).toBe("Today+7d");
    });

    it("should set expression to", () => {
      const { result } = renderHook(() => useFilterState(null));

      act(() => {
        result.current.setExpressionTo("Today+14d");
      });

      expect(result.current.expressionTo).toBe("Today+14d");
    });

    it("should handle empty expressions", () => {
      const { result } = renderHook(() => useFilterState(null));

      act(() => {
        result.current.setExpressionFrom("Today+7d");
        result.current.setExpressionTo("Today+14d");
      });

      act(() => {
        result.current.setExpressionFrom("");
        result.current.setExpressionTo("");
      });

      expect(result.current.expressionFrom).toBe("");
      expect(result.current.expressionTo).toBe("");
    });
  });

  describe("validation state management", () => {
    it("should set from expression validity", () => {
      const { result } = renderHook(() => useFilterState(null));

      act(() => {
        result.current.setFromExpressionValid(false);
      });

      expect(result.current.fromExpressionValid).toBe(false);
    });

    it("should set to expression validity", () => {
      const { result } = renderHook(() => useFilterState(null));

      act(() => {
        result.current.setToExpressionValid(false);
      });

      expect(result.current.toExpressionValid).toBe(false);
    });

    it("should set to expression error", () => {
      const { result } = renderHook(() => useFilterState(null));
      const errorMessage = "Invalid expression format";

      act(() => {
        result.current.setToExpressionError(errorMessage);
      });

      expect(result.current.toExpressionError).toBe(errorMessage);
    });
  });

  describe("reset functionality", () => {
    it("should reset all state to defaults", () => {
      const { result } = renderHook(() => useFilterState(null));

      // Set up some state
      act(() => {
        result.current.setFilterType("inRange");
        result.current.toggleFilterMode(); // Switch to relative
        result.current.setAbsoluteDateFrom(new Date("2023-01-15"));
        result.current.setExpressionFrom("Today+7d");
        result.current.setFromExpressionValid(false);
      });

      // Reset
      act(() => {
        result.current.resetState();
      });

      expect(result.current.filterType).toBe("equals");
      expect(result.current.filterMode).toBe("absolute");
      expect(result.current.absoluteDateFrom).toBeNull();
      expect(result.current.absoluteDateTo).toBeNull();
      expect(result.current.expressionFrom).toBe("");
      expect(result.current.expressionTo).toBe("");
      expect(result.current.fromExpressionValid).toBe(true);
      expect(result.current.toExpressionValid).toBe(true);
      expect(result.current.toExpressionError).toBe("");
    });

    it("should reset to specified default mode", () => {
      const { result } = renderHook(() => useFilterState(null, "relative"));

      act(() => {
        result.current.toggleFilterMode(); // Switch to absolute
      });

      act(() => {
        result.current.resetState();
      });

      expect(result.current.filterMode).toBe("relative");
    });
  });

  describe("model initialization", () => {
    it("should handle initializeFromModel", () => {
      const { result } = renderHook(() => useFilterState(null));

      const newModel: DateFilterModel = {
        type: "after",
        mode: "relative",
        expressionFrom: "Today-30d",
      };

      act(() => {
        result.current.initializeFromModel(newModel);
      });

      expect(result.current.filterType).toBe("after");
      expect(result.current.filterMode).toBe("relative");
      expect(result.current.expressionFrom).toBe("Today-30d");
    });

    it("should handle complex range model initialization", () => {
      const { result } = renderHook(() => useFilterState(null));

      const newModel: DateFilterModel = {
        type: "inRange",
        mode: "absolute",
        dateFrom: new Date("2023-01-01"),
        dateTo: new Date("2023-12-31"),
        fromInclusive: true,
        toInclusive: true,
      };

      act(() => {
        result.current.initializeFromModel(newModel);
      });

      expect(result.current.filterType).toBe("inRange");
      expect(result.current.filterMode).toBe("absolute");
      expect(result.current.absoluteDateFrom).toEqual(new Date("2023-01-01"));
      expect(result.current.absoluteDateTo).toEqual(new Date("2023-12-31"));
    });

    it("should preserve validation state during model changes", () => {
      const { result } = renderHook(() => useFilterState(null));

      // Set some validation state
      act(() => {
        result.current.setFromExpressionValid(false);
        result.current.setToExpressionError("Test error");
      });

      const newModel: DateFilterModel = {
        type: "equals",
        mode: "absolute",
        dateFrom: new Date("2023-01-01"),
      };

      act(() => {
        result.current.initializeFromModel(newModel);
      });

      // Validation state should be reset to valid defaults
      expect(result.current.fromExpressionValid).toBe(true);
      expect(result.current.toExpressionValid).toBe(true);
      expect(result.current.toExpressionError).toBe("");
    });
  });

  describe("edge cases and error handling", () => {
    it("should handle invalid filter types gracefully", () => {
      const invalidModel = {
        type: "invalidType" as DateFilterType,
        mode: "absolute" as DateFilterMode,
      };

      const { result } = renderHook(() => useFilterState(invalidModel));

      // Should fallback to default type
      expect(result.current.filterType).toBe("equals");
    });

    it("should handle invalid filter modes gracefully", () => {
      const invalidModel = {
        type: "equals" as DateFilterType,
        mode: "invalidMode" as DateFilterMode,
      };

      const { result } = renderHook(() => useFilterState(invalidModel));

      // Should fallback to default mode
      expect(result.current.filterMode).toBe("absolute");
    });

    it("should handle models with mixed mode/data gracefully", () => {
      const mixedModel: DateFilterModel = {
        type: "equals",
        mode: "relative",
        // Has absolute data but mode is relative
        dateFrom: new Date("2023-01-01"),
        expressionFrom: "Today",
      };

      const { result } = renderHook(() => useFilterState(mixedModel));

      expect(result.current.filterMode).toBe("relative");
      expect(result.current.expressionFrom).toBe("Today");
      // Absolute date should be ignored for relative mode
      expect(result.current.absoluteDateFrom).toBeNull();
    });
  });

  describe("state stability and memoization", () => {
    it("should provide stable function references", () => {
      const { result, rerender } = renderHook(() => useFilterState(null));

      const initialSetters = {
        setFilterType: result.current.setFilterType,
        toggleFilterMode: result.current.toggleFilterMode,
        setAbsoluteDateFrom: result.current.setAbsoluteDateFrom,
        resetState: result.current.resetState,
      };

      // Re-render the hook
      rerender();

      // Function references should be stable
      expect(result.current.setFilterType).toBe(initialSetters.setFilterType);
      expect(result.current.toggleFilterMode).toBe(
        initialSetters.toggleFilterMode,
      );
      expect(result.current.setAbsoluteDateFrom).toBe(
        initialSetters.setAbsoluteDateFrom,
      );
      expect(result.current.resetState).toBe(initialSetters.resetState);
    });
  });
});
