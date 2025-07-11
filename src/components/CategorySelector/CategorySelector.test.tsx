import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CategorySelector } from "./index";

describe("CategorySelector", () => {
  const mockOnCategoryChange = vi.fn();
  const defaultProps = {
    value: "",
    onChange: mockOnCategoryChange,
    existingCategories: ["Sales", "Marketing", "Finance"],
    placeholder: "Select or create category",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render with placeholder text", () => {
      render(<CategorySelector {...defaultProps} />);
      expect(
        screen.getByPlaceholderText("Select or create category"),
      ).toBeInTheDocument();
    });

    it("should render with selected value", () => {
      render(<CategorySelector {...defaultProps} value="Sales" />);
      expect(screen.getByDisplayValue("Sales")).toBeInTheDocument();
    });

    it("should render dropdown icon", () => {
      render(<CategorySelector {...defaultProps} />);
      expect(screen.getByTestId("dropdown-icon")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(
        <CategorySelector {...defaultProps} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("Dropdown Behavior", () => {
    it("should show dropdown when input is focused", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.click(input);

      expect(screen.getByTestId("category-dropdown")).toBeInTheDocument();
      expect(screen.getByText("Sales")).toBeInTheDocument();
      expect(screen.getByText("Marketing")).toBeInTheDocument();
      expect(screen.getByText("Finance")).toBeInTheDocument();
    });

    it("should show 'Create new category' option", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.click(input);

      expect(screen.getByText("Create new category")).toBeInTheDocument();
    });

    it("should hide dropdown when clicking outside", async () => {
      const { container } = render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.click(input);
      expect(screen.getByTestId("category-dropdown")).toBeInTheDocument();

      await userEvent.click(container);
      expect(screen.queryByTestId("category-dropdown")).not.toBeInTheDocument();
    });

    it("should hide dropdown when pressing Escape", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.click(input);
      expect(screen.getByTestId("category-dropdown")).toBeInTheDocument();

      await userEvent.keyboard("{Escape}");
      expect(screen.queryByTestId("category-dropdown")).not.toBeInTheDocument();
    });
  });

  describe("Category Selection", () => {
    it("should select existing category on click", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.click(input);
      await userEvent.click(screen.getByText("Marketing"));

      expect(mockOnCategoryChange).toHaveBeenCalledWith("Marketing");
      expect(screen.queryByTestId("category-dropdown")).not.toBeInTheDocument();
    });

    it("should filter categories based on input", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.type(input, "Sal");

      expect(screen.getByText("Sales")).toBeInTheDocument();
      expect(screen.queryByText("Marketing")).not.toBeInTheDocument();
      expect(screen.queryByText("Finance")).not.toBeInTheDocument();
    });

    it("should show no categories message when filter has no matches", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.type(input, "XYZ");

      expect(screen.getByText("No matching categories")).toBeInTheDocument();
      expect(screen.getByText("Create new category")).toBeInTheDocument();
    });
  });

  describe("Create New Category", () => {
    it("should show inline input when clicking 'Create new category'", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.click(input);
      await userEvent.click(screen.getByText("Create new category"));

      expect(
        screen.getByPlaceholderText("Enter category name..."),
      ).toBeInTheDocument();
      expect(screen.getByText("Create")).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
    });

    it("should create new category on submit", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.click(input);
      await userEvent.click(screen.getByText("Create new category"));

      const createInput = screen.getByPlaceholderText("Enter category name...");
      await userEvent.type(createInput, "Operations");
      await userEvent.click(screen.getByText("Create"));

      expect(mockOnCategoryChange).toHaveBeenCalledWith("Operations");
      expect(screen.queryByTestId("category-dropdown")).not.toBeInTheDocument();
    });

    it("should create new category on Enter key", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.click(input);
      await userEvent.click(screen.getByText("Create new category"));

      const createInput = screen.getByPlaceholderText("Enter category name...");
      await userEvent.type(createInput, "Operations");
      await userEvent.keyboard("{Enter}");

      expect(mockOnCategoryChange).toHaveBeenCalledWith("Operations");
    });

    it("should cancel category creation", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.click(input);
      await userEvent.click(screen.getByText("Create new category"));
      await userEvent.click(screen.getByText("Cancel"));

      expect(
        screen.queryByPlaceholderText("Enter category name..."),
      ).not.toBeInTheDocument();
      expect(screen.getByText("Create new category")).toBeInTheDocument();
    });

    it("should trim whitespace from new category name", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.click(input);
      await userEvent.click(screen.getByText("Create new category"));

      const createInput = screen.getByPlaceholderText("Enter category name...");
      await userEvent.type(createInput, "  New Category  ");
      await userEvent.click(screen.getByText("Create"));

      expect(mockOnCategoryChange).toHaveBeenCalledWith("New Category");
    });
  });

  describe("Validation", () => {
    it("should show error for duplicate category name", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.click(input);
      await userEvent.click(screen.getByText("Create new category"));

      const createInput = screen.getByPlaceholderText("Enter category name...");
      await userEvent.type(createInput, "Sales");

      expect(screen.getByText("Category already exists")).toBeInTheDocument();
      expect(screen.getByText("Create")).toBeDisabled();
    });

    it("should show error for duplicate category name (case insensitive)", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.click(input);
      await userEvent.click(screen.getByText("Create new category"));

      const createInput = screen.getByPlaceholderText("Enter category name...");
      await userEvent.type(createInput, "sales");

      expect(screen.getByText("Category already exists")).toBeInTheDocument();
      expect(screen.getByText("Create")).toBeDisabled();
    });

    it("should disable create button for empty input", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.click(input);
      await userEvent.click(screen.getByText("Create new category"));

      expect(screen.getByText("Create")).toBeDisabled();
    });

    it("should clear validation error when changing input", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.click(input);
      await userEvent.click(screen.getByText("Create new category"));

      const createInput = screen.getByPlaceholderText("Enter category name...");
      await userEvent.type(createInput, "Sales");
      expect(screen.getByText("Category already exists")).toBeInTheDocument();

      await userEvent.clear(createInput);
      await userEvent.type(createInput, "New Category");
      expect(
        screen.queryByText("Category already exists"),
      ).not.toBeInTheDocument();
    });
  });

  describe("Keyboard Navigation", () => {
    it("should navigate through options with arrow keys", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.click(input);
      await userEvent.keyboard("{ArrowDown}");

      // First option should be highlighted
      const createOption = screen.getByText("Create new category");
      expect(createOption).toHaveAttribute("aria-selected", "true");

      await userEvent.keyboard("{ArrowDown}");
      // Second option (Sales) should be highlighted
      const salesOption = screen.getByText("Sales");
      expect(salesOption).toHaveAttribute("aria-selected", "true");
    });

    it("should select option with Enter key", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.click(input);
      await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}");

      expect(mockOnCategoryChange).toHaveBeenCalledWith("Sales");
    });

    it("should wrap around when navigating past last option", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.click(input);

      // Navigate to last option
      await userEvent.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}");

      // Navigate one more time - should wrap to first
      await userEvent.keyboard("{ArrowDown}");

      const createOption = screen.getByText("Create new category");
      expect(createOption).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      expect(input).toHaveAttribute("role", "combobox");
      expect(input).toHaveAttribute("aria-autocomplete", "list");
      expect(input).toHaveAttribute("aria-expanded", "false");
    });

    it("should update aria-expanded when dropdown opens", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.click(input);

      expect(input).toHaveAttribute("aria-expanded", "true");
    });

    it("should have proper ARIA attributes on dropdown", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.click(input);

      const dropdown = screen.getByTestId("category-dropdown");
      expect(dropdown).toHaveAttribute("role", "listbox");
    });

    it("should have proper ARIA attributes on options", async () => {
      render(<CategorySelector {...defaultProps} />);
      const input = screen.getByPlaceholderText("Select or create category");

      await userEvent.click(input);

      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(4); // Create new + 3 existing

      options.forEach((option) => {
        expect(option).toHaveAttribute("role", "option");
      });
    });
  });
});
