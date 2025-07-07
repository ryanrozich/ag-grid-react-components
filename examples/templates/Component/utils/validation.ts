/**
 * Component Template - Validation Utilities
 *
 * Props validation and other validation helpers.
 * CUSTOMIZE: Add your validation logic.
 */

import type { ComponentNameProps } from "../types";

/**
 * Validate component props
 */
export function validateProps(props: ComponentNameProps): ComponentNameProps {
  if (process.env.NODE_ENV === "production") {
    return props;
  }

  const errors: string[] = [];

  // Check for invalid prop combinations
  if (props.disabled && props.readOnly) {
    errors.push("Component cannot be both disabled and readOnly");
  }

  // Check for missing accessibility props
  if (!props.ariaLabel && !props.ariaDescribedBy && !props.placeholder) {
    console.warn(
      "ComponentName: Consider providing ariaLabel, ariaDescribedBy, or placeholder for accessibility",
    );
  }

  // Throw if critical errors
  if (errors.length > 0) {
    throw new Error(`ComponentName validation errors:\n${errors.join("\n")}`);
  }

  return props;
}

/**
 * Common validation functions
 */
export const validators = {
  /**
   * Validate required field
   */
  required: (value: string): string | null => {
    return value.trim() ? null : "This field is required";
  },

  /**
   * Validate minimum length
   */
  minLength:
    (min: number) =>
    (value: string): string | null => {
      return value.length >= min ? null : `Must be at least ${min} characters`;
    },

  /**
   * Validate maximum length
   */
  maxLength:
    (max: number) =>
    (value: string): string | null => {
      return value.length <= max
        ? null
        : `Must be no more than ${max} characters`;
    },

  /**
   * Validate pattern
   */
  pattern:
    (regex: RegExp, message: string) =>
    (value: string): string | null => {
      return regex.test(value) ? null : message;
    },

  /**
   * Combine multiple validators
   */
  compose: (...validators: Array<(value: string) => string | null>) => {
    return (value: string): string | null => {
      for (const validator of validators) {
        const error = validator(value);
        if (error) return error;
      }
      return null;
    };
  },
};
