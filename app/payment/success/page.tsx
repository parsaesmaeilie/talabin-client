"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "1000000";
  const trackingId = searchParams.get("trackingId") || "PAY123456789";

  const [countdown, setCountdown] = useState(5);

  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  useEffect(() => {
    // Countdown timer for auto-redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/dashboard/wallet");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleDownloadReceipt = () => {
    alert("دانلود رسید پرداخت...");
  };

  return (
    <div
      className="min-h-screen"
      style={{
        padding: "20px 16px",
        background: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "600px", width: "100%" }}>
        {/* Success Animation */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "32px",
            animation: "scaleIn 0.6s ease-out",
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
              animation: "pulse 2s infinite",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            ✓
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
            پرداخت موفق!
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.9)",
              animation: "slideInUp 0.6s ease-out 0.3s backwards",
            }}
          >
            تراکنش شما با موفقیت انجام شد
          </p>
        </div>

        {/* Payment Details Card */}
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
                مبلغ پرداخت شده
              </span>
              <span style={{ fontSize: "18px", fontWeight: 700, color: "#10B981" }}>
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
                  background: "rgba(16, 185, 129, 0.1)",
                  color: "#10B981",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                ✓ موفق
              </div>
            </div>
          </div>

          {/* Download Receipt Button */}
          <button
            onClick={handleDownloadReceipt}
            style={{
              width: "100%",
              padding: "14px",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid #10B981",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#10B981",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            📄 دانلود رسید پرداخت
          </button>
        </div>

        {/* Success Message */}
        <div
          className="card"
          style={{
            padding: "20px",
            marginBottom: "16px",
            background: "rgba(255,255,255,0.95)",
            animation: "slideInUp 0.6s ease-out 0.5s backwards",
          }}
        >
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ fontSize: "24px" }}>💰</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
                کیف پول شما شارژ شد
              </div>
              <div style={{ fontSize: "12px", color: "var(--color-muted)" }}>
                موجودی کیف پول شما به‌روزرسانی شده است و می‌توانید از آن برای خرید طلا استفاده کنید.
              </div>
            </div>
          </div>
        </div>

        {/* Auto Redirect Notice */}
        <div
          style={{
            textAlign: "center",
            color: "#FFFFFF",
            fontSize: "13px",
            marginBottom: "16px",
            animation: "fadeIn 0.6s ease-out 0.6s backwards",
          }}
        >
          شما در {toPersianNumber(countdown)} ثانیه به کیف پول منتقل می‌شوید...
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
              color: "#10B981",
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
