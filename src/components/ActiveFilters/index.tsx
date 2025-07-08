import React from "react";
import type { GridApi, FilterModel } from "ag-grid-community";
import styles from "./ActiveFilters.module.css";
import type { DateFilterModel } from "../interfaces";
// import { FilterPresetManager } from "../FilterPresetManager"; // TODO: Update to use new FilterPresetManagerV2

export interface ActiveFiltersProps {
  api: GridApi;
  filterModel: FilterModel;
  className?: string;
  enablePresets?: boolean;
  onPresetApplied?: (preset: {
    name: string;
    filterModel: FilterModel;
  }) => void;
}

interface FilterPill {
  columnId: string;
  columnName: string;
  filterType: string;
  displayValue: string;
}

// Union type for different filter model types
type SingleFilterModel =
  | DateFilterModel
  | TextFilterModel
  | SetFilterModel
  | NumberFilterModel;

interface TextFilterModel {
  type?: string;
  filter?: string | number;
  filterType?: string;
}

interface SetFilterModel {
  type?: string;
  values?: (string | number)[];
}

interface NumberFilterModel {
  type?: string;
  filter?: number;
  filterTo?: number;
}

// Type guards
function isDateFilterModel(model: SingleFilterModel): model is DateFilterModel {
  return (
    "mode" in model ||
    "dateFrom" in model ||
    "dateTo" in model ||
    "expressionFrom" in model
  );
}

function isSetFilterModel(model: SingleFilterModel): model is SetFilterModel {
  return "values" in model && Array.isArray(model.values);
}

function isTextFilterModel(model: SingleFilterModel): model is TextFilterModel {
  return "filter" in model && !("filterTo" in model);
}

function isNumberFilterModel(
  model: SingleFilterModel,
): model is NumberFilterModel {
  return "filter" in model && "filterTo" in model;
}

function getFilterDisplayValue(model: SingleFilterModel): string {
  if (!model) return "";

  // Handle date filters
  if (isDateFilterModel(model)) {
    if (model.mode === "relative") {
      const expression =
        model.expressionFrom || (model as any).expression || "";
      if (model.type === "inRange") {
        return `${expression} to ${model.expressionTo || ""}`;
      }
      switch (model.type) {
        case "equals":
          return expression;
        case "notEqual":
          return `not ${expression}`;
        case "before":
          return `before ${expression}`;
        case "after":
          return `after ${expression}`;
        default:
          return expression;
      }
    }

    if (model.type === "inRange") {
      const from = model.dateFrom
        ? new Date(model.dateFrom).toLocaleDateString()
        : "";
      const to = model.dateTo
        ? new Date(model.dateTo).toLocaleDateString()
        : "";
      return `${from} to ${to}`;
    }

    if (model.dateFrom) {
      const date = new Date(model.dateFrom).toLocaleDateString();
      switch (model.type) {
        case "equals":
          return date;
        case "notEqual":
          return `not ${date}`;
        case "before":
          return `before ${date}`;
        case "after":
          return `after ${date}`;
        default:
          return date;
      }
    }
  }

  // Handle set filters
  if (isSetFilterModel(model) && model.values) {
    return model.values.join(", ");
  }

  // Handle text/number filters
  if (isTextFilterModel(model) || isNumberFilterModel(model)) {
    return String(model.filter);
  }

  return "Active";
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  api,
  filterModel,
  className = "",
  enablePresets: _enablePresets = false,
  onPresetApplied: _onPresetApplied,
}) => {
  const filterPills: FilterPill[] = React.useMemo(() => {
    const pills: FilterPill[] = [];

    Object.entries(filterModel).forEach(([columnId, model]) => {
      const column = api.getColumn(columnId);
      const columnName = column?.getColDef().headerName || columnId;
      const displayValue = getFilterDisplayValue(model as SingleFilterModel);

      pills.push({
        columnId,
        columnName,
        filterType: (model as SingleFilterModel).type || "custom",
        displayValue,
      });
    });

    return pills;
  }, [filterModel, api]);

  const removeFilter = (columnId: string) => {
    const newModel = { ...filterModel };
    delete newModel[columnId];
    api.setFilterModel(newModel);
  };

  const clearAllFilters = () => {
    api.setFilterModel({});
  };

  if (filterPills.length === 0) {
    return null;
  }

  return (
    <div
      className={`${styles.container} ${className}`}
      data-testid="active-filters"
    >
      <div className={styles.filterPills}>
        {filterPills.map((pill) => (
          <div key={pill.columnId} className={styles.filterPill}>
            <span className={styles.pillLabel}>
              <span className={styles.columnName}>{pill.columnName}:</span>
              <span className={styles.filterValue}>{pill.displayValue}</span>
            </span>
            <button
              className={styles.removeButton}
              onClick={() => removeFilter(pill.columnId)}
              aria-label={`Remove ${pill.columnName} filter`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className={styles.actions}>
        <button
          className={styles.clearAllButton}
          onClick={clearAllFilters}
          aria-label="Clear all filters"
        >
          Clear all
        </button>
        {/* TODO: Update to use new FilterPresetManagerV2
        {enablePresets && (
          <FilterPresetManager api={api} onPresetApplied={onPresetApplied} />
        )} */}
      </div>
    </div>
  );
};

export default ActiveFilters;
