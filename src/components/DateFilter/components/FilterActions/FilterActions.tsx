import React from 'react';

interface FilterActionsProps {
  onReset: () => void;
  onApply: () => void;
  isValid: boolean;
  className?: string;
}

export const FilterActions: React.FC<FilterActionsProps> = ({
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