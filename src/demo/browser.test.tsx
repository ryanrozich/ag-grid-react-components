import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './app';

// Mock AG Grid components to avoid module registration issues in tests
vi.mock('ag-grid-react', () => ({
  AgGridReact: (props: any) => (
    <div data-testid="mock-ag-grid">
      <div className="ag-header-container">
        <div className="ag-header-row">
          {props.columnDefs?.map((col: any, i: number) => (
            <div key={i} className="ag-header-cell">{col.headerName}</div>
          ))}
        </div>
      </div>
      <div className="ag-body-viewport">
        {props.rowData?.slice(0, 5).map((row: any, i: number) => (
          <div key={i} className="ag-row">
            {props.columnDefs?.map((col: any, j: number) => (
              <div key={j} className="ag-cell">{row[col.field]}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}));

// Mock module registry to avoid registration issues
vi.mock('ag-grid-community', async () => {
  return {
    ModuleRegistry: {
      registerModules: vi.fn()
    },
    ClientSideRowModelModule: {},
    ColumnsToolPanelModule: {},
    FiltersToolPanelModule: {},
    MenuModule: {},
    SetFilterModule: {},
    MultiFilterModule: {}
  };
});

describe('AG Grid Demo Browser Test', () => {
  it('renders the demo application correctly', async () => {
    const { getByText, container } = render(<App />);
    
    // Check if main elements are rendered
    expect(getByText('AG Grid Date Filter Demo')).toBeInTheDocument();
    expect(getByText('Save Filter to URL')).toBeInTheDocument();
    expect(getByText('Load Filter from URL')).toBeInTheDocument();
    
    // Check if the grid container exists
    const gridContainer = container.querySelector('.ag-theme-alpine');
    expect(gridContainer).toBeInTheDocument();
  });
});