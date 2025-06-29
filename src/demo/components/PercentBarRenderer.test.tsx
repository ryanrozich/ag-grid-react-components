import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PercentBarRenderer from "./PercentBarRenderer";
import { ICellRendererParams } from "ag-grid-community";

describe("PercentBarRenderer", () => {
  const mockParams: ICellRendererParams = {
    value: 50,
    valueFormatted: null,
    getValue: () => 50,
    setValue: vi.fn(),
    formatValue: vi.fn(),
    data: {},
    node: {} as any,
    colDef: {} as any,
    column: {} as any,
    api: {} as any,
    context: null,
    refreshCell: vi.fn(),
    eGridCell: {} as any,
    eParentOfValue: {} as any,
  } as unknown as ICellRendererParams;

  it("renders progress bar with percentage text", () => {
    render(<PercentBarRenderer {...mockParams} value={75} />);

    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("renders nothing when value is null", () => {
    const { container } = render(
      <PercentBarRenderer {...mockParams} value={null as any} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when value is undefined", () => {
    const { container } = render(
      <PercentBarRenderer {...mockParams} value={undefined as any} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("clamps values above 100 to 100", () => {
    render(<PercentBarRenderer {...mockParams} value={150} />);

    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("clamps negative values to 0", () => {
    render(<PercentBarRenderer {...mockParams} value={-25} />);

    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("rounds decimal values to nearest integer", () => {
    render(<PercentBarRenderer {...mockParams} value={75.6} />);

    expect(screen.getByText("76%")).toBeInTheDocument();
  });

  describe("color coding", () => {
    it("uses green color for 100%", () => {
      const { container } = render(
        <PercentBarRenderer {...mockParams} value={100} />,
      );

      // Get all divs with inline styles
      const allDivs = container.querySelectorAll("div[style]");
      let progressBar: Element | null = null;

      // Find the div with width: 100% in its style
      allDivs.forEach((div) => {
        const style = div.getAttribute("style") || "";
        if (
          style.includes("width: 100%") &&
          style.includes("background-color")
        ) {
          progressBar = div;
        }
      });

      expect(progressBar).toBeTruthy();
      expect((progressBar as Element | null)?.getAttribute("style")).toContain(
        "background-color: rgba(34, 197, 94, 0.3)",
      );
    });

    it("uses blue color for 80-99%", () => {
      const { container } = render(
        <PercentBarRenderer {...mockParams} value={85} />,
      );

      const progressBar = container.querySelector('div[style*="width: 85%"]');
      expect(progressBar).toHaveStyle({
        backgroundColor: "rgba(59, 130, 246, 0.3)",
      });
    });

    it("uses purple color for 60-79%", () => {
      const { container } = render(
        <PercentBarRenderer {...mockParams} value={65} />,
      );

      const progressBar = container.querySelector('div[style*="width: 65%"]');
      expect(progressBar).toHaveStyle({
        backgroundColor: "rgba(168, 85, 247, 0.3)",
      });
    });

    it("uses yellow color for 40-59%", () => {
      const { container } = render(
        <PercentBarRenderer {...mockParams} value={45} />,
      );

      const progressBar = container.querySelector('div[style*="width: 45%"]');
      expect(progressBar).toHaveStyle({
        backgroundColor: "rgba(234, 179, 8, 0.3)",
      });
    });

    it("uses orange color for 20-39%", () => {
      const { container } = render(
        <PercentBarRenderer {...mockParams} value={25} />,
      );

      const progressBar = container.querySelector('div[style*="width: 25%"]');
      expect(progressBar).toHaveStyle({
        backgroundColor: "rgba(249, 115, 22, 0.3)",
      });
    });

    it("uses red color for 0-19%", () => {
      const { container } = render(
        <PercentBarRenderer {...mockParams} value={10} />,
      );

      const progressBar = container.querySelector('div[style*="width: 10%"]');
      expect(progressBar).toHaveStyle({
        backgroundColor: "rgba(239, 68, 68, 0.3)",
      });
    });
  });

  describe("progress bar width", () => {
    it("sets correct width for progress bar", () => {
      const { container } = render(
        <PercentBarRenderer {...mockParams} value={60} />,
      );

      const progressBar = container.querySelector('div[style*="width: 60%"]');
      expect(progressBar).toHaveStyle({
        width: "60%",
      });
    });

    it("sets 0% width for zero value", () => {
      const { container } = render(
        <PercentBarRenderer {...mockParams} value={0} />,
      );

      const progressBar = container.querySelector('div[style*="width: 0%"]');
      expect(progressBar).toHaveStyle({
        width: "0%",
      });
    });

    it("sets 100% width for maximum value", () => {
      const { container } = render(
        <PercentBarRenderer {...mockParams} value={100} />,
      );

      const progressBar = container.querySelector('div[style*="width: 100%"]');
      expect(progressBar).toHaveStyle({
        width: "100%",
      });
    });
  });

  describe("text color", () => {
    it("uses appropriate text color for each range", () => {
      const testCases = [
        { value: 100, expectedColor: "rgb(134, 239, 172)" },
        { value: 85, expectedColor: "rgb(147, 197, 253)" },
        { value: 65, expectedColor: "rgb(196, 181, 253)" },
        { value: 45, expectedColor: "rgb(253, 224, 71)" },
        { value: 25, expectedColor: "rgb(253, 186, 116)" },
        { value: 10, expectedColor: "rgb(252, 165, 165)" },
      ];

      testCases.forEach(({ value, expectedColor }) => {
        const { unmount } = render(
          <PercentBarRenderer {...mockParams} value={value} />,
        );
        const textElement = screen.getByText(`${Math.round(value)}%`);
        expect(textElement).toHaveStyle({ color: expectedColor });
        unmount();
      });
    });
  });

  describe("layout and styling", () => {
    it("renders with correct structure", () => {
      const { container } = render(
        <PercentBarRenderer {...mockParams} value={50} />,
      );

      // Check for main container
      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toHaveStyle({
        display: "flex",
        alignItems: "center",
        height: "100%",
        width: "100%",
        position: "relative",
      });

      // Check for background bar
      const backgroundBar = mainDiv.children[0] as HTMLElement;
      expect(backgroundBar).toHaveStyle({
        position: "absolute",
        backgroundColor: "rgba(107, 114, 128, 0.1)",
        borderRadius: "4px",
      });

      // Check for text overlay
      const textOverlay = mainDiv.children[1] as HTMLElement;
      expect(textOverlay).toHaveStyle({
        position: "relative",
        textAlign: "center",
        fontSize: "12px",
        fontWeight: "500",
      });
    });

    it("has smooth transition on progress bar", () => {
      const { container } = render(
        <PercentBarRenderer {...mockParams} value={50} />,
      );

      const progressBar = container.querySelector('div[style*="width: 50%"]');
      expect(progressBar).toHaveStyle({
        transition: "width 0.3s ease",
      });
    });
  });

  describe("edge cases", () => {
    it("handles very small positive values", () => {
      render(<PercentBarRenderer {...mockParams} value={0.1} />);

      expect(screen.getByText("0%")).toBeInTheDocument();
    });

    it("handles very large values", () => {
      render(<PercentBarRenderer {...mockParams} value={999999} />);

      expect(screen.getByText("100%")).toBeInTheDocument();
    });

    it("handles NaN values gracefully", () => {
      render(<PercentBarRenderer {...mockParams} value={NaN} />);

      // NaN is rendered as "NaN%"
      expect(screen.getByText("NaN%")).toBeInTheDocument();
    });
  });
});
