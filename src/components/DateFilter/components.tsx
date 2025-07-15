import React, { forwardRef } from "react";
import { useDateFilterContext } from "./context";
import { DateFilterType, DateFilterMode } from "../interfaces";

// Root container
export const Root = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} data-testid="date-filter-root" {...props}>
      {children}
    </div>
  );
});

Root.displayName = "DateFilter.Root";

// Filter type selector
export const TypeSelector = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => {
  const { filterType, setFilterType } = useDateFilterContext();

  return (
    <select
      ref={ref}
      value={filterType}
      onChange={(e) => setFilterType(e.target.value as DateFilterType)}
      className={className}
      data-testid="date-filter-type-selector"
      {...props}
    >
      <option value="equals">Equals</option>
      <option value="notEqual">Not Equal</option>
      <option value="before">Before</option>
      <option value="after">After</option>
      <option value="inRange">In Range</option>
    </select>
  );
});

TypeSelector.displayName = "DateFilter.TypeSelector";

// Mode toggle container
export const ModeToggle = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      data-testid="date-filter-mode-toggle"
      {...props}
    >
      {children}
    </div>
  );
});

ModeToggle.displayName = "DateFilter.ModeToggle";

// Mode button
interface ModeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mode: DateFilterMode;
}

export const ModeButton = forwardRef<HTMLButtonElement, ModeButtonProps>(
  ({ mode, children, className, ...props }, ref) => {
    const { mode: currentMode, setMode } = useDateFilterContext();
    const isActive = currentMode === mode;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-pressed={isActive}
        data-active={isActive}
        data-inactive={!isActive}
        data-mode={mode}
        onClick={() => setMode(mode)}
        className={className}
        data-testid={`date-filter-mode-${mode}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

ModeButton.displayName = "DateFilter.ModeButton";

// Relative section container
export const RelativeSection = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, style, ...props }, ref) => {
  const { mode } = useDateFilterContext();
  const isVisible = mode === "relative";

  return (
    <div
      ref={ref}
      style={{ display: isVisible ? "block" : "none", ...style }}
      data-testid="date-filter-relative-section"
      {...props}
    >
      {children}
    </div>
  );
});

RelativeSection.displayName = "DateFilter.RelativeSection";

// Relative input
export const RelativeInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, onChange, ...props }, ref) => {
  const { relativeValue, setRelativeValue, errorMessage } =
    useDateFilterContext();
  const hasError = !!errorMessage && relativeValue !== "";

  return (
    <input
      ref={ref}
      type="text"
      value={relativeValue}
      onChange={(e) => {
        setRelativeValue(e.target.value);
        onChange?.(e);
      }}
      aria-invalid={hasError}
      data-invalid={hasError}
      className={className}
      data-testid="date-filter-relative-input"
      {...props}
    />
  );
});

RelativeInput.displayName = "DateFilter.RelativeInput";

// Absolute section container
export const AbsoluteSection = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, style, ...props }, ref) => {
  const { mode, filterType } = useDateFilterContext();
  const isVisible = mode === "absolute";
  const showEndDate = filterType === "inRange";

  return (
    <div
      ref={ref}
      style={{ display: isVisible ? "block" : "none", ...style }}
      data-show-end-date={showEndDate}
      data-testid="date-filter-absolute-section"
      {...props}
    >
      {children}
    </div>
  );
});

AbsoluteSection.displayName = "DateFilter.AbsoluteSection";

// Start date input
export const StartDateInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, onChange, ...props }, ref) => {
  const { startDate, setStartDate } = useDateFilterContext();

  return (
    <input
      ref={ref}
      type="date"
      value={startDate?.toISOString().split("T")[0] || ""}
      onChange={(e) => {
        const date = e.target.value ? new Date(e.target.value) : null;
        setStartDate(date);
        onChange?.(e);
      }}
      className={className}
      data-testid="date-filter-start-date"
      {...props}
    />
  );
});

StartDateInput.displayName = "DateFilter.StartDateInput";

// End date input
export const EndDateInput = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, style, ...props }, ref) => {
  const { endDate, setEndDate, filterType } = useDateFilterContext();
  const isVisible = filterType === "inRange";

  if (!isVisible) return null;

  return (
    <div ref={ref} style={style} {...props}>
      <input
        type="date"
        value={endDate?.toISOString().split("T")[0] || ""}
        onChange={(e) => {
          const date = e.target.value ? new Date(e.target.value) : null;
          setEndDate(date);
        }}
        className={className}
        data-testid="date-filter-end-date"
      />
    </div>
  );
});

EndDateInput.displayName = "DateFilter.EndDateInput";

// Help text
export const HelpText = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, ...props }, ref) => {
  const { mode } = useDateFilterContext();

  if (!children) return null;

  return (
    <p
      ref={ref}
      data-mode={mode}
      data-testid="date-filter-help-text"
      {...props}
    >
      {children}
    </p>
  );
});

HelpText.displayName = "DateFilter.HelpText";

// Error message
export const ErrorMessage = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, ...props }, ref) => {
  const { errorMessage, relativeValue, mode } = useDateFilterContext();

  if (!errorMessage && (!relativeValue || mode !== "relative")) return null;

  return (
    <p ref={ref} role="alert" data-testid="date-filter-error" {...props}>
      {children || errorMessage || "Invalid date format"}
    </p>
  );
});

ErrorMessage.displayName = "DateFilter.ErrorMessage";

// Actions container
export const Actions = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} data-testid="date-filter-actions" {...props}>
      {children}
    </div>
  );
});

Actions.displayName = "DateFilter.Actions";

// Apply button
export const ApplyButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, onClick, disabled, ...props }, ref) => {
  const { applyFilter, isValid, hasChanges } = useDateFilterContext();
  const isDisabled = disabled || !isValid || !hasChanges;

  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        applyFilter();
        onClick?.(e);
      }}
      disabled={isDisabled}
      data-disabled={isDisabled}
      data-testid="date-filter-apply"
      {...props}
    >
      {children || "Apply"}
    </button>
  );
});

ApplyButton.displayName = "DateFilter.ApplyButton";

// Reset button
export const ResetButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, onClick, ...props }, ref) => {
  const { resetFilter } = useDateFilterContext();

  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        resetFilter();
        onClick?.(e);
      }}
      data-testid="date-filter-reset"
      {...props}
    >
      {children || "Reset"}
    </button>
  );
});

ResetButton.displayName = "DateFilter.ResetButton";
