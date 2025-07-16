import React from "react";

interface FilterActionsProps {
  onReset: () => void;
  onApply: () => void;
  isValid: boolean;
  className?: string;
}

const FilterActionsComponent: React.FC<FilterActionsProps> = ({
  onReset,
  onApply,
  isValid,
  className = "",
}) => {
  return (
    <div className={`ag-filter-apply-panel ${className}`}>
      <button
        className="ag-button ag-standard-button ag-filter-apply-panel-button"
        onClick={onReset}
        type="button"
        data-testid="clear-button"
        aria-label="Reset filter to clear all selections"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onReset();
          }
        }}
      >
        Reset
      </button>
      <button
        className="ag-button ag-standard-button ag-filter-apply-panel-button"
        onClick={onApply}
        disabled={!isValid}
        type="button"
        data-testid="apply-button"
        aria-label={
          isValid
            ? "Apply the current filter settings"
            : "Cannot apply filter - invalid settings"
        }
        aria-describedby="apply-button-status"
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && isValid) {
            e.preventDefault();
            onApply();
          }
        }}
      >
        Apply
      </button>
      <div
        id="apply-button-status"
        className="ag-hidden"
        aria-live="polite"
      >
        {isValid
          ? "Filter is ready to apply"
          : "Please complete filter settings to apply"}
      </div>
    </div>
  );
};

// Memoized component with custom comparison to prevent unnecessary re-renders
export const FilterActions = React.memo(
  FilterActionsComponent,
  (prevProps, nextProps) => {
    // Only re-render if isValid or className changes
    // onReset and onApply are assumed to be stable (useCallback in parent)
    return (
      prevProps.isValid === nextProps.isValid &&
      prevProps.className === nextProps.className
    );
  },
);
