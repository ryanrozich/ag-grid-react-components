import React, { useState, useCallback, useMemo, useEffect } from 'react';
// NOTE: In ag-grid v33, this is the correct import path
import { useGridFilter } from 'ag-grid-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { 
  DateFilterType, 
  DateFilterMode, 
  DateFilterModel, 
  DateFilterParams
} from './interfaces';
import { 
  parseDateExpression, 
  resolveDateExpression 
} from '../utils/dateExpressionParser';

// CSS is imported at the root level

const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';

const RelativeDateFilter = (props: DateFilterParams) => {
  // Use the model from props or create initial state
  const initialModel = props.model || null;
  
  // Filter state
  const [filterType, setFilterType] = useState<DateFilterType>(initialModel?.type || 'equals');
  const [filterMode, setFilterMode] = useState<DateFilterMode>(initialModel?.mode || props.defaultMode || 'absolute');
  
  // Date values
  const [absoluteDateFrom, setAbsoluteDateFrom] = useState<Date | null>(
    filterMode === 'absolute' && initialModel?.dateFrom ? initialModel.dateFrom : null
  );
  const [absoluteDateTo, setAbsoluteDateTo] = useState<Date | null>(
    filterMode === 'absolute' && initialModel?.dateTo ? initialModel.dateTo : null
  );
  
  // Expression values
  const [expressionFrom, setExpressionFrom] = useState<string>(
    filterMode === 'relative' && initialModel?.expressionFrom ? initialModel.expressionFrom : ''
  );
  const [expressionTo, setExpressionTo] = useState<string>(
    filterMode === 'relative' && initialModel?.expressionTo ? initialModel.expressionTo : ''
  );
  
  // Validation and resolution
  const [fromExpressionValid, setFromExpressionValid] = useState<boolean>(true);
  const [toExpressionValid, setToExpressionValid] = useState<boolean>(true);
  const [fromExpressionError, setFromExpressionError] = useState<string>('');
  const [toExpressionError, setToExpressionError] = useState<string>('');

  // Date format from props or default
  const dateFormat = props.dateFormat || DEFAULT_DATE_FORMAT;

  // Parse cell values to date
  const parseValue = useCallback((value: any): Date | null => {
    if (props.dateParser) {
      return props.dateParser(value);
    }
    
    if (value instanceof Date) {
      return value;
    }
    
    if (typeof value === 'string' || typeof value === 'number') {
      const date = new Date(value);
      return isNaN(date.getTime()) ? null : date;
    }
    
    return null;
  }, [props.dateParser]);

  // Resolved dates based on expressions
  const resolvedDateFrom = useMemo(() => {
    return filterMode === 'relative' && expressionFrom 
      ? resolveDateExpression(expressionFrom) 
      : null;
  }, [filterMode, expressionFrom]);

  const resolvedDateTo = useMemo(() => {
    return filterMode === 'relative' && expressionTo 
      ? resolveDateExpression(expressionTo) 
      : null;
  }, [filterMode, expressionTo]);

  // Effective dates based on mode
  const effectiveDateFrom = useMemo(() => {
    return filterMode === 'absolute' ? absoluteDateFrom : resolvedDateFrom;
  }, [filterMode, absoluteDateFrom, resolvedDateFrom]);

  const effectiveDateTo = useMemo(() => {
    return filterMode === 'absolute' ? absoluteDateTo : resolvedDateTo;
  }, [filterMode, absoluteDateTo, resolvedDateTo]);

  // Validate expressions
  const validateFromExpression = useCallback((expression: string) => {
    if (!expression) {
      setFromExpressionValid(true);
      setFromExpressionError('');
      return true;
    }
    
    const result = parseDateExpression(expression);
    setFromExpressionValid(result.isValid);
    setFromExpressionError(result.error || '');
    return result.isValid;
  }, []);

  const validateToExpression = useCallback((expression: string) => {
    if (!expression) {
      setToExpressionValid(true);
      setToExpressionError('');
      return true;
    }
    
    const result = parseDateExpression(expression);
    setToExpressionValid(result.isValid);
    setToExpressionError(result.error || '');
    return result.isValid;
  }, []);

  // Check if filter is valid
  const isFilterValid = useMemo(() => {
    if (filterMode === 'relative') {
      if (filterType === 'inRange') {
        return fromExpressionValid && toExpressionValid && 
               (!!expressionFrom || !!expressionTo) &&
               (!!resolvedDateFrom || !!resolvedDateTo);
      } else {
        return fromExpressionValid && !!expressionFrom && !!resolvedDateFrom;
      }
    } else {
      if (filterType === 'inRange') {
        return (!!absoluteDateFrom || !!absoluteDateTo);
      } else {
        return !!absoluteDateFrom;
      }
    }
  }, [
    filterMode, filterType, 
    fromExpressionValid, toExpressionValid, 
    expressionFrom, expressionTo, 
    resolvedDateFrom, resolvedDateTo,
    absoluteDateFrom, absoluteDateTo
  ]);

  // Build current model
  const currentModel: DateFilterModel | null = useMemo(() => {
    if (!isFilterValid) return null;
    
    // Get default inclusivity settings from props
    const fromInclusive = filterType === 'after' 
      ? props.afterInclusive 
      : props.rangeInclusive?.from;
    
    const toInclusive = filterType === 'before'
      ? props.beforeInclusive
      : props.rangeInclusive?.to;
    
    return {
      type: filterType,
      mode: filterMode,
      dateFrom: filterMode === 'absolute' ? absoluteDateFrom : resolvedDateFrom,
      dateTo: filterMode === 'absolute' ? absoluteDateTo : resolvedDateTo,
      expressionFrom: filterMode === 'relative' ? expressionFrom : undefined,
      expressionTo: filterMode === 'relative' ? expressionTo : undefined,
      fromInclusive: fromInclusive,
      toInclusive: toInclusive
    };
  }, [
    isFilterValid, filterType, filterMode, 
    absoluteDateFrom, absoluteDateTo, 
    resolvedDateFrom, resolvedDateTo, 
    expressionFrom, expressionTo,
    props.afterInclusive, props.beforeInclusive, props.rangeInclusive
  ]);

  // Model as string for floating filter
  const getModelAsString = useCallback((): string => {
    if (!currentModel) return '';
    
    // Get inclusivity settings from model
    const fromInclusive = currentModel.fromInclusive ?? false;
    const toInclusive = currentModel.toInclusive ?? false;
    
    if (currentModel.mode === 'absolute') {
      if (currentModel.type === 'inRange' && currentModel.dateFrom && currentModel.dateTo) {
        const fromBracket = fromInclusive ? '[' : '(';
        const toBracket = toInclusive ? ']' : ')';
        return `${fromBracket}${format(currentModel.dateFrom, dateFormat)} to ${format(currentModel.dateTo, dateFormat)}${toBracket}`;
      } else if (currentModel.dateFrom) {
        let prefix = '';
        switch (currentModel.type) {
          case 'equals': prefix = '='; break;
          case 'notEqual': prefix = '≠'; break;
          case 'after': prefix = fromInclusive ? '≥' : '>'; break;
          case 'before': prefix = toInclusive ? '≤' : '<'; break;
        }
        return `${prefix} ${format(currentModel.dateFrom, dateFormat)}`;
      }
    } else {
      if (currentModel.type === 'inRange' && currentModel.expressionFrom && currentModel.expressionTo) {
        const fromBracket = fromInclusive ? '[' : '(';
        const toBracket = toInclusive ? ']' : ')';
        return `${fromBracket}${currentModel.expressionFrom} to ${currentModel.expressionTo}${toBracket}`;
      } else if (currentModel.expressionFrom) {
        let prefix = '';
        switch (currentModel.type) {
          case 'equals': prefix = '='; break;
          case 'notEqual': prefix = '≠'; break;
          case 'after': prefix = fromInclusive ? '≥' : '>'; break;
          case 'before': prefix = toInclusive ? '≤' : '<'; break;
        }
        return `${prefix} ${currentModel.expressionFrom}`;
      }
    }
    
    return '';
  }, [currentModel, dateFormat]);

  // Filter implementation
  const doesFilterPass = useCallback(({ node }: { node: any }) => {
    if (!isFilterValid || !currentModel) return true;
    
    const cellValue = props.getValue(node);
    const cellDate = parseValue(cellValue);
    
    if (!cellDate) return false;
    
    // Normalize dates for comparison (remove time component)
    const normalizedCellDate = new Date(cellDate);
    normalizedCellDate.setHours(0, 0, 0, 0);
    
    let normalizedDateFrom = null;
    if (effectiveDateFrom) {
      normalizedDateFrom = new Date(effectiveDateFrom);
      normalizedDateFrom.setHours(0, 0, 0, 0);
    }
    
    let normalizedDateTo = null;
    if (effectiveDateTo) {
      normalizedDateTo = new Date(effectiveDateTo);
      normalizedDateTo.setHours(0, 0, 0, 0);
    }
    
    // Get inclusivity settings from model or fall back to props defaults
    const fromInclusive = currentModel.fromInclusive ?? false;
    const toInclusive = currentModel.toInclusive ?? false;
    
    switch (filterType) {
      case 'equals':
        return normalizedDateFrom 
          ? normalizedCellDate.getTime() === normalizedDateFrom.getTime() 
          : false;
      
      case 'notEqual':
        return normalizedDateFrom 
          ? normalizedCellDate.getTime() !== normalizedDateFrom.getTime() 
          : true;
      
      case 'after':
        return normalizedDateFrom 
          ? fromInclusive
            ? normalizedCellDate.getTime() >= normalizedDateFrom.getTime() 
            : normalizedCellDate.getTime() > normalizedDateFrom.getTime() 
          : false;
      
      case 'before':
        return normalizedDateFrom 
          ? toInclusive
            ? normalizedCellDate.getTime() <= normalizedDateFrom.getTime() 
            : normalizedCellDate.getTime() < normalizedDateFrom.getTime() 
          : false;
      
      case 'inRange':
        const fromPass = !normalizedDateFrom || (
          fromInclusive 
            ? normalizedCellDate.getTime() >= normalizedDateFrom.getTime()
            : normalizedCellDate.getTime() > normalizedDateFrom.getTime()
        );
        
        const toPass = !normalizedDateTo || (
          toInclusive
            ? normalizedCellDate.getTime() <= normalizedDateTo.getTime()
            : normalizedCellDate.getTime() < normalizedDateTo.getTime()
        );
        
        return fromPass && toPass;
      
      default:
        return false;
    }
  }, [
    isFilterValid, currentModel, props.getValue, 
    filterType, effectiveDateFrom, effectiveDateTo, parseValue
  ]);

  // This function is no longer needed since we directly call props.onModelChange
  // in the applyFilter function

  // Handle expression changes - only validate, don't apply filter automatically
  const handleFromExpressionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setExpressionFrom(value);
    validateFromExpression(value);
    // No longer applying filter automatically
  }, [validateFromExpression]);

  const handleToExpressionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setExpressionTo(value);
    validateToExpression(value);
    // No longer applying filter automatically
  }, [validateToExpression]);
  
//handleKeyDown has been moved after applyFilter

  // Toggle filter mode
  const toggleFilterMode = useCallback(() => {
    setFilterMode(prevMode => prevMode === 'absolute' ? 'relative' : 'absolute');
  }, []);

  // Handle type change
  const handleTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value as DateFilterType);
  }, []);

  // Apply the filter - declare this early so other functions can reference it
  const applyFilter = useCallback(() => {
    if (!isFilterValid) return;
    
    // In v33, we call onModelChange directly with our model
    if (props.onModelChange) {
      props.onModelChange(currentModel);
      console.log('Filter model applied:', currentModel);
    }
  }, [isFilterValid, currentModel, props.onModelChange]);
  
  // Handle key press to apply filter on Enter - moved here to have access to applyFilter
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isFilterValid) {
      e.preventDefault();
      applyFilter();
    }
  }, [isFilterValid, applyFilter]);

  // Reset the filter
  const resetFilter = useCallback(() => {
    setFilterType('equals');
    setAbsoluteDateFrom(null);
    setAbsoluteDateTo(null);
    setExpressionFrom('');
    setExpressionTo('');
    setFromExpressionValid(true);
    setToExpressionValid(true);
    setFromExpressionError('');
    setToExpressionError('');
    
    // Notify with null model
    if (props.onModelChange) {
      props.onModelChange(null);
      console.log('Filter reset');
    }
  }, [props.onModelChange]);

  // React to model changes from AG Grid
  useEffect(() => {
    // Add debug log to help troubleshoot
    console.log('Filter props received:', props);
    
    if (props.model) {
      // Update filter state based on model
      setFilterType(props.model.type || 'equals');
      setFilterMode(props.model.mode || 'absolute');
      
      if (props.model.mode === 'absolute') {
        setAbsoluteDateFrom(props.model.dateFrom || null);
        setAbsoluteDateTo(props.model.dateTo || null);
      } else {
        setExpressionFrom(props.model.expressionFrom || '');
        setExpressionTo(props.model.expressionTo || '');
      }
    }
  }, [props.model]);
  
  // Handle rows being loaded or changed
  const onNewRowsLoaded = useCallback(() => {
    console.log('New rows loaded');
    // No specific actions needed for relative date filter
  }, []);
  
  // Handle changes in any other filter
  const onAnyFilterChanged = useCallback(() => {
    console.log('Other filters changed');
    // No specific actions needed for relative date filter
  }, []);
  
  // Called after the GUI has been attached
  const afterGuiAttached = useCallback(() => {
    console.log('Filter GUI attached');
    // Focus on the first input if appropriate
  }, []);
  
  // Called before the GUI is detached
  const afterGuiDetached = useCallback(() => {
    console.log('Filter GUI detached');
    // Cleanup if needed
  }, []);

  // Helper to serialize date values when JSON.stringify is called on the model
  const getSerializableModel = useCallback(() => {
    if (!currentModel) return null;
    
    // Create a serializable version of the model
    const serializableModel = {
      ...currentModel,
      // Convert Date objects to ISO strings
      dateFrom: currentModel.dateFrom ? currentModel.dateFrom.toISOString() : null,
      dateTo: currentModel.dateTo ? currentModel.dateTo.toISOString() : null
    };
    
    return serializableModel;
  }, [currentModel]);
  
  // Deserialize a model from external state (e.g., URL parameters)
  const deserializeModel = useCallback((model: any): DateFilterModel | null => {
    if (!model) return null;
    
    // Convert ISO strings back to Date objects
    return {
      ...model,
      dateFrom: model.dateFrom ? new Date(model.dateFrom) : null,
      dateTo: model.dateTo ? new Date(model.dateTo) : null,
      // Ensure inclusivity properties are preserved
      fromInclusive: model.fromInclusive ?? false,
      toInclusive: model.toInclusive ?? false
    };
  }, []);
  
  // Register filter with AG Grid
  // For v33, we need to provide these callbacks
  const callbacks = {
    // Required callback that determines if a row passes the current filter
    doesFilterPass,
    
    // Optional callbacks for AG Grid to interact with our filter
    getModelAsString,
    
    // Handle when new rows are loaded
    onNewRowsLoaded,
    
    // Handle when any other filter changes
    onAnyFilterChanged,
    
    // Lifecycle hooks for GUI attachment/detachment
    afterGuiAttached,
    afterGuiDetached,
    
    // In AG Grid v33, returning null model means filter is not active
    // Return a serializable model that handles Date objects
    getModel: useCallback(() => getSerializableModel(), [getSerializableModel]),
    
    // AG Grid v33 provides the model to us when it wants to update the filter state externally
    setModel: useCallback((model: any) => {
      console.log('setModel called with:', model);
      if (!model) {
        resetFilter();
        return;
      }
      
      // Deserialize the model first to ensure Date objects are properly handled
      const deserializedModel = deserializeModel(model);
      
      setFilterType(deserializedModel.type || 'equals');
      setFilterMode(deserializedModel.mode || 'absolute');
      
      if (deserializedModel.mode === 'absolute') {
        setAbsoluteDateFrom(deserializedModel.dateFrom || null);
        setAbsoluteDateTo(deserializedModel.dateTo || null);
      } else {
        setExpressionFrom(deserializedModel.expressionFrom || '');
        setExpressionTo(deserializedModel.expressionTo || '');
      }
      
      // Note: We don't need to explicitly set fromInclusive and toInclusive
      // as they will be picked up when building the currentModel
    }, [resetFilter, deserializeModel]),
    
    // Required by AG Grid for all filters in v33
    isFilterActive: useCallback(() => {
      return isFilterValid && currentModel !== null;
    }, [isFilterValid, currentModel]),
    
    // For AG Grid v33, this is needed for UI display and menu interactions
    // Critical for proper filter menu behavior
    onUiChanged: useCallback(() => {
      console.log('Filter UI changed');
      // This callback is triggered when AG Grid detects a UI component change
      // We don't need to do anything special here, but it must be defined
    }, []),
    
    // AG Grid v33 destroys and recreates filters frequently,
    // this ensures proper cleanup when the filter is destroyed
    onFilterDestroyed: useCallback(() => {
      console.log('Filter destroyed');
      // Any cleanup needed when the filter component is destroyed
    }, [])
  };
  
  // Register our callbacks with AG Grid
  useGridFilter(callbacks);

  // In v33, filter button clicks should automatically trigger our filter
  // adding extra logging to help debug
  useEffect(() => {
    console.log('RelativeDateFilter mounted with props:', props);
  }, []);

  // Log when component renders
  console.log('RelativeDateFilter rendering, props:', props);

  return (
    <div className="ag-grid-date-filter p-4" data-test-id="relative-date-filter">
      <div className="filter-type-section" style={{ marginBottom: '1rem' }}>
        <label className="filter-label" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Filter Type</label>
        <select 
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={filterType}
          onChange={handleTypeChange}
          style={{ width: '100%' }}
        >
          <option value="equals">Equals</option>
          <option value="notEqual">Not Equal</option>
          <option value="after">After</option>
          <option value="before">Before</option>
          <option value="inRange">In Range</option>
        </select>
      </div>
      
      <div className="filter-mode-section" style={{ marginBottom: '1rem' }}>
        <label className="filter-label" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Date Mode</label>
        <div className="date-mode-selector" style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '0.375rem', overflow: 'hidden' }}>
          <div
            className={`date-mode-option ${filterMode === 'absolute' ? 'selected' : ''}`}
            style={{ 
              flex: '1',
              padding: '0.5rem',
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: filterMode === 'absolute' ? '#2563eb' : '#f9fafb',
              color: filterMode === 'absolute' ? '#ffffff' : '#374151',
              fontWeight: filterMode === 'absolute' ? '600' : '400',
              transition: 'background-color 0.2s, color 0.2s',
              userSelect: 'none'
            }}
            onClick={() => filterMode !== 'absolute' && toggleFilterMode()}
          >
            Specific Date
          </div>
          <div
            className={`date-mode-option ${filterMode === 'relative' ? 'selected' : ''}`}
            style={{ 
              flex: '1',
              padding: '0.5rem',
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: filterMode === 'relative' ? '#2563eb' : '#f9fafb',
              color: filterMode === 'relative' ? '#ffffff' : '#374151',
              fontWeight: filterMode === 'relative' ? '600' : '400',
              transition: 'background-color 0.2s, color 0.2s',
              userSelect: 'none'
            }}
            onClick={() => filterMode !== 'relative' && toggleFilterMode()}
          >
            Relative Date
          </div>
        </div>
      </div>
      
      <div className="filter-content" style={{ minHeight: '200px', width: '100%' }}>
        {filterMode === 'absolute' ? (
        <div className="absolute-mode">
          <label className="filter-label" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
            {filterType === 'inRange' ? 'Date Range' : 'Date'}
          </label>
          <div style={{ display: 'flex', gap: '0.75rem', flexDirection: filterType === 'inRange' ? 'row' : 'column' }}>
            <div className="input-wrapper" style={{ flex: '1' }}>
              {filterType === 'inRange' && <span style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem', display: 'block' }}>From:</span>}
              <DatePicker
                selected={absoluteDateFrom}
                onChange={date => {
                  setAbsoluteDateFrom(date);
                  // Don't apply filter automatically - wait for Apply button
                }}
                dateFormat={dateFormat}
                placeholderText="Select date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                minDate={props.minDate}
                maxDate={props.maxDate}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && isFilterValid) {
                    e.preventDefault();
                    applyFilter();
                  }
                }}
                inline
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                popperClassName="date-picker-popper-from"
                popperProps={{
                  strategy: 'absolute',
                }}
                popperPlacement="bottom-start"
                popperModifiers={[
                  {
                    name: 'offset',
                    options: {
                      offset: [0, 5],
                    },
                  },
                  {
                    name: 'preventOverflow',
                    options: {
                      boundary: 'viewport',
                      padding: 8,
                    },
                  },
                ]}
              />
            </div>
            
            {filterType === 'inRange' && (
              <div className="input-wrapper" style={{ flex: '1' }}>
                <span style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem', display: 'block' }}>To:</span>
                <DatePicker
                  selected={absoluteDateTo}
                  onChange={date => {
                    setAbsoluteDateTo(date);
                    // Don't apply filter automatically - wait for Apply button
                  }}
                  dateFormat={dateFormat}
                  placeholderText="Select end date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  minDate={props.minDate}
                  maxDate={props.maxDate}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && isFilterValid) {
                      e.preventDefault();
                      applyFilter();
                    }
                  }}
                  inline
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  popperClassName="date-picker-popper-to"
                  popperProps={{
                    strategy: 'absolute',
                  }}
                  popperPlacement="bottom-start"
                  popperModifiers={[
                    {
                      name: 'offset',
                      options: {
                        offset: [0, 5],
                      },
                    },
                    {
                      name: 'preventOverflow',
                      options: {
                        boundary: 'viewport',
                        padding: 8,
                      },
                    },
                  ]}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="relative-mode" style={{ minHeight: '200px' }}>
          <div style={{ marginBottom: '0.75rem' }}>
            <label className="filter-label" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
              {filterType === 'inRange' ? 'Start Date Expression' : 'Date Expression'}
            </label>
            <input
              type="text"
              className="relative-date-input"
              value={expressionFrom}
              onChange={handleFromExpressionChange}
              onKeyDown={handleKeyDown}
              placeholder="e.g., Today, Today+7d, Today-1m"
            />
            <div style={{ minHeight: '1.25rem', marginTop: '0.25rem' }}>
              {!fromExpressionValid && (
                <div className="error-message">{fromExpressionError}</div>
              )}
              {fromExpressionValid && resolvedDateFrom && (
                <div className="resolved-date">
                  Resolves to: {format(resolvedDateFrom, dateFormat)}
                </div>
              )}
            </div>
          </div>
          
          {filterType === 'inRange' && (
            <div style={{ marginBottom: '0.75rem' }}>
              <label className="filter-label" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>End Date Expression</label>
              <input
                type="text"
                className="relative-date-input"
                value={expressionTo}
                onChange={handleToExpressionChange}
                onKeyDown={handleKeyDown}
                placeholder="e.g., Today+30d"
              />
              <div style={{ minHeight: '1.25rem', marginTop: '0.25rem' }}>
                {!toExpressionValid && (
                  <div className="error-message">{toExpressionError}</div>
                )}
                {toExpressionValid && resolvedDateTo && (
                  <div className="resolved-date">
                    Resolves to: {format(resolvedDateTo, dateFormat)}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="syntax-help" style={{ marginBottom: '0.75rem', backgroundColor: '#f8fafc', padding: '0.5rem', borderRadius: '0.375rem', fontSize: '0.75rem' }}>
            <div style={{ fontWeight: '500', marginBottom: '0.25rem', color: '#4b5563' }}>Syntax Examples:</div>
            <ul style={{ paddingLeft: '1rem', color: '#6b7280', margin: '0' }}>
              <li>Today</li>
              <li>Today+7d (7 days from today)</li>
              <li>Today-1m (1 month ago)</li>
              <li>Today+2w (2 weeks from today)</li>
              <li>Today+1y (1 year from today)</li>
            </ul>
          </div>
        </div>
      )}
      </div>
      
      <div className="filter-buttons" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <button 
          className="filter-button reset-button"
          onClick={resetFilter}
          type="button"
        >
          Reset
        </button>
        <button 
          className="filter-button apply-button"
          onClick={applyFilter}
          disabled={!isFilterValid}
          type="button"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default RelativeDateFilter;