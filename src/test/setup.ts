import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock matchMedia for tests
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {},
    addEventListener: function() {},
    removeEventListener: function() {},
    dispatchEvent: function() {
      return true;
    },
  };
};

// Mock CSS imports
vi.mock('../index.css', () => ({}));
vi.mock('react-datepicker/dist/react-datepicker.css', () => ({}));