import React from "react";
import type { DatePickerAdapter, DatePickerProps } from "../types";

const NativeDatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder,
  className,
  disabled,
  "data-testid": testId,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value ? new Date(e.target.value) : null;
    onChange(newValue);
  };

  const formattedValue = value ? value.toISOString().split("T")[0] : "";

  return (
    <input
      type="date"
      value={formattedValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      data-testid={testId}
    />
  );
};

export const nativeDateAdapter: DatePickerAdapter = {
  Component: NativeDatePicker,

  parseValue: (value: unknown): Date | null => {
    if (!value) return null;
    if (value instanceof Date) return value;
    if (typeof value === "string") {
      const parsed = new Date(value);
      return isNaN(parsed.getTime()) ? null : parsed;
    }
    return null;
  },

  formatValue: (date: Date | null): string => {
    if (!date) return "";
    return date.toISOString();
  },
};
