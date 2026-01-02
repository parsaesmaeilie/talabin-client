"use client";

import React from "react";

interface NumberPadProps {
  onNumberClick: (num: string) => void;
  onBackspace: () => void;
}

const persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export const NumberPad: React.FC<NumberPadProps> = ({ onNumberClick, onBackspace }) => {
  // Layout: 3-2-1, 6-5-4, 9-8-7, .-0-← (RTL Persian layout)
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
        gap: "0",
        background: "transparent",
        borderRadius: "0",
        overflow: "visible",
        padding: "0",
        maxWidth: "100%",
        width: "100%",
        margin: "0 auto",
      }}
    >
      {padLayout.flat().map((num) => (
        <button
          key={num}
          onClick={() => onNumberClick(num.toString())}
          style={{
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            fontWeight: 400,
            color: "#000000",
            background: "transparent",
            border: "none",
            borderRadius: "0",
            cursor: "pointer",
            transition: "opacity 0.15s ease",
            touchAction: "manipulation",
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.opacity = "0.5";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.opacity = "0.5";
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          {persianNumbers[num - 1]}
        </button>
      ))}

      {/* Decimal point */}
      <button
        onClick={() => onNumberClick(".")}
        style={{
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "36px",
          fontWeight: 400,
          color: "#000000",
          background: "transparent",
          border: "none",
          borderRadius: "0",
          cursor: "pointer",
          transition: "opacity 0.15s ease",
          touchAction: "manipulation",
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.opacity = "0.5";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
        onTouchStart={(e) => {
          e.currentTarget.style.opacity = "0.5";
        }}
        onTouchEnd={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
      >
        .
      </button>

      {/* Zero */}
      <button
        onClick={() => onNumberClick("0")}
        style={{
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          fontWeight: 400,
          color: "#000000",
          background: "transparent",
          border: "none",
          borderRadius: "0",
          cursor: "pointer",
          transition: "opacity 0.15s ease",
          touchAction: "manipulation",
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.opacity = "0.5";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
        onTouchStart={(e) => {
          e.currentTarget.style.opacity = "0.5";
        }}
        onTouchEnd={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
      >
        {persianNumbers[9]}
      </button>

      {/* Backspace */}
      <button
        onClick={onBackspace}
        style={{
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          color: "#000000",
          background: "transparent",
          border: "none",
          borderRadius: "0",
          cursor: "pointer",
          transition: "opacity 0.15s ease",
          touchAction: "manipulation",
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.opacity = "0.5";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
        onTouchStart={(e) => {
          e.currentTarget.style.opacity = "0.5";
        }}
        onTouchEnd={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 5H9l-7 7 7 7h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </button>
    </div>
  );
};
