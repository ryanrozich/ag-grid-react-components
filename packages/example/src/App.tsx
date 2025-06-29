import React, { useState } from "react";
import MinimalExample from "./examples/MinimalExample";
import WithDatePickerExample from "./examples/WithDatePickerExample";
import FullFeaturedExample from "./examples/FullFeaturedExample";

type ExampleTab = "minimal" | "datepicker" | "full";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ExampleTab>("minimal");

  const tabs: { id: ExampleTab; label: string; bundleSize: string }[] = [
    { id: "minimal", label: "Minimal (Native)", bundleSize: "25KB" },
    { id: "datepicker", label: "With DatePicker", bundleSize: "65KB" },
    { id: "full", label: "Full Featured", bundleSize: "85KB" },
  ];

  return (
    <div className="app">
      <header className="header">
        <h1>AG Grid React Components - Examples</h1>
        <p>Modular, tree-shakeable components with 95% smaller bundles</p>
      </header>

      <div className="tab-container">
        <ul className="tab-list">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}{" "}
                <span style={{ opacity: 0.7 }}>({tab.bundleSize})</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {activeTab === "minimal" && <MinimalExample />}
      {activeTab === "datepicker" && <WithDatePickerExample />}
      {activeTab === "full" && <FullFeaturedExample />}
    </div>
  );
};

export default App;
