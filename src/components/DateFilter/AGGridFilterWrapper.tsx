import {
  IDoesFilterPassParams,
  IFilterParams,
  IAfterGuiAttachedParams,
  IFilter,
} from "ag-grid-community";
import type { DateFilterModel } from "../interfaces";
import { parseRelativeDate } from "./utils";

/**
 * AG Grid Filter Wrapper that properly implements the IFilter interface
 * This is instantiated directly by AG Grid, not through React
 */
export class AGGridFilterWrapper implements IFilter {
  private params: IFilterParams;
  private model: DateFilterModel | null = null;
  private gui!: HTMLElement;
  private _logCount = 0;
  private _passCount = 0;
  private _failCount = 0;

  constructor(params: IFilterParams) {
    this.params = params;
    console.log(
      "[AGGridFilterWrapper] Constructor called with params:",
      params,
    );
  }

  // Required by AG Grid
  init(params: IFilterParams): void {
    console.log("[AGGridFilterWrapper] init called");
    this.params = params;
    this.gui = document.createElement("div");
    this.gui.innerHTML = "<div>Date Filter</div>";
  }

  // Required by AG Grid
  getGui(): HTMLElement {
    return this.gui;
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    // Check for both 'type' and 'filterType' as different parts of the code use different names
    if (!this.model) {
      return true; // No filter applied
    }

    const filterType = (this.model as any).type || this.model.filterType;
    if (!filterType) {
      return true; // No filter applied
    }

    // Get the field name from params
    const field = this.params?.colDef?.field;
    if (!field) {
      console.error("[AGGridFilterWrapper] No field found in colDef", {
        params: this.params,
        data: params,
      });
      return true;
    }

    const cellValue = params.data[field];

    if (!cellValue) {
      console.log("[AGGridFilterWrapper] No value for field:", field);
      return false; // No value fails all filters
    }

    let cellDate: Date;
    try {
      cellDate = new Date(cellValue);
      if (isNaN(cellDate.getTime())) {
        return false;
      }
    } catch {
      return false;
    }

    // Parse dates from model
    let dateFrom: Date | null = null;
    let dateTo: Date | null = null;

    if ((this.model as any).dateFrom || (this.model as any).expressionFrom) {
      const fromValue =
        (this.model as any).dateFrom || (this.model as any).expressionFrom;
      const isRelative =
        fromValue.includes("-") ||
        fromValue.toLowerCase().includes("today") ||
        fromValue.toLowerCase().includes("month");
      dateFrom = isRelative
        ? parseRelativeDate(fromValue)
        : new Date(fromValue);
    }

    if ((this.model as any).dateTo || (this.model as any).expressionTo) {
      const toValue =
        (this.model as any).dateTo || (this.model as any).expressionTo;
      const isRelative =
        toValue.includes("-") ||
        toValue.toLowerCase().includes("today") ||
        toValue.toLowerCase().includes("month");
      dateTo = isRelative ? parseRelativeDate(toValue) : new Date(toValue);
    }

    // Apply filter logic
    let result = true;

    switch (filterType) {
      case "equals":
        result = dateFrom
          ? cellDate.toDateString() === dateFrom.toDateString()
          : false;
        break;
      case "notEqual":
        result = dateFrom
          ? cellDate.toDateString() !== dateFrom.toDateString()
          : false;
        break;
      case "before":
        result = dateFrom ? cellDate < dateFrom : false;
        break;
      case "after":
        result = dateFrom ? cellDate > dateFrom : false;
        break;
      case "inRange":
        if (dateFrom && dateTo) {
          result = cellDate >= dateFrom && cellDate <= dateTo;
        } else if (dateFrom) {
          result = cellDate >= dateFrom;
        } else if (dateTo) {
          result = cellDate <= dateTo;
        } else {
          result = false;
        }
        break;
      default:
        result = true;
    }

    // Log the first few calls and then summarize
    this._logCount++;
    if (result) {
      this._passCount++;
    } else {
      this._failCount++;
    }

    if (this._logCount <= 5) {
      console.log("[AGGridFilterWrapper] Filter result:", {
        cellValue,
        cellDate: cellDate.toISOString(),
        dateFrom: dateFrom?.toISOString() || null,
        dateTo: dateTo?.toISOString() || null,
        filterType: filterType,
        result,
      });
    } else if (this._logCount === 100) {
      console.log("[AGGridFilterWrapper] Filter summary after 100 calls:", {
        total: this._logCount,
        passed: this._passCount,
        failed: this._failCount,
        passRate: `${((this._passCount / this._logCount) * 100).toFixed(1)}%`,
      });
    }

    return result;
  }

  isFilterActive(): boolean {
    const isActive = this.model !== null;
    console.log("[AGGridFilterWrapper] isFilterActive:", isActive);
    return isActive;
  }

  getModel(): DateFilterModel | null {
    console.log("[AGGridFilterWrapper] getModel:", this.model);
    return this.model;
  }

  setModel(model: DateFilterModel | null): void {
    console.log("[AGGridFilterWrapper] setModel called with:", model);
    this.model = model;

    // Notify AG Grid that the filter has changed
    if (this.params?.filterChangedCallback) {
      console.log("[AGGridFilterWrapper] Calling filterChangedCallback");
      this.params.filterChangedCallback();
    }
  }

  // Optional AG Grid methods
  afterGuiAttached?(_params?: IAfterGuiAttachedParams): void {
    console.log("[AGGridFilterWrapper] afterGuiAttached called");
  }

  destroy?(): void {
    console.log("[AGGridFilterWrapper] destroy called");
  }
}
