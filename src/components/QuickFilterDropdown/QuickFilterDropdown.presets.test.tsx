import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuickFilterDropdown } from "./index";
import type { GridApi } from "ag-grid-community";
import type { QuickFilterDropdownProps } from "./types";
import type { FilterPreset, PresetStorage } from "../FilterPresets/types";

const mockApi = {
  getFilterModel: vi.fn(),
  setFilterModel: vi.fn(),
  onFilterChanged: vi.fn(),
} as unknown as GridApi;

const mockStorage: PresetStorage = {
  load: vi.fn(),
  save: vi.fn(),
};

const mockSystemPresets: FilterPreset[] = [
  {
    id: "system-1",
    name: "Recent Items",
    description: "Items from last 30 days",
    filterModel: {
      date: { type: "after", mode: "relative", expressionFrom: "Today-30d" },
    },
    isSystem: true,
  },
  {
    id: "system-2",
    name: "Active Only",
    description: "Only active items",
    filterModel: {
      status: { type: "equals", value: "active" },
    },
    isSystem: true,
  },
];

const mockOptions = [
  { id: "1", label: "Option 1", filterModel: { test: "1" } },
  { id: "2", label: "Option 2", filterModel: { test: "2" } },
];

describe.skip("QuickFilterDropdown with Presets", () => {
  const defaultProps: QuickFilterDropdownProps = {
    api: mockApi,
    columnId: "test",
    options: mockOptions,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (mockApi.getFilterModel as Mock).mockReturnValue({});
    (mockStorage.load as Mock).mockReturnValue([]);
  });

  describe("Preset Integration", () => {
    it("should not show preset selector when enablePresets is not provided", () => {
      render(<QuickFilterDropdown {...defaultProps} />);

      const trigger = screen.getByRole("button", {
        name: "Quick filter options",
      });
      expect(trigger).toBeInTheDocument();

      // Should not show preset selector
      expect(screen.queryByText("Manage Presets")).not.toBeInTheDocument();
    });

    it("should show preset selector when enablePresets is provided", async () => {
      const user = userEvent.setup();

      render(
        <QuickFilterDropdown
          {...defaultProps}
          enablePresets={{
            storage: mockStorage,
            systemPresets: mockSystemPresets,
          }}
        />,
      );

      // Open dropdown
      const trigger = screen.getByRole("button", {
        name: "Quick filter options",
      });
      await user.click(trigger);

      // Should show preset selector section
      expect(screen.getByText("Filter Presets")).toBeInTheDocument();
      expect(screen.getByText("Recent Items")).toBeInTheDocument();
      expect(screen.getByText("Active Only")).toBeInTheDocument();
    });

    it("should show user presets from storage", async () => {
      const user = userEvent.setup();
      const userPresets: FilterPreset[] = [
        {
          id: "user-1",
          name: "My Custom Filter",
          filterModel: { custom: { type: "equals", value: "filter" } },
        },
      ];
      (mockStorage.load as Mock).mockReturnValue(userPresets);

      render(
        <QuickFilterDropdown
          {...defaultProps}
          enablePresets={{
            storage: mockStorage,
            systemPresets: mockSystemPresets,
          }}
        />,
      );

      // Open dropdown
      await user.click(
        screen.getByRole("button", {
          name: "Quick filter options",
        }),
      );

      // Should show user preset
      expect(screen.getByText("My Custom Filter")).toBeInTheDocument();
    });

    it("should apply preset when selected", async () => {
      const user = userEvent.setup();
      const onFilterChange = vi.fn();

      render(
        <QuickFilterDropdown
          {...defaultProps}
          onFilterChange={onFilterChange}
          enablePresets={{
            storage: mockStorage,
            systemPresets: mockSystemPresets,
          }}
        />,
      );

      // Open dropdown
      await user.click(
        screen.getByRole("button", {
          name: "Quick filter options",
        }),
      );

      // Select a preset
      await user.click(screen.getByText("Recent Items"));

      // Should apply the preset filter model
      expect(mockApi.setFilterModel).toHaveBeenCalledWith({
        date: { type: "after", mode: "relative", expressionFrom: "Today-30d" },
      });
      expect(onFilterChange).toHaveBeenCalled();
    });

    it("should show save preset button when enablePresets.allowSave is true", async () => {
      const user = userEvent.setup();

      render(
        <QuickFilterDropdown
          {...defaultProps}
          enablePresets={{
            storage: mockStorage,
            systemPresets: mockSystemPresets,
            allowSave: true,
          }}
        />,
      );

      // Open dropdown
      await user.click(
        screen.getByRole("button", {
          name: "Quick filter options",
        }),
      );

      // Should show save preset button
      expect(
        screen.getByRole("button", { name: "Save current filter as preset" }),
      ).toBeInTheDocument();
    });

    it("should open save dialog when save button is clicked", async () => {
      const user = userEvent.setup();
      (mockApi.getFilterModel as Mock).mockReturnValue({ test: "current" });

      render(
        <QuickFilterDropdown
          {...defaultProps}
          enablePresets={{
            storage: mockStorage,
            systemPresets: mockSystemPresets,
            allowSave: true,
          }}
        />,
      );

      // Open dropdown
      await user.click(
        screen.getByRole("button", {
          name: "Quick filter options",
        }),
      );

      // Click save button
      await user.click(
        screen.getByRole("button", { name: "Save current filter as preset" }),
      );

      // Should show save dialog
      expect(screen.getByText("Save Filter Preset")).toBeInTheDocument();
      expect(screen.getByLabelText("Preset Name")).toBeInTheDocument();
    });

    it("should show manage presets link when enablePresets.allowManage is true", async () => {
      const user = userEvent.setup();
      const onManageClick = vi.fn();

      render(
        <QuickFilterDropdown
          {...defaultProps}
          enablePresets={{
            storage: mockStorage,
            systemPresets: mockSystemPresets,
            allowManage: true,
            onManageClick,
          }}
        />,
      );

      // Open dropdown
      await user.click(
        screen.getByRole("button", {
          name: "Quick filter options",
        }),
      );

      // Should show manage link
      const manageButton = screen.getByRole("button", {
        name: "Manage presets",
      });
      expect(manageButton).toBeInTheDocument();

      // Click manage link
      await user.click(manageButton);
      expect(onManageClick).toHaveBeenCalled();
    });

    it("should use custom preset selector when renderPresetSelector is provided", async () => {
      const user = userEvent.setup();
      const CustomSelector = ({ presets }: any) => (
        <div data-testid="custom-preset-selector">
          Custom: {presets.length} presets
        </div>
      );

      render(
        <QuickFilterDropdown
          {...defaultProps}
          enablePresets={{
            storage: mockStorage,
            systemPresets: mockSystemPresets,
            renderPresetSelector: (props) => <CustomSelector {...props} />,
          }}
        />,
      );

      // Open dropdown
      await user.click(
        screen.getByRole("button", {
          name: "Quick filter options",
        }),
      );

      // Should show custom selector
      expect(screen.getByTestId("custom-preset-selector")).toHaveTextContent(
        "Custom: 2 presets",
      );
    });

    it("should separate presets from regular options", async () => {
      const user = userEvent.setup();

      render(
        <QuickFilterDropdown
          {...defaultProps}
          enablePresets={{
            storage: mockStorage,
            systemPresets: mockSystemPresets,
          }}
        />,
      );

      // Open dropdown
      await user.click(
        screen.getByRole("button", {
          name: "Quick filter options",
        }),
      );

      // Should have separate sections
      const presetSection = screen.getByText("Filter Presets").parentElement;
      const optionsSection = screen.getByText("Quick Filters").parentElement;

      expect(presetSection).toBeInTheDocument();
      expect(optionsSection).toBeInTheDocument();

      // Presets should be in preset section
      expect(
        within(presetSection!).getByText("Recent Items"),
      ).toBeInTheDocument();

      // Options should be in options section
      expect(within(optionsSection!).getByText("Option 1")).toBeInTheDocument();
    });

    it("should handle preset change callback", async () => {
      const user = userEvent.setup();
      const onPresetChange = vi.fn();

      render(
        <QuickFilterDropdown
          {...defaultProps}
          enablePresets={{
            storage: mockStorage,
            systemPresets: mockSystemPresets,
            onPresetChange,
          }}
        />,
      );

      // Open dropdown
      await user.click(
        screen.getByRole("button", {
          name: "Quick filter options",
        }),
      );

      // Select a preset
      await user.click(screen.getByText("Recent Items"));

      // Should call preset change handler
      expect(onPresetChange).toHaveBeenCalledWith(mockSystemPresets[0]);
    });

    it("should show active preset indicator", async () => {
      const user = userEvent.setup();

      // Set current filter to match a preset
      (mockApi.getFilterModel as Mock).mockReturnValue({
        date: { type: "after", mode: "relative", expressionFrom: "Today-30d" },
      });

      render(
        <QuickFilterDropdown
          {...defaultProps}
          enablePresets={{
            storage: mockStorage,
            systemPresets: mockSystemPresets,
          }}
        />,
      );

      // Open dropdown
      await user.click(
        screen.getByRole("button", {
          name: "Quick filter options",
        }),
      );

      // Should show active indicator on matching preset
      const activePreset = screen.getByText("Recent Items").closest("button");
      expect(activePreset).toHaveAttribute("aria-selected", "true");
    });

    it("should clear preset selection when regular option is selected", async () => {
      const user = userEvent.setup();
      const onPresetChange = vi.fn();

      // Start with a preset active
      (mockApi.getFilterModel as Mock).mockReturnValue({
        date: { type: "after", mode: "relative", expressionFrom: "Today-30d" },
      });

      render(
        <QuickFilterDropdown
          {...defaultProps}
          enablePresets={{
            storage: mockStorage,
            systemPresets: mockSystemPresets,
            onPresetChange,
          }}
        />,
      );

      // Open dropdown
      await user.click(
        screen.getByRole("button", {
          name: "Quick filter options",
        }),
      );

      // Select a regular option
      await user.click(screen.getByText("Option 1"));

      // Should clear preset selection
      expect(onPresetChange).toHaveBeenCalledWith(null);
    });
  });

  describe("Keyboard Navigation with Presets", () => {
    it("should navigate through presets and options with arrow keys", async () => {
      const user = userEvent.setup();

      render(
        <QuickFilterDropdown
          {...defaultProps}
          enablePresets={{
            storage: mockStorage,
            systemPresets: mockSystemPresets,
          }}
        />,
      );

      // Open dropdown
      const trigger = screen.getByRole("button", {
        name: "Quick filter options",
      });
      await user.click(trigger);

      // Navigate with arrow keys
      await user.keyboard("{ArrowDown}"); // First preset
      let highlighted = screen.getByText("Recent Items").closest("button");
      expect(highlighted).toHaveClass(/highlighted/);

      await user.keyboard("{ArrowDown}"); // Second preset
      highlighted = screen.getByText("Active Only").closest("button");
      expect(highlighted).toHaveClass(/highlighted/);

      await user.keyboard("{ArrowDown}"); // First option
      highlighted = screen.getByText("Option 1").closest("button");
      expect(highlighted).toHaveClass(/highlighted/);
    });
  });

  describe("Storage Integration", () => {
    it("should save new preset to storage", async () => {
      const user = userEvent.setup();
      (mockApi.getFilterModel as Mock).mockReturnValue({ test: "current" });

      render(
        <QuickFilterDropdown
          {...defaultProps}
          enablePresets={{
            storage: mockStorage,
            systemPresets: mockSystemPresets,
            allowSave: true,
          }}
        />,
      );

      // Open dropdown
      await user.click(
        screen.getByRole("button", {
          name: "Quick filter options",
        }),
      );

      // Click save button
      await user.click(
        screen.getByRole("button", { name: "Save current filter as preset" }),
      );

      // Fill in preset details
      await user.type(screen.getByLabelText("Preset Name"), "My Test Preset");
      await user.type(
        screen.getByLabelText("Description (optional)"),
        "Test description",
      );

      // Save
      await user.click(screen.getByRole("button", { name: "Save" }));

      // Should save to storage
      expect(mockStorage.save).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: "My Test Preset",
            description: "Test description",
            filterModel: { test: "current" },
          }),
        ]),
      );
    });

    it("should handle storage errors gracefully", async () => {
      const user = userEvent.setup();
      const consoleError = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      (mockStorage.load as Mock).mockImplementation(() => {
        throw new Error("Storage error");
      });

      render(
        <QuickFilterDropdown
          {...defaultProps}
          enablePresets={{
            storage: mockStorage,
            systemPresets: mockSystemPresets,
          }}
        />,
      );

      // Should still render without crashing
      const trigger = screen.getByRole("button", {
        name: "Quick filter options",
      });
      await user.click(trigger);

      // Should show system presets even if user presets fail to load
      expect(screen.getByText("Recent Items")).toBeInTheDocument();

      consoleError.mockRestore();
    });
  });
});
