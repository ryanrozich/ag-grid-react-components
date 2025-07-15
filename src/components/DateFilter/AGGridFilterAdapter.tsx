import React, { Component } from "react";
import type {
  IDoesFilterPassParams,
  IFilterParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";
import type { DateFilterModel } from "../interfaces";
import { DateFilter } from "./index";
import { parseRelativeDate } from "./utils";

/**
 * AG Grid Filter Adapter that properly implements the IFilter interface
 * This follows AG Grid's official pattern for custom filter components
 */
export class AGGridFilterAdapter extends Component<
  IFilterParams,
  { model: DateFilterModel | null }
> {
  private filterInstance: any = null;
  private _isMounted = false;
  private _logCount = 0;
  private _passCount = 0;
  private _failCount = 0;

  private _props: IFilterParams;

  constructor(props: IFilterParams) {
    super(props || ({} as IFilterParams));
    this._props = props;
    this.state = {
      model: null,
    };

    console.log("[AGGridFilterAdapter] Constructor called with props:", props);

    // Bind all filter methods
    this.doesFilterPass = this.doesFilterPass.bind(this);
    this.isFilterActive = this.isFilterActive.bind(this);
    this.getModel = this.getModel.bind(this);
    this.setModel = this.setModel.bind(this);

    // Bind optional methods if they exist
    if (this.afterGuiAttached) {
      this.afterGuiAttached = this.afterGuiAttached.bind(this);
    }
    if (this.onFloatingFilterChanged) {
      this.onFloatingFilterChanged = this.onFloatingFilterChanged.bind(this);
    }
    if (this.onNewRowsLoaded) {
      this.onNewRowsLoaded = this.onNewRowsLoaded.bind(this);
    }
  }

  componentDidMount() {
    console.log("[AGGridFilterAdapter] componentDidMount");
    this._isMounted = true;
    // If we have a model that was set before mount, notify the grid
    if (this.state.model && this._props?.filterChangedCallback) {
      console.log("[AGGridFilterAdapter] Notifying grid of initial model");
      this._props.filterChangedCallback();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // AG Grid IFilter methods
  doesFilterPass(params: IDoesFilterPassParams): boolean {
    const model = this.state.model;

    // Check for both 'type' and 'filterType' as different parts of the code use different names
    if (!model) {
      return true; // No filter applied
    }

    const filterType = (model as any).type || model.filterType;
    if (!filterType) {
      return true; // No filter applied
    }

    // Get the field name from params
    const field = this._props?.colDef?.field;
    if (!field) {
      console.error("[AGGridFilterAdapter] No field found in colDef", {
        props: this.props,
        _props: this._props,
        params: params,
      });
      return true;
    }

    const cellValue = params.data[field];

    if (!cellValue) {
      console.log("[AGGridFilterAdapter] No value for field:", field);
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

    if (model.dateFrom) {
      const isRelative =
        model.dateFrom.includes("-") ||
        model.dateFrom.toLowerCase().includes("today") ||
        model.dateFrom.toLowerCase().includes("month");
      dateFrom = isRelative
        ? parseRelativeDate(model.dateFrom)
        : new Date(model.dateFrom);
    }

    if (model.dateTo) {
      const isRelative =
        model.dateTo.includes("-") ||
        model.dateTo.toLowerCase().includes("today") ||
        model.dateTo.toLowerCase().includes("month");
      dateTo = isRelative
        ? parseRelativeDate(model.dateTo)
        : new Date(model.dateTo);
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
      console.log("[AGGridFilterAdapter] Filter result:", {
        cellValue,
        cellDate: cellDate.toISOString(),
        dateFrom: dateFrom?.toISOString() || null,
        dateTo: dateTo?.toISOString() || null,
        filterType: filterType,
        result,
      });
    } else if (this._logCount === 100) {
      console.log("[AGGridFilterAdapter] Filter summary after 100 calls:", {
        total: this._logCount,
        passed: this._passCount,
        failed: this._failCount,
        passRate: `${((this._passCount / this._logCount) * 100).toFixed(1)}%`,
      });
    }

    return result;
  }

  isFilterActive(): boolean {
    const isActive = this.state.model !== null;
    console.log("[AGGridFilterAdapter] isFilterActive:", isActive);
    return isActive;
  }

  getModel(): DateFilterModel | null {
    console.log("[AGGridFilterAdapter] getModel:", this.state.model);
    return this.state.model;
  }

  setModel(model: DateFilterModel | null): void {
    console.log("[AGGridFilterAdapter] setModel called with:", model);

    // Check if component is mounted
    if (!this._isMounted) {
      console.log(
        "[AGGridFilterAdapter] Component not mounted yet, storing model directly",
      );
      this.state = { model };
      return;
    }

    this.setState({ model }, () => {
      // Notify AG Grid that the filter has changed
      if (this._props?.filterChangedCallback) {
        console.log("[AGGridFilterAdapter] Calling filterChangedCallback");
        this._props.filterChangedCallback();
      }
    });
  }

  // Optional AG Grid methods
  afterGuiAttached?(_params?: IAfterGuiAttachedParams): void {
    console.log("[AGGridFilterAdapter] afterGuiAttached called");
  }

  onFloatingFilterChanged?(type: string, value: any): void {
    console.log("[AGGridFilterAdapter] onFloatingFilterChanged:", type, value);
  }

  onNewRowsLoaded?(): void {
    console.log("[AGGridFilterAdapter] onNewRowsLoaded called");
  }

  // Ref handling for AG Grid
  getGui() {
    return this.filterInstance;
  }

  setFilterInstance = (ref: any) => {
    this.filterInstance = ref;
  };

  render() {
    return React.createElement(
      "div",
      { ref: this.setFilterInstance },
      React.createElement(DateFilter, {
        ...(this._props || {}),
        model: this.state.model,
        onModelChange: (newModel: DateFilterModel | null) => {
          this.setModel(newModel);
        },
      }),
    );
  }
}

// Export a factory function that AG Grid can use
export function AGGridDateFilter(props: IFilterParams) {
  return <AGGridFilterAdapter {...props} />;
}

// Mark as AG Grid component for both the class and factory
(AGGridFilterAdapter as any).__AG_GRID_COMPONENT = true;
(AGGridDateFilter as any).__AG_GRID_COMPONENT = true;
