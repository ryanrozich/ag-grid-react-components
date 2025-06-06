import React from 'react';
import { createRoot } from 'react-dom/client';
import { ComponentsShowcase } from './components-showcase';
import './styles/showcase.css';
import '../index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ComponentsShowcase />
  </React.StrictMode>
);