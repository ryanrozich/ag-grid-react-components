import type { SavedView, SavedViewCategory, ExportData } from "./types";

export const DEFAULT_CATEGORIES: SavedViewCategory[] = [];

export function generateId(): string {
  return `view_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function exportViews(
  views: SavedView[],
  categories: SavedViewCategory[],
): string {
  const exportData: ExportData = {
    version: "1.0",
    exportDate: new Date().toISOString(),
    views,
    categories,
  };

  return JSON.stringify(exportData, null, 2);
}

export function downloadJson(data: string, filename: string): void {
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function validateImportData(data: any): ExportData | null {
  try {
    // Check required fields
    if (!data.version || !data.views || !Array.isArray(data.views)) {
      return null;
    }

    // Validate each view
    for (const view of data.views) {
      if (!view.id || !view.name || !view.category || !view.filterModel) {
        return null;
      }
    }

    // Validate categories if present
    if (data.categories && Array.isArray(data.categories)) {
      for (const category of data.categories) {
        if (!category.id || !category.name) {
          return null;
        }
      }
    }

    return data as ExportData;
  } catch (error) {
    console.error("Invalid import data:", error);
    return null;
  }
}

export function mergeImportedData(
  currentViews: SavedView[],
  currentCategories: SavedViewCategory[],
  importData: ExportData,
): { views: SavedView[]; categories: SavedViewCategory[] } {
  // Create map for efficient category lookup
  const categoryMap = new Map(currentCategories.map((c) => [c.id, c]));

  // Merge categories (don't duplicate)
  const mergedCategories = [...currentCategories];
  for (const category of importData.categories || []) {
    if (!categoryMap.has(category.id)) {
      mergedCategories.push(category);
    }
  }

  // Generate new IDs for imported views to avoid conflicts
  const mergedViews = [...currentViews];
  for (const view of importData.views) {
    const newView: SavedView = {
      ...view,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mergedViews.push(newView);
  }

  return { views: mergedViews, categories: mergedCategories };
}
