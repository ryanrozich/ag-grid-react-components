/**
 * Utilities for working with filter state, serialization, and browser history
 */
import { GridApi } from "ag-grid-community";
import { logger } from "./logger";

/**
 * Validates that an object is a safe filter model structure
 * Prevents XSS attacks by ensuring only expected properties and types
 */
function isValidFilterModel(obj: unknown): boolean {
  if (!obj || typeof obj !== "object") return false;

  const typedObj = obj as Record<string, unknown>;

  // Whitelist of allowed filter properties
  const allowedFilterProps = [
    "type",
    "mode",
    "dateFrom",
    "dateTo",
    "expressionFrom",
    "expressionTo",
    "fromInclusive",
    "toInclusive",
    "filter",
  ];
  const allowedTypes = ["equals", "notEqual", "before", "after", "inRange"];
  const allowedModes = ["absolute", "relative"];

  // Check each column filter
  for (const columnKey of Object.keys(typedObj)) {
    const columnFilter = typedObj[columnKey];

    // Column key should be alphanumeric with underscores only
    if (!/^[a-zA-Z0-9_]+$/.test(columnKey)) {
      logger.warn(`Invalid column key: ${columnKey}`);
      return false;
    }

    if (!columnFilter || typeof columnFilter !== "object") continue;

    const typedFilter = columnFilter as Record<string, unknown>;

    // Check that only allowed properties exist
    for (const prop of Object.keys(typedFilter)) {
      if (!allowedFilterProps.includes(prop)) {
        logger.warn(`Unexpected property in filter model: ${prop}`);
        return false;
      }
    }

    // Validate type and mode if present
    if (typedFilter.type && !allowedTypes.includes(String(typedFilter.type))) {
      logger.warn(`Invalid filter type: ${typedFilter.type}`);
      return false;
    }

    if (typedFilter.mode && !allowedModes.includes(String(typedFilter.mode))) {
      logger.warn(`Invalid filter mode: ${typedFilter.mode}`);
      return false;
    }

    // Validate date strings
    if (typedFilter.dateFrom && typeof typedFilter.dateFrom === "string") {
      const date = new Date(typedFilter.dateFrom);
      if (isNaN(date.getTime())) {
        logger.warn(`Invalid dateFrom: ${typedFilter.dateFrom}`);
        return false;
      }
    }

    if (typedFilter.dateTo && typeof typedFilter.dateTo === "string") {
      const date = new Date(typedFilter.dateTo);
      if (isNaN(date.getTime())) {
        logger.warn(`Invalid dateTo: ${typedFilter.dateTo}`);
        return false;
      }
    }

    // Validate expressions (alphanumeric + basic operators)
    if (
      typedFilter.expressionFrom &&
      typeof typedFilter.expressionFrom === "string"
    ) {
      if (!/^[a-zA-Z0-9+\-\s]+$/.test(typedFilter.expressionFrom)) {
        logger.warn(`Invalid expressionFrom: ${typedFilter.expressionFrom}`);
        return false;
      }
    }

    if (
      typedFilter.expressionTo &&
      typeof typedFilter.expressionTo === "string"
    ) {
      if (!/^[a-zA-Z0-9+\-\s]+$/.test(typedFilter.expressionTo)) {
        logger.warn(`Invalid expressionTo: ${typedFilter.expressionTo}`);
        return false;
      }
    }

    // Validate booleans
    if (
      typedFilter.fromInclusive !== undefined &&
      typeof typedFilter.fromInclusive !== "boolean"
    ) {
      logger.warn(`Invalid fromInclusive: ${typedFilter.fromInclusive}`);
      return false;
    }

    if (
      typedFilter.toInclusive !== undefined &&
      typeof typedFilter.toInclusive !== "boolean"
    ) {
      logger.warn(`Invalid toInclusive: ${typedFilter.toInclusive}`);
      return false;
    }
  }

  return true;
}

/**
 * Safely parses JSON from URL parameters with validation
 */
function safeJsonParse(jsonString: string): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(jsonString);

    // Validate the parsed object structure
    if (!isValidFilterModel(parsed)) {
      logger.error("Invalid filter model structure");
      return null;
    }

    return parsed;
  } catch (error) {
    logger.error("Error parsing JSON:", error);
    return null;
  }
}

/**
 * Serializes date objects in filter models to ensure they can be properly
 * stringified and stored in URLs or local storage
 */
export function serializeFilterModel(model: unknown): unknown {
  if (!model || typeof model !== "object") return model;

  const typedModel = model as Record<string, unknown>;

  // Create a new object to avoid mutating the original
  const serialized = { ...typedModel };

  // Process each column filter
  Object.keys(serialized).forEach((columnKey) => {
    const columnFilter = serialized[columnKey];

    // Check if it's our date filter (could be another filter type)
    if (columnFilter && typeof columnFilter === "object") {
      const typedFilter = columnFilter as Record<string, unknown>;

      if (typedFilter.dateFrom || typedFilter.dateTo) {
        // Convert dates to ISO strings
        if (typedFilter.dateFrom instanceof Date) {
          serialized[columnKey] = {
            ...typedFilter,
            dateFrom: typedFilter.dateFrom.toISOString(),
          };
        }

        if (typedFilter.dateTo instanceof Date) {
          serialized[columnKey] = {
            ...((serialized[columnKey] as Record<string, unknown>) ||
              typedFilter), // Use the already updated object if dateFrom was processed
            dateTo: typedFilter.dateTo.toISOString(),
          };
        }

        // Ensure inclusivity settings are preserved
        const currentFilter = serialized[columnKey] as Record<string, unknown>;
        if (currentFilter.fromInclusive === undefined) {
          currentFilter.fromInclusive = false;
        }

        if (currentFilter.toInclusive === undefined) {
          currentFilter.toInclusive = false;
        }
      }
    }
  });

  return serialized;
}

/**
 * Deserializes a filter model from JSON, converting ISO date strings
 * back to Date objects
 */
export function deserializeFilterModel(serializedModel: unknown): unknown {
  if (!serializedModel || typeof serializedModel !== "object")
    return serializedModel;

  const typedModel = serializedModel as Record<string, unknown>;

  // Create a new object to avoid mutating the original
  const deserialized = { ...typedModel };

  // Process each column filter
  Object.keys(deserialized).forEach((columnKey) => {
    const columnFilter = deserialized[columnKey];

    // Check if it's a string-serialized date
    if (columnFilter && typeof columnFilter === "object") {
      const typedFilter = columnFilter as Record<string, unknown>;

      if (
        typeof typedFilter.dateFrom === "string" ||
        typeof typedFilter.dateTo === "string"
      ) {
        // Convert string dates back to Date objects
        if (typeof typedFilter.dateFrom === "string" && typedFilter.dateFrom) {
          deserialized[columnKey] = {
            ...typedFilter,
            dateFrom: new Date(typedFilter.dateFrom),
          };
        }

        if (typeof typedFilter.dateTo === "string" && typedFilter.dateTo) {
          deserialized[columnKey] = {
            ...((deserialized[columnKey] as Record<string, unknown>) ||
              typedFilter), // Use the already updated object if dateFrom was processed
            dateTo: new Date(typedFilter.dateTo),
          };
        }
      }
    }
  });

  return deserialized;
}

/**
 * Updates the URL with the current filter state
 */
export function updateUrlWithFilterState(
  filterModel: Record<string, unknown> | null,
  paramName: string = "filter",
): void {
  if (!filterModel) {
    return;
  }
  const serializedModel = serializeFilterModel(filterModel);
  const hasFilters = Object.keys(filterModel).length > 0;

  // Get current URL
  const url = new URL(window.location.href);

  if (hasFilters) {
    // Serialize and encode the filter model
    const filterParam = encodeURIComponent(JSON.stringify(serializedModel));

    // Update the URL parameter
    url.searchParams.set(paramName, filterParam);

    // Update URL without reloading the page
    window.history.pushState({ filter: serializedModel }, "", url.toString());
  } else {
    // Remove the filter parameter if no filters are applied
    if (url.searchParams.has(paramName)) {
      url.searchParams.delete(paramName);
      window.history.pushState({}, "", url.toString());
    }
  }
}

/**
 * Loads filter state from URL
 */
export function loadFilterStateFromUrl(
  paramName: string = "filter",
): Record<string, unknown> | null {
  // Get current URL
  const url = new URL(window.location.href);
  const filterParam = url.searchParams.get(paramName);

  if (filterParam) {
    try {
      // Safely parse the JSON string with validation
      const filterModel = safeJsonParse(decodeURIComponent(filterParam));
      if (!filterModel) {
        logger.error("Invalid filter model from URL");
        return null;
      }
      return deserializeFilterModel(filterModel) as Record<
        string,
        unknown
      > | null;
    } catch (error) {
      logger.error("Error parsing filter state from URL:", error);
      return null;
    }
  }

  return null;
}

/**
 * Sets up filter state persistence with browser history integration
 */
export function setupFilterStatePersistence(
  gridApi: GridApi,
  options: {
    paramName?: string;
    onFilterLoad?: (model: Record<string, unknown> | null) => void;
    onFilterSave?: (model: Record<string, unknown> | null) => void;
  } = {},
): () => void {
  const { paramName = "filter", onFilterLoad, onFilterSave } = options;

  // Load initial filter from URL if present
  const url = new URL(window.location.href);
  const filterParam = url.searchParams.get(paramName);

  if (filterParam) {
    try {
      // Safely parse from URL for initial load
      const filterModel = safeJsonParse(decodeURIComponent(filterParam));
      if (!filterModel) {
        logger.error("Invalid filter model during initial load");
        if (onFilterLoad) {
          onFilterLoad({});
        }
        return () => {};
      }

      const deserializedModel = deserializeFilterModel(filterModel) as Record<
        string,
        unknown
      >;

      // Apply the filter
      gridApi.setFilterModel(deserializedModel);

      // Notify callback
      if (onFilterLoad) {
        onFilterLoad(deserializedModel);
      }
    } catch (e) {
      logger.error("Error loading filter from URL:", e);
    }
  } else if (onFilterLoad) {
    onFilterLoad({});
  }

  // Setup filter change listener
  const filterListener = () => {
    // Get current filter model
    const filterModel = gridApi.getFilterModel();
    const serializedModel = serializeFilterModel(filterModel);
    const hasFilters = Object.keys(filterModel).length > 0;

    // Update URL
    if (hasFilters) {
      const filterParam = encodeURIComponent(JSON.stringify(serializedModel));
      const url = new URL(window.location.href);
      url.searchParams.set(paramName, filterParam);
      window.history.pushState({ filter: serializedModel }, "", url.toString());
    } else {
      // Remove filter parameter if no filters
      const url = new URL(window.location.href);
      if (url.searchParams.has(paramName)) {
        url.searchParams.delete(paramName);
        window.history.pushState({}, "", url.toString());
      }
    }

    // Notify callback
    if (onFilterSave) {
      onFilterSave(filterModel);
    }
  };

  // Add the filter change listener
  gridApi.addEventListener("filterChanged", filterListener);

  // Setup popstate (browser back/forward) listener to handle navigation
  const handlePopState = (_event: PopStateEvent) => {
    if (!gridApi) return;

    // Note: Sort model is preserved automatically by AG Grid

    // Try to get filter from the URL
    const url = new URL(window.location.href);
    const filterParam = url.searchParams.get(paramName);

    if (filterParam) {
      try {
        // Safely parse filter from URL
        const filterModel = safeJsonParse(decodeURIComponent(filterParam));
        if (!filterModel) {
          logger.error("Invalid filter model in popstate");
          gridApi.setFilterModel({});
          if (onFilterLoad) {
            onFilterLoad({});
          }
          return;
        }

        const deserializedModel = deserializeFilterModel(filterModel) as Record<
          string,
          unknown
        >;

        // Apply filter
        gridApi.setFilterModel(deserializedModel);

        // Sort order is preserved automatically by AG Grid

        // Notify callback
        if (onFilterLoad) {
          onFilterLoad(deserializedModel);
        }
      } catch (e) {
        logger.error("Error handling popstate:", e);
        gridApi.setFilterModel({});

        if (onFilterLoad) {
          onFilterLoad({});
        }
      }
    } else {
      // No filter in URL, clear filters
      gridApi.setFilterModel({});

      // Sort order is preserved automatically by AG Grid

      if (onFilterLoad) {
        onFilterLoad({});
      }
    }
  };

  window.addEventListener("popstate", handlePopState);

  // Return cleanup function
  return () => {
    gridApi.removeEventListener("filterChanged", filterListener);
    window.removeEventListener("popstate", handlePopState);
  };
}
