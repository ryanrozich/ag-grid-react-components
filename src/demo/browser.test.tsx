import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import { 
  ModuleRegistry,
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  MenuModule,
  SetFilterModule,
  MultiFilterModule
} from 'ag-grid-community';
import App from './app';

// Mock console.error to catch grid-related errors
const originalConsoleError = console.error;
let consoleErrors: string[] = [];

describe('AG Grid Demo Browser Test', () => {
  beforeAll(() => {
    // Register required AG Grid modules
    ModuleRegistry.registerModules([
      ClientSideRowModelModule,
      ColumnsToolPanelModule,
      FiltersToolPanelModule,
      MenuModule,
      SetFilterModule,
      MultiFilterModule
    ]);
    
    // Mock console.error to catch grid initialization errors
    console.error = (...args: any[]) => {
      const errorMessage = args.join(' ');
      consoleErrors.push(errorMessage);
      // Still log to console for debugging
      originalConsoleError(...args);
    };
    
    return () => {
      console.error = originalConsoleError;
    };
  });
  
  beforeEach(() => {
    consoleErrors = [];
  });
  
  it('renders the demo application without AG Grid errors', async () => {
    const { getByText } = render(<App />);
    
    // Wait for the grid to initialize
    await waitFor(() => {
      expect(getByText('AG Grid Date Filter Demo')).toBeInTheDocument();
      
      // Check that the grid container is rendered
      const gridContainer = document.querySelector('.ag-theme-alpine');
      expect(gridContainer).toBeInTheDocument();
      
      // Check only for critical grid errors
      const criticalGridErrors = consoleErrors.filter(error => 
        (error.includes('AG Grid: error') && 
         (error.includes('#272') || error.includes('No AG Grid modules')))
      );
      
      // Expect no critical errors
      expect(criticalGridErrors).toHaveLength(0);
      
      // Verify grid is rendering its components
      const gridHeaderExists = document.querySelector('.ag-header-container');
      expect(gridHeaderExists).toBeTruthy();
    });
  });
});