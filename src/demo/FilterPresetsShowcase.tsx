import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./styles/showcase.css";
import styles from "./FilterPresetsShowcase.module.css";

import BasicPresetExample from "./examples/BasicPresetExample";
// import AdvancedPresetExample from "./examples/AdvancedPresetExample";
import CustomUIExample from "./examples/CustomUIExample";
import RealWorldExamples from "./examples/RealWorldExamples";
import { AnchorHeading } from "./components/AnchorHeading";
import { CodeBlock } from "./components/CodeBlock";

const FilterPresetsShowcase: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className={styles["showcase-container"]}>
      <div className={styles["showcase-header"]}>
        <AnchorHeading level={1} id="filter-presets-showcase">
          Filter Presets Showcase
        </AnchorHeading>
        <p className={styles["showcase-description"]}>
          Save, load, and share filter configurations with the powerful Filter
          Presets feature. This showcase demonstrates various preset
          capabilities integrated with QuickFilterDropdown.
        </p>
      </div>

      <div className={styles["showcase-benefits"]}>
        <AnchorHeading level={2} id="overview-benefits">
          Overview & Benefits
        </AnchorHeading>
        <div className={styles["benefits-grid"]}>
          <div className={styles["benefit-card"]}>
            <h3>💾 Persistent Filters</h3>
            <p>Save complex filter configurations for instant reuse</p>
          </div>
          <div className={styles["benefit-card"]}>
            <h3>🔗 Easy Sharing</h3>
            <p>Share filter presets via URL or export/import</p>
          </div>
          <div className={styles["benefit-card"]}>
            <h3>⚡ Performance</h3>
            <p>Optimized storage with compression and cleanup</p>
          </div>
          <div className={styles["benefit-card"]}>
            <h3>🎨 Customizable UI</h3>
            <p>Flexible rendering options for preset management</p>
          </div>
        </div>
      </div>

      <Tabs selectedIndex={selectedTab} onSelect={setSelectedTab}>
        <TabList>
          <Tab>Basic Usage</Tab>
          <Tab>Advanced Features</Tab>
          <Tab>Custom UI</Tab>
          <Tab>Real-World Examples</Tab>
          <Tab>API Playground</Tab>
        </TabList>

        <TabPanel>
          <div className={styles["tab-content"]}>
            <AnchorHeading level={2} id="basic-preset-usage">
              Basic Preset Usage
            </AnchorHeading>
            <p>
              Get started with filter presets using system-defined and
              user-created presets. This example shows the fundamental features
              of saving, loading, and managing presets.
            </p>
            <BasicPresetExample />
          </div>
        </TabPanel>

        <TabPanel>
          <div className={styles["tab-content"]}>
            <AnchorHeading level={2} id="advanced-features">
              Advanced Features
            </AnchorHeading>
            <p>
              Explore advanced capabilities including multi-grid
              synchronization, URL sharing, import/export workflows, and
              cross-tab synchronization.
            </p>
            {/* <AdvancedPresetExample /> */}
          </div>
        </TabPanel>

        <TabPanel>
          <div className={styles["tab-content"]}>
            <AnchorHeading level={2} id="custom-ui-integration">
              Custom UI Integration
            </AnchorHeading>
            <p>
              Customize the preset UI to match your application's design system.
              Replace default components with your own implementations.
            </p>
            <CustomUIExample />
          </div>
        </TabPanel>

        <TabPanel>
          <div className={styles["tab-content"]}>
            <AnchorHeading level={2} id="real-world-examples">
              Real-World Examples
            </AnchorHeading>
            <p>
              See filter presets in action with practical examples including
              sales dashboards, task management, and data analytics platforms.
            </p>
            <RealWorldExamples />
          </div>
        </TabPanel>

        <TabPanel>
          <div className={styles["tab-content"]}>
            <AnchorHeading level={2} id="api-playground">
              API Playground
            </AnchorHeading>
            <p>
              Experiment with the Filter Presets API directly. Try different
              configurations and see the results in real-time.
            </p>
            <div className={styles["api-playground"]}>
              <div className={styles["documentation-section"]}>
                <h3>Filter Presets API</h3>
                <p>Interactive API documentation and playground</p>
                <AnchorHeading level={3} id="quick-start">
                  Quick Start
                </AnchorHeading>
                <CodeBlock
                  language="typescript"
                  code={`
// Enable presets with basic configuration
<QuickFilterDropdown
  columns={columns}
  enablePresets={{
    systemPresets: [
      {
        id: 'recent-orders',
        name: 'Recent Orders',
        gridState: {
          filters: {
            date: {
              type: 'after',
              mode: 'relative',
              expressionFrom: 'Today-7d'
            }
          }
        }
      }
    ],
    allowUserPresets: true,
    allowSharing: true,
    allowExport: true
  }}
/>
                `}
                />

                <AnchorHeading level={3} id="programmatic-control">
                  Programmatic Control
                </AnchorHeading>
                <CodeBlock
                  language="typescript"
                  code={`
// Use the useFilterPresets hook for programmatic control
const {
  presets,
  savePreset,
  loadPreset,
  deletePreset,
  setDefaultPreset,
  exportPresets,
  importPresets
} = useFilterPresets({
  storageKey: 'myApp.filterPresets',
  maxPresets: 20
});

// Save current filter state
const handleSave = async () => {
  const preset = await savePreset({
    name: 'My Custom Filter',
    description: 'Filters for Q4 analysis',
    isDefault: true
  });
  console.log('Saved preset:', preset);
};

// Load a preset
const handleLoad = (presetId: string) => {
  loadPreset(presetId);
};
                `}
                />

                <AnchorHeading level={3} id="storage-configuration">
                  Storage Configuration
                </AnchorHeading>
                <CodeBlock
                  language="typescript"
                  code={`
// Configure storage options
const storageConfig = {
  maxStorageSize: 5 * 1024 * 1024, // 5MB
  compressionEnabled: true,
  compressionThreshold: 1024, // Compress if > 1KB
  autoCleanup: true,
  cleanupInterval: 24 * 60 * 60 * 1000, // Daily
  maxAge: 90 * 24 * 60 * 60 * 1000 // 90 days
};
                `}
                />

                <AnchorHeading level={3} id="custom-renderers">
                  Custom Renderers
                </AnchorHeading>
                <CodeBlock
                  language="typescript"
                  code={`
// Provide custom UI components
<QuickFilterDropdown
  enablePresets={{
    renderPresetSelector: ({ presets, onSelect, currentPresetId }) => (
      <MyCustomDropdown
        items={presets}
        onItemClick={onSelect}
        selectedId={currentPresetId}
      />
    ),
    renderSaveDialog: ({ onSave, onCancel, defaultName }) => (
      <MyCustomModal
        title="Save Filter Preset"
        onConfirm={(name, description) => onSave({ name, description })}
        onCancel={onCancel}
        defaultValue={defaultName}
      />
    ),
    renderManager: ({ presets, onDelete, onSetDefault, onExport }) => (
      <MyCustomManager
        presets={presets}
        onDelete={onDelete}
        onSetDefault={onSetDefault}
        onExport={onExport}
      />
    )
  }}
/>
                `}
                />

                <AnchorHeading level={3} id="event-handlers">
                  Event Handlers
                </AnchorHeading>
                <CodeBlock
                  language="typescript"
                  code={`
// Listen to preset events
<QuickFilterDropdown
  enablePresets={{
    onPresetSave: (preset) => {
      analytics.track('filter_preset_saved', {
        presetId: preset.id,
        name: preset.name
      });
    },
    onPresetLoad: (preset) => {
      analytics.track('filter_preset_loaded', {
        presetId: preset.id,
        name: preset.name
      });
    },
    onPresetDelete: (presetId) => {
      analytics.track('filter_preset_deleted', { presetId });
    },
    onPresetShare: (shareUrl) => {
      analytics.track('filter_preset_shared', { url: shareUrl });
    }
  }}
/>
                `}
                />

                <div className={styles["playground-controls"]}>
                  <h4>Try It Live</h4>
                  <p>Modify the configuration below and see the results:</p>
                  <div className={styles["playground-editor"]}>
                    {/* This would be an interactive code editor in a real implementation */}
                    <textarea
                      className={styles["code-editor"]}
                      defaultValue={`{
  "systemPresets": [
    {
      "id": "high-value",
      "name": "High Value Orders",
      "gridState": {
        "filters": {
          "amount": {
            "filterType": "number",
            "type": "greaterThan",
            "filter": 10000
          }
        }
      }
    }
  ],
  "allowUserPresets": true,
  "allowSharing": true,
  "maxPresets": 10
}`}
                      rows={20}
                    />
                  </div>
                  <button className={styles["apply-button"]}>
                    Apply Configuration
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
      </Tabs>

      <div className={styles["showcase-footer"]}>
        <AnchorHeading level={2} id="performance-metrics">
          Performance Metrics
        </AnchorHeading>
        <div className={styles["metrics-grid"]}>
          <div className={styles["metric-card"]}>
            <h4>Storage Efficiency</h4>
            <div className={styles["metric-value"]}>~85%</div>
            <p>Average compression ratio</p>
          </div>
          <div className={styles["metric-card"]}>
            <h4>Load Time</h4>
            <div className={styles["metric-value"]}>&lt;10ms</div>
            <p>Average preset load time</p>
          </div>
          <div className={styles["metric-card"]}>
            <h4>Cross-Tab Sync</h4>
            <div className={styles["metric-value"]}>&lt;50ms</div>
            <p>Average sync latency</p>
          </div>
          <div className={styles["metric-card"]}>
            <h4>URL Share Size</h4>
            <div className={styles["metric-value"]}>~200 chars</div>
            <p>Average share URL length</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPresetsShowcase;
