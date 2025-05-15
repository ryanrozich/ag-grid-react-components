import { IFilterParams } from 'ag-grid-community';

export type DateFilterType = 'equals' | 'notEqual' | 'lessThan' | 'greaterThan' | 'inRange';

export type DateFilterMode = 'absolute' | 'relative';

export interface DateFilterModel {
  type: DateFilterType;
  mode: DateFilterMode;
  dateFrom?: Date | null;
  dateTo?: Date | null;
  expressionFrom?: string;
  expressionTo?: string;
}

export interface DateFilterParams extends IFilterParams {
  /**
   * Custom callback to parse date from cell values
   * If not provided, will try to parse with Date constructor
   */
  dateParser?: (value: any) => Date | null;

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
}