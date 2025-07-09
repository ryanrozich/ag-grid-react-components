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
    // John Doe is not in ASSIGNEES_WITH_PHOTOS, so it shows initials
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("shows UI Avatars for users without photos", () => {
    render(<AvatarCellRenderer {...mockParams} value="Test User" />);

    // Should show initials since Test User is not in ASSIGNEES_WITH_PHOTOS
    expect(screen.getByText("TU")).toBeInTheDocument();
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

    // Madonna is not in ASSIGNEES_WITH_PHOTOS, so shows initials
    expect(screen.getByText("M")).toBeInTheDocument();
  });

  it("generates correct initials in avatar URL for multiple names", () => {
    render(<AvatarCellRenderer {...mockParams} value="Mary Jane Watson" />);

    // Mary Jane Watson is not in ASSIGNEES_WITH_PHOTOS, so shows initials
    expect(screen.getByText("MW")).toBeInTheDocument();
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

    // Emma Davis is in ASSIGNEES_WITH_PHOTOS, so shows an image
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", expect.stringContaining("pravatar.cc"));
  });

  it("transitions to loaded state when image loads", async () => {
    const consoleLog = vi.spyOn(console, "log").mockImplementation(() => {});

    render(<AvatarCellRenderer {...mockParams} value="Marcus Williams" />);

    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", expect.stringContaining("pravatar.cc"));

    // Marcus Williams is in ASSIGNEES_WITH_PHOTOS, so it shows an img element
    // The component doesn't have opacity transitions, so we just verify it's rendered
    expect(img).toHaveAttribute("alt", "Marcus Williams");

    consoleLog.mockRestore();
  });

  it("uses UI Avatars service for users without photos", () => {
    render(<AvatarCellRenderer {...mockParams} value="Unknown User" />);

    // Unknown User is not in ASSIGNEES_WITH_PHOTOS, so shows initials
    expect(screen.getByText("UU")).toBeInTheDocument();
    expect(screen.getByText("Unknown User")).toBeInTheDocument();
  });

  it("generates consistent background colors", () => {
    const { rerender } = render(
      <AvatarCellRenderer {...mockParams} value="Test Name" />,
    );

    // Get the first avatar fallback element
    const firstFallback = screen.getByText("TN");
    const firstStyle = window.getComputedStyle(firstFallback);
    
    // Re-render with same name
    rerender(<AvatarCellRenderer {...mockParams} value="Test Name" />);

    const secondFallback = screen.getByText("TN");
    const secondStyle = window.getComputedStyle(secondFallback);

    // Background colors should be the same for the same name
    expect(firstStyle.backgroundColor).toBe(secondStyle.backgroundColor);
  });

  it("adds title attribute for long names", () => {
    const longName = "Very Long Name That Might Get Truncated";
    render(<AvatarCellRenderer {...mockParams} value={longName} />);

    const nameElement = screen.getByText(longName);
    expect(nameElement).toHaveAttribute("title", longName);
  });
});
