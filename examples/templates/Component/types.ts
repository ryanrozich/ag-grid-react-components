/**
 * Component Template - Type Definitions
 *
 * All TypeScript interfaces and types for the component.
 * CUSTOMIZE: Define your component's props, state, and other types.
 */

import type { CSSProperties, ReactNode } from "react";

/**
 * Props for the ComponentName component
 */
export interface ComponentNameProps {
  /**
   * Current value of the component
   */
  value?: string;

  /**
   * Default value (for uncontrolled mode)
   */
  defaultValue?: string;

  /**
   * Callback fired when value changes
   */
  onChange?: (
    value: string,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void;

  /**
   * Callback fired when component receives focus
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Callback fired when component loses focus
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Whether the component is disabled
   */
  disabled?: boolean;

  /**
   * Whether the component is read-only
   */
  readOnly?: boolean;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * CSS class name
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: CSSProperties;

  /**
   * Test ID for testing
   */
  testId?: string;

  /**
   * Accessibility label
   */
  ariaLabel?: string;

  /**
   * ID of element that describes this component
   */
  ariaDescribedBy?: string;

  /**
   * Validation function
   */
  validate?: (value: string) => string | null;

  /**
   * Render prop for custom rendering
   */
  children?: (props: ComponentRenderProps) => ReactNode;
}

/**
 * Ref handle exposed by the component
 */
export interface ComponentNameRef {
  /**
   * Get the current value
   */
  getValue: () => string;

  /**
   * Set the value programmatically
   */
  setValue: (value: string) => void;

  /**
   * Reset to default value
   */
  reset: () => void;

  /**
   * Focus the input element
   */
  focus: () => void;
}

/**
 * Internal state of the component
 */
export interface ComponentNameState {
  value: string;
  isFocused: boolean;
  hasError: boolean;
  errorMessage: string | null;
  isDirty: boolean;
}

/**
 * Props passed to render function
 */
export interface ComponentRenderProps extends ComponentNameState {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  setValue: (value: string) => void;
  reset: () => void;
}

/**
 * Configuration options for the hook
 */
export interface UseComponentNameOptions extends ComponentNameProps {
  // Additional hook-specific options
}

/**
 * Return value of the hook
 */
export interface UseComponentNameReturn {
  state: ComponentNameState;
  handlers: {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
    handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    setValue: (value: string) => void;
    reset: () => void;
  };
  computed: {
    isControlled: boolean;
    displayValue: string;
  };
  refs: {
    inputRef: React.RefObject<HTMLInputElement>;
  };
}
