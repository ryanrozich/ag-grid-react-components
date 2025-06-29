/**
 * Workaround for AG Grid bug where setFilterModel doesn't call setModel on custom filter components
 * See: https://github.com/ag-grid/ag-grid/issues/2256
 */

import { GridApi, IFilter } from "ag-grid-community";

export async function applyFilterModelWithWorkaround<TData = unknown>(
  api: GridApi<TData>,
  columnId: string,
  filterModel: unknown,
) {
  // Method 1: Use getFilterInstance and manually call setModel
  try {
    console.log(
      "[Workaround] Starting filter workaround for column:",
      columnId,
    );

    // First set the filter model (this creates the filter instance with the model in props)
    api.setFilterModel({ [columnId]: filterModel });

    // Important: Give React time to render the component with the new props
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Get the filter instance - in AG Grid v33 this returns a Promise
    let filterInstance: IFilter | null | undefined;
    const filterInstanceOrPromise = (
      api as GridApi & {
        getColumnFilterInstance: (
          columnId: string,
        ) => Promise<IFilter | null | undefined> | IFilter | null | undefined;
      }
    ).getColumnFilterInstance(columnId);

    console.log(
      "[Workaround] Filter instance type:",
      typeof filterInstanceOrPromise,
      (filterInstanceOrPromise as any)?.constructor?.name,
    );

    // If it's a promise, wait for it
    if (
      filterInstanceOrPromise &&
      typeof (filterInstanceOrPromise as any).then === "function"
    ) {
      console.log("[Workaround] Filter instance is a promise, waiting...");
      filterInstance = await (filterInstanceOrPromise as Promise<
        IFilter | null | undefined
      >);
    } else {
      filterInstance = filterInstanceOrPromise as unknown as
        | IFilter
        | null
        | undefined;
    }

    console.log("[Workaround] Filter instance after await:", filterInstance);
    console.log("[Workaround] Has setModel?", typeof filterInstance?.setModel);

    // Even though the component received the model in props, it might not have
    // applied it to internal state due to React hooks initialization behavior
    if (filterInstance && typeof filterInstance.setModel === "function") {
      console.log("[Workaround] Calling setModel with:", filterModel);
      // Manually call setModel to ensure the filter state is updated
      await filterInstance.setModel(filterModel);

      console.log("[Workaround] setModel completed");

      // For set filters, call applyModel if available
      if (typeof (filterInstance as any).applyModel === "function") {
        console.log("[Workaround] Calling applyModel");
        (filterInstance as any).applyModel();
      }

      // Give the component time to process the state update
      await new Promise((resolve) => setTimeout(resolve, 50));
    } else {
      console.error("[Workaround] No valid filter instance or setModel method");
    }

    // Always call onFilterChanged to trigger re-filtering
    console.log("[Workaround] Calling onFilterChanged");
    api.onFilterChanged();

    // Final delay to ensure everything is processed
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Force grid to refresh the rows - this ensures DOM updates
    console.log("[Workaround] Forcing grid refresh");
    api.refreshCells({ force: true });
    api.redrawRows();

    return true;
  } catch (error) {
    console.error("[applyFilterModelWithWorkaround] Error:", error);
    return false;
  }
}

export async function applyFilterModelAlternative<TData = unknown>(
  api: GridApi<TData>,
  columnId: string,
  filterModel: unknown,
) {
  // Method 2: Clear and re-apply filter
  try {
    // Clear all filters first
    api.setFilterModel({});

    // Wait for clear to complete
    await new Promise((resolve) => setTimeout(resolve, 10));

    // Apply the new filter model
    api.setFilterModel({ [columnId]: filterModel });

    // Get filter instance and manually trigger setModel
    await new Promise((resolve) => setTimeout(resolve, 10));
    const filterInstanceOrPromise = (
      api as GridApi & {
        getColumnFilterInstance: (
          columnId: string,
        ) => Promise<IFilter | null | undefined> | IFilter | null | undefined;
      }
    ).getColumnFilterInstance(columnId);

    let filterInstance: IFilter | null | undefined;
    if (
      filterInstanceOrPromise &&
      typeof (filterInstanceOrPromise as any).then === "function"
    ) {
      filterInstance = await (filterInstanceOrPromise as Promise<
        IFilter | null | undefined
      >);
    } else {
      filterInstance = filterInstanceOrPromise as unknown as
        | IFilter
        | null
        | undefined;
    }

    if (filterInstance && filterInstance.setModel) {
      await filterInstance.setModel(filterModel);
      api.onFilterChanged();
    }

    return true;
  } catch (error) {
    console.error("[applyFilterModelAlternative] Error:", error);
    return false;
  }
}

export function waitForFirstDataRendered(api: GridApi): Promise<void> {
  return new Promise((resolve) => {
    // Check if data is already rendered
    if (!api?.getDisplayedRowCount || api.getDisplayedRowCount() > 0) {
      resolve();
      return;
    }

    // Check if event listener methods exist
    if (!api?.addEventListener || !api?.removeEventListener) {
      resolve();
      return;
    }

    // Method 3: Use firstDataRendered event for initial filter setup
    const listener = () => {
      api.removeEventListener("firstDataRendered", listener);
      resolve();
    };
    api.addEventListener("firstDataRendered", listener);
  });
}
