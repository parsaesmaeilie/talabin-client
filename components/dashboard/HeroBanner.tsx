import React from "react";

export const HeroBanner: React.FC = () => {
  return (
    <div
      className="card"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "20px",
        marginBottom: "16px",
        background: "linear-gradient(135deg, #FFF4E1 0%, #FFFFFF 100%)",
      }}
    >
      <div style={{ fontSize: "64px" }}>🏦</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
          طلابین
        </div>
        <div style={{ fontSize: "12px", color: "var(--color-muted)", lineHeight: 1.5 }}>
          پلتفرم امن خرید و فروش طلای آب‌شده
        </div>
      </div>
    </div>
  );
};
