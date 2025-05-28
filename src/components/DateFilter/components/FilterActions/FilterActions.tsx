import React from 'react';

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
  className = ''
}) => {
  return (
    <div
      className={`filter-buttons ${className}`}
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "1rem",
      }}
    >
      <button
        className="filter-button reset-button"
        onClick={onReset}
        type="button"
      >
        Reset
      </button>
      <button
        className="filter-button apply-button"
        onClick={onApply}
        disabled={!isValid}
        type="button"
      >
        Apply
      </button>
    </div>
  );
};

// Memoized component with custom comparison to prevent unnecessary re-renders
export const FilterActions = React.memo(FilterActionsComponent, (prevProps, nextProps) => {
  // Only re-render if isValid or className changes
  // onReset and onApply are assumed to be stable (useCallback in parent)
  return prevProps.isValid === nextProps.isValid && 
         prevProps.className === nextProps.className;
});