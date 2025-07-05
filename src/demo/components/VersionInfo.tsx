import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./VersionInfo.module.css";
import versionInfo from "../version-info.json";

export const VersionInfo: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });

  const { version, git, deployment, buildTime, displayVersion, displayLabel } =
    versionInfo;

  // Calculate dropdown position when showing
  useEffect(() => {
    if (showDetails && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8, // 8px gap
        right: window.innerWidth - rect.right + window.scrollX,
      });
    }
  }, [showDetails]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDetails(false);
      }
    };

    if (showDetails) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDetails]);

  // Determine badge style based on context
  const getBadgeStyle = () => {
    if (deployment.isPR) return styles.badgePR;
    if (git?.branch !== "main") return styles.badgeBranch;
    if (git?.commitsSinceTag > 0) return styles.badgeUnreleased;
    return styles.badgeLatest;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getGitHubUrl = () => {
    if (!git) return null;
    const baseUrl = "https://github.com/ryanrozich/ag-grid-react-components";

    if (deployment.isPR) {
      return `${baseUrl}/pull/${deployment.prNumber}`;
    }

    return `${baseUrl}/commit/${git.commitHash}`;
  };

  const getChangesUrl = () => {
    if (!git || git.commitsSinceTag === 0) return null;
    const baseUrl = "https://github.com/ryanrozich/ag-grid-react-components";
    return `${baseUrl}/compare/${git.latestTag}...${git.shortHash}`;
  };

  return (
    <div className={`${styles.versionInfo} ${className}`}>
      <button
        ref={buttonRef}
        onClick={() => setShowDetails(!showDetails)}
        className={styles.versionButton}
        aria-label="Show version details"
      >
        <span className={styles.versionNumber}>{displayVersion}</span>
        {displayLabel !== "latest" && (
          <span className={`${styles.badge} ${getBadgeStyle()}`}>
            {displayLabel}
          </span>
        )}
      </button>

      {showDetails &&
        ReactDOM.createPortal(
          <div
            ref={dropdownRef}
            className={styles.dropdown}
            style={{
              position: "fixed",
              top: `${dropdownPosition.top}px`,
              right: `${dropdownPosition.right}px`,
              zIndex: 9999,
            }}
          >
            <h3 className={styles.dropdownTitle}>Version Details</h3>

            <div className={styles.detailsList}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Package Version:</span>
                <span
                  className={`${styles.detailValue} ${styles.versionNumber}`}
                >
                  v{version}
                </span>
              </div>

              {git && (
                <>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Branch:</span>
                    <span
                      className={`${styles.detailValue} ${styles.versionNumber}`}
                    >
                      {git.branch}
                    </span>
                  </div>

                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Commit:</span>
                    <a
                      href={getGitHubUrl() || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.link} ${styles.versionNumber}`}
                    >
                      {git.shortHash}
                      {git.isDirty && (
                        <span style={{ color: "#fbbf24", marginLeft: "4px" }}>
                          +dirty
                        </span>
                      )}
                    </a>
                  </div>

                  {git.commitsSinceTag > 0 && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>
                        Since {git.latestTag}:
                      </span>
                      <a
                        href={getChangesUrl() || undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        {git.commitsSinceTag} commits →
                      </a>
                    </div>
                  )}

                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Commit Date:</span>
                    <span className={styles.detailValue}>
                      {formatDate(git.commitDate)}
                    </span>
                  </div>
                </>
              )}

              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Build Time:</span>
                <span className={styles.detailValue}>
                  {formatDate(buildTime)}
                </span>
              </div>

              {deployment.isPR && (
                <div className={styles.divider}>
                  <div className={styles.detailRow}>
                    <span style={{ color: "#a78bfa" }}>PR Preview</span>
                    <a
                      href={getGitHubUrl() || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      View PR #{deployment.prNumber} →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default VersionInfo;
