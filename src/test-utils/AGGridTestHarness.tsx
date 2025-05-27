import React, { useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";

declare global {
  interface Window {
    __AG_GRID_TEST__: Record<string, any>;
  }
}

interface AGGridTestHarnessProps {
  gridId: string;
  children: React.ReactElement<typeof AgGridReact>;
  onGridReady?: (params: any) => void;
}

export const AGGridTestHarness: React.FC<AGGridTestHarnessProps> = ({
  gridId,
  children,
  onGridReady,
}) => {
  const gridRef = useRef<any>(null);

  useEffect(() => {
    if (gridRef.current) {
      // Initialize the global test object if it doesn't exist
      if (!window.__AG_GRID_TEST__) {
        window.__AG_GRID_TEST__ = {};
      }

      // Store the grid API and column API
      window.__AG_GRID_TEST__[gridId] = {
        api: gridRef.current.api,
        columnApi: gridRef.current.columnApi,
      };

      // Call the original onGridReady if provided
      if (onGridReady) {
        onGridReady({
          api: gridRef.current.api,
          columnApi: gridRef.current.columnApi,
        });
      }
    }

    // Cleanup
    return () => {
      if (window.__AG_GRID_TEST__) {
        delete window.__AG_GRID_TEST__[gridId];
      }
    };
  }, [gridId, onGridReady]);

  // Clone the child and add our ref
  return React.cloneElement(children, {
    // ref: (r: any) => {
    //   gridRef.current = r;
    //   // Call the original ref if it exists
    //   if (children.ref) {
    //     if (typeof children.ref === 'function') {
    //       children.ref(r);
    //     } else if (children.ref.hasOwnProperty('current')) {
    //       (children.ref as React.MutableRefObject<any>).current = r;
    //     }
    //   }
    // },
  });
};

export default AGGridTestHarness;
