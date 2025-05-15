import React, { useState, useEffect, useCallback } from 'react';
import { 
  IFloatingFilterParams,
  IFloatingFilter, 
  FilterChangedEvent
} from 'ag-grid-community';
import { format } from 'date-fns';
import { DateFilterModel, DateFilterType } from './interfaces';

interface RelativeDateFloatingFilterParams extends IFloatingFilterParams {
  suppressFilterButton?: boolean;
  dateFormat?: string;
}

const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';

const RelativeDateFloatingFilter: React.FC<RelativeDateFloatingFilterParams> & IFloatingFilter = (props) => {
  const [displayValue, setDisplayValue] = useState<string>('');
  const dateFormat = props.dateFormat || DEFAULT_DATE_FORMAT;

  // Create display text based on filter model
  const createDisplayValue = useCallback((model: DateFilterModel | null): string => {
    if (!model) return '';
    
    const { type, mode, dateFrom, dateTo, expressionFrom, expressionTo } = model;
    
    let typeText = '';
    switch (type) {
      case 'equals':
        typeText = '=';
        break;
      case 'notEqual':
        typeText = '≠';
        break;
      case 'greaterThan':
        typeText = '>';
        break;
      case 'lessThan':
        typeText = '<';
        break;
      case 'inRange':
        typeText = '';
        break;
    }
    
    if (mode === 'absolute') {
      if (type === 'inRange') {
        const fromText = dateFrom ? format(dateFrom, dateFormat) : '';
        const toText = dateTo ? format(dateTo, dateFormat) : '';
        
        if (fromText && toText) {
          return `${fromText} to ${toText}`;
        } else if (fromText) {
          return `≥ ${fromText}`;
        } else if (toText) {
          return `≤ ${toText}`;
        }
        return '';
      } else {
        return dateFrom ? `${typeText} ${format(dateFrom, dateFormat)}` : '';
      }
    } else { // Relative mode
      if (type === 'inRange') {
        if (expressionFrom && expressionTo) {
          return `${expressionFrom} to ${expressionTo}`;
        } else if (expressionFrom) {
          return `≥ ${expressionFrom}`;
        } else if (expressionTo) {
          return `≤ ${expressionTo}`;
        }
        return '';
      } else {
        return expressionFrom ? `${typeText} ${expressionFrom}` : '';
      }
    }
  }, [dateFormat]);

  // Update display when parent filter changes
  const onParentModelChanged = useCallback((parentModel: any) => {
    setDisplayValue(createDisplayValue(parentModel));
  }, [createDisplayValue]);

  // Listen for filter changes
  useEffect(() => {
    props.api.addEventListener('filterChanged', (event: FilterChangedEvent) => {
      const model = props.filterParams.filterParams.api.getFilterModel()[props.column.getColId()];
      onParentModelChanged(model);
    });
  }, [props.api, props.column, props.filterParams, onParentModelChanged]);

  return (
    <div className="ag-floating-filter-body">
      <div className="ag-floating-filter-input text-sm">
        {displayValue || 'No filter'}
      </div>
    </div>
  );
};

// Required AG Grid interface methods
RelativeDateFloatingFilter.onParentModelChanged = () => {};

export default RelativeDateFloatingFilter;