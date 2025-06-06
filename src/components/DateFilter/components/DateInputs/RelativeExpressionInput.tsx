import React, { useCallback } from "react";
import { format } from "date-fns";
import { DateFilterType } from "../../types";
import styles from "./DateInputs.module.css";

interface RelativeExpressionInputProps {
  filterType: DateFilterType;
  expressionFrom: string;
  expressionTo: string;
  onExpressionFromChange: (value: string) => void;
  onExpressionToChange: (value: string) => void;
  dateFormat: string;
  resolvedDateFrom: Date | null;
  resolvedDateTo: Date | null;
  fromValid: boolean;
  toValid: boolean;
  toError: string;
  onKeyDown: (e: React.KeyboardEvent) => void;
  className?: string;
}

const RelativeExpressionInputComponent: React.FC<
  RelativeExpressionInputProps
> = ({
  filterType,
  expressionFrom,
  expressionTo,
  onExpressionFromChange,
  onExpressionToChange,
  dateFormat,
  resolvedDateFrom,
  resolvedDateTo,
  fromValid,
  toValid,
  toError,
  onKeyDown,
  className = "",
}) => {
  const handleFromChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onExpressionFromChange(value);
    },
    [onExpressionFromChange],
  );

  const handleToChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onExpressionToChange(value);
    },
    [onExpressionToChange],
  );

  return (
    <div className={`${styles.dateInputsContainer} ${className}`} data-testid="relative-input">
      <label
        className={styles.inputLabel}
      >
        {filterType === "inRange" ? "Date Expression Range" : "Date Expression"}
      </label>
      <div
        className={filterType === "inRange" ? styles.inputRow : styles.inputGroup}
      >
        <div className={styles.inputWrapper}>
          {filterType === "inRange" && (
            <span
              style={{
                fontSize: "0.75rem",
                color: "#6b7280",
                marginBottom: "0.25rem",
                display: "block",
              }}
            >
              From:
            </span>
          )}
          <input
            id="expression-from-input"
            type="text"
            className="relative-date-input w-full px-3 py-2 border border-gray-300 rounded-md"
            value={expressionFrom}
            onChange={handleFromChange}
            onKeyDown={onKeyDown}
            placeholder="e.g., Today, Today+7d"
            aria-label={filterType === "inRange" ? "Start date expression" : "Date expression"}
            aria-describedby="expression-from-help expression-from-status"
            aria-invalid={!fromValid && expressionFrom ? "true" : "false"}
          />
          <div
            id="expression-from-status"
            style={{ minHeight: "1.25rem", marginTop: "0.25rem" }}
            aria-live="polite"
          >
            {!fromValid && expressionFrom && (
              <div
                className="error-message"
                role="alert"
                style={{ color: "#ef4444", fontSize: "0.75rem" }}
              >
                Invalid expression
              </div>
            )}
            {fromValid && resolvedDateFrom && (
              <div
                className="resolved-date"
                style={{ color: "#6b7280", fontSize: "0.75rem" }}
                aria-label={`Date expression resolves to ${format(resolvedDateFrom, dateFormat)}`}
              >
                Resolves to: {format(resolvedDateFrom, dateFormat)}
              </div>
            )}
          </div>
          <div
            id="expression-from-help"
            className="sr-only"
          >
            Enter relative date expressions like Today, Today+7d, Today-1m, or Today+2w
          </div>
        </div>
        {filterType === "inRange" && (
          <div className={styles.inputWrapper}>
            <span
              style={{
                fontSize: "0.75rem",
                color: "#6b7280",
                marginBottom: "0.25rem",
                display: "block",
              }}
            >
              To:
            </span>
            <label htmlFor="expression-to-input" className="sr-only">
              End date expression
            </label>
            <input
              id="expression-to-input"
              type="text"
              className="relative-date-input w-full px-3 py-2 border border-gray-300 rounded-md"
              value={expressionTo}
              onChange={handleToChange}
              onKeyDown={onKeyDown}
              placeholder="e.g., Today+30d"
              aria-label="End date expression"
              aria-describedby="expression-to-help expression-to-status"
              aria-invalid={!toValid && expressionTo ? "true" : "false"}
            />
            <div
              id="expression-to-status"
              style={{ minHeight: "1.25rem", marginTop: "0.25rem" }}
              aria-live="polite"
            >
              {!toValid && expressionTo && (
                <div
                  className="error-message"
                  role="alert"
                  style={{ color: "#ef4444", fontSize: "0.75rem" }}
                >
                  {toError || "Invalid expression"}
                </div>
              )}
              {toValid && resolvedDateTo && (
                <div
                  className="resolved-date"
                  style={{ color: "#6b7280", fontSize: "0.75rem" }}
                  aria-label={`End date expression resolves to ${format(resolvedDateTo, dateFormat)}`}
                >
                  Resolves to: {format(resolvedDateTo, dateFormat)}
                </div>
              )}
            </div>
            <div
              id="expression-to-help"
              className="sr-only"
            >
              Enter end date expression for range filtering
            </div>
          </div>
        )}
      </div>
      <div
        className="syntax-help"
        role="region"
        aria-labelledby="syntax-help-title"
        style={{
          marginTop: "0.75rem",
          backgroundColor: "#f8fafc",
          padding: "0.5rem",
          borderRadius: "0.375rem",
          fontSize: "0.75rem",
        }}
      >
        <div
          id="syntax-help-title"
          style={{
            fontWeight: "500",
            marginBottom: "0.25rem",
            color: "#4b5563",
          }}
        >
          Syntax Examples:
        </div>
        <ul style={{ paddingLeft: "1rem", color: "#6b7280", margin: "0" }}>
          <li>Today</li>
          <li>Today+7d (7 days from today)</li>
          <li>Today-1m (1 month ago)</li>
          <li>Today+2w (2 weeks from today)</li>
          <li>Today+1y (1 year from today)</li>
        </ul>
      </div>
    </div>
  );
};

// Memoized component with custom comparison to prevent unnecessary re-renders
export const RelativeExpressionInput = React.memo(
  RelativeExpressionInputComponent,
  (prevProps, nextProps) => {
    // Compare all props except callbacks (assumed to be stable)
    return (
      prevProps.filterType === nextProps.filterType &&
      prevProps.expressionFrom === nextProps.expressionFrom &&
      prevProps.expressionTo === nextProps.expressionTo &&
      prevProps.dateFormat === nextProps.dateFormat &&
      prevProps.fromValid === nextProps.fromValid &&
      prevProps.toValid === nextProps.toValid &&
      prevProps.toError === nextProps.toError &&
      prevProps.className === nextProps.className &&
      // Compare resolved dates (null-safe comparison)
      ((prevProps.resolvedDateFrom === null &&
        nextProps.resolvedDateFrom === null) ||
        (prevProps.resolvedDateFrom !== null &&
          nextProps.resolvedDateFrom !== null &&
          prevProps.resolvedDateFrom.getTime() ===
            nextProps.resolvedDateFrom.getTime())) &&
      ((prevProps.resolvedDateTo === null &&
        nextProps.resolvedDateTo === null) ||
        (prevProps.resolvedDateTo !== null &&
          nextProps.resolvedDateTo !== null &&
          prevProps.resolvedDateTo.getTime() ===
            nextProps.resolvedDateTo.getTime()))
    );
  },
);
