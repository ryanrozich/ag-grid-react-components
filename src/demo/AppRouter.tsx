import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ComponentsShowcaseComplete } from "./components-showcase-complete";
import { TestDemo } from "./TestDemo";

// Get base path from Vite configuration
const getBasePath = () => {
  // @ts-expect-error - Vite provides import.meta.env.BASE_URL
  const baseUrl = import.meta.env?.BASE_URL || "/";
  // Remove trailing slash for React Router
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
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

        {/* Test demo route */}
        <Route path="/test-demo" element={<TestDemo />} />

        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
