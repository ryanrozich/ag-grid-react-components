import React, { useEffect, useState, useCallback } from "react";
import type { Column, FilterModel } from "ag-grid-community";
import type { ActiveFiltersProps } from "./types";

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  api,
  className,
  pillClassName,
  clearAllClassName,
  onFilterRemoved,
  onAllFiltersCleared,
  showClearAll = true,
  clearAllLabel = "Clear all",
  formatFilterValue,
  styles = {},
}) => {
  const [activeFilters, setActiveFilters] = useState<
    Array<{ columnId: string; column: Column; filterModel: any }>
  >([]);

  const updateActiveFilters = useCallback(() => {
    if (!api) return;

    const filterModel = api.getFilterModel();
    const filters: Array<{
      columnId: string;
      column: Column;
      filterModel: any;
    }> = [];

    Object.entries(filterModel).forEach(([columnId, filterValue]) => {
      const column = api.getColumn(columnId);
      if (column && filterValue) {
        filters.push({ columnId, column, filterModel: filterValue });
      }
    });

    setActiveFilters(filters);
  }, [api]);

  useEffect(() => {
    if (!api) return;

    updateActiveFilters();

    const onFilterChanged = () => {
      updateActiveFilters();
    };

    api.addEventListener("filterChanged", onFilterChanged);
    return () => {
      api.removeEventListener("filterChanged", onFilterChanged);
    };
  }, [api, updateActiveFilters]);

  const removeFilter = useCallback(
    (columnId: string) => {
      if (!api) return;

      const currentModel = api.getFilterModel() as FilterModel;
      const newModel = { ...currentModel };
      delete newModel[columnId];

      api.setFilterModel(newModel);
      onFilterRemoved?.(columnId);
    },
    [api, onFilterRemoved],
  );

  const clearAllFilters = useCallback(() => {
    if (!api) return;

    api.setFilterModel(null);
    onAllFiltersCleared?.();
  }, [api, onAllFiltersCleared]);

  const getFilterDisplayValue = useCallback(
    (column: Column, filterModel: any): string => {
      if (formatFilterValue) {
        return formatFilterValue(column, filterModel);
      }

      // Default formatting for common filter types
      if (filterModel.type) {
        switch (filterModel.type) {
          case "equals":
            return `equals ${filterModel.filter || filterModel.dateFrom || ""}`;
          case "notEqual":
            return `not equal to ${filterModel.filter || filterModel.dateFrom || ""}`;
          case "contains":
            return `contains "${filterModel.filter}"`;
          case "notContains":
            return `doesn't contain "${filterModel.filter}"`;
          case "startsWith":
            return `starts with "${filterModel.filter}"`;
          case "endsWith":
            return `ends with "${filterModel.filter}"`;
          case "lessThan":
          case "before":
            return `before ${filterModel.filter || filterModel.dateFrom || ""}`;
          case "greaterThan":
          case "after":
            return `after ${filterModel.filter || filterModel.dateFrom || ""}`;
          case "inRange":
            return `between ${filterModel.filter || filterModel.dateFrom || ""} and ${filterModel.filterTo || filterModel.dateTo || ""}`;
          case "blank":
            return "is blank";
          case "notBlank":
            return "is not blank";
          default:
            return filterModel.type;
        }
      }

      // For set filters
      if (filterModel.values) {
        return filterModel.values.join(", ");
      }

      return "filtered";
    },
    [formatFilterValue],
  );

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className={className || styles.container || "agrc-active-filters"}>
      {activeFilters.map(({ columnId, column, filterModel }) => (
        <div
          key={columnId}
          className={
            pillClassName || styles.pill || "agrc-active-filters__pill"
          }
        >
          <span className={styles.pillLabel || "agrc-active-filters__label"}>
            {column.getColDef().headerName || columnId}
          </span>
          <span className={styles.pillValue || "agrc-active-filters__value"}>
            {getFilterDisplayValue(column, filterModel)}
          </span>
          <button
            className={styles.pillRemove || "agrc-active-filters__remove"}
            onClick={() => removeFilter(columnId)}
            aria-label={`Remove ${column.getColDef().headerName || columnId} filter`}
            type="button"
          >
            ×
          </button>
        </div>
      ))}

      {showClearAll && activeFilters.length > 1 && (
        <button
          className={
            clearAllClassName ||
            styles.clearAll ||
            "agrc-active-filters__clear-all"
          }
          onClick={clearAllFilters}
          type="button"
        >
          {clearAllLabel}
        </button>
      )}
    </div>
  );
};
