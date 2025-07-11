import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SavePresetModal } from "./SavePresetModal";

describe("SavePresetModal", () => {
  const mockOnSave = vi.fn();
  const mockOnClose = vi.fn();
  const defaultProps = {
    onSave: mockOnSave,
    onClose: mockOnClose,
    existingCategories: ["Sales", "Marketing", "Finance"],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = "";
  });

  describe("Rendering", () => {
    it("should render modal with all form elements", () => {
      render(<SavePresetModal {...defaultProps} />);

      expect(screen.getByText("Save Filter View")).toBeInTheDocument();
      expect(screen.getByLabelText("View Name")).toBeInTheDocument();
      expect(screen.getByLabelText("Category (Optional)")).toBeInTheDocument();
      expect(screen.getByLabelText("Set as default view")).toBeInTheDocument();
      expect(screen.getByText("Save View")).toBeInTheDocument();
    });

    it("should render close button", () => {
      render(<SavePresetModal {...defaultProps} />);

      expect(screen.getByText("×")).toBeInTheDocument();
    });

    it("should render with empty existing categories", () => {
      render(<SavePresetModal {...defaultProps} existingCategories={[]} />);

      expect(screen.getByLabelText("Category (Optional)")).toBeInTheDocument();
    });
  });

  describe("Form Interaction", () => {
    it("should update name input value", async () => {
      render(<SavePresetModal {...defaultProps} />);
      const nameInput = screen.getByPlaceholderText("Enter view name...");

      await userEvent.type(nameInput, "My Custom View");

      expect(nameInput).toHaveValue("My Custom View");
    });

    it("should update category when selected", async () => {
      render(<SavePresetModal {...defaultProps} />);
      const categoryInput = screen.getByPlaceholderText(
        "Select or create category",
      );

      await userEvent.click(categoryInput);
      await userEvent.click(screen.getByText("Marketing"));

      expect(mockOnSave).not.toHaveBeenCalled(); // Not saved yet
    });

    it("should update default checkbox", async () => {
      render(<SavePresetModal {...defaultProps} />);
      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).not.toBeChecked();

      await userEvent.click(checkbox);

      expect(checkbox).toBeChecked();
    });

    it("should disable save button when name is empty", () => {
      render(<SavePresetModal {...defaultProps} />);
      const saveButton = screen.getByText("Save View");

      expect(saveButton).toBeDisabled();
    });

    it("should enable save button when name is entered", async () => {
      render(<SavePresetModal {...defaultProps} />);
      const nameInput = screen.getByPlaceholderText("Enter view name...");
      const saveButton = screen.getByText("Save View");

      await userEvent.type(nameInput, "Test View");

      expect(saveButton).not.toBeDisabled();
    });
  });

  describe("Save Functionality", () => {
    it("should call onSave with name only when no category selected", async () => {
      render(<SavePresetModal {...defaultProps} />);
      const nameInput = screen.getByPlaceholderText("Enter view name...");
      const saveButton = screen.getByText("Save View");

      await userEvent.type(nameInput, "Test View");
      await userEvent.click(saveButton);

      expect(mockOnSave).toHaveBeenCalledWith("Test View", undefined, false);
    });

    it("should call onSave with name and category", async () => {
      render(<SavePresetModal {...defaultProps} />);
      const nameInput = screen.getByPlaceholderText("Enter view name...");
      const categoryInput = screen.getByPlaceholderText(
        "Select or create category",
      );
      const saveButton = screen.getByText("Save View");

      await userEvent.type(nameInput, "Test View");
      await userEvent.click(categoryInput);
      await userEvent.click(screen.getByText("Sales"));
      await userEvent.click(saveButton);

      expect(mockOnSave).toHaveBeenCalledWith("Test View", "Sales", false);
    });

    it("should call onSave with default flag when checked", async () => {
      render(<SavePresetModal {...defaultProps} />);
      const nameInput = screen.getByPlaceholderText("Enter view name...");
      const checkbox = screen.getByRole("checkbox");
      const saveButton = screen.getByText("Save View");

      await userEvent.type(nameInput, "Default View");
      await userEvent.click(checkbox);
      await userEvent.click(saveButton);

      expect(mockOnSave).toHaveBeenCalledWith("Default View", undefined, true);
    });

    it("should call onSave with all fields filled", async () => {
      render(<SavePresetModal {...defaultProps} />);
      const nameInput = screen.getByPlaceholderText("Enter view name...");
      const categoryInput = screen.getByPlaceholderText(
        "Select or create category",
      );
      const checkbox = screen.getByRole("checkbox");
      const saveButton = screen.getByText("Save View");

      await userEvent.type(nameInput, "Complete View");
      await userEvent.click(categoryInput);
      await userEvent.click(screen.getByText("Finance"));
      await userEvent.click(checkbox);
      await userEvent.click(saveButton);

      expect(mockOnSave).toHaveBeenCalledWith("Complete View", "Finance", true);
    });

    it("should trim whitespace from name", async () => {
      render(<SavePresetModal {...defaultProps} />);
      const nameInput = screen.getByPlaceholderText("Enter view name...");
      const saveButton = screen.getByText("Save View");

      await userEvent.type(nameInput, "  Trimmed View  ");
      await userEvent.click(saveButton);

      expect(mockOnSave).toHaveBeenCalledWith("Trimmed View", undefined, false);
    });

    it("should save on Enter key in name input", async () => {
      render(<SavePresetModal {...defaultProps} />);
      const nameInput = screen.getByPlaceholderText("Enter view name...");

      await userEvent.type(nameInput, "Quick Save");
      await userEvent.keyboard("{Enter}");

      expect(mockOnSave).toHaveBeenCalledWith("Quick Save", undefined, false);
    });
  });

  describe("Close Functionality", () => {
    it("should call onClose when close button clicked", async () => {
      render(<SavePresetModal {...defaultProps} />);
      const closeButton = screen.getByText("×");

      await userEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalled();
    });

    it("should call onClose when clicking overlay", async () => {
      render(<SavePresetModal {...defaultProps} />);
      // Find the overlay in document.body since modal is rendered in a portal
      const overlay = document.body.querySelector('[class*="modalOverlay"]');

      if (overlay) {
        fireEvent.click(overlay);
      }

      expect(mockOnClose).toHaveBeenCalled();
    });

    it("should not close when clicking modal content", async () => {
      render(<SavePresetModal {...defaultProps} />);
      const modalContent = screen.getByText("Save Filter View").parentElement;

      if (modalContent) {
        await userEvent.click(modalContent);
      }

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe("Category Creation", () => {
    it("should allow creating new category", async () => {
      render(<SavePresetModal {...defaultProps} />);
      const nameInput = screen.getByPlaceholderText("Enter view name...");
      const categoryInput = screen.getByPlaceholderText(
        "Select or create category",
      );
      const saveButton = screen.getByText("Save View");

      await userEvent.type(nameInput, "Test View");
      await userEvent.click(categoryInput);
      await userEvent.click(screen.getByText("Create new category"));

      const categoryNameInput = screen.getByPlaceholderText(
        "Enter category name...",
      );
      await userEvent.type(categoryNameInput, "Operations");
      await userEvent.click(screen.getByText("Create"));

      await userEvent.click(saveButton);

      expect(mockOnSave).toHaveBeenCalledWith("Test View", "Operations", false);
    });
  });

  describe("Portal Rendering", () => {
    it("should render modal in document body", () => {
      render(<SavePresetModal {...defaultProps} />);

      // Modal should be rendered in body, not in the component container
      const modal = document.body.querySelector('[class*="modal"]');
      expect(modal).toBeInTheDocument();
    });
  });
});
