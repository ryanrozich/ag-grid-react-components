import React, { forwardRef, useImperativeHandle } from "react";
import { IDoesFilterPassParams, IFilterParams } from "ag-grid-community";
import { DateFilterProvider } from "./context";
import { DateFilterModel } from "../interfaces";
import * as Components from "./components";
import { useGridFilter } from "./hooks/useGridFilter";

export interface DateFilterProps extends IFilterParams {
  children?: React.ReactNode;
  dateParser?: (value: string) => Date | null;
  className?: string;
}

export interface DateFilterCompound {
  (props: DateFilterProps): React.ReactElement;
  Root: typeof Components.Root;
  TypeSelector: typeof Components.TypeSelector;
  ModeToggle: typeof Components.ModeToggle;
  ModeButton: typeof Components.ModeButton;
  RelativeSection: typeof Components.RelativeSection;
  RelativeInput: typeof Components.RelativeInput;
  AbsoluteSection: typeof Components.AbsoluteSection;
  StartDateInput: typeof Components.StartDateInput;
  EndDateInput: typeof Components.EndDateInput;
  HelpText: typeof Components.HelpText;
  ErrorMessage: typeof Components.ErrorMessage;
  Actions: typeof Components.Actions;
  ApplyButton: typeof Components.ApplyButton;
  ResetButton: typeof Components.ResetButton;
}

const DateFilterComponent = forwardRef<any, DateFilterProps>((props, ref) => {
  const { children, ...filterParams } = props;

  // Use the AG Grid filter hook
  const { model, setModel, applyFilter, resetFilter, isFilterActive } =
    useGridFilter(filterParams);

  // Implement AG Grid filter interface
  useImperativeHandle(
    ref,
    () => ({
      isFilterActive: () => isFilterActive(),

      doesFilterPass: (params: IDoesFilterPassParams) => {
        if (!isFilterActive()) return true;

        const value = filterParams.getValue(params.node);
        if (value == null) return false;

        const date = value instanceof Date ? value : new Date(value);
        if (isNaN(date.getTime())) return false;

        const filterModel = model as DateFilterModel;

        switch (filterModel.filterType) {
          case "equals":
            return filterModel.dateFrom
              ? date.toDateString() ===
                  new Date(filterModel.dateFrom).toDateString()
              : false;
          case "notEqual":
            return filterModel.dateFrom
              ? date.toDateString() !==
                  new Date(filterModel.dateFrom).toDateString()
              : true;
          case "before":
            return filterModel.dateFrom
              ? date < new Date(filterModel.dateFrom)
              : false;
          case "after":
            return filterModel.dateFrom
              ? date > new Date(filterModel.dateFrom)
              : false;
          case "inRange":
            if (!filterModel.dateFrom || !filterModel.dateTo) return false;
            return (
              date >= new Date(filterModel.dateFrom) &&
              date <= new Date(filterModel.dateTo)
            );
          default:
            return true;
        }
      },

      getModel: () => model,

      setModel: (newModel: DateFilterModel | null) => {
        setModel(newModel);
      },

      getModelAsString: () => {
        if (!model) return "";
        const filterModel = model as DateFilterModel;
        return filterModel.filterType || "";
      },

      destroy: () => {
        // Cleanup if needed
      },
    }),
    [model, setModel, isFilterActive, filterParams],
  );

  if (!children) {
    // Default structure for backward compatibility
    return (
      <DateFilterProvider
        model={model}
        setModel={setModel}
        applyFilter={applyFilter}
        resetFilter={resetFilter}
        dateParser={props.dateParser}
      >
        <Components.Root className={props.className}>
          <Components.TypeSelector />
          <Components.ModeToggle>
            <Components.ModeButton mode="relative">
              Relative
            </Components.ModeButton>
            <Components.ModeButton mode="absolute">
              Absolute
            </Components.ModeButton>
          </Components.ModeToggle>
          <Components.RelativeSection>
            <Components.RelativeInput placeholder="e.g., -7d, today, last week" />
            <Components.ErrorMessage />
          </Components.RelativeSection>
          <Components.AbsoluteSection>
            <Components.StartDateInput />
            <Components.EndDateInput />
          </Components.AbsoluteSection>
          <Components.Actions>
            <Components.ApplyButton>Apply</Components.ApplyButton>
            <Components.ResetButton>Reset</Components.ResetButton>
          </Components.Actions>
        </Components.Root>
      </DateFilterProvider>
    );
  }

  return (
    <DateFilterProvider
      model={model}
      setModel={setModel}
      applyFilter={applyFilter}
      resetFilter={resetFilter}
      dateParser={props.dateParser}
    >
      {children}
    </DateFilterProvider>
  );
});

DateFilterComponent.displayName = "DateFilter";

// Create the compound component
const DateFilter = DateFilterComponent as unknown as DateFilterCompound;

// Attach all sub-components
DateFilter.Root = Components.Root;
DateFilter.TypeSelector = Components.TypeSelector;
DateFilter.ModeToggle = Components.ModeToggle;
DateFilter.ModeButton = Components.ModeButton;
DateFilter.RelativeSection = Components.RelativeSection;
DateFilter.RelativeInput = Components.RelativeInput;
DateFilter.AbsoluteSection = Components.AbsoluteSection;
DateFilter.StartDateInput = Components.StartDateInput;
DateFilter.EndDateInput = Components.EndDateInput;
DateFilter.HelpText = Components.HelpText;
DateFilter.ErrorMessage = Components.ErrorMessage;
DateFilter.Actions = Components.Actions;
DateFilter.ApplyButton = Components.ApplyButton;
DateFilter.ResetButton = Components.ResetButton;

// Mark as AG Grid component
(DateFilter as any).__AG_GRID_COMPONENT = true;

export default DateFilter;
export { DateFilter };
