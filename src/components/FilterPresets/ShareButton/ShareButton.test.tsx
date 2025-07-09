import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShareButton } from "./index";
import type { FilterPreset } from "../../../utils/presetSharing/types";

// Mock the clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
});

// Mock the URL serialization
vi.mock("../../../utils/presetSharing", () => ({
  createShareableUrl: vi.fn((_preset, options) => ({
    url:
      options.mode === "embedded"
        ? "https://example.com?preset=compressed123"
        : "https://example.com?presetId=preset-123",
    compressed: options.mode === "embedded",
    originalSize: 1000,
    finalSize: options.mode === "embedded" ? 200 : 50,
  })),
}));

describe("ShareButton", () => {
  const mockPreset: FilterPreset = {
    id: "preset-123",
    name: "Test Preset",
    description: "Test description",
    gridState: {
      filters: {
        status: { type: "equals", value: "active" },
      },
    },
    createdAt: "2024-01-01T10:00:00Z",
  };

  const mockOnCopy = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset clipboard mock
    navigator.clipboard.writeText = vi.fn().mockResolvedValue(undefined);
  });

  it("should render with default trigger", () => {
    render(<ShareButton preset={mockPreset} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Share")).toBeInTheDocument();
  });

  it("should render with custom trigger", () => {
    const customTrigger = ({ onClick, isOpen }: any) => (
      <button onClick={onClick} aria-expanded={isOpen}>
        Custom Share Button
      </button>
    );

    render(<ShareButton preset={mockPreset} renderTrigger={customTrigger} />);

    expect(screen.getByText("Custom Share Button")).toBeInTheDocument();
  });

  it("should open popover on click", async () => {
    const user = userEvent.setup();
    render(<ShareButton preset={mockPreset} />);

    await user.click(screen.getByText("Share"));

    expect(screen.getByText("Share Preset")).toBeInTheDocument();
    expect(
      screen.getByText("Choose how to share this preset"),
    ).toBeInTheDocument();
  });

  it("should show share options", async () => {
    const user = userEvent.setup();
    render(<ShareButton preset={mockPreset} />);

    await user.click(screen.getByText("Share"));

    expect(screen.getByText("Copy Link")).toBeInTheDocument();
    expect(
      screen.getByText("Full preset data embedded in URL"),
    ).toBeInTheDocument();
    expect(screen.getByText("Copy Reference")).toBeInTheDocument();
    expect(
      screen.getByText("Just the preset ID (requires same browser)"),
    ).toBeInTheDocument();
  });

  it("should copy embedded URL to clipboard", async () => {
    const user = userEvent.setup();
    render(<ShareButton preset={mockPreset} onCopy={mockOnCopy} />);

    await user.click(screen.getByText("Share"));
    await user.click(screen.getByText("Copy Link"));

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        "https://example.com?preset=compressed123",
      );
      expect(mockOnCopy).toHaveBeenCalled();
    });

    expect(screen.getByText("✓ Copied!")).toBeInTheDocument();
  });

  it("should copy reference URL to clipboard", async () => {
    const user = userEvent.setup();
    render(<ShareButton preset={mockPreset} onCopy={mockOnCopy} />);

    await user.click(screen.getByText("Share"));
    await user.click(screen.getByText("Copy Reference"));

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        "https://example.com?presetId=preset-123",
      );
    });

    expect(mockOnCopy).toHaveBeenCalled();
  });

  it("should handle clipboard error gracefully", async () => {
    const user = userEvent.setup();
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    navigator.clipboard.writeText = vi
      .fn()
      .mockRejectedValue(new Error("Clipboard error"));

    render(<ShareButton preset={mockPreset} />);

    await user.click(screen.getByText("Share"));
    await user.click(screen.getByText("Copy Link"));

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        "[ShareButton] Failed to copy to clipboard:",
        expect.any(Error),
      );
    });

    consoleError.mockRestore();
  });

  it("should close popover after copying", async () => {
    const user = userEvent.setup();
    render(<ShareButton preset={mockPreset} />);

    await user.click(screen.getByText("Share"));
    expect(screen.getByText("Share Preset")).toBeInTheDocument();

    await user.click(screen.getByText("Copy Link"));

    // Wait for the success message
    await waitFor(() => {
      expect(screen.getByText("✓ Copied!")).toBeInTheDocument();
    });

    // Wait for popover to close after delay
    await waitFor(
      () => {
        expect(screen.queryByText("Share Preset")).not.toBeInTheDocument();
      },
      { timeout: 2500 },
    );
  });

  it("should use custom base URL if provided", async () => {
    const { createShareableUrl } = await import("../../../utils/presetSharing");
    const user = userEvent.setup();

    render(
      <ShareButton
        preset={mockPreset}
        baseUrl="https://custom.example.com/app"
      />,
    );

    await user.click(screen.getByText("Share"));
    await user.click(screen.getByText("Copy Link"));

    await waitFor(() => {
      expect(createShareableUrl).toHaveBeenCalledWith(
        mockPreset,
        expect.objectContaining({
          baseUrl: "https://custom.example.com/app",
          mode: "embedded",
        }),
      );
    });
  });

  it("should show compression info for embedded links", async () => {
    const user = userEvent.setup();
    render(<ShareButton preset={mockPreset} />);

    await user.click(screen.getByText("Share"));

    const embeddedOption = screen.getByText("Copy Link").closest("button");
    expect(embeddedOption).toHaveTextContent("~200 bytes");
  });

  it("should handle keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<ShareButton preset={mockPreset} />);

    // Open with Enter key
    const button = screen.getByText("Share");
    button.focus();
    await user.keyboard("{Enter}");

    expect(screen.getByText("Share Preset")).toBeInTheDocument();

    // Close with Escape
    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByText("Share Preset")).not.toBeInTheDocument();
    });
  });

  it("should handle click outside to close", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <ShareButton preset={mockPreset} />
        <div data-testid="outside">Outside element</div>
      </div>,
    );

    await user.click(screen.getByText("Share"));
    expect(screen.getByText("Share Preset")).toBeInTheDocument();

    await user.click(screen.getByTestId("outside"));

    await waitFor(() => {
      expect(screen.queryByText("Share Preset")).not.toBeInTheDocument();
    });
  });

  it("should be accessible", () => {
    render(<ShareButton preset={mockPreset} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Share preset");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("should update aria-expanded when open", async () => {
    const user = userEvent.setup();
    render(<ShareButton preset={mockPreset} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
  });
});
