import { IFilterParams } from "ag-grid-community";

export type DateFilterType =
  | "equals"
  | "notEqual"
  | "before"
  | "after"
  | "inRange";

export type DateFilterMode = "absolute" | "relative";

export interface DateFilterModel {
  filterType: DateFilterType;
  type?: DateFilterType; // Alias for filterType for backward compatibility
  mode?: DateFilterMode;
  dateFrom?: string | Date;
  dateTo?: string | Date;
  expressionFrom?: string;
  expressionTo?: string;
  fromInclusive?: boolean;
  toInclusive?: boolean;
}

export interface DateFilterParams extends IFilterParams {
  /**
   * Optional test id for testing purposes. If provided, will be used as data-testid on the filter root.
   */
  testId?: string;

  /**
   * Custom callback to parse date from cell values
   * If not provided, will try to parse with Date constructor
   */
  dateParser?: (value: unknown) => Date | null;

  /**
   * Default filter mode (absolute or relative)
   * Defaults to 'absolute'
   */
  defaultMode?: DateFilterMode;

  /**
   * Custom date format for display
   * Defaults to 'yyyy-MM-dd'
   */
  dateFormat?: string;

  /**
   * Minimum date allowed in the date picker
   */
  minDate?: Date;

  /**
   * Maximum date allowed in the date picker
   */
  maxDate?: Date;

  /**
   * Model for the filter
   */
  model?: DateFilterModel;

  /**
   * Callback when model changes
   */
  onModelChange?: (model: DateFilterModel | null) => void;

  /**
   * Whether 'before' filter should be inclusive (<=) or exclusive (<)
   * Defaults to false (exclusive)
   */
  beforeInclusive?: boolean;

  /**
   * Whether 'after' filter should be inclusive (>=) or exclusive (>)
   * Defaults to false (exclusive)
   */
  afterInclusive?: boolean;

  /**
   * Whether 'inRange' filter bounds should be inclusive
   */
  rangeInclusive?: {
    /** Whether start date is inclusive (>=) or exclusive (>) */
    from?: boolean;
    /** Whether end date is inclusive (<=) or exclusive (<) */
    to?: boolean;
  };
}
