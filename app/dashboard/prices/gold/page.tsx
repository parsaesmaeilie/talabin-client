"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { pricesService, GoldPrice } from "@/lib/api/prices";

export default function GoldPricesPage() {
  const [currentPrice, setCurrentPrice] = useState<GoldPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPrices();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchPrices = async () => {
    try {
      const response = await pricesService.getCurrentPrice();

      if (response.success && response.data) {
        setCurrentPrice(response.data);
      }

      setError(null);
    } catch (err: any) {
      console.error("Error fetching prices:", err);
      setError("خطا در بارگذاری قیمت‌ها");
    } finally {
      setLoading(false);
    }
  };

  const toPersianNumber = (num: string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const ShimmerBox = ({ width = "100%", height = "20px", borderRadius = "8px" }: any) => (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: "linear-gradient(90deg, #F5F5F5 25%, #E5E5E5 50%, #F5F5F5 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
      }}
    />
  );

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#FAFAFA", paddingBottom: "100px" }}>
        {/* Header */}
        <div
          style={{
            background: "#FFFFFF",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          }}
        >
          <Link href="/dashboard">
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
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "18px", fontWeight: 600, margin: 0, color: "#1F1F1F" }}>
              قیمت لحظه‌ای طلا
            </h1>
            <p style={{ fontSize: "11px", color: "#6B7280", margin: "2px 0 0" }}>
              به‌روزرسانی هر ۳۰ ثانیه
            </p>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "16px" }}>
          {/* Error Message */}
          {error && (
            <div
              style={{
                padding: "12px 16px",
                marginBottom: "16px",
                borderRadius: "12px",
                background: "#FEE2E2",
                color: "#DC2626",
                fontSize: "14px",
                textAlign: "center",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>{error}</span>
              <button
                onClick={fetchPrices}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#DC2626",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                تلاش مجدد
              </button>
            </div>
          )}

          {/* Buy Price Card */}
          <div
            style={{
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              borderRadius: "20px",
              padding: "24px",
              marginBottom: "16px",
              boxShadow: "0 8px 20px rgba(16, 185, 129, 0.25)",
              color: "#FFFFFF",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <div style={{ fontSize: "24px" }}>🪙</div>
              <h3 style={{ fontSize: "15px", fontWeight: 600, margin: 0, opacity: 0.9 }}>
                قیمت خرید (فروش به شما)
              </h3>
            </div>

            {loading ? (
              <>
                <ShimmerBox height="48px" borderRadius="12px" width="70%" />
                <div style={{ height: "8px" }} />
                <ShimmerBox height="20px" borderRadius="8px" width="50%" />
              </>
            ) : currentPrice ? (
              <>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "40px", fontWeight: 700 }}>
                    {toPersianNumber(parseFloat(currentPrice.sell_price).toLocaleString("fa-IR"))}
                  </span>
                  <span style={{ fontSize: "16px", opacity: 0.9 }}>تومان</span>
                </div>

                <div
                  style={{
                    padding: "10px 14px",
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    opacity: 0.95,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  قیمت هر گرم طلای ۱۸ عیار
                </div>
              </>
            ) : null}
          </div>

          {/* Sell Price Card */}
          <div
            style={{
              background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
              borderRadius: "20px",
              padding: "24px",
              marginBottom: "16px",
              boxShadow: "0 8px 20px rgba(239, 68, 68, 0.25)",
              color: "#FFFFFF",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <div style={{ fontSize: "24px" }}>💎</div>
              <h3 style={{ fontSize: "15px", fontWeight: 600, margin: 0, opacity: 0.9 }}>
                قیمت فروش (خرید از شما)
              </h3>
            </div>

            {loading ? (
              <>
                <ShimmerBox height="48px" borderRadius="12px" width="70%" />
                <div style={{ height: "8px" }} />
                <ShimmerBox height="20px" borderRadius="8px" width="50%" />
              </>
            ) : currentPrice ? (
              <>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "40px", fontWeight: 700 }}>
                    {toPersianNumber(parseFloat(currentPrice.buy_price).toLocaleString("fa-IR"))}
                  </span>
                  <span style={{ fontSize: "16px", opacity: 0.9 }}>تومان</span>
                </div>

                <div
                  style={{
                    padding: "10px 14px",
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    opacity: 0.95,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  قیمت هر گرم طلای ۱۸ عیار
                </div>
              </>
            ) : null}
          </div>

          {/* Spread Info */}
          {currentPrice && (
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                marginBottom: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ fontSize: "20px" }}>📊</div>
                <h3 style={{ fontSize: "15px", fontWeight: 600, margin: 0, color: "#1F1F1F" }}>
                  اطلاعات بیشتر
                </h3>
              </div>

              <div style={{ display: "grid", gap: "8px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px",
                    background: "#FAFAFA",
                    borderRadius: "12px",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#6B7280" }}>اختلاف خرید و فروش (اسپرد)</span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#1F1F1F" }}>
                    {toPersianNumber(currentPrice.spread.toFixed(2))}%
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px",
                    background: "#FAFAFA",
                    borderRadius: "12px",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#6B7280" }}>منبع قیمت</span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#1F1F1F" }}>
                    {currentPrice.source}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px",
                    background: "#FAFAFA",
                    borderRadius: "12px",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#6B7280" }}>وضعیت</span>
                  <div
                    style={{
                      padding: "4px 12px",
                      background: currentPrice.is_active ? "#D1FAE5" : "#FEE2E2",
                      color: currentPrice.is_active ? "#059669" : "#DC2626",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    {currentPrice.is_active ? "✅ فعال" : "❌ غیرفعال"}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px",
                    background: "#FAFAFA",
                    borderRadius: "12px",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#6B7280" }}>آخرین به‌روزرسانی</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#1F1F1F" }}>
                    {new Date(currentPrice.created_at).toLocaleTimeString("fa-IR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
            <Link href="/dashboard/buy-sell?type=buy" style={{ textDecoration: "none" }}>
              <button
                style={{
                  width: "100%",
                  padding: "18px",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  border: "none",
                  borderRadius: "16px",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <span>💰</span>
                خرید طلا
              </button>
            </Link>

            <Link href="/dashboard/buy-sell?type=sell" style={{ textDecoration: "none" }}>
              <button
                style={{
                  width: "100%",
                  padding: "18px",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                  border: "none",
                  borderRadius: "16px",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <span>💎</span>
                فروش طلا
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
