"use client";

import React from "react";

interface NumberPadProps {
  onNumberClick: (num: string) => void;
  onBackspace: () => void;
}

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
        height: "35vh",          // 👈 مهم‌ترین بخش (ثابت روی همه گوشی‌ها)
        minHeight: "260px",
        maxHeight: "360px",
        padding: "8px",
        display: "grid",
        background:"#FAFAFA",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
        gap: "8px",
        direction: "rtl",
      }}
    >
      {keys.map((key) => (
        <button
          key={key}
          onClick={() => handlePress(key)}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "14px",
            border: "none",
            background: "#FAFAFA",
            fontSize: "clamp(18px, 4vw, 26px)",
            fontWeight: 600,
            color: "#1F1F1F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {key === "⌫" ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9l-7-9 7-9z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" />
              <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" />
            </svg>
          ) : (
            key
          )}
        </button>
      ))}
    </div>
  );
};
