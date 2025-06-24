import { useState, useCallback } from "react";
import { DateFilterType, DateFilterMode, DateFilterModel } from "../types";

interface UseFilterStateReturn {
  // Filter state
  filterType: DateFilterType;
  filterMode: DateFilterMode;

  // Date values
  absoluteDateFrom: Date | null;
  absoluteDateTo: Date | null;

  // Expression values
  expressionFrom: string;
  expressionTo: string;

  // Validation state
  fromExpressionValid: boolean;
  toExpressionValid: boolean;
  toExpressionError: string;

  // State setters
  setFilterType: (type: DateFilterType) => void;
  setFilterMode: (mode: DateFilterMode) => void;
  setAbsoluteDateFrom: (date: Date | null) => void;
  setAbsoluteDateTo: (date: Date | null) => void;
  setExpressionFrom: (expr: string) => void;
  setExpressionTo: (expr: string) => void;
  setFromExpressionValid: (valid: boolean) => void;
  setToExpressionValid: (valid: boolean) => void;
  setToExpressionError: (error: string) => void;

  // Actions
  toggleFilterMode: () => void;
  resetState: () => void;
  initializeFromModel: (model: DateFilterModel | null) => void;
}

// Helper functions to validate filter types and modes
const isValidFilterType = (type: any): type is DateFilterType => {
  return ["equals", "notEqual", "after", "before", "inRange"].includes(type);
};

const isValidFilterMode = (mode: any): mode is DateFilterMode => {
  return ["absolute", "relative"].includes(mode);
};

export const useFilterState = (
  initialModel?: DateFilterModel | null,
  defaultMode?: DateFilterMode,
): UseFilterStateReturn => {
  console.log("[useFilterState] Initializing with model:", initialModel);
  
  // Filter state with validation
  const [filterType, setFilterType] = useState<DateFilterType>(
    isValidFilterType(initialModel?.type) ? initialModel.type : "equals",
  );
  const [filterMode, setFilterMode] = useState<DateFilterMode>(
    isValidFilterMode(initialModel?.mode)
      ? initialModel.mode
      : defaultMode || "absolute",
  );

  // Date values
  const [absoluteDateFrom, setAbsoluteDateFrom] = useState<Date | null>(
    filterMode === "absolute" && initialModel?.dateFrom
      ? (initialModel.dateFrom instanceof Date ? initialModel.dateFrom : new Date(initialModel.dateFrom))
      : null,
  );
  const [absoluteDateTo, setAbsoluteDateTo] = useState<Date | null>(
    filterMode === "absolute" && initialModel?.dateTo
      ? (initialModel.dateTo instanceof Date ? initialModel.dateTo : new Date(initialModel.dateTo))
      : null,
  );

  // Expression values
  const [expressionFrom, setExpressionFrom] = useState<string>(
    initialModel && filterMode === "relative" && initialModel.expressionFrom
      ? initialModel.expressionFrom
      : "",
  );
  const [expressionTo, setExpressionTo] = useState<string>(
    initialModel && filterMode === "relative" && initialModel.expressionTo
      ? initialModel.expressionTo
      : "",
  );

  // Validation state
  const [fromExpressionValid, setFromExpressionValid] = useState<boolean>(true);
  const [toExpressionValid, setToExpressionValid] = useState<boolean>(true);
  const [toExpressionError, setToExpressionError] = useState<string>("");

  // Toggle filter mode
  const toggleFilterMode = useCallback(() => {
    setFilterMode((prevMode) =>
      prevMode === "absolute" ? "relative" : "absolute",
    );
  }, []);

  // Reset all state to defaults
  const resetState = useCallback(() => {
    setFilterType("equals");
    setFilterMode(defaultMode || "absolute");
    setAbsoluteDateFrom(null);
    setAbsoluteDateTo(null);
    setExpressionFrom("");
    setExpressionTo("");
    setFromExpressionValid(true);
    setToExpressionValid(true);
    setToExpressionError("");
  }, [defaultMode]);

  // Initialize state from a model
  const initializeFromModel = useCallback(
    (model: DateFilterModel | null) => {
      console.log("[useFilterState] initializeFromModel called with:", model);

      if (!model) {
        console.log("[useFilterState] No model, resetting state");
        resetState();
        return;
      }

      console.log("[useFilterState] Setting filter type to:", model.type);
      setFilterType(model.type);

      console.log("[useFilterState] Setting filter mode to:", model.mode);
      setFilterMode(model.mode);

      if (model.mode === "absolute") {
        console.log("[useFilterState] Setting absolute dates:", {
          from: model.dateFrom,
          to: model.dateTo,
        });
        setAbsoluteDateFrom(model.dateFrom || null);
        setAbsoluteDateTo(model.dateTo || null);
        setExpressionFrom("");
        setExpressionTo("");
      } else {
        console.log("[useFilterState] Setting relative expressions:", {
          from: model.expressionFrom,
          to: model.expressionTo,
        });
        setExpressionFrom(model.expressionFrom || "");
        setExpressionTo(model.expressionTo || "");
        setAbsoluteDateFrom(null);
        setAbsoluteDateTo(null);
      }

      // Reset validation state
      setFromExpressionValid(true);
      setToExpressionValid(true);
      setToExpressionError("");
    },
    [resetState],
  );

  return {
    // Filter state
    filterType,
    filterMode,

    // Date values
    absoluteDateFrom,
    absoluteDateTo,

    // Expression values
    expressionFrom,
    expressionTo,

    // Validation state
    fromExpressionValid,
    toExpressionValid,
    toExpressionError,

    // State setters
    setFilterType,
    setFilterMode,
    setAbsoluteDateFrom,
    setAbsoluteDateTo,
    setExpressionFrom,
    setExpressionTo,
    setFromExpressionValid,
    setToExpressionValid,
    setToExpressionError,

    // Actions
    toggleFilterMode,
    resetState,
    initializeFromModel,
  };
};
