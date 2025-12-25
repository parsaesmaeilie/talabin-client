"use client";

import React from "react";

interface NumberPadProps {
  onNumberClick: (num: string) => void;
  onBackspace: () => void;
}

const persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export const NumberPad: React.FC<NumberPadProps> = ({
  onNumberClick,
  onBackspace,
}) => {
  return (
    <div className="number-pad">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, idx) => (
        <button
          key={num}
          className="number-pad-button"
          onClick={() => onNumberClick(numbers[idx])}
        >
          {persianNumbers[idx]}
        </button>
      ))}
      <button className="number-pad-button" onClick={() => onNumberClick(".")}>
        .
      </button>
      <button className="number-pad-button" onClick={() => onNumberClick("0")}>
        {persianNumbers[9]}
      </button>
      <button
        className="number-pad-button backspace"
        onClick={onBackspace}
        style={{ fontSize: "20px" }}
      >
        ⌫
      </button>
    </div>
  );
};
