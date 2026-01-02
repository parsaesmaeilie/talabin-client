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
        onClick={() => onTabChange("sell")}
        style={{
          width: "70px",
          height: "30px",
          fontSize: "12px",
          fontWeight: 600,
          color: activeTab === "sell" ? "#000000" : "#6B7280",
          background: activeTab === "sell" ? "#EF8B8B" : "#FFFFFF",
          border: "none",
          borderRadius: "15px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: activeTab === "sell" ? "0 2px 6px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        فروش
      </button>
      <button
        onClick={() => onTabChange("buy")}
        style={{
          width: "70px",
          height: "30px",
          fontSize: "12px",
          fontWeight: 600,
          color: activeTab === "buy" ? "#000000" : "#6B7280",
          background: activeTab === "buy" ? "#FFD874" : "#FFFFFF",
          border: "none",
          borderRadius: "15px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: activeTab === "buy" ? "0 2px 6px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        خرید
      </button>
    </div>
  );
};
