"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { pricesService, GoldPrice } from "@/lib/api/prices";

export default function GoldPricesPage() {
  const [currentPrice, setCurrentPrice] = useState<GoldPrice | null>(null);
  const [previousPrice, setPreviousPrice] = useState<GoldPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [priceAnimation, setPriceAnimation] = useState(false);

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
        setPreviousPrice(currentPrice);
        setCurrentPrice(response.data);
        setLastUpdate(new Date());
        setPriceAnimation(true);
        setTimeout(() => setPriceAnimation(false), 600);
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

  const formatPrice = (price: string) => {
    return toPersianNumber(parseFloat(price).toLocaleString("fa-IR"));
  };

  const getPriceChange = (current: string, previous: string | undefined) => {
    if (!previous) return { percent: 0, amount: 0, direction: "neutral" as const };
    const currentNum = parseFloat(current);
    const previousNum = parseFloat(previous);
    const diff = currentNum - previousNum;
    const percent = (diff / previousNum) * 100;
    return {
      percent: Math.abs(percent),
      amount: Math.abs(diff),
      direction: diff > 0 ? ("up" as const) : diff < 0 ? ("down" as const) : ("neutral" as const),
    };
  };

  const buyPriceChange = currentPrice && previousPrice
    ? getPriceChange(currentPrice.sell_price, previousPrice.sell_price)
    : null;

  const sellPriceChange = currentPrice && previousPrice
    ? getPriceChange(currentPrice.buy_price, previousPrice.buy_price)
    : null;

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

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes priceUpdate {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); color: #FDB022; }
          100% { transform: scale(1); }
        }

        .price-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: slideInUp 0.4s ease-out;
        }

        @media (hover: hover) {
          .price-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
          }
        }

        .price-card:active {
          transform: scale(0.98);
        }

        .price-value {
          transition: all 0.3s ease;
        }

        .price-value.animate {
          animation: priceUpdate 0.6s ease;
        }

        .stat-card {
          animation: slideInUp 0.5s ease-out;
        }

        .action-button {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        @media (hover: hover) {
          .action-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
          }
        }

        .action-button:active {
          transform: scale(0.96);
        }

        .refresh-icon {
          transition: transform 0.3s ease;
        }

        .refresh-icon.spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .badge-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .trend-indicator {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border-radius: 10px;
          font-size: clamp(11px, 2.5vw, 12px);
          font-weight: 600;
          animation: scaleIn 0.3s ease-out;
        }

        .trend-up {
          background: rgba(251, 176, 34, 0.15);
          color: #D97706;
        }

        .trend-down {
          background: rgba(239, 139, 139, 0.15);
          color: #DC2626;
        }

        .trend-neutral {
          background: rgba(107, 114, 128, 0.15);
          color: #6B7280;
        }

        @media (max-width: 640px) {
          .price-card {
            margin-left: -4px;
            margin-right: -4px;
          }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#FAFAFA",
          paddingBottom: "100px"
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#FFFFFF",
            padding: "clamp(14px, 4vw, 16px)",
            display: "flex",
            alignItems: "center",
            gap: "clamp(10px, 3vw, 12px)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <Link href="/dashboard">
            <div
              style={{
                width: "clamp(38px, 10vw, 40px)",
                height: "clamp(38px, 10vw, 40px)",
                borderRadius: "12px",
                background: "#F5F5F5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
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
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h1 style={{ fontSize: "clamp(16px, 4.5vw, 18px)", fontWeight: 700, margin: 0, color: "#1F1F1F" }}>
                قیمت لحظه‌ای طلا
              </h1>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: currentPrice?.is_active ? "#10B981" : "#EF4444",
                }}
                className="badge-pulse"
              />
            </div>
            <p style={{ fontSize: "clamp(10px, 2.5vw, 11px)", color: "#6B7280", margin: "2px 0 0" }}>
              به‌روزرسانی هر ۳۰ ثانیه • {toPersianNumber(lastUpdate.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }))}
            </p>
          </div>
          <button
            onClick={fetchPrices}
            style={{
              width: "clamp(38px, 10vw, 40px)",
              height: "clamp(38px, 10vw, 40px)",
              borderRadius: "12px",
              background: "#FDB022",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(253, 176, 34, 0.25)",
              transition: "all 0.2s ease",
            }}
          >
            <svg
              className={`refresh-icon ${loading ? 'spinning' : ''}`}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21.5 2V8M21.5 8H16M21.5 8L18 4.5C16.5 3 14.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C16.8 22 20.9 18.5 21.8 14"
                stroke="#1F1F1F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "clamp(12px, 4vw, 16px)", maxWidth: "600px", margin: "0 auto" }}>
          {/* Error Message */}
          {error && (
            <div
              style={{
                padding: "14px 18px",
                marginBottom: "16px",
                borderRadius: "16px",
                background: "#FEE2E2",
                border: "1px solid #FCA5A5",
                color: "#DC2626",
                fontSize: "clamp(13px, 3.5vw, 14px)",
                textAlign: "center",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              <span>⚠️ {error}</span>
              <button
                onClick={fetchPrices}
                style={{
                  background: "#DC2626",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                تلاش مجدد
              </button>
            </div>
          )}

          {/* Main Price Cards */}
          <div style={{ marginBottom: "16px" }}>
            {/* Buy Price Card */}
            <div
              className="price-card"
              style={{
                background: "#FFFFFF",
                borderRadius: "clamp(20px, 5vw, 24px)",
                padding: "clamp(22px, 6vw, 28px) clamp(20px, 5vw, 24px)",
                marginBottom: "clamp(12px, 4vw, 16px)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "clamp(12px, 4vw, 16px)", flexWrap: "wrap", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 2.5vw, 10px)" }}>
                    <div
                      style={{
                        width: "clamp(44px, 12vw, 48px)",
                        height: "clamp(44px, 12vw, 48px)",
                        borderRadius: "14px",
                        background: "#1F2937",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "clamp(20px, 6vw, 24px)",
                        flexShrink: 0,
                      }}
                    >
                      🪙
                    </div>
                    <div>
                      <h3 style={{ fontSize: "clamp(15px, 4vw, 16px)", fontWeight: 700, margin: 0, color: "#1F1F1F" }}>
                        قیمت خرید
                      </h3>
                      <p style={{ fontSize: "clamp(11px, 3vw, 12px)", margin: "2px 0 0", color: "#6B7280" }}>
                        فروش به شما
                      </p>
                    </div>
                  </div>

                  {buyPriceChange && buyPriceChange.direction !== "neutral" && (
                    <div className={`trend-indicator trend-${buyPriceChange.direction}`}>
                      {buyPriceChange.direction === "up" ? "↗" : "↘"}
                      {toPersianNumber(buyPriceChange.percent.toFixed(2))}%
                    </div>
                  )}
                </div>

                {loading ? (
                  <>
                    <ShimmerBox height="clamp(48px, 14vw, 56px)" borderRadius="12px" width="75%" />
                    <div style={{ height: "12px" }} />
                    <ShimmerBox height="24px" borderRadius="8px" width="60%" />
                  </>
                ) : currentPrice ? (
                  <>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(8px, 2.5vw, 10px)", marginBottom: "clamp(10px, 3vw, 12px)", flexWrap: "wrap" }}>
                      <span
                        className={`price-value ${priceAnimation ? 'animate' : ''}`}
                        style={{ fontSize: "clamp(32px, 10vw, 48px)", fontWeight: 800, lineHeight: 1, color: "#1F1F1F" }}
                      >
                        {formatPrice(currentPrice.sell_price)}
                      </span>
                      <span style={{ fontSize: "clamp(15px, 4.5vw, 18px)", fontWeight: 600, color: "#6B7280" }}>تومان</span>
                    </div>

                    <div
                      style={{
                        display: "inline-flex",
                        padding: "10px 16px",
                        background: "#F8F9FA",
                        borderRadius: "12px",
                        fontSize: "clamp(12px, 3.2vw, 13px)",
                        fontWeight: 500,
                        color: "#6B7280",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      💎 هر گرم طلای ۱۸ عیار
                    </div>
                  </>
                ) : null}
              </div>
            </div>

            {/* Sell Price Card */}
            <div
              className="price-card"
              style={{
                background: "#FFFFFF",
                borderRadius: "clamp(20px, 5vw, 24px)",
                padding: "clamp(22px, 6vw, 28px) clamp(20px, 5vw, 24px)",
                marginBottom: "clamp(12px, 4vw, 16px)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "clamp(12px, 4vw, 16px)", flexWrap: "wrap", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 2.5vw, 10px)" }}>
                    <div
                      style={{
                        width: "clamp(44px, 12vw, 48px)",
                        height: "clamp(44px, 12vw, 48px)",
                        borderRadius: "14px",
                        background: "#EF8B8B",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "clamp(20px, 6vw, 24px)",
                        flexShrink: 0,
                      }}
                    >
                      💰
                    </div>
                    <div>
                      <h3 style={{ fontSize: "clamp(15px, 4vw, 16px)", fontWeight: 700, margin: 0, color: "#1F1F1F" }}>
                        قیمت فروش
                      </h3>
                      <p style={{ fontSize: "clamp(11px, 3vw, 12px)", margin: "2px 0 0", color: "#6B7280" }}>
                        خرید از شما
                      </p>
                    </div>
                  </div>

                  {sellPriceChange && sellPriceChange.direction !== "neutral" && (
                    <div className={`trend-indicator trend-${sellPriceChange.direction}`}>
                      {sellPriceChange.direction === "up" ? "↗" : "↘"}
                      {toPersianNumber(sellPriceChange.percent.toFixed(2))}%
                    </div>
                  )}
                </div>

                {loading ? (
                  <>
                    <ShimmerBox height="clamp(48px, 14vw, 56px)" borderRadius="12px" width="75%" />
                    <div style={{ height: "12px" }} />
                    <ShimmerBox height="24px" borderRadius="8px" width="60%" />
                  </>
                ) : currentPrice ? (
                  <>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(8px, 2.5vw, 10px)", marginBottom: "clamp(10px, 3vw, 12px)", flexWrap: "wrap" }}>
                      <span
                        className={`price-value ${priceAnimation ? 'animate' : ''}`}
                        style={{ fontSize: "clamp(32px, 10vw, 48px)", fontWeight: 800, lineHeight: 1, color: "#1F1F1F" }}
                      >
                        {formatPrice(currentPrice.buy_price)}
                      </span>
                      <span style={{ fontSize: "clamp(15px, 4.5vw, 18px)", fontWeight: 600, color: "#6B7280" }}>تومان</span>
                    </div>

                    <div
                      style={{
                        display: "inline-flex",
                        padding: "10px 16px",
                        background: "#F8F9FA",
                        borderRadius: "12px",
                        fontSize: "clamp(12px, 3.2vw, 13px)",
                        fontWeight: 500,
                        color: "#6B7280",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      💎 هر گرم طلای ۱۸ عیار
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          {/* Market Stats Grid */}
          {currentPrice && (
            <div
              className="stat-card"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(clamp(140px, 45vw, 160px), 1fr))",
                gap: "clamp(10px, 3vw, 12px)",
                marginBottom: "clamp(12px, 4vw, 16px)",
              }}
            >
              {/* Spread Card */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "clamp(16px, 4.5vw, 18px)",
                  padding: "clamp(16px, 4.5vw, 18px)",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
                }}
              >
                <div style={{ fontSize: "clamp(24px, 7vw, 28px)", marginBottom: "8px" }}>📊</div>
                <div style={{ fontSize: "clamp(11px, 3vw, 12px)", color: "#6B7280", marginBottom: "6px", fontWeight: 500 }}>
                  اسپرد بازار
                </div>
                <div style={{ fontSize: "clamp(18px, 5vw, 20px)", fontWeight: 700, color: "#1F1F1F" }}>
                  {toPersianNumber(currentPrice.spread.toFixed(2))}%
                </div>
              </div>

              {/* Source Card */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "clamp(16px, 4.5vw, 18px)",
                  padding: "clamp(16px, 4.5vw, 18px)",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
                }}
              >
                <div style={{ fontSize: "clamp(24px, 7vw, 28px)", marginBottom: "8px" }}>🏛️</div>
                <div style={{ fontSize: "clamp(11px, 3vw, 12px)", color: "#6B7280", marginBottom: "6px", fontWeight: 500 }}>
                  منبع قیمت
                </div>
                <div style={{ fontSize: "clamp(13px, 3.5vw, 14px)", fontWeight: 700, color: "#1F1F1F" }}>
                  {currentPrice.source}
                </div>
              </div>
            </div>
          )}

          {/* Detailed Info Card */}
          {currentPrice && (
            <div
              className="stat-card"
              style={{
                background: "#FFFFFF",
                borderRadius: "clamp(18px, 5vw, 20px)",
                padding: "clamp(18px, 5.5vw, 22px)",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
                marginBottom: "clamp(12px, 4vw, 16px)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 2.5vw, 10px)", marginBottom: "clamp(14px, 4.5vw, 18px)" }}>
                <div style={{ fontSize: "clamp(20px, 6vw, 24px)" }}>ℹ️</div>
                <h3 style={{ fontSize: "clamp(15px, 4vw, 16px)", fontWeight: 700, margin: 0, color: "#1F1F1F" }}>
                  اطلاعات تکمیلی
                </h3>
              </div>

              <div style={{ display: "grid", gap: "clamp(8px, 2.5vw, 10px)" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "clamp(12px, 3.5vw, 14px) clamp(14px, 4vw, 16px)",
                    background: "#F8F9FA",
                    borderRadius: "14px",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontSize: "clamp(12px, 3.2vw, 13px)", color: "#6B7280", fontWeight: 500 }}>وضعیت بازار</span>
                  <div
                    style={{
                      padding: "6px 14px",
                      background: currentPrice.is_active ? "#D1FAE5" : "#FEE2E2",
                      color: currentPrice.is_active ? "#059669" : "#DC2626",
                      borderRadius: "10px",
                      fontSize: "clamp(11px, 3vw, 12px)",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {currentPrice.is_active ? "✅ فعال" : "⛔ غیرفعال"}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "clamp(12px, 3.5vw, 14px) clamp(14px, 4vw, 16px)",
                    background: "#F8F9FA",
                    borderRadius: "14px",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontSize: "clamp(12px, 3.2vw, 13px)", color: "#6B7280", fontWeight: 500 }}>آخرین به‌روزرسانی</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "clamp(16px, 5vw, 20px)" }}>🕒</span>
                    <span style={{ fontSize: "clamp(12px, 3.2vw, 13px)", fontWeight: 700, color: "#1F1F1F" }}>
                      {toPersianNumber(new Date(currentPrice.created_at).toLocaleTimeString("fa-IR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      }))}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "clamp(12px, 3.5vw, 14px) clamp(14px, 4vw, 16px)",
                    background: "#FFF7E6",
                    borderRadius: "14px",
                    border: "1px solid #FDB022",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontSize: "clamp(12px, 3.2vw, 13px)", color: "#92400E", fontWeight: 600 }}>تفاوت خرید و فروش</span>
                  <span style={{ fontSize: "clamp(13px, 3.5vw, 14px)", fontWeight: 700, color: "#1F1F1F" }}>
                    {formatPrice((parseFloat(currentPrice.sell_price) - parseFloat(currentPrice.buy_price)).toString())} تومان
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "clamp(10px, 3vw, 12px)", marginBottom: "clamp(12px, 4vw, 16px)" }}>
            <Link href="/dashboard/buy-sell?type=buy" style={{ textDecoration: "none" }}>
              <button
                className="action-button"
                style={{
                  width: "100%",
                  padding: "clamp(18px, 5vw, 20px) clamp(14px, 4vw, 16px)",
                  fontSize: "clamp(15px, 4vw, 16px)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  background: "#1F1F1F",
                  border: "none",
                  borderRadius: "clamp(16px, 4.5vw, 18px)",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "clamp(4px, 1.5vw, 6px)",
                  minHeight: "clamp(100px, 28vw, 120px)",
                }}
              >
                <span style={{ fontSize: "clamp(26px, 8vw, 32px)" }}>🪙</span>
                <span>خرید طلا</span>
              </button>
            </Link>

            <Link href="/dashboard/buy-sell?type=sell" style={{ textDecoration: "none" }}>
              <button
                className="action-button"
                style={{
                  width: "100%",
                  padding: "clamp(18px, 5vw, 20px) clamp(14px, 4vw, 16px)",
                  fontSize: "clamp(15px, 4vw, 16px)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  background: "#EF8B8B",
                  border: "none",
                  borderRadius: "clamp(16px, 4.5vw, 18px)",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(239, 139, 139, 0.3)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "clamp(4px, 1.5vw, 6px)",
                  minHeight: "clamp(100px, 28vw, 120px)",
                }}
              >
                <span style={{ fontSize: "clamp(26px, 8vw, 32px)" }}>💰</span>
                <span>فروش طلا</span>
              </button>
            </Link>
          </div>

          {/* Info Banner */}
          <div
            style={{
              background: "#F8F9FA",
              borderRadius: "clamp(16px, 4.5vw, 18px)",
              padding: "clamp(16px, 4.5vw, 18px) clamp(18px, 5vw, 20px)",
              border: "1px solid #E5E7EB",
              display: "flex",
              alignItems: "start",
              gap: "clamp(10px, 3vw, 12px)",
            }}
          >
            <div style={{ fontSize: "clamp(20px, 6vw, 24px)", flexShrink: 0 }}>💡</div>
            <div>
              <h4 style={{ fontSize: "clamp(13px, 3.5vw, 14px)", fontWeight: 700, margin: "0 0 6px", color: "#1F1F1F" }}>
                نکته مهم
              </h4>
              <p style={{ fontSize: "clamp(11px, 3vw, 12px)", color: "#6B7280", margin: 0, lineHeight: 1.6 }}>
                قیمت‌ها به‌صورت خودکار هر ۳۰ ثانیه به‌روزرسانی می‌شوند. برای دریافت آخرین قیمت‌ها، می‌توانید دکمه تازه‌سازی را بزنید.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
