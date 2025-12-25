"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentFailurePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "1000000";
  const reason = searchParams.get("reason") || "خطای نامشخص در پردازش تراکنش";
  const trackingId = searchParams.get("trackingId") || "PAY123456789";

  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const commonReasons = [
    { icon: "💳", title: "موجودی ناکافی", description: "حساب بانکی شما موجودی کافی ندارد" },
    { icon: "🔒", title: "رمز اشتباه", description: "رمز کارت به صورت صحیح وارد نشده است" },
    { icon: "⏰", title: "انقضای زمان", description: "زمان پردازش تراکنش به پایان رسیده است" },
    { icon: "🚫", title: "محدودیت بانکی", description: "تراکنش توسط بانک رد شده است" },
  ];

  const handleRetryPayment = () => {
    router.push(`/dashboard/wallet?amount=${amount}`);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        padding: "20px 16px 100px",
        background: "linear-gradient(135deg, #EF4444 0%, #F87171 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "600px", width: "100%" }}>
        {/* Error Animation */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "32px",
            animation: "shake 0.5s ease-out",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              margin: "0 auto 24px",
              borderRadius: "50%",
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "64px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              animation: "scaleIn 0.5s ease-out",
            }}
          >
            ✕
          </div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "8px",
              animation: "slideInUp 0.6s ease-out 0.2s backwards",
            }}
          >
            پرداخت ناموفق
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.9)",
              animation: "slideInUp 0.6s ease-out 0.3s backwards",
            }}
          >
            متأسفانه تراکنش شما انجام نشد
          </p>
        </div>

        {/* Error Details Card */}
        <div
          className="card"
          style={{
            padding: "24px",
            marginBottom: "16px",
            animation: "slideInUp 0.6s ease-out 0.4s backwards",
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "20px" }}>
            جزئیات تراکنش
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <span style={{ fontSize: "13px", color: "var(--color-muted)" }}>
                مبلغ تراکنش
              </span>
              <span style={{ fontSize: "18px", fontWeight: 700 }}>
                {toPersianNumber(Number(amount).toLocaleString("fa-IR"))} تومان
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <span style={{ fontSize: "13px", color: "var(--color-muted)" }}>
                کد پیگیری
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "monospace",
                  direction: "ltr",
                }}
              >
                {trackingId}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <span style={{ fontSize: "13px", color: "var(--color-muted)" }}>
                تاریخ و ساعت
              </span>
              <span style={{ fontSize: "14px", fontWeight: 600 }}>
                {new Date().toLocaleDateString("fa-IR")} -{" "}
                {toPersianNumber(new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }))}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
              }}
            >
              <span style={{ fontSize: "13px", color: "var(--color-muted)" }}>
                وضعیت
              </span>
              <div
                style={{
                  padding: "4px 16px",
                  background: "rgba(239, 68, 68, 0.1)",
                  color: "#EF4444",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                ✕ ناموفق
              </div>
            </div>
          </div>

          {/* Error Reason */}
          <div
            style={{
              padding: "16px",
              background: "rgba(239, 68, 68, 0.1)",
              borderRadius: "12px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
              }}
            >
              <div style={{ fontSize: "24px" }}>⚠️</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                  علت خطا
                </div>
                <div style={{ fontSize: "12px", color: "var(--color-muted)" }}>
                  {reason}
                </div>
              </div>
            </div>
          </div>

          {/* Retry Button */}
          <button
            onClick={handleRetryPayment}
            style={{
              width: "100%",
              padding: "14px",
              background: "var(--color-primary)",
              border: "none",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--color-dark)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            🔄 تلاش مجدد
          </button>
        </div>

        {/* Common Reasons */}
        <div
          className="card"
          style={{
            padding: "20px",
            marginBottom: "16px",
            animation: "slideInUp 0.6s ease-out 0.5s backwards",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px" }}>
            علل رایج عدم موفقیت تراکنش
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {commonReasons.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "12px",
                  background: "rgba(0,0,0,0.02)",
                  borderRadius: "8px",
                }}
              >
                <div style={{ fontSize: "24px" }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "2px" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--color-muted)" }}>
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Card */}
        <div
          className="card"
          style={{
            padding: "20px",
            marginBottom: "16px",
            background: "rgba(255,255,255,0.95)",
            animation: "slideInUp 0.6s ease-out 0.6s backwards",
          }}
        >
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ fontSize: "24px" }}>💬</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>
                نیاز به کمک دارید؟
              </div>
              <div style={{ fontSize: "12px", color: "var(--color-muted)", marginBottom: "12px" }}>
                اگر مشکل همچنان ادامه دارد، با پشتیبانی تماس بگیرید
              </div>
              <Link
                href="/profile/support"
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  background: "rgba(59, 130, 246, 0.1)",
                  border: "1px solid #3B82F6",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#3B82F6",
                  textDecoration: "none",
                }}
              >
                تماس با پشتیبانی
              </Link>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            animation: "slideInUp 0.6s ease-out 0.7s backwards",
          }}
        >
          <Link
            href="/dashboard"
            style={{
              flex: 1,
              padding: "16px",
              background: "rgba(255,255,255,0.2)",
              border: "2px solid #FFFFFF",
              borderRadius: "16px",
              fontSize: "15px",
              fontWeight: 600,
              color: "#FFFFFF",
              textAlign: "center",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            بازگشت به داشبورد
          </Link>
          <Link
            href="/dashboard/wallet"
            style={{
              flex: 1,
              padding: "16px",
              background: "#FFFFFF",
              border: "none",
              borderRadius: "16px",
              fontSize: "15px",
              fontWeight: 600,
              color: "#EF4444",
              textAlign: "center",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            مشاهده کیف پول
          </Link>
        </div>
      </div>
    </div>
  );
}
