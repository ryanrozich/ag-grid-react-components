/**
 * Component Template - Implementation
 *
 * This is a headless component template following best practices.
 * CUSTOMIZE: Replace "ComponentName" and implement your logic.
 */

import React, { forwardRef, useImperativeHandle, useMemo } from "react";

import { useComponentName } from "./hooks/useComponentName";
import type { ComponentNameProps, ComponentNameRef } from "./types";
import { validateProps } from "./utils/validation";

/**
 * ComponentName - A headless React component
 *
 * @example
 * ```tsx
 * const ref = useRef<ComponentNameRef>(null);
 *
 * <ComponentName
 *   ref={ref}
 *   value={value}
 *   onChange={handleChange}
 * />
 * ```
 */
export const ComponentName = forwardRef<ComponentNameRef, ComponentNameProps>(
  (props, ref) => {
    // Validate props
    const validatedProps = useMemo(() => validateProps(props), [props]);

    // Use the main hook for component logic
    const { state, handlers, computed, refs } =
      useComponentName(validatedProps);

    // Expose imperative API
    useImperativeHandle(
      ref,
      () => ({
        getValue: () => state.value,
        setValue: (value: string) => handlers.setValue(value),
        reset: () => handlers.reset(),
        focus: () => refs.inputRef.current?.focus(),
      }),
      [state.value, handlers, refs],
    );

    // Render props pattern for headless component
    if (typeof props.children === "function") {
      return props.children({
        ...state,
        ...handlers,
        ...computed,
      });
    }

    // Default render (if not using render props)
    return (
      <div
        className={props.className}
        style={props.style}
        data-testid={props.testId}
      >
        <input
          ref={refs.inputRef}
          type="text"
          value={state.value}
          disabled={props.disabled}
          readOnly={props.readOnly}
          placeholder={props.placeholder}
          aria-label={props.ariaLabel}
          aria-describedby={props.ariaDescribedBy}
          aria-invalid={state.hasError}
          onChange={handlers.handleChange}
          onFocus={handlers.handleFocus}
          onBlur={handlers.handleBlur}
        />

        {state.hasError && (
          <div role="alert" className="error">
            {state.errorMessage}
          </div>
        )}
      </div>
    );
  },
);

ComponentName.displayName = "ComponentName";
