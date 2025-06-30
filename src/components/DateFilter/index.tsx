import React, { useCallback, useMemo } from "react";
import { useGridFilter } from "ag-grid-react";
import { IRowNode, IFilter } from "ag-grid-community";
import { format } from "date-fns";

import { DateFilterParams, DateFilterModel } from "./types";
import { logger } from "../../utils/logger";

import {
  FilterModeToggle,
  FilterTypeSelector,
  TextDateInput,
  RelativeExpressionInput,
  FilterActions,
} from "./components";

import { useFilterState, useFilterValidation } from "./hooks";
import { useDebouncedValidation } from "./hooks/useDebouncedValidation";
import { withErrorBoundary, useErrorHandler } from "./utils/withErrorBoundary";

import styles from "./DateFilter.module.css";

const DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

const DateFilterComponent = React.forwardRef<IFilter, DateFilterParams>(
  (props, ref) => {
    const dateFormat = props.dateFormat || DEFAULT_DATE_FORMAT;
    const { handleError } = useErrorHandler();
    const filterRef = React.useRef<HTMLDivElement>(null);

    // Destructure props for useCallback dependencies
    const {
      filterChangedCallback,
      onModelChange,
      dateParser,
      getValue,
      afterInclusive,
      beforeInclusive,
      rangeInclusive,
      model: initialModel,
      defaultMode,
    } = props;

    // Use custom hooks for state management
    const filterState = useFilterState(initialModel, defaultMode);

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
        if (dateParser) {
          return dateParser(value);
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
      [dateParser],
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

      // Add inclusivity settings - prefer state values, then model values, then prop defaults
      model.fromInclusive =
        filterState.fromInclusive ?? rangeInclusive?.from ?? false;
      model.toInclusive =
        filterState.toInclusive ?? rangeInclusive?.to ?? false;

      return model;
    }, [
      validation.isFilterValid,
      filterState.filterType,
      filterState.filterMode,
      filterState.absoluteDateFrom,
      filterState.absoluteDateTo,
      filterState.expressionFrom,
      filterState.expressionTo,
      filterState.fromInclusive,
      filterState.toInclusive,
      rangeInclusive?.from,
      rangeInclusive?.to,
    ]);

    // Filter implementation
    const doesFilterPass = useCallback(
      ({ node }: { node: IRowNode }) => {
        if (!validation.isFilterValid || !currentModel) {
          return true;
        }

        const cellValue = getValue(node);
        const cellDate = parseValue(cellValue);

        if (!cellDate) {
          return false;
        }

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

        // Get inclusivity settings from current model (which already includes filter state and prop defaults)
        const fromInclusive = currentModel?.fromInclusive ?? false;
        const toInclusive = currentModel?.toInclusive ?? false;

        switch (filterState.filterType) {
          case "equals":
            return normalizedDateFrom
              ? normalizedCellDate.getTime() === normalizedDateFrom.getTime()
              : false;
          case "notEqual":
            return normalizedDateFrom
              ? normalizedCellDate.getTime() !== normalizedDateFrom.getTime()
              : true;
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
          case "inRange": {
            // Handle open-ended ranges
            if (!normalizedDateFrom && !normalizedDateTo) return false;

            // Only start date (open-ended to future)
            if (normalizedDateFrom && !normalizedDateTo) {
              return fromInclusive
                ? normalizedCellDate.getTime() >= normalizedDateFrom.getTime()
                : normalizedCellDate.getTime() > normalizedDateFrom.getTime();
            }

            // Only end date (open-ended from past)
            if (!normalizedDateFrom && normalizedDateTo) {
              return toInclusive
                ? normalizedCellDate.getTime() <= normalizedDateTo.getTime()
                : normalizedCellDate.getTime() < normalizedDateTo.getTime();
            }

            // Both dates present
            if (!normalizedDateFrom || !normalizedDateTo) return false;
            const afterStart = fromInclusive
              ? normalizedCellDate.getTime() >= normalizedDateFrom.getTime()
              : normalizedCellDate.getTime() > normalizedDateFrom.getTime();
            const beforeEnd = toInclusive
              ? normalizedCellDate.getTime() <= normalizedDateTo.getTime()
              : normalizedCellDate.getTime() < normalizedDateTo.getTime();
            return afterStart && beforeEnd;
          }
          default:
            return true;
        }
      },
      [
        validation.isFilterValid,
        currentModel,
        getValue,
        parseValue,
        validation.effectiveDateFrom,
        validation.effectiveDateTo,
        filterState.filterType,
        afterInclusive,
        beforeInclusive,
      ],
    );

    // Event handlers - Simplified since validation is now debounced
    const handleExpressionFromChange = useCallback(
      (value: string) => {
        filterState.setExpressionFrom(value);
        // Validation is handled by useDebouncedValidation hook with 300ms delay
      },
      [filterState],
    );

    const handleExpressionToChange = useCallback(
      (value: string) => {
        filterState.setExpressionTo(value);
        // Validation is handled by useDebouncedValidation hook with 300ms delay
      },
      [filterState],
    );

    const applyFilter = useCallback(() => {
      logger.debug(
        "[DateFilter] applyFilter called with currentModel:",
        currentModel,
      );
      if (onModelChange) {
        onModelChange(currentModel);
      }
      if (filterChangedCallback) {
        filterChangedCallback();
      }
      logger.debug("Applied filter:", currentModel);
    }, [onModelChange, filterChangedCallback, currentModel]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && validation.isFilterValid) {
          e.preventDefault();
          applyFilter();
        }
      },
      [validation.isFilterValid, applyFilter],
    );

    const resetFilter = useCallback(() => {
      try {
        filterState.resetState();
        if (onModelChange) {
          onModelChange(null);
        }
        if (filterChangedCallback) {
          filterChangedCallback();
        }
        logger.debug("Reset filter");
      } catch (error) {
        logger.error("Failed to reset filter", {
          error: error instanceof Error ? error.message : String(error),
        });
        handleError(error instanceof Error ? error : new Error(String(error)));
      }
    }, [filterState, onModelChange, filterChangedCallback, handleError]);

    // Register with AG Grid
    const callbacks = {
      doesFilterPass,
      getModelAsString: () => {
        if (!currentModel) return "";

        if (currentModel.mode === "absolute") {
          if (currentModel.type === "inRange") {
            const fromStr = currentModel.dateFrom
              ? format(currentModel.dateFrom, dateFormat)
              : "";
            const toStr = currentModel.dateTo
              ? format(currentModel.dateTo, dateFormat)
              : "";
            return `${fromStr} to ${toStr}`;
          }
          return currentModel.dateFrom
            ? format(currentModel.dateFrom, dateFormat)
            : "";
        } else {
          if (currentModel.type === "inRange") {
            return `${currentModel.expressionFrom || ""} to ${currentModel.expressionTo || ""}`;
          }
          return currentModel.expressionFrom || "";
        }
      },
      getModel: useCallback(() => {
        if (!currentModel) return null;

        // Ensure dates are serializable for AG Grid
        const serializableModel = {
          ...currentModel,
          dateFrom:
            currentModel.dateFrom instanceof Date
              ? currentModel.dateFrom.toISOString()
              : currentModel.dateFrom,
          dateTo:
            currentModel.dateTo instanceof Date
              ? currentModel.dateTo.toISOString()
              : currentModel.dateTo,
        };

        return serializableModel;
      }, [currentModel]),
      setModel: useCallback(
        (model: DateFilterModel | null) => {
          logger.debug("[DateFilter] setModel called with:", model);

          // Set a global flag for testing
          if (typeof window !== "undefined") {
            (
              window as Window & { setModelWasCalled?: boolean }
            ).setModelWasCalled = true;
          }

          if (!model) {
            resetFilter();
            return;
          }

          // Deserialize dates if they are ISO strings
          const deserializedModel = {
            ...model,
            dateFrom:
              model.dateFrom && typeof model.dateFrom === "string"
                ? new Date(model.dateFrom)
                : model.dateFrom,
            dateTo:
              model.dateTo && typeof model.dateTo === "string"
                ? new Date(model.dateTo)
                : model.dateTo,
          };

          filterState.initializeFromModel(deserializedModel);

          logger.debug("Filter state initialized from model:", model);

          // IMPORTANT: For programmatic filter changes (like from QuickFilterDropdown),
          // we need to ensure the grid is notified immediately
          if (onModelChange) {
            onModelChange(model);
          }

          // Use requestAnimationFrame to ensure state updates have been processed
          // before triggering the filter changed callback
          requestAnimationFrame(() => {
            if (filterChangedCallback) {
              filterChangedCallback();
            }
          });
        },
        [resetFilter, filterState, filterChangedCallback, onModelChange],
      ),
      onNewRowsLoaded: () => {
        // Handle new rows if needed
      },
      // AG Grid v33 requires this to know when the filter is active
      isFilterActive: useCallback(() => {
        const active = validation.isFilterValid && currentModel !== null;
        return active;
      }, [validation.isFilterValid, currentModel]),
      // Log when callbacks are destroyed
      destroy: useCallback(() => {
        // Clean up when destroyed
      }, []),
    };

    useGridFilter(callbacks);

    // Handle model changes from props (when AG Grid creates new instance)
    React.useEffect(() => {
      // Only reinitialize if we have a model and it's different from current state
      if (initialModel) {
        filterState.initializeFromModel(initialModel);
      }
    }, [initialModel, filterState.initializeFromModel]);

    // Model is handled during initial state creation in useFilterState
    // No ongoing synchronization to avoid state conflicts

    // Expose component instance for AG Grid to handle popup positioning
    React.useImperativeHandle(
      ref,
      () => ({
        // Include all the filter methods from callbacks
        doesFilterPass: callbacks.doesFilterPass,
        getModel: callbacks.getModel,
        setModel: callbacks.setModel,
        isFilterActive: callbacks.isFilterActive,
        afterGuiAttached: () => {
          // Method called after the filter is attached to the DOM
          // This helps AG Grid position popups correctly
        },
      }),
      [callbacks],
    );

    return (
      <div
        ref={filterRef}
        className={`ag-date-filter ${styles.dateFilter} ${
          filterState.filterType === "inRange"
            ? styles.dateFilterRange
            : styles.dateFilterNormal
        }`}
        data-testid={props.testId}
        role="form"
        aria-label="Date Filter"
      >
        <FilterTypeSelector
          filterType={filterState.filterType}
          onTypeChange={filterState.setFilterType}
        />

        <FilterModeToggle
          mode={filterState.filterMode}
          onModeChange={filterState.toggleFilterMode}
        />

        <div className={`date-inputs-section ${styles.dateInputsSection}`}>
          {filterState.filterMode === "absolute" ? (
            <TextDateInput
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
  },
);

DateFilterComponent.displayName = "DateFilterComponent";

// Wrap the component with error boundary
const DateFilter = withErrorBoundary(DateFilterComponent, {
  componentName: "DateFilter",
  onError: (error, errorInfo) => {
    logger.error("DateFilter Error Boundary", {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  },
});

// For debugging - export the raw component
export const DateFilterRaw = DateFilterComponent;

export default DateFilter;
