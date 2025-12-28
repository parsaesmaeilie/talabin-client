"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PhysicalReceiptPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock data - replace with API call
  const walletGold = 102; // grams
  const availableForPhysical = 100; // grams

  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
    setError("");
  };

  const incrementAmount = (increment: number) => {
    const currentAmount = parseFloat(amount) || 0;
    setAmount((currentAmount + increment).toString());
    setError("");
  };

  const decrementAmount = (decrement: number) => {
    const currentAmount = parseFloat(amount) || 0;
    const newAmount = Math.max(0, currentAmount - decrement);
    setAmount(newAmount.toString());
    setError("");
  };

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);

    // Validation: Empty field
    if (!amount) {
      setError("این فیلد اجباری است");
      return;
    }

    // Validation: Must be multiple of 10 and at least 10
    if (numAmount < 10 || numAmount % 10 !== 0) {
      setError("حداقل مقدار دریافت فیزیکی طلا ۱۰ گرم است و طلای فیزیکی مورد تقاضای شما باید مضربی از ۱۰ داشته باشد.");
      return;
    }

    // Validation: Exceeds available balance
    if (numAmount > availableForPhysical) {
      setError("مقدار وارد شده بیش از موجودی کیف طلا شما است.");
      return;
    }

    // Success - show success screen
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setAmount("");
    setError("");
    // Redirect to list page
    router.push("/dashboard/physical-receipt/list");
  };

  if (showSuccess) {
    return <SuccessPage onClose={handleSuccessClose} />;
  }

  return (
    <div
      className="min-h-screen"
      style={{ padding: "20px 16px 100px", background: "#F5F5F5" }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
            paddingBottom: "16px",
            borderBottom: "1px solid #E5E5E5",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#E5E5E5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B7280"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>

          <h1
            style={{
              fontSize: "18px",
              fontWeight: 700,
              margin: 0,
              color: "#1F2937",
            }}
          >
            دریافت فیزیکی
          </h1>

          <Link
            href="/dashboard/services"
            style={{
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              cursor: "pointer",
              textDecoration: "none",
              color: "#1F2937",
            }}
          >
            ←
          </Link>
        </div>

        {/* Info Banner */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 16px",
            background: "rgba(251, 191, 36, 0.15)",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "#FDB022",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 700,
              color: "#FFFFFF",
              flexShrink: 0,
            }}
          >
            i
          </div>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#D97706",
            }}
          >
            راهنمای تحویل فیزیکی
          </span>
        </div>

        {/* Balance Card */}
        <div
          style={{
            padding: "20px",
            background: "#E8E4DD",
            borderRadius: "16px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: "13px",
                  color: "#6B7280",
                  marginBottom: "4px",
                }}
              >
                موجودی کیف طلا:
              </div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "#1F2937" }}>
                {toPersianNumber(walletGold)} گرم
              </div>
            </div>
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontSize: "13px",
                  color: "#6B7280",
                  marginBottom: "4px",
                }}
              >
                موجودی قابل دریافت فیزیکی:
              </div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "#1F2937" }}>
                {toPersianNumber(availableForPhysical)} گرم
              </div>
            </div>
          </div>
        </div>

        {/* Amount Input */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #D1D5DB",
            borderRadius: "16px",
            marginBottom: "12px",
            background: "#FFFFFF",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                color: "#6B7280",
              }}
            >
              گرم
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError("");
              }}
              placeholder="مقدار طلا"
              style={{
                fontSize: "18px",
                fontWeight: 600,
                border: "none",
                outline: "none",
                textAlign: "right",
                background: "transparent",
                flex: 1,
                color: "#1F2937",
                marginRight: "12px",
              }}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              display: "flex",
              alignItems: error === "این فیلد اجباری است" ? "center" : "flex-start",
              justifyContent: error === "این فیلد اجباری است" ? "center" : "flex-start",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            {error !== "این فیلد اجباری است" && (
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: "#EF4444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                !
              </div>
            )}
            <span
              style={{
                fontSize: "13px",
                color: "#DC2626",
                lineHeight: "1.5",
                flex: 1,
                textAlign: error === "این فیلد اجباری است" ? "center" : "right",
              }}
            >
              {error}
            </span>
          </div>
        )}

        {/* Quick Amount Buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          {[
            { value: 10, label: "۱۰" },
            { value: 45, label: "۴۵" },
            { value: 30, label: "۳۰" },
          ].map((item) => (
            <div
              key={item.value}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 12px",
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
              }}
            >
              <button
                onClick={() => decrementAmount(item.value)}
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "4px",
                  background: "transparent",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "#6B7280",
                  padding: 0,
                }}
              >
                −
              </button>
              <button
                onClick={() => handleQuickAmount(item.value)}
                style={{
                  padding: "0 8px",
                  background: "transparent",
                  border: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "#1F2937",
                }}
              >
                {item.label} گرم
              </button>
              <button
                onClick={() => incrementAmount(item.value)}
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "4px",
                  background: "transparent",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "#6B7280",
                  padding: 0,
                }}
              >
                +
              </button>
            </div>
          ))}
        </div>

        {/* Info Note */}
        <div
          style={{
            fontSize: "12px",
            color: "#9CA3AF",
            textAlign: "center",
            lineHeight: "1.6",
            marginBottom: "120px",
          }}
        >
          حداقل مقدار دریافت فیزیکی طلا ۱۰ گرم است و طلای فیزیکی مورد تقاضای شما
          باید مضربی از ۱۰ داشته باشد.
        </div>

        {/* Submit Button - Fixed at bottom */}
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "16px",
            right: "16px",
            maxWidth: "568px",
            margin: "0 auto",
          }}
        >
          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "16px",
              background: "#1F2937",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "16px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ثبت درخواست
          </button>
        </div>
      </div>
    </div>
  );
}

// Success Page Component
function SuccessPage({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="min-h-screen"
      style={{
        padding: "20px 16px",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "600px", width: "100%", textAlign: "center" }}>
        {/* Back Arrow */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "16px",
          }}
        >
          <div
            onClick={onClose}
            style={{
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              cursor: "pointer",
              color: "#1F2937",
            }}
          >
            ←
          </div>
        </div>

        {/* Success Badge */}
        <div
          style={{
            display: "inline-block",
            padding: "12px 32px",
            background: "rgba(147, 197, 253, 0.3)",
            borderRadius: "24px",
            marginBottom: "40px",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#1E40AF",
            }}
          >
            درخواست شما  ثبت شد
          </span>
        </div>

        {/* Illustration */}
        <div
          style={{
            marginBottom: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <svg
            width="300"
            height="300"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Circle */}
            <circle cx="150" cy="150" r="140" fill="#EFF6FF" opacity="0.5" />

            {/* Blue geometric shapes */}
            <path
              d="M100 180 L140 220 L180 180 L220 220"
              stroke="#3B82F6"
              strokeWidth="4"
              fill="none"
            />
            <rect x="80" y="140" width="60" height="80" fill="#3B82F6" rx="4" />
            <rect x="160" y="140" width="60" height="80" fill="#3B82F6" rx="4" />

            {/* People illustration simplified */}
            <circle cx="110" cy="120" r="20" fill="#1F2937" />
            <path d="M90 140 Q110 150 130 140" stroke="#1F2937" strokeWidth="3" fill="none" />

            <circle cx="190" cy="120" r="20" fill="#1F2937" />
            <path d="M170 140 Q190 150 210 140" stroke="#1F2937" strokeWidth="3" fill="none" />

            {/* Gold/Hand icon in center */}
            <rect x="130" y="100" width="40" height="30" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2" rx="4" />
            <path d="M140 110 L160 110 M140 115 L160 115" stroke="#FFC857" strokeWidth="2" />
          </svg>
        </div>

        {/* Success Message */}
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#1F2937",
            marginBottom: "12px",
          }}
        >
          درخواست شما را دریافت کردیم
        </h2>

        <p
          style={{
            fontSize: "14px",
            color: "#6B7280",
            lineHeight: "1.6",
            marginBottom: "60px",
          }}
        >
          آدرس شعبه و زمان تحویل طلا به شما پیامک خواهد شد.
        </p>

        {/* Done Button - Fixed at bottom */}
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "16px",
            right: "16px",
            maxWidth: "568px",
            margin: "0 auto",
          }}
        >
          <button
            onClick={onClose}
            style={{
              width: "100%",
              padding: "16px",
              background: "#1F2937",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "16px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            متوجه شدم
          </button>
        </div>
      </div>
    </div>
  );
}
