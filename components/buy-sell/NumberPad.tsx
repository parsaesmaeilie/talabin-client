"use client";

import React from "react";

interface NumberPadProps {
  onNumberClick: (num: string) => void;
  onBackspace: () => void;
}

// Phone layout (1-2-3 on top) in RTL for Persian
const keys = [
  "۳", "۲", "۱",
  "۶", "۵", "۴",
  "۹", "۸", "۷",
  "⌫", "۰", ".",
];

export const NumberPad: React.FC<NumberPadProps> = ({
  onNumberClick,
  onBackspace,
}) => {
  const handlePress = (key: string) => {
    if (key === "⌫") {
      onBackspace();
    } else if (key === "۰") {
      onNumberClick("0");
    } else if (key === ".") {
      onNumberClick(".");
    } else {
      const map = ["۱","۲","۳","۴","۵","۶","۷","۸","۹"];
      onNumberClick(String(map.indexOf(key) + 1));
    }
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "8px 16px 16px",
        display: "grid",
        background: "transparent",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
        gap: "8px",
        minHeight: "300px",
      }}
    >
      {keys.map((key) => {
        const isBackspace = key === "⌫";
        const isDot = key === ".";
        const isZero = key === "۰";

        return (
          <button
            key={key}
            onClick={() => handlePress(key)}
            style={{
              width: "100%",
              height: "100%",
              minHeight: "70px",
              borderRadius: "10px",
              border: "none",
              background: isBackspace || isDot ? "#D1D5DB" : "#F3F4F6",
              fontSize: isDot ? "28px" : "26px",
              fontWeight: 400,
              color: "#1F2937",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.1s ease",
              userSelect: "none",
              WebkitTapHighlightColor: "transparent",
              position: "relative",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.background = isBackspace || isDot ? "#B0B5BF" : "#E5E7EB";
              e.currentTarget.style.transform = "scale(0.96)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.background = isBackspace || isDot ? "#D1D5DB" : "#F3F4F6";
              e.currentTarget.style.transform = "scale(1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isBackspace || isDot ? "#D1D5DB" : "#F3F4F6";
              e.currentTarget.style.transform = "scale(1)";
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.background = isBackspace || isDot ? "#B0B5BF" : "#E5E7EB";
              e.currentTarget.style.transform = "scale(0.96)";
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.background = isBackspace || isDot ? "#D1D5DB" : "#F3F4F6";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {isBackspace ? (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M20 5H9L3 12L9 19H20C20.5304 19 21.0391 18.7893 21.4142 18.4142C21.7893 18.0391 22 17.5304 22 17V7C22 6.46957 21.7893 5.96086 21.4142 5.58579C21.0391 5.21071 20.5304 5 20 5Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 9L17 13M17 9L13 13"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              key
            )}
          </button>
        );
      })}
    </div>
  );
};
