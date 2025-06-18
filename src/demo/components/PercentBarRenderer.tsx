import React from "react";
import { ICellRendererParams } from "ag-grid-community";

interface PercentBarRendererProps extends ICellRendererParams {
  value: number;
}

const PercentBarRenderer: React.FC<PercentBarRendererProps> = ({ value }) => {
  if (value == null) return null;

  // Ensure value is between 0 and 100
  const percent = Math.min(100, Math.max(0, value));

  // Determine color based on percentage
  let barColor = "";
  let textColor = "";

  if (percent === 100) {
    barColor = "rgba(34, 197, 94, 0.3)"; // green
    textColor = "rgb(134, 239, 172)";
  } else if (percent >= 80) {
    barColor = "rgba(59, 130, 246, 0.3)"; // blue
    textColor = "rgb(147, 197, 253)";
  } else if (percent >= 60) {
    barColor = "rgba(168, 85, 247, 0.3)"; // purple
    textColor = "rgb(196, 181, 253)";
  } else if (percent >= 40) {
    barColor = "rgba(234, 179, 8, 0.3)"; // yellow
    textColor = "rgb(253, 224, 71)";
  } else if (percent >= 20) {
    barColor = "rgba(249, 115, 22, 0.3)"; // orange
    textColor = "rgb(253, 186, 116)";
  } else {
    barColor = "rgba(239, 68, 68, 0.3)"; // red
    textColor = "rgb(252, 165, 165)";
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      {/* Background bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: "100%",
          height: "20px",
          backgroundColor: "rgba(107, 114, 128, 0.1)",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        {/* Progress bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: `${percent}%`,
            height: "100%",
            backgroundColor: barColor,
            transition: "width 0.3s ease",
          }}
        />
      </div>
      {/* Text overlay */}
      <div
        style={{
          position: "relative",
          width: "100%",
          textAlign: "center",
          fontSize: "12px",
          fontWeight: "500",
          color: textColor,
          zIndex: 1,
        }}
      >
        {Math.round(percent)}%
      </div>
    </div>
  );
};

export default PercentBarRenderer;
