/**
 * Component Template - Tests
 *
 * Comprehensive test suite for the component.
 * CUSTOMIZE: Replace with your component tests.
 */

import { act, renderHook, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { render } from "@/test-utils";

import { ComponentName } from "../ComponentName";
import { useComponentName } from "../hooks/useComponentName";
import type { ComponentNameProps, ComponentNameRef } from "../types";

describe("ComponentName", () => {
  const defaultProps: ComponentNameProps = {
    testId: "component-name",
  };

  describe("Rendering", () => {
    it("should render without crashing", () => {
      const { container } = render(<ComponentName {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it("should render with custom className", () => {
      const { container } = render(
        <ComponentName {...defaultProps} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should render with custom style", () => {
      const style = { backgroundColor: "red" };
      const { container } = render(
        <ComponentName {...defaultProps} style={style} />,
      );
      expect(container.firstChild).toHaveStyle(style);
    });
  });

  describe("Controlled vs Uncontrolled", () => {
    it("should work as uncontrolled component", async () => {
      const { getByRole, user } = render(
        <ComponentName {...defaultProps} defaultValue="initial" />,
      );

      const input = getByRole("textbox");
      expect(input).toHaveValue("initial");

      await user.clear(input);
      await user.type(input, "new value");
      expect(input).toHaveValue("new value");
    });

    it("should work as controlled component", async () => {
      const onChange = vi.fn();
      const { getByRole, rerender, user } = render(
        <ComponentName
          {...defaultProps}
          value="controlled"
          onChange={onChange}
        />,
      );

      const input = getByRole("textbox");
      expect(input).toHaveValue("controlled");

      await user.type(input, "a");
      expect(onChange).toHaveBeenCalledWith("controlleda", expect.any(Object));

      // Value should not change without rerender
      expect(input).toHaveValue("controlled");

      // Update through props
      rerender(
        <ComponentName {...defaultProps} value="updated" onChange={onChange} />,
      );
      expect(input).toHaveValue("updated");
    });
  });

  describe("User Interactions", () => {
    it("should call onChange when typing", async () => {
      const onChange = vi.fn();
      const { getByRole, user } = render(
        <ComponentName {...defaultProps} onChange={onChange} />,
      );

      const input = getByRole("textbox");
      await user.type(input, "test");

      expect(onChange).toHaveBeenCalledTimes(4); // One per character
      expect(onChange).toHaveBeenLastCalledWith("test", expect.any(Object));
    });

    it("should call onFocus and onBlur", async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const { getByRole, user } = render(
        <ComponentName {...defaultProps} onFocus={onFocus} onBlur={onBlur} />,
      );

      const input = getByRole("textbox");

      await user.click(input);
      expect(onFocus).toHaveBeenCalledOnce();

      await user.tab();
      expect(onBlur).toHaveBeenCalledOnce();
    });
  });

  describe("Disabled and ReadOnly States", () => {
    it("should not allow input when disabled", async () => {
      const onChange = vi.fn();
      const { getByRole, user } = render(
        <ComponentName {...defaultProps} disabled onChange={onChange} />,
      );

      const input = getByRole("textbox");
      expect(input).toBeDisabled();

      await user.type(input, "test");
      expect(onChange).not.toHaveBeenCalled();
    });

    it("should not allow input when readOnly", async () => {
      const onChange = vi.fn();
      const { getByRole, user } = render(
        <ComponentName {...defaultProps} readOnly onChange={onChange} />,
      );

      const input = getByRole("textbox");
      expect(input).toHaveAttribute("readonly");

      await user.type(input, "test");
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("Validation", () => {
    it("should show error message when validation fails", async () => {
      const validate = (value: string) =>
        value.length < 5 ? "Too short" : null;

      const { getByRole, getByText, user } = render(
        <ComponentName {...defaultProps} validate={validate} />,
      );

      const input = getByRole("textbox");

      // Type short value
      await user.type(input, "abc");
      await user.tab(); // Blur to trigger validation

      expect(getByText("Too short")).toBeInTheDocument();
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("should clear error when validation passes", async () => {
      const validate = (value: string) =>
        value.length < 5 ? "Too short" : null;

      const { getByRole, queryByText, user } = render(
        <ComponentName {...defaultProps} validate={validate} />,
      );

      const input = getByRole("textbox");

      // Type short value
      await user.type(input, "abc");
      await user.tab();
      expect(queryByText("Too short")).toBeInTheDocument();

      // Type longer value
      await user.click(input);
      await user.clear(input);
      await user.type(input, "valid value");
      await user.tab();

      expect(queryByText("Too short")).not.toBeInTheDocument();
      expect(input).toHaveAttribute("aria-invalid", "false");
    });
  });

  describe("Ref API", () => {
    it("should expose imperative methods", () => {
      const ref = createRef<ComponentNameRef>();
      render(<ComponentName {...defaultProps} ref={ref} />);

      expect(ref.current).toHaveProperty("getValue");
      expect(ref.current).toHaveProperty("setValue");
      expect(ref.current).toHaveProperty("reset");
      expect(ref.current).toHaveProperty("focus");
    });

    it("should get and set value through ref", () => {
      const ref = createRef<ComponentNameRef>();
      const { getByRole } = render(
        <ComponentName {...defaultProps} ref={ref} defaultValue="initial" />,
      );

      expect(ref.current?.getValue()).toBe("initial");

      act(() => {
        ref.current?.setValue("new value");
      });

      expect(ref.current?.getValue()).toBe("new value");
      expect(getByRole("textbox")).toHaveValue("new value");
    });

    it("should reset to default value", () => {
      const ref = createRef<ComponentNameRef>();
      const { getByRole } = render(
        <ComponentName {...defaultProps} ref={ref} defaultValue="default" />,
      );

      act(() => {
        ref.current?.setValue("changed");
      });
      expect(getByRole("textbox")).toHaveValue("changed");

      act(() => {
        ref.current?.reset();
      });
      expect(getByRole("textbox")).toHaveValue("default");
    });

    it("should focus input through ref", () => {
      const ref = createRef<ComponentNameRef>();
      const { getByRole } = render(
        <ComponentName {...defaultProps} ref={ref} />,
      );

      const input = getByRole("textbox");
      expect(document.activeElement).not.toBe(input);

      act(() => {
        ref.current?.focus();
      });

      expect(document.activeElement).toBe(input);
    });
  });

  describe("Render Props Pattern", () => {
    it("should support render props", async () => {
      const { getByTestId, getByText, user } = render(
        <ComponentName {...defaultProps}>
          {({ value, handleChange, isFocused }) => (
            <div data-testid="custom-render">
              <span>Value: {value}</span>
              <span>Focused: {isFocused ? "yes" : "no"}</span>
              <input
                value={value}
                onChange={handleChange}
                data-testid="custom-input"
              />
            </div>
          )}
        </ComponentName>,
      );

      expect(getByTestId("custom-render")).toBeInTheDocument();
      expect(getByText("Value:")).toBeInTheDocument();
      expect(getByText("Focused: no")).toBeInTheDocument();

      const input = getByTestId("custom-input");
      await user.type(input, "test");

      expect(getByText("Value: test")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      const { getByRole } = render(
        <ComponentName
          {...defaultProps}
          ariaLabel="Test input"
          ariaDescribedBy="help-text"
        />,
      );

      const input = getByRole("textbox");
      expect(input).toHaveAttribute("aria-label", "Test input");
      expect(input).toHaveAttribute("aria-describedby", "help-text");
    });

    it("should announce errors to screen readers", async () => {
      const validate = () => "Error message";
      const { getByRole, getByText, user } = render(
        <ComponentName {...defaultProps} validate={validate} />,
      );

      const input = getByRole("textbox");
      await user.type(input, "a");
      await user.tab();

      const error = getByText("Error message");
      expect(error).toHaveAttribute("role", "alert");
    });
  });
});

describe("useComponentName hook", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() =>
      useComponentName({ defaultValue: "test" }),
    );

    expect(result.current.state.value).toBe("test");
    expect(result.current.state.isFocused).toBe(false);
    expect(result.current.state.hasError).toBe(false);
  });

  it("should update value", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useComponentName({ onChange }));

    act(() => {
      result.current.handlers.setValue("new value");
    });

    expect(result.current.state.value).toBe("new value");
    expect(onChange).toHaveBeenCalledWith("new value");
  });
});
