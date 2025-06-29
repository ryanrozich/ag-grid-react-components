import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import { AnchorHeading } from "./AnchorHeading";

// Mock react-router-dom hooks
vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );
  return {
    ...actual,
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
  };
});

describe("AnchorHeading", () => {
  const mockNavigate = vi.fn();
  const mockLocation = { pathname: "/test", hash: "" };
  const mockScrollIntoView = vi.fn();

  beforeEach(() => {
    vi.mocked(useLocation).mockReturnValue(mockLocation as any);
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    mockNavigate.mockClear();

    // Mock scrollIntoView on all elements
    Element.prototype.scrollIntoView = mockScrollIntoView;
    mockScrollIntoView.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the heading with correct level", () => {
    const { container } = render(
      <MemoryRouter>
        <AnchorHeading level={1} id="test-heading">
          Test Heading
        </AnchorHeading>
      </MemoryRouter>,
    );

    const heading = container.querySelector("h1");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Test Heading");
    expect(heading).toHaveAttribute("id", "test-heading");
  });

  it("renders different heading levels correctly", () => {
    const levels = [1, 2, 3, 4, 5, 6] as const;

    levels.forEach((level) => {
      const { container } = render(
        <MemoryRouter>
          <AnchorHeading level={level} id={`heading-${level}`}>
            Level {level}
          </AnchorHeading>
        </MemoryRouter>,
      );

      const heading = container.querySelector(`h${level}`);
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(`Level ${level}`);
    });
  });

  it("renders anchor link with correct href", () => {
    render(
      <MemoryRouter>
        <AnchorHeading level={2} id="section-title">
          Section Title
        </AnchorHeading>
      </MemoryRouter>,
    );

    const anchorLink = screen.getByLabelText("Link to Section Title");
    expect(anchorLink).toHaveAttribute("href", "#section-title");
  });

  it("handles anchor click and updates navigation", () => {
    render(
      <MemoryRouter>
        <AnchorHeading level={2} id="click-test">
          Click Test
        </AnchorHeading>
      </MemoryRouter>,
    );

    const anchorLink = screen.getByLabelText("Link to Click Test");
    fireEvent.click(anchorLink);

    expect(mockNavigate).toHaveBeenCalledWith("/test#click-test", {
      replace: true,
    });
  });

  it("scrolls to heading when hash matches id on mount", async () => {
    // Set hash to match the heading id
    vi.mocked(useLocation).mockReturnValue({
      ...mockLocation,
      hash: "#target-heading",
    } as any);

    render(
      <MemoryRouter>
        <AnchorHeading level={2} id="target-heading">
          Target Heading
        </AnchorHeading>
      </MemoryRouter>,
    );

    // Wait for the setTimeout in useEffect
    await waitFor(
      () => {
        expect(mockScrollIntoView).toHaveBeenCalledWith({
          behavior: "smooth",
          block: "start",
        });
      },
      { timeout: 200 },
    );
  });

  it("does not scroll when hash does not match id", async () => {
    // Set hash to different value
    vi.mocked(useLocation).mockReturnValue({
      ...mockLocation,
      hash: "#other-heading",
    } as any);

    render(
      <MemoryRouter>
        <AnchorHeading level={2} id="target-heading">
          Target Heading
        </AnchorHeading>
      </MemoryRouter>,
    );

    // Wait to ensure no scroll happens
    await new Promise((resolve) => setTimeout(resolve, 150));
    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });

  it("applies correct styling classes based on level", () => {
    const { container: container1 } = render(
      <MemoryRouter>
        <AnchorHeading level={1} id="h1">
          H1
        </AnchorHeading>
      </MemoryRouter>,
    );

    const h1 = container1.querySelector("h1");
    expect(h1).toHaveClass("text-3xl", "font-bold");

    const { container: container2 } = render(
      <MemoryRouter>
        <AnchorHeading level={2} id="h2">
          H2
        </AnchorHeading>
      </MemoryRouter>,
    );

    const h2 = container2.querySelector("h2");
    expect(h2).toHaveClass("text-2xl", "font-semibold");
  });

  it("applies custom className when provided", () => {
    const { container } = render(
      <MemoryRouter>
        <AnchorHeading level={3} id="custom" className="custom-class">
          Custom
        </AnchorHeading>
      </MemoryRouter>,
    );

    const heading = container.querySelector("h3");
    expect(heading).toHaveClass("custom-class");
    // Should also have base classes
    expect(heading).toHaveClass("text-xl", "font-semibold");
  });

  it("renders anchor link with SVG icon", () => {
    render(
      <MemoryRouter>
        <AnchorHeading level={2} id="with-icon">
          With Icon
        </AnchorHeading>
      </MemoryRouter>,
    );

    const anchorLink = screen.getByLabelText("Link to With Icon");
    const svg = anchorLink.querySelector("svg");

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("w-4", "h-4", "text-gray-400");
  });

  it("prevents default behavior on anchor click", () => {
    render(
      <MemoryRouter>
        <AnchorHeading level={2} id="prevent-default">
          Prevent Default
        </AnchorHeading>
      </MemoryRouter>,
    );

    const anchorLink = screen.getByLabelText("Link to Prevent Default");
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");

    fireEvent(anchorLink, event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("scrolls to element on anchor click", () => {
    render(
      <MemoryRouter>
        <AnchorHeading level={2} id="scroll-click">
          Scroll Click
        </AnchorHeading>
      </MemoryRouter>,
    );

    const anchorLink = screen.getByLabelText("Link to Scroll Click");
    fireEvent.click(anchorLink);

    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
  });

  it("renders children content correctly", () => {
    render(
      <MemoryRouter>
        <AnchorHeading level={2} id="complex-children">
          <span>Complex</span> <strong>Children</strong> Content
        </AnchorHeading>
      </MemoryRouter>,
    );

    expect(screen.getByText("Complex")).toBeInTheDocument();
    expect(screen.getByText("Children")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
