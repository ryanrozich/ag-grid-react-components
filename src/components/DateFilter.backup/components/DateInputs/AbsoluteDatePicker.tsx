import React, { useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateFilterType } from "../../types";
import styles from "./DateInputs.module.css";

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
  className = "",
}) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && isFilterValid) {
        e.preventDefault();
        onApply();
      }
    },
    [isFilterValid, onApply],
  );

  return (
    <div
      className={`${styles.dateInputsContainer} ${className}`}
      data-testid="date-input"
    >
      <label htmlFor="date-picker-from" className={styles.inputLabel}>
        {filterType === "inRange" ? "Date Range" : "Date"}
      </label>
      <div
        className={
          filterType === "inRange" ? styles.inputRow : styles.inputGroup
        }
      >
        <div className={styles.inputWrapper}>
          {filterType === "inRange" && (
            <span className={styles.inputLabel}>From:</span>
          )}
          <DatePicker
            id="date-picker-from"
            selected={dateFrom}
            onChange={onDateFromChange}
            dateFormat={dateFormat}
            placeholderText="Select date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            minDate={minDate}
            maxDate={maxDate}
            onKeyDown={handleKeyDown}
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
            aria-label={filterType === "inRange" ? "Start date" : "Date"}
            aria-describedby="date-picker-instructions"
          />
        </div>
        {filterType === "inRange" && (
          <div className={styles.inputWrapper}>
            <label htmlFor="date-picker-to" className={styles.inputLabel}>
              To:
            </label>
            <DatePicker
              id="date-picker-to"
              selected={dateTo}
              onChange={onDateToChange}
              dateFormat={dateFormat}
              placeholderText="Select end date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              minDate={minDate}
              maxDate={maxDate}
              onKeyDown={handleKeyDown}
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
              aria-label="End date"
              aria-describedby="date-picker-instructions"
            />
          </div>
        )}
      </div>
      <div id="date-picker-instructions" className={styles.screenReaderOnly}>
        Use arrow keys to navigate calendar, Enter to select date, Escape to
        close
      </div>
    </div>
  );
};

// Memoized component with custom comparison to prevent unnecessary re-renders
export const AbsoluteDatePicker = React.memo(
  AbsoluteDatePickerComponent,
  (prevProps, nextProps) => {
    // Compare all props except callbacks (assumed to be stable)
    return (
      prevProps.filterType === nextProps.filterType &&
      prevProps.dateFormat === nextProps.dateFormat &&
      prevProps.isFilterValid === nextProps.isFilterValid &&
      prevProps.className === nextProps.className &&
      // Compare dates (null-safe comparison)
      ((prevProps.dateFrom === null && nextProps.dateFrom === null) ||
        (prevProps.dateFrom !== null &&
          nextProps.dateFrom !== null &&
          prevProps.dateFrom.getTime() === nextProps.dateFrom.getTime())) &&
      ((prevProps.dateTo === null && nextProps.dateTo === null) ||
        (prevProps.dateTo !== null &&
          nextProps.dateTo !== null &&
          prevProps.dateTo.getTime() === nextProps.dateTo.getTime())) &&
      // Compare optional dates
      ((prevProps.minDate === undefined && nextProps.minDate === undefined) ||
        (prevProps.minDate !== undefined &&
          nextProps.minDate !== undefined &&
          prevProps.minDate.getTime() === nextProps.minDate.getTime())) &&
      ((prevProps.maxDate === undefined && nextProps.maxDate === undefined) ||
        (prevProps.maxDate !== undefined &&
          nextProps.maxDate !== undefined &&
          prevProps.maxDate.getTime() === nextProps.maxDate.getTime()))
    );
  },
);
