import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import type {
  SavePresetDialogProps,
  SavePresetFormData,
  SavePresetFormErrors,
  SavePresetContentProps,
} from "../types";

const initialFormData: SavePresetFormData = {
  name: "",
  description: "",
  tags: "",
  isDefault: false,
};

export function SavePresetDialog({
  isOpen,
  onClose,
  onSave,
  existingNames,
  storageInfo,
  currentFilterModel,
  renderContent,
}: SavePresetDialogProps) {
  const [formData, setFormData] = useState<SavePresetFormData>(initialFormData);
  const [errors, setErrors] = useState<SavePresetFormErrors>({});
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const headingId = useRef(`save-preset-dialog-${Date.now()}`).current;
  const nameErrorId = useRef(`name-error-${Date.now()}`).current;
  const tagsErrorId = useRef(`tags-error-${Date.now()}`).current;

  // Validate form data
  const validateForm = useCallback(
    (data: SavePresetFormData): SavePresetFormErrors => {
      const newErrors: SavePresetFormErrors = {};

      // Validate name
      const trimmedName = data.name.trim();
      if (!trimmedName) {
        newErrors.name = "Name is required";
      } else if (existingNames.includes(trimmedName)) {
        newErrors.name = "A preset with this name already exists";
      }

      // Validate tags
      if (data.tags.trim()) {
        const tags = data.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        const invalidTags = tags.filter((tag) => !/^[a-zA-Z0-9_-]+$/.test(tag));
        if (invalidTags.length > 0) {
          newErrors.tags =
            "Tags can only contain letters, numbers, hyphens, and underscores";
        }
      }

      return newErrors;
    },
    [existingNames],
  );

  // Update errors when form data changes
  useEffect(() => {
    const newErrors = validateForm(formData);
    setErrors(newErrors);
  }, [formData, validateForm]);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
      setErrors({});
    }
  }, [isOpen]);

  // Focus name input when dialog opens
  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      const timer = setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle Escape key globally when dialog is open
  useEffect(() => {
    if (!isOpen) return;

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen, onClose]);

  const handleChange = useCallback((updates: Partial<SavePresetFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleSubmit = useCallback(() => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const tags = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      name: formData.name.trim(),
      description: formData.description.trim(),
      tags: tags.length > 0 ? tags : undefined,
      isDefault: formData.isDefault,
      filterModel: currentFilterModel || {},
    });

    onClose();
  }, [formData, validateForm, onSave, onClose, currentFilterModel]);

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  const isValid = useMemo(() => {
    return formData.name.trim() && Object.keys(errors).length === 0;
  }, [formData.name, errors]);

  const showStorageWarning = storageInfo && storageInfo.percentage >= 90;

  if (!isOpen) return null;

  const contentProps: SavePresetContentProps = {
    formData,
    onChange: handleChange,
    onSubmit: handleSubmit,
    onCancel: handleCancel,
    errors,
    storageInfo,
  };

  if (renderContent) {
    return (
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        onKeyDown={handleKeyDown}
        className="save-preset-dialog"
      >
        {renderContent(contentProps)}
      </div>
    );
  }

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      onKeyDown={handleKeyDown}
      className="save-preset-dialog"
    >
      <div className="save-preset-dialog__content">
        <h2 id={headingId} className="save-preset-dialog__title">
          Save Filter Preset
        </h2>

        {storageInfo && (
          <div className="save-preset-dialog__storage">
            <div className="save-preset-dialog__storage-text">
              Storage: {storageInfo.percentage}% used ({storageInfo.used}/
              {storageInfo.total} KB)
            </div>
            <div
              role="progressbar"
              aria-valuenow={storageInfo.percentage}
              aria-valuemin={0}
              aria-valuemax={100}
              className="save-preset-dialog__storage-bar"
            >
              <div
                className="save-preset-dialog__storage-fill"
                style={{ width: `${storageInfo.percentage}%` }}
              />
            </div>
            {showStorageWarning && (
              <div className="save-preset-dialog__storage-warning" role="alert">
                Storage almost full. Consider deleting unused presets.
              </div>
            )}
          </div>
        )}

        <div className="save-preset-dialog__form">
          <div className="save-preset-dialog__field">
            <label htmlFor="preset-name" className="save-preset-dialog__label">
              Name
            </label>
            <input
              ref={nameInputRef}
              id="preset-name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange({ name: e.target.value })}
              aria-required="true"
              aria-invalid={!!errors.name && formData.name !== ""}
              aria-describedby={errors.name ? nameErrorId : undefined}
              className="save-preset-dialog__input"
            />
            {errors.name && (
              <div
                id={nameErrorId}
                className="save-preset-dialog__error"
                role="alert"
              >
                {errors.name}
              </div>
            )}
          </div>

          <div className="save-preset-dialog__field">
            <label
              htmlFor="preset-description"
              className="save-preset-dialog__label"
            >
              Description
            </label>
            <textarea
              id="preset-description"
              value={formData.description}
              onChange={(e) => handleChange({ description: e.target.value })}
              rows={3}
              className="save-preset-dialog__textarea"
            />
          </div>

          <div className="save-preset-dialog__field">
            <label htmlFor="preset-tags" className="save-preset-dialog__label">
              Tags
            </label>
            <input
              id="preset-tags"
              type="text"
              value={formData.tags}
              onChange={(e) => handleChange({ tags: e.target.value })}
              placeholder="Comma-separated tags"
              aria-invalid={!!errors.tags}
              aria-describedby={errors.tags ? tagsErrorId : undefined}
              className="save-preset-dialog__input"
            />
            {errors.tags && (
              <div
                id={tagsErrorId}
                className="save-preset-dialog__error"
                role="alert"
              >
                {errors.tags}
              </div>
            )}
          </div>

          <div className="save-preset-dialog__field save-preset-dialog__field--checkbox">
            <input
              id="preset-default"
              type="checkbox"
              checked={formData.isDefault}
              onChange={(e) => handleChange({ isDefault: e.target.checked })}
              className="save-preset-dialog__checkbox"
            />
            <label
              htmlFor="preset-default"
              className="save-preset-dialog__label"
            >
              Set as default preset
            </label>
          </div>
        </div>

        <div className="save-preset-dialog__actions">
          <button
            type="button"
            onClick={handleCancel}
            className="save-preset-dialog__button save-preset-dialog__button--cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid}
            className="save-preset-dialog__button save-preset-dialog__button--save"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

SavePresetDialog.displayName = "SavePresetDialog";
