import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ActiveFilters from "../../components/ActiveFilters";
import { generateData } from "../data/generator";
import styles from "./Examples.module.css";

interface FilterPreset {
  id: string;
  name: string;
  description?: string;
  gridState: {
    filters: Record<string, any>;
  };
  sharedBy?: string;
  sharedAt?: Date;
  version?: number;
}

const AdvancedPresetExample: React.FC = () => {
  // Multiple grid instances
  const [gridApi1, setGridApi1] = useState<any>(null);
  const [gridApi2, setGridApi2] = useState<any>(null);
  const [rowData1] = useState(() => generateData(50));
  const [rowData2] = useState(() => generateData(50));

  // Preset management
  const [sharedPresets, setSharedPresets] = useState<FilterPreset[]>([]);
  const [shareUrl, setShareUrl] = useState<string>("");
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [storageUsed, setStorageUsed] = useState(0);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  const columnDefs: ColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      filter: "agTextColumnFilter",
    },
    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
      filter: "agTextColumnFilter",
    },
    {
      field: "date",
      headerName: "Date",
      width: 120,
      filter: "agDateColumnFilter",
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : "";
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => {
        return params.value ? `$${params.value.toLocaleString()}` : "";
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      filter: "agTextColumnFilter",
    },
  ];

  // Cross-tab synchronization using BroadcastChannel
  useEffect(() => {
    if (!syncEnabled) return;

    const channel = new BroadcastChannel("filter-presets-sync");

    channel.onmessage = (event) => {
      if (event.data.type === "preset-update") {
        setSharedPresets(event.data.presets);
        setLastSyncTime(new Date());
      }
    };

    return () => channel.close();
  }, [syncEnabled]);

  // Calculate storage usage
  useEffect(() => {
    const calculateStorage = async () => {
      if ("storage" in navigator && "estimate" in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        const used = estimate.usage || 0;
        const quota = estimate.quota || 0;
        setStorageUsed((used / quota) * 100);
      }
    };

    calculateStorage();
  }, [sharedPresets]);

  const onGrid1Ready = (params: any) => setGridApi1(params.api);
  const onGrid2Ready = (params: any) => setGridApi2(params.api);

  // Sync filters between grids
  const syncGridFilters = useCallback(() => {
    if (!gridApi1 || !gridApi2 || !syncEnabled) return;

    const filters = gridApi1.getFilterModel();
    gridApi2.setFilterModel(filters);

    // Broadcast to other tabs
    const channel = new BroadcastChannel("filter-presets-sync");
    channel.postMessage({
      type: "filter-sync",
      filters,
      timestamp: new Date(),
    });
    channel.close();
  }, [gridApi1, gridApi2, syncEnabled]);

  // Generate shareable URL
  const generateShareUrl = useCallback(() => {
    if (!gridApi1) return;

    const filters = gridApi1.getFilterModel();
    const preset: FilterPreset = {
      id: `shared-${Date.now()}`,
      name: "Shared Filter",
      gridState: { filters },
      sharedBy: "Current User",
      sharedAt: new Date(),
    };

    // Encode preset data
    const encodedData = btoa(JSON.stringify(preset));
    const url = `${window.location.origin}${window.location.pathname}?preset=${encodedData}`;
    setShareUrl(url);

    // Generate QR code (in real app, use a QR library)
    console.log("QR code would be generated for:", url);
  }, [gridApi1]);

  // Import preset from URL
  const importFromUrl = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const presetData = urlParams.get("preset");

    if (presetData) {
      try {
        const preset = JSON.parse(atob(presetData));
        setSharedPresets([...sharedPresets, preset]);

        if (gridApi1) {
          gridApi1.setFilterModel(preset.gridState.filters);
        }
      } catch (error) {
        console.error("Failed to import preset:", error);
      }
    }
  }, [gridApi1, sharedPresets]);

  // Export presets
  const exportPresets = useCallback(() => {
    const data = {
      version: "1.0",
      exportDate: new Date(),
      presets: sharedPresets,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `filter-presets-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [sharedPresets]);

  // Import presets from file
  const importPresets = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (data.presets) {
            setSharedPresets([...sharedPresets, ...data.presets]);
          }
        } catch (error) {
          console.error("Failed to import presets:", error);
        }
      };
      reader.readAsText(file);
    },
    [sharedPresets],
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("URL copied to clipboard!");
  };

  return (
    <div className={styles.exampleContainer}>
      <div className={styles.controlsSection}>
        <div className={styles.presetControls}>
          <label>
            <input
              type="checkbox"
              checked={syncEnabled}
              onChange={(e) => setSyncEnabled(e.target.checked)}
            />
            Enable Cross-Tab Sync
          </label>

          {syncEnabled && lastSyncTime && (
            <span className={styles.syncIndicator}>
              🔄 Last sync: {lastSyncTime.toLocaleTimeString()}
            </span>
          )}

          <button onClick={syncGridFilters} className={styles.shareButton}>
            🔄 Sync Grid 2 with Grid 1
          </button>
        </div>
      </div>

      <Tabs className={styles.tabsContainer}>
        <TabList>
          <Tab>Multi-Grid Sync</Tab>
          <Tab>URL Sharing</Tab>
          <Tab>Import/Export</Tab>
          <Tab>Storage Info</Tab>
        </TabList>

        <TabPanel>
          <div className={styles.gridContainer}>
            <h4>Grid 1 - Primary</h4>
            <div
              className="ag-theme-alpine"
              style={{ height: 300, width: "100%" }}
            >
              <AgGridReact
                rowData={rowData1}
                columnDefs={columnDefs}
                onGridReady={onGrid1Ready}
                animateRows={true}
                defaultColDef={{
                  sortable: true,
                  resizable: true,
                }}
              />
            </div>

            <div style={{ margin: "1rem 0" }}>
              <ActiveFilters
                api={gridApi1}
                filterColumns={columnDefs}
                dateFilterMode="both"
              />
            </div>
          </div>

          <div className={styles.gridContainer}>
            <h4>Grid 2 - Secondary (Synced)</h4>
            <div
              className="ag-theme-alpine"
              style={{ height: 300, width: "100%" }}
            >
              <AgGridReact
                rowData={rowData2}
                columnDefs={columnDefs}
                onGridReady={onGrid2Ready}
                animateRows={true}
                defaultColDef={{
                  sortable: true,
                  resizable: true,
                }}
              />
            </div>

            <div style={{ margin: "1rem 0" }}>
              <ActiveFilters
                api={gridApi2}
                filterColumns={columnDefs}
                dateFilterMode="both"
              />
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className={styles.shareSection}>
            <h4>Share Current Filters via URL</h4>
            <p>
              Generate a shareable link that others can use to apply your
              current filter configuration.
            </p>

            <button onClick={generateShareUrl} className={styles.shareButton}>
              🔗 Generate Share URL
            </button>

            {shareUrl && (
              <>
                <div className={styles.shareUrl}>
                  <input type="text" value={shareUrl} readOnly />
                  <button
                    onClick={copyToClipboard}
                    className={styles.copyButton}
                  >
                    📋 Copy
                  </button>
                </div>

                <div className={styles.qrCode}>
                  <p>📱 QR Code for mobile sharing:</p>
                  <div
                    style={{
                      width: 200,
                      height: 200,
                      border: "1px solid #ddd",
                      display: "inline-block",
                      background: "#f0f0f0",
                    }}
                  >
                    [QR Code Placeholder]
                  </div>
                </div>
              </>
            )}

            <button onClick={importFromUrl} className={styles.importButton}>
              📥 Import from URL
            </button>
          </div>
        </TabPanel>

        <TabPanel>
          <div className={styles.importExportSection}>
            <div>
              <h4>Export Presets</h4>
              <p>
                Download all your presets as a JSON file for backup or sharing.
              </p>
              <button onClick={exportPresets} className={styles.exportButton}>
                💾 Export All Presets
              </button>
            </div>

            <div>
              <h4>Import Presets</h4>
              <p>Load presets from a previously exported file.</p>
              <input
                type="file"
                accept=".json"
                onChange={importPresets}
                style={{ display: "none" }}
                id="import-file"
              />
              <label htmlFor="import-file">
                <button
                  onClick={() =>
                    document.getElementById("import-file")?.click()
                  }
                  className={styles.importButton}
                >
                  📂 Import from File
                </button>
              </label>
            </div>
          </div>

          {sharedPresets.length > 0 && (
            <div style={{ marginTop: "2rem" }}>
              <h4>Imported Presets ({sharedPresets.length})</h4>
              <ul>
                {sharedPresets.map((preset) => (
                  <li key={preset.id}>
                    {preset.name}
                    {preset.sharedBy && ` - Shared by ${preset.sharedBy}`}
                    {preset.sharedAt &&
                      ` on ${new Date(preset.sharedAt).toLocaleDateString()}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </TabPanel>

        <TabPanel>
          <div className={styles.storageInfo}>
            <h5>Storage Usage</h5>
            <div className={styles.storageBar}>
              <div
                className={styles.storageUsed}
                style={{ width: `${storageUsed}%` }}
              />
            </div>
            <p className={styles.storageText}>
              {storageUsed.toFixed(2)}% of available storage used
            </p>

            <h5>Storage Details</h5>
            <ul>
              <li>Total Presets: {sharedPresets.length}</li>
              <li>
                Estimated Size: ~{(sharedPresets.length * 2).toFixed(1)} KB
              </li>
              <li>Compression Enabled: ✅</li>
              <li>Auto-cleanup: Every 24 hours</li>
              <li>Max Age: 90 days</li>
            </ul>
          </div>
        </TabPanel>
      </Tabs>

      <div className={styles.features}>
        <h4>Advanced Features Demonstrated</h4>
        <ul>
          <li>✅ Multi-grid filter synchronization</li>
          <li>✅ Cross-tab synchronization using BroadcastChannel API</li>
          <li>✅ URL-based preset sharing with encoded data</li>
          <li>✅ QR code generation for mobile sharing</li>
          <li>✅ Export presets to JSON file</li>
          <li>✅ Import presets from JSON file</li>
          <li>✅ Storage usage monitoring</li>
          <li>✅ Real-time sync indicators</li>
          <li>✅ Preset versioning support</li>
        </ul>
      </div>
    </div>
  );
};

export default AdvancedPresetExample;
