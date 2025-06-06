import { ColDef, SideBarDef } from "ag-grid-community";

export const createDefaultColDef = (): ColDef => ({
  sortable: true,
  resizable: true,
  filter: true,
  floatingFilter: true,
  minWidth: 100,
  enableRowGroup: true,
  enableValue: true,
});

export const createAutoGroupColumnDef = (): ColDef => ({
  minWidth: 220,
  sortable: true,
  cellRendererParams: {
    totalValueGetter: (params: {
      node?: { level?: number };
      value?: unknown;
    }) => {
      // Check if this is the grand total (-1 level)
      const isRootLevel = params.node?.level === -1;
      if (isRootLevel) {
        return "Grand Total";
      }

      // For group totals, include the group value
      return `Subtotal: ${params.value ?? ""}`;
    },
  },
});

export const createSideBar = (): SideBarDef => ({
  toolPanels: [
    {
      id: "filters",
      labelDefault: "Filters",
      labelKey: "filters",
      iconKey: "filter",
      toolPanel: "agFiltersToolPanel",
      toolPanelParams: {
        suppressExpandAll: false,
        suppressFilterSearch: false,
      },
    },
    {
      id: "columns",
      labelDefault: "Columns",
      labelKey: "columns",
      iconKey: "columns",
      toolPanel: "agColumnsToolPanel",
    },
  ],
  defaultToolPanel: "filters",
  position: "right",
});
