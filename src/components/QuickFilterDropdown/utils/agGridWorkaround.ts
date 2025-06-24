/**
 * Workaround for AG Grid bug where setFilterModel doesn't call setModel on custom filter components
 * See: https://github.com/ag-grid/ag-grid/issues/2256
 */

import { GridApi } from 'ag-grid-community';

export async function applyFilterModelWithWorkaround(
  api: GridApi,
  columnId: string,
  filterModel: any
) {
  // Method 1: Use getFilterInstance and manually call setModel
  try {
    console.log('[Workaround] Starting filter workaround for column:', columnId);
    
    // First set the filter model (this creates the filter instance)
    api.setFilterModel({ [columnId]: filterModel });
    
    // Small delay to ensure filter instance is created
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Get the filter instance - it might be a promise
    let filterInstance = api.getFilterInstance(columnId);
    console.log('[Workaround] Filter instance type:', typeof filterInstance, filterInstance?.constructor?.name);
    
    // If it's a promise, wait for it
    if (filterInstance && typeof filterInstance.then === 'function') {
      console.log('[Workaround] Filter instance is a promise, waiting...');
      filterInstance = await filterInstance;
    }
    
    console.log('[Workaround] Filter instance after await:', filterInstance);
    console.log('[Workaround] Has setModel?', typeof filterInstance?.setModel);
    
    if (filterInstance && typeof filterInstance.setModel === 'function') {
      console.log('[Workaround] Calling setModel with:', filterModel);
      // Manually call setModel on the instance
      await filterInstance.setModel(filterModel);
      
      console.log('[Workaround] setModel completed');
      
      // For set filters, call applyModel if available
      if (typeof filterInstance.applyModel === 'function') {
        console.log('[Workaround] Calling applyModel');
        filterInstance.applyModel();
      }
    } else {
      console.error('[Workaround] No valid filter instance or setModel method');
    }
    
    // Always call onFilterChanged to trigger re-filtering
    console.log('[Workaround] Calling onFilterChanged');
    api.onFilterChanged();
    
    return true;
  } catch (error) {
    console.error('[applyFilterModelWithWorkaround] Error:', error);
    return false;
  }
}

export async function applyFilterModelAlternative(
  api: GridApi,
  columnId: string,
  filterModel: any
) {
  // Method 2: Clear and re-apply filter
  try {
    // Clear all filters first
    api.setFilterModel({});
    
    // Wait for clear to complete
    await new Promise(resolve => setTimeout(resolve, 10));
    
    // Apply the new filter model
    api.setFilterModel({ [columnId]: filterModel });
    
    // Get filter instance and manually trigger setModel
    await new Promise(resolve => setTimeout(resolve, 10));
    const filterInstance = api.getFilterInstance(columnId);
    
    if (filterInstance) {
      await filterInstance.setModel(filterModel);
      api.onFilterChanged();
    }
    
    return true;
  } catch (error) {
    console.error('[applyFilterModelAlternative] Error:', error);
    return false;
  }
}

export function waitForFirstDataRendered(api: GridApi): Promise<void> {
  return new Promise((resolve) => {
    // Method 3: Use firstDataRendered event for initial filter setup
    const listener = () => {
      api.removeEventListener('firstDataRendered', listener);
      resolve();
    };
    api.addEventListener('firstDataRendered', listener);
  });
}