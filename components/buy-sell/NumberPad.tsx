"use client";

import React from "react";

interface NumberPadProps {
  onNumberClick: (num: string) => void;
  onBackspace: () => void;
}

const persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export const NumberPad: React.FC<NumberPadProps> = ({ onNumberClick, onBackspace }) => {
  // Layout: 3-2-1, 6-5-4, 9-8-7, X-0-. (RTL Persian layout)
  const padLayout = [
    [3, 2, 1],
    [6, 5, 4],
    [9, 8, 7],
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1px",
        background: "#E5E7EB",
        borderRadius: "12px",
        overflow: "hidden",
        padding: "1px",
      }}
    >
      {padLayout.flat().map((num) => (
        <button
          key={num}
          onClick={() => onNumberClick(num.toString())}
          style={{
            aspectRatio: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: 600,
            color: "#1F1F1F",
            background: "#FFFFFF",
            border: "none",
            borderRadius: "0",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.background = "#F5F5F5";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.background = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#FFFFFF";
          }}
        >
          {persianNumbers[num - 1]}
        </button>
      ))}

      {/* Decimal point */}
      <button
        onClick={() => onNumberClick(".")}
        style={{
          aspectRatio: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          fontWeight: 600,
          color: "#1F1F1F",
          background: "#FFFFFF",
          border: "none",
          borderRadius: "0",
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.background = "#F5F5F5";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.background = "#FFFFFF";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#FFFFFF";
        }}
      >
        .
      </button>

      {/* Zero */}
      <button
        onClick={() => onNumberClick("0")}
        style={{
          aspectRatio: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          fontWeight: 600,
          color: "#1F1F1F",
          background: "#FFFFFF",
          border: "none",
          borderRadius: "0",
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.background = "#F5F5F5";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.background = "#FFFFFF";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#FFFFFF";
        }}
      >
        {persianNumbers[9]}
      </button>

      {/* Backspace */}
      <button
        onClick={onBackspace}
        style={{
          aspectRatio: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          color: "#1F1F1F",
          background: "#FFFFFF",
          border: "none",
          borderRadius: "0",
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.background = "#F5F5F5";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.background = "#FFFFFF";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#FFFFFF";
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9l-7-9 7-9z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};
