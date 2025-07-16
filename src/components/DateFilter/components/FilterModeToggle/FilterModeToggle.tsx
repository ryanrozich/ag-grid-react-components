import React from "react";
import { DateFilterMode } from "../../types";

interface FilterModeToggleProps {
  mode: DateFilterMode;
  onModeChange: () => void;
  className?: string;
}

const FilterModeToggleComponent: React.FC<FilterModeToggleProps> = ({
  mode,
  onModeChange,
  className = "",
}) => {
  return (
    <div className={`ag-filter-body ${className}`}>
      <label id="date-mode-label" className="ag-label">
        Date Mode
      </label>
      <div
        className="ag-picker-field ag-picker-field-wrapper"
        data-testid="mode-toggle"
        role="radiogroup"
        aria-labelledby="date-mode-label"
        aria-describedby="date-mode-description"
      >
        <button
          className={`ag-picker-button ${mode === "absolute" ? "ag-picker-button-active" : ""}`}
          role="radio"
          aria-checked={mode === "absolute"}
          tabIndex={mode === "absolute" ? 0 : -1}
          onClick={() => mode !== "absolute" && onModeChange()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (mode !== "absolute") onModeChange();
            }
          }}
        >
          Specific
        </button>
        <button
          className={`ag-picker-button ${mode === "relative" ? "ag-picker-button-active" : ""}`}
          role="radio"
          aria-checked={mode === "relative"}
          tabIndex={mode === "relative" ? 0 : -1}
          onClick={() => mode !== "relative" && onModeChange()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (mode !== "relative") onModeChange();
            }
          }}
        >
          Relative
        </button>
      </div>
      <div id="date-mode-description" className="ag-hidden" aria-live="polite">
        Choose between specific dates or relative date expressions like
        &quot;Today+7d&quot;
      </div>
    </div>
  );
};

// Memoized component with custom comparison to prevent unnecessary re-renders
export const FilterModeToggle = React.memo(
  FilterModeToggleComponent,
  (prevProps, nextProps) => {
    // Only re-render if mode or className changes
    // onModeChange is assumed to be stable (useCallback in parent)
    return (
      prevProps.mode === nextProps.mode &&
      prevProps.className === nextProps.className
    );
  },
);
