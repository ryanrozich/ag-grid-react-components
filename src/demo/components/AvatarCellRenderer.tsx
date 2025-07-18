import React, { useState, useMemo } from "react";
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
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!value) return null;

  // Check if this assignee should have a photo
  const hasPhoto = ASSIGNEES_WITH_PHOTOS.has(value);

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

  // Use different avatar services for variety
  const avatarUrl = useMemo(() => {
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

  // Debug logging
  React.useEffect(() => {
    if (hasPhoto) {
      console.log(`Avatar for ${value}:`, {
        url: avatarUrl,
        seed: value.toLowerCase().replace(/\s+/g, ""),
        imageError,
        imageLoaded,
      });
    }
  }, [value, avatarUrl, hasPhoto, imageError, imageLoaded]);

  return (
    <div className={styles.avatarContainer}>
      <div className={styles.avatarWrapper}>
        {!imageError ? (
          <>
            {!imageLoaded && hasPhoto && (
              <div
                className={styles.avatarFallback}
                style={{
                  backgroundColor: `#${backgroundColor}`,
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                {initials}
              </div>
            )}
            <img
              src={avatarUrl}
              alt={value}
              className={styles.avatar}
              loading="lazy"
              onLoad={() => {
                console.log(`Successfully loaded avatar for ${value}`);
                setImageLoaded(true);
              }}
              onError={(e) => {
                console.error(`Failed to load avatar for ${value}:`, e);
                setImageError(true);
              }}
              style={{
                opacity: imageLoaded || !hasPhoto ? 1 : 0,
                transition: "opacity 0.3s ease-in-out",
              }}
            />
          </>
        ) : (
          <div
            className={styles.avatarFallback}
            style={{ backgroundColor: `#${backgroundColor}` }}
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
