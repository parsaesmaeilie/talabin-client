"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function WithdrawPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [shaba, setShaba] = useState("");
  const [amountError, setAmountError] = useState("");
  const [shabaError, setShabaError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const isShabaValid = (shaba: string) => /^[0-9]{24}$/.test(shaba);

  const toPersianNumber = (num: string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const handleWithdraw = () => {
    let hasError = false;

    setAmountError("");
    setShabaError("");

    const numAmount = parseInt(amount.replace(/,/g, ""));

    if (!amount || numAmount <= 0) {
      setAmountError("مبلغ باید بیشتر از صفر باشد.");
      hasError = true;
    } else if (numAmount < 50000) {
      setAmountError("حداقل مبلغ برداشت ۵۰ هزار تومان است.");
      hasError = true;
    }

    if (!isShabaValid(shaba)) {
      setShabaError("شماره شبا باید ۲۴ رقم باشد.");
      hasError = true;
    }

    if (hasError) return;

    // Show success modal first
    setShowSuccessModal(true);

    // After 2 seconds, navigate to success page
    setTimeout(() => {
      router.push(`/dashboard/wallet/withdraw/success?amount=${numAmount.toLocaleString()}&fee=1355&tracking=343def4r`);
    }, 2000);
  };

  const formatNumber = (value: string) => {
    const num = value.replace(/\D/g, "");
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumber(e.target.value);
    setAmount(formatted);
    setAmountError("");
  };

  return (
    <>
      <div style={{ minHeight: "100vh", background: "#FAFAFA", paddingBottom: "100px" }}>
        {/* Header */}
        <div
          style={{
            background: "#FFFFFF",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
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
        <div style={{ padding: "0 16px 16px", maxWidth: "600px", margin: "0 auto" }}>
          {/* Balance Info Card */}
          <div
            style={{
              background: "linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)",
              borderRadius: "20px",
              padding: "20px",
              marginTop: "16px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: "13px", color: "#6B7280", marginBottom: "6px" }}>
                موجودی قابل برداشت
              </div>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#1F2937" }}>
                {toPersianNumber("15,000,000")} تومان
              </div>
            </div>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "rgba(251, 191, 36, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 12H14"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Form Card */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "24px",
              marginBottom: "16px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            }}
          >
            {/* Amount Input */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#374151",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                مبلغ برداشت (تومان)
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  style={{
                    width: "100%",
                    padding: "16px 50px 16px 16px",
                    fontSize: "16px",
                    fontWeight: 600,
                    border: `2px solid ${amountError ? "#EF4444" : "#E5E7EB"}`,
                    borderRadius: "16px",
                    background: "#F9FAFB",
                    color: "#1F2937",
                    outline: "none",
                    transition: "all 0.2s",
                  }}
                  placeholder="مثلاً ۵۰۰,۰۰۰"
                  onFocus={(e) => {
                    if (!amountError) e.target.style.borderColor = "#FDB022";
                  }}
                  onBlur={(e) => {
                    if (!amountError) e.target.style.borderColor = "#E5E7EB";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "14px",
                    color: "#9CA3AF",
                    fontWeight: 500,
                  }}
                >
                  تومان
                </div>
              </div>
              {amountError && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#EF4444",
                    marginTop: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM8 11C7.72386 11 7.5 10.7761 7.5 10.5C7.5 10.2239 7.72386 10 8 10C8.27614 10 8.5 10.2239 8.5 10.5C8.5 10.7761 8.27614 11 8 11ZM8.5 8.5C8.5 8.77614 8.27614 9 8 9C7.72386 9 7.5 8.77614 7.5 8.5V5.5C7.5 5.22386 7.72386 5 8 5C8.27614 5 8.5 5.22386 8.5 5.5V8.5Z"
                      fill="currentColor"
                    />
                  </svg>
                  {amountError}
                </div>
              )}
            </div>

            {/* SHABA Input */}
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#374151",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                شماره شبا (بدون IR)
              </label>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "14px",
                    color: "#6B7280",
                    fontWeight: 600,
                  }}
                >
                  IR
                </div>
                <input
                  type="text"
                  value={shaba}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setShaba(value);
                    setShabaError("");
                  }}
                  style={{
                    width: "100%",
                    padding: "16px 16px 16px 40px",
                    fontSize: "15px",
                    fontWeight: 500,
                    border: `2px solid ${shabaError ? "#EF4444" : "#E5E7EB"}`,
                    borderRadius: "16px",
                    background: "#F9FAFB",
                    color: "#1F2937",
                    outline: "none",
                    fontFamily: "monospace",
                    letterSpacing: "0.5px",
                    transition: "all 0.2s",
                  }}
                  placeholder="۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰۰"
                  maxLength={24}
                  onFocus={(e) => {
                    if (!shabaError) e.target.style.borderColor = "#FDB022";
                  }}
                  onBlur={(e) => {
                    if (!shabaError) e.target.style.borderColor = "#E5E7EB";
                  }}
                />
              </div>
              {shabaError && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#EF4444",
                    marginTop: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM8 11C7.72386 11 7.5 10.7761 7.5 10.5C7.5 10.2239 7.72386 10 8 10C8.27614 10 8.5 10.2239 8.5 10.5C8.5 10.7761 8.27614 11 8 11ZM8.5 8.5C8.5 8.77614 8.27614 9 8 9C7.72386 9 7.5 8.77614 7.5 8.5V5.5C7.5 5.22386 7.72386 5 8 5C8.27614 5 8.5 5.22386 8.5 5.5V8.5Z"
                      fill="currentColor"
                    />
                  </svg>
                  {shabaError}
                </div>
              )}
              <div
                style={{
                  fontSize: "12px",
                  color: "#9CA3AF",
                  marginTop: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6.5" stroke="currentColor"/>
                  <path d="M7 4V7.5M7 10H7.005" stroke="currentColor" strokeLinecap="round"/>
                </svg>
                ۲۴ رقم بدون IR - حساب مقصد باید به نام خودتان باشد
              </div>
            </div>
          </div>

          {/* Important Info Card */}
          <div
            style={{
              background: "#FEF3C7",
              borderRadius: "16px",
              padding: "16px",
              marginBottom: "20px",
              border: "1px solid #FDE68A",
            }}
          >
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
                <path
                  d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 15C9.45 15 9 14.55 9 14C9 13.45 9.45 13 10 13C10.55 13 11 13.45 11 14C11 14.55 10.55 15 10 15ZM11 11H9V5H11V11Z"
                  fill="#F59E0B"
                />
              </svg>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#92400E", marginBottom: "6px" }}>
                  نکات مهم
                </div>
                <ul
                  style={{
                    fontSize: "12px",
                    lineHeight: 1.8,
                    margin: 0,
                    paddingRight: "18px",
                    color: "#78350F",
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

          {/* Withdraw Button */}
          <button
            onClick={handleWithdraw}
            style={{
              width: "100%",
              padding: "18px",
              fontSize: "16px",
              fontWeight: 700,
              color: "#FFFFFF",
              background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
              border: "none",
              borderRadius: "16px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(220, 38, 38, 0.25)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(220, 38, 38, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.25)";
            }}
          >
            درخواست برداشت
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            className="scale-in"
            style={{
              background: "#FFFFFF",
              borderRadius: "24px",
              padding: "40px 30px",
              maxWidth: "400px",
              width: "100%",
              textAlign: "center",
            }}
          >
            {/* Success Icon with rings */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <div style={{ position: "relative" }}>
                {/* Concentric rings */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "110px",
                    height: "110px",
                    border: "2px solid #10B981",
                    borderRadius: "50%",
                    opacity: 0.2,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "85px",
                    height: "85px",
                    border: "2px solid #10B981",
                    borderRadius: "50%",
                    opacity: 0.4,
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M8 16L14 22L24 12"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#1F2937",
                marginBottom: "12px",
              }}
            >
              برداشت شما با موفقیت انجام شد
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#6B7280",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              درخواست شما در حال پردازش است و به زودی به حساب شما واریز خواهد شد.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
