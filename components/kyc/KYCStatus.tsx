export type KYCStatusType = "not_started" | "pending" | "verified" | "rejected";

interface KYCStatusProps {
  status: KYCStatusType;
  size?: "small" | "medium" | "large";
  showLabel?: boolean;
}

export const KYCStatus: React.FC<KYCStatusProps> = ({
  status,
  size = "medium",
  showLabel = true,
}) => {
  const statusConfig = {
    not_started: {
      icon: "⏳",
      label: "تکمیل نشده",
      color: "#F59E0B",
      background: "rgba(245, 158, 11, 0.1)",
    },
    pending: {
      icon: "🔄",
      label: "در حال بررسی",
      color: "#3B82F6",
      background: "rgba(59, 130, 246, 0.1)",
    },
    verified: {
      icon: "✓",
      label: "تایید شده",
      color: "#10B981",
      background: "rgba(16, 185, 129, 0.1)",
    },
    rejected: {
      icon: "✕",
      label: "رد شده",
      color: "#EF4444",
      background: "rgba(239, 68, 68, 0.1)",
    },
  };

  const config = statusConfig[status];

  const sizes = {
    small: {
      fontSize: "10px",
      padding: "4px 10px",
      iconSize: "12px",
    },
    medium: {
      fontSize: "12px",
      padding: "6px 14px",
      iconSize: "14px",
    },
    large: {
      fontSize: "14px",
      padding: "8px 18px",
      iconSize: "16px",
    },
  };

  const sizeConfig = sizes[size];

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: sizeConfig.padding,
        background: config.background,
        color: config.color,
        borderRadius: "999px",
        fontSize: sizeConfig.fontSize,
        fontWeight: 600,
        border: `1px solid ${config.color}20`,
      }}
    >
      <span style={{ fontSize: sizeConfig.iconSize }}>{config.icon}</span>
      {showLabel && <span>{config.label}</span>}
    </div>
  );
};
