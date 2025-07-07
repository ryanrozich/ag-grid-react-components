import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { usePresetFromUrl } from "./usePresetFromUrl";
import type { FilterPreset } from "../utils/presetSharing/types";
import * as presetSharing from "../utils/presetSharing";

// Mock the URL parsing utilities
vi.mock("../utils/presetSharing", () => ({
  extractPresetFromUrl: vi.fn(),
}));

// Mock window.location
const mockLocation = {
  search: "",
  pathname: "/test",
  href: "http://localhost:3000/test",
};

Object.defineProperty(window, "location", {
  value: mockLocation,
  writable: true,
});

describe("usePresetFromUrl", () => {
  const mockPreset: FilterPreset = {
    id: "preset-123",
    name: "Test Preset",
    gridState: {
      filters: {
        status: { type: "equals", value: "active" },
      },
    },
    createdAt: "2024-01-01T10:00:00Z",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockLocation.search = "";
  });

  it("should return null when no preset in URL", () => {
    const { extractPresetFromUrl } = vi.mocked(presetSharing);
    extractPresetFromUrl.mockReturnValue({ compressed: false });

    const { result } = renderHook(() => usePresetFromUrl());

    expect(result.current.preset).toBeNull();
    expect(result.current.presetId).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should extract embedded preset from URL", async () => {
    const { extractPresetFromUrl } = vi.mocked(presetSharing);
    extractPresetFromUrl.mockReturnValue({
      preset: mockPreset,
      compressed: true,
    });

    mockLocation.search = "?preset=compressed123";

    const { result } = renderHook(() => usePresetFromUrl());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.preset).toEqual(mockPreset);
    expect(result.current.presetId).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("should extract preset ID from URL", async () => {
    const { extractPresetFromUrl } = vi.mocked(presetSharing);
    extractPresetFromUrl.mockReturnValue({
      presetId: "preset-123",
      compressed: false,
    });

    mockLocation.search = "?presetId=preset-123";

    const { result } = renderHook(() => usePresetFromUrl());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.preset).toBeNull();
    expect(result.current.presetId).toBe("preset-123");
    expect(result.current.error).toBeNull();
  });

  it("should handle parse errors", async () => {
    const { extractPresetFromUrl } = vi.mocked(presetSharing);
    extractPresetFromUrl.mockReturnValue({
      compressed: false,
      error: "Failed to parse preset data",
    });

    mockLocation.search = "?preset=invalid";

    const { result } = renderHook(() => usePresetFromUrl());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.preset).toBeNull();
    expect(result.current.presetId).toBeNull();
    expect(result.current.error).toBe("Failed to parse preset data");
  });

  it("should re-parse when URL changes", async () => {
    const { extractPresetFromUrl } = vi.mocked(presetSharing);
    extractPresetFromUrl.mockReturnValue({ compressed: false });

    const { result } = renderHook(() => usePresetFromUrl());

    expect(result.current.preset).toBeNull();

    // Update URL and mock
    mockLocation.search = "?preset=newdata";
    extractPresetFromUrl.mockReturnValue({
      preset: mockPreset,
      compressed: true,
    });

    // Trigger popstate event to simulate URL change
    window.dispatchEvent(new PopStateEvent("popstate"));

    await waitFor(() => {
      expect(result.current.preset).toEqual(mockPreset);
    });
  });

  it("should provide a method to clear the preset", async () => {
    const { extractPresetFromUrl } = vi.mocked(presetSharing);
    extractPresetFromUrl.mockReturnValue({
      preset: mockPreset,
      compressed: true,
    });

    mockLocation.search = "?preset=compressed123";

    const { result } = renderHook(() => usePresetFromUrl());

    await waitFor(() => {
      expect(result.current.preset).toEqual(mockPreset);
    });

    // Clear the preset
    result.current.clearPreset();

    await waitFor(() => {
      expect(result.current.preset).toBeNull();
      expect(result.current.presetId).toBeNull();
    });
  });

  it("should optionally load preset data for ID", async () => {
    const { extractPresetFromUrl } = vi.mocked(presetSharing);
    extractPresetFromUrl.mockReturnValue({
      presetId: "preset-123",
      compressed: false,
    });

    const mockLoadPreset = vi.fn().mockResolvedValue(mockPreset);

    mockLocation.search = "?presetId=preset-123";

    const { result } = renderHook(() =>
      usePresetFromUrl({ loadPresetById: mockLoadPreset }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockLoadPreset).toHaveBeenCalledWith("preset-123");
    expect(result.current.preset).toEqual(mockPreset);
    expect(result.current.presetId).toBe("preset-123");
  });

  it("should handle preset loading errors", async () => {
    const { extractPresetFromUrl } = vi.mocked(presetSharing);
    extractPresetFromUrl.mockReturnValue({
      presetId: "preset-123",
      compressed: false,
    });

    const mockLoadPreset = vi
      .fn()
      .mockRejectedValue(new Error("Preset not found"));

    mockLocation.search = "?presetId=preset-123";

    const { result } = renderHook(() =>
      usePresetFromUrl({ loadPresetById: mockLoadPreset }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.preset).toBeNull();
    expect(result.current.error).toBe(
      "Failed to load preset: Preset not found",
    );
  });

  it("should not load preset if autoLoad is false", async () => {
    const { extractPresetFromUrl } = vi.mocked(presetSharing);
    extractPresetFromUrl.mockReturnValue({
      presetId: "preset-123",
      compressed: false,
    });

    const mockLoadPreset = vi.fn();

    mockLocation.search = "?presetId=preset-123";

    const { result } = renderHook(() =>
      usePresetFromUrl({
        loadPresetById: mockLoadPreset,
        autoLoad: false,
      }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockLoadPreset).not.toHaveBeenCalled();
    expect(result.current.preset).toBeNull();
    expect(result.current.presetId).toBe("preset-123");
  });

  it("should provide manual load method", async () => {
    const { extractPresetFromUrl } = vi.mocked(presetSharing);
    extractPresetFromUrl.mockReturnValue({
      presetId: "preset-123",
      compressed: false,
    });

    const mockLoadPreset = vi.fn().mockResolvedValue(mockPreset);

    mockLocation.search = "?presetId=preset-123";

    const { result } = renderHook(() =>
      usePresetFromUrl({
        loadPresetById: mockLoadPreset,
        autoLoad: false,
      }),
    );

    expect(mockLoadPreset).not.toHaveBeenCalled();

    // Manually load
    await result.current.loadPreset();

    await waitFor(() => {
      expect(mockLoadPreset).toHaveBeenCalledWith("preset-123");
      expect(result.current.preset).toEqual(mockPreset);
    });
  });

  it("should handle popstate events", async () => {
    const { extractPresetFromUrl } = vi.mocked(presetSharing);
    extractPresetFromUrl.mockReturnValue({ compressed: false });

    const { result } = renderHook(() => usePresetFromUrl());

    expect(result.current.preset).toBeNull();

    // Simulate URL change via popstate
    mockLocation.search = "?preset=newdata";
    extractPresetFromUrl.mockReturnValue({
      preset: mockPreset,
      compressed: true,
    });

    window.dispatchEvent(new PopStateEvent("popstate"));

    await waitFor(() => {
      expect(result.current.preset).toEqual(mockPreset);
    });
  });
});
