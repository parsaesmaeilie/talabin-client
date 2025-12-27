"use client";

import { useState } from "react";
import Link from "next/link";

export default function WithdrawPage() {
  const [amount, setAmount] = useState(0);
  const [shaba, setShaba] = useState("");
  const [amountError, setAmountError] = useState("");
  const [shabaError, setShabaError] = useState("");
  const [success, setSuccess] = useState(false);

  const isShabaValid = (shaba: string) => /^[0-9]{24}$/.test(shaba);

  const handleWithdraw = () => {
    let hasError = false;

    setAmountError("");
    setShabaError("");

    if (amount <= 0) {
      setAmountError("مبلغ باید بیشتر از صفر باشد.");
      hasError = true;
    }

    if (!isShabaValid(shaba)) {
      setShabaError("شماره شبا باید 24 رقم باشد.");
      hasError = true;
    }

    if (hasError) return;

    setSuccess(true);
    alert(`مبلغ ${amount.toLocaleString()} تومان از حساب شما برداشت شد.`);
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
          برداشت تومان
        </h1>
      </div>

      {/* Content */}
      <div style={{ padding: "0 16px 16px" }}>
        {/* Warning Card */}
        <div
          style={{
            background: "#FEF3C7",
            borderRadius: "20px",
            padding: "16px",
            marginBottom: "16px",
            display: "flex",
            gap: "12px",
            alignItems: "flex-start",
          }}
        >
          <div style={{ fontSize: "20px" }}>⚠️</div>
          <div
            style={{
              fontSize: "12px",
              color: "#92400E",
              lineHeight: 1.7,
            }}
          >
            حساب مقصد باید به نام مالک اکانت باشد؛ در غیر این صورت تراکنش انجام نخواهد شد.
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div
            style={{
              background: "#D1FAE5",
              borderRadius: "20px",
              padding: "16px",
              marginBottom: "16px",
              textAlign: "center",
              color: "#059669",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            ✓ تراکنش با موفقیت انجام شد
          </div>
        )}

        {/* Form Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "16px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                fontSize: "12px",
                color: "#6B7280",
                display: "block",
                marginBottom: "8px",
              }}
            >
              مبلغ برداشت (تومان)
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
            {amountError && (
              <div
                style={{
                  fontSize: "12px",
                  color: "#DC2626",
                  marginTop: "8px",
                }}
              >
                {amountError}
              </div>
            )}
          </div>

          <div>
            <label
              style={{
                fontSize: "12px",
                color: "#6B7280",
                display: "block",
                marginBottom: "8px",
              }}
            >
              شماره شبا (بدون IR)
            </label>
            <input
              type="text"
              value={shaba}
              onChange={(e) => setShaba(e.target.value)}
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
              placeholder="مثلاً 123456789012345678901234"
              maxLength={24}
            />
            {shabaError && (
              <div
                style={{
                  fontSize: "12px",
                  color: "#DC2626",
                  marginTop: "8px",
                }}
              >
                {shabaError}
              </div>
            )}
            <div
              style={{
                fontSize: "11px",
                color: "#6B7280",
                marginTop: "8px",
              }}
            >
              24 رقم بدون IR
            </div>
          </div>
        </div>

        {/* Withdraw Button */}
        <button
          onClick={handleWithdraw}
          style={{
            width: "100%",
            padding: "16px",
            fontSize: "15px",
            fontWeight: 600,
            color: "#FFFFFF",
            background: "#DC2626",
            border: "none",
            borderRadius: "16px",
            cursor: "pointer",
            marginBottom: "16px",
            boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)",
          }}
        >
          برداشت از حساب
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
            <li>حداقل مبلغ برداشت ۵۰ هزار تومان است</li>
            <li>برداشت معمولاً ظرف ۲۴ ساعت انجام می‌شود</li>
            <li>حساب مقصد باید به نام خود شما باشد</li>
            <li>کارمزد برداشت: رایگان</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
