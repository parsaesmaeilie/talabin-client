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
        display: "flex",
        gap: "12px",
        justifyContent: "center",
      }}
    >
      <button
        onClick={() => onTabChange("buy")}
        style={{
          padding: "12px 32px",
          fontSize: "15px",
          fontWeight: 600,
          color: activeTab === "buy" ? "#1F1F1F" : "#6B7280",
          background: activeTab === "buy" ? "#FFC857" : "#F5F5F5",
          border: "none",
          borderRadius: "24px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          minWidth: "120px",
        }}
      >
        خرید
      </button>
      <button
        onClick={() => onTabChange("sell")}
        style={{
          padding: "12px 32px",
          fontSize: "15px",
          fontWeight: 600,
          color: activeTab === "sell" ? "#FFFFFF" : "#6B7280",
          background: activeTab === "sell" ? "#EF8B8B" : "#F5F5F5",
          border: "none",
          borderRadius: "24px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          minWidth: "120px",
        }}
      >
        فروش
      </button>
    </div>
  );
};
