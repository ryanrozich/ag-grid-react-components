import React, { useCallback } from "react";
import { DateFilterType } from "../../types";
import styles from "./FilterTypeSelector.module.css";

interface FilterTypeSelectorProps {
  filterType: DateFilterType;
  onTypeChange: (type: DateFilterType) => void;
  className?: string;
}

const FilterTypeSelectorComponent: React.FC<FilterTypeSelectorProps> = ({
  filterType,
  onTypeChange,
  className = "",
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onTypeChange(e.target.value as DateFilterType);
    },
    [onTypeChange],
  );

  return (
    <div
      className={`${styles.filterTypeSection} ${className}`}
    >
      <label
        htmlFor="filter-type-select"
        className={styles.filterLabel}
      >
        Filter Type
      </label>
      <select
        id="filter-type-select"
        className={styles.filterTypeSelect}
        value={filterType}
        onChange={handleChange}
        aria-label="Select filter type"
        aria-describedby="filter-type-description"
      >
        <option value="equals">Equals</option>
        <option value="notEqual">Not Equal</option>
        <option value="after">After</option>
        <option value="before">Before</option>
        <option value="inRange">In Range</option>
      </select>
      <div
        id="filter-type-description"
        className={styles.screenReaderOnly}
        aria-live="polite"
      >
        Choose how to filter dates: equals a specific date, not equal to a date, after a date, before a date, or within a date range
      </div>
    </div>
  );
};

// Memoized component with custom comparison to prevent unnecessary re-renders
export const FilterTypeSelector = React.memo(
  FilterTypeSelectorComponent,
  (prevProps, nextProps) => {
    // Only re-render if filterType or className changes
    // onTypeChange is assumed to be stable (direct state setter from hook)
    return (
      prevProps.filterType === nextProps.filterType &&
      prevProps.className === nextProps.className
    );
  },
);
