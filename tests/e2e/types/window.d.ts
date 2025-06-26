import { GridApi } from "ag-grid-community";

declare global {
  interface Window {
    agGridApi?: GridApi;
    setModelWasCalled?: boolean;
    testFilterApi?: {
      getFilter: () => unknown;
      setModel: (model: unknown) => void;
      getModel: () => unknown;
    };
  }
}

export {};
