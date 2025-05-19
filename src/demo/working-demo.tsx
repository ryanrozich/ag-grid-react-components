import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';
import { 
  ColDef, 
  GridReadyEvent,
  themeQuartz,
  colorSchemeDarkBlue,
  colorSchemeDarkWarm,
  colorSchemeLightWarm,
  colorSchemeLightCold,
  SideBarDef,
  GridApi
} from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { addDays, format, subDays } from 'date-fns';

// Import AG Grid CSS - using the modern Quartz theme
// No need to import ag-grid.css when using the theming API
import 'ag-grid-community/styles/ag-theme-quartz.css';

// Import our filter components
import RelativeDateFilter from '../components/RelativeDateFilter';
import RelativeDateFloatingFilter from '../components/RelativeDateFloatingFilter';

// Import filter state utilities
import { 
  setupFilterStatePersistence, 
  serializeFilterModel, 
  deserializeFilterModel, 
  updateUrlWithFilterState, 
  loadFilterStateFromUrl 
} from '../utils/filterStateUtils';

// We'll use inline Tailwind classes for now

// Generate more interesting sample data
const generateData = (count: number) => {
  const today = new Date();
  const data = [];
  
  const categories = ['Task', 'Meeting', 'Event', 'Reminder', 'Deadline'];
  const priorities = ['Low', 'Medium', 'High', 'Urgent'];
  const statuses = ['Pending', 'In Progress', 'Completed', 'Cancelled', 'Delayed'];
  
  for (let i = 0; i < count; i++) {
    // Generate a date between 30 days ago and 30 days in the future
    const date = addDays(today, -30 + Math.floor(Math.random() * 61));
    
    // Create a due date that's after the start date (between 1-14 days later)
    const dueDate = addDays(date, 1 + Math.floor(Math.random() * 14));
    
    // Create a date string for comparison
    const dateString = format(date, 'yyyy-MM-dd');
    
    // Determine if it's upcoming, today, or past
    const isPast = date < subDays(today, 1);
    const isToday = format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
    const isUpcoming = !isPast && !isToday;
    
    // Generate other properties
    const category = categories[Math.floor(Math.random() * categories.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const value = Math.floor(Math.random() * 1000);
    
    data.push({
      id: i,
      name: `${category} ${i + 1}`,
      date,
      dateString,
      dueDate,
      dueDateString: format(dueDate, 'yyyy-MM-dd'),
      category,
      priority,
      status,
      isPast,
      isToday,
      isUpcoming,
      value
    });
  }
  
  return data;
};

// Main application component
const App = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const gridRef = useRef<any>(null);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  // Always show the tool panel since we removed the toggle button
  const [isToolPanelShowing] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('No filter applied');
  const [lastSortModel, setLastSortModel] = useState<any[]>([]);
  const cleanupRef = useRef<(() => void) | null>(null);
  
  // Column definitions with more columns and styling
  // Configured for proper row grouping support
  const columnDefs = useMemo<ColDef[]>(() => [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 70,
      filter: 'agNumberColumnFilter',
      cellClass: 'font-mono text-xs',
      enableRowGroup: false // ID not useful for grouping
    },
    { 
      field: 'name', 
      headerName: 'Name', 
      flex: 1,
      filter: 'agTextColumnFilter',
      enableRowGroup: true,
      headerTooltip: 'Drag to Row Groups section to group data by Name'
    },
    { 
      field: 'category', 
      headerName: 'Category',
      width: 120,
      filter: 'agSetColumnFilter',
      enableRowGroup: true,
      headerTooltip: 'Drag to Row Groups section to group data by Category',
      cellClass: params => {
        const category = params.value;
        switch (category) {
          case 'Task': return 'bg-blue-50 text-blue-800';
          case 'Meeting': return 'bg-purple-50 text-purple-800';
          case 'Event': return 'bg-green-50 text-green-800';
          case 'Reminder': return 'bg-yellow-50 text-yellow-800';
          case 'Deadline': return 'bg-red-50 text-red-800';
          default: return '';
        }
      }
    },
    { 
      field: 'date', 
      headerName: 'Date',
      filter: RelativeDateFilter,
      floatingFilter: true,
      floatingFilterComponent: RelativeDateFloatingFilter, 
      valueFormatter: (params) => params.value ? format(params.value, 'yyyy-MM-dd') : '',
      width: 150,
      cellClass: params => {
        if (params.data?.isToday) return 'bg-green-100 font-bold';
        if (params.data?.isPast) return 'bg-gray-100 text-gray-600';
        if (params.data?.isUpcoming) return 'bg-blue-50';
        return '';
      }
    },
    { 
      field: 'dueDate', 
      headerName: 'Due Date',
      filter: RelativeDateFilter,
      floatingFilter: true,
      floatingFilterComponent: RelativeDateFloatingFilter, 
      valueFormatter: (params) => params.value ? format(params.value, 'yyyy-MM-dd') : '',
      width: 150
    },
    { 
      field: 'priority', 
      headerName: 'Priority',
      width: 120,
      filter: 'agSetColumnFilter',
      enableRowGroup: true,
      headerTooltip: 'Drag to Row Groups section to group data by Priority',
      cellClass: params => {
        const priority = params.value;
        switch (priority) {
          case 'Low': return 'bg-gray-50 text-gray-800';
          case 'Medium': return 'bg-blue-50 text-blue-800';
          case 'High': return 'bg-orange-50 text-orange-800';
          case 'Urgent': return 'bg-red-50 text-red-800';
          default: return '';
        }
      }
    },
    { 
      field: 'status', 
      headerName: 'Status',
      width: 130,
      filter: 'agSetColumnFilter',
      enableRowGroup: true,
      headerTooltip: 'Drag to Row Groups section to group data by Status',
      cellClass: params => {
        const status = params.value;
        switch (status) {
          case 'Pending': return 'bg-yellow-50 text-yellow-800';
          case 'In Progress': return 'bg-blue-50 text-blue-800';
          case 'Completed': return 'bg-green-50 text-green-800';
          case 'Cancelled': return 'bg-red-50 text-red-800';
          case 'Delayed': return 'bg-orange-50 text-orange-800';
          default: return '';
        }
      }
    },
    { 
      field: 'value', 
      headerName: 'Value', 
      width: 120,
      filter: 'agNumberColumnFilter',
      valueFormatter: params => {
        // Format the value as currency
        if (params.value === undefined || params.value === null) return '';
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2
        }).format(params.value);
      },
      // Apply different styles for normal cells vs total cells
      cellClass: params => {
        const classes = ['font-mono', 'text-right'];
        
        // Check if this is a total row (footer node)
        if (params.node?.footer) {
          classes.push('font-bold', 'bg-gray-100');
        }
        
        // Grand total - extra emphasis
        if (params.node?.level === -1) {
          classes.push('text-green-800', 'bg-green-50');
        }
        
        return classes.join(' ');
      },
      enableRowGroup: false,
      enableValue: true,
      aggFunc: 'sum'
    }
  ], []);
  
  // Default column definitions
  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
    minWidth: 100,
    // Add default row grouping settings
    enableRowGroup: true,
    enableValue: true
  }), []);
  
  // Configure auto group column to better display total rows
  const autoGroupColumnDef = useMemo(() => ({
    minWidth: 220,
    sortable: true,
    cellRendererParams: {
      // Custom value formatter for total rows
      totalValueGetter: params => {
        // Check if this is the grand total (-1 level)
        const isRootLevel = params.node.level === -1;
        if (isRootLevel) {
          return 'Grand Total';
        }
        
        // For group totals, include the group value
        return `Subtotal: ${params.value || ''}`;
      }
    }
  }), []);
  
  // Create side bar definition with tools
  const sideBar = useMemo<SideBarDef>(() => ({
    toolPanels: [
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
        toolPanelParams: {
          suppressExpandAll: false,
          suppressFilterSearch: false
        }
      },
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel'
      }
    ],
    defaultToolPanel: 'filters',
    position: 'right'
  }), []);
  
  // Create theme with DarkBlue color scheme
  const darkBlueTheme = useMemo(() => {
    return themeQuartz.withPart(colorSchemeLightCold);
  }, []);
  
  // No longer needed since we removed the tool panel toggle button
  
  // Generate data initially and use for filtering
  const initialData = useMemo(() => generateData(100), []);
  
  // Apply filters to the fixed dataset using AG Grid's filter model
  const applyFilters = useCallback((filter?: string) => {
    // First, set all rows regardless of filter (we'll use AG Grid's filtering)
    setRowData(initialData);
    
    // Wait for data to be set, then apply filter model
    setTimeout(() => {
      if (!gridRef.current || !gridRef.current.api) return;
      
      if (filter === 'today') {
        // Create date filter model for "today" using our custom filter format
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const filterModel = {
          date: {
            type: 'equals',
            mode: 'relative', // Use relative mode with our expression
            expressionFrom: 'Today',
            dateFrom: today,
            fromInclusive: true,
            toInclusive: true
          }
        };
        gridRef.current.api.setFilterModel(filterModel);
      } else if (filter === 'upcoming') {
        // Create date filter model for dates after today
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const filterModel = {
          date: {
            type: 'after',
            mode: 'relative',
            expressionFrom: 'Today',
            dateFrom: tomorrow,
            fromInclusive: false
          }
        };
        gridRef.current.api.setFilterModel(filterModel);
      } else if (filter === 'past') {
        // Create date filter model for dates before today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const filterModel = {
          date: {
            type: 'before',
            mode: 'relative',
            expressionFrom: 'Today',
            dateFrom: today,
            fromInclusive: false
          }
        };
        gridRef.current.api.setFilterModel(filterModel);
      } else {
        // 'all' or undefined - clear all filters
        gridRef.current.api.setFilterModel(null);
      }
    }, 0);
  }, [initialData]);
  
  // Handle grid ready event
  const onGridReady = useCallback((params: GridReadyEvent) => {
    console.log('Grid ready');
    
    // Store API reference
    setGridApi(params.api);
    
    // Load initial data
    setRowData(initialData);
    
    // Size columns to fit
    setTimeout(() => {
      // In AG Grid v33, columnApi was merged into the main api
      if (params.api.getColumnDefs().length > 0) {
        params.api.sizeColumnsToFit();
      }
    }, 100);
    
    // Setup filter changed listener to update status for manual filter changes
    params.api.addEventListener('filterChanged', () => {
      try {
        const filterModel = params.api.getFilterModel();
        
        // Only update if we haven't recently set a custom status via button clicks
        if (filterStatus === 'No filter applied' || 
            filterStatus === 'Filter loaded from URL' || 
            filterStatus === 'Filter saved to URL') {
          
          const filterKeys = Object.keys(filterModel);
          
          if (filterKeys.length === 0) {
            setFilterStatus('No filter applied');
          } else {
            // Create a descriptive status based on the active filters
            const filterDescription = filterKeys.map(key => {
              const filter = filterModel[key];
              
              // Handle our custom date filter
              if (filter.mode === 'relative' && filter.expressionFrom) {
                return `${key}: ${filter.expressionFrom}`;
              }
              
              // Simple description for other filter types
              return key;
            }).join(', ');
            
            setFilterStatus(`Custom filter on: ${filterDescription}`);
          }
        }
      } catch (err) {
        console.warn('Error updating filter status:', err);
      }
    });
    
    // Open filters tool panel by default
    if (isToolPanelShowing) {
      setTimeout(() => {
        params.api.openToolPanel('filters');
      }, 200);
    }
    
    // Check for filter parameters in URL
    const filterModel = loadFilterStateFromUrl();
    if (filterModel) {
      // Apply the filter to the grid
      params.api.setFilterModel(filterModel);
      setFilterStatus('Filter loaded from URL');
    }
    
    // Setup filter persistence and browser history
    const cleanup = setupFilterStatePersistence(params.api, {
      onFilterLoad: (model: any) => {
        if (Object.keys(model).length > 0) {
          // Don't overwrite the filter status - just show a temporary notification
          const originalStatus = filterStatus;
          setFilterStatus('Filter loaded from URL');
          // Reset back to the original status after 2 seconds
          setTimeout(() => {
            setFilterStatus(originalStatus);
          }, 2000);
        } else {
          setFilterStatus('No filter applied');
        }
      },
      onFilterSave: (model: any) => {
        if (Object.keys(model).length > 0) {
          // Don't overwrite the filter status - just show a temporary notification
          const originalStatus = filterStatus;
          setFilterStatus('Filter saved to URL');
          
          // Remember current sort model - in AG Grid v33, there's a different API
          try {
            if (gridRef.current && 
                gridRef.current.api && 
                typeof gridRef.current.api.getSortModel === 'function') {
              setLastSortModel(gridRef.current.api.getSortModel() || []);
            }
          } catch (err) {
            console.warn('Error getting sort model during filter save:', err);
          }
          
          // Reset back to the original status after 2 seconds
          setTimeout(() => {
            setFilterStatus(originalStatus);
          }, 2000);
        } else {
          setFilterStatus('No filter applied');
        }
      }
    });
    
    // Store cleanup function
    cleanupRef.current = cleanup;
  }, [isToolPanelShowing, initialData]);
  
  // Clean up filter persistence on unmount
  useEffect(() => {
    // Apply the dark-blue theme mode to the document body
    document.body.setAttribute('data-ag-theme-mode', 'dark-blue');
    
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
      // Clean up the theme attribute when component unmounts
      document.body.removeAttribute('data-ag-theme-mode');
    };
  }, []);
  
  // Data filters 
  const applyFilter = useCallback((filterType: string) => {
    // Store current sort model
    let sortModel = null;
    
    // Safely check if API exists and has getSortModel method
    if (gridRef.current && 
        gridRef.current.api && 
        typeof gridRef.current.api.getSortModel === 'function') {
      try {
        sortModel = gridRef.current.api.getSortModel();
        // Also store in state
        setLastSortModel(sortModel || []);
      } catch (err) {
        console.warn('Error getting sort model:', err);
      }
    }
    
    // Apply filter - this will set the filter model directly via AG Grid API
    // which will trigger the filterChanged event and update the URL
    applyFilters(filterType);
    
    // Restore sort model after data is filtered
    if (sortModel && sortModel.length > 0 && 
        gridRef.current && 
        gridRef.current.api && 
        typeof gridRef.current.api.setSortModel === 'function') {
      setTimeout(() => {
        try {
          gridRef.current.api.setSortModel(sortModel);
        } catch (err) {
          console.warn('Error setting sort model:', err);
        }
      }, 100); // Increased timeout to ensure filter is applied first
    }
    
    // Update filter status with more descriptive messages
    if (filterType === 'all') {
      setFilterStatus('Showing all items');
    } else if (filterType === 'today') {
      setFilterStatus('Filtered: Today\'s items only');
    } else if (filterType === 'upcoming') {
      setFilterStatus('Filtered: Future items only');
    } else if (filterType === 'past') {
      setFilterStatus('Filtered: Past items only');
    } else {
      setFilterStatus(`Custom filter applied: ${filterType}`);
    }
    
    // URL update will be handled by AG Grid's filterChanged event
    // No need to manually update it here
  }, [applyFilters]);
  
  // Explicitly save filter state to URL
  const saveFilterState = useCallback(() => {
    if (!gridApi || typeof gridApi.getFilterModel !== 'function') {
      console.warn('Grid API not available or missing getFilterModel method');
      return;
    }
    
    try {
      const filterModel = gridApi.getFilterModel();
      const serializedModel = serializeFilterModel(filterModel);
      const hasFilters = Object.keys(filterModel).length > 0;
      
      if (hasFilters) {
        // Update URL and show confirmation
        updateUrlWithFilterState(filterModel);
        const activeColumns = Object.keys(serializedModel).join(', ');
        alert(`Filter state saved to URL.\nActive filters on: ${activeColumns}`);
        setFilterStatus('Filter saved to URL');
      } else {
        alert('No active filters to save');
        setFilterStatus('No filter applied');
      }
    } catch (err) {
      console.error('Error saving filter state:', err);
      alert('An error occurred while saving filter state');
    }
  }, [gridApi]);
  
  // Explicitly load filter state from URL
  const loadFilterState = useCallback(() => {
    if (!gridApi || 
        typeof gridApi.getFilterModel !== 'function' || 
        typeof gridApi.setFilterModel !== 'function') {
      console.warn('Grid API not available or missing required methods');
      return;
    }
    
    try {
      // Save current sort model if the method exists
      let sortModel = null;
      if (typeof gridApi.getSortModel === 'function') {
        sortModel = gridApi.getSortModel();
      }
      
      // Get filter from URL
      const filterModel = loadFilterStateFromUrl();
      
      if (filterModel) {
        // Apply filter model
        gridApi.setFilterModel(filterModel);
        
        // Restore sort model if available
        if (sortModel && 
            sortModel.length > 0 && 
            typeof gridApi.setSortModel === 'function') {
          gridApi.setSortModel(sortModel);
        }
        
        setFilterStatus('Filter loaded from URL');
      } else {
        alert('No filter state found in URL');
        setFilterStatus('No filter applied');
      }
    } catch (error) {
      console.error('Error loading filter state:', error);
      alert('Error loading filter state from URL');
      setFilterStatus('Failed to load filter');
    }
  }, [gridApi]);
  
  return (
    <div style={{ 
      backgroundColor: '#f8fafc', 
      minHeight: '100vh',
      backgroundImage: 'linear-gradient(to bottom, #ffffff, #f8fafc)',
      paddingBottom: '3rem'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '2rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>AG Grid with Custom Date Filter</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-end' }}>
            {/* Status display with improved styling */}
            <div style={{ 
              fontSize: '0.875rem', 
              color: '#4b5563', 
              backgroundColor: '#ffffff', 
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: '1px solid #e5e7eb',
              marginBottom: '0.25rem',
              minWidth: '280px',
              textAlign: 'center',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
            }}>
              <span style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>Status:</span> 
              <span style={{ 
                color: filterStatus.includes('No filter') ? '#6b7280' : '#1f2937',
                fontWeight: filterStatus.includes('No filter') ? 'normal' : 'medium'
              }}>
                {filterStatus}
              </span>
            </div>
            
            {/* Filter button row with improved styling - removed unnecessary buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <button
                onClick={() => applyFilter('all')}
                style={{ 
                  padding: '0.6rem 1.2rem', 
                  backgroundColor: '#104ada', 
                  color: 'white', 
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#0e3bbb';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#104ada';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ marginRight: '0.25rem' }}>🔄</span> All Items
              </button>
              
              <button
                onClick={() => applyFilter('today')}
                style={{ 
                  padding: '0.6rem 1.2rem', 
                  backgroundColor: '#1457e2', 
                  color: 'white', 
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#124ac9';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#1457e2';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ marginRight: '0.25rem' }}>📅</span> Today's Items
              </button>
              
              <button
                onClick={() => applyFilter('upcoming')}
                style={{ 
                  padding: '0.6rem 1.2rem', 
                  backgroundColor: '#1967F2', 
                  color: 'white', 
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#1655d4';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#1967F2';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ marginRight: '0.25rem' }}>⏩</span> Upcoming Items
              </button>
              
              <button
                onClick={() => applyFilter('past')}
                style={{ 
                  padding: '0.6rem 1.2rem', 
                  backgroundColor: '#0d3dc6', 
                  color: 'white', 
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#0b33a7';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#0d3dc6';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ marginRight: '0.25rem' }}>⏪</span> Past Items
              </button>
            </div>
          </div>
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '0.75rem', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', 
          overflow: 'hidden',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ 
            padding: '0.75rem 1rem', 
            borderBottom: '1px solid #e5e7eb', 
            backgroundColor: '#f1f5f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ 
              fontSize: '1rem', 
              fontWeight: '600', 
              color: '#111827',
              margin: 0
            }}>
              Data Grid with Custom Date Filtering
            </h3>
            <div style={{ 
              fontSize: '0.875rem', 
              color: '#4b5563'
            }}>
              Use Column Tool Panel for advanced grouping options
            </div>
          </div>
          <div 
            // className="ag-theme-quartz" 
            style={{ 
              height: '600px', 
              width: '100%',
              // '--ag-borders': 'solid',
              // '--ag-font-size': '13px',
              // '--ag-border-radius': '4px',
              // '--ag-cell-horizontal-padding': '16px',
              // '--ag-foreground-color': '#f8f9fa',
              // '--ag-background-color': '#1a3c8f',
              // '--ag-header-foreground-color': '#ffffff',
              // '--ag-header-background-color': '#1e429f',
              // '--ag-odd-row-background-color': '#2e4fac',
              // '--ag-control-panel-background-color': '#1a3c8f',
              // '--ag-subheader-background-color': '#1e429f',
              // '--ag-selected-row-background-color': '#2f55bd',
              // '--ag-row-hover-color': '#3a5cca',
              // '--ag-input-border-color': '#3a5cca',
              // '--ag-input-focus-border-color': '#3a5cca',
              // '--ag-alpine-active-color': '#2185d0',
              // '--ag-range-selection-border-color': '#5a99e3',
              // '--ag-range-selection-background-color': 'rgba(33, 133, 208, 0.2)',
              // '--ag-input-focus-box-shadow': '0 0 2px 0.125rem rgba(33, 133, 208, 0.4)',
              // '--ag-disabled-foreground-color': 'rgba(255, 255, 255, 0.5)',
              // '--ag-chip-background-color': '#1e3a8a',
              // '--ag-input-disabled-background-color': 'rgba(255, 255, 255, 0.1)',
              // '--ag-border-color': '#2a4cad',
              // '--ag-secondary-border-color': '#1e429f',
              // '--ag-secondary-foreground-color': 'rgba(255, 255, 255, 0.6)',
              // '--ag-modal-overlay-background-color': 'rgba(26, 60, 143, 0.66)'
            }}>
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              autoGroupColumnDef={autoGroupColumnDef}
              onGridReady={onGridReady}
              pagination={true}
              paginationPageSize={20}
              modules={[AllEnterpriseModule]}
              theme={darkBlueTheme}
              sideBar={sideBar}
              rowSelection={{ mode: 'multiRow', type: 'multiple' }}
              cellSelection={true}
              animateRows={true}
              // Row grouping configuration - remove top panel but keep functionality
              rowGroupPanelShow="never"
              suppressDragLeaveHidesColumns={false}
              // Add grand total row at the bottom of the grid
              grandTotalRow="bottom"
              // Add group total rows at the bottom of each group
              groupTotalRow="bottom"
              // Sort/filter events
              onSortChanged={(e) => {
                if (gridRef.current && 
                    gridRef.current.api && 
                    typeof gridRef.current.api.getSortModel === 'function') {
                  try {
                    setLastSortModel(gridRef.current.api.getSortModel() || []);
                  } catch (err) {
                    console.warn('Error getting sort model during sort change:', err);
                  }
                }
              }}
              // Enterprise features
              groupDefaultExpanded={1}
              groupDisplayType="multipleColumns"
            />
          </div>
        </div>
        
        <div style={{ 
          marginTop: '2rem', 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '0.75rem', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Demo Features & Usage Guide</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#1f2937', marginBottom: '0.5rem' }}>Custom Date Filtering</h3>
              <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>Two powerful ways to filter date columns:</p>
              
              <h4 style={{ fontSize: '1rem', fontWeight: '500', color: '#374151', marginTop: '1rem', marginBottom: '0.5rem' }}>Absolute Mode</h4>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#374151' }}>
                <li>Choose "Equals", "Not Equal", "Before", "After", or "In Range"</li>
                <li>Select specific dates using the date picker</li>
                <li>For date ranges, select both start and end dates</li>
              </ul>
              
              <h4 style={{ fontSize: '1rem', fontWeight: '500', color: '#374151', marginTop: '1rem', marginBottom: '0.5rem' }}>Relative Mode</h4>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#374151' }}>
                <li><code style={{ backgroundColor: '#f3f4f6', padding: '0.125rem 0.25rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>Today</code> - References the current date</li>
                <li><code style={{ backgroundColor: '#f3f4f6', padding: '0.125rem 0.25rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>Today+7d</code> - 7 days from today</li>
                <li><code style={{ backgroundColor: '#f3f4f6', padding: '0.125rem 0.25rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>Today-3m</code> - 3 months ago</li>
                <li><code style={{ backgroundColor: '#f3f4f6', padding: '0.125rem 0.25rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>Today+1y</code> - 1 year from today</li>
                <li>Units: <code style={{ backgroundColor: '#f3f4f6', padding: '0.125rem 0.25rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>d</code> (days), <code style={{ backgroundColor: '#f3f4f6', padding: '0.125rem 0.25rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>w</code> (weeks), <code style={{ backgroundColor: '#f3f4f6', padding: '0.125rem 0.25rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>m</code> (months), <code style={{ backgroundColor: '#f3f4f6', padding: '0.125rem 0.25rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>y</code> (years)</li>
              </ul>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#1f2937', marginBottom: '0.5rem' }}>Quick Filters</h3>
              <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>Access convenient pre-built filters with a single click:</p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#374151' }}>
                <li><strong>All Items</strong> - Shows all data with no date filters</li>
                <li><strong>Today's Items</strong> - Shows only items with today's date</li>
                <li><strong>Upcoming Items</strong> - Shows items with future dates</li>
                <li><strong>Past Items</strong> - Shows items with dates before today</li>
              </ul>
              
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#1f2937', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Data Aggregation</h3>
              <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>Analyze data with powerful aggregation features:</p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#374151' }}>
                <li><strong>Grand Total Row</strong> - Shows the sum of all 'Value' entries at the grid bottom</li>
                <li><strong>Group Total Rows</strong> - When grouping by category, priority, or status, subtotals are shown for each group</li>
                <li><strong>Row Grouping</strong> - Drag column headers to the row groups area to organize data</li>
              </ul>
            </div>
          </div>
          
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#1f2937', marginBottom: '0.5rem' }}>Advanced Features</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Filter Tool Panel</h4>
                <p style={{ color: '#4b5563' }}>
                  Use the filter tool panel on the right to manage multiple filters across different columns.
                  The panel is always visible for easy access to all filter options.
                </p>
              </div>
              
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Row Grouping & Aggregation</h4>
                <p style={{ color: '#4b5563' }}>
                  Drag column headers to the "Row Groups" area at the top of the grid to group data.
                  Value column will automatically show subtotals for each group.
                </p>
              </div>
            </div>
            
            <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280', padding: '0.5rem', backgroundColor: '#f9fafb', borderRadius: '0.25rem' }}>
              <p style={{ marginBottom: '0.25rem' }}><strong>Filter Status Display:</strong> The status field at the top right of the demo shows your current filter state, including custom filters.</p>
              <p>This demo showcases the custom Relative Date Filter component integrated with AG Grid's powerful Enterprise features.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Render the application
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);