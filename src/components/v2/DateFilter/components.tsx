import React, { forwardRef } from "react";
import { useDateFilterContext } from "./context";
import {
  DateFilterRootProps,
  DateFilterModeButtonProps,
  DateFilterInputProps,
  DateFilterButtonProps,
  DateFilterSectionProps,
  DateFilterTextProps,
} from "./types";

// Root container
export const Root = forwardRef<HTMLDivElement, DateFilterRootProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={className} data-testid="date-filter" {...props}>
        {children}
      </div>
    );
  },
);

Root.displayName = "DateFilter.Root";

// Mode toggle container
export const ModeToggle = forwardRef<HTMLDivElement, DateFilterSectionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        data-testid="date-filter-mode-toggle"
        {...props}
      >
        {children}
      </div>
    );
  },
);

ModeToggle.displayName = "DateFilter.ModeToggle";

// Mode button
export const ModeButton = forwardRef<
  HTMLButtonElement,
  DateFilterModeButtonProps
>(({ mode, children, className, onClick, ...props }, ref) => {
  const { mode: currentMode, setMode } = useDateFilterContext();
  const isActive = currentMode === mode;

  return (
    <button
      ref={ref}
      className={className}
      onClick={(e) => {
        setMode(mode);
        onClick?.(e);
      }}
      data-active={isActive}
      data-inactive={!isActive}
      data-mode={mode}
      aria-pressed={isActive}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
});

ModeButton.displayName = "DateFilter.ModeButton";

// Relative section container
export const RelativeSection = forwardRef<
  HTMLDivElement,
  DateFilterSectionProps
>(({ children, className, ...props }, ref) => {
  const { mode } = useDateFilterContext();

  if (mode !== "relative") return null;

  return (
    <div
      ref={ref}
      className={className}
      data-testid="date-filter-relative-section"
      {...props}
    >
      {children}
    </div>
  );
});

RelativeSection.displayName = "DateFilter.RelativeSection";

// Relative date input
export const RelativeInput = forwardRef<HTMLInputElement, DateFilterInputProps>(
  ({ className, onChange, ...props }, ref) => {
    const { relativeValue, setRelativeValue, isValid } = useDateFilterContext();

    return (
      <input
        ref={ref}
        type="text"
        className={className}
        value={relativeValue}
        onChange={(e) => {
          setRelativeValue(e.target.value);
          onChange?.(e);
        }}
        data-invalid={!isValid}
        aria-invalid={!isValid}
        data-testid="date-filter-relative-input"
        {...props}
      />
    );
  },
);

RelativeInput.displayName = "DateFilter.RelativeInput";

// Absolute section container
export const AbsoluteSection = forwardRef<
  HTMLDivElement,
  DateFilterSectionProps
>(({ children, className, ...props }, ref) => {
  const { mode } = useDateFilterContext();

  if (mode !== "absolute") return null;

  return (
    <div
      ref={ref}
      className={className}
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
  DateFilterInputProps
>(({ className, onChange, ...props }, ref) => {
  const { startDate, setStartDate } = useDateFilterContext();

  return (
    <input
      ref={ref}
      type="date"
      className={className}
      value={startDate ? startDate.toISOString().split("T")[0] : ""}
      onChange={(e) => {
        setStartDate(e.target.value ? new Date(e.target.value) : null);
        onChange?.(e);
      }}
      data-testid="date-filter-start-date"
      {...props}
    />
  );
});

StartDateInput.displayName = "DateFilter.StartDateInput";

// End date input
export const EndDateInput = forwardRef<HTMLInputElement, DateFilterInputProps>(
  ({ className, onChange, ...props }, ref) => {
    const { endDate, setEndDate } = useDateFilterContext();

    return (
      <input
        ref={ref}
        type="date"
        className={className}
        value={endDate ? endDate.toISOString().split("T")[0] : ""}
        onChange={(e) => {
          setEndDate(e.target.value ? new Date(e.target.value) : null);
          onChange?.(e);
        }}
        data-testid="date-filter-end-date"
        {...props}
      />
    );
  },
);

EndDateInput.displayName = "DateFilter.EndDateInput";

// Help text
export const HelpText = forwardRef<HTMLParagraphElement, DateFilterTextProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={className}
        data-testid="date-filter-help-text"
        {...props}
      >
        {children}
      </p>
    );
  },
);

HelpText.displayName = "DateFilter.HelpText";

// Error message
export const ErrorMessage = forwardRef<
  HTMLParagraphElement,
  DateFilterTextProps
>(({ children, className, ...props }, ref) => {
  const { errorMessage, isValid } = useDateFilterContext();

  if (isValid) return null;

  return (
    <p
      ref={ref}
      className={className}
      role="alert"
      data-testid="date-filter-error"
      {...props}
    >
      {children || errorMessage}
    </p>
  );
});

ErrorMessage.displayName = "DateFilter.ErrorMessage";

// Actions container
export const Actions = forwardRef<HTMLDivElement, DateFilterSectionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        data-testid="date-filter-actions"
        {...props}
      >
        {children}
      </div>
    );
  },
);

Actions.displayName = "DateFilter.Actions";

// Apply button
export const ApplyButton = forwardRef<HTMLButtonElement, DateFilterButtonProps>(
  ({ children, className, onClick, ...props }, ref) => {
    const { apply, isValid, hasChanges } = useDateFilterContext();
    const isDisabled = !isValid || !hasChanges;

    return (
      <button
        ref={ref}
        className={className}
        onClick={(e) => {
          apply();
          onClick?.(e);
        }}
        disabled={isDisabled}
        data-disabled={isDisabled}
        data-action="apply"
        type="button"
        {...props}
      >
        {children || "Apply"}
      </button>
    );
  },
);

ApplyButton.displayName = "DateFilter.ApplyButton";

// Reset button
export const ResetButton = forwardRef<HTMLButtonElement, DateFilterButtonProps>(
  ({ children, className, onClick, ...props }, ref) => {
    const { reset } = useDateFilterContext();

    return (
      <button
        ref={ref}
        className={className}
        onClick={(e) => {
          reset();
          onClick?.(e);
        }}
        data-action="reset"
        type="button"
        {...props}
      >
        {children || "Reset"}
      </button>
    );
  },
);

ResetButton.displayName = "DateFilter.ResetButton";
