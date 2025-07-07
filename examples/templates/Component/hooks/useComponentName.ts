/**
 * Component Template - Main Hook
 *
 * This hook contains the component's logic and state management.
 * CUSTOMIZE: Implement your component's behavior.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { UseComponentNameOptions, UseComponentNameReturn } from "../types";

/**
 * Hook that manages the component's state and logic
 */
export function useComponentName(
  options: UseComponentNameOptions,
): UseComponentNameReturn {
  const {
    value: controlledValue,
    defaultValue = "",
    onChange,
    onFocus,
    onBlur,
    validate,
    disabled = false,
    readOnly = false,
  } = options;

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);

  // Determine if component is controlled
  const isControlled = controlledValue !== undefined;

  // Internal state
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Current value (controlled or uncontrolled)
  const value = isControlled ? controlledValue : uncontrolledValue;

  // Validation
  const errorMessage = useMemo(() => {
    if (!validate || !isDirty) return null;
    return validate(value);
  }, [validate, value, isDirty]);

  const hasError = errorMessage !== null;

  // Handlers
  const setValue = useCallback(
    (newValue: string) => {
      if (disabled || readOnly) return;

      if (!isControlled) {
        setUncontrolledValue(newValue);
      }

      setIsDirty(true);
      onChange?.(newValue);
    },
    [isControlled, onChange, disabled, readOnly],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setValue(newValue);
      onChange?.(newValue, event);
    },
    [setValue, onChange],
  );

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setIsDirty(true);
      onBlur?.(event);
    },
    [onBlur],
  );

  const reset = useCallback(() => {
    if (!isControlled) {
      setUncontrolledValue(defaultValue);
    }
    setIsDirty(false);
    onChange?.(defaultValue);
  }, [isControlled, defaultValue, onChange]);

  // Computed values
  const computed = useMemo(
    () => ({
      isControlled,
      displayValue: value,
    }),
    [isControlled, value],
  );

  // Warn about switching between controlled/uncontrolled
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      if (isControlled && defaultValue !== undefined) {
        console.warn(
          "ComponentName: You provided both value and defaultValue props. " +
            "The component will be controlled.",
        );
      }
    }
  }, [isControlled, defaultValue]);

  return {
    state: {
      value,
      isFocused,
      hasError,
      errorMessage,
      isDirty,
    },
    handlers: {
      handleChange,
      handleFocus,
      handleBlur,
      setValue,
      reset,
    },
    computed,
    refs: {
      inputRef,
    },
  };
}
