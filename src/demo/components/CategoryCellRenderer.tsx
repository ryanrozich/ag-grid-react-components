import React from "react";
import { ICellRendererParams } from "ag-grid-community";
import { Category } from "../data/types";

// Dark theme color mapping for categories
const CATEGORY_COLORS: Record<
  Category,
  { bg: string; text: string; border: string }
> = {
  Bug: {
    bg: "rgba(239, 68, 68, 0.15)", // red-500 with opacity
    text: "rgb(252, 165, 165)", // red-300
    border: "rgba(239, 68, 68, 0.3)", // red-500 with opacity
  },
  Feature: {
    bg: "rgba(34, 197, 94, 0.15)", // green-500 with opacity
    text: "rgb(134, 239, 172)", // green-300
    border: "rgba(34, 197, 94, 0.3)", // green-500 with opacity
  },
  Documentation: {
    bg: "rgba(59, 130, 246, 0.15)", // blue-500 with opacity
    text: "rgb(147, 197, 253)", // blue-300
    border: "rgba(59, 130, 246, 0.3)", // blue-500 with opacity
  },
  Refactor: {
    bg: "rgba(168, 85, 247, 0.15)", // purple-500 with opacity
    text: "rgb(196, 181, 253)", // purple-300
    border: "rgba(168, 85, 247, 0.3)", // purple-500 with opacity
  },
  Testing: {
    bg: "rgba(234, 179, 8, 0.15)", // yellow-500 with opacity
    text: "rgb(253, 224, 71)", // yellow-300
    border: "rgba(234, 179, 8, 0.3)", // yellow-500 with opacity
  },
  DevOps: {
    bg: "rgba(107, 114, 128, 0.15)", // gray-500 with opacity
    text: "rgb(209, 213, 219)", // gray-300
    border: "rgba(107, 114, 128, 0.3)", // gray-500 with opacity
  },
  Security: {
    bg: "rgba(249, 115, 22, 0.15)", // orange-500 with opacity
    text: "rgb(253, 186, 116)", // orange-300
    border: "rgba(249, 115, 22, 0.3)", // orange-500 with opacity
  },
  Performance: {
    bg: "rgba(99, 102, 241, 0.15)", // indigo-500 with opacity
    text: "rgb(165, 180, 252)", // indigo-300
    border: "rgba(99, 102, 241, 0.3)", // indigo-500 with opacity
  },
};

interface CategoryCellRendererProps extends ICellRendererParams {
  value: Category;
}

const CategoryCellRenderer: React.FC<CategoryCellRendererProps> = ({
  value,
}) => {
  if (!value) return null;

  const colors = CATEGORY_COLORS[value];
  if (!colors) return <span>{value}</span>;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: "100%",
      }}
    >
      <span
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
          border: `1px solid ${colors.border}`,
          borderRadius: "9999px",
          padding: "2px 12px",
          fontSize: "12px",
          fontWeight: "500",
          letterSpacing: "0.025em",
          lineHeight: "1.5",
          whiteSpace: "nowrap",
          transition: "all 0.2s ease",
          cursor: "default",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.border;
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colors.bg;
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {value}
      </span>
    </div>
  );
};

export default CategoryCellRenderer;
