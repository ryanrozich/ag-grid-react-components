import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatsCard, statsCards } from "./commonUIConfig";

describe("StatsCard", () => {
  it("renders stats card with proper background styling for each color", () => {
    const mockStats = {
      taskCount: 42,
      totalBudget: 50000,
      avgProgress: 75.5,
      budgetRemaining: 12500,
    };

    statsCards.forEach((card) => {
      const { container } = render(<StatsCard card={card} stats={mockStats} />);

      // Check that the icon container has background styling
      const iconContainer = container.querySelector("div.p-2\\.5");
      expect(iconContainer).toBeTruthy();

      // Verify the background class is applied based on the color
      const hasBackgroundClass =
        iconContainer?.className.includes("bg-indigo-500/10") ||
        iconContainer?.className.includes("bg-green-500/10") ||
        iconContainer?.className.includes("bg-blue-500/10") ||
        iconContainer?.className.includes("bg-amber-500/10");

      expect(hasBackgroundClass).toBe(true);

      // Verify the text color is applied
      const iconSpan = iconContainer?.querySelector("span");
      const hasTextClass =
        iconSpan?.className.includes("text-indigo-400") ||
        iconSpan?.className.includes("text-green-400") ||
        iconSpan?.className.includes("text-blue-400") ||
        iconSpan?.className.includes("text-amber-400");

      expect(hasTextClass).toBe(true);
    });
  });

  it("renders the correct value and label", () => {
    const mockStats = {
      taskCount: 42,
      totalBudget: 50000,
      avgProgress: 75.5,
      budgetRemaining: 12500,
    };

    const card = statsCards[0]; // Test with first card (taskCount)
    render(<StatsCard card={card} stats={mockStats} />);

    // Check label
    expect(screen.getByText("Number of Tasks")).toBeInTheDocument();

    // Check formatted value
    expect(screen.getByText("42")).toBeInTheDocument();
  });
});
