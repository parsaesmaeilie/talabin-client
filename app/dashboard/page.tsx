"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/src/features/auth";
import { walletService, Wallet } from "@/lib/api/wallet";
import { pricesService, GoldPrice } from "@/lib/api/prices";

export default function DashboardPage() {
  const router = useRouter();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [currentPrice, setCurrentPrice] = useState<GoldPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication
    if (!authService.isAuthenticated()) {
      router.push("/(auth)/login");
      return;
    }

    fetchData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [router]);

  const fetchData = async () => {
    try {
      const [walletResponse, priceResponse] = await Promise.all([
        walletService.getBalance(),
        pricesService.getCurrentPrice(),
      ]);

      if (walletResponse.success && walletResponse.data) {
        setWallet(walletResponse.data);
      }

      if (priceResponse.success && priceResponse.data) {
        setCurrentPrice(priceResponse.data);
      }

      setError(null);
    } catch (err: any) {
      console.error("Error fetching dashboard data:", err);
      setError("خطا در بارگذاری اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  const toPersianNumber = (num: string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  // Calculate gold value in Toman
  const goldValueInToman = wallet && currentPrice
    ? parseFloat(wallet.gold_balance) * parseFloat(currentPrice.sell_price)
    : 0;

  // Shimmer loading component
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

      <div style={{ minHeight: "100vh", background: "#FAFAFA", paddingBottom: "120px" }} className="fade-in">
        {/* Header */}
        <div
          style={{
            background: "#FFFFFF",
            padding: "clamp(12px, 3vw, 16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            position: "sticky",
            top: 0,
            zIndex: 10,
            transition: "all 0.3s ease",
          }}
        >
          <Link href="/notifications" style={{ position: "relative" }}>
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
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10.0167 2.42505C7.70008 2.42505 5.81675 4.30838 5.81675 6.62505V8.80005C5.81675 9.27505 5.61675 10.0084 5.37508 10.4084L4.48341 11.925C3.93341 12.8167 4.27508 13.8084 5.26675 14.1417C8.65008 15.3334 12.3751 15.3334 15.7584 14.1417C16.6834 13.8334 17.0584 12.75 16.5417 11.925L15.6501 10.4084C15.4167 10.0084 15.2167 9.27505 15.2167 8.80005V6.62505C15.2167 4.31672 13.3251 2.42505 11.0167 2.42505H10.0167Z"
                  stroke="#1F1F1F"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <path
                  d="M11.575 2.66672C11.3417 2.60005 11.1 2.54172 10.85 2.50005C10.175 2.38338 9.52502 2.40005 8.91669 2.54172C9.14169 1.99172 9.66669 1.60005 10.2834 1.60005C10.9 1.60005 11.425 1.99172 11.65 2.54172L11.575 2.66672Z"
                  stroke="#1F1F1F"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.6833 14.4667C12.6833 15.9167 11.45 17.0834 9.99998 17.0834C9.27498 17.0834 8.59998 16.7667 8.12498 16.2834C7.64998 15.8084 7.33331 15.1334 7.33331 14.4667"
                  stroke="#1F1F1F"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: "#EF4444",
                  color: "white",
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                }}
              >
                ۲
              </div>
            </div>
          </Link>

          {/* Logo */}
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #FDB022 0%, #F5A815 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(253, 176, 34, 0.3)",
              padding: "8px",
            }}
          >
            <img
              src="/logo.svg"
              alt="Talabin"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>

          <Link href="/profile">
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
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10.1334 9.05005C10.05 9.04172 9.95002 9.04172 9.85835 9.05005C7.87502 8.98338 6.30002 7.36672 6.30002 5.36672C6.30002 3.32505 7.94169 1.67505 10 1.67505C12.05 1.67505 13.7 3.32505 13.7 5.36672C13.6917 7.36672 12.1167 8.98338 10.1334 9.05005Z"
                  stroke="#1F1F1F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.96665 12.1334C3.94999 13.4834 3.94999 15.6834 5.96665 17.025C8.25832 18.5584 12.0166 18.5584 14.3083 17.025C16.325 15.675 16.325 13.475 14.3083 12.1334C12.025 10.6084 8.26665 10.6084 5.96665 12.1334Z"
                  stroke="#1F1F1F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>
        </div>

        {/* Content */}
        <div style={{ padding: "clamp(12px, 3vw, 16px)", maxWidth: "800px", margin: "0 auto" }}>
          {/* Error Message */}
          {error && (
            <div
              className="slide-in-down"
              style={{
                padding: "12px 16px",
                marginBottom: "16px",
                borderRadius: "12px",
                background: "#FEE2E2",
                color: "#DC2626",
                fontSize: "clamp(13px, 3vw, 14px)",
                textAlign: "center",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "all 0.3s ease",
              }}
            >
              <span>{error}</span>
              <button
                onClick={fetchData}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#DC2626",
                  cursor: "pointer",
                  fontSize: "clamp(11px, 2.5vw, 12px)",
                  fontWeight: 600,
                  textDecoration: "underline",
                  minHeight: "44px",
                  touchAction: "manipulation",
                }}
              >
                تلاش مجدد
              </button>
            </div>
          )}

          {/* Balance Card */}
          <div
            className="scale-in"
            style={{
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              borderRadius: "clamp(16px, 4vw, 20px)",
              padding: "clamp(20px, 5vw, 24px)",
              marginBottom: "16px",
              boxShadow: "0 8px 20px rgba(16, 185, 129, 0.25)",
              color: "#FFFFFF",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: "translateZ(0)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 style={{ fontSize: "15px", fontWeight: 600, margin: 0, opacity: 0.9 }}>
                موجودی طلا
              </h3>
            </div>

            {loading ? (
              <>
                <ShimmerBox height="48px" borderRadius="12px" width="70%" />
                <div style={{ height: "12px" }} />
                <ShimmerBox height="24px" borderRadius="8px" width="50%" />
              </>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "clamp(32px, 8vw, 40px)", fontWeight: 700, lineHeight: 1.2 }}>
                    {wallet ? toPersianNumber(parseFloat(wallet.gold_balance).toFixed(4)) : "۰"}
                  </span>
                  <span style={{ fontSize: "clamp(16px, 4vw, 18px)", opacity: 0.9 }}>گرم</span>
                </div>

                <div
                  style={{
                    padding: "12px 16px",
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "12px",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", opacity: 0.9 }}>
                    <span>معادل</span>
                    <span style={{ fontSize: "18px", fontWeight: 700 }}>
                      {toPersianNumber(goldValueInToman.toLocaleString("fa-IR"))}
                    </span>
                    <span>تومان</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Quick Actions Grid */}
          <div
            className="slide-in-up"
            style={{
              background: "#1F1F1F",
              borderRadius: "clamp(20px, 5vw, 24px)",
              padding: "clamp(16px, 4vw, 20px)",
              marginBottom: "16px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "clamp(12px, 3vw, 16px)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            }}
          >
            <Link
              href="/dashboard/buy-sell?type=buy"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "clamp(10px, 2.5vw, 12px)",
                textDecoration: "none",
                padding: "clamp(14px, 3.5vw, 16px) clamp(10px, 2.5vw, 12px)",
                borderRadius: "clamp(14px, 3.5vw, 16px)",
                background: "rgba(16, 185, 129, 0.1)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                minHeight: "100px",
                touchAction: "manipulation",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px) scale(1.05)";
                e.currentTarget.style.background = "rgba(16, 185, 129, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.background = "rgba(16, 185, 129, 0.1)";
              }}
            >
              <div
                style={{
                  width: "clamp(44px, 10vw, 48px)",
                  height: "clamp(44px, 10vw, 48px)",
                  borderRadius: "clamp(10px, 2.5vw, 12px)",
                  background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "clamp(20px, 5vw, 24px)",
                  transition: "transform 0.3s ease",
                }}
              >
                💰
              </div>
              <span style={{ color: "#FFFFFF", fontSize: "clamp(13px, 3vw, 14px)", fontWeight: 600 }}>
                خرید طلا
              </span>
            </Link>

            <Link
              href="/dashboard/buy-sell?type=sell"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                textDecoration: "none",
                padding: "16px 12px",
                borderRadius: "16px",
                background: "rgba(239, 68, 68, 0.1)",
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                }}
              >
                💎
              </div>
              <span style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 600 }}>
                فروش طلا
              </span>
            </Link>

            <Link
              href="/dashboard/wallet"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                textDecoration: "none",
                padding: "16px 12px",
                borderRadius: "16px",
                background: "rgba(251, 191, 36, 0.1)",
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                }}
              >
                👛
              </div>
              <span style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 600 }}>
                کیف پول
              </span>
            </Link>

            <Link
              href="/dashboard/savings"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                textDecoration: "none",
                padding: "16px 12px",
                borderRadius: "16px",
                background: "rgba(139, 92, 246, 0.1)",
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                }}
              >
                ⭐
              </div>
              <span style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 600 }}>
                کسب‌درآمد
              </span>
            </Link>
          </div>

          {/* Current Price Card */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "16px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M7.5 18.3334H12.5C16.6667 18.3334 18.3333 16.6667 18.3333 12.5V7.50002C18.3333 3.33335 16.6667 1.66669 12.5 1.66669H7.5C3.33333 1.66669 1.66667 3.33335 1.66667 7.50002V12.5C1.66667 16.6667 3.33333 18.3334 7.5 18.3334Z"
                  stroke="#FDB022"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#1F1F1F", margin: 0 }}>
                قیمت لحظه‌ای طلا
              </h3>
            </div>

            {loading ? (
              <>
                <ShimmerBox height="36px" borderRadius="10px" width="60%" />
                <div style={{ height: "8px" }} />
                <ShimmerBox height="20px" borderRadius="8px" width="40%" />
              </>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div
                  style={{
                    padding: "16px",
                    background: "#ECFDF5",
                    borderRadius: "16px",
                    border: "2px solid #10B981",
                  }}
                >
                  <div style={{ fontSize: "11px", color: "#059669", marginBottom: "6px", fontWeight: 600 }}>
                    قیمت خرید
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#059669" }}>
                    {currentPrice
                      ? toPersianNumber(parseFloat(currentPrice.sell_price).toLocaleString("fa-IR"))
                      : "..."}
                  </div>
                  <div style={{ fontSize: "10px", color: "#059669", marginTop: "4px" }}>
                    تومان/گرم
                  </div>
                </div>

                <div
                  style={{
                    padding: "16px",
                    background: "#FEF2F2",
                    borderRadius: "16px",
                    border: "2px solid #EF4444",
                  }}
                >
                  <div style={{ fontSize: "11px", color: "#DC2626", marginBottom: "6px", fontWeight: 600 }}>
                    قیمت فروش
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#DC2626" }}>
                    {currentPrice
                      ? toPersianNumber(parseFloat(currentPrice.buy_price).toLocaleString("fa-IR"))
                      : "..."}
                  </div>
                  <div style={{ fontSize: "10px", color: "#DC2626", marginTop: "4px" }}>
                    تومان/گرم
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Two Column Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "16px" }}>
            {/* Installment Card */}
            <Link
              href="/dashboard/installment"
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "20px",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: "48px" }}>📅</div>
              <h4
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1F1F1F",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                خرید قسطی
              </h4>
            </Link>

            {/* Services Card */}
            <Link
              href="/dashboard/services"
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "20px",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: "48px" }}>🛎️</div>
              <h4
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1F1F1F",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                خدمات
              </h4>
            </Link>
          </div>

          {/* Physical Receipt Card */}
          <Link
            href="/dashboard/physical-receipt"
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "24px",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
              transition: "all 0.2s",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
              }}
            >
              📦
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#1F1F1F", margin: "0 0 4px 0" }}>
                تحویل فیزیکی طلا
              </h4>
              <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
                تبدیل طلای دیجیتال به فیزیکی
              </p>
            </div>
          </Link>

          {/* Savings Card */}
          <Link
            href="/dashboard/savings"
            style={{
              background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
              borderRadius: "20px",
              padding: "24px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(139, 92, 246, 0.25)",
              color: "#FFFFFF",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                backdropFilter: "blur(10px)",
              }}
            >
              💰
            </div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 4px 0" }}>
                کسب درآمد از طلا
              </h4>
              <p style={{ fontSize: "13px", margin: 0, opacity: 0.9 }}>
                پس‌انداز هوشمند و دریافت سود
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
