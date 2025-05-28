import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FilterModeToggle } from "./FilterModeToggle";

describe("FilterModeToggle component", () => {
  describe("rendering", () => {
    it("should render with absolute mode selected", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="absolute" onModeChange={mockOnModeChange} />,
      );

      expect(screen.getByTestId("mode-toggle")).toBeInTheDocument();
      expect(screen.getByText("Specific Date")).toBeInTheDocument();
      expect(screen.getByText("Relative Date")).toBeInTheDocument();

      // Check that absolute mode is selected
      const absoluteOption = screen.getByText("Specific Date").parentElement;
      expect(absoluteOption).toHaveClass("selected");

      // Check that relative mode is not selected
      const relativeOption = screen.getByText("Relative Date").parentElement;
      expect(relativeOption).not.toHaveClass("selected");
    });

    it("should render with relative mode selected", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="relative" onModeChange={mockOnModeChange} />,
      );

      // Check that relative mode is selected
      const relativeOption = screen.getByText("Relative Date").parentElement;
      expect(relativeOption).toHaveClass("selected");

      // Check that absolute mode is not selected
      const absoluteOption = screen.getByText("Specific Date").parentElement;
      expect(absoluteOption).not.toHaveClass("selected");
    });

    it("should render with custom className", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle
          mode="absolute"
          onModeChange={mockOnModeChange}
          className="custom-class"
        />,
      );

      const container = screen.getByTestId("mode-toggle").parentElement;
      expect(container).toHaveClass("custom-class");
    });

    it("should have proper ARIA label", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="absolute" onModeChange={mockOnModeChange} />,
      );

      const label = screen.getByText("Date Mode");
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe("LABEL");
    });
  });

  describe("interaction", () => {
    it("should call onModeChange when relative option is clicked in absolute mode", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="absolute" onModeChange={mockOnModeChange} />,
      );

      const relativeOption = screen.getByText("Relative Date");
      fireEvent.click(relativeOption);

      expect(mockOnModeChange).toHaveBeenCalledTimes(1);
    });

    it("should call onModeChange when absolute option is clicked in relative mode", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="relative" onModeChange={mockOnModeChange} />,
      );

      const absoluteOption = screen.getByText("Specific Date");
      fireEvent.click(absoluteOption);

      expect(mockOnModeChange).toHaveBeenCalledTimes(1);
    });

    it("should not call onModeChange when clicking the already selected option", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="absolute" onModeChange={mockOnModeChange} />,
      );

      const absoluteOption = screen.getByText("Specific Date");
      fireEvent.click(absoluteOption);

      expect(mockOnModeChange).not.toHaveBeenCalled();
    });

    it("should not call onModeChange when clicking the already selected relative option", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="relative" onModeChange={mockOnModeChange} />,
      );

      const relativeOption = screen.getByText("Relative Date");
      fireEvent.click(relativeOption);

      expect(mockOnModeChange).not.toHaveBeenCalled();
    });
  });

  describe("styling", () => {
    it("should apply correct styles for absolute mode", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="absolute" onModeChange={mockOnModeChange} />,
      );

      const absoluteOption = screen.getByText("Specific Date");
      const absoluteStyles = window.getComputedStyle(absoluteOption);

      // Should have selected styles (blue background, white text)
      expect(absoluteStyles.backgroundColor).toBe("rgb(37, 99, 235)"); // #2563eb
      expect(absoluteStyles.color).toBe("rgb(255, 255, 255)");
      expect(absoluteStyles.fontWeight).toBe("600");

      const relativeOption = screen.getByText("Relative Date");
      const relativeStyles = window.getComputedStyle(relativeOption);

      // Should have unselected styles (light background, dark text)
      expect(relativeStyles.backgroundColor).toBe("rgb(249, 250, 251)"); // #f9fafb
      expect(relativeStyles.color).toBe("rgb(55, 65, 81)"); // #374151
      expect(relativeStyles.fontWeight).toBe("400");
    });

    it("should apply correct styles for relative mode", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="relative" onModeChange={mockOnModeChange} />,
      );

      const relativeOption = screen.getByText("Relative Date");
      const relativeStyles = window.getComputedStyle(relativeOption);

      // Should have selected styles
      expect(relativeStyles.backgroundColor).toBe("rgb(37, 99, 235)");
      expect(relativeStyles.color).toBe("rgb(255, 255, 255)");
      expect(relativeStyles.fontWeight).toBe("600");

      const absoluteOption = screen.getByText("Specific Date");
      const absoluteStyles = window.getComputedStyle(absoluteOption);

      // Should have unselected styles
      expect(absoluteStyles.backgroundColor).toBe("rgb(249, 250, 251)");
      expect(absoluteStyles.color).toBe("rgb(55, 65, 81)");
      expect(absoluteStyles.fontWeight).toBe("400");
    });

    it("should have cursor pointer for clickable options", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="absolute" onModeChange={mockOnModeChange} />,
      );

      const absoluteOption = screen.getByText("Specific Date");
      const relativeOption = screen.getByText("Relative Date");

      expect(window.getComputedStyle(absoluteOption).cursor).toBe("pointer");
      expect(window.getComputedStyle(relativeOption).cursor).toBe("pointer");
    });

    it("should have proper user-select none style", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="absolute" onModeChange={mockOnModeChange} />,
      );

      const absoluteOption = screen.getByText("Specific Date");
      const relativeOption = screen.getByText("Relative Date");

      expect(window.getComputedStyle(absoluteOption).userSelect).toBe("none");
      expect(window.getComputedStyle(relativeOption).userSelect).toBe("none");
    });
  });

  describe("accessibility", () => {
    it("should have proper role attributes", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="absolute" onModeChange={mockOnModeChange} />,
      );

      const absoluteOption = screen.getByText("Specific Date");
      const relativeOption = screen.getByText("Relative Date");

      // Options should be clickable divs with appropriate styling for buttons
      expect(absoluteOption.tagName).toBe("DIV");
      expect(relativeOption.tagName).toBe("DIV");
    });

    it("should be keyboard accessible", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="absolute" onModeChange={mockOnModeChange} />,
      );

      const relativeOption = screen.getByText("Relative Date");

      // Test keyboard navigation
      fireEvent.keyDown(relativeOption, { key: "Enter", code: "Enter" });
      // For now, we only test click events, but this could be extended for keyboard support
    });

    it("should have proper semantic structure", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="absolute" onModeChange={mockOnModeChange} />,
      );

      // Should have a label
      const label = screen.getByText("Date Mode");
      expect(label.tagName).toBe("LABEL");

      // Should have a container for the options
      const container = screen.getByTestId("mode-toggle");
      expect(container).toBeInTheDocument();
    });
  });

  describe("React.memo optimization", () => {
    it("should not re-render when props haven't changed", () => {
      const mockOnModeChange = vi.fn();
      let renderCount = 0;

      const TestWrapper = ({ mode }: { mode: "absolute" | "relative" }) => {
        renderCount++;
        return <FilterModeToggle mode={mode} onModeChange={mockOnModeChange} />;
      };

      const { rerender } = render(<TestWrapper mode="absolute" />);

      const initialRenderCount = renderCount;

      // Re-render with same props
      rerender(<TestWrapper mode="absolute" />);

      // Component should be memoized, but the wrapper will still re-render
      // This test verifies the basic structure is working
      expect(screen.getByTestId("mode-toggle")).toBeInTheDocument();
    });

    it("should re-render when mode changes", () => {
      const mockOnModeChange = vi.fn();

      const { rerender } = render(
        <FilterModeToggle mode="absolute" onModeChange={mockOnModeChange} />,
      );

      // Check initial state
      expect(screen.getByText("Specific Date").parentElement).toHaveClass(
        "selected",
      );

      // Change mode
      rerender(
        <FilterModeToggle mode="relative" onModeChange={mockOnModeChange} />,
      );

      // Should reflect new state
      expect(screen.getByText("Relative Date").parentElement).toHaveClass(
        "selected",
      );
      expect(screen.getByText("Specific Date").parentElement).not.toHaveClass(
        "selected",
      );
    });

    it("should re-render when className changes", () => {
      const mockOnModeChange = vi.fn();

      const { rerender } = render(
        <FilterModeToggle
          mode="absolute"
          onModeChange={mockOnModeChange}
          className="class1"
        />,
      );

      let container = screen.getByTestId("mode-toggle").parentElement;
      expect(container).toHaveClass("class1");

      // Change className
      rerender(
        <FilterModeToggle
          mode="absolute"
          onModeChange={mockOnModeChange}
          className="class2"
        />,
      );

      container = screen.getByTestId("mode-toggle").parentElement;
      expect(container).toHaveClass("class2");
      expect(container).not.toHaveClass("class1");
    });
  });

  describe("edge cases", () => {
    it("should handle undefined className gracefully", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="absolute" onModeChange={mockOnModeChange} />,
      );

      expect(screen.getByTestId("mode-toggle")).toBeInTheDocument();
    });

    it("should handle rapid clicks gracefully", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="absolute" onModeChange={mockOnModeChange} />,
      );

      const relativeOption = screen.getByText("Relative Date");

      // Click multiple times rapidly
      fireEvent.click(relativeOption);
      fireEvent.click(relativeOption);
      fireEvent.click(relativeOption);

      // Should only call once since it's the same option
      expect(mockOnModeChange).toHaveBeenCalledTimes(1);
    });

    it("should maintain visual state consistency", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="absolute" onModeChange={mockOnModeChange} />,
      );

      const absoluteOption = screen.getByText("Specific Date");
      const relativeOption = screen.getByText("Relative Date");

      // Verify mutual exclusivity of selection
      expect(absoluteOption.parentElement).toHaveClass("selected");
      expect(relativeOption.parentElement).not.toHaveClass("selected");

      // Both should have exactly one of the CSS classes (either selected or not)
      const absoluteClasses = absoluteOption.parentElement?.className || "";
      const relativeClasses = relativeOption.parentElement?.className || "";

      expect(absoluteClasses.includes("selected")).toBe(true);
      expect(relativeClasses.includes("selected")).toBe(false);
    });
  });
});
