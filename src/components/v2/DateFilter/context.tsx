import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { DateFilterContextValue, DateFilterProps } from "./types";
import { parseRelativeDate } from "./utils";

const DateFilterContext = createContext<DateFilterContextValue | null>(null);

export function useDateFilterContext() {
  const context = useContext(DateFilterContext);
  if (!context) {
    throw new Error(
      "DateFilter components must be used within DateFilter provider",
    );
  }
  return context;
}

export function DateFilterProvider({
  children,
  value,
  onChange,
  onApply,
  onReset,
  defaultMode = "relative",
}: DateFilterProps) {
  const [mode, setMode] = useState<"relative" | "absolute">(defaultMode);
  const [relativeValue, setRelativeValue] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Validate relative date input
  const isValid = useMemo(() => {
    if (mode === "relative") {
      if (!relativeValue) return true; // Empty is valid
      try {
        parseRelativeDate(relativeValue);
        setErrorMessage("");
        return true;
      } catch {
        setErrorMessage("Invalid date format");
        return false;
      }
    }
    return true;
  }, [mode, relativeValue]);

  // Check if there are unsaved changes
  const hasChanges = useMemo(() => {
    if (mode === "relative") {
      return relativeValue !== (value || "");
    } else {
      // For absolute mode, check if dates have changed
      return false; // Simplified for POC
    }
  }, [mode, relativeValue, value]);

  const apply = useCallback(() => {
    if (!isValid) return;

    if (mode === "relative" && onChange) {
      onChange(relativeValue);
    }
    // Handle absolute mode...

    onApply?.();
  }, [isValid, mode, relativeValue, onChange, onApply]);

  const reset = useCallback(() => {
    setRelativeValue(value || "");
    setStartDate(null);
    setEndDate(null);
    setErrorMessage("");
    onReset?.();
  }, [value, onReset]);

  const contextValue = useMemo(
    () => ({
      mode,
      setMode,
      relativeValue,
      setRelativeValue,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
      isValid,
      errorMessage,
      hasChanges,
      apply,
      reset,
    }),
    [
      mode,
      relativeValue,
      startDate,
      endDate,
      isValid,
      errorMessage,
      hasChanges,
      apply,
      reset,
    ],
  );

  return (
    <DateFilterContext.Provider value={contextValue}>
      {children}
    </DateFilterContext.Provider>
  );
}
