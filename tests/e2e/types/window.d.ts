import { GridApi } from "ag-grid-community";

interface GridTestData {
  api: GridApi;
}

declare global {
  interface Window {
    agGridApi?: GridApi;
    setModelWasCalled?: boolean;
    testFilterApi?: {
      getFilter: () => unknown;
      setModel: (model: unknown) => void;
      getModel: () => unknown;
    };
    __AG_GRID_TEST__?: Record<string, GridTestData>;
  }
}

export {};
