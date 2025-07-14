import { useState, useCallback, useEffect } from "react";
import { IFilterParams } from "ag-grid-community";
import { DateFilterModel } from "../../interfaces";

export function useGridFilter(filterParams: IFilterParams) {
  const [model, setModel] = useState<DateFilterModel | null>(null);

  const applyFilter = useCallback(() => {
    if (filterParams.filterChangedCallback) {
      filterParams.filterChangedCallback();
    }
  }, [filterParams]);

  const resetFilter = useCallback(() => {
    setModel(null);
    applyFilter();
  }, [applyFilter]);

  const isFilterActive = useCallback(() => {
    return model !== null && model.dateFrom !== null;
  }, [model]);

  // Notify AG Grid when model changes
  useEffect(() => {
    if (filterParams.onModelChange) {
      filterParams.onModelChange(model);
    }
  }, [model, filterParams]);

  return {
    model,
    setModel,
    applyFilter,
    resetFilter,
    isFilterActive,
  };
}
