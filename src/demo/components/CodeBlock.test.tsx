import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CodeBlock } from "./CodeBlock";

describe("CodeBlock", () => {
  // Mock clipboard API
  const mockClipboard = {
    writeText: vi.fn(),
  };

  beforeEach(() => {
    // Setup clipboard mock
    Object.assign(navigator, {
      clipboard: mockClipboard,
    });
    mockClipboard.writeText.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders code content with syntax highlighting", () => {
    const code = `const greeting = "Hello, World!";`;
    render(<CodeBlock code={code} />);

    // The code should be rendered
    expect(screen.getByText(/Hello, World!/)).toBeInTheDocument();
  });

  it("trims whitespace from code", () => {
    const code = `
    const greeting = "Hello, World!";
    `;
    render(<CodeBlock code={code} />);

    // Should trim the whitespace but still render the code
    expect(screen.getByText(/Hello, World!/)).toBeInTheDocument();
  });

  it("shows copy button by default", () => {
    render(<CodeBlock code="test code" />);

    const copyButton = screen.getByTitle("Copy code");
    expect(copyButton).toBeInTheDocument();
    expect(screen.getByText("Copy")).toBeInTheDocument();
  });

  it("hides copy button when showCopyButton is false", () => {
    render(<CodeBlock code="test code" showCopyButton={false} />);

    expect(screen.queryByTitle("Copy code")).not.toBeInTheDocument();
  });

  it("hides copy button in hero variant", () => {
    render(<CodeBlock code="test code" variant="hero" />);

    expect(screen.queryByTitle("Copy code")).not.toBeInTheDocument();
  });

  it("copies code to clipboard when copy button is clicked", async () => {
    const code = "const test = 123;";
    mockClipboard.writeText.mockResolvedValueOnce(undefined);

    render(<CodeBlock code={code} />);

    const copyButton = screen.getByTitle("Copy code");
    fireEvent.click(copyButton);

    expect(mockClipboard.writeText).toHaveBeenCalledWith(code);

    // Should show "Copied!" text with checkmark
    await waitFor(() => {
      expect(screen.getByText("Copied!")).toBeInTheDocument();
      // Should show checkmark SVG
      const svg = copyButton.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg?.querySelector("path")?.getAttribute("d")).toContain(
        "M5 13l4 4L19 7",
      );
    });

    // Should revert back to "Copy" after 2 seconds
    await waitFor(
      () => {
        expect(screen.getByText("Copy")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it("handles clipboard errors gracefully", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const code = "const test = 123;";
    const error = new Error("Clipboard access denied");
    mockClipboard.writeText.mockRejectedValueOnce(error);

    render(<CodeBlock code={code} />);

    const copyButton = screen.getByTitle("Copy code");
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith("Failed to copy:", error);
    });

    // Should not show "Copied!" on error
    expect(screen.getByText("Copy")).toBeInTheDocument();
    expect(screen.queryByText("Copied!")).not.toBeInTheDocument();

    consoleError.mockRestore();
  });

  it("handles missing clipboard API", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    // Remove clipboard API
    const originalClipboard = navigator.clipboard;
    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      writable: true,
    });

    render(<CodeBlock code="test" />);

    const copyButton = screen.getByTitle("Copy code");
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        "Failed to copy:",
        expect.any(Error),
      );
    });

    // Restore clipboard
    Object.defineProperty(navigator, "clipboard", {
      value: originalClipboard,
      writable: true,
    });

    consoleError.mockRestore();
  });

  it("renders different languages correctly", () => {
    const jsCode = `console.log("JavaScript");`;
    const tsCode = `const value: string = "TypeScript";`;
    const bashCode = `echo "Bash script"`;

    const { rerender } = render(
      <CodeBlock code={jsCode} language="javascript" />,
    );
    expect(screen.getByText(/JavaScript/)).toBeInTheDocument();

    rerender(<CodeBlock code={tsCode} language="typescript" />);
    expect(screen.getByText(/TypeScript/)).toBeInTheDocument();

    rerender(<CodeBlock code={bashCode} language="bash" />);
    expect(screen.getByText(/Bash script/)).toBeInTheDocument();
  });

  it("applies different styles for hero variant", () => {
    const { container: defaultContainer } = render(
      <CodeBlock code="test" variant="default" />,
    );

    const { container: heroContainer } = render(
      <CodeBlock code="test" variant="hero" />,
    );

    // Find SyntaxHighlighter by its container structure
    const defaultHighlighter = defaultContainer.querySelector("pre");
    const heroHighlighter = heroContainer.querySelector("pre");

    // Hero variant should have different styles
    const defaultStyle = defaultHighlighter?.style;
    const heroStyle = heroHighlighter?.style;

    expect(defaultStyle?.fontSize).toBe("0.875rem");
    expect(heroStyle?.fontSize).toBe("0.9375rem");
  });

  it("applies correct CSS classes for styling", () => {
    const { container } = render(<CodeBlock code="test" />);

    const wrapper = container.querySelector(".relative.group");
    expect(wrapper).toBeInTheDocument();

    const codeContainer = container.querySelector(".overflow-x-auto");
    expect(codeContainer).toBeInTheDocument();
    expect(codeContainer).toHaveClass("rounded-lg", "shadow-lg");
  });

  it("never shows line numbers (as per current implementation)", () => {
    const code = `const first = "one";
const second = "two";
const third = "three";`;
    const { container } = render(
      <CodeBlock code={code} showLineNumbers={true} />,
    );

    // Line numbers should not be shown even when requested
    // Check that there's no line number container
    const lineNumberContainer = container.querySelector(
      '[style*="text-align: right"]',
    );
    expect(lineNumberContainer).toBeNull();

    // The shouldShowLineNumbers is hardcoded to false in the component
    expect(container.textContent).toContain("first");
    expect(container.textContent).toContain("second");
    expect(container.textContent).toContain("third");
  });

  it("handles multi-line code correctly", () => {
    const code = `function greet(name: string) {
  console.log(\`Hello, \${name}!\`);
  return true;
}`;

    render(<CodeBlock code={code} language="typescript" />);

    // Code should be rendered with syntax highlighting
    expect(screen.getByText(/function/)).toBeInTheDocument();
    expect(screen.getByText(/greet/)).toBeInTheDocument();
    expect(screen.getByText(/console/)).toBeInTheDocument();
  });

  it("shows copy icon in copy button", () => {
    render(<CodeBlock code="test" />);

    const copyButton = screen.getByTitle("Copy code");
    const svg = copyButton.querySelector("svg");

    expect(svg).toBeInTheDocument();
    // Should show copy icon path
    expect(svg?.querySelector("path")?.getAttribute("d")).toContain(
      "M8 16H6a2 2",
    );
  });

  it("supports all configured languages", () => {
    const languages = [
      "typescript",
      "javascript",
      "bash",
      "json",
      "tsx",
      "jsx",
      "css",
    ] as const;

    languages.forEach((lang) => {
      const { container } = render(
        <CodeBlock code={`test ${lang} code`} language={lang} />,
      );

      // Should render without errors
      expect(container.textContent).toContain(`test ${lang} code`);
    });
  });
});
