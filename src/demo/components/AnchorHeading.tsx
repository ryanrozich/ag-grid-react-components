import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface AnchorHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const AnchorHeading: React.FC<AnchorHeadingProps> = ({
  level,
  id,
  children,
  className = "",
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  // Handle scrolling to anchor on load and navigation
  useEffect(() => {
    const hash = location.hash.slice(1); // Remove the #
    if (hash === id && headingRef.current) {
      // Small delay to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        headingRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

      // Cleanup timeout on unmount or when dependencies change
      return () => clearTimeout(timeoutId);
    }
  }, [location.hash, id]);

  const handleAnchorClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Update URL with hash
    navigate(`${location.pathname}#${id}`, { replace: true });
    // Smooth scroll to element
    headingRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const baseClasses = {
    1: "text-3xl font-bold text-white mb-4",
    2: "text-2xl font-semibold text-white mb-4",
    3: "text-xl font-semibold text-white mb-3",
    4: "text-lg font-semibold text-white mb-3",
    5: "text-base font-semibold text-white mb-2",
    6: "text-sm font-semibold text-white mb-2",
  };

  return (
    <Tag
      ref={headingRef}
      id={id}
      className={`group relative flex items-center ${baseClasses[level]} ${className}`}
    >
      <span className="flex-1">{children}</span>
      <a
        href={`#${id}`}
        onClick={handleAnchorClick}
        className="ml-2 opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity"
        aria-label={`Link to ${children}`}
      >
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      </a>
    </Tag>
  );
};
