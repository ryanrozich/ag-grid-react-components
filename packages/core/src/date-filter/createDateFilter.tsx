import { useState, useCallback, forwardRef, useImperativeHandle } from "react";
import {
  IFilter,
  IFilterParams,
  IDoesFilterPassParams,
} from "ag-grid-community";
import { useGridFilter } from "ag-grid-react";
import { isAfter, isBefore, isEqual, startOfDay } from "date-fns";
import type {
  DateFilterModel,
  DatePickerAdapter,
  DateFilterConfig,
} from "./types";
import { nativeDateAdapter } from "./adapters/native";

export function createDateFilter(config: DateFilterConfig = {}) {
  const {
    datePickerAdapter = nativeDateAdapter,
    enableRelativeDates = false,
    relativeExpressionParser,
    className,
    styles = {},
  } = config;

  const DateFilter = forwardRef<IFilter>((props: IFilterParams, ref) => {
    const { filterChangedCallback, colDef } = props;

    // Core state management
    const [filterType, setFilterType] =
      useState<DateFilterModel["type"]>("equals");
    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);
    const [includeFrom, setIncludeFrom] = useState(true);
    const [includeTo, setIncludeTo] = useState(true);

    // Filter logic
    const doesFilterPass = useCallback(
      (params: IDoesFilterPassParams): boolean => {
        const { node } = params;
        const value = colDef.field ? node.data[colDef.field] : null;

        if (!value) {
          return filterType === "blank";
        }

        if (filterType === "notBlank") {
          return true;
        }

        const cellDate = datePickerAdapter.parseValue(value);
        if (!cellDate) return false;

        const compareDate = startOfDay(cellDate);

        switch (filterType) {
          case "equals":
            return dateFrom
              ? isEqual(compareDate, startOfDay(dateFrom))
              : false;

          case "notEqual":
            return dateFrom
              ? !isEqual(compareDate, startOfDay(dateFrom))
              : true;

          case "after":
            if (!dateFrom) return true;
            return includeFrom
              ? !isBefore(compareDate, startOfDay(dateFrom))
              : isAfter(compareDate, startOfDay(dateFrom));

          case "before":
            if (!dateTo) return true;
            return includeTo
              ? !isAfter(compareDate, startOfDay(dateTo))
              : isBefore(compareDate, startOfDay(dateTo));

          case "inRange":
            const afterFrom = dateFrom
              ? includeFrom
                ? !isBefore(compareDate, startOfDay(dateFrom))
                : isAfter(compareDate, startOfDay(dateFrom))
              : true;
            const beforeTo = dateTo
              ? includeTo
                ? !isAfter(compareDate, startOfDay(dateTo))
                : isBefore(compareDate, startOfDay(dateTo))
              : true;
            return afterFrom && beforeTo;

          default:
            return true;
        }
      },
      [
        filterType,
        dateFrom,
        dateTo,
        includeFrom,
        includeTo,
        colDef.field,
        datePickerAdapter,
      ],
    );

    const isFilterActive = useCallback((): boolean => {
      if (filterType === "blank" || filterType === "notBlank") return true;
      return !!(dateFrom || dateTo);
    }, [filterType, dateFrom, dateTo]);

    const getModel = useCallback((): DateFilterModel | null => {
      if (!isFilterActive()) return null;

      return {
        type: filterType,
        dateFrom: dateFrom ? datePickerAdapter.formatValue(dateFrom) : null,
        dateTo: dateTo ? datePickerAdapter.formatValue(dateTo) : null,
        includeFrom,
        includeTo,
      };
    }, [
      filterType,
      dateFrom,
      dateTo,
      includeFrom,
      includeTo,
      isFilterActive,
      datePickerAdapter,
    ]);

    const setModel = useCallback(
      (model: DateFilterModel | null): void => {
        if (!model) {
          setFilterType("equals");
          setDateFrom(null);
          setDateTo(null);
          setIncludeFrom(true);
          setIncludeTo(true);
          return;
        }

        setFilterType(model.type);
        setDateFrom(
          model.dateFrom ? datePickerAdapter.parseValue(model.dateFrom) : null,
        );
        setDateTo(
          model.dateTo ? datePickerAdapter.parseValue(model.dateTo) : null,
        );
        setIncludeFrom(model.includeFrom ?? true);
        setIncludeTo(model.includeTo ?? true);
      },
      [datePickerAdapter],
    );

    // Register with AG Grid
    useGridFilter({
      doesFilterPass,
      isFilterActive,
      getModel,
      setModel,
    });

    // Expose filter API
    useImperativeHandle(
      ref,
      () => ({
        doesFilterPass,
        isFilterActive,
        getModel,
        setModel,
      }),
      [doesFilterPass, isFilterActive, getModel, setModel],
    );

    // Handle filter changes
    const handleFilterChange = useCallback(() => {
      filterChangedCallback();
    }, [filterChangedCallback]);

    const handleReset = useCallback(() => {
      setModel(null);
      filterChangedCallback();
    }, [setModel, filterChangedCallback]);

    // Render UI
    const DatePickerComponent = datePickerAdapter.Component;

    return (
      <div className={className || styles.container || "agrc-date-filter"}>
        <select
          value={filterType}
          onChange={(e) =>
            setFilterType(e.target.value as DateFilterModel["type"])
          }
          className={styles.typeSelector || "agrc-date-filter__type"}
        >
          <option value="equals">Equals</option>
          <option value="notEqual">Not equal</option>
          <option value="after">After</option>
          <option value="before">Before</option>
          <option value="inRange">In range</option>
          <option value="blank">Blank</option>
          <option value="notBlank">Not blank</option>
        </select>

        {filterType !== "blank" && filterType !== "notBlank" && (
          <>
            <DatePickerComponent
              value={dateFrom}
              onChange={setDateFrom}
              placeholder={
                filterType === "inRange" ? "From date" : "Select date"
              }
              className={styles.datePicker || "agrc-date-filter__picker"}
              data-testid="date-from"
            />

            {filterType === "inRange" && (
              <DatePickerComponent
                value={dateTo}
                onChange={setDateTo}
                placeholder="To date"
                className={styles.datePicker || "agrc-date-filter__picker"}
                data-testid="date-to"
              />
            )}
          </>
        )}

        <div className={styles.actions || "agrc-date-filter__actions"}>
          <button onClick={handleFilterChange}>Apply</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    );
  });

  DateFilter.displayName = "DateFilter";
  return DateFilter;
}
