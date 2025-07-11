import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ComponentsShowcaseComplete } from "./components-showcase-complete";
import { TestDemo } from "./TestDemo";
import { V2PocDemo } from "./v2-poc-demo";
import { V2HeadlessExamples } from "./v2-headless-examples";

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

        {/* V2 POC demo route */}
        <Route path="/v2-poc" element={<V2PocDemo />} />

        {/* V2 Headless examples route */}
        <Route path="/v2-headless" element={<V2HeadlessExamples />} />

        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
