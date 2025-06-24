import React from "react";
import type { GridApi, FilterModel } from "ag-grid-community";
import styles from "./ActiveFilters.module.css";

export interface ActiveFiltersProps {
  api: GridApi;
  filterModel: FilterModel;
  className?: string;
}

interface FilterPill {
  columnId: string;
  columnName: string;
  filterType: string;
  displayValue: string;
}

function getFilterDisplayValue(model: any): string {
  if (!model) return "";

  // Handle date filters
  if (model.mode === "relative") {
    if (model.type === "inRange") {
      return `${model.expressionFrom || ""} to ${model.expressionTo || ""}`;
    }
    return model.expressionFrom || model.expression || "";
  }

  if (model.type === "inRange") {
    const from = model.dateFrom
      ? new Date(model.dateFrom).toLocaleDateString()
      : "";
    const to = model.dateTo ? new Date(model.dateTo).toLocaleDateString() : "";
    return `${from} to ${to}`;
  }

  if (model.dateFrom) {
    const date = new Date(model.dateFrom).toLocaleDateString();
    switch (model.type) {
      case "equals":
        return date;
      case "notEqual":
        return `not ${date}`;
      case "lessThan":
        return `before ${date}`;
      case "greaterThan":
        return `after ${date}`;
      default:
        return date;
    }
  }

  // Handle set filters
  if (model.values && Array.isArray(model.values)) {
    return model.values.join(", ");
  }

  // Handle text filters
  if (model.filter !== undefined) {
    return String(model.filter);
  }

  return "Active";
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  api,
  filterModel,
  className = "",
}) => {
  const filterPills: FilterPill[] = React.useMemo(() => {
    const pills: FilterPill[] = [];

    Object.entries(filterModel).forEach(([columnId, model]) => {
      const column = api.getColumn(columnId);
      const columnName = column?.getColDef().headerName || columnId;
      const displayValue = getFilterDisplayValue(model);

      pills.push({
        columnId,
        columnName,
        filterType: (model as any).type || "custom",
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
    <div className={`${styles.container} ${className}`}>
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
      <button
        className={styles.clearAllButton}
        onClick={clearAllFilters}
        aria-label="Clear all filters"
      >
        Clear all
      </button>
    </div>
  );
};

export default ActiveFilters;
