import React from 'react';
import { DateFilterType } from '../../types';

interface FilterTypeSelectorProps {
  filterType: DateFilterType;
  onTypeChange: (type: DateFilterType) => void;
  className?: string;
}

export const FilterTypeSelector: React.FC<FilterTypeSelectorProps> = ({
  filterType,
  onTypeChange,
  className = ''
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onTypeChange(e.target.value as DateFilterType);
  };

  return (
    <div className={`filter-type-section ${className}`} style={{ marginBottom: "1rem" }}>
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
        Filter Type
      </label>
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        value={filterType}
        onChange={handleChange}
        style={{ width: "100%" }}
      >
        <option value="equals">Equals</option>
        <option value="notEqual">Not Equal</option>
        <option value="after">After</option>
        <option value="before">Before</option>
        <option value="inRange">In Range</option>
      </select>
    </div>
  );
};