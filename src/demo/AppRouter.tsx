import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ComponentsShowcaseComplete } from "./components-showcase-complete";

// Get base path from environment or default
const getBasePath = () => {
  // In production, we're deployed at /ag-grid-react-components/
  // @ts-expect-error - Vite provides import.meta.env
  if (import.meta.env?.PROD) {
    return "/ag-grid-react-components";
  }
  // In development, use root
  return "";
};

export const AppRouter: React.FC = () => {
  const basename = getBasePath();

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        {/* Main showcase route that handles internal navigation */}
        <Route path="/" element={<ComponentsShowcaseComplete />} />
        <Route
          path="/demo"
          element={<ComponentsShowcaseComplete initialPage="demo" />}
        />
        <Route
          path="/docs"
          element={<ComponentsShowcaseComplete initialPage="docs" />}
        />
        <Route
          path="/docs/:section"
          element={<ComponentsShowcaseComplete initialPage="docs" />}
        />

        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
