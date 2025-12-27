"use client";

import React from "react";

interface NumberPadProps {
  onNumberClick: (num: string) => void;
  onBackspace: () => void;
}

const persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export const NumberPad: React.FC<NumberPadProps> = ({ onNumberClick, onBackspace }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "12px",
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, idx) => (
        <button
          key={num}
          onClick={() => onNumberClick(numbers[idx])}
          style={{
            aspectRatio: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: 600,
            color: "#1F1F1F",
            background: "#F5F5F5",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(0.95)";
            e.currentTarget.style.background = "#E5E5E5";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.background = "#F5F5F5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.background = "#F5F5F5";
          }}
        >
          {persianNumbers[idx]}
        </button>
      ))}

      <button
        onClick={() => onNumberClick("000")}
        style={{
          aspectRatio: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: 600,
          color: "#1F1F1F",
          background: "#F5F5F5",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "scale(0.95)";
          e.currentTarget.style.background = "#E5E5E5";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.background = "#F5F5F5";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.background = "#F5F5F5";
        }}
      >
        ۰۰۰
      </button>

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
          background: "#F5F5F5",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "scale(0.95)";
          e.currentTarget.style.background = "#E5E5E5";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.background = "#F5F5F5";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.background = "#F5F5F5";
        }}
      >
        {persianNumbers[9]}
      </button>

      <button
        onClick={onBackspace}
        style={{
          aspectRatio: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          color: "#EF4444",
          background: "#FEE2E2",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "scale(0.95)";
          e.currentTarget.style.background = "#FECACA";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.background = "#FEE2E2";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.background = "#FEE2E2";
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9.17 14.83L14.83 9.17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.83 14.83L9.17 9.17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
