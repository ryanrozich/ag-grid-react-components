import React, { useMemo } from "react";
import { ICellRendererParams } from "ag-grid-community";
import styles from "./AvatarCellRenderer.module.css";

interface AvatarCellRendererProps extends ICellRendererParams {
  value: string;
}

// Define which assignees should show photos (70% of them)
const ASSIGNEES_WITH_PHOTOS = new Set([
  "Alex Chen",
  "Sarah Johnson",
  "Marcus Williams",
  "Emma Davis",
  "James Wilson",
  "Maya Patel",
  "Chris Martinez",
  "Olivia Brown",
  "David Lee",
  "Sophia Taylor",
  "Michael Anderson",
  "Isabella Garcia",
  "Ryan Thomas",
  "Priya Sharma",
]);

const AvatarCellRenderer: React.FC<AvatarCellRendererProps> = ({ value }) => {
  // Check if this assignee should have a photo
  const hasPhoto = value ? ASSIGNEES_WITH_PHOTOS.has(value) : false;

  // Get initials from the name
  const initials = useMemo(() => {
    if (!value) return "";
    const parts = value.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return parts[0][0].toUpperCase();
  }, [value]);

  // Generate a color based on the name (deterministic)
  const backgroundColor = useMemo(() => {
    if (!value) return "94a3b8"; // default gray color
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

  // Use different avatar services for variety
  const avatarUrl = useMemo(() => {
    if (!value) return "";
    if (!hasPhoto) {
      // Use UI Avatars for initials-based avatars (30% of users)
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(value)}&background=${backgroundColor}&color=fff&size=32&bold=true&format=svg`;
    }

    // Use Pravatar for photo-like avatars (70% of users)
    // Generate a consistent seed based on the name to get the same avatar each time
    const seed = value.toLowerCase().replace(/\s+/g, "");

    // Use the seed parameter for consistent avatars
    return `https://i.pravatar.cc/64?u=${seed}`;
  }, [value, hasPhoto, backgroundColor]);

  if (!value) return null;

  return (
    <div className={styles.avatarContainer}>
      <div className={styles.avatarWrapper}>
        {hasPhoto ? (
          <img
            src={avatarUrl}
            alt={value}
            className={styles.avatar}
            loading="lazy"
            onError={(e) => {
              // On error, hide the image and show initials
              const img = e.target as HTMLImageElement;
              img.style.display = "none";
              const fallback = img.nextElementSibling as HTMLElement;
              if (fallback) {
                fallback.style.display = "flex";
              }
            }}
          />
        ) : (
          <div
            className={styles.avatarFallback}
            style={{ backgroundColor: `#${backgroundColor}` }}
          >
            {initials}
          </div>
        )}
        {hasPhoto && (
          <div
            className={styles.avatarFallback}
            style={{
              backgroundColor: `#${backgroundColor}`,
              display: "none",
            }}
          >
            {initials}
          </div>
        )}
      </div>
      <span className={styles.name} title={value}>
        {value}
      </span>
    </div>
  );
};

export default AvatarCellRenderer;
