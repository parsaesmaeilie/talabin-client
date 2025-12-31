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
        gap: "4px",
        justifyContent: "center",
      }}
    >
      <div style={{borderRadius:"24px",background:"#F3F3F3",padding:"4px"}}>
      <button
        onClick={() => onTabChange("buy")}
        style={{
          padding: "10px",
          fontSize: "15px",
          fontWeight: 600,
          color: activeTab === "buy" ? "#1F1F1F" : "#6B7280",
          background: activeTab === "buy" ? "#FFC857" : "#F3F3F3",
          border: "none",
          borderRadius: "20px",
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
          padding: "10px",
          fontSize: "15px",
          fontWeight: 600,
          color: activeTab === "sell" ? "#1F1F1F" : "#6B7280",
          background: activeTab === "sell" ? "#FFC857" : "#F3F3F3",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          minWidth: "120px",
        }}
      >
        فروش
      </button>
      </div>
    </div>
  );
};
