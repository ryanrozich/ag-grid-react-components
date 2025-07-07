import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PresetSelector } from "./index";
import type { FilterPreset, PresetSelectorProps } from "../types";

const mockPresets: FilterPreset[] = [
  {
    id: "system-1",
    name: "Default View",
    description: "Standard filter configuration",
    filterModel: {},
    isSystem: true,
    isDefault: true,
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "system-2",
    name: "Recent Items",
    description: "Shows items from last 30 days",
    filterModel: {
      date: {
        type: "after",
        mode: "relative",
        expressionFrom: "Today-30d",
      },
    },
    isSystem: true,
    createdAt: new Date("2023-01-01"),
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
  },
  {
    id: "user-2",
    name: "Team Dashboard",
    filterModel: {
      team: { type: "contains", value: "engineering" },
    },
    tags: ["team"],
    createdAt: new Date("2023-07-01"),
  },
];

describe("PresetSelector", () => {
  const defaultProps: PresetSelectorProps = {
    presets: mockPresets,
    activePresetId: undefined,
    onPresetSelect: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render with default trigger", () => {
      render(<PresetSelector {...defaultProps} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByText("Select preset")).toBeInTheDocument();
    });

    it("should show active preset name in trigger", () => {
      render(<PresetSelector {...defaultProps} activePresetId="user-1" />);
      expect(screen.getByText("My Custom Filter")).toBeInTheDocument();
    });

    it("should render custom trigger when provided", () => {
      const CustomTrigger = ({ isOpen, onToggle }: any) => (
        <button onClick={onToggle} data-testid="custom-trigger">
          Custom Trigger {isOpen ? "Open" : "Closed"}
        </button>
      );

      render(
        <PresetSelector
          {...defaultProps}
          renderTrigger={(props) => <CustomTrigger {...props} />}
        />,
      );

      expect(screen.getByTestId("custom-trigger")).toBeInTheDocument();
      expect(screen.getByText("Custom Trigger Closed")).toBeInTheDocument();
    });

    it("should be disabled when disabled prop is true", () => {
      render(<PresetSelector {...defaultProps} disabled />);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
  });

  describe("Dropdown Behavior", () => {
    it("should open dropdown on trigger click", async () => {
      const user = userEvent.setup();
      render(<PresetSelector {...defaultProps} />);

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      expect(screen.getByRole("listbox")).toBeInTheDocument();
      mockPresets.forEach((preset) => {
        expect(screen.getByText(preset.name)).toBeInTheDocument();
      });
    });

    it("should close dropdown on outside click", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <PresetSelector {...defaultProps} />
          <div data-testid="outside">Outside</div>
        </div>,
      );

      await user.click(screen.getByRole("button"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.click(screen.getByTestId("outside"));
      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("should close dropdown on Escape key", async () => {
      const user = userEvent.setup();
      render(<PresetSelector {...defaultProps} />);

      await user.click(screen.getByRole("button"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });
  });

  describe("Preset Display", () => {
    it("should show system preset indicator", async () => {
      const user = userEvent.setup();
      render(<PresetSelector {...defaultProps} />);

      await user.click(screen.getByRole("button"));

      const systemPreset = screen
        .getByText("Default View")
        .closest('[role="option"]');
      expect(systemPreset).toHaveAttribute("data-system", "true");
    });

    it("should show default preset indicator", async () => {
      const user = userEvent.setup();
      render(<PresetSelector {...defaultProps} />);

      await user.click(screen.getByRole("button"));

      const defaultPreset = screen
        .getByText("Default View")
        .closest('[role="option"]');
      expect(defaultPreset).toHaveAttribute("data-default", "true");
    });

    it("should show active preset indicator", async () => {
      const user = userEvent.setup();
      render(<PresetSelector {...defaultProps} activePresetId="user-1" />);

      await user.click(screen.getByRole("button"));

      const options = screen.getAllByRole("option");
      const activeOption = options.find(
        (opt) => opt.getAttribute("aria-selected") === "true",
      );
      expect(activeOption).toBeDefined();
      expect(activeOption).toHaveAttribute("id", "preset-option-user-1");
    });

    it("should render custom option when renderOption provided", async () => {
      const user = userEvent.setup();
      const CustomOption = ({ name, isSystem }: FilterPreset) => (
        <div data-testid={`custom-${name}`}>
          {name} {isSystem && "(System)"}
        </div>
      );

      render(
        <PresetSelector
          {...defaultProps}
          renderOption={(preset) => <CustomOption {...preset} />}
        />,
      );

      await user.click(screen.getByRole("button"));

      expect(screen.getByTestId("custom-Default View")).toHaveTextContent(
        "Default View (System)",
      );
      expect(screen.getByTestId("custom-My Custom Filter")).toHaveTextContent(
        "My Custom Filter",
      );
    });
  });

  describe("Selection", () => {
    it("should call onPresetSelect when preset is clicked", async () => {
      const user = userEvent.setup();
      const onPresetSelect = vi.fn();
      render(
        <PresetSelector {...defaultProps} onPresetSelect={onPresetSelect} />,
      );

      await user.click(screen.getByRole("button"));
      await user.click(screen.getByText("My Custom Filter"));

      expect(onPresetSelect).toHaveBeenCalledWith(mockPresets[2]);
      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("should not close dropdown when clicking current active preset", async () => {
      const user = userEvent.setup();
      const onPresetSelect = vi.fn();
      render(
        <PresetSelector
          {...defaultProps}
          activePresetId="user-1"
          onPresetSelect={onPresetSelect}
        />,
      );

      await user.click(screen.getByRole("button"));
      const activeOption = screen.getByRole("option", {
        name: /My Custom Filter.*Currently active/i,
      });
      await user.click(activeOption);

      expect(onPresetSelect).not.toHaveBeenCalled();
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });
  });

  describe("Keyboard Navigation", () => {
    it("should navigate options with arrow keys", async () => {
      const user = userEvent.setup();
      render(<PresetSelector {...defaultProps} />);

      await user.click(screen.getByRole("button"));

      await user.keyboard("{ArrowDown}");
      expect(
        screen.getByText("Default View").closest('[role="option"]'),
      ).toHaveAttribute("data-highlighted", "true");

      await user.keyboard("{ArrowDown}");
      expect(
        screen.getByText("Recent Items").closest('[role="option"]'),
      ).toHaveAttribute("data-highlighted", "true");

      await user.keyboard("{ArrowUp}");
      expect(
        screen.getByText("Default View").closest('[role="option"]'),
      ).toHaveAttribute("data-highlighted", "true");
    });

    it("should select preset with Enter key", async () => {
      const user = userEvent.setup();
      const onPresetSelect = vi.fn();
      render(
        <PresetSelector {...defaultProps} onPresetSelect={onPresetSelect} />,
      );

      await user.click(screen.getByRole("button"));
      await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");

      expect(onPresetSelect).toHaveBeenCalledWith(mockPresets[1]);
      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("should focus trigger when Tab is pressed in dropdown", async () => {
      const user = userEvent.setup();
      render(<PresetSelector {...defaultProps} />);

      const trigger = screen.getByRole("button");
      await user.click(trigger);
      await user.keyboard("{Tab}");

      expect(trigger).toHaveFocus();
      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("should wrap around when navigating past last option", async () => {
      const user = userEvent.setup();
      render(<PresetSelector {...defaultProps} />);

      await user.click(screen.getByRole("button"));

      // Start at index -1, first arrow down should go to index 0
      await user.keyboard("{ArrowDown}");

      // Navigate to last item (3 more times for total of 4 presets)
      for (let i = 0; i < mockPresets.length - 1; i++) {
        await user.keyboard("{ArrowDown}");
      }

      const options = screen.getAllByRole("option");
      expect(options[mockPresets.length - 1]).toHaveAttribute(
        "data-highlighted",
        "true",
      );

      // Should wrap to first
      await user.keyboard("{ArrowDown}");
      expect(options[0]).toHaveAttribute("data-highlighted", "true");
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", async () => {
      const user = userEvent.setup();
      render(<PresetSelector {...defaultProps} />);

      const trigger = screen.getByRole("button");
      expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
      expect(trigger).toHaveAttribute("aria-expanded", "false");

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");

      const listbox = screen.getByRole("listbox");
      expect(listbox).toHaveAttribute("aria-label", "Select a preset");

      const options = screen.getAllByRole("option");
      options.forEach((option, index) => {
        expect(option).toHaveAttribute("id");
        if (defaultProps.activePresetId === mockPresets[index].id) {
          expect(option).toHaveAttribute("aria-selected", "true");
        }
      });
    });

    it("should announce selection to screen readers", async () => {
      const user = userEvent.setup();
      render(<PresetSelector {...defaultProps} />);

      await user.click(screen.getByRole("button"));
      const option = screen
        .getByText("My Custom Filter")
        .closest('[role="option"]');

      expect(option).toHaveAttribute("aria-label");
      const ariaLabel = option?.getAttribute("aria-label");
      expect(ariaLabel).toContain("My Custom Filter");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty presets array", () => {
      render(<PresetSelector {...defaultProps} presets={[]} />);
      const trigger = screen.getByRole("button");
      expect(trigger).toBeInTheDocument();
      expect(screen.getByText("No presets")).toBeInTheDocument();
    });

    it("should handle missing preset for activePresetId", () => {
      render(
        <PresetSelector {...defaultProps} activePresetId="non-existent" />,
      );
      expect(screen.getByText("Select preset")).toBeInTheDocument();
    });

    it("should handle rapid open/close clicks", async () => {
      const user = userEvent.setup();
      render(<PresetSelector {...defaultProps} />);

      const trigger = screen.getByRole("button");

      // Rapid clicks
      await user.click(trigger);
      await user.click(trigger);
      await user.click(trigger);

      // Should be open after odd number of clicks
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });
  });
});
