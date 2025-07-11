import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PresetManager } from "./index";
import type { FilterPreset, PresetManagerProps } from "../types";

const mockPresets: FilterPreset[] = [
  {
    id: "system-1",
    name: "Default View",
    description: "Standard filter configuration",
    filterModel: {},
    isSystem: true,
    isDefault: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "system-2",
    name: "Recent Items",
    description: "Shows items from last 30 days",
    filterModel: {
      date: { type: "after", mode: "relative", expressionFrom: "Today-30d" },
    },
    isSystem: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "user-1",
    name: "My Custom Filter",
    description: "Personal filter setup",
    tags: ["custom", "personal"],
    filterModel: {
      status: { type: "equals", value: "active" },
    },
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-15"),
  },
  {
    id: "user-2",
    name: "Team Dashboard",
    filterModel: {
      team: { type: "contains", value: "engineering" },
    },
    tags: ["team"],
    createdAt: new Date("2023-07-01"),
    updatedAt: new Date("2023-07-01"),
  },
];

describe("PresetManager", () => {
  const defaultProps: PresetManagerProps = {
    presets: mockPresets,
    activePresetId: undefined,
    onSetDefault: vi.fn(),
    onEdit: vi.fn(),
    onDelete: vi.fn(),
    onExport: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render all presets", () => {
      render(<PresetManager {...defaultProps} />);

      mockPresets.forEach((preset) => {
        expect(screen.getByText(preset.name)).toBeInTheDocument();
      });
    });

    it("should display preset descriptions", () => {
      render(<PresetManager {...defaultProps} />);

      expect(
        screen.getByText("Standard filter configuration"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Shows items from last 30 days"),
      ).toBeInTheDocument();
      expect(screen.getByText("Personal filter setup")).toBeInTheDocument();
    });

    it("should display preset tags", () => {
      render(<PresetManager {...defaultProps} />);

      expect(screen.getByText("custom")).toBeInTheDocument();
      expect(screen.getByText("personal")).toBeInTheDocument();
      expect(screen.getByText("team")).toBeInTheDocument();
    });

    it("should show system preset indicator", () => {
      render(<PresetManager {...defaultProps} />);

      const systemPresets = screen.getAllByText("System");
      expect(systemPresets).toHaveLength(2);
    });

    it("should show default preset indicator", () => {
      render(<PresetManager {...defaultProps} />);

      const defaultBadge = screen.getByText("Default");
      expect(defaultBadge).toBeInTheDocument();
    });

    it("should show active preset indicator", () => {
      render(<PresetManager {...defaultProps} activePresetId="user-1" />);

      const activeItem = screen
        .getByText("My Custom Filter")
        .closest('[role="listitem"]');
      expect(activeItem).toHaveAttribute("data-active", "true");
    });

    it("should display dates in readable format", () => {
      render(<PresetManager {...defaultProps} />);

      // Check for formatted dates (exact format depends on locale)
      const createdDates = screen.getAllByText(/Created.*2023/);
      const updatedDates = screen.getAllByText(/Updated.*2023/);

      expect(createdDates.length).toBeGreaterThan(0);
      expect(updatedDates.length).toBeGreaterThan(0);
    });
  });

  describe("Selection", () => {
    it("should allow selecting presets with checkboxes", async () => {
      const user = userEvent.setup();
      render(<PresetManager {...defaultProps} />);

      // Find the checkbox for "My Custom Filter" which is a user preset
      const checkboxes = screen.getAllByRole("checkbox");
      const userCheckbox = checkboxes.find(
        (cb) => cb.getAttribute("aria-label") === "Select My Custom Filter",
      );

      expect(userCheckbox).toBeDefined();
      await user.click(userCheckbox!);

      expect(userCheckbox).toBeChecked();
    });

    it("should allow selecting multiple presets", async () => {
      const user = userEvent.setup();
      render(<PresetManager {...defaultProps} />);

      const userCheckbox1 = screen.getByLabelText("Select My Custom Filter");
      const userCheckbox2 = screen.getByLabelText("Select Team Dashboard");

      await user.click(userCheckbox1);
      await user.click(userCheckbox2);

      expect(userCheckbox1).toBeChecked();
      expect(userCheckbox2).toBeChecked();
    });

    it("should not allow selecting system presets for deletion", () => {
      render(<PresetManager {...defaultProps} />);

      const systemCheckbox1 = screen.getByLabelText("Select Default View");
      const systemCheckbox2 = screen.getByLabelText("Select Recent Items");

      expect(systemCheckbox1).toBeDisabled();
      expect(systemCheckbox2).toBeDisabled();
    });

    it("should have select all functionality for user presets", async () => {
      const user = userEvent.setup();
      render(<PresetManager {...defaultProps} />);

      const selectAllCheckbox = screen.getByLabelText(
        "Select all user presets",
      );
      await user.click(selectAllCheckbox);

      const userCheckbox1 = screen.getByLabelText("Select My Custom Filter");
      const userCheckbox2 = screen.getByLabelText("Select Team Dashboard");

      expect(userCheckbox1).toBeChecked();
      expect(userCheckbox2).toBeChecked();
    });
  });

  describe("Actions", () => {
    it("should call onSetDefault when set default is clicked", async () => {
      const user = userEvent.setup();
      const onSetDefault = vi.fn();
      render(<PresetManager {...defaultProps} onSetDefault={onSetDefault} />);

      const userPresetItem = screen
        .getByText("My Custom Filter")
        .closest('[role="listitem"]');
      const setDefaultButton = within(
        userPresetItem as HTMLElement,
      ).getByLabelText("Set as default");

      await user.click(setDefaultButton);
      expect(onSetDefault).toHaveBeenCalledWith("user-1");
    });

    it("should call onSetDefault with null to unset default", async () => {
      const user = userEvent.setup();
      const onSetDefault = vi.fn();
      // Make a user preset the default one
      const presetsWithUserDefault = mockPresets.map((p) => ({
        ...p,
        isDefault: p.id === "user-1",
      }));
      render(
        <PresetManager
          {...defaultProps}
          presets={presetsWithUserDefault}
          onSetDefault={onSetDefault}
        />,
      );

      const defaultPresetItem = screen
        .getByText("My Custom Filter")
        .closest('[role="listitem"]');
      const defaultButton = within(
        defaultPresetItem as HTMLElement,
      ).getByLabelText("Remove as default");

      await user.click(defaultButton);
      expect(onSetDefault).toHaveBeenCalledWith(null);
    });

    it("should call onEdit when edit is clicked on user preset", async () => {
      const user = userEvent.setup();
      const onEdit = vi.fn();
      render(<PresetManager {...defaultProps} onEdit={onEdit} />);

      const userPresetItem = screen
        .getByText("My Custom Filter")
        .closest('[role="listitem"]');
      const editButton = within(userPresetItem as HTMLElement).getByLabelText(
        "Edit preset",
      );

      await user.click(editButton);
      expect(onEdit).toHaveBeenCalledWith(mockPresets[2]);
    });

    it("should not show edit button for system presets", () => {
      render(<PresetManager {...defaultProps} />);

      const systemPresetItem = screen
        .getByText("Default View")
        .closest('[role="listitem"]');
      const editButton = within(
        systemPresetItem as HTMLElement,
      ).queryByLabelText("Edit preset");

      expect(editButton).not.toBeInTheDocument();
    });

    it("should call onDelete with selected preset ids", async () => {
      const user = userEvent.setup();
      const onDelete = vi.fn();
      render(<PresetManager {...defaultProps} onDelete={onDelete} />);

      // Select user presets
      const userCheckbox1 = screen.getByLabelText("Select My Custom Filter");
      const userCheckbox2 = screen.getByLabelText("Select Team Dashboard");
      await user.click(userCheckbox1);
      await user.click(userCheckbox2);

      const deleteButton = screen.getByText("Delete Selected");
      await user.click(deleteButton);

      expect(onDelete).toHaveBeenCalledWith(["user-1", "user-2"]);
    });

    it("should disable delete button when no presets selected", () => {
      render(<PresetManager {...defaultProps} />);

      const deleteButton = screen.getByText("Delete Selected");
      expect(deleteButton).toBeDisabled();
    });

    it("should call onExport when export is clicked on individual preset", async () => {
      const user = userEvent.setup();
      const onExport = vi.fn();
      render(<PresetManager {...defaultProps} onExport={onExport} />);

      const userPresetItem = screen
        .getByText("My Custom Filter")
        .closest('[role="listitem"]');
      const exportButton = within(userPresetItem as HTMLElement).getByLabelText(
        "Export preset",
      );

      await user.click(exportButton);
      expect(onExport).toHaveBeenCalledWith(["user-1"]);
    });

    it("should call onExport with selected preset ids for bulk export", async () => {
      const user = userEvent.setup();
      const onExport = vi.fn();
      render(<PresetManager {...defaultProps} onExport={onExport} />);

      // Select preset
      const userCheckbox = screen.getByLabelText("Select My Custom Filter");
      await user.click(userCheckbox);

      const exportButton = screen.getByText("Export Selected");
      await user.click(exportButton);

      expect(onExport).toHaveBeenCalledWith(["user-1"]);
    });
  });

  describe("Custom Rendering", () => {
    it("should use custom preset item renderer when provided", () => {
      const CustomItem = ({ preset }: any) => (
        <div data-testid={`custom-${preset.id}`}>Custom: {preset.name}</div>
      );

      render(
        <PresetManager
          {...defaultProps}
          renderPresetItem={(props) => <CustomItem {...props} />}
        />,
      );

      expect(screen.getByTestId("custom-user-1")).toHaveTextContent(
        "Custom: My Custom Filter",
      );
    });
  });

  describe("Import Functionality", () => {
    it("should show import button when onImport is provided", () => {
      const onImport = vi.fn();
      render(<PresetManager {...defaultProps} onImport={onImport} />);

      expect(screen.getByText("Import Presets")).toBeInTheDocument();
    });

    it("should not show import button when onImport is not provided", () => {
      render(<PresetManager {...defaultProps} />);

      expect(screen.queryByText("Import Presets")).not.toBeInTheDocument();
    });

    it("should trigger file input when import is clicked", async () => {
      const user = userEvent.setup();
      const onImport = vi.fn();
      render(<PresetManager {...defaultProps} onImport={onImport} />);

      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "application/json";

      const importButton = screen.getByText("Import Presets");

      // Mock file input click
      vi.spyOn(document, "createElement").mockReturnValueOnce(fileInput);
      vi.spyOn(fileInput, "click");

      await user.click(importButton);

      expect(fileInput.click).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(<PresetManager {...defaultProps} />);

      const list = screen.getByRole("list");
      expect(list).toHaveAttribute("aria-label", "Filter presets");

      const listItems = screen.getAllByRole("listitem");
      listItems.forEach((item) => {
        expect(item).toHaveAttribute("aria-label");
      });
    });

    it("should have proper checkbox labels", () => {
      render(<PresetManager {...defaultProps} />);

      const checkboxes = screen.getAllByRole("checkbox");
      checkboxes.forEach((checkbox, index) => {
        if (index === 0) {
          expect(checkbox).toHaveAttribute(
            "aria-label",
            "Select all user presets",
          );
        } else {
          expect(checkbox).toHaveAttribute("aria-label");
        }
      });
    });

    it("should announce selection state", async () => {
      const user = userEvent.setup();
      render(<PresetManager {...defaultProps} />);

      const checkbox = screen.getByLabelText("Select My Custom Filter");
      expect(checkbox).toHaveAttribute("aria-checked", "false");

      await user.click(checkbox);
      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });
  });

  describe("Empty State", () => {
    it("should show empty state when no presets", () => {
      render(<PresetManager {...defaultProps} presets={[]} />);

      expect(
        screen.getByText("No filter presets available"),
      ).toBeInTheDocument();
    });
  });

  describe("Keyboard Navigation", () => {
    it("should handle keyboard selection with Space", async () => {
      const user = userEvent.setup();
      render(<PresetManager {...defaultProps} />);

      const checkbox = screen.getByLabelText("Select My Custom Filter");
      checkbox.focus();

      await user.keyboard(" ");
      expect(checkbox).toBeChecked();
    });

    it("should handle Enter key on action buttons", async () => {
      const user = userEvent.setup();
      const onEdit = vi.fn();
      render(<PresetManager {...defaultProps} onEdit={onEdit} />);

      const editButton = screen.getAllByLabelText("Edit preset")[0];
      editButton.focus();

      await user.keyboard("{Enter}");
      expect(onEdit).toHaveBeenCalled();
    });
  });
});
