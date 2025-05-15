import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import { 
  ModuleRegistry,
  ClientSideRowModelModule 
} from 'ag-grid-community';
import App from './app';

// Mock console.error to catch grid-related errors
const originalConsoleError = console.error;
let consoleErrors: string[] = [];

describe('AG Grid Demo Browser Test', () => {
  beforeAll(() => {
    // Register required AG Grid modules
    ModuleRegistry.registerModules([ClientSideRowModelModule]);
    
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
      
      // Check for grid errors
      const gridErrors = consoleErrors.filter(error => 
        error.includes('AG Grid: error') || error.includes('No AG Grid modules')
      );
      
      expect(gridErrors).toHaveLength(0);
    });
  });
});