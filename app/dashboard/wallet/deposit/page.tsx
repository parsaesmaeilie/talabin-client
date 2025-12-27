"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/Badge";

export default function DepositPage() {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  const handleDeposit = () => {
    if (amount <= 0) {
      setError("مبلغ باید بیشتر از صفر باشد.");
      return;
    }

    setError("");
    alert(`حساب شما با مبلغ ${amount.toLocaleString()} تومان شارژ شد.`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA" }}>
      {/* Header */}
      <div
        style={{
          background: "#FFFFFF",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <Link href="/dashboard/wallet">
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "#F5F5F5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19L8 12L15 5"
                stroke="#1F1F1F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Link>
        <h1 style={{ fontSize: "18px", fontWeight: 600, flex: 1, color: "#1F1F1F" }}>
          واریز تومان
        </h1>
      </div>

      {/* Content */}
      <div style={{ padding: "0 16px 16px" }}>
        {/* Payment Methods Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "16px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: "#6B7280",
              marginBottom: "12px",
            }}
          >
            روش‌های واریز
          </div>
          <div
            style={{
              borderRadius: "12px",
              border: "1px solid rgba(0,0,0,0.04)",
              background: "#FBFAF7",
              padding: "6px 8px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 4px",
                borderBottom: "1px solid rgba(0,0,0,0.04)",
                fontSize: "12px",
              }}
            >
              <span>درگاه پرداخت بانکی</span>
              <Badge variant="green">فعال</Badge>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 4px",
                fontSize: "12px",
              }}
            >
              <span>کارت به کارت</span>
              <Badge>فعال</Badge>
            </div>
          </div>
        </div>

        {/* Amount Input Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "16px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          }}
        >
          <label
            style={{
              fontSize: "12px",
              color: "#6B7280",
              display: "block",
              marginBottom: "8px",
            }}
          >
            مبلغ شارژ (تومان)
          </label>
          <input
            type="number"
            value={amount === 0 ? "" : amount}
            onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "15px",
              border: "2px solid #F3F4F6",
              borderRadius: "12px",
              background: "#FAFAFA",
              color: "#1F1F1F",
              outline: "none",
            }}
            placeholder="مثلاً 500000"
          />
          {error && (
            <div
              style={{
                fontSize: "12px",
                color: "#DC2626",
                marginTop: "8px",
              }}
            >
              {error}
            </div>
          )}
          <div
            style={{
              fontSize: "11px",
              color: "#6B7280",
              marginTop: "8px",
            }}
          >
            حداقل مبلغ واریز: ۱۰۰,۰۰۰ تومان
          </div>
        </div>

        {/* Deposit Button */}
        <button
          onClick={handleDeposit}
          style={{
            width: "100%",
            padding: "16px",
            fontSize: "15px",
            fontWeight: 600,
            color: "#FFFFFF",
            background: "#059669",
            border: "none",
            borderRadius: "16px",
            cursor: "pointer",
            marginBottom: "16px",
            boxShadow: "0 4px 12px rgba(5, 150, 105, 0.3)",
          }}
        >
          شارژ حساب
        </button>

        {/* Important Notes Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: "#6B7280",
              marginBottom: "12px",
            }}
          >
            نکات مهم
          </div>
          <ul
            style={{
              fontSize: "13px",
              lineHeight: 1.8,
              margin: 0,
              paddingRight: "18px",
              color: "#1F1F1F",
            }}
          >
            <li>واریزی‌های زیر ۱۰۰ هزار تومان پردازش نمی‌شود</li>
            <li>موجودی معمولاً ظرف ۱۰ دقیقه به حساب شما واریز می‌شود</li>
            <li>در صورت عدم واریز، با پشتیبانی تماس بگیرید</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
