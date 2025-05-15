import React, { useState, useCallback } from 'react';
import { IFloatingFilterParams } from 'ag-grid-community';
import { format } from 'date-fns';
import { DateFilterModel } from './interfaces';

interface RelativeDateFloatingFilterParams extends IFloatingFilterParams {
  suppressFilterButton?: boolean;
  dateFormat?: string;
}

const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';

const RelativeDateFloatingFilter = (props: RelativeDateFloatingFilterParams) => {
  const [displayValue, setDisplayValue] = useState<string>('');
  const dateFormat = props.dateFormat || DEFAULT_DATE_FORMAT;

  // Update display when parent filter changes
  const onParentModelChanged = useCallback((parentModel: DateFilterModel | null) => {
    if (!parentModel) {
      setDisplayValue('');
      return;
    }
    
    const { type, mode, dateFrom, dateTo, expressionFrom, expressionTo } = parentModel;
    
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
          setDisplayValue(`${fromText} to ${toText}`);
        } else if (fromText) {
          setDisplayValue(`≥ ${fromText}`);
        } else if (toText) {
          setDisplayValue(`≤ ${toText}`);
        } else {
          setDisplayValue('');
        }
      } else {
        setDisplayValue(dateFrom ? `${typeText} ${format(dateFrom, dateFormat)}` : '');
      }
    } else { // Relative mode
      if (type === 'inRange') {
        if (expressionFrom && expressionTo) {
          setDisplayValue(`${expressionFrom} to ${expressionTo}`);
        } else if (expressionFrom) {
          setDisplayValue(`≥ ${expressionFrom}`);
        } else if (expressionTo) {
          setDisplayValue(`≤ ${expressionTo}`);
        } else {
          setDisplayValue('');
        }
      } else {
        setDisplayValue(expressionFrom ? `${typeText} ${expressionFrom}` : '');
      }
    }
  }, [dateFormat]);

  return (
    <div className="ag-floating-filter-body">
      <div className="ag-floating-filter-input text-sm">
        {displayValue || 'No filter'}
      </div>
    </div>
  );
};

export default RelativeDateFloatingFilter;