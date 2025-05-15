import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RelativeDateFilter from './RelativeDateFilter';
import { addDays, format, startOfDay } from 'date-fns';

// Mock dependencies
vi.mock('react-datepicker', () => {
  return {
    default: ({ selected, onChange, dateFormat, placeholderText, minDate, maxDate }: any) => (
      <input
        data-testid="date-picker"
        type="text"
        value={selected ? format(selected, dateFormat || 'yyyy-MM-dd') : ''}
        onChange={(e) => onChange(new Date(e.target.value))}
        placeholder={placeholderText}
      />
    )
  };
});

describe('RelativeDateFilter', () => {
  // Mock date to ensure consistent testing
  const mockDate = new Date('2023-01-01T00:00:00Z');
  const mockColumn = { getColId: () => 'date' };
  const mockFilterChangedCallback = vi.fn();
  
  const defaultProps = {
    column: mockColumn,
    filterChangedCallback: mockFilterChangedCallback,
    colDef: { headerName: 'Date' },
    api: {
      getFilterModel: () => ({}),
      addEventListener: vi.fn()
    },
    rowModel: {},
    filterParams: {}
  };
  
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
    mockFilterChangedCallback.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render in absolute mode by default', () => {
    render(<RelativeDateFilter {...defaultProps} />);
    
    expect(screen.getByText('Absolute')).toHaveClass('active');
    expect(screen.getByText('Relative')).toHaveClass('inactive');
    expect(screen.getByTestId('date-picker')).toBeInTheDocument();
  });

  it('should toggle between absolute and relative modes', async () => {
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

  it('should validate relative date expressions', async () => {
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

  it('should apply the filter when clicking Apply button', () => {
    render(<RelativeDateFilter {...defaultProps} />);
    
    // Enter a date in absolute mode
    const datePicker = screen.getByTestId('date-picker');
    fireEvent.change(datePicker, { target: { value: '2023-01-15' } });
    
    // Click Apply
    fireEvent.click(screen.getByText('Apply'));
    
    // FilterChangedCallback should have been called
    expect(mockFilterChangedCallback).toHaveBeenCalled();
  });

  it('should reset the filter when clicking Reset button', () => {
    render(<RelativeDateFilter {...defaultProps} />);
    
    // Enter a date in absolute mode
    const datePicker = screen.getByTestId('date-picker');
    fireEvent.change(datePicker, { target: { value: '2023-01-15' } });
    
    // Apply the filter
    fireEvent.click(screen.getByText('Apply'));
    expect(mockFilterChangedCallback).toHaveBeenCalled();
    
    // Reset mock to check if it's called again
    mockFilterChangedCallback.mockClear();
    
    // Click Reset
    fireEvent.click(screen.getByText('Reset'));
    
    // FilterChangedCallback should have been called again
    expect(mockFilterChangedCallback).toHaveBeenCalled();
    
    // Date picker should be empty
    expect(screen.getByTestId('date-picker')).toHaveValue('');
  });

  it('should implement getModel and setModel API methods', () => {
    const { rerender } = render(<RelativeDateFilter {...defaultProps} />);
    
    // Apply a filter in absolute mode
    const datePicker = screen.getByTestId('date-picker');
    fireEvent.change(datePicker, { target: { value: '2023-01-15' } });
    fireEvent.click(screen.getByText('Apply'));
    
    // Get the model
    const model = RelativeDateFilter.getModel();
    expect(model).toEqual({
      type: 'equals',
      mode: 'absolute',
      dateFrom: new Date('2023-01-15'),
      dateTo: null,
      expressionFrom: undefined,
      expressionTo: undefined
    });
    
    // Reset the filter
    fireEvent.click(screen.getByText('Reset'));
    
    // Set the model with a new instance
    rerender(<RelativeDateFilter {...defaultProps} />);
    RelativeDateFilter.setModel(model);
    
    // Should have applied the model
    expect(screen.getByTestId('date-picker')).toHaveValue('2023-01-15');
  });

  it('should implement doesFilterPass method correctly', () => {
    render(<RelativeDateFilter {...defaultProps} />);
    
    // Apply a filter in absolute mode for "equals"
    const datePicker = screen.getByTestId('date-picker');
    fireEvent.change(datePicker, { target: { value: '2023-01-15' } });
    fireEvent.click(screen.getByText('Apply'));
    
    // Test filter passing
    const testParams = {
      data: { date: new Date('2023-01-15') },
      node: {}
    };
    
    // Should pass for matching date
    expect(RelativeDateFilter.doesFilterPass(testParams)).toBe(true);
    
    // Should not pass for non-matching date
    const testParams2 = {
      data: { date: new Date('2023-01-16') },
      node: {}
    };
    expect(RelativeDateFilter.doesFilterPass(testParams2)).toBe(false);
    
    // Change to "notEqual"
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'notEqual' } });
    fireEvent.click(screen.getByText('Apply'));
    
    // Should now be inverted
    expect(RelativeDateFilter.doesFilterPass(testParams)).toBe(false);
    expect(RelativeDateFilter.doesFilterPass(testParams2)).toBe(true);
  });
});