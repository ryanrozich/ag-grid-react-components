export interface DateFilterModel {
  type:
    | "equals"
    | "notEqual"
    | "after"
    | "before"
    | "inRange"
    | "blank"
    | "notBlank";
  dateFrom?: string | null;
  dateTo?: string | null;
  includeFrom?: boolean;
  includeTo?: boolean;
}

export interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  "data-testid"?: string;
}

export interface DatePickerAdapter {
  Component: React.ComponentType<DatePickerProps>;
  parseValue: (value: unknown) => Date | null;
  formatValue: (date: Date | null) => string;
}

export interface DateFilterConfig {
  datePickerAdapter?: DatePickerAdapter;
  enableRelativeDates?: boolean;
  relativeExpressionParser?: (expr: string) => Date | null;
  className?: string;
  styles?: {
    container?: string;
    modeToggle?: string;
    typeSelector?: string;
    datePicker?: string;
    actions?: string;
  };
}
