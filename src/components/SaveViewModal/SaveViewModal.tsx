import React, { useState, Fragment } from "react";
import {
  Dialog,
  Transition,
  RadioGroup,
  Radio,
  Field,
  Fieldset,
  Label,
  Input,
  Textarea,
  Legend,
} from "@headlessui/react";
import type { GridApi } from "ag-grid-community";
import { CategorySelector } from "../CategorySelector";

// Inline SVG icon to avoid @heroicons/react dependency
const XMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10 8.586L4.293 2.879a1 1 0 10-1.414 1.414L8.586 10l-5.707 5.707a1 1 0 001.414 1.414L10 11.414l5.707 5.707a1 1 0 001.414-1.414L11.414 10l5.707-5.707a1 1 0 00-1.414-1.414L10 8.586z"
      clipRule="evenodd"
    />
  </svg>
);

export interface SaveViewModalProps {
  /** Whether modal is open */
  isOpen: boolean;
  /** Callback to close modal */
  onClose: () => void;
  /** AG Grid API instance */
  api: GridApi | null;
  /** Callback when view is saved */
  onSave: (view: {
    label: string;
    saveType: "filters-only" | "full-view";
    category?: string;
    description?: string;
  }) => void;
  /** Available categories */
  categories?: string[];
  /** Dialog panel className */
  panelClassName?: string;
  /** Title className */
  titleClassName?: string;
  /** Content className */
  contentClassName?: string;
  /** Field className */
  fieldClassName?: string;
  /** Label className */
  labelClassName?: string;
  /** Input className */
  inputClassName?: string;
  /** Button className */
  buttonClassName?: string;
  /** Primary button className addition */
  primaryButtonClassName?: string;
  /** Radio group className */
  radioGroupClassName?: string;
  /** Radio option className */
  radioOptionClassName?: string;
  /** Active radio className addition */
  activeRadioClassName?: string;
  /** Checked radio className addition */
  checkedRadioClassName?: string;
  /** Fieldset className */
  fieldsetClassName?: string;
  /** Legend className */
  legendClassName?: string;
}

const saveTypes = [
  {
    value: "filters-only" as const,
    name: "Filters Only",
    description: "Save only the active filters",
  },
  {
    value: "full-view" as const,
    name: "Full View",
    description: "Save filters, columns, sorting, and grouping",
  },
];

export const SaveViewModal: React.FC<SaveViewModalProps> = ({
  isOpen,
  onClose,
  api,
  onSave,
  categories = [],
  panelClassName = "save-view-modal",
  titleClassName = "save-view-modal-title",
  contentClassName = "save-view-modal-content",
  fieldClassName = "save-view-modal-field",
  labelClassName = "save-view-modal-label",
  inputClassName = "save-view-modal-input",
  buttonClassName = "save-view-modal-button",
  primaryButtonClassName = "save-view-modal-button-save",
  radioGroupClassName = "save-view-modal-radio-group",
  radioOptionClassName = "save-view-modal-radio-label",
  activeRadioClassName = "",
  checkedRadioClassName = "",
  fieldsetClassName = "",
  legendClassName = "",
}) => {
  const [viewName, setViewName] = useState("");
  const [saveType, setSaveType] = useState<"filters-only" | "full-view">(
    "filters-only",
  );
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (!viewName.trim()) return;

    onSave({
      label: viewName.trim(),
      saveType,
      category: category || undefined,
      description: description.trim() || undefined,
    });

    // Reset form
    setViewName("");
    setSaveType("filters-only");
    setCategory("");
    setDescription("");
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="save-view-modal-overlay" />
        </Transition>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={panelClassName}>
                <div className="save-view-modal-header">
                  <Dialog.Title className={titleClassName}>
                    Save Current View
                  </Dialog.Title>
                  <button
                    type="button"
                    className="save-view-modal-close"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <Fieldset
                  className={`${contentClassName} ${fieldsetClassName}`}
                >
                  <Legend className={`sr-only ${legendClassName}`}>
                    View Configuration
                  </Legend>

                  {/* View Name */}
                  <Field className={fieldClassName}>
                    <Label className={labelClassName}>
                      View Name <span className="required">*</span>
                    </Label>
                    <Input
                      type="text"
                      value={viewName}
                      onChange={(e) => setViewName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && viewName.trim()) {
                          handleSave();
                        }
                      }}
                      className={inputClassName}
                      placeholder="e.g., High Priority Tasks"
                      autoFocus
                    />
                  </Field>

                  {/* Save Type */}
                  <Fieldset
                    className={`${fieldClassName} ${fieldsetClassName}`}
                  >
                    <Legend className={`${labelClassName} ${legendClassName}`}>
                      Save Type
                    </Legend>
                    <RadioGroup value={saveType} onChange={setSaveType}>
                      <Label className="sr-only">Choose save type</Label>
                      <div className={radioGroupClassName}>
                        {saveTypes.map((type) => (
                          <Radio
                            key={type.value}
                            value={type.value}
                            className={({ focus, checked }) =>
                              `${radioOptionClassName} ${
                                focus ? activeRadioClassName : ""
                              } ${checked ? checkedRadioClassName : ""}`
                            }
                          >
                            {({ checked }) => (
                              <>
                                <div className="flex items-center">
                                  <div className="text-sm">
                                    <p className="font-medium save-view-modal-radio-title">
                                      {type.name}
                                    </p>
                                    <span className="text-gray-500 save-view-modal-radio-description">
                                      {type.description}
                                    </span>
                                  </div>
                                </div>
                                {checked && (
                                  <div className="shrink-0 text-indigo-600">
                                    <div className="h-2 w-2 rounded-full bg-current" />
                                  </div>
                                )}
                              </>
                            )}
                          </Radio>
                        ))}
                      </div>
                    </RadioGroup>
                  </Fieldset>

                  {/* Category */}
                  <Field className={fieldClassName}>
                    <Label className={labelClassName}>Category</Label>
                    <CategorySelector
                      value={category}
                      onChange={setCategory}
                      existingCategories={categories}
                      className="relative"
                      placeholder="Select or create category"
                      inputClassName="save-view-modal-input"
                    />
                  </Field>

                  {/* Description */}
                  <Field className={fieldClassName}>
                    <Label className={labelClassName}>Description</Label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="save-view-modal-textarea"
                      placeholder="Optional description of this view"
                      rows={3}
                    />
                  </Field>
                </Fieldset>

                {/* Footer */}
                <div className="save-view-modal-footer">
                  <button
                    type="button"
                    className={`${buttonClassName} save-view-modal-button-cancel`}
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={`${buttonClassName} ${primaryButtonClassName}`}
                    onClick={handleSave}
                    disabled={!viewName.trim() || !api}
                  >
                    Save View
                  </button>
                </div>
              </Dialog.Panel>
            </Transition>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
