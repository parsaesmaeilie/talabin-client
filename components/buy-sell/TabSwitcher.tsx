"use client";

import React from "react";

interface TabSwitcherProps {
  activeTab: "buy" | "sell";
  onTabChange: (tab: "buy" | "sell") => void;
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({ activeTab, onTabChange }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "8px",
        padding: "4px",
        background: "#F5F5F5",
        borderRadius: "16px",
      }}
    >
      <button
        onClick={() => onTabChange("buy")}
        style={{
          padding: "12px 16px",
          fontSize: "15px",
          fontWeight: 600,
          color: activeTab === "buy" ? "#FFFFFF" : "#6B7280",
          background: activeTab === "buy" ? "#1F1F1F" : "transparent",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        خرید
      </button>
      <button
        onClick={() => onTabChange("sell")}
        style={{
          padding: "12px 16px",
          fontSize: "15px",
          fontWeight: 600,
          color: activeTab === "sell" ? "#FFFFFF" : "#6B7280",
          background: activeTab === "sell" ? "#1F1F1F" : "transparent",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        فروش
      </button>
    </div>
  );
};
