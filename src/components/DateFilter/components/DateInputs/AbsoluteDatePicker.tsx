import React, { useCallback } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateFilterType } from '../../types';

interface AbsoluteDatePickerProps {
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

const AbsoluteDatePickerComponent: React.FC<AbsoluteDatePickerProps> = ({
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
  className = ''
}) => {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isFilterValid) {
      e.preventDefault();
      onApply();
    }
  }, [isFilterValid, onApply]);

  return (
    <div className={`absolute-mode ${className}`}>
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
        {filterType === "inRange" ? "Date Range" : "Date"}
      </label>
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexDirection: filterType === "inRange" ? "row" : "column",
        }}
      >
        <div className="input-wrapper" style={{ flex: "1" }}>
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
          <DatePicker
            selected={dateFrom}
            onChange={onDateFromChange}
            dateFormat={dateFormat}
            placeholderText="Select date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            minDate={minDate}
            maxDate={maxDate}
            onKeyDown={handleKeyDown}
            inline
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            popperClassName="date-picker-popper-from"
            popperProps={{
              strategy: "absolute",
            }}
            popperPlacement="bottom-start"
            popperModifiers={[
              {
                name: "offset",
                options: { offset: [0, 5] },
                fn: () => ({}),
              },
              {
                name: "preventOverflow",
                options: { boundary: "viewport", padding: 8 },
                fn: () => ({}),
              },
            ]}
          />
        </div>
        {filterType === "inRange" && (
          <div className="input-wrapper" style={{ flex: "1" }}>
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
              To:
            </label>
            <DatePicker
              selected={dateTo}
              onChange={onDateToChange}
              dateFormat={dateFormat}
              placeholderText="Select date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              minDate={minDate}
              maxDate={maxDate}
              onKeyDown={handleKeyDown}
              inline
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              popperClassName="date-picker-popper-to"
              popperProps={{
                strategy: "absolute",
              }}
              popperPlacement="bottom-start"
              popperModifiers={[
                {
                  name: "offset",
                  options: { offset: [0, 5] },
                  fn: () => ({}),
                },
                {
                  name: "preventOverflow",
                  options: { boundary: "viewport", padding: 8 },
                  fn: () => ({}),
                },
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Memoized component with custom comparison to prevent unnecessary re-renders
export const AbsoluteDatePicker = React.memo(AbsoluteDatePickerComponent, (prevProps, nextProps) => {
  // Compare all props except callbacks (assumed to be stable)
  return (
    prevProps.filterType === nextProps.filterType &&
    prevProps.dateFormat === nextProps.dateFormat &&
    prevProps.isFilterValid === nextProps.isFilterValid &&
    prevProps.className === nextProps.className &&
    // Compare dates (null-safe comparison)
    ((prevProps.dateFrom === null && nextProps.dateFrom === null) ||
     (prevProps.dateFrom !== null && nextProps.dateFrom !== null &&
      prevProps.dateFrom.getTime() === nextProps.dateFrom.getTime())) &&
    ((prevProps.dateTo === null && nextProps.dateTo === null) ||
     (prevProps.dateTo !== null && nextProps.dateTo !== null &&
      prevProps.dateTo.getTime() === nextProps.dateTo.getTime())) &&
    // Compare optional dates
    ((prevProps.minDate === undefined && nextProps.minDate === undefined) ||
     (prevProps.minDate !== undefined && nextProps.minDate !== undefined &&
      prevProps.minDate.getTime() === nextProps.minDate.getTime())) &&
    ((prevProps.maxDate === undefined && nextProps.maxDate === undefined) ||
     (prevProps.maxDate !== undefined && nextProps.maxDate !== undefined &&
      prevProps.maxDate.getTime() === nextProps.maxDate.getTime()))
  );
});