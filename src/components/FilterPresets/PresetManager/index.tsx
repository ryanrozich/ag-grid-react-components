import { useState, useCallback, useMemo } from "react";
import type { PresetManagerProps, PresetItemProps } from "../types";

export function PresetManager({
  presets,
  activePresetId,
  onSetDefault,
  onEdit,
  onDelete,
  onExport,
  onImport,
  renderPresetItem,
  className,
}: PresetManagerProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const userPresets = useMemo(
    () => presets.filter((p) => !p.isSystem),
    [presets],
  );

  const allUserPresetsSelected = useMemo(
    () =>
      userPresets.length > 0 && userPresets.every((p) => selectedIds.has(p.id)),
    [userPresets, selectedIds],
  );

  const someUserPresetsSelected = useMemo(
    () =>
      userPresets.some((p) => selectedIds.has(p.id)) && !allUserPresetsSelected,
    [userPresets, selectedIds, allUserPresetsSelected],
  );

  const handleToggleSelect = useCallback(
    (presetId: string, checked: boolean) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (checked) {
          next.add(presetId);
        } else {
          next.delete(presetId);
        }
        return next;
      });
    },
    [],
  );

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedIds(new Set(userPresets.map((p) => p.id)));
      } else {
        setSelectedIds(new Set());
      }
    },
    [userPresets],
  );

  const handleDelete = useCallback(() => {
    if (selectedIds.size > 0) {
      onDelete(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
  }, [selectedIds, onDelete]);

  const handleExportSelected = useCallback(() => {
    if (selectedIds.size > 0) {
      onExport(Array.from(selectedIds));
    }
  }, [selectedIds, onExport]);

  const handleImport = useCallback(() => {
    if (!onImport) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const text = await file.text();
          const data = JSON.parse(text);
          onImport(data.presets || []);
        } catch (error) {
          console.error("Failed to import presets:", error);
        }
      }
    };
    input.click();
  }, [onImport]);

  const formatDate = useCallback((date: Date | undefined) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  }, []);

  if (presets.length === 0) {
    return (
      <div
        className={`preset-manager preset-manager--empty ${className || ""}`}
      >
        <p>No filter presets available</p>
      </div>
    );
  }

  return (
    <div className={`preset-manager ${className || ""}`}>
      <div className="preset-manager__actions">
        <label className="preset-manager__select-all">
          <input
            type="checkbox"
            checked={allUserPresetsSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
            aria-label="Select all user presets"
            ref={(el) => {
              if (el) {
                el.indeterminate = someUserPresetsSelected;
              }
            }}
          />
          <span>Select All</span>
        </label>

        <div className="preset-manager__bulk-actions">
          <button
            type="button"
            onClick={handleDelete}
            disabled={selectedIds.size === 0}
            className="preset-manager__button preset-manager__button--delete"
          >
            Delete Selected
          </button>
          <button
            type="button"
            onClick={handleExportSelected}
            disabled={selectedIds.size === 0}
            className="preset-manager__button preset-manager__button--export"
          >
            Export Selected
          </button>
          {onImport && (
            <button
              type="button"
              onClick={handleImport}
              className="preset-manager__button preset-manager__button--import"
            >
              Import Presets
            </button>
          )}
        </div>
      </div>

      <ul
        role="list"
        aria-label="Filter presets"
        className="preset-manager__list"
      >
        {presets.map((preset) => {
          const isActive = preset.id === activePresetId;
          const isSelected = selectedIds.has(preset.id);

          const itemProps: PresetItemProps = {
            preset,
            isActive,
            isSelected,
            onToggleSelect: (checked) => handleToggleSelect(preset.id, checked),
            onSetDefault: () =>
              onSetDefault(preset.isDefault ? null : preset.id),
            onEdit: () => onEdit(preset),
            onDelete: () => onDelete([preset.id]),
            onExport: () => onExport([preset.id]),
          };

          return (
            <li
              key={preset.id}
              role="listitem"
              aria-label={`${preset.name}${preset.isSystem ? " (System preset)" : ""}${
                preset.isDefault ? " (Default)" : ""
              }${isActive ? " (Active)" : ""}`}
              data-active={isActive || undefined}
              className="preset-manager__item"
            >
              {renderPresetItem ? (
                renderPresetItem(itemProps)
              ) : (
                <div className="preset-manager__item-content">
                  <div className="preset-manager__item-select">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) =>
                        handleToggleSelect(preset.id, e.target.checked)
                      }
                      disabled={preset.isSystem}
                      aria-label={`Select ${preset.name}`}
                      aria-checked={isSelected}
                    />
                  </div>

                  <div className="preset-manager__item-info">
                    <div className="preset-manager__item-header">
                      <h3 className="preset-manager__item-name">
                        {preset.name}
                      </h3>
                      <div className="preset-manager__item-badges">
                        {preset.isSystem && (
                          <span className="preset-manager__badge preset-manager__badge--system">
                            System
                          </span>
                        )}
                        {preset.isDefault && (
                          <span className="preset-manager__badge preset-manager__badge--default">
                            Default
                          </span>
                        )}
                      </div>
                    </div>

                    {preset.description && (
                      <p className="preset-manager__item-description">
                        {preset.description}
                      </p>
                    )}

                    {preset.tags && preset.tags.length > 0 && (
                      <div className="preset-manager__item-tags">
                        {preset.tags.map((tag) => (
                          <span key={tag} className="preset-manager__tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="preset-manager__item-dates">
                      {preset.createdAt && (
                        <span className="preset-manager__date">
                          Created {formatDate(preset.createdAt)}
                        </span>
                      )}
                      {preset.updatedAt &&
                        preset.updatedAt !== preset.createdAt && (
                          <span className="preset-manager__date">
                            Updated {formatDate(preset.updatedAt)}
                          </span>
                        )}
                    </div>
                  </div>

                  <div className="preset-manager__item-actions">
                    {!preset.isSystem && (
                      <button
                        type="button"
                        onClick={() =>
                          onSetDefault(preset.isDefault ? null : preset.id)
                        }
                        aria-label={
                          preset.isDefault
                            ? "Remove as default"
                            : "Set as default"
                        }
                        className="preset-manager__action preset-manager__action--default"
                      >
                        {preset.isDefault ? "★" : "☆"}
                      </button>
                    )}

                    {!preset.isSystem && (
                      <button
                        type="button"
                        onClick={() => onEdit(preset)}
                        aria-label="Edit preset"
                        className="preset-manager__action preset-manager__action--edit"
                      >
                        ✎
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onExport([preset.id])}
                      aria-label="Export preset"
                      className="preset-manager__action preset-manager__action--export"
                    >
                      ⬇
                    </button>

                    {!preset.isSystem && (
                      <button
                        type="button"
                        onClick={() => onDelete([preset.id])}
                        aria-label="Delete preset"
                        className="preset-manager__action preset-manager__action--delete"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

PresetManager.displayName = "PresetManager";
