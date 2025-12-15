import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "green" | "red" | "yellow";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  const classes = ["badge-pill", variant !== "default" && variant, className]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{children}</span>;
};

export const PillBadge: React.FC<BadgeProps> = ({
  children,
  className = "",
}) => {
  const classes = ["pill-badge", className].filter(Boolean).join(" ");
  return <span className={classes}>{children}</span>;
};
