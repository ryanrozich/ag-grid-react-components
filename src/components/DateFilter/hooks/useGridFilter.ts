import { useCallback, useImperativeHandle, useRef } from "react";
import type { IDoesFilterPassParams, IFilterParams } from "ag-grid-community";
import type { DateFilterModel } from "../../interfaces";
import { parseRelativeDate } from "../utils";

/**
 * Hook to integrate the date filter with AG Grid's filter API
 */
export const useGridFilter = (ref: React.Ref<any>, params: IFilterParams) => {
  const filterRef = useRef<any>({});

  // Check if a value passes the filter
  const doesFilterPass = useCallback(
    (params: IDoesFilterPassParams): boolean => {
      const model = filterRef.current.model as DateFilterModel | null;

      console.log("[DateFilter] doesFilterPass called with model:", model);

      if (!model || !model.filterType) {
        return true; // No filter applied
      }

      const columnId =
        (params as any).column?.getColId() || (params as any).colDef?.field;
      const cellValue = params.data[columnId];

      console.log(
        "[DateFilter] Checking cell value:",
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

      if (model.dateFrom) {
        if (
          model.dateFrom.includes("-") ||
          model.dateFrom.toLowerCase().includes("today")
        ) {
          // Relative date
          dateFrom = parseRelativeDate(model.dateFrom);
        } else {
          // Absolute date
          dateFrom = new Date(model.dateFrom);
        }
      }

      if (model.dateTo) {
        if (
          model.dateTo.includes("-") ||
          model.dateTo.toLowerCase().includes("today")
        ) {
          // Relative date
          dateTo = parseRelativeDate(model.dateTo);
        } else {
          // Absolute date
          dateTo = new Date(model.dateTo);
        }
      }

      // Apply filter logic based on type
      switch (model.filterType) {
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
    },
    [],
  );

  // Get the current filter model
  const getModel = useCallback((): DateFilterModel | null => {
    return filterRef.current.model || null;
  }, []);

  // Set the filter model
  const setModel = useCallback(
    (model: DateFilterModel | null): void => {
      console.log("[DateFilter] setModel called with:", model);
      filterRef.current.model = model;

      // Notify parent component if callback provided
      if (params.filterChangedCallback) {
        params.filterChangedCallback();
      }
    },
    [params],
  );

  // Is the filter active?
  const isFilterActive = useCallback((): boolean => {
    return filterRef.current.model !== null;
  }, []);

  // Expose filter API to AG Grid
  useImperativeHandle(ref, () => {
    console.log("[DateFilter] Creating imperative handle");
    const filterApi = {
      ...filterRef.current,
      doesFilterPass,
      getModel,
      setModel,
      isFilterActive,
      // AG Grid v33 compatibility
      __AG_GRID_COMPONENT: true,
    };

    // Store the API on the ref so the workaround can access it
    filterRef.current = filterApi;

    return filterApi;
  }, [doesFilterPass, getModel, setModel, isFilterActive]);

  return {
    doesFilterPass,
    getModel,
    setModel,
    isFilterActive,
  };
};
