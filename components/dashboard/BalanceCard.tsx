import React from "react";

export const BalanceCard: React.FC = () => {
  return (
    <div className="balance-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <div className="balance-label">موجودی طلا</div>
        <div className="balance-amount">
          ۲٫۳۴
          <span className="balance-unit">گرم</span>
        </div>
      </div>

      <div style={{ borderLeft: "1px solid rgba(0,0,0,0.06)", paddingLeft: "16px", marginLeft: "16px" }}>
        <div className="balance-label">موجودی تومان</div>
        <div className="balance-amount">
          ۱,۳۵۰,۰۰۰
          <span className="balance-unit">تومان</span>
        </div>
      </div>

      <button
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          border: "1px solid rgba(0,0,0,0.1)",
          background: "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
        }}
      >
        ⋯
      </button>
    </div>
  );
};
