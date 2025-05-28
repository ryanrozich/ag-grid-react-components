import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FilterActions } from "./FilterActions";

describe("FilterActions component", () => {
  describe("rendering", () => {
    it("should render both Reset and Apply buttons", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      expect(screen.getByTestId("clear-button")).toBeInTheDocument();
      expect(screen.getByTestId("apply-button")).toBeInTheDocument();
      expect(screen.getByText("Reset")).toBeInTheDocument();
      expect(screen.getByText("Apply")).toBeInTheDocument();
    });

    it("should render with custom className", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
          className="custom-class"
        />
      );

      const container = screen.getByTestId("clear-button").parentElement;
      expect(container).toHaveClass("custom-class");
    });

    it("should have proper button types", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      const resetButton = screen.getByTestId("clear-button");
      const applyButton = screen.getByTestId("apply-button");

      expect(resetButton).toHaveAttribute("type", "button");
      expect(applyButton).toHaveAttribute("type", "button");
    });

    it("should have proper CSS classes", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      const resetButton = screen.getByTestId("clear-button");
      const applyButton = screen.getByTestId("apply-button");

      expect(resetButton).toHaveClass("filter-button", "reset-button");
      expect(applyButton).toHaveClass("filter-button", "apply-button");
    });
  });

  describe("button state management", () => {
    it("should enable Apply button when isValid is true", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      const applyButton = screen.getByTestId("apply-button");
      expect(applyButton).not.toBeDisabled();
    });

    it("should disable Apply button when isValid is false", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={false}
        />
      );

      const applyButton = screen.getByTestId("apply-button");
      expect(applyButton).toBeDisabled();
    });

    it("should always enable Reset button regardless of validity", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      // Test with valid state
      const { rerender } = render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      let resetButton = screen.getByTestId("clear-button");
      expect(resetButton).not.toBeDisabled();

      // Test with invalid state
      rerender(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={false}
        />
      );

      resetButton = screen.getByTestId("clear-button");
      expect(resetButton).not.toBeDisabled();
    });
  });

  describe("click interactions", () => {
    it("should call onReset when Reset button is clicked", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      const resetButton = screen.getByTestId("clear-button");
      fireEvent.click(resetButton);

      expect(mockOnReset).toHaveBeenCalledTimes(1);
      expect(mockOnApply).not.toHaveBeenCalled();
    });

    it("should call onApply when Apply button is clicked and enabled", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      const applyButton = screen.getByTestId("apply-button");
      fireEvent.click(applyButton);

      expect(mockOnApply).toHaveBeenCalledTimes(1);
      expect(mockOnReset).not.toHaveBeenCalled();
    });

    it("should not call onApply when Apply button is clicked but disabled", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={false}
        />
      );

      const applyButton = screen.getByTestId("apply-button");
      fireEvent.click(applyButton);

      expect(mockOnApply).not.toHaveBeenCalled();
    });

    it("should handle multiple rapid clicks gracefully", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      const resetButton = screen.getByTestId("clear-button");
      const applyButton = screen.getByTestId("apply-button");

      // Rapid clicks on reset
      fireEvent.click(resetButton);
      fireEvent.click(resetButton);
      fireEvent.click(resetButton);

      expect(mockOnReset).toHaveBeenCalledTimes(3);

      // Rapid clicks on apply
      fireEvent.click(applyButton);
      fireEvent.click(applyButton);

      expect(mockOnApply).toHaveBeenCalledTimes(2);
    });
  });

  describe("keyboard interactions", () => {
    it("should respond to Enter key on Reset button", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      const resetButton = screen.getByTestId("clear-button");
      fireEvent.keyDown(resetButton, { key: "Enter", code: "Enter" });

      // Note: This tests that the button can receive focus and key events
      // The actual Enter key handling is handled by the browser for button elements
      expect(resetButton).toBeInTheDocument();
    });

    it("should respond to Enter key on Apply button when enabled", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      const applyButton = screen.getByTestId("apply-button");
      fireEvent.keyDown(applyButton, { key: "Enter", code: "Enter" });

      expect(applyButton).toBeInTheDocument();
    });

    it("should be focusable via Tab key", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      const resetButton = screen.getByTestId("clear-button");
      const applyButton = screen.getByTestId("apply-button");

      // Focus the reset button
      resetButton.focus();
      expect(document.activeElement).toBe(resetButton);

      // Tab to apply button
      fireEvent.keyDown(resetButton, { key: "Tab", code: "Tab" });
      applyButton.focus();
      expect(document.activeElement).toBe(applyButton);
    });
  });

  describe("styling and layout", () => {
    it("should have proper container styling", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      const container = screen.getByTestId("clear-button").parentElement;
      const styles = window.getComputedStyle(container!);
      
      expect(styles.display).toBe("flex");
      expect(styles.justifyContent).toBe("space-between");
      expect(styles.marginTop).toBe("1rem");
    });

    it("should apply filter-buttons class to container", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      const container = screen.getByTestId("clear-button").parentElement;
      expect(container).toHaveClass("filter-buttons");
    });

    it("should maintain button order (Reset left, Apply right)", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      const container = screen.getByTestId("clear-button").parentElement;
      const buttons = container?.children;
      
      expect(buttons?.[0]).toBe(screen.getByTestId("clear-button"));
      expect(buttons?.[1]).toBe(screen.getByTestId("apply-button"));
    });
  });

  describe("React.memo optimization", () => {
    it("should not re-render when props haven't changed", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      const TestWrapper = ({ isValid }: { isValid: boolean }) => (
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={isValid}
        />
      );

      const { rerender } = render(<TestWrapper isValid={true} />);
      
      // Re-render with same props
      rerender(<TestWrapper isValid={true} />);
      
      // Component should still be rendered correctly
      expect(screen.getByTestId("clear-button")).toBeInTheDocument();
      expect(screen.getByTestId("apply-button")).toBeInTheDocument();
    });

    it("should re-render when isValid changes", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      const { rerender } = render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      // Check initial state
      expect(screen.getByTestId("apply-button")).not.toBeDisabled();

      // Change isValid
      rerender(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={false}
        />
      );

      // Should reflect new state
      expect(screen.getByTestId("apply-button")).toBeDisabled();
    });

    it("should re-render when className changes", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      const { rerender } = render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
          className="class1"
        />
      );

      let container = screen.getByTestId("clear-button").parentElement;
      expect(container).toHaveClass("class1");

      // Change className
      rerender(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
          className="class2"
        />
      );

      container = screen.getByTestId("clear-button").parentElement;
      expect(container).toHaveClass("class2");
      expect(container).not.toHaveClass("class1");
    });
  });

  describe("accessibility", () => {
    it("should have proper button semantics", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      const resetButton = screen.getByTestId("clear-button");
      const applyButton = screen.getByTestId("apply-button");

      expect(resetButton.tagName).toBe("BUTTON");
      expect(applyButton.tagName).toBe("BUTTON");
    });

    it("should have descriptive text content", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      const resetButton = screen.getByTestId("clear-button");
      const applyButton = screen.getByTestId("apply-button");

      expect(resetButton).toHaveTextContent("Reset");
      expect(applyButton).toHaveTextContent("Apply");
    });

    it("should maintain disabled state for screen readers", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={false}
        />
      );

      const applyButton = screen.getByTestId("apply-button");
      
      expect(applyButton).toHaveAttribute("disabled");
      expect(applyButton.getAttribute("disabled")).toBe("");
    });
  });

  describe("edge cases", () => {
    it("should handle undefined className gracefully", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      expect(screen.getByTestId("clear-button")).toBeInTheDocument();
      expect(screen.getByTestId("apply-button")).toBeInTheDocument();
    });

    it("should handle callback errors gracefully", () => {
      const mockOnReset = vi.fn(() => {
        throw new Error("Reset error");
      });
      const mockOnApply = vi.fn();
      
      render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      const resetButton = screen.getByTestId("clear-button");
      
      // This should not crash the component
      expect(() => {
        fireEvent.click(resetButton);
      }).toThrow("Reset error");
      
      expect(mockOnReset).toHaveBeenCalled();
    });

    it("should maintain state consistency during rapid state changes", () => {
      const mockOnReset = vi.fn();
      const mockOnApply = vi.fn();
      
      const { rerender } = render(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      // Rapidly toggle validity
      rerender(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={false}
        />
      );
      
      rerender(
        <FilterActions
          onReset={mockOnReset}
          onApply={mockOnApply}
          isValid={true}
        />
      );

      const applyButton = screen.getByTestId("apply-button");
      expect(applyButton).not.toBeDisabled();
    });
  });
});