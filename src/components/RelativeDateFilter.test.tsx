import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import RelativeDateFilter from './RelativeDateFilter';
import { addDays, format, startOfDay } from 'date-fns';

// Mock dependencies and hooks
vi.mock('ag-grid-react', () => ({
  useGridFilter: vi.fn((params) => {
    // Store the passed parameters for assertions if needed
    useGridFilterParams.current = params;
    return {};
  })
}));

// Store hook parameters for assertions
const useGridFilterParams = { current: null };

vi.mock('react-datepicker', () => {
  return {
    default: ({ selected, onChange, dateFormat, placeholderText, popperClassName, popperProps, withPortal, portalId, ...rest }: any) => {
      // Include all props to avoid errors
      const formattedValue = selected ? format(selected, dateFormat || 'yyyy-MM-dd') : '';
      return (
        <div className={`react-datepicker-wrapper ${popperClassName || ''}`} data-portal-id={portalId}>
          <input
            data-testid="date-picker"
            type="text"
            value={formattedValue}
            onChange={(e) => {
              const date = new Date(e.target.value);
              onChange(date);
            }}
            placeholder={placeholderText}
            data-with-portal={withPortal ? 'true' : 'false'}
            {...rest}
          />
        </div>
      );
    }
  };
});

describe('RelativeDateFilter', () => {
  // Mock date to ensure consistent testing
  const mockDate = new Date('2023-01-01T00:00:00Z');
  const mockGetValue = vi.fn(node => node.data.date);
  const mockOnModelChange = vi.fn();
  
  const defaultProps = {
    column: { getColId: () => 'date' },
    getValue: mockGetValue,
    onModelChange: mockOnModelChange,
    api: {
      getFilterModel: () => ({}),
      addEventListener: vi.fn()
    }
  };
  
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
    mockOnModelChange.mockClear();
    mockGetValue.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
    
    // Reset the hook params for the next test
    useGridFilterParams.current = null;
  });

  it('should render in absolute mode by default', () => {
    render(<RelativeDateFilter {...defaultProps} />);
    
    expect(screen.getByText('Absolute')).toHaveClass('active');
    expect(screen.getByText('Relative')).toHaveClass('inactive');
    expect(screen.getByTestId('date-picker')).toBeInTheDocument();
  });

  it('should toggle between absolute and relative modes', () => {
    render(<RelativeDateFilter {...defaultProps} />);
    
    // Initially in absolute mode
    expect(screen.getByText('Absolute')).toHaveClass('active');
    
    // Click to toggle to relative mode
    fireEvent.click(screen.getByText('Relative'));
    
    // Should now be in relative mode
    expect(screen.getByText('Relative')).toHaveClass('active');
    expect(screen.getByText('Absolute')).toHaveClass('inactive');
    expect(screen.getByPlaceholderText('e.g., Today, Today+7d, Today-1m')).toBeInTheDocument();
  });

  it('should handle filter type changes', () => {
    render(<RelativeDateFilter {...defaultProps} />);
    
    // Default is "equals"
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue('equals');
    
    // Change to "greaterThan"
    fireEvent.change(selectElement, { target: { value: 'greaterThan' } });
    expect(selectElement).toHaveValue('greaterThan');
  });

  it('should show a second date input when "inRange" is selected in absolute mode', () => {
    render(<RelativeDateFilter {...defaultProps} />);
    
    // Change to "inRange"
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'inRange' } });
    
    // Should have two date pickers
    const datePickers = screen.getAllByTestId('date-picker');
    expect(datePickers).toHaveLength(2);
  });

  it('should show a second expression input when "inRange" is selected in relative mode', () => {
    render(<RelativeDateFilter {...defaultProps} />);
    
    // Switch to relative mode
    fireEvent.click(screen.getByText('Relative'));
    
    // Change to "inRange"
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'inRange' } });
    
    // Should have two expression inputs
    const expressionInputs = screen.getAllByRole('textbox');
    expect(expressionInputs).toHaveLength(2);
  });

  it('should validate relative date expressions', () => {
    render(<RelativeDateFilter {...defaultProps} />);
    
    // Switch to relative mode
    fireEvent.click(screen.getByText('Relative'));
    
    // Enter invalid expression
    const input = screen.getByPlaceholderText('e.g., Today, Today+7d, Today-1m');
    fireEvent.change(input, { target: { value: 'Tomorrow' } });
    
    // Should show error message
    expect(screen.getByText(/Invalid format/)).toBeInTheDocument();
    
    // Enter valid expression
    fireEvent.change(input, { target: { value: 'Today+7d' } });
    
    // Should show resolved date
    const today = startOfDay(new Date());
    const expected = addDays(today, 7);
    const formattedDate = format(expected, 'yyyy-MM-dd');
    
    expect(screen.getByText(`Resolves to: ${formattedDate}`)).toBeInTheDocument();
  });

  it('should notify when filter is applied', () => {
    render(<RelativeDateFilter {...defaultProps} />);
    
    // Enter a date in absolute mode
    const datePicker = screen.getByTestId('date-picker');
    fireEvent.change(datePicker, { target: { value: '2023-01-15' } });
    
    // Click Apply
    fireEvent.click(screen.getByText('Apply'));
    
    // onModelChange should have been called with a filter model
    expect(mockOnModelChange).toHaveBeenCalledWith(expect.objectContaining({
      type: 'equals',
      mode: 'absolute'
    }));
  });

  it('should reset the filter when clicking Reset button', () => {
    render(<RelativeDateFilter {...defaultProps} />);
    
    // Enter a date in absolute mode
    const datePicker = screen.getByTestId('date-picker');
    fireEvent.change(datePicker, { target: { value: '2023-01-15' } });
    
    // Apply the filter
    fireEvent.click(screen.getByText('Apply'));
    expect(mockOnModelChange).toHaveBeenCalled();
    
    // Reset mock to check if it's called again
    mockOnModelChange.mockClear();
    
    // Click Reset
    fireEvent.click(screen.getByText('Reset'));
    
    // onModelChange should have been called with null
    expect(mockOnModelChange).toHaveBeenCalledWith(null);
    
    // Date picker should be empty
    expect(screen.getByTestId('date-picker')).toHaveValue('');
  });

  it('should initialize with provided model', () => {
    const initialModel = {
      type: 'greaterThan' as const,
      mode: 'relative' as const,
      expressionFrom: 'Today+7d'
    };
    
    render(<RelativeDateFilter {...defaultProps} model={initialModel} />);
    
    // Should be in relative mode
    expect(screen.getByText('Relative')).toHaveClass('active');
    
    // Should have the correct filter type
    expect(screen.getByRole('combobox')).toHaveValue('greaterThan');
    
    // Should have the expression
    expect(screen.getByPlaceholderText('e.g., Today, Today+7d, Today-1m')).toHaveValue('Today+7d');
  });

  it('should register the filter with ag-grid using useGridFilter hook', () => {
    render(<RelativeDateFilter {...defaultProps} />);
    
    // Verify the hook was called
    expect(useGridFilterParams.current).not.toBeNull();
    
    // Verify the hook was called with the correct functions
    expect(useGridFilterParams.current).toHaveProperty('doesFilterPass');
    expect(typeof useGridFilterParams.current.doesFilterPass).toBe('function');
    
    expect(useGridFilterParams.current).toHaveProperty('getModelAsString');
    expect(typeof useGridFilterParams.current.getModelAsString).toBe('function');
  });

  it.skip('should properly filter data using doesFilterPass', () => {
    render(<RelativeDateFilter {...defaultProps} />);
    
    // Get the doesFilterPass function from the hook parameters
    const { doesFilterPass } = useGridFilterParams.current;
    
    // Enter a date and apply the filter
    const datePicker = screen.getByTestId('date-picker');
    fireEvent.change(datePicker, { target: { value: '2023-01-15' } });
    fireEvent.click(screen.getByText('Apply'));
    
    // Create test nodes for testing filter
    const nodeWithMatchingDate = { data: { date: new Date('2023-01-15') } };
    const nodeWithNonMatchingDate = { data: { date: new Date('2023-01-16') } };
    
    // Mock the getValue function for testing
    mockGetValue.mockImplementation((node) => node.data.date);
    
    // Test the filter function
    expect(doesFilterPass({ node: nodeWithMatchingDate })).toBe(true);
    expect(doesFilterPass({ node: nodeWithNonMatchingDate })).toBe(false);
  });

  it.skip('should return correct string representation using getModelAsString', () => {
    // Initialize with a model
    const initialModel = {
      type: 'equals' as const,
      mode: 'absolute' as const,
      dateFrom: new Date('2023-01-15')
    };
    
    render(<RelativeDateFilter {...defaultProps} model={initialModel} />);
    
    // Get the getModelAsString function from the hook parameters
    const { getModelAsString } = useGridFilterParams.current;
    
    // Test the string representation
    const result = getModelAsString();
    expect(result).toContain('2023-01-15');
  });
});