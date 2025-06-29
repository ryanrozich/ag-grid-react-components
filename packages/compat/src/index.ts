// Compatibility layer - maintains v1 API using v2 modular components
import { createDateFilter } from "@agrc/core";
import { QuickFilterDropdown as QuickFilterDropdownCore } from "@agrc/core";
import { ActiveFilters as ActiveFiltersCore } from "@agrc/core";
import {
  setupGridStatePersistence as setupGridStatePersistenceCore,
  captureGridState as captureGridStateCore,
  applyGridState as applyGridStateCore,
} from "@agrc/core";
import { reactDatePickerAdapter } from "@agrc/adapters/react-datepicker";
import { createLZStringAdapter } from "@agrc/adapters/compression/lz-string";

// Re-export types for backward compatibility
export type { DateFilterModel } from "@agrc/core";
export type { QuickFilter, QuickFilterGroup } from "@agrc/core";
export type { GridState } from "@agrc/core";

// DateFilter with react-datepicker (matches v1 behavior)
export const DateFilter = createDateFilter({
  datePickerAdapter: reactDatePickerAdapter,
  enableRelativeDates: true,
});

// QuickFilterDropdown (same API as v1)
export const QuickFilterDropdown = QuickFilterDropdownCore;

// ActiveFilters (same API as v1)
export const ActiveFilters = ActiveFiltersCore;

// Grid state utilities with LZ-String compression (matches v1 behavior)
const lzStringAdapter = createLZStringAdapter();

export const setupGridStatePersistence: typeof setupGridStatePersistenceCore = (
  api,
  options = {},
) => {
  return setupGridStatePersistenceCore(api, {
    compressionAdapter: lzStringAdapter,
    ...options,
  });
};

export const captureGridState = captureGridStateCore;
export const applyGridState = applyGridStateCore;

// Legacy exports for backward compatibility
export const setupFilterStatePersistence = setupGridStatePersistence;

// Export everything to match v1 surface area
export * from "@agrc/core";

// Note for users
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  console.log(
    "%c@agrc/compat loaded%c - Consider migrating to @agrc/core for smaller bundle size",
    "background: #f59e0b; color: white; padding: 2px 4px; border-radius: 2px;",
    "",
  );
}
