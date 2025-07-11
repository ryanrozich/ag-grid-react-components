import React, { useCallback, useState, useEffect } from "react";
import { parse, isValid, format } from "date-fns";
import { DateFilterType } from "../../types";
import styles from "./DateInputs.module.css";

interface TextDateInputProps {
  filterType: DateFilterType;
  dateFrom: Date | null;
  dateTo: Date | null;
  onDateFromChange: (date: Date | null) => void;
  onDateToChange: (date: Date | null) => void;
  dateFormat: string;
  minDate?: Date;
  maxDate?: Date;
  onApply: () => void;
  isFilterValid: boolean;
  className?: string;
}

// Common date formats to try when parsing
const DATE_FORMATS = [
  "MM/dd/yyyy",
  "dd/MM/yyyy",
  "yyyy-MM-dd",
  "MM-dd-yyyy",
  "dd-MM-yyyy",
  "MM.dd.yyyy",
  "dd.MM.yyyy",
  "MMM dd, yyyy",
  "dd MMM yyyy",
  "MM/dd/yy",
  "dd/MM/yy",
];

const TextDateInputComponent: React.FC<TextDateInputProps> = ({
  filterType,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  dateFormat,
  minDate,
  maxDate,
  onApply,
  isFilterValid,
  className = "",
}) => {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [fromError, setFromError] = useState("");
  const [toError, setToError] = useState("");

  // Initialize text values from dates
  useEffect(() => {
    if (dateFrom) {
      setFromText(format(dateFrom, dateFormat));
    } else {
      setFromText("");
    }
  }, [dateFrom, dateFormat]);

  useEffect(() => {
    if (dateTo) {
      setToText(format(dateTo, dateFormat));
    } else {
      setToText("");
    }
  }, [dateTo, dateFormat]);

  const parseDate = useCallback(
    (text: string): Date | null => {
      if (!text.trim()) return null;

      // Try primary format first
      let date = parse(text, dateFormat, new Date());
      if (isValid(date)) return date;

      // Try other common formats
      for (const fmt of DATE_FORMATS) {
        date = parse(text, fmt, new Date());
        if (isValid(date)) return date;
      }

      return null;
    },
    [dateFormat],
  );

  const validateDate = useCallback(
    (date: Date | null, isToDate: boolean = false): string => {
      if (!date) return "";

      if (minDate && date < minDate) {
        return `Date must be after ${format(minDate, dateFormat)}`;
      }
      if (maxDate && date > maxDate) {
        return `Date must be before ${format(maxDate, dateFormat)}`;
      }

      // For range filters, validate that from date is before to date
      if (filterType === "inRange" && !isToDate && dateTo && date > dateTo) {
        return "Start date must be before end date";
      }
      if (filterType === "inRange" && isToDate && dateFrom && date < dateFrom) {
        return "End date must be after start date";
      }

      return "";
    },
    [minDate, maxDate, dateFormat, filterType, dateFrom, dateTo],
  );

  const handleFromChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setFromText(text);

      if (!text.trim()) {
        onDateFromChange(null);
        setFromError("");
        return;
      }

      const date = parseDate(text);
      if (date) {
        const error = validateDate(date, false);
        setFromError(error);
        if (!error) {
          onDateFromChange(date);
        }
      } else {
        setFromError("Invalid date format");
      }
    },
    [parseDate, validateDate, onDateFromChange],
  );

  const handleToChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setToText(text);

      if (!text.trim()) {
        onDateToChange(null);
        setToError("");
        return;
      }

      const date = parseDate(text);
      if (date) {
        const error = validateDate(date, true);
        setToError(error);
        if (!error) {
          onDateToChange(date);
        }
      } else {
        setToError("Invalid date format");
      }
    },
    [parseDate, validateDate, onDateToChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && isFilterValid && !fromError && !toError) {
        e.preventDefault();
        onApply();
      }
    },
    [isFilterValid, onApply, fromError, toError],
  );

  return (
    <div
      className={`${styles.dateInputsContainer} ${className}`}
      data-testid="date-input"
    >
      <label htmlFor="date-input-from" className={styles.inputLabel}>
        {filterType === "inRange" ? "Date Range" : "Date"}
      </label>
      <div
        className={
          filterType === "inRange" ? styles.inputRow : styles.inputGroup
        }
      >
        <div className={styles.inputWrapper}>
          {filterType === "inRange" && (
            <span className={styles.inputLabel}>From:</span>
          )}
          <input
            id="date-input-from"
            type="text"
            value={fromText}
            onChange={handleFromChange}
            onKeyDown={handleKeyDown}
            placeholder={dateFormat}
            className={`${styles.dateInput} ${fromError ? styles.inputError : ""}`}
            aria-label={filterType === "inRange" ? "Start date" : "Date"}
            aria-describedby={fromError ? "from-error" : "date-format-hint"}
            aria-invalid={!!fromError}
          />
          {fromError && (
            <div id="from-error" className={styles.errorText}>
              {fromError}
            </div>
          )}
        </div>
        {filterType === "inRange" && (
          <div className={styles.inputWrapper}>
            <label htmlFor="date-input-to" className={styles.inputLabel}>
              To:
            </label>
            <input
              id="date-input-to"
              type="text"
              value={toText}
              onChange={handleToChange}
              onKeyDown={handleKeyDown}
              placeholder={dateFormat}
              className={`${styles.dateInput} ${toError ? styles.inputError : ""}`}
              aria-label="End date"
              aria-describedby={toError ? "to-error" : "date-format-hint"}
              aria-invalid={!!toError}
            />
            {toError && (
              <div id="to-error" className={styles.errorText}>
                {toError}
              </div>
            )}
          </div>
        )}
      </div>
      <div id="date-format-hint" className={styles.formatHint}>
        Format: {dateFormat}
      </div>
    </div>
  );
};

// Memoized component with custom comparison to prevent unnecessary re-renders
export const TextDateInput = React.memo(
  TextDateInputComponent,
  (prevProps, nextProps) => {
    // Compare all props except callbacks (assumed to be stable)
    return (
      prevProps.filterType === nextProps.filterType &&
      prevProps.dateFormat === nextProps.dateFormat &&
      prevProps.isFilterValid === nextProps.isFilterValid &&
      prevProps.className === nextProps.className &&
      // Compare dates (null-safe comparison)
      ((prevProps.dateFrom === null && nextProps.dateFrom === null) ||
        (prevProps.dateFrom !== null &&
          nextProps.dateFrom !== null &&
          prevProps.dateFrom.getTime() === nextProps.dateFrom.getTime())) &&
      ((prevProps.dateTo === null && nextProps.dateTo === null) ||
        (prevProps.dateTo !== null &&
          nextProps.dateTo !== null &&
          prevProps.dateTo.getTime() === nextProps.dateTo.getTime())) &&
      // Compare optional dates
      ((prevProps.minDate === undefined && nextProps.minDate === undefined) ||
        (prevProps.minDate !== undefined &&
          nextProps.minDate !== undefined &&
          prevProps.minDate.getTime() === nextProps.minDate.getTime())) &&
      ((prevProps.maxDate === undefined && nextProps.maxDate === undefined) ||
        (prevProps.maxDate !== undefined &&
          nextProps.maxDate !== undefined &&
          prevProps.maxDate.getTime() === nextProps.maxDate.getTime()))
    );
  },
);
