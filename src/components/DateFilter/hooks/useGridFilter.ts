import { useCallback, useImperativeHandle, useRef } from "react";
import type { IDoesFilterPassParams, IFilterParams } from "ag-grid-community";
import type { DateFilterModel } from "../../interfaces";
import { useDateFilterContext } from "../context";

/**
 * Hook to integrate the date filter with AG Grid's filter API
 */
export const useGridFilter = (ref: React.Ref<any>, params: IFilterParams) => {
  const { state, actions } = useDateFilterContext();
  const filterRef = useRef<any>({});

  // Check if a value passes the filter
  const doesFilterPass = useCallback(
    (params: IDoesFilterPassParams): boolean => {
      const {
        filterType,
        filterMode,
        effectiveDateFrom,
        effectiveDateTo,
        isFilterValid,
      } = state;

      if (!isFilterValid || !filterType) {
        return true; // No filter applied
      }

      const cellValue = params.node.data[params.column.getColId()];
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

      // Apply filter logic based on type
      switch (filterType) {
        case "equals":
          if (!effectiveDateFrom) return false;
          return cellDate.toDateString() === effectiveDateFrom.toDateString();

        case "notEqual":
          if (!effectiveDateFrom) return false;
          return cellDate.toDateString() !== effectiveDateFrom.toDateString();

        case "before":
          if (!effectiveDateFrom) return false;
          return cellDate < effectiveDateFrom;

        case "after":
          if (!effectiveDateFrom) return false;
          return cellDate > effectiveDateFrom;

        case "inRange":
          // Handle open-ended ranges
          if (effectiveDateFrom && effectiveDateTo) {
            return cellDate >= effectiveDateFrom && cellDate <= effectiveDateTo;
          } else if (effectiveDateFrom) {
            return cellDate >= effectiveDateFrom;
          } else if (effectiveDateTo) {
            return cellDate <= effectiveDateTo;
          }
          return false;

        default:
          return true;
      }
    },
    [state],
  );

  // Get the current filter model
  const getModel = useCallback((): DateFilterModel | null => {
    const {
      filterType,
      filterMode,
      absoluteDateFrom,
      absoluteDateTo,
      expressionFrom,
      expressionTo,
      isFilterValid,
    } = state;

    if (!isFilterValid || !filterType) {
      return null;
    }

    const model: DateFilterModel = {
      type: filterType,
      mode: filterMode,
    };

    if (filterMode === "absolute") {
      model.dateFrom = absoluteDateFrom;
      model.dateTo = absoluteDateTo;
    } else {
      model.expressionFrom = expressionFrom;
      model.expressionTo = expressionTo;
    }

    return model;
  }, [state]);

  // Set the filter model
  const setModel = useCallback(
    (model: DateFilterModel | null): void => {
      if (!model) {
        actions.resetFilter();
        return;
      }

      // Update filter state from model
      if (model.type) {
        actions.setFilterType(model.type);
      }
      if (model.mode) {
        actions.setFilterMode(model.mode);
      }
      if (model.mode === "absolute") {
        if (model.dateFrom) {
          actions.setAbsoluteDateFrom(model.dateFrom);
        }
        if (model.dateTo) {
          actions.setAbsoluteDateTo(model.dateTo);
        }
      } else {
        if (model.expressionFrom) {
          actions.setExpressionFrom(model.expressionFrom);
        }
        if (model.expressionTo) {
          actions.setExpressionTo(model.expressionTo);
        }
      }
    },
    [actions],
  );

  // Is the filter active?
  const isFilterActive = useCallback((): boolean => {
    return state.isFilterValid;
  }, [state.isFilterValid]);

  // Expose filter API to AG Grid
  useImperativeHandle(
    ref,
    () => ({
      ...filterRef.current,
      doesFilterPass,
      getModel,
      setModel,
      isFilterActive,
      // AG Grid v33 compatibility
      __AG_GRID_COMPONENT: true,
    }),
    [doesFilterPass, getModel, setModel, isFilterActive],
  );

  return {
    doesFilterPass,
    getModel,
    setModel,
    isFilterActive,
  };
};
