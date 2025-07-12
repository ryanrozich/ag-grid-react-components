import React, { ReactNode } from "react";
import type { SavedView, SavedViewCategory } from "./types";

interface SavedViewsListProps {
  views: SavedView[];
  categories: SavedViewCategory[];
  activeViewId: string | null;
  onSelectView: (view: SavedView) => void;
  onDeleteView: (viewId: string) => void;
  onSetDefault: (viewId: string) => void;
  children?: (props: {
    groupedViews: Record<string, SavedView[]>;
    categories: SavedViewCategory[];
    activeViewId: string | null;
    onSelectView: (view: SavedView) => void;
    onDeleteView: (viewId: string) => void;
    onSetDefault: (viewId: string) => void;
  }) => ReactNode;
  [key: string]: any;
}

export const SavedViewsList: React.FC<SavedViewsListProps> = ({
  views,
  categories,
  activeViewId,
  onSelectView,
  onDeleteView,
  onSetDefault,
  children,
  ...props
}) => {
  // Group views by category
  const groupedViews = views.reduce(
    (acc, view) => {
      const categoryId = view.category;
      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }
      acc[categoryId].push(view);
      return acc;
    },
    {} as Record<string, SavedView[]>,
  );

  // Default render
  if (children) {
    return (
      <div {...props} data-saved-views-list>
        {children({
          groupedViews,
          categories,
          activeViewId,
          onSelectView,
          onDeleteView,
          onSetDefault,
        })}
      </div>
    );
  }

  // No views
  if (views.length === 0) {
    return (
      <div {...props} data-saved-views-list data-empty="true">
        <p data-empty-message>No saved views yet</p>
        <p data-empty-description>Save your current filters to create a view</p>
      </div>
    );
  }

  // Default structure with data attributes
  return (
    <div {...props} data-saved-views-list>
      {categories.map((category) => {
        const categoryViews = groupedViews[category.id] || [];
        if (categoryViews.length === 0) return null;

        return (
          <div key={category.id} data-category-group>
            <div data-category-header>
              {category.icon && <span data-category-icon>{category.icon}</span>}
              <span data-category-name>{category.name}</span>
              <span data-category-count>{categoryViews.length}</span>
            </div>

            <div data-views-container>
              {categoryViews.map((view) => (
                <ViewItem
                  key={view.id}
                  view={view}
                  isActive={view.id === activeViewId}
                  onSelect={() => onSelectView(view)}
                  onDelete={() => onDeleteView(view.id)}
                  onSetDefault={() => onSetDefault(view.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Individual View Item Component
interface ViewItemProps {
  view: SavedView;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}

const ViewItem: React.FC<ViewItemProps> = ({
  view,
  isActive,
  onSelect,
  onDelete,
  onSetDefault,
}) => {
  return (
    <div
      data-view-item
      data-active={isActive ? "true" : "false"}
      data-default={view.isDefault ? "true" : "false"}
    >
      <button
        data-view-button
        onClick={onSelect}
        title={view.description || view.name}
      >
        <span data-view-name>{view.name}</span>
        {view.isDefault && <span data-default-indicator>★</span>}
      </button>

      <div data-view-actions>
        <button
          data-action="set-default"
          onClick={(e) => {
            e.stopPropagation();
            onSetDefault();
          }}
          title="Set as default view"
          disabled={view.isDefault}
        >
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </button>

        <button
          data-action="delete"
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm(`Delete view "${view.name}"?`)) {
              onDelete();
            }
          }}
          title="Delete view"
        >
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
