/**
 * Utilities for working with filter state, serialization, and browser history
 */
// import { DateFilterModel } from '../components/interfaces';

/**
 * Serializes date objects in filter models to ensure they can be properly
 * stringified and stored in URLs or local storage
 */
export function serializeFilterModel(model: any): any {
  if (!model) return model;

  // Create a new object to avoid mutating the original
  const serialized = { ...model };

  // Process each column filter
  Object.keys(serialized).forEach((columnKey) => {
    const columnFilter = serialized[columnKey];

    // Check if it's our date filter (could be another filter type)
    if (columnFilter && (columnFilter.dateFrom || columnFilter.dateTo)) {
      // Convert dates to ISO strings
      if (columnFilter.dateFrom instanceof Date) {
        serialized[columnKey] = {
          ...columnFilter,
          dateFrom: columnFilter.dateFrom.toISOString(),
        };
      }

      if (columnFilter.dateTo instanceof Date) {
        serialized[columnKey] = {
          ...serialized[columnKey], // Use the already updated object if dateFrom was processed
          dateTo: columnFilter.dateTo.toISOString(),
        };
      }

      // Ensure inclusivity settings are preserved
      if (serialized[columnKey].fromInclusive === undefined) {
        serialized[columnKey].fromInclusive = false;
      }

      if (serialized[columnKey].toInclusive === undefined) {
        serialized[columnKey].toInclusive = false;
      }
    }
  });

  return serialized;
}

/**
 * Deserializes a filter model from JSON, converting ISO date strings
 * back to Date objects
 */
export function deserializeFilterModel(serializedModel: any): any {
  if (!serializedModel) return serializedModel;

  // Create a new object to avoid mutating the original
  const deserialized = { ...serializedModel };

  // Process each column filter
  Object.keys(deserialized).forEach((columnKey) => {
    const columnFilter = deserialized[columnKey];

    // Check if it's a string-serialized date
    if (
      columnFilter &&
      (typeof columnFilter.dateFrom === "string" ||
        typeof columnFilter.dateTo === "string")
    ) {
      // Convert string dates back to Date objects
      if (typeof columnFilter.dateFrom === "string" && columnFilter.dateFrom) {
        deserialized[columnKey] = {
          ...columnFilter,
          dateFrom: new Date(columnFilter.dateFrom),
        };
      }

      if (typeof columnFilter.dateTo === "string" && columnFilter.dateTo) {
        deserialized[columnKey] = {
          ...deserialized[columnKey], // Use the already updated object if dateFrom was processed
          dateTo: new Date(columnFilter.dateTo),
        };
      }
    }
  });

  return deserialized;
}

/**
 * Updates the URL with the current filter state
 */
export function updateUrlWithFilterState(
  filterModel: any,
  paramName: string = "filter",
): void {
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
): any | null {
  // Get current URL
  const url = new URL(window.location.href);
  const filterParam = url.searchParams.get(paramName);

  if (filterParam) {
    try {
      // Parse the JSON string
      const filterModel = JSON.parse(decodeURIComponent(filterParam));
      return deserializeFilterModel(filterModel);
    } catch (error) {
      console.error("Error parsing filter state from URL:", error);
      return null;
    }
  }

  return null;
}

/**
 * Sets up filter state persistence with browser history integration
 */
export function setupFilterStatePersistence(
  gridApi: any,
  options: {
    paramName?: string;
    onFilterLoad?: (model: any) => void;
    onFilterSave?: (model: any) => void;
  } = {},
): () => void {
  const { paramName = "filter", onFilterLoad, onFilterSave } = options;

  // Load initial filter from URL if present
  const url = new URL(window.location.href);
  const filterParam = url.searchParams.get(paramName);

  if (filterParam) {
    try {
      // Direct parse from URL for initial load
      const filterModel = JSON.parse(decodeURIComponent(filterParam));
      const deserializedModel = deserializeFilterModel(filterModel);

      // Apply the filter
      gridApi.setFilterModel(deserializedModel);

      // Notify callback
      if (onFilterLoad) {
        onFilterLoad(deserializedModel);
      }
    } catch (e) {
      console.error("Error loading filter from URL:", e);
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

    // Save current sort model to preserve it
    let sortModel = null;

    // For compatibility with AG Grid v33+
    try {
      if (typeof gridApi.getSortModel === "function") {
        sortModel = gridApi.getSortModel();
      }
    } catch (err) {
      console.warn("Error getting sort model in popstate handler:", err);
    }

    // Try to get filter from the URL
    const url = new URL(window.location.href);
    const filterParam = url.searchParams.get(paramName);

    if (filterParam) {
      try {
        // Parse filter from URL
        const filterModel = JSON.parse(decodeURIComponent(filterParam));
        const deserializedModel = deserializeFilterModel(filterModel);

        // Apply filter
        gridApi.setFilterModel(deserializedModel);

        // Restore sort order if available
        if (sortModel && sortModel.length > 0) {
          try {
            if (typeof gridApi.setSortModel === "function") {
              gridApi.setSortModel(sortModel);
            }
          } catch (err) {
            console.warn("Error setting sort model in popstate handler:", err);
          }
        }

        // Notify callback
        if (onFilterLoad) {
          onFilterLoad(deserializedModel);
        }
      } catch (e) {
        console.error("Error handling popstate:", e);
        gridApi.setFilterModel({});

        if (onFilterLoad) {
          onFilterLoad({});
        }
      }
    } else {
      // No filter in URL, clear filters
      gridApi.setFilterModel({});

      // Restore sort order if available
      if (sortModel && sortModel.length > 0) {
        try {
          if (typeof gridApi.setSortModel === "function") {
            gridApi.setSortModel(sortModel);
          }
        } catch (err) {
          console.warn("Error setting sort model in popstate handler:", err);
        }
      }

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
