import { useState, useCallback, useRef } from "react";
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

  // Inclusivity flags
  fromInclusive: boolean;
  toInclusive: boolean;

  // Interaction state
  isUserInteracting: boolean;

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
  setFromInclusive: (inclusive: boolean) => void;
  setToInclusive: (inclusive: boolean) => void;
  setIsUserInteracting: (interacting: boolean) => void;

  // Actions
  toggleFilterMode: () => void;
  resetState: () => void;
  initializeFromModel: (
    model: DateFilterModel | null,
    forceUpdate?: boolean,
  ) => void;
}

// Helper functions to validate filter types and modes
const isValidFilterType = (type: unknown): type is DateFilterType => {
  return (
    typeof type === "string" &&
    ["equals", "notEqual", "after", "before", "inRange"].includes(type)
  );
};

const isValidFilterMode = (mode: unknown): mode is DateFilterMode => {
  return typeof mode === "string" && ["absolute", "relative"].includes(mode);
};

export const useFilterState = (
  initialModel?: DateFilterModel | null,
  defaultMode?: DateFilterMode,
): UseFilterStateReturn => {
  console.log("[useFilterState] Initializing with model:", initialModel);

  // Track the last applied model to avoid unnecessary re-initialization
  const lastAppliedModelRef = useRef<DateFilterModel | null>(
    initialModel || null,
  );
  const isInitializedRef = useRef(false);

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
      ? initialModel.dateFrom instanceof Date
        ? initialModel.dateFrom
        : new Date(initialModel.dateFrom)
      : null,
  );
  const [absoluteDateTo, setAbsoluteDateTo] = useState<Date | null>(
    filterMode === "absolute" && initialModel?.dateTo
      ? initialModel.dateTo instanceof Date
        ? initialModel.dateTo
        : new Date(initialModel.dateTo)
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

  // Inclusivity flags
  const [fromInclusive, setFromInclusive] = useState<boolean>(
    initialModel?.fromInclusive ?? false,
  );
  const [toInclusive, setToInclusive] = useState<boolean>(
    initialModel?.toInclusive ?? false,
  );

  // Track user interaction state
  const [isUserInteracting, setIsUserInteracting] = useState<boolean>(false);

  // Mark component as initialized after first render
  if (!isInitializedRef.current) {
    isInitializedRef.current = true;
  }

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
    setFromInclusive(false);
    setToInclusive(false);
  }, [defaultMode]);

  // Helper to check if two models are equivalent
  const areModelsEqual = (
    model1: DateFilterModel | null,
    model2: DateFilterModel | null,
  ): boolean => {
    if (!model1 && !model2) return true;
    if (!model1 || !model2) return false;

    // Compare core properties
    if (model1.type !== model2.type || model1.mode !== model2.mode)
      return false;

    // Compare dates/expressions based on mode
    if (model1.mode === "absolute") {
      // Handle Date objects and ISO strings
      const getTime = (
        date: Date | string | null | undefined,
      ): number | null => {
        if (!date) return null;
        if (date instanceof Date) return date.getTime();
        if (typeof date === "string") return new Date(date).getTime();
        return null;
      };

      const date1From = getTime(model1.dateFrom);
      const date2From = getTime(model2.dateFrom);
      const date1To = getTime(model1.dateTo);
      const date2To = getTime(model2.dateTo);

      if (date1From !== date2From || date1To !== date2To) return false;
    } else {
      if (
        model1.expressionFrom !== model2.expressionFrom ||
        model1.expressionTo !== model2.expressionTo
      )
        return false;
    }

    // Compare inclusivity flags
    if (
      model1.fromInclusive !== model2.fromInclusive ||
      model1.toInclusive !== model2.toInclusive
    )
      return false;

    return true;
  };

  // Initialize state from a model
  const initializeFromModel = useCallback(
    (model: DateFilterModel | null, forceUpdate = false) => {
      console.log(
        "[useFilterState] initializeFromModel called with:",
        model,
        "force:",
        forceUpdate,
      );

      // Don't re-initialize if user is interacting with the filter
      if (isUserInteracting && !forceUpdate) {
        console.log(
          "[useFilterState] User is interacting, skipping initialization",
        );
        return;
      }

      // Check if the model has actually changed
      if (!forceUpdate && areModelsEqual(model, lastAppliedModelRef.current)) {
        console.log(
          "[useFilterState] Model hasn't changed, skipping initialization",
        );
        return;
      }

      if (!model) {
        console.log("[useFilterState] No model, resetting state");
        resetState();
        lastAppliedModelRef.current = null;
        return;
      }

      // Store the model we're applying
      lastAppliedModelRef.current = { ...model };

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

      // Set inclusivity flags from model
      setFromInclusive(model.fromInclusive ?? false);
      setToInclusive(model.toInclusive ?? false);
    },
    [resetState, isUserInteracting],
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

    // Inclusivity flags
    fromInclusive,
    toInclusive,

    // Interaction state
    isUserInteracting,

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
    setFromInclusive,
    setToInclusive,
    setIsUserInteracting,

    // Actions
    toggleFilterMode,
    resetState,
    initializeFromModel,
  };
};
