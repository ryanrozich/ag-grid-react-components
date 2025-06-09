import React, { useState, useMemo } from "react";
import { ICellRendererParams } from "ag-grid-community";
import styles from "./AvatarCellRenderer.module.css";

interface AvatarCellRendererProps extends ICellRendererParams {
  value: string;
}

const AvatarCellRenderer: React.FC<AvatarCellRendererProps> = ({ value }) => {
  const [imageError, setImageError] = useState(false);

  if (!value) return null;

  // Get initials from the name
  const initials = useMemo(() => {
    const parts = value.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return parts[0][0].toUpperCase();
  }, [value]);

  // Generate a color based on the name (deterministic)
  const backgroundColor = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = value.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Use a limited set of professional colors
    const colors = [
      "2563eb", // blue-600
      "7c3aed", // violet-600
      "db2777", // pink-600
      "dc2626", // red-600
      "ea580c", // orange-600
      "16a34a", // green-600
      "0891b2", // cyan-600
      "9333ea", // purple-600
      "0d9488", // teal-600
      "059669", // emerald-600
    ];

    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }, [value]);

  // Use UI Avatars API for avatar generation
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(value)}&background=${backgroundColor}&color=fff&size=32&bold=true&format=svg`;

  return (
    <div className={styles.avatarContainer}>
      <div className={styles.avatarWrapper}>
        {!imageError ? (
          <img
            src={avatarUrl}
            alt={value}
            className={styles.avatar}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className={styles.avatarFallback}
            style={{ backgroundColor: `#${backgroundColor}` }}
          >
            {initials}
          </div>
        )}
      </div>
      <span className={styles.name}>{value}</span>
    </div>
  );
};

export default AvatarCellRenderer;
