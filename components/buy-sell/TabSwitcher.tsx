"use client";

import React from "react";

interface TabSwitcherProps {
  activeTab: "buy" | "sell";
  onTabChange: (tab: "buy" | "sell") => void;
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="tab-switcher">
      <button
        className={`tab-button ${activeTab === "buy" ? "active" : ""}`}
        onClick={() => onTabChange("buy")}
      >
        خرید
      </button>
      <button
        className={`tab-button ${activeTab === "sell" ? "active" : ""}`}
        onClick={() => onTabChange("sell")}
      >
        فروش
      </button>
    </div>
  );
};
