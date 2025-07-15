import React from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./AppRouter";
import "./styles/showcase-dark.css";
import "./styles/ag-grid-fixes.css";
import "../index.css";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
);
