import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CategoryCellRenderer from "./CategoryCellRenderer";
import { Category } from "../data/types";

describe("CategoryCellRenderer", () => {
  const mockParams = {
    value: "Bug" as Category,
    valueFormatted: null,
    getValue: () => "Bug",
    setValue: () => {},
    data: {},
    node: {} as any,
    colDef: {} as any,
    column: {} as any,
    api: {} as any,
    columnApi: {} as any,
    context: null,
    refreshCell: () => {},
    eGridCell: {} as any,
    eParentOfValue: {} as any,
    registerRowDragger: () => {},
    addRenderedRowListener: () => {},
    setTooltip: () => {},
  };

  it("renders category as a styled pill", () => {
    render(<CategoryCellRenderer {...mockParams} />);

    const pill = screen.getByText("Bug");
    expect(pill).toBeInTheDocument();

    // Check that it has proper styling
    const pillElement = pill.parentElement;
    expect(pillElement).toHaveStyle({
      display: "inline-flex",
      alignItems: "center",
    });

    // Check the span has correct styles
    expect(pill).toHaveStyle({
      borderRadius: "9999px",
      fontSize: "12px",
      fontWeight: "500",
    });
  });

  it("renders all category types correctly", () => {
    const categories: Category[] = [
      "Bug",
      "Feature",
      "Documentation",
      "Refactor",
      "Testing",
      "DevOps",
      "Security",
      "Performance",
    ];

    categories.forEach((category) => {
      const { rerender } = render(
        <CategoryCellRenderer {...mockParams} value={category} />,
      );

      const pill = screen.getByText(category);
      expect(pill).toBeInTheDocument();

      rerender(<div />); // Clear for next iteration
    });
  });

  it("returns null when value is not provided", () => {
    const { container } = render(
      <CategoryCellRenderer {...mockParams} value={undefined as any} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("returns plain text for unknown category", () => {
    render(<CategoryCellRenderer {...mockParams} value={"Unknown" as any} />);

    const text = screen.getByText("Unknown");
    expect(text).toBeInTheDocument();
    expect(text.tagName).toBe("SPAN");
    // For unknown categories, it's just a simple span without the pill styling
    const styles = window.getComputedStyle(text);
    expect(styles.borderRadius).not.toBe("9999px");
  });
});
