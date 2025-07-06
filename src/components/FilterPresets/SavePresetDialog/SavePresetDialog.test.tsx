import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SavePresetDialog } from "./index";
import type { SavePresetDialogProps, SavePresetFormData } from "../types";

const mockFilterModel = {
  date: { type: "after", mode: "relative", expressionFrom: "Today-7d" },
  status: { type: "equals", value: "active" },
};

describe("SavePresetDialog", () => {
  const defaultProps: SavePresetDialogProps = {
    isOpen: true,
    onClose: vi.fn(),
    onSave: vi.fn(),
    existingNames: ["Existing Preset", "Another Preset"],
    currentFilterModel: mockFilterModel,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render dialog when open", () => {
      render(<SavePresetDialog {...defaultProps} />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Save Filter Preset")).toBeInTheDocument();
    });

    it("should not render dialog when closed", () => {
      render(<SavePresetDialog {...defaultProps} isOpen={false} />);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should render all form fields", () => {
      render(<SavePresetDialog {...defaultProps} />);

      expect(screen.getByLabelText("Name")).toBeInTheDocument();
      expect(screen.getByLabelText("Description")).toBeInTheDocument();
      expect(screen.getByLabelText("Tags")).toBeInTheDocument();
      expect(
        screen.getByLabelText("Set as default preset"),
      ).toBeInTheDocument();
    });

    it("should render storage info when provided", () => {
      const storageInfo = { used: 80, total: 100, percentage: 80 };
      render(<SavePresetDialog {...defaultProps} storageInfo={storageInfo} />);

      expect(
        screen.getByText("Storage: 80% used (80/100 KB)"),
      ).toBeInTheDocument();
      expect(screen.getByRole("progressbar")).toHaveAttribute(
        "aria-valuenow",
        "80",
      );
    });

    it("should show storage warning when near limit", () => {
      const storageInfo = { used: 95, total: 100, percentage: 95 };
      render(<SavePresetDialog {...defaultProps} storageInfo={storageInfo} />);

      expect(screen.getByText(/Storage almost full/i)).toBeInTheDocument();
    });
  });

  describe("Form Validation", () => {
    it("should disable save button when name is empty", () => {
      render(<SavePresetDialog {...defaultProps} />);

      const saveButton = screen.getByRole("button", { name: "Save" });
      expect(saveButton).toBeDisabled();
    });

    it("should enable save button when name is provided", async () => {
      const user = userEvent.setup();
      render(<SavePresetDialog {...defaultProps} />);

      const nameInput = screen.getByLabelText("Name");
      await user.type(nameInput, "My New Preset");

      const saveButton = screen.getByRole("button", { name: "Save" });
      expect(saveButton).not.toBeDisabled();
    });

    it("should show error for duplicate name", async () => {
      const user = userEvent.setup();
      render(<SavePresetDialog {...defaultProps} />);

      const nameInput = screen.getByLabelText("Name");
      await user.type(nameInput, "Existing Preset");

      await waitFor(() => {
        expect(
          screen.getByText("A preset with this name already exists"),
        ).toBeInTheDocument();
      });

      const saveButton = screen.getByRole("button", { name: "Save" });
      expect(saveButton).toBeDisabled();
    });

    it("should validate tags format", async () => {
      const user = userEvent.setup();
      render(<SavePresetDialog {...defaultProps} />);

      const tagsInput = screen.getByLabelText("Tags");
      await user.type(tagsInput, "tag1, tag-2, tag_3");

      expect(screen.queryByText(/Invalid tag format/)).not.toBeInTheDocument();
    });

    it("should show error for invalid tag characters", async () => {
      const user = userEvent.setup();
      render(<SavePresetDialog {...defaultProps} />);

      const tagsInput = screen.getByLabelText("Tags");
      await user.type(tagsInput, "tag1, tag@2, tag#3");

      await waitFor(() => {
        expect(screen.getByText(/Tags can only contain/i)).toBeInTheDocument();
      });
    });
  });

  describe("Form Interaction", () => {
    it("should update form fields", async () => {
      const user = userEvent.setup();
      render(<SavePresetDialog {...defaultProps} />);

      const nameInput = screen.getByLabelText("Name") as HTMLInputElement;
      const descInput = screen.getByLabelText(
        "Description",
      ) as HTMLTextAreaElement;
      const tagsInput = screen.getByLabelText("Tags") as HTMLInputElement;
      const defaultCheckbox = screen.getByLabelText(
        "Set as default preset",
      ) as HTMLInputElement;

      await user.type(nameInput, "Test Preset");
      await user.type(descInput, "Test description");
      await user.type(tagsInput, "test, demo");
      await user.click(defaultCheckbox);

      expect(nameInput.value).toBe("Test Preset");
      expect(descInput.value).toBe("Test description");
      expect(tagsInput.value).toBe("test, demo");
      expect(defaultCheckbox.checked).toBe(true);
    });

    it("should trim whitespace from inputs", async () => {
      const user = userEvent.setup();
      const onSave = vi.fn();
      render(<SavePresetDialog {...defaultProps} onSave={onSave} />);

      await user.type(screen.getByLabelText("Name"), "  Test Preset  ");
      await user.type(screen.getByLabelText("Tags"), " tag1 , tag2 , tag3 ");
      await user.click(screen.getByRole("button", { name: "Save" }));

      expect(onSave).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Test Preset",
          tags: ["tag1", "tag2", "tag3"],
        }),
      );
    });
  });

  describe("Save Functionality", () => {
    it("should call onSave with correct data", async () => {
      const user = userEvent.setup();
      const onSave = vi.fn();
      render(<SavePresetDialog {...defaultProps} onSave={onSave} />);

      await user.type(screen.getByLabelText("Name"), "My Preset");
      await user.type(screen.getByLabelText("Description"), "My description");
      await user.type(screen.getByLabelText("Tags"), "tag1, tag2");
      await user.click(screen.getByLabelText("Set as default preset"));

      await user.click(screen.getByRole("button", { name: "Save" }));

      expect(onSave).toHaveBeenCalledWith({
        name: "My Preset",
        description: "My description",
        tags: ["tag1", "tag2"],
        isDefault: true,
        filterModel: mockFilterModel,
      });
    });

    it("should close dialog after successful save", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<SavePresetDialog {...defaultProps} onClose={onClose} />);

      await user.type(screen.getByLabelText("Name"), "My Preset");
      await user.click(screen.getByRole("button", { name: "Save" }));

      expect(onClose).toHaveBeenCalled();
    });

    it("should reset form after save", async () => {
      const user = userEvent.setup();
      const { rerender } = render(<SavePresetDialog {...defaultProps} />);

      await user.type(screen.getByLabelText("Name"), "My Preset");
      await user.click(screen.getByRole("button", { name: "Save" }));

      // Reopen dialog
      rerender(<SavePresetDialog {...defaultProps} isOpen={false} />);
      rerender(<SavePresetDialog {...defaultProps} isOpen={true} />);

      const nameInput = screen.getByLabelText("Name") as HTMLInputElement;
      expect(nameInput.value).toBe("");
    });
  });

  describe("Cancel Functionality", () => {
    it("should call onClose when cancel is clicked", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<SavePresetDialog {...defaultProps} onClose={onClose} />);

      await user.click(screen.getByRole("button", { name: "Cancel" }));
      expect(onClose).toHaveBeenCalled();
    });

    it("should reset form when cancelled", async () => {
      const user = userEvent.setup();
      const { rerender } = render(<SavePresetDialog {...defaultProps} />);

      await user.type(screen.getByLabelText("Name"), "My Preset");
      await user.click(screen.getByRole("button", { name: "Cancel" }));

      // Reopen dialog
      rerender(<SavePresetDialog {...defaultProps} isOpen={false} />);
      rerender(<SavePresetDialog {...defaultProps} isOpen={true} />);

      const nameInput = screen.getByLabelText("Name") as HTMLInputElement;
      expect(nameInput.value).toBe("");
    });
  });

  describe("Keyboard Interaction", () => {
    it("should close on Escape key", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<SavePresetDialog {...defaultProps} onClose={onClose} />);

      await user.keyboard("{Escape}");
      expect(onClose).toHaveBeenCalled();
    });

    it("should submit form on Enter in name field", async () => {
      const user = userEvent.setup();
      const onSave = vi.fn();
      render(<SavePresetDialog {...defaultProps} onSave={onSave} />);

      const nameInput = screen.getByLabelText("Name");
      await user.type(nameInput, "My Preset{Enter}");

      expect(onSave).toHaveBeenCalled();
    });

    it("should not submit on Enter in textarea", async () => {
      const user = userEvent.setup();
      const onSave = vi.fn();
      render(<SavePresetDialog {...defaultProps} onSave={onSave} />);

      await user.type(screen.getByLabelText("Name"), "My Preset");
      await user.type(
        screen.getByLabelText("Description"),
        "Line 1{Enter}Line 2",
      );

      expect(onSave).not.toHaveBeenCalled();
      const textarea = screen.getByLabelText(
        "Description",
      ) as HTMLTextAreaElement;
      expect(textarea.value).toContain("Line 1\nLine 2");
    });
  });

  describe("Custom Render Content", () => {
    it("should render custom content when renderContent provided", () => {
      const CustomContent = ({ formData, onChange, onSubmit }: any) => (
        <div data-testid="custom-content">
          <input
            value={formData.name}
            onChange={(e) => onChange({ name: e.target.value })}
            data-testid="custom-name"
          />
          <button onClick={onSubmit}>Custom Save</button>
        </div>
      );

      render(
        <SavePresetDialog
          {...defaultProps}
          renderContent={(props) => <CustomContent {...props} />}
        />,
      );

      expect(screen.getByTestId("custom-content")).toBeInTheDocument();
      expect(screen.getByTestId("custom-name")).toBeInTheDocument();
      expect(screen.getByText("Custom Save")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(<SavePresetDialog {...defaultProps} />);

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-labelledby");
      expect(dialog).toHaveAttribute("aria-modal", "true");

      const nameInput = screen.getByLabelText("Name");
      expect(nameInput).toHaveAttribute("aria-required", "true");
      expect(nameInput).toHaveAttribute("aria-invalid", "false");
    });

    it("should mark invalid fields with aria-invalid", async () => {
      const user = userEvent.setup();
      render(<SavePresetDialog {...defaultProps} />);

      const nameInput = screen.getByLabelText("Name");
      await user.type(nameInput, "Existing Preset");

      await waitFor(() => {
        expect(nameInput).toHaveAttribute("aria-invalid", "true");
        expect(nameInput).toHaveAttribute("aria-describedby");
      });
    });

    it("should focus name input when opened", async () => {
      render(<SavePresetDialog {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByLabelText("Name")).toHaveFocus();
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty existingNames array", () => {
      render(<SavePresetDialog {...defaultProps} existingNames={[]} />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("should handle undefined currentFilterModel", async () => {
      const user = userEvent.setup();
      const onSave = vi.fn();
      render(
        <SavePresetDialog
          {...defaultProps}
          currentFilterModel={undefined}
          onSave={onSave}
        />,
      );

      await user.type(screen.getByLabelText("Name"), "Test");
      await user.click(screen.getByRole("button", { name: "Save" }));

      expect(onSave).toHaveBeenCalledWith(
        expect.objectContaining({
          filterModel: {},
        }),
      );
    });

    it("should handle rapid open/close", async () => {
      const { rerender } = render(<SavePresetDialog {...defaultProps} />);

      rerender(<SavePresetDialog {...defaultProps} isOpen={false} />);
      rerender(<SavePresetDialog {...defaultProps} isOpen={true} />);
      rerender(<SavePresetDialog {...defaultProps} isOpen={false} />);
      rerender(<SavePresetDialog {...defaultProps} isOpen={true} />);

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });
});
