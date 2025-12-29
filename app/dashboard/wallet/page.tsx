"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { walletService, Wallet, WalletTransaction } from "@/lib/api/wallet";
import { pricesService } from "@/lib/api/prices";

export default function WalletPage() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentGoldPrice, setCurrentGoldPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWalletData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchWalletData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchWalletData = async () => {
    try {
      const [walletResponse, transactionsResponse, priceResponse] = await Promise.all([
        walletService.getBalance(),
        walletService.getTransactions(),
        pricesService.getCurrentPrice(),
      ]);

      if (walletResponse.success && walletResponse.data) {
        setWallet(walletResponse.data);
      }

      if (transactionsResponse.success && transactionsResponse.data) {
        setTransactions(transactionsResponse.data.slice(0, 5));
      }

      if (priceResponse.success && priceResponse.data) {
        setCurrentGoldPrice(parseFloat(priceResponse.data.sell_price));
      }

      setError(null);
    } catch (err: any) {
      console.error("Error fetching wallet data:", err);
      setError("خطا در بارگذاری اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  const toPersianNumber = (num: string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const getTransactionBadgeColor = (status: string) => {
    switch (status) {
      case 'completed':
        return { bg: "#D1FAE5", color: "#059669" };
      case 'failed':
      case 'cancelled':
        return { bg: "#FEE2E2", color: "#DC2626" };
      default:
        return { bg: "#FEF3C7", color: "#F59E0B" };
    }
  };

  const getTransactionBadgeText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'موفق';
      case 'failed':
        return 'ناموفق';
      case 'cancelled':
        return 'لغو شده';
      case 'processing':
        return 'در حال پردازش';
      default:
        return 'در انتظار';
    }
  };

  const getTransactionTypeText = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'واریز تومان';
      case 'withdraw':
        return 'برداشت تومان';
      case 'buy_gold':
        return 'خرید طلا';
      case 'sell_gold':
        return 'فروش طلا';
      case 'fee':
        return 'کارمزد';
      case 'refund':
        return 'برگشت وجه';
      default:
        return type;
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return '💰';
      case 'withdraw':
        return '💸';
      case 'buy_gold':
        return '🪙';
      case 'sell_gold':
        return '💎';
      case 'fee':
        return '💳';
      case 'refund':
        return '↩️';
      default:
        return '📝';
    }
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

  const goldValueInToman = wallet && currentGoldPrice
    ? parseFloat(wallet.available_gold_balance) * currentGoldPrice
    : 0;

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
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

        .wallet-card {
          animation: slideInUp 0.4s ease-out;
        }

        @media (hover: hover) {
          .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
          }
        }

        .action-btn:active {
          transform: scale(0.98);
        }

        @media (hover: hover) {
          .transaction-item:hover {
            background: #F5F5F5 !important;
          }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#FAFAFA", paddingBottom: "100px" }}>
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
            <h1 style={{ fontSize: "clamp(16px, 4.5vw, 18px)", fontWeight: 700, color: "#1F1F1F", margin: 0 }}>
              کیف پول
            </h1>
            <p style={{ fontSize: "clamp(10px, 2.5vw, 11px)", color: "#6B7280", margin: "2px 0 0" }}>
              مدیریت موجودی و دارایی‌ها
            </p>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "clamp(12px, 4vw, 16px)", maxWidth: "600px", margin: "0 auto" }}>
          {/* Error Message */}
          {error && (
            <div
              style={{
                padding: "14px 18px",
                marginBottom: "clamp(12px, 4vw, 16px)",
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
                onClick={fetchWalletData}
                style={{
                  background: "#DC2626",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "clamp(11px, 3vw, 12px)",
                  fontWeight: 600,
                }}
              >
                تلاش مجدد
              </button>
            </div>
          )}

          {/* Total Balance Card */}
          <div
            className="wallet-card"
            style={{
              background: "linear-gradient(135deg, #1F2937 0%, #111827 100%)",
              borderRadius: "clamp(20px, 5vw, 24px)",
              padding: "clamp(22px, 6vw, 28px) clamp(20px, 5vw, 24px)",
              marginBottom: "clamp(12px, 4vw, 16px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
              color: "#FFFFFF",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background decoration */}
            <div
              style={{
                position: "absolute",
                top: "-40px",
                left: "-40px",
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                background: "rgba(253, 176, 34, 0.15)",
                filter: "blur(40px)",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "clamp(10px, 3vw, 12px)" }}>
                <div style={{ fontSize: "clamp(20px, 6vw, 24px)" }}>💼</div>
                <h3 style={{ fontSize: "clamp(13px, 3.5vw, 15px)", fontWeight: 600, margin: 0, opacity: 0.9 }}>
                  ارزش کل دارایی
                </h3>
              </div>

              {loading ? (
                <>
                  <ShimmerBox height="clamp(44px, 13vw, 52px)" borderRadius="12px" width="75%" />
                  <div style={{ height: "10px" }} />
                  <ShimmerBox height="clamp(20px, 5vw, 24px)" borderRadius="8px" width="60%" />
                </>
              ) : wallet ? (
                <>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(6px, 2vw, 8px)", marginBottom: "clamp(10px, 3vw, 12px)", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "clamp(32px, 10vw, 42px)", fontWeight: 800, lineHeight: 1 }}>
                      {toPersianNumber(wallet.total_value_irr.toLocaleString("fa-IR"))}
                    </span>
                    <span style={{ fontSize: "clamp(15px, 4.5vw, 18px)", fontWeight: 600, opacity: 0.9 }}>تومان</span>
                  </div>

                  <div
                    style={{
                      padding: "clamp(8px, 2.5vw, 10px) clamp(12px, 3.5vw, 14px)",
                      background: "rgba(255, 255, 255, 0.15)",
                      borderRadius: "12px",
                      fontSize: "clamp(11px, 3vw, 12px)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>✨</span>
                    شامل طلای دیجیتال و موجودی نقدی
                  </div>
                </>
              ) : null}
            </div>
          </div>

          {/* Balance Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(140px, 45vw, 160px), 1fr))", gap: "clamp(10px, 3vw, 12px)", marginBottom: "clamp(12px, 4vw, 16px)" }}>
            {/* Gold Balance */}
            <div
              className="wallet-card"
              style={{
                background: "#FFFFFF",
                borderRadius: "clamp(18px, 5vw, 20px)",
                padding: "clamp(18px, 5vw, 20px)",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
                position: "relative",
                overflow: "hidden",
                animationDelay: "0.1s",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-15px",
                  right: "-15px",
                  fontSize: "clamp(50px, 16vw, 64px)",
                  opacity: 0.08,
                }}
              >
                🪙
              </div>
              {loading ? (
                <>
                  <ShimmerBox height="clamp(14px, 4vw, 16px)" width="65%" borderRadius="6px" />
                  <div style={{ height: "clamp(10px, 3vw, 12px)" }} />
                  <ShimmerBox height="clamp(24px, 7vw, 28px)" width="85%" borderRadius="8px" />
                </>
              ) : wallet ? (
                <>
                  <div style={{ fontSize: "clamp(11px, 3vw, 12px)", color: "#6B7280", marginBottom: "clamp(6px, 2vw, 8px)", fontWeight: 500, display: "flex", alignItems: "center", gap: "4px" }}>
                    <span>💎</span> طلای دیجیتال
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "clamp(4px, 1.5vw, 6px)", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "clamp(20px, 6.5vw, 24px)", fontWeight: 700, color: "#1F1F1F" }}>
                      {toPersianNumber(parseFloat(wallet.available_gold_balance).toFixed(4))}
                    </span>
                    <span style={{ fontSize: "clamp(12px, 3.2vw, 13px)", color: "#6B7280" }}>گرم</span>
                  </div>
                  <div style={{ fontSize: "clamp(10px, 2.8vw, 11px)", color: "#9CA3AF", marginTop: "4px" }}>
                    ≈ {toPersianNumber(Math.floor(goldValueInToman).toLocaleString("fa-IR"))} تومان
                  </div>
                  {parseFloat(wallet.frozen_gold_balance) > 0 && (
                    <div
                      style={{
                        fontSize: "clamp(9px, 2.5vw, 10px)",
                        color: "#F59E0B",
                        background: "#FEF3C7",
                        padding: "clamp(3px, 1vw, 4px) clamp(6px, 2vw, 8px)",
                        borderRadius: "6px",
                        marginTop: "clamp(6px, 2vw, 8px)",
                        display: "inline-block",
                      }}
                    >
                      🔒 مسدود: {toPersianNumber(parseFloat(wallet.frozen_gold_balance).toFixed(4))} گرم
                    </div>
                  )}
                </>
              ) : null}
            </div>

            {/* IRR Balance */}
            <div
              className="wallet-card"
              style={{
                background: "#FFFFFF",
                borderRadius: "clamp(18px, 5vw, 20px)",
                padding: "clamp(18px, 5vw, 20px)",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
                position: "relative",
                overflow: "hidden",
                animationDelay: "0.2s",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-15px",
                  right: "-15px",
                  fontSize: "clamp(50px, 16vw, 64px)",
                  opacity: 0.08,
                }}
              >
                💰
              </div>
              {loading ? (
                <>
                  <ShimmerBox height="clamp(14px, 4vw, 16px)" width="65%" borderRadius="6px" />
                  <div style={{ height: "clamp(10px, 3vw, 12px)" }} />
                  <ShimmerBox height="clamp(24px, 7vw, 28px)" width="85%" borderRadius="8px" />
                </>
              ) : wallet ? (
                <>
                  <div style={{ fontSize: "clamp(11px, 3vw, 12px)", color: "#6B7280", marginBottom: "clamp(6px, 2vw, 8px)", fontWeight: 500, display: "flex", alignItems: "center", gap: "4px" }}>
                    <span>💵</span> موجودی تومان
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "clamp(4px, 1.5vw, 6px)", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "clamp(20px, 6.5vw, 24px)", fontWeight: 700, color: "#1F1F1F" }}>
                      {toPersianNumber(parseFloat(wallet.available_balance_irr).toLocaleString("fa-IR"))}
                    </span>
                    <span style={{ fontSize: "clamp(10px, 2.8vw, 11px)", color: "#6B7280" }}>تومان</span>
                  </div>
                  <div style={{ fontSize: "clamp(10px, 2.8vw, 11px)", color: "#9CA3AF", marginTop: "4px" }}>
                    آماده برای استفاده
                  </div>
                  {parseFloat(wallet.frozen_balance_irr) > 0 && (
                    <div
                      style={{
                        fontSize: "clamp(9px, 2.5vw, 10px)",
                        color: "#F59E0B",
                        background: "#FEF3C7",
                        padding: "clamp(3px, 1vw, 4px) clamp(6px, 2vw, 8px)",
                        borderRadius: "6px",
                        marginTop: "clamp(6px, 2vw, 8px)",
                        display: "inline-block",
                      }}
                    >
                      🔒 مسدود: {toPersianNumber(parseFloat(wallet.frozen_balance_irr).toLocaleString("fa-IR"))}
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "clamp(10px, 3vw, 12px)", marginBottom: "clamp(16px, 5vw, 20px)" }}>
            <Link href="/dashboard/wallet/deposit" style={{ textDecoration: "none" }}>
              <button
                className="action-btn"
                style={{
                  width: "100%",
                  padding: "clamp(16px, 4.5vw, 18px)",
                  fontSize: "clamp(14px, 4vw, 16px)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  background: "#1F1F1F",
                  border: "none",
                  borderRadius: "clamp(14px, 4vw, 16px)",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "clamp(6px, 2vw, 8px)",
                  transition: "all 0.2s ease",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 4.16669V15.8334M4.16669 10H15.8334"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                واریز تومان
              </button>
            </Link>
            <Link href="/dashboard/wallet/withdraw" style={{ textDecoration: "none" }}>
              <button
                className="action-btn"
                style={{
                  width: "100%",
                  padding: "clamp(16px, 4.5vw, 18px)",
                  fontSize: "clamp(14px, 4vw, 16px)",
                  fontWeight: 700,
                  color: "#1F1F1F",
                  background: "#FFFFFF",
                  border: "2px solid #E5E7EB",
                  borderRadius: "clamp(14px, 4vw, 16px)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "clamp(6px, 2vw, 8px)",
                  transition: "all 0.2s ease",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4.16669 10H15.8334M15.8334 10L10 4.16669M15.8334 10L10 15.8334"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                برداشت تومان
              </button>
            </Link>
          </div>

          {/* Recent Transactions */}
          <div
            className="wallet-card"
            style={{
              background: "#FFFFFF",
              borderRadius: "clamp(18px, 5vw, 20px)",
              padding: "clamp(18px, 5vw, 20px)",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
              animationDelay: "0.3s",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "clamp(14px, 4vw, 16px)",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              <h3 style={{ fontSize: "clamp(14px, 4vw, 15px)", fontWeight: 700, color: "#1F1F1F", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                <span>📋</span> تراکنش‌های اخیر
              </h3>
              <Link
                href="/dashboard/wallet/history"
                style={{
                  fontSize: "clamp(11px, 3vw, 12px)",
                  color: "#FDB022",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                مشاهده همه ←
              </Link>
            </div>

            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, 3vw, 12px)" }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ display: "flex", gap: "clamp(10px, 3vw, 12px)", alignItems: "center" }}>
                    <ShimmerBox width="clamp(38px, 11vw, 44px)" height="clamp(38px, 11vw, 44px)" borderRadius="12px" />
                    <div style={{ flex: 1 }}>
                      <ShimmerBox height="clamp(14px, 4vw, 16px)" width="60%" borderRadius="6px" />
                      <div style={{ height: "6px" }} />
                      <ShimmerBox height="clamp(11px, 3vw, 12px)" width="40%" borderRadius="6px" />
                    </div>
                  </div>
                ))}
              </div>
            ) : transactions.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px, 2.5vw, 10px)" }}>
                {transactions.map((transaction) => {
                  const badgeColors = getTransactionBadgeColor(transaction.status);
                  return (
                    <div
                      key={transaction.id}
                      className="transaction-item"
                      style={{
                        display: "flex",
                        gap: "clamp(10px, 3vw, 12px)",
                        padding: "clamp(10px, 3vw, 12px)",
                        background: "#FAFAFA",
                        borderRadius: "clamp(12px, 3.5vw, 14px)",
                        alignItems: "center",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div
                        style={{
                          width: "clamp(38px, 11vw, 44px)",
                          height: "clamp(38px, 11vw, 44px)",
                          borderRadius: "12px",
                          background: "#FFFFFF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "clamp(18px, 5.5vw, 20px)",
                          flexShrink: 0,
                        }}
                      >
                        {getTransactionIcon(transaction.transaction_type)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "clamp(12px, 3.5vw, 13px)", fontWeight: 600, color: "#1F1F1F", marginBottom: "4px" }}>
                          {getTransactionTypeText(transaction.transaction_type)}
                        </div>
                        <div style={{ fontSize: "clamp(10px, 2.8vw, 11px)", color: "#6B7280", marginBottom: "2px" }}>
                          {transaction.amount_irr && parseFloat(transaction.amount_irr) > 0
                            ? `${toPersianNumber(parseFloat(transaction.amount_irr).toLocaleString("fa-IR"))} تومان`
                            : transaction.amount_gold && parseFloat(transaction.amount_gold) > 0
                            ? `${toPersianNumber(parseFloat(transaction.amount_gold).toFixed(4))} گرم`
                            : ""}
                        </div>
                        <div style={{ fontSize: "clamp(9px, 2.5vw, 10px)", color: "#9CA3AF" }}>
                          {toPersianNumber(new Date(transaction.created_at).toLocaleDateString("fa-IR", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }))}
                        </div>
                      </div>
                      <div
                        style={{
                          padding: "clamp(5px, 1.5vw, 6px) clamp(10px, 3vw, 12px)",
                          background: badgeColors.bg,
                          color: badgeColors.color,
                          borderRadius: "8px",
                          fontSize: "clamp(10px, 2.8vw, 11px)",
                          fontWeight: 600,
                          flexShrink: 0,
                        }}
                      >
                        {getTransactionBadgeText(transaction.status)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "clamp(32px, 10vw, 40px) clamp(16px, 5vw, 20px)",
                  color: "#6B7280",
                  fontSize: "clamp(12px, 3.5vw, 13px)",
                }}
              >
                <div style={{ fontSize: "clamp(40px, 12vw, 48px)", marginBottom: "clamp(10px, 3vw, 12px)" }}>📭</div>
                <div>هیچ تراکنشی یافت نشد</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
