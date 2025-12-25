import React from "react";
import Image from "next/image";

interface IconProps {
  name: string;
  variant?: "bulk" | "linear";
  size?: number;
  className?: string;
  color?: string;
}

// Map icon names to their files
const iconMap: Record<string, string> = {
  // Bulk icons
  "arrange-circle": "arrange-circle",
  "arrow-left": "arrow-left",
  calendar: "calendar",
  "card-receive": "card-receive",
  "card-remove": "card-remove",
  "card-send": "card-send",
  copy: "copy",
  "empty-wallet": "empty-wallet",
  gift: "gift",
  "money-add": "money-add",
  "money-tick": "money-tick",
  "ticket-star": "ticket-star",
  wallet: "empty-wallet",
  // Linear icons
  card: "card",
  personalcard: "personalcard",
  profile: "personalcard",
  // Bottom nav icons mapping
  home: "arrange-circle",
  lightning: "money-tick",
  grid: "arrange-circle",
};

export const Icon: React.FC<IconProps> = ({
  name,
  variant = "bulk",
  size = 24,
  className = "",
  color,
}) => {
  const iconFileName = iconMap[name] || name;
  const iconPath = `/icons/vuesax/${variant}/${iconFileName}.png`;

  return (
    <div
      className={`icon ${className}`}
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "inline-block",
        filter: color
          ? `brightness(0) saturate(100%) ${getColorFilter(color)}`
          : undefined,
      }}
    >
      <Image
        src={iconPath}
        alt={name}
        width={size}
        height={size}
        style={{ objectFit: "contain" }}
        unoptimized
      />
    </div>
  );
};

// Helper to convert color to CSS filter (basic implementation)
function getColorFilter(color: string): string {
  // For now, just return empty string
  // In production, you'd convert hex/rgb to filter values
  return "";
}
