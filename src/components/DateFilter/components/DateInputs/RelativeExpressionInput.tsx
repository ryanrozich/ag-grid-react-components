import React, { useCallback, useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { DateFilterType } from "../../types";

// Common relative date expressions for autocomplete
const EXPRESSION_SUGGESTIONS = [
  { value: "Today", label: "Today", description: "Current date" },
  { value: "Today-1d", label: "Yesterday", description: "1 day ago" },
  { value: "Today+1d", label: "Tomorrow", description: "1 day from now" },
  { value: "Today-7d", label: "Last 7 days", description: "7 days ago" },
  { value: "Today+7d", label: "Next 7 days", description: "7 days from now" },
  { value: "Today-1m", label: "Last month", description: "1 month ago" },
  { value: "Today+1m", label: "Next month", description: "1 month from now" },
  { value: "Today-1y", label: "Last year", description: "1 year ago" },
  { value: "Today+1y", label: "Next year", description: "1 year from now" },
  { value: "StartOfWeek", label: "Start of week", description: "Monday" },
  { value: "EndOfWeek", label: "End of week", description: "Sunday" },
  { value: "StartOfMonth", label: "Start of month", description: "1st day" },
  { value: "EndOfMonth", label: "End of month", description: "Last day" },
  { value: "StartOfYear", label: "Start of year", description: "January 1st" },
  { value: "EndOfYear", label: "End of year", description: "December 31st" },
];

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
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(
    EXPRESSION_SUGGESTIONS,
  );
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const fromSuggestionsRef = useRef<HTMLDivElement>(null);
  const toSuggestionsRef = useRef<HTMLDivElement>(null);
  // Filter suggestions based on input
  useEffect(() => {
    const filterSuggestions = (input: string) => {
      if (!input) return EXPRESSION_SUGGESTIONS;
      const lower = input.toLowerCase();
      return EXPRESSION_SUGGESTIONS.filter(
        (s) =>
          s.value.toLowerCase().includes(lower) ||
          s.label.toLowerCase().includes(lower),
      );
    };

    if (showFromSuggestions) {
      const filtered = filterSuggestions(expressionFrom);
      setFilteredSuggestions(filtered);
      // Auto-select first suggestion if there's input and matches exist
      if (expressionFrom && filtered.length > 0) {
        setSelectedIndex(0);
      } else {
        setSelectedIndex(-1);
      }
    } else if (showToSuggestions) {
      const filtered = filterSuggestions(expressionTo);
      setFilteredSuggestions(filtered);
      // Auto-select first suggestion if there's input and matches exist
      if (expressionTo && filtered.length > 0) {
        setSelectedIndex(0);
      } else {
        setSelectedIndex(-1);
      }
    }
  }, [expressionFrom, expressionTo, showFromSuggestions, showToSuggestions]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        fromSuggestionsRef.current &&
        !fromSuggestionsRef.current.contains(e.target as Node) &&
        fromInputRef.current &&
        !fromInputRef.current.contains(e.target as Node)
      ) {
        setShowFromSuggestions(false);
      }
      if (
        toSuggestionsRef.current &&
        !toSuggestionsRef.current.contains(e.target as Node) &&
        toInputRef.current &&
        !toInputRef.current.contains(e.target as Node)
      ) {
        setShowToSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFromChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onExpressionFromChange(value);
      setShowFromSuggestions(true);
    },
    [onExpressionFromChange],
  );

  const handleToChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onExpressionToChange(value);
      setShowToSuggestions(true);
    },
    [onExpressionToChange],
  );

  const handleKeyDownEnhanced = useCallback(
    (e: React.KeyboardEvent, isFromInput: boolean) => {
      const suggestions = filteredSuggestions;
      const showSuggestions = isFromInput
        ? showFromSuggestions
        : showToSuggestions;

      if (showSuggestions && suggestions.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          // Arrow down should move selection down in the list
          setSelectedIndex((prev) => {
            if (prev === -1) return 0;
            if (prev === suggestions.length - 1) return 0; // wrap to top
            return prev + 1;
          });
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          // Arrow up should move selection up in the list
          setSelectedIndex((prev) => {
            if (prev === -1) return suggestions.length - 1;
            if (prev === 0) return suggestions.length - 1; // wrap to bottom
            return prev - 1;
          });
        } else if (e.key === "Tab") {
          // Tab key to autocomplete
          e.preventDefault();
          const indexToUse = selectedIndex >= 0 ? selectedIndex : 0;
          if (suggestions.length > 0) {
            const selected = suggestions[indexToUse];
            if (isFromInput) {
              onExpressionFromChange(selected.value);
              setShowFromSuggestions(false);
              // If in range mode, move focus to "to" input
              if (filterType === "inRange" && toInputRef.current) {
                setTimeout(() => toInputRef.current?.focus(), 0);
              }
            } else {
              onExpressionToChange(selected.value);
              setShowToSuggestions(false);
            }
          }
        } else if (e.key === "Enter") {
          if (selectedIndex >= 0) {
            // Enter with selection
            e.preventDefault();
            const selected = suggestions[selectedIndex];
            if (isFromInput) {
              onExpressionFromChange(selected.value);
              setShowFromSuggestions(false);
            } else {
              onExpressionToChange(selected.value);
              setShowToSuggestions(false);
            }
          } else {
            // Enter without selection - close dropdown and propagate
            if (isFromInput) {
              setShowFromSuggestions(false);
            } else {
              setShowToSuggestions(false);
            }
            onKeyDown(e);
          }
        } else if (e.key === "Escape") {
          e.preventDefault();
          if (isFromInput) {
            setShowFromSuggestions(false);
          } else {
            setShowToSuggestions(false);
          }
        } else {
          onKeyDown(e);
        }
      } else {
        onKeyDown(e);
      }
    },
    [
      filteredSuggestions,
      showFromSuggestions,
      showToSuggestions,
      selectedIndex,
      onExpressionFromChange,
      onExpressionToChange,
      onKeyDown,
      filterType,
    ],
  );

  const selectSuggestion = useCallback(
    (suggestion: (typeof EXPRESSION_SUGGESTIONS)[0], isFromInput: boolean) => {
      if (isFromInput) {
        onExpressionFromChange(suggestion.value);
        setShowFromSuggestions(false);
        fromInputRef.current?.focus();
      } else {
        onExpressionToChange(suggestion.value);
        setShowToSuggestions(false);
        toInputRef.current?.focus();
      }
    },
    [onExpressionFromChange, onExpressionToChange],
  );

  return (
    <div
      className={`${styles.dateInputsContainer} ${className}`}
      data-testid="relative-input"
    >
      <label className={styles.inputLabel}>
        {filterType === "inRange" ? "Date Expression Range" : "Date Expression"}
      </label>
      <div
        className={
          filterType === "inRange" ? styles.inputRow : styles.inputGroup
        }
      >
        <div className={styles.inputWrapper} style={{ position: "relative" }}>
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
            ref={fromInputRef}
            id="expression-from-input"
            type="text"
            className="relative-date-input w-full px-3 py-2 border border-gray-300 rounded-md"
            value={expressionFrom}
            onChange={handleFromChange}
            onFocus={() => setShowFromSuggestions(true)}
            onKeyDown={(e) => handleKeyDownEnhanced(e, true)}
            placeholder="e.g., Today, Today+7d"
            aria-label={
              filterType === "inRange"
                ? "Start date expression"
                : "Date expression"
            }
            aria-describedby="expression-from-help expression-from-status"
            aria-invalid={!fromValid && expressionFrom ? "true" : "false"}
            aria-autocomplete="list"
            aria-controls="from-suggestions"
            aria-expanded={showFromSuggestions}
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
          <div id="expression-from-help" className="sr-only">
            Enter relative date expressions like Today, Today+7d, Today-1m, or
            Today+2w
          </div>
          {showFromSuggestions && filteredSuggestions.length > 0 && (
            <div
              ref={fromSuggestionsRef}
              id="from-suggestions"
              role="listbox"
              className={styles.suggestionsList}
              style={{
                position: "absolute",
                bottom: "100%",
                left: 0,
                right: 0,
                marginBottom: "0.25rem",
                maxHeight: "150px",
                overflowY: "auto",
                backgroundColor: "var(--ag-background-color)",
                border: "1px solid var(--ag-border-color)",
                borderRadius: "var(--ag-border-radius)",
                boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
              }}
            >
              {[...filteredSuggestions]
                .reverse()
                .map((suggestion, originalIndex) => {
                  const index = filteredSuggestions.length - 1 - originalIndex;
                  return (
                    <div
                      key={suggestion.value}
                      role="option"
                      aria-selected={index === selectedIndex}
                      className={`${styles.suggestionItem} ${index === selectedIndex ? styles.selected : ""}`}
                      style={{
                        padding: "0.375rem 0.5rem",
                        cursor: "pointer",
                        fontSize: "0.8125rem",
                        backgroundColor:
                          index === selectedIndex
                            ? "var(--ag-row-hover-color)"
                            : "transparent",
                        borderBottom:
                          index < filteredSuggestions.length - 1
                            ? "1px solid var(--ag-border-color, #e5e7eb)"
                            : "none",
                      }}
                      onClick={() => selectSuggestion(suggestion, true)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div style={{ fontWeight: 500 }}>{suggestion.value}</div>
                      <div
                        style={{
                          fontSize: "0.625rem",
                          color: "var(--ag-secondary-foreground-color)",
                          marginTop: "0.125rem",
                        }}
                      >
                        {suggestion.label} - {suggestion.description}
                        {index === 0 && selectedIndex === -1 && (
                          <span style={{ marginLeft: "0.5rem", opacity: 0.7 }}>
                            (Tab)
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        {filterType === "inRange" && (
          <div className={styles.inputWrapper} style={{ position: "relative" }}>
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
              ref={toInputRef}
              id="expression-to-input"
              type="text"
              className="relative-date-input w-full px-3 py-2 border border-gray-300 rounded-md"
              value={expressionTo}
              onChange={handleToChange}
              onFocus={() => setShowToSuggestions(true)}
              onKeyDown={(e) => handleKeyDownEnhanced(e, false)}
              placeholder="e.g., Today+30d"
              aria-label="End date expression"
              aria-describedby="expression-to-help expression-to-status"
              aria-invalid={!toValid && expressionTo ? "true" : "false"}
              aria-autocomplete="list"
              aria-controls="to-suggestions"
              aria-expanded={showToSuggestions}
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
            <div id="expression-to-help" className="sr-only">
              Enter end date expression for range filtering
            </div>
            {showToSuggestions && filteredSuggestions.length > 0 && (
              <div
                ref={toSuggestionsRef}
                id="to-suggestions"
                role="listbox"
                className={styles.suggestionsList}
                style={{
                  position: "absolute",
                  bottom: "100%",
                  left: 0,
                  right: 0,
                  marginBottom: "0.25rem",
                  maxHeight: "150px",
                  overflowY: "auto",
                  backgroundColor: "var(--ag-background-color)",
                  border: "1px solid var(--ag-border-color)",
                  borderRadius: "var(--ag-border-radius)",
                  boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
                  zIndex: 1000,
                }}
              >
                {[...filteredSuggestions]
                  .reverse()
                  .map((suggestion, originalIndex) => {
                    const index =
                      filteredSuggestions.length - 1 - originalIndex;
                    return (
                      <div
                        key={suggestion.value}
                        role="option"
                        aria-selected={index === selectedIndex}
                        className={`${styles.suggestionItem} ${index === selectedIndex ? styles.selected : ""}`}
                        style={{
                          padding: "0.375rem 0.5rem",
                          cursor: "pointer",
                          fontSize: "0.8125rem",
                          backgroundColor:
                            index === selectedIndex
                              ? "var(--ag-row-hover-color)"
                              : "transparent",
                          borderBottom:
                            index < filteredSuggestions.length - 1
                              ? "1px solid var(--ag-border-color, #e5e7eb)"
                              : "none",
                        }}
                        onClick={() => selectSuggestion(suggestion, false)}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <div style={{ fontWeight: 500 }}>
                          {suggestion.value}
                        </div>
                        <div
                          style={{
                            fontSize: "0.625rem",
                            color: "var(--ag-secondary-foreground-color)",
                            marginTop: "0.125rem",
                          }}
                        >
                          {suggestion.label} - {suggestion.description}
                          {index === 0 && selectedIndex === -1 && (
                            <span
                              style={{ marginLeft: "0.5rem", opacity: 0.7 }}
                            >
                              (Tab)
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}
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
