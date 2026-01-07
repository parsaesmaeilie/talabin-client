"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function WithdrawSuccessContent() {
  const searchParams = useSearchParams();

  const amount = searchParams.get("amount") || "15,000,000";
  const fee = searchParams.get("fee") || "1355";
  const trackingCode = searchParams.get("tracking") || "343def4r";

  const toPersianNumber = (num: string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF", display: "flex", flexDirection: "column" }}>
      {/* Header with back button */}
      <div
        style={{
          padding: "20px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Link href="/dashboard/wallet">
          <div
            style={{
              fontSize: "24px",
              cursor: "pointer",
              color: "#1F2937",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
            }}
          >
            ←
          </div>
        </Link>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 24px",
        }}
      >
        {/* Illustration */}
        <div style={{ marginBottom: "40px", marginTop: "20px" }}>
          <svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background shapes */}
            <path
              d="M60 80 L140 40 L220 100 L220 180 L140 220 L60 160 Z"
              fill="#FDB022"
              opacity="0.15"
            />
            <path
              d="M80 90 L160 50 L200 90 L200 160 L160 200 L80 140 Z"
              fill="#FBBF24"
              opacity="0.2"
            />

            {/* Person illustration - simplified geometric shapes */}
            {/* Head */}
            <ellipse cx="100" cy="100" rx="18" ry="22" fill="#1F2937"/>
            {/* Hair */}
            <path
              d="M88 95 Q82 85 90 80 Q95 78 100 80 Q105 78 110 82 Q112 90 108 95 Z"
              fill="#0F172A"
            />

            {/* Body/Torso - rotated rectangle representing falling position */}
            <rect
              x="90"
              y="115"
              width="45"
              height="25"
              rx="12"
              fill="#FFFFFF"
              stroke="#1F2937"
              strokeWidth="2.5"
              transform="rotate(-25 112 127)"
            />

            {/* Arms - waving */}
            {/* Left arm raised */}
            <path
              d="M95 120 Q85 110 78 105"
              stroke="#FFFFFF"
              strokeWidth="8"
              strokeLinecap="round"
              transform="rotate(-20 95 120)"
            />
            <path
              d="M95 120 Q85 110 78 105"
              stroke="#1F2937"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              transform="rotate(-20 95 120)"
            />

            {/* Right arm raised */}
            <path
              d="M125 125 Q135 115 145 108"
              stroke="#FFFFFF"
              strokeWidth="8"
              strokeLinecap="round"
              transform="rotate(15 125 125)"
            />
            <path
              d="M125 125 Q135 115 145 108"
              stroke="#1F2937"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              transform="rotate(15 125 125)"
            />

            {/* Hand details */}
            <circle cx="78" cy="103" r="5" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2"/>
            <circle cx="148" cy="110" r="5" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2"/>

            {/* Legs - in relaxed falling position */}
            {/* Left leg */}
            <path
              d="M100 138 Q105 150 110 165"
              stroke="#FFFFFF"
              strokeWidth="9"
              strokeLinecap="round"
              transform="rotate(-30 100 138)"
            />
            <path
              d="M100 138 Q105 150 110 165"
              stroke="#1F2937"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              transform="rotate(-30 100 138)"
            />

            {/* Right leg */}
            <path
              d="M115 142 Q125 158 135 172"
              stroke="#FFFFFF"
              strokeWidth="9"
              strokeLinecap="round"
              transform="rotate(10 115 142)"
            />
            <path
              d="M115 142 Q125 158 135 172"
              stroke="#1F2937"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              transform="rotate(10 115 142)"
            />

            {/* Shoes */}
            <ellipse cx="115" cy="167" rx="7" ry="5" fill="#1F2937" transform="rotate(-25 115 167)"/>
            <ellipse cx="143" cy="175" rx="7" ry="5" fill="#1F2937" transform="rotate(15 143 175)"/>

            {/* Connection lines - representing movement/falling */}
            <line x1="50" y1="60" x2="90" y2="85" stroke="#FDB022" strokeWidth="1.5" opacity="0.5"/>
            <line x1="230" y1="70" x2="200" y2="100" stroke="#FBBF24" strokeWidth="1.5" opacity="0.5"/>
            <line x1="180" y1="40" x2="150" y2="70" stroke="#FDB022" strokeWidth="1.5" opacity="0.5"/>
          </svg>
        </div>

        {/* Success Message */}
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "60px",
            color: "#1F2937",
            maxWidth: "320px",
            lineHeight: 1.8,
          }}
        >
          درخواست شما با موفقیت به بانک ارسال شد.
        </h2>

        {/* Details */}
        <div style={{ width: "100%", maxWidth: "400px", marginBottom: "auto" }}>
          {/* Amount */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 0",
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <span style={{ fontSize: "15px", color: "#6B7280", fontWeight: 500 }}>
              مبلغ
            </span>
            <span style={{ fontSize: "15px", fontWeight: 600, color: "#1F2937" }}>
              {toPersianNumber(amount)} تومان
            </span>
          </div>

          {/* Shaparak Fee */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 0",
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <span style={{ fontSize: "15px", color: "#6B7280", fontWeight: 500 }}>
              کارمزد شاپرک
            </span>
            <span style={{ fontSize: "15px", fontWeight: 600, color: "#1F2937" }}>
              {toPersianNumber(fee)} تومان
            </span>
          </div>

          {/* Tracking Code */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 0",
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <span style={{ fontSize: "15px", color: "#6B7280", fontWeight: 500 }}>
              کدپیگیری
            </span>
            <span
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#1F2937",
                fontFamily: "monospace",
              }}
            >
              {trackingCode}
            </span>
          </div>
        </div>

        {/* Return Button */}
        <div style={{ width: "100%", maxWidth: "400px", padding: "40px 0 20px" }}>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <button
              style={{
                width: "100%",
                padding: "18px",
                background: "#1F2937",
                border: "none",
                borderRadius: "16px",
                fontSize: "16px",
                fontWeight: 700,
                color: "#FFFFFF",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 4px 12px rgba(31, 41, 55, 0.2)",
              }}
            >
              بازگشت به خانه
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function WithdrawSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WithdrawSuccessContent />
    </Suspense>
  );
}
