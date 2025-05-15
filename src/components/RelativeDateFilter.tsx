import React, { useState, useCallback, useMemo } from 'react';
import { useGridFilter } from 'ag-grid-community';
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
    
    return {
      type: filterType,
      mode: filterMode,
      dateFrom: filterMode === 'absolute' ? absoluteDateFrom : resolvedDateFrom,
      dateTo: filterMode === 'absolute' ? absoluteDateTo : resolvedDateTo,
      expressionFrom: filterMode === 'relative' ? expressionFrom : undefined,
      expressionTo: filterMode === 'relative' ? expressionTo : undefined
    };
  }, [
    isFilterValid, filterType, filterMode, 
    absoluteDateFrom, absoluteDateTo, 
    resolvedDateFrom, resolvedDateTo, 
    expressionFrom, expressionTo
  ]);

  // Model as string for floating filter
  const getModelAsString = useCallback((): string => {
    if (!currentModel) return '';
    
    if (currentModel.mode === 'absolute') {
      if (currentModel.type === 'inRange' && currentModel.dateFrom && currentModel.dateTo) {
        return `${format(currentModel.dateFrom, dateFormat)} to ${format(currentModel.dateTo, dateFormat)}`;
      } else if (currentModel.dateFrom) {
        let prefix = '';
        switch (currentModel.type) {
          case 'equals': prefix = '='; break;
          case 'notEqual': prefix = '≠'; break;
          case 'greaterThan': prefix = '>'; break;
          case 'lessThan': prefix = '<'; break;
        }
        return `${prefix} ${format(currentModel.dateFrom, dateFormat)}`;
      }
    } else {
      if (currentModel.type === 'inRange' && currentModel.expressionFrom && currentModel.expressionTo) {
        return `${currentModel.expressionFrom} to ${currentModel.expressionTo}`;
      } else if (currentModel.expressionFrom) {
        let prefix = '';
        switch (currentModel.type) {
          case 'equals': prefix = '='; break;
          case 'notEqual': prefix = '≠'; break;
          case 'greaterThan': prefix = '>'; break;
          case 'lessThan': prefix = '<'; break;
        }
        return `${prefix} ${currentModel.expressionFrom}`;
      }
    }
    
    return '';
  }, [currentModel, dateFormat]);

  // Filter implementation
  const doesFilterPass = useCallback(({ node }) => {
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
    
    switch (filterType) {
      case 'equals':
        return normalizedDateFrom 
          ? normalizedCellDate.getTime() === normalizedDateFrom.getTime() 
          : false;
      
      case 'notEqual':
        return normalizedDateFrom 
          ? normalizedCellDate.getTime() !== normalizedDateFrom.getTime() 
          : true;
      
      case 'greaterThan':
        return normalizedDateFrom 
          ? normalizedCellDate.getTime() > normalizedDateFrom.getTime() 
          : false;
      
      case 'lessThan':
        return normalizedDateFrom 
          ? normalizedCellDate.getTime() < normalizedDateFrom.getTime() 
          : false;
      
      case 'inRange':
        const fromPass = !normalizedDateFrom || normalizedCellDate.getTime() >= normalizedDateFrom.getTime();
        const toPass = !normalizedDateTo || normalizedCellDate.getTime() <= normalizedDateTo.getTime();
        return fromPass && toPass;
      
      default:
        return false;
    }
  }, [
    isFilterValid, currentModel, props.getValue, 
    filterType, effectiveDateFrom, effectiveDateTo, parseValue
  ]);

  // Notify AG Grid when model changes
  const notifyModelChange = useCallback(() => {
    if (props.onModelChange) {
      props.onModelChange(currentModel);
    }
  }, [props.onModelChange, currentModel]);

  // Handle expression changes
  const handleFromExpressionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setExpressionFrom(value);
    validateFromExpression(value);
  }, [validateFromExpression]);

  const handleToExpressionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setExpressionTo(value);
    validateToExpression(value);
  }, [validateToExpression]);

  // Toggle filter mode
  const toggleFilterMode = useCallback(() => {
    setFilterMode(prevMode => prevMode === 'absolute' ? 'relative' : 'absolute');
  }, []);

  // Handle type change
  const handleTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value as DateFilterType);
  }, []);

  // Apply the filter
  const applyFilter = useCallback(() => {
    if (!isFilterValid) return;
    notifyModelChange();
  }, [isFilterValid, notifyModelChange]);

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
    }
  }, [props.onModelChange]);

  // Register filter with AG Grid
  useGridFilter({
    doesFilterPass,
    getModelAsString,
    isFilterActive: () => !!currentModel
  });

  return (
    <div className="ag-grid-date-filter p-4">
      <div className="filter-header mb-3">
        <div className="filter-type mb-2">
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={filterType}
            onChange={handleTypeChange}
          >
            <option value="equals">Equals</option>
            <option value="notEqual">Not Equal</option>
            <option value="greaterThan">Greater Than</option>
            <option value="lessThan">Less Than</option>
            <option value="inRange">In Range</option>
          </select>
        </div>
        
        <div className="filter-mode-toggle flex gap-2">
          <button 
            className={`toggle-button ${filterMode === 'absolute' ? 'active' : 'inactive'}`}
            onClick={toggleFilterMode}
            type="button"
          >
            Absolute
          </button>
          <button 
            className={`toggle-button ${filterMode === 'relative' ? 'active' : 'inactive'}`}
            onClick={toggleFilterMode}
            type="button"
          >
            Relative
          </button>
        </div>
      </div>
      
      {filterMode === 'absolute' ? (
        <div className="absolute-mode">
          <div className="input-wrapper">
            <DatePicker
              selected={absoluteDateFrom}
              onChange={date => setAbsoluteDateFrom(date)}
              dateFormat={dateFormat}
              placeholderText="Select date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              minDate={props.minDate}
              maxDate={props.maxDate}
            />
          </div>
          
          {filterType === 'inRange' && (
            <div className="input-wrapper">
              <DatePicker
                selected={absoluteDateTo}
                onChange={date => setAbsoluteDateTo(date)}
                dateFormat={dateFormat}
                placeholderText="Select end date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                minDate={props.minDate}
                maxDate={props.maxDate}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="relative-mode">
          <div className="input-wrapper">
            <input
              type="text"
              className="relative-date-input"
              value={expressionFrom}
              onChange={handleFromExpressionChange}
              placeholder="e.g., Today, Today+7d, Today-1m"
            />
            {!fromExpressionValid && (
              <div className="error-message">{fromExpressionError}</div>
            )}
            {fromExpressionValid && resolvedDateFrom && (
              <div className="resolved-date">
                Resolves to: {format(resolvedDateFrom, dateFormat)}
              </div>
            )}
          </div>
          
          {filterType === 'inRange' && (
            <div className="input-wrapper">
              <input
                type="text"
                className="relative-date-input"
                value={expressionTo}
                onChange={handleToExpressionChange}
                placeholder="e.g., Today+30d"
              />
              {!toExpressionValid && (
                <div className="error-message">{toExpressionError}</div>
              )}
              {toExpressionValid && resolvedDateTo && (
                <div className="resolved-date">
                  Resolves to: {format(resolvedDateTo, dateFormat)}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      <div className="filter-buttons">
        <button 
          className="filter-button apply-button"
          onClick={applyFilter}
          disabled={!isFilterValid}
          type="button"
        >
          Apply
        </button>
        <button 
          className="filter-button reset-button"
          onClick={resetFilter}
          type="button"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default RelativeDateFilter;