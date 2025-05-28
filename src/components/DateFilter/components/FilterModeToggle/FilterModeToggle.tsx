import React from 'react';
import { DateFilterMode } from '../../types';

interface FilterModeToggleProps {
  mode: DateFilterMode;
  onModeChange: () => void;
  className?: string;
}

const FilterModeToggleComponent: React.FC<FilterModeToggleProps> = ({
  mode,
  onModeChange,
  className = ''
}) => {
  return (
    <div className={`filter-mode-section ${className}`} style={{ marginBottom: "1rem" }}>
      <label
        className="filter-label"
        style={{
          display: "block",
          marginBottom: "0.25rem",
          fontSize: "0.875rem",
          fontWeight: "500",
          color: "#374151",
        }}
      >
        Date Mode
      </label>
      <div
        className="date-mode-selector"
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #d1d5db",
          borderRadius: "0.375rem",
          overflow: "hidden",
        }}
      >
        <div
          className={`date-mode-option ${mode === "absolute" ? "selected" : ""}`}
          style={{
            flex: "1",
            padding: "0.5rem",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: mode === "absolute" ? "#2563eb" : "#f9fafb",
            color: mode === "absolute" ? "#ffffff" : "#374151",
            fontWeight: mode === "absolute" ? "600" : "400",
            transition: "background-color 0.2s, color 0.2s",
            userSelect: "none",
          }}
          onClick={() => mode !== "absolute" && onModeChange()}
        >
          Specific Date
        </div>
        <div
          className={`date-mode-option ${mode === "relative" ? "selected" : ""}`}
          style={{
            flex: "1",
            padding: "0.5rem",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: mode === "relative" ? "#2563eb" : "#f9fafb",
            color: mode === "relative" ? "#ffffff" : "#374151",
            fontWeight: mode === "relative" ? "600" : "400",
            transition: "background-color 0.2s, color 0.2s",
            userSelect: "none",
          }}
          onClick={() => mode !== "relative" && onModeChange()}
        >
          Relative Date
        </div>
      </div>
    </div>
  );
};

// Memoized component with custom comparison to prevent unnecessary re-renders
export const FilterModeToggle = React.memo(FilterModeToggleComponent, (prevProps, nextProps) => {
  // Only re-render if mode or className changes
  // onModeChange is assumed to be stable (useCallback in parent)
  return prevProps.mode === nextProps.mode && 
         prevProps.className === nextProps.className;
});