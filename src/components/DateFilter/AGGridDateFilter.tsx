import React, { Component } from "react";
import type {
  IDoesFilterPassParams,
  IFilterParams,
  IFilter,
} from "ag-grid-community";
import type { DateFilterModel } from "../interfaces";
import { DateFilter } from "./index";
import { parseRelativeDate } from "./utils";

/**
 * AG Grid compatible wrapper for the headless DateFilter component.
 * This class component properly exposes the filter API that AG Grid expects.
 */
export class AGGridDateFilter
  extends Component<IFilterParams>
  implements IFilter
{
  private model: DateFilterModel | null = null;

  constructor(props: IFilterParams) {
    super(props);
    console.log("[AGGridDateFilter] Constructor called");

    // Bind methods to ensure they're accessible
    this.doesFilterPass = this.doesFilterPass.bind(this);
    this.isFilterActive = this.isFilterActive.bind(this);
    this.getModel = this.getModel.bind(this);
    this.setModel = this.setModel.bind(this);
  }

  // AG Grid lifecycle methods
  doesFilterPass(params: IDoesFilterPassParams): boolean {
    console.log(
      "[AGGridDateFilter] doesFilterPass called with model:",
      this.model,
    );

    if (!this.model || !this.model.filterType) {
      return true; // No filter applied
    }

    const columnId =
      (params as any).column?.getColId() || (params as any).colDef?.field;
    const cellValue = params.data[columnId];

    console.log(
      "[AGGridDateFilter] Checking cell value:",
      cellValue,
      "for column:",
      columnId,
    );

    if (!cellValue) {
      return false; // No value fails all filters except when no filter is applied
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

    if (this.model.dateFrom) {
      if (
        this.model.dateFrom.includes("-") ||
        this.model.dateFrom.toLowerCase().includes("today") ||
        this.model.dateFrom.toLowerCase().includes("month")
      ) {
        // Relative date
        dateFrom = parseRelativeDate(this.model.dateFrom);
      } else {
        // Absolute date
        dateFrom = new Date(this.model.dateFrom);
      }
    }

    if (this.model.dateTo) {
      if (
        this.model.dateTo.includes("-") ||
        this.model.dateTo.toLowerCase().includes("today") ||
        this.model.dateTo.toLowerCase().includes("month")
      ) {
        // Relative date
        dateTo = parseRelativeDate(this.model.dateTo);
      } else {
        // Absolute date
        dateTo = new Date(this.model.dateTo);
      }
    }

    // Apply filter logic based on type
    switch (this.model.filterType) {
      case "equals":
        if (!dateFrom) return false;
        return cellDate.toDateString() === dateFrom.toDateString();

      case "notEqual":
        if (!dateFrom) return false;
        return cellDate.toDateString() !== dateFrom.toDateString();

      case "before":
        if (!dateFrom) return false;
        return cellDate < dateFrom;

      case "after":
        if (!dateFrom) return false;
        return cellDate > dateFrom;

      case "inRange":
        // Handle open-ended ranges
        if (dateFrom && dateTo) {
          return cellDate >= dateFrom && cellDate <= dateTo;
        } else if (dateFrom) {
          return cellDate >= dateFrom;
        } else if (dateTo) {
          return cellDate <= dateTo;
        }
        return false;

      default:
        return true;
    }
  }

  isFilterActive(): boolean {
    console.log(
      "[AGGridDateFilter] isFilterActive called:",
      this.model !== null,
    );
    return this.model !== null;
  }

  getModel(): DateFilterModel | null {
    console.log("[AGGridDateFilter] getModel called:", this.model);
    return this.model;
  }

  setModel(model: DateFilterModel | null): void {
    console.log("[AGGridDateFilter] setModel called with:", model);
    this.model = model;

    // Force re-render to update the UI
    this.forceUpdate();

    // Notify AG Grid that the filter has changed
    if (this.props.filterChangedCallback) {
      console.log("[AGGridDateFilter] Calling filterChangedCallback");
      this.props.filterChangedCallback();
    }
  }

  // Additional AG Grid methods that might be needed
  afterGuiAttached?(): void {
    console.log("[AGGridDateFilter] afterGuiAttached called");
  }

  // React render method
  render() {
    return React.createElement(DateFilter, {
      ...this.props,
      model: this.model,
      onModelChange: (newModel: DateFilterModel | null) => {
        this.setModel(newModel);
      },
    });
  }
}

// Mark as AG Grid component
(AGGridDateFilter as any).__AG_GRID_COMPONENT = true;
