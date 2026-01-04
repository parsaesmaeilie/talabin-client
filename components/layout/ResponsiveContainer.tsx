"use client";

import React from "react";
import { containers } from "@/lib/utils/design-tokens";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  maxWidth?: "mobile" | "mobileApp" | "narrow" | "tablet" | "desktop" | "wide";
  padding?: string;
  background?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * ResponsiveContainer - Ensures content looks good on all viewports
 * Mobile: Full width with padding
 * Desktop: Centered with max-width constraint (like a mobile app)
 */
export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  maxWidth = "mobileApp",
  padding = "0",
  background = "transparent",
  className = "",
  style = {},
}) => {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        maxWidth: containers[maxWidth],
        margin: "0 auto",
        padding,
        background,
        position: "relative",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
