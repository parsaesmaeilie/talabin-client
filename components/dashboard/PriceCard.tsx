"use client";

import React from "react";
import { Badge } from "../Badge";

export const PriceCard: React.FC = () => {
  return (
    <div className="card" style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
        <div>
          <div style={{ fontSize: "12px", color: "var(--color-muted)", marginBottom: "4px" }}>
            قیمت طلای ۱۸ عیار
          </div>
          <div style={{ fontSize: "20px", fontWeight: 700 }}>
            ۲,۹۸۰,۰۰۰
            <span style={{ fontSize: "12px", color: "var(--color-muted)", marginRight: "6px" }}>
              تومان
            </span>
          </div>
        </div>
        <Badge variant="green">+۰٫۸٪</Badge>
      </div>

      {/* Mini Chart */}
      <div
        style={{
          height: "56px",
          borderRadius: "12px",
          background: "linear-gradient(to left, rgba(255,200,87,0.08), rgba(16,185,129,0.12))",
        }}
      />
    </div>
  );
};
