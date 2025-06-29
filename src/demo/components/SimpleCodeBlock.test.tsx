import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { SimpleCodeBlock } from "./SimpleCodeBlock";

describe("SimpleCodeBlock", () => {
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

  it("renders code content", () => {
    const code = `const greeting = "Hello, World!";`;
    render(<SimpleCodeBlock code={code} />);

    expect(screen.getByText(code)).toBeInTheDocument();
  });

  it("trims whitespace from code", () => {
    const code = `
    const greeting = "Hello, World!";
    `;
    render(<SimpleCodeBlock code={code} />);

    // Should trim the whitespace
    expect(
      screen.getByText('const greeting = "Hello, World!";'),
    ).toBeInTheDocument();
  });

  it("shows copy button by default", () => {
    render(<SimpleCodeBlock code="test code" />);

    const copyButton = screen.getByTitle("Copy code");
    expect(copyButton).toBeInTheDocument();
    expect(copyButton).toHaveTextContent("Copy");
  });

  it("hides copy button when showCopyButton is false", () => {
    render(<SimpleCodeBlock code="test code" showCopyButton={false} />);

    expect(screen.queryByTitle("Copy code")).not.toBeInTheDocument();
  });

  it("hides copy button in hero variant", () => {
    render(<SimpleCodeBlock code="test code" variant="hero" />);

    expect(screen.queryByTitle("Copy code")).not.toBeInTheDocument();
  });

  it("copies code to clipboard when copy button is clicked", async () => {
    const code = "const test = 123;";
    mockClipboard.writeText.mockResolvedValueOnce(undefined);

    render(<SimpleCodeBlock code={code} />);

    const copyButton = screen.getByTitle("Copy code");
    fireEvent.click(copyButton);

    expect(mockClipboard.writeText).toHaveBeenCalledWith(code);

    // Should show "Copied!" text
    await waitFor(() => {
      expect(copyButton).toHaveTextContent("Copied!");
    });

    // Should revert back to "Copy" after 2 seconds
    await waitFor(
      () => {
        expect(copyButton).toHaveTextContent("Copy");
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

    render(<SimpleCodeBlock code={code} />);

    const copyButton = screen.getByTitle("Copy code");
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith("Failed to copy:", error);
    });

    // Should not show "Copied!" on error
    expect(copyButton).toHaveTextContent("Copy");

    consoleError.mockRestore();
  });

  it("shows line numbers when showLineNumbers is true", () => {
    const code = `line 1
line 2
line 3`;
    render(<SimpleCodeBlock code={code} showLineNumbers={true} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("auto-shows line numbers for code longer than 5 lines", () => {
    const code = `line 1
line 2
line 3
line 4
line 5
line 6`;
    render(<SimpleCodeBlock code={code} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
  });

  it("doesn't auto-show line numbers for bash code", () => {
    const code = `line 1
line 2
line 3
line 4
line 5
line 6`;
    render(<SimpleCodeBlock code={code} language="bash" />);

    expect(screen.queryByText("1")).not.toBeInTheDocument();
    expect(screen.queryByText("6")).not.toBeInTheDocument();
  });

  it("doesn't auto-show line numbers in hero variant", () => {
    const code = `line 1
line 2
line 3
line 4
line 5
line 6`;
    render(<SimpleCodeBlock code={code} variant="hero" />);

    expect(screen.queryByText("1")).not.toBeInTheDocument();
    expect(screen.queryByText("6")).not.toBeInTheDocument();
  });

  it("applies different styles for hero variant", () => {
    const { container: defaultContainer } = render(
      <SimpleCodeBlock code="test" variant="default" />,
    );

    const { container: heroContainer } = render(
      <SimpleCodeBlock code="test" variant="hero" />,
    );

    const defaultPre = defaultContainer.querySelector("pre");
    const heroPre = heroContainer.querySelector("pre");

    // Hero variant should have different padding values
    const defaultStyle = window.getComputedStyle(defaultPre!);
    const heroStyle = window.getComputedStyle(heroPre!);

    // Check that hero variant has larger padding
    expect(heroStyle.paddingTop).toBe("1.25rem");
    expect(heroStyle.paddingBottom).toBe("1.25rem");
    expect(defaultStyle.paddingTop).toBe("1rem");
    expect(defaultStyle.paddingBottom).toBe("1rem");

    // Hero variant should have different font size
    expect(defaultPre).toHaveStyle({ fontSize: "0.875rem" });
    expect(heroPre).toHaveStyle({ fontSize: "0.9375rem" });
  });

  it("respects language prop for syntax highlighting context", () => {
    const code = "SELECT * FROM users;";
    render(<SimpleCodeBlock code={code} language="sql" />);

    // The component still renders the code even though it doesn't do syntax highlighting
    expect(screen.getByText(code)).toBeInTheDocument();
  });

  it("handles multi-line code with proper formatting", () => {
    const code = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return true;
}`;

    render(<SimpleCodeBlock code={code} />);

    // Code should be rendered with preserved formatting
    const codeElement = screen.getByText((content, element) => {
      return element?.tagName === "CODE" && content.includes("function greet");
    });

    expect(codeElement).toBeInTheDocument();
    expect(codeElement.textContent).toContain("function greet");
    expect(codeElement.textContent).toContain("console.log");
  });

  it("applies correct CSS classes for styling", () => {
    const { container } = render(<SimpleCodeBlock code="test" />);

    const wrapper = container.querySelector(".relative.group");
    expect(wrapper).toBeInTheDocument();

    const codeContainer = container.querySelector(".overflow-x-auto");
    expect(codeContainer).toHaveClass("rounded-lg", "shadow-lg");
  });

  it("makes line numbers non-selectable", () => {
    const code = `line 1
line 2
line 3
line 4
line 5
line 6`;
    render(<SimpleCodeBlock code={code} showLineNumbers={true} />);

    const lineNumberContainer = screen.getByText("1").parentElement;
    expect(lineNumberContainer).toHaveAttribute("aria-hidden", "true");
  });
});
