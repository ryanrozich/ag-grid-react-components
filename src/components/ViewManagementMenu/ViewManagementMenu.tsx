import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import type { GridApi } from "ag-grid-community";

// Inline SVG icons to avoid @heroicons/react dependency
const EllipsisVerticalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
    />
  </svg>
);

const ArrowDownTrayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
    />
  </svg>
);

const AdjustmentsHorizontalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
    />
  </svg>
);

const ArrowPathIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
    />
  </svg>
);

const ArrowUpTrayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
    />
  </svg>
);

const DocumentArrowDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5 9H5.625c-.621 0-1.125-.504-1.125-1.125v-11.25c0-.621.504-1.125 1.125-1.125h7.875c.621 0 1.125.504 1.125 1.125V17.25m-7.5-15H12m0 0v4.5m0-4.5l2.25-2.25M9.75 21h4.5"
    />
  </svg>
);

const DocumentDuplicateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25c0-.621.504-1.125 1.125-1.125h7.875c.621 0 1.125.504 1.125 1.125v9.25c0 .621-.504 1.125-1.125 1.125z"
    />
  </svg>
);

export interface ViewManagementMenuProps {
  /** AG Grid API instance */
  api: GridApi | null;
  /** Callback when save view is clicked */
  onSaveView?: () => void;
  /** Callback when manage views is clicked */
  onManageViews?: () => void;
  /** Callback when reset to defaults is clicked */
  onResetToDefaults?: () => void;
  /** Callback when import is clicked */
  onImport?: () => void;
  /** Callback when export current view is clicked */
  onExportCurrent?: () => void;
  /** Callback when export all views is clicked */
  onExport?: () => void;
  /** Button className */
  buttonClassName?: string;
  /** Menu items className */
  itemsClassName?: string;
  /** Menu item className */
  itemClassName?: string;
  /** Active item className addition */
  activeItemClassName?: string;
  /** Divider className */
  dividerClassName?: string;
}

export const ViewManagementMenu: React.FC<ViewManagementMenuProps> = ({
  api,
  onSaveView,
  onManageViews,
  onResetToDefaults,
  onImport,
  onExportCurrent,
  onExport,
  buttonClassName = "",
  itemsClassName = "",
  itemClassName = "",
  activeItemClassName = "",
  dividerClassName = "",
}) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className={buttonClassName}>
        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={itemsClassName}>
          <Menu.Item disabled={!api}>
            {({ active, disabled }) => (
              <button
                className={`${itemClassName} ${
                  active && !disabled ? activeItemClassName : ""
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={onSaveView}
                disabled={disabled}
              >
                <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
                Save current view...
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                className={`${itemClassName} ${
                  active ? activeItemClassName : ""
                }`}
                onClick={onManageViews}
              >
                <AdjustmentsHorizontalIcon
                  className="h-4 w-4"
                  aria-hidden="true"
                />
                Manage saved views...
              </button>
            )}
          </Menu.Item>

          <Menu.Item disabled={!api}>
            {({ active, disabled }) => (
              <button
                className={`${itemClassName} ${
                  active && !disabled ? activeItemClassName : ""
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={onResetToDefaults}
                disabled={disabled}
              >
                <ArrowPathIcon className="h-4 w-4" aria-hidden="true" />
                Reset to defaults
              </button>
            )}
          </Menu.Item>

          <div className={dividerClassName} />

          <Menu.Item>
            {({ active }) => (
              <button
                className={`${itemClassName} ${
                  active ? activeItemClassName : ""
                }`}
                onClick={onImport}
              >
                <ArrowUpTrayIcon className="h-4 w-4" aria-hidden="true" />
                Import views...
              </button>
            )}
          </Menu.Item>

          <Menu.Item disabled={!api}>
            {({ active, disabled }) => (
              <button
                className={`${itemClassName} ${
                  active && !disabled ? activeItemClassName : ""
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={onExportCurrent}
                disabled={disabled}
              >
                <DocumentDuplicateIcon className="h-4 w-4" aria-hidden="true" />
                Export current view...
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                className={`${itemClassName} ${
                  active ? activeItemClassName : ""
                }`}
                onClick={onExport}
              >
                <DocumentArrowDownIcon className="h-4 w-4" aria-hidden="true" />
                Export all views...
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
