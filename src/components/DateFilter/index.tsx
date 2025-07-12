import React, { forwardRef, useCallback } from "react";
import { IFilterParams } from "ag-grid-community";
import { DateFilterProvider } from "./context";
import { DateFilterModel } from "../interfaces";
import * as Components from "./components";
import { useGridFilter } from "./hooks/useGridFilter";

export interface DateFilterProps extends IFilterParams {
  children?: React.ReactNode;
  dateParser?: (value: string) => Date | null;
  className?: string;
  model?: DateFilterModel | null;
  onModelChange?: (model: DateFilterModel | null) => void;
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
  const { children, model, onModelChange, ...filterParams } = props;

  // Use the AG Grid filter hook only if not controlled by external model
  const { getModel, setModel } = useGridFilter(ref, filterParams);

  // Use external model if provided, otherwise use internal state
  const currentModel = model !== undefined ? model : getModel();

  // Create wrapper functions for the provider
  const handleSetModel = useCallback(
    (newModel: DateFilterModel | null) => {
      if (onModelChange) {
        onModelChange(newModel);
      } else {
        setModel(newModel);
      }
    },
    [setModel, onModelChange],
  );

  const applyFilter = useCallback(() => {
    // The context will call handleSetModel which updates the grid filter
    // AG Grid will be notified through the setModel callback
  }, []);

  const resetFilter = useCallback(() => {
    // The context will call handleSetModel(null) which updates the grid filter
    // AG Grid will be notified through the setModel callback
  }, []);

  if (!children) {
    // Default structure for backward compatibility
    return (
      <DateFilterProvider
        model={currentModel}
        setModel={handleSetModel}
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
      model={currentModel}
      setModel={handleSetModel}
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
Object.assign(DateFilter, {
  Root: Components.Root,
  TypeSelector: Components.TypeSelector,
  ModeToggle: Components.ModeToggle,
  ModeButton: Components.ModeButton,
  RelativeSection: Components.RelativeSection,
  RelativeInput: Components.RelativeInput,
  AbsoluteSection: Components.AbsoluteSection,
  StartDateInput: Components.StartDateInput,
  EndDateInput: Components.EndDateInput,
  HelpText: Components.HelpText,
  ErrorMessage: Components.ErrorMessage,
  Actions: Components.Actions,
  ApplyButton: Components.ApplyButton,
  ResetButton: Components.ResetButton,
});

// Mark as AG Grid component
(DateFilter as any).__AG_GRID_COMPONENT = true;

export default DateFilter;
export { DateFilter };
