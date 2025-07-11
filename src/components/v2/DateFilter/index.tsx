import React from "react";
import { DateFilterProvider } from "./context";
import { DateFilterProps } from "./types";
import * as Components from "./components";

export interface DateFilterCompound {
  (props: DateFilterProps): JSX.Element;
  Root: typeof Components.Root;
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

const DateFilterComponent: DateFilterCompound = (props: DateFilterProps) => {
  return <DateFilterProvider {...props} />;
};

// Attach all sub-components
DateFilterComponent.Root = Components.Root;
DateFilterComponent.ModeToggle = Components.ModeToggle;
DateFilterComponent.ModeButton = Components.ModeButton;
DateFilterComponent.RelativeSection = Components.RelativeSection;
DateFilterComponent.RelativeInput = Components.RelativeInput;
DateFilterComponent.AbsoluteSection = Components.AbsoluteSection;
DateFilterComponent.StartDateInput = Components.StartDateInput;
DateFilterComponent.EndDateInput = Components.EndDateInput;
DateFilterComponent.HelpText = Components.HelpText;
DateFilterComponent.ErrorMessage = Components.ErrorMessage;
DateFilterComponent.Actions = Components.Actions;
DateFilterComponent.ApplyButton = Components.ApplyButton;
DateFilterComponent.ResetButton = Components.ResetButton;

export const DateFilter = DateFilterComponent;

// Re-export types
export type { DateFilterProps } from "./types";
