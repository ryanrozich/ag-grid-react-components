import type { GridApi, FilterModel } from "ag-grid-community";
import type { ReactNode } from "react";
import type {
  FilterPreset,
  PresetStorage,
  PresetSelectorProps,
} from "../FilterPresets/types";

/**
 * Represents a single quick filter option
 */
export interface QuickFilterOption {
  /** Unique identifier for the option */
  id: string;
  /** Display label for the option */
  label: string;
  /** Optional description text */
  description?: string;
  /** Icon to display (can be emoji, SVG, or any React node) */
  icon?: ReactNode;
  /** The filter model to apply when this option is selected */
  filterModel: FilterModel | null;
  /** Optional custom filter builder function */
  buildFilterModel?: (api: GridApi, columnId: string) => FilterModel | null;
  /** Whether this is a system preset (read-only) */
  isSystemPreset?: boolean;
  /** Optional tags for organization (user presets only) */
  tags?: string[];
}

/**
 * Configuration for filter preset functionality
 */
export interface EnablePresetsConfig {
  /** Storage adapter for persisting presets */
  storage: PresetStorage;
  /** System-defined presets that cannot be modified */
  systemPresets?: FilterPreset[];
  /** Callback when a preset is selected */
  onPresetChange?: (preset: FilterPreset | null) => void;
  /** Whether to allow saving new presets */
  allowSave?: boolean;
  /** Whether to show manage presets link */
  allowManage?: boolean;
  /** Callback when manage presets is clicked */
  onManageClick?: () => void;
  /** Custom preset selector renderer */
  renderPresetSelector?: (props: PresetSelectorProps) => ReactNode;
  /** Maximum number of presets allowed */
  maxPresets?: number;
}

/**
 * Props for the QuickFilterDropdown component
 */
export interface QuickFilterDropdownProps {
  /** The AG Grid API instance */
  api: GridApi;
  /** The column ID to apply filters to */
  columnId: string;
  /** Array of filter options to display */
  options: QuickFilterOption[];
  /** System presets (read-only) */
  systemPresets?: QuickFilterOption[];
  /** Whether to enable preset management (save/edit/delete) */
  enablePresetManagement?: boolean;
  /** Callback when a preset is saved */
  onPresetSave?: (preset: QuickFilterOption) => void;
  /** Callback when a preset is deleted */
  onPresetDelete?: (presetId: string) => void;
  /** Placeholder text for the dropdown trigger */
  placeholder?: string;
  /** Additional CSS class for the container */
  className?: string;
  /** Callback when filter changes */
  onFilterChange?: (option: QuickFilterOption | null) => void;
  /** Dropdown position relative to trigger */
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  /** Whether to show option descriptions */
  showDescriptions?: boolean;
  /** Custom trigger button content */
  triggerContent?: (selectedOption: QuickFilterOption | null) => ReactNode;
  /** Accessibility label for the dropdown */
  ariaLabel?: string;
  /**
   * Controls dropdown rendering strategy
   * - 'auto': Detects if portal is needed based on parent overflow
   * - 'always': Always use portal (for constrained containers)
   * - 'never': Use CSS positioning only (best performance)
   * @default 'never'
   */
  usePortal?: "auto" | "always" | "never";
  /** Enable filter preset functionality */
  enablePresets?: EnablePresetsConfig;
}

/**
 * Internal state for the dropdown
 */
export interface DropdownState {
  isOpen: boolean;
  selectedOption: QuickFilterOption | null;
  highlightedIndex: number;
  searchQuery: string;
}

/**
 * Keyboard navigation keys
 */
export enum NavigationKey {
  ArrowDown = "ArrowDown",
  ArrowUp = "ArrowUp",
  Enter = "Enter",
  Space = " ",
  Escape = "Escape",
  Home = "Home",
  End = "End",
  Tab = "Tab",
}
