import { ReactNode } from "react";

export interface DateFilterContextValue {
  mode: "relative" | "absolute";
  setMode: (mode: "relative" | "absolute") => void;
  relativeValue: string;
  setRelativeValue: (value: string) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  isValid: boolean;
  errorMessage: string;
  hasChanges: boolean;
  apply: () => void;
  reset: () => void;
}

export interface DateFilterProps {
  children: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  onApply?: () => void;
  onReset?: () => void;
  defaultMode?: "relative" | "absolute";
}

export interface DateFilterRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface DateFilterModeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mode: "relative" | "absolute";
  children: ReactNode;
}

export type DateFilterInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface DateFilterButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export interface DateFilterSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface DateFilterTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}
