import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { DateFilterModel, DateFilterType, DateFilterMode } from "../interfaces";
import { parseRelativeDate } from "./utils";

export interface DateFilterContextValue {
  // Model state
  model: DateFilterModel | null;
  setModel: (model: DateFilterModel | null) => void;

  // UI state
  mode: DateFilterMode;
  setMode: (mode: DateFilterMode) => void;
  filterType: DateFilterType;
  setFilterType: (type: DateFilterType) => void;
  relativeValue: string;
  setRelativeValue: (value: string) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;

  // Validation state
  isValid: boolean;
  errorMessage: string;

  // Actions
  applyFilter: () => void;
  resetFilter: () => void;
  hasChanges: boolean;

  // Config
  dateParser?: (value: string) => Date | null;
}

const DateFilterContext = createContext<DateFilterContextValue | undefined>(
  undefined,
);

export function useDateFilterContext() {
  const context = useContext(DateFilterContext);
  if (!context) {
    throw new Error(
      "useDateFilterContext must be used within DateFilterProvider",
    );
  }
  return context;
}

interface DateFilterProviderProps {
  children: React.ReactNode;
  model: DateFilterModel | null;
  setModel: (model: DateFilterModel | null) => void;
  applyFilter: () => void;
  resetFilter: () => void;
  dateParser?: (value: string) => Date | null;
}

export function DateFilterProvider({
  children,
  model,
  setModel,
  applyFilter: onApplyFilter,
  resetFilter: onResetFilter,
  dateParser,
}: DateFilterProviderProps) {
  // Initialize state from model
  const [mode, setMode] = useState<DateFilterMode>(() =>
    model?.dateFrom &&
    typeof model.dateFrom === "string" &&
    model.dateFrom.includes("-")
      ? "relative"
      : "absolute",
  );

  const [filterType, setFilterType] = useState<DateFilterType>(
    () => model?.filterType || "equals",
  );

  const [relativeValue, setRelativeValue] = useState(() =>
    model?.filterType === "inRange" &&
    model?.dateFrom &&
    typeof model.dateFrom === "string" &&
    model.dateFrom.includes("-")
      ? model.dateFrom
      : "",
  );

  const [startDate, setStartDate] = useState<Date | null>(() => {
    if (
      !model?.dateFrom ||
      (typeof model.dateFrom === "string" && model.dateFrom.includes("-"))
    )
      return null;
    const date =
      model.dateFrom instanceof Date
        ? model.dateFrom
        : new Date(model.dateFrom);
    return isNaN(date.getTime()) ? null : date;
  });

  const [endDate, setEndDate] = useState<Date | null>(() => {
    if (!model?.dateTo) return null;
    const date = new Date(model.dateTo);
    return isNaN(date.getTime()) ? null : date;
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Validation
  const isValid = useMemo(() => {
    if (mode === "relative") {
      if (!relativeValue) return false;
      const parsed = parseRelativeDate(relativeValue as string);
      return parsed !== null;
    } else {
      if (filterType === "inRange") {
        return startDate !== null && endDate !== null;
      }
      return startDate !== null;
    }
  }, [mode, relativeValue, filterType, startDate, endDate]);

  // Check if there are changes
  const hasChanges = useMemo(() => {
    if (!model) return isValid;

    if (filterType !== model.filterType) return true;

    if (mode === "relative") {
      return relativeValue !== model.dateFrom;
    } else {
      const modelStartDate = model.dateFrom ? new Date(model.dateFrom) : null;
      const modelEndDate = model.dateTo ? new Date(model.dateTo) : null;

      if (filterType === "inRange") {
        return (
          startDate?.getTime() !== modelStartDate?.getTime() ||
          endDate?.getTime() !== modelEndDate?.getTime()
        );
      }
      return startDate?.getTime() !== modelStartDate?.getTime();
    }
  }, [model, mode, filterType, relativeValue, startDate, endDate, isValid]);

  // Apply filter
  const applyFilter = useCallback(() => {
    if (!isValid) return;

    let newModel: DateFilterModel;

    if (mode === "relative") {
      newModel = {
        filterType,
        dateFrom: relativeValue,
        dateTo: filterType === "inRange" ? relativeValue : undefined,
      };
    } else {
      newModel = {
        filterType,
        dateFrom: startDate?.toISOString() || "",
        dateTo: filterType === "inRange" ? endDate?.toISOString() : undefined,
      };
    }

    setModel(newModel);
    onApplyFilter();
  }, [
    isValid,
    mode,
    filterType,
    relativeValue,
    startDate,
    endDate,
    setModel,
    onApplyFilter,
  ]);

  // Reset filter
  const resetFilter = useCallback(() => {
    setMode("relative");
    setFilterType("equals");
    setRelativeValue("");
    setStartDate(null);
    setEndDate(null);
    setErrorMessage("");
    setModel(null);
    onResetFilter();
  }, [setModel, onResetFilter]);

  const contextValue: DateFilterContextValue = {
    model,
    setModel,
    mode,
    setMode,
    filterType,
    setFilterType,
    relativeValue: relativeValue as string,
    setRelativeValue,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isValid,
    errorMessage,
    applyFilter,
    resetFilter,
    hasChanges,
    dateParser,
  };

  return (
    <DateFilterContext.Provider value={contextValue}>
      {children}
    </DateFilterContext.Provider>
  );
}
