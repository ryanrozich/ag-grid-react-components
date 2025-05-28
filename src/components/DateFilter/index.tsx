import React, { useCallback, useMemo } from "react";
import { useGridFilter } from "ag-grid-react";
import { IRowNode } from "ag-grid-community";
import { format } from "date-fns";

import { DateFilterParams, DateFilterModel } from "./types";
import { logger } from "../../utils/logger";

import {
  FilterModeToggle,
  FilterTypeSelector,
  AbsoluteDatePicker,
  RelativeExpressionInput,
  FilterActions,
} from "./components";

import { useFilterState, useFilterValidation } from "./hooks";
import { useDebouncedValidation } from "./hooks/useDebouncedValidation";

const DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

const DateFilter = (props: DateFilterParams) => {
  const dateFormat = props.dateFormat || DEFAULT_DATE_FORMAT;
  
  // Use custom hooks for state management
  const filterState = useFilterState(props.model, props.defaultMode);
  
  // Filter type changes are now properly managed
  const validation = useFilterValidation({
    filterType: filterState.filterType,
    filterMode: filterState.filterMode,
    absoluteDateFrom: filterState.absoluteDateFrom,
    absoluteDateTo: filterState.absoluteDateTo,
    expressionFrom: filterState.expressionFrom,
    expressionTo: filterState.expressionTo,
    fromExpressionValid: filterState.fromExpressionValid,
    toExpressionValid: filterState.toExpressionValid,
  });

  // Use debounced validation for better performance (300ms delay)
  useDebouncedValidation({
    expressionFrom: filterState.expressionFrom,
    expressionTo: filterState.expressionTo,
    filterMode: filterState.filterMode,
    onFromValidityChange: filterState.setFromExpressionValid,
    onToValidityChange: filterState.setToExpressionValid,
    onToErrorChange: filterState.setToExpressionError,
    validateToExpression: validation.validateToExpression,
    debounceDelay: 300, // 300ms debounce for optimal UX
  });

  // Parse cell values to date
  const parseValue = useCallback(
    (value: unknown): Date | null => {
      if (props.dateParser) {
        return props.dateParser(value);
      }

      if (value instanceof Date) {
        return value;
      }

      if (typeof value === "string" || typeof value === "number") {
        const date = new Date(value);
        return isNaN(date.getTime()) ? null : date;
      }

      return null;
    },
    [props.dateParser],
  );

  // Build current filter model
  const currentModel = useMemo((): DateFilterModel | null => {
    if (!validation.isFilterValid) return null;

    const model: DateFilterModel = {
      type: filterState.filterType,
      mode: filterState.filterMode,
    };

    if (filterState.filterMode === "absolute") {
      model.dateFrom = filterState.absoluteDateFrom;
      if (filterState.filterType === "inRange") {
        model.dateTo = filterState.absoluteDateTo;
      }
    } else {
      model.expressionFrom = filterState.expressionFrom;
      if (filterState.filterType === "inRange") {
        model.expressionTo = filterState.expressionTo;
      }
    }

    // Add inclusivity settings
    model.fromInclusive = props.rangeInclusive?.from ?? false;
    model.toInclusive = props.rangeInclusive?.to ?? false;

    return model;
  }, [
    validation.isFilterValid,
    filterState.filterType,
    filterState.filterMode,
    filterState.absoluteDateFrom,
    filterState.absoluteDateTo,
    filterState.expressionFrom,
    filterState.expressionTo,
    props.rangeInclusive,
  ]);

  // Filter implementation
  const doesFilterPass = useCallback(
    ({ node }: { node: IRowNode }) => {
      if (!validation.isFilterValid || !currentModel) return true;

      const cellValue = props.getValue(node);
      const cellDate = parseValue(cellValue);

      if (!cellDate) return false;

      // Normalize dates for comparison (remove time component)
      const normalizedCellDate = new Date(cellDate);
      normalizedCellDate.setHours(0, 0, 0, 0);

      let normalizedDateFrom = null;
      if (validation.effectiveDateFrom) {
        normalizedDateFrom = new Date(validation.effectiveDateFrom);
        normalizedDateFrom.setHours(0, 0, 0, 0);
      }

      let normalizedDateTo = null;
      if (validation.effectiveDateTo) {
        normalizedDateTo = new Date(validation.effectiveDateTo);
        normalizedDateTo.setHours(0, 0, 0, 0);
      }

      // Get inclusivity settings from model or fall back to props defaults
      const fromInclusive = currentModel.fromInclusive ?? props.afterInclusive ?? false;
      const toInclusive = currentModel.toInclusive ?? props.beforeInclusive ?? false;

      switch (filterState.filterType) {
        case "equals":
          return normalizedDateFrom ? normalizedCellDate.getTime() === normalizedDateFrom.getTime() : false;
        case "notEqual":
          return normalizedDateFrom ? normalizedCellDate.getTime() !== normalizedDateFrom.getTime() : true;
        case "after":
          if (!normalizedDateFrom) return false;
          return fromInclusive
            ? normalizedCellDate.getTime() >= normalizedDateFrom.getTime()
            : normalizedCellDate.getTime() > normalizedDateFrom.getTime();
        case "before":
          if (!normalizedDateFrom) return false;
          return toInclusive
            ? normalizedCellDate.getTime() <= normalizedDateFrom.getTime()
            : normalizedCellDate.getTime() < normalizedDateFrom.getTime();
        case "inRange":
          if (!normalizedDateFrom || !normalizedDateTo) return false;
          const afterStart = fromInclusive
            ? normalizedCellDate.getTime() >= normalizedDateFrom.getTime()
            : normalizedCellDate.getTime() > normalizedDateFrom.getTime();
          const beforeEnd = toInclusive
            ? normalizedCellDate.getTime() <= normalizedDateTo.getTime()
            : normalizedCellDate.getTime() < normalizedDateTo.getTime();
          return afterStart && beforeEnd;
        default:
          return true;
      }
    },
    [
      validation.isFilterValid,
      currentModel,
      props.getValue,
      parseValue,
      validation.effectiveDateFrom,
      validation.effectiveDateTo,
      filterState.filterType,
      props.afterInclusive,
      props.beforeInclusive,
    ],
  );

  // Event handlers - Simplified since validation is now debounced
  const handleExpressionFromChange = useCallback((value: string) => {
    filterState.setExpressionFrom(value);
    // Validation is handled by useDebouncedValidation hook with 300ms delay
  }, [filterState]);

  const handleExpressionToChange = useCallback((value: string) => {
    filterState.setExpressionTo(value);
    // Validation is handled by useDebouncedValidation hook with 300ms delay
  }, [filterState]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && validation.isFilterValid) {
      e.preventDefault();
      applyFilter();
    }
  }, [validation.isFilterValid]);

  const applyFilter = useCallback(() => {
    if (props.onModelChange) {
      props.onModelChange(currentModel);
    }
    logger.debug("Applied filter:", currentModel);
  }, [props.onModelChange, currentModel]);

  const resetFilter = useCallback(() => {
    filterState.resetState();
    if (props.onModelChange) {
      props.onModelChange(null);
    }
    logger.debug("Reset filter");
  }, [filterState, props.onModelChange]);

  // Register with AG Grid
  const callbacks = {
    doesFilterPass,
    getModelAsString: () => {
      if (!currentModel) return "";
      
      if (currentModel.mode === "absolute") {
        if (currentModel.type === "inRange") {
          const fromStr = currentModel.dateFrom ? format(currentModel.dateFrom, dateFormat) : "";
          const toStr = currentModel.dateTo ? format(currentModel.dateTo, dateFormat) : "";
          return `${fromStr} to ${toStr}`;
        }
        return currentModel.dateFrom ? format(currentModel.dateFrom, dateFormat) : "";
      } else {
        if (currentModel.type === "inRange") {
          return `${currentModel.expressionFrom || ""} to ${currentModel.expressionTo || ""}`;
        }
        return currentModel.expressionFrom || "";
      }
    },
    getModel: useCallback(() => {
      return currentModel;
    }, [currentModel]),
    setModel: useCallback((model: DateFilterModel | null) => {
      if (!model) {
        resetFilter();
        return;
      }
      filterState.initializeFromModel(model);
    }, [resetFilter, filterState.initializeFromModel]),
    onNewRowsLoaded: () => {
      // Handle new rows if needed
    },
  };

  useGridFilter(callbacks);

  // Model is handled during initial state creation in useFilterState
  // No ongoing synchronization to avoid state conflicts

  return (
    <div
      className="ag-date-filter"
      data-testid={props.testId}
      style={{ padding: "1rem", minWidth: "300px" }}
    >
      <FilterTypeSelector
        filterType={filterState.filterType}
        onTypeChange={filterState.setFilterType}
      />

      <FilterModeToggle
        mode={filterState.filterMode}
        onModeChange={filterState.toggleFilterMode}
      />

      <div className="date-inputs-section" style={{ marginBottom: "1rem" }}>
        {filterState.filterMode === "absolute" ? (
          <AbsoluteDatePicker
            filterType={filterState.filterType}
            dateFrom={filterState.absoluteDateFrom}
            dateTo={filterState.absoluteDateTo}
            onDateFromChange={filterState.setAbsoluteDateFrom}
            onDateToChange={filterState.setAbsoluteDateTo}
            dateFormat={dateFormat}
            minDate={props.minDate}
            maxDate={props.maxDate}
            onApply={applyFilter}
            isFilterValid={validation.isFilterValid}
          />
        ) : (
          <RelativeExpressionInput
            filterType={filterState.filterType}
            expressionFrom={filterState.expressionFrom}
            expressionTo={filterState.expressionTo}
            onExpressionFromChange={handleExpressionFromChange}
            onExpressionToChange={handleExpressionToChange}
            dateFormat={dateFormat}
            resolvedDateFrom={validation.resolvedDateFrom}
            resolvedDateTo={validation.resolvedDateTo}
            fromValid={filterState.fromExpressionValid}
            toValid={filterState.toExpressionValid}
            toError={filterState.toExpressionError}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>

      <FilterActions
        onReset={resetFilter}
        onApply={applyFilter}
        isValid={validation.isFilterValid}
      />
    </div>
  );
};

export default DateFilter;