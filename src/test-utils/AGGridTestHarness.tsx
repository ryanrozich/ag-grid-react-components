import React from "react";
import { AgGridReact } from "ag-grid-react";
import { GridApi, GridReadyEvent } from "ag-grid-community";

interface GridTestData {
  api: GridApi;
}

declare global {
  interface Window {
    __AG_GRID_TEST__: Record<string, GridTestData>;
  }
}

interface AGGridTestHarnessProps {
  gridId: string;
  children: React.ReactElement<typeof AgGridReact>;
  onGridReady?: (params: GridReadyEvent) => void;
}

export const AGGridTestHarness: React.FC<AGGridTestHarnessProps> = ({
  gridId,
  children,
  onGridReady,
}) => {
  const handleGridReady = (params: GridReadyEvent) => {
    // Initialize the global test object if it doesn't exist
    if (!window.__AG_GRID_TEST__) {
      window.__AG_GRID_TEST__ = {};
    }

    // Store the grid API
    window.__AG_GRID_TEST__[gridId] = {
      api: params.api,
    };

    // Call the original onGridReady if provided
    if (onGridReady) {
      onGridReady(params);
    }
  };

  // Clone the child and intercept onGridReady
  return React.cloneElement(children, {
    onGridReady: handleGridReady,
  });
};

export default AGGridTestHarness;
