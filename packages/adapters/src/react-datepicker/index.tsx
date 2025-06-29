import React, { lazy, Suspense } from "react";
import type { DatePickerAdapter, DatePickerProps } from "@agrc/core";

// Lazy load React DatePicker
const ReactDatePickerLazy = lazy(() =>
  import("react-datepicker").then((module) => ({
    default: module.default,
  })),
);

// Simple loading fallback
const LoadingFallback: React.FC<DatePickerProps> = ({ value, className }) => (
  <input
    type="date"
    value={value ? value.toISOString().split("T")[0] : ""}
    className={className}
    disabled
    placeholder="Loading..."
  />
);

// React DatePicker wrapper component
const ReactDatePickerWrapper: React.FC<DatePickerProps> = (props) => {
  const {
    value,
    onChange,
    placeholder,
    className,
    minDate,
    maxDate,
    disabled,
  } = props;

  return (
    <Suspense fallback={<LoadingFallback {...props} />}>
      <ReactDatePickerLazy
        selected={value}
        onChange={(date) => onChange(date)}
        placeholderText={placeholder}
        className={className}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        dateFormat="yyyy-MM-dd"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
    </Suspense>
  );
};

export const reactDatePickerAdapter: DatePickerAdapter = {
  Component: ReactDatePickerWrapper,

  parseValue: (value: unknown): Date | null => {
    if (!value) return null;
    if (value instanceof Date) return value;
    if (typeof value === "string") {
      const parsed = new Date(value);
      return isNaN(parsed.getTime()) ? null : parsed;
    }
    if (typeof value === "number") {
      return new Date(value);
    }
    return null;
  },

  formatValue: (date: Date | null): string => {
    if (!date) return "";
    return date.toISOString();
  },
};

// For users who want to configure the adapter
export function createReactDatePickerAdapter(options?: {
  dateFormat?: string;
  showMonthDropdown?: boolean;
  showYearDropdown?: boolean;
  dropdownMode?: "scroll" | "select";
}): DatePickerAdapter {
  const ReactDatePickerCustom: React.FC<DatePickerProps> = (props) => {
    return (
      <Suspense fallback={<LoadingFallback {...props} />}>
        <ReactDatePickerLazy
          selected={props.value}
          onChange={(date) => props.onChange(date)}
          placeholderText={props.placeholder}
          className={props.className}
          minDate={props.minDate}
          maxDate={props.maxDate}
          disabled={props.disabled}
          dateFormat={options?.dateFormat || "yyyy-MM-dd"}
          showMonthDropdown={options?.showMonthDropdown ?? true}
          showYearDropdown={options?.showYearDropdown ?? true}
          dropdownMode={options?.dropdownMode || "select"}
        />
      </Suspense>
    );
  };

  return {
    Component: ReactDatePickerCustom,
    parseValue: reactDatePickerAdapter.parseValue,
    formatValue: reactDatePickerAdapter.formatValue,
  };
}
