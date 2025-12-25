import React from "react";
import Link from "next/link";

export const InstallmentCard: React.FC = () => {
  return (
    <Link
      href="/dashboard/installment"
      className="card"
      style={{
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        background: "linear-gradient(135deg, #FFF8E7 0%, #FFFFFF 100%)",
      }}
    >
      <div style={{ fontSize: "48px", marginBottom: "12px" }}>📅</div>
      <div style={{ fontSize: "14px", fontWeight: 600, textAlign: "center", marginBottom: "4px" }}>
        خرید قسطی
      </div>
      <div style={{ fontSize: "12px", color: "var(--color-muted)", textAlign: "center" }}>
        خرید طلا به صورت اقساط
      </div>
    </Link>
  );
};
