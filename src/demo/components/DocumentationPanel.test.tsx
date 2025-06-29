import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DocumentationPanel } from "./DocumentationPanel";

describe("DocumentationPanel", () => {
  it("renders the main title", () => {
    render(<DocumentationPanel />);

    expect(
      screen.getByText("AG Grid Custom Date Filter Components"),
    ).toBeInTheDocument();
  });

  it("renders all section headings", () => {
    render(<DocumentationPanel />);

    expect(screen.getByText("📦 Components Provided")).toBeInTheDocument();
    expect(
      screen.getByText("🏢 Enterprise Features Demonstrated"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("📅 Using Relative Date Expressions"),
    ).toBeInTheDocument();
    expect(screen.getByText("⚡ Quick Filter Dropdown")).toBeInTheDocument();
    expect(screen.getByText("📊 Additional Demo Features")).toBeInTheDocument();
    expect(screen.getByText("💡 Try This:")).toBeInTheDocument();
  });

  it("renders component information", () => {
    render(<DocumentationPanel />);

    expect(screen.getByText(/RelativeDateFilter/)).toBeInTheDocument();
    expect(screen.getByText(/powerful date filter/)).toBeInTheDocument();
    expect(screen.getByText(/absolute date selection/)).toBeInTheDocument();
    expect(screen.getByText(/relative date expressions/)).toBeInTheDocument();
  });

  it("renders enterprise features list", () => {
    render(<DocumentationPanel />);

    expect(screen.getByText(/Row Grouping & Aggregation/)).toBeInTheDocument();
    expect(screen.getByText(/Grand Total Row/)).toBeInTheDocument();
    expect(screen.getByText(/Filter Tool Panel/)).toBeInTheDocument();
    expect(screen.getByText(/Advanced Column Management/)).toBeInTheDocument();
  });

  it("renders relative date expression examples", () => {
    render(<DocumentationPanel />);

    // Check for code examples - use getAllByText since "Today" appears multiple times
    const todayElements = screen.getAllByText("Today");
    expect(todayElements.length).toBeGreaterThan(0);

    // Check for specific code examples
    expect(screen.getByText("Today+7d")).toBeInTheDocument();
    expect(screen.getByText("Today-3m")).toBeInTheDocument();
    expect(screen.getByText("Today+1y")).toBeInTheDocument();

    // Check that the supported units text exists
    expect(screen.getByText(/Supported units:/)).toBeInTheDocument();

    // Check for unit abbreviations
    const { container } = render(<DocumentationPanel />);
    const strongElements = container.querySelectorAll("strong");
    const unitTexts = Array.from(strongElements).map((el) => el.textContent);

    expect(unitTexts).toContain("d");
    expect(unitTexts).toContain("w");
    expect(unitTexts).toContain("m");
    expect(unitTexts).toContain("y");
  });

  it("renders quick filter options", () => {
    render(<DocumentationPanel />);

    expect(screen.getByText(/All Items/)).toBeInTheDocument();
    expect(screen.getByText(/Upcoming/)).toBeInTheDocument();
    expect(screen.getByText(/Past/)).toBeInTheDocument();

    // These appear multiple times, so use getAllByText
    const thisWeekElements = screen.getAllByText(/This Week/);
    expect(thisWeekElements.length).toBeGreaterThan(0);

    expect(screen.getByText(/Last Week/)).toBeInTheDocument();

    // These also appear multiple times
    const thisMonthElements = screen.getAllByText(/This Month/);
    expect(thisMonthElements.length).toBeGreaterThan(0);

    const lastMonthElements = screen.getAllByText(/Last Month/);
    expect(lastMonthElements.length).toBeGreaterThan(0);
  });

  it("renders visual enhancement features", () => {
    render(<DocumentationPanel />);

    expect(screen.getByText(/Alternating row colors/)).toBeInTheDocument();
    expect(screen.getByText(/Warm color scheme/)).toBeInTheDocument();
    expect(
      screen.getByText(/Pagination with configurable page sizes/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Fixed height grid/)).toBeInTheDocument();
    expect(
      screen.getByText(/Grand total row showing sum aggregations/),
    ).toBeInTheDocument();
  });

  it("renders the try this section with numbered list", () => {
    render(<DocumentationPanel />);

    const tryThisSection = screen.getByText("💡 Try This:");
    expect(tryThisSection).toBeInTheDocument();

    // Check for numbered list items
    expect(
      screen.getByText(/Use the Quick Filter dropdown/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Click the filter icon on the Date column/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Enter "Today-7d"/)).toBeInTheDocument();
    expect(screen.getByText(/Drag the "Category" column/)).toBeInTheDocument();
    expect(
      screen.getByText(/Use the Filter tool panel tab/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Notice how the dropdown shows/),
    ).toBeInTheDocument();
  });

  it("renders enterprise features note", () => {
    render(<DocumentationPanel />);

    expect(
      screen.getByText(/Note on Enterprise Features:/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/require a commercial license for production use/),
    ).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<DocumentationPanel />);

    expect(container.querySelector(".documentation-panel")).toBeInTheDocument();
    expect(container.querySelector(".doc-title")).toBeInTheDocument();
    expect(container.querySelectorAll(".doc-section")).toHaveLength(7);
    expect(container.querySelectorAll(".doc-heading")).toHaveLength(6);
  });

  it("renders all documentation sections in correct order", () => {
    const { container } = render(<DocumentationPanel />);

    const sections = container.querySelectorAll(".doc-section");
    expect(sections).toHaveLength(7);

    // Verify sections are in the expected order
    const headings = Array.from(container.querySelectorAll(".doc-heading")).map(
      (el) => el.textContent,
    );

    expect(headings).toEqual([
      "📦 Components Provided",
      "🏢 Enterprise Features Demonstrated",
      "📅 Using Relative Date Expressions",
      "⚡ Quick Filter Dropdown",
      "📊 Additional Demo Features",
      "💡 Try This:",
    ]);
  });

  it("renders subsection for visual enhancements", () => {
    render(<DocumentationPanel />);

    expect(screen.getByText("Visual Enhancements:")).toBeInTheDocument();

    const { container } = render(<DocumentationPanel />);
    expect(container.querySelector(".doc-subsection")).toBeInTheDocument();
    expect(container.querySelector(".doc-subheading")).toBeInTheDocument();
  });

  it("renders list items with proper structure", () => {
    const { container } = render(<DocumentationPanel />);

    const lists = container.querySelectorAll(".doc-list");
    expect(lists.length).toBeGreaterThan(0);

    const listItems = container.querySelectorAll(".doc-list-item");
    expect(listItems.length).toBeGreaterThan(0);

    // Check for numbered list
    const numberedList = container.querySelector(".doc-list-numbered");
    expect(numberedList).toBeInTheDocument();
    expect(numberedList?.tagName).toBe("OL");
  });
});
