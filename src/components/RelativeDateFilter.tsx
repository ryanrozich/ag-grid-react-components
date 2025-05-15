import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { IDoesFilterPassParams } from 'ag-grid-community';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { 
  DateFilterType, 
  DateFilterMode, 
  DateFilterModel, 
  DateFilterParams,
  IDateFilterComp
} from './interfaces';
import { 
  parseDateExpression, 
  resolveDateExpression 
} from '../utils/dateExpressionParser';

import '../index.css';

const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';

const RelativeDateFilter: React.FC<DateFilterParams> & IDateFilterComp = (props) => {
  // Main filter state
  const [filterType, setFilterType] = useState<DateFilterType>('equals');
  const [filterMode, setFilterMode] = useState<DateFilterMode>(props.defaultMode || 'absolute');
  
  // Date values
  const [absoluteDateFrom, setAbsoluteDateFrom] = useState<Date | null>(null);
  const [absoluteDateTo, setAbsoluteDateTo] = useState<Date | null>(null);
  
  // Expression values
  const [expressionFrom, setExpressionFrom] = useState<string>('');
  const [expressionTo, setExpressionTo] = useState<string>('');
  
  // Validation and resolution
  const [fromExpressionValid, setFromExpressionValid] = useState<boolean>(true);
  const [toExpressionValid, setToExpressionValid] = useState<boolean>(true);
  const [fromExpressionError, setFromExpressionError] = useState<string>('');
  const [toExpressionError, setToExpressionError] = useState<string>('');
  
  // Filter state management
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  
  // References
  const filterChangedCallback = useRef(props.filterChangedCallback);
  
  // Update ref if callback changes
  useEffect(() => {
    filterChangedCallback.current = props.filterChangedCallback;
  }, [props.filterChangedCallback]);

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
      return;
    }
    
    const result = parseDateExpression(expression);
    setFromExpressionValid(result.isValid);
    setFromExpressionError(result.error || '');
  }, []);

  const validateToExpression = useCallback((expression: string) => {
    if (!expression) {
      setToExpressionValid(true);
      setToExpressionError('');
      return;
    }
    
    const result = parseDateExpression(expression);
    setToExpressionValid(result.isValid);
    setToExpressionError(result.error || '');
  }, []);

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

  // Apply the filter
  const applyFilter = useCallback(() => {
    if (!isFilterValid) return;
    
    setIsFilterActive(true);
    if (filterChangedCallback.current) {
      filterChangedCallback.current();
    }
  }, [isFilterValid]);

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
    setIsFilterActive(false);
    
    if (filterChangedCallback.current) {
      filterChangedCallback.current();
    }
  }, []);

  // Required AG Grid filter API implementation
  const isFilterActive = useCallback((): boolean => {
    return isFilterActive && isFilterValid;
  }, [isFilterActive, isFilterValid]);

  const doesFilterPass = useCallback((params: IDoesFilterPassParams): boolean => {
    if (!isFilterActive || !isFilterValid) return true;
    
    const cellValue = params.data[props.column.getColId()];
    const cellDate = parseValue(cellValue);
    
    if (!cellDate) return false;
    
    switch (filterType) {
      case 'equals':
        return effectiveDateFrom ? 
          cellDate.setHours(0, 0, 0, 0) === effectiveDateFrom.setHours(0, 0, 0, 0) : 
          false;
      
      case 'notEqual':
        return effectiveDateFrom ? 
          cellDate.setHours(0, 0, 0, 0) !== effectiveDateFrom.setHours(0, 0, 0, 0) : 
          true;
      
      case 'greaterThan':
        return effectiveDateFrom ? 
          cellDate.setHours(0, 0, 0, 0) > effectiveDateFrom.setHours(0, 0, 0, 0) : 
          false;
      
      case 'lessThan':
        return effectiveDateFrom ? 
          cellDate.setHours(0, 0, 0, 0) < effectiveDateFrom.setHours(0, 0, 0, 0) : 
          false;
      
      case 'inRange':
        const fromPass = !effectiveDateFrom || cellDate.setHours(0, 0, 0, 0) >= effectiveDateFrom.setHours(0, 0, 0, 0);
        const toPass = !effectiveDateTo || cellDate.setHours(0, 0, 0, 0) <= effectiveDateTo.setHours(0, 0, 0, 0);
        return fromPass && toPass;
      
      default:
        return false;
    }
  }, [
    isFilterActive, isFilterValid, props.column, filterType, 
    effectiveDateFrom, effectiveDateTo, parseValue
  ]);

  const getModel = useCallback((): DateFilterModel | null => {
    if (!isFilterActive) return null;
    
    return {
      type: filterType,
      mode: filterMode,
      dateFrom: filterMode === 'absolute' ? absoluteDateFrom : resolvedDateFrom,
      dateTo: filterMode === 'absolute' ? absoluteDateTo : resolvedDateTo,
      expressionFrom: filterMode === 'relative' ? expressionFrom : undefined,
      expressionTo: filterMode === 'relative' ? expressionTo : undefined
    };
  }, [
    isFilterActive, filterType, filterMode, 
    absoluteDateFrom, absoluteDateTo, 
    resolvedDateFrom, resolvedDateTo, 
    expressionFrom, expressionTo
  ]);

  const setModel = useCallback((model: DateFilterModel | null): void => {
    if (!model) {
      resetFilter();
      return;
    }
    
    setFilterType(model.type);
    setFilterMode(model.mode);
    
    if (model.mode === 'absolute') {
      setAbsoluteDateFrom(model.dateFrom || null);
      setAbsoluteDateTo(model.dateTo || null);
      setExpressionFrom('');
      setExpressionTo('');
    } else {
      setExpressionFrom(model.expressionFrom || '');
      setExpressionTo(model.expressionTo || '');
      validateFromExpression(model.expressionFrom || '');
      validateToExpression(model.expressionTo || '');
    }
    
    setIsFilterActive(true);
  }, [resetFilter, validateFromExpression, validateToExpression]);

  // AG Grid Filter API
  const api: IDateFilterComp = {
    isFilterActive,
    doesFilterPass,
    getModel,
    setModel,
    // Required by AG Grid interface
    afterGuiAttached: () => {},
    destroy: () => {},
  };

  // Attach API methods to component instance
  Object.assign(RelativeDateFilter, api);

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

// Ensure component has the required AG Grid filter methods
RelativeDateFilter.isFilterActive = () => false;
RelativeDateFilter.doesFilterPass = () => false;
RelativeDateFilter.getModel = () => null;
RelativeDateFilter.setModel = () => {};
RelativeDateFilter.afterGuiAttached = () => {};
RelativeDateFilter.destroy = () => {};

export default RelativeDateFilter;