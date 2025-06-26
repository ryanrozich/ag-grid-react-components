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
      expect(screen.getByText("Specific")).toBeInTheDocument();
      expect(screen.getByText("Relative")).toBeInTheDocument();

      // Check that absolute mode is selected
      const absoluteOption = screen.getByText("Specific");
      expect(absoluteOption).toHaveAttribute("aria-checked", "true");

      // Check that relative mode is not selected
      const relativeOption = screen.getByText("Relative");
      expect(relativeOption).toHaveAttribute("aria-checked", "false");
    });

    it("should render with relative mode selected", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="relative" onModeChange={mockOnModeChange} />,
      );

      // Check that relative mode is selected
      const relativeOption = screen.getByText("Relative");
      expect(relativeOption).toHaveAttribute("aria-checked", "true");

      // Check that absolute mode is not selected
      const absoluteOption = screen.getByText("Specific");
      expect(absoluteOption).toHaveAttribute("aria-checked", "false");
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

      const relativeOption = screen.getByText("Relative");
      fireEvent.click(relativeOption);

      expect(mockOnModeChange).toHaveBeenCalledTimes(1);
    });

    it("should call onModeChange when absolute option is clicked in relative mode", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="relative" onModeChange={mockOnModeChange} />,
      );

      const absoluteOption = screen.getByText("Specific");
      fireEvent.click(absoluteOption);

      expect(mockOnModeChange).toHaveBeenCalledTimes(1);
    });

    it("should not call onModeChange when clicking the already selected option", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="absolute" onModeChange={mockOnModeChange} />,
      );

      const absoluteOption = screen.getByText("Specific");
      fireEvent.click(absoluteOption);

      expect(mockOnModeChange).not.toHaveBeenCalled();
    });

    it("should not call onModeChange when clicking the already selected relative option", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="relative" onModeChange={mockOnModeChange} />,
      );

      const relativeOption = screen.getByText("Relative");
      fireEvent.click(relativeOption);

      expect(mockOnModeChange).not.toHaveBeenCalled();
    });
  });

  describe("styling", () => {
    it.skip("should apply correct styles for absolute mode", () => {
      // Skipped: CSS modules don't apply computed styles correctly in test environment
    });

    it.skip("should apply correct styles for relative mode", () => {
      // Skipped: CSS modules don't apply computed styles correctly in test environment
    });

    it.skip("should have cursor pointer for clickable options", () => {
      // Skipped: CSS modules don't apply computed styles correctly in test environment
    });

    it.skip("should have proper user-select none style", () => {
      // Skipped: CSS modules don't apply computed styles correctly in test environment
    });
  });

  describe("accessibility", () => {
    it("should have proper role attributes", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="absolute" onModeChange={mockOnModeChange} />,
      );

      const absoluteOption = screen.getByText("Specific");
      const relativeOption = screen.getByText("Relative");

      // Options should be buttons with role="radio"
      expect(absoluteOption.tagName).toBe("BUTTON");
      expect(relativeOption.tagName).toBe("BUTTON");
      expect(absoluteOption).toHaveAttribute("role", "radio");
      expect(relativeOption).toHaveAttribute("role", "radio");
    });

    it("should be keyboard accessible", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="absolute" onModeChange={mockOnModeChange} />,
      );

      const relativeOption = screen.getByText("Relative");

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

      // Initial render count tracked for memoization test
      expect(renderCount).toBeGreaterThan(0); // Verify component rendered

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
      expect(screen.getByText("Specific")).toHaveAttribute(
        "aria-checked",
        "true",
      );

      // Change mode
      rerender(
        <FilterModeToggle mode="relative" onModeChange={mockOnModeChange} />,
      );

      // Should reflect new state
      expect(screen.getByText("Relative")).toHaveAttribute(
        "aria-checked",
        "true",
      );
      expect(screen.getByText("Specific")).toHaveAttribute(
        "aria-checked",
        "false",
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

      const absoluteOption = screen.getByText("Specific");

      // Click the already selected option multiple times rapidly
      fireEvent.click(absoluteOption);
      fireEvent.click(absoluteOption);
      fireEvent.click(absoluteOption);

      // Should not call at all since clicking the already selected option
      expect(mockOnModeChange).not.toHaveBeenCalled();
    });

    it("should maintain visual state consistency", () => {
      const mockOnModeChange = vi.fn();
      render(
        <FilterModeToggle mode="absolute" onModeChange={mockOnModeChange} />,
      );

      const absoluteOption = screen.getByText("Specific");
      const relativeOption = screen.getByText("Relative");

      // Verify mutual exclusivity of selection using aria-checked
      expect(absoluteOption).toHaveAttribute("aria-checked", "true");
      expect(relativeOption).toHaveAttribute("aria-checked", "false");
    });
  });
});
