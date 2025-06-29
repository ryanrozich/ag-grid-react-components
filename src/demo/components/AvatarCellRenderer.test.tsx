import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AvatarCellRenderer from "./AvatarCellRenderer";
import styles from "./AvatarCellRenderer.module.css";
import type {
  ICellRendererParams,
  RowNode,
  ColDef,
  Column,
  GridApi,
} from "ag-grid-community";

describe("AvatarCellRenderer", () => {
  const mockParams: ICellRendererParams = {
    value: "John Doe",
    valueFormatted: null,
    getValue: () => "John Doe",
    setValue: () => {},
    data: {},
    node: {} as RowNode,
    colDef: {} as ColDef,
    column: {} as Column,
    api: {} as GridApi,
    context: null,
    refreshCell: () => {},
    eGridCell: {} as HTMLElement,
    eParentOfValue: {} as HTMLElement,
    registerRowDragger: () => {},
    setTooltip: () => {},
  };

  it("renders name with avatar", () => {
    render(<AvatarCellRenderer {...mockParams} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("shows UI Avatars for users without photos", () => {
    render(<AvatarCellRenderer {...mockParams} value="Test User" />);

    // Should use UI Avatars service since Test User is not in ASSIGNEES_WITH_PHOTOS
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("ui-avatars.com"),
    );
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  it("shows photo for users in ASSIGNEES_WITH_PHOTOS", () => {
    render(<AvatarCellRenderer {...mockParams} value="Alex Chen" />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", expect.stringContaining("pravatar.cc"));
    expect(screen.getByText("Alex Chen")).toBeInTheDocument();
  });

  it("returns null when value is empty", () => {
    const { container } = render(
      <AvatarCellRenderer {...mockParams} value="" />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("generates correct initials in avatar URL for single name", () => {
    render(<AvatarCellRenderer {...mockParams} value="Madonna" />);

    const img = screen.getByRole("img");
    // UI Avatars will include the name in the URL
    expect(img).toHaveAttribute("src", expect.stringContaining("name=Madonna"));
  });

  it("generates correct initials in avatar URL for multiple names", () => {
    render(<AvatarCellRenderer {...mockParams} value="Mary Jane Watson" />);

    const img = screen.getByRole("img");
    // UI Avatars will use the full name
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("name=Mary%20Jane%20Watson"),
    );
  });

  it("handles image load error gracefully", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<AvatarCellRenderer {...mockParams} value="Sarah Johnson" />);

    const img = screen.getByRole("img");

    // Trigger error event
    img.dispatchEvent(new Event("error"));

    // Should show fallback avatar after error
    await waitFor(() => {
      // After error, the image should be replaced with a fallback div
      // The fallback contains the initials "SJ"
      const fallback = screen.getByText("SJ");
      expect(fallback).toBeInTheDocument();

      // The fallback should have the avatarFallback class
      expect(fallback).toHaveClass(styles.avatarFallback);
    });

    consoleError.mockRestore();
  });

  it("shows loading state while image loads", () => {
    render(<AvatarCellRenderer {...mockParams} value="Emma Davis" />);

    // Before image loads, should show fallback with initials
    const fallback = screen.getByText("ED");
    expect(fallback).toBeInTheDocument();

    const img = screen.getByRole("img");
    // The component shows opacity 0 while loading for pravatar images
    expect(img).toHaveStyle({ opacity: "0" });
  });

  it("transitions to loaded state when image loads", async () => {
    const consoleLog = vi.spyOn(console, "log").mockImplementation(() => {});

    render(<AvatarCellRenderer {...mockParams} value="Marcus Williams" />);

    const img = screen.getByRole("img");

    // Trigger load event
    img.dispatchEvent(new Event("load"));

    await waitFor(() => {
      expect(img).toHaveStyle({ opacity: "1" });
    });

    consoleLog.mockRestore();
  });

  it("uses UI Avatars service for users without photos", () => {
    render(<AvatarCellRenderer {...mockParams} value="Unknown User" />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("ui-avatars.com"),
    );
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("name=Unknown%20User"),
    );
  });

  it("generates consistent background colors", () => {
    const { rerender } = render(
      <AvatarCellRenderer {...mockParams} value="Test Name" />,
    );

    // Get the first avatar URL
    const firstImg = screen.getByRole("img") as HTMLImageElement;
    const firstUrl = firstImg.src;

    // Re-render with same name
    rerender(<AvatarCellRenderer {...mockParams} value="Test Name" />);

    const secondImg = screen.getByRole("img") as HTMLImageElement;
    const secondUrl = secondImg.src;

    // URLs should contain the same background color for the same name
    expect(firstUrl).toBe(secondUrl);
  });

  it("adds title attribute for long names", () => {
    const longName = "Very Long Name That Might Get Truncated";
    render(<AvatarCellRenderer {...mockParams} value={longName} />);

    const nameElement = screen.getByText(longName);
    expect(nameElement).toHaveAttribute("title", longName);
  });
});
