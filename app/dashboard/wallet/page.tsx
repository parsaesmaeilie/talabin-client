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
        return { bg: "#D1FAE5", color: "#059669", border: "#10B981" };
      case 'failed':
      case 'cancelled':
        return { bg: "#FEE2E2", color: "#DC2626", border: "#EF4444" };
      default:
        return { bg: "#FEF3C7", color: "#D97706", border: "#F59E0B" };
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
        return { icon: '💰', bg: '#D1FAE5', color: '#059669' };
      case 'withdraw':
        return { icon: '💸', bg: '#FEE2E2', color: '#DC2626' };
      case 'buy_gold':
        return { icon: '🪙', bg: '#FEF3C7', color: '#D97706' };
      case 'sell_gold':
        return { icon: '💎', bg: '#DBEAFE', color: '#2563EB' };
      case 'fee':
        return { icon: '💳', bg: '#F3E8FF', color: '#9333EA' };
      case 'refund':
        return { icon: '↩️', bg: '#E0E7FF', color: '#4F46E5' };
      default:
        return { icon: '📝', bg: '#F3F4F6', color: '#6B7280' };
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .wallet-card {
          animation: slideInUp 0.4s ease-out;
        }

        @media (hover: hover) {
          .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          }
        }

        .action-btn:active {
          transform: scale(0.98);
        }

        @media (hover: hover) {
          .transaction-item:hover {
            background: #F8F9FA !important;
            transform: translateX(-2px);
          }
        }

        .balance-card {
          animation: slideInUp 0.5s ease-out;
        }

        .stat-number {
          font-variant-numeric: tabular-nums;
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#FAFAFA", paddingBottom: "100px" }}>
        {/* Header */}
        <div
          style={{
            background: "#FFFFFF",
            padding: "20px 16px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ maxWidth: "600px", margin: "0 auto", display: "flex", alignItems: "center", gap: "12px" }}>
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
                  transition: "all 0.2s ease",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 19L8 12L15 5"
                    stroke="#1F1F1F"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#1F1F1F", margin: 0 }}>
                کیف پول من
              </h1>
              <p style={{ fontSize: "12px", color: "#6B7280", margin: "4px 0 0" }}>
                مدیریت موجودی و تراکنش‌ها
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "20px 16px", maxWidth: "600px", margin: "0 auto" }}>
          {/* Error Message */}
          {error && (
            <div
              style={{
                padding: "16px 20px",
                marginBottom: "20px",
                borderRadius: "16px",
                background: "#FEE2E2",
                border: "1px solid #FCA5A5",
                color: "#DC2626",
                fontSize: "14px",
                textAlign: "center",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                animation: "fadeIn 0.3s ease-out",
              }}
            >
              <span>⚠️ {error}</span>
              <button
                onClick={fetchWalletData}
                style={{
                  background: "#DC2626",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 600,
                  transition: "all 0.2s",
                }}
              >
                تلاش مجدد
              </button>
            </div>
          )}

          {/* Total Balance Summary */}
          <div
            className="wallet-card"
            style={{
              background: "linear-gradient(135deg, #FDB022 0%, #F59E0B 100%)",
              borderRadius: "24px",
              padding: "28px 24px",
              marginBottom: "20px",
              boxShadow: "0 8px 24px rgba(253, 176, 34, 0.25)",
              color: "#FFFFFF",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background Pattern */}
            <div
              style={{
                position: "absolute",
                top: "-20px",
                left: "-20px",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.1)",
                filter: "blur(40px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-30px",
                right: "-30px",
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.08)",
                filter: "blur(50px)",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  💰
                </div>
                <div>
                  <h3 style={{ fontSize: "14px", fontWeight: 600, margin: 0, opacity: 0.95 }}>
                    مجموع دارایی
                  </h3>
                  <p style={{ fontSize: "11px", margin: "2px 0 0", opacity: 0.85 }}>
                    به تومان
                  </p>
                </div>
              </div>

              {loading ? (
                <ShimmerBox height="56px" borderRadius="12px" width="70%" />
              ) : wallet ? (
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "12px" }}>
                  <span className="stat-number" style={{ fontSize: "40px", fontWeight: 800, lineHeight: 1 }}>
                    {toPersianNumber(Math.floor(wallet.total_value_irr).toLocaleString("fa-IR"))}
                  </span>
                  <span style={{ fontSize: "18px", fontWeight: 600, opacity: 0.95 }}>تومان</span>
                </div>
              ) : null}

              <div
                style={{
                  padding: "10px 14px",
                  background: "rgba(255, 255, 255, 0.15)",
                  borderRadius: "12px",
                  fontSize: "12px",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ fontSize: "14px" }}>✨</span>
                شامل طلا و موجودی نقدی
              </div>
            </div>
          </div>

          {/* Balance Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "20px" }}>
            {/* Gold Balance */}
            <div
              className="balance-card"
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "20px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
                animationDelay: "0.1s",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "#FEF3C7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  marginBottom: "16px",
                }}
              >
                🪙
              </div>
              {loading ? (
                <>
                  <ShimmerBox height="16px" width="65%" borderRadius="6px" />
                  <div style={{ height: "12px" }} />
                  <ShimmerBox height="24px" width="85%" borderRadius="8px" />
                </>
              ) : wallet ? (
                <>
                  <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "8px", fontWeight: 500 }}>
                    طلای دیجیتال
                  </div>
                  <div className="stat-number" style={{ fontSize: "22px", fontWeight: 700, color: "#1F1F1F", marginBottom: "6px" }}>
                    {toPersianNumber(parseFloat(wallet.available_gold_balance).toFixed(4))} <span style={{ fontSize: "13px", color: "#9CA3AF", fontWeight: 500 }}>گرم</span>
                  </div>
                  <div style={{ fontSize: "10px", color: "#9CA3AF" }}>
                    ≈ {toPersianNumber(Math.floor(goldValueInToman).toLocaleString("fa-IR"))} تومان
                  </div>
                </>
              ) : null}
            </div>

            {/* IRR Balance */}
            <div
              className="balance-card"
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "20px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
                animationDelay: "0.2s",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "#D1FAE5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  marginBottom: "16px",
                }}
              >
                💵
              </div>
              {loading ? (
                <>
                  <ShimmerBox height="16px" width="65%" borderRadius="6px" />
                  <div style={{ height: "12px" }} />
                  <ShimmerBox height="24px" width="85%" borderRadius="8px" />
                </>
              ) : wallet ? (
                <>
                  <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "8px", fontWeight: 500 }}>
                    موجودی تومان
                  </div>
                  <div className="stat-number" style={{ fontSize: "22px", fontWeight: 700, color: "#1F1F1F", marginBottom: "6px" }}>
                    {toPersianNumber(parseFloat(wallet.available_balance_irr).toLocaleString("fa-IR"))} <span style={{ fontSize: "13px", color: "#9CA3AF", fontWeight: 500 }}>تومان</span>
                  </div>
                  <div style={{ fontSize: "10px", color: "#10B981", fontWeight: 600 }}>
                    ✓ آماده برداشت
                  </div>
                </>
              ) : null}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "24px" }}>
            <Link href="/dashboard/wallet/deposit" style={{ textDecoration: "none" }}>
              <button
                className="action-btn"
                style={{
                  width: "100%",
                  padding: "18px",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  background: "#1F1F1F",
                  border: "none",
                  borderRadius: "16px",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(31, 31, 31, 0.15)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(253, 176, 34, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 4V20M4 12H20"
                      stroke="#FDB022"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                واریز
              </button>
            </Link>
            <Link href="/dashboard/wallet/withdraw" style={{ textDecoration: "none" }}>
              <button
                className="action-btn"
                style={{
                  width: "100%",
                  padding: "18px",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1F1F1F",
                  background: "#FFFFFF",
                  border: "2px solid #E5E7EB",
                  borderRadius: "16px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "#FEE2E2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 12H20M20 12L14 6M20 12L14 18"
                      stroke="#DC2626"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                برداشت
              </button>
            </Link>
          </div>

          {/* Recent Transactions */}
          <div
            className="wallet-card"
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "24px 20px",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
              animationDelay: "0.3s",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: "#F3F4F6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                  }}
                >
                  📋
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1F1F1F", margin: 0 }}>
                  تراکنش‌های اخیر
                </h3>
              </div>
              <Link
                href="/dashboard/wallet/history"
                style={{
                  fontSize: "13px",
                  color: "#FDB022",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                همه
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <ShimmerBox width="52px" height="52px" borderRadius="14px" />
                    <div style={{ flex: 1 }}>
                      <ShimmerBox height="16px" width="60%" borderRadius="6px" />
                      <div style={{ height: "8px" }} />
                      <ShimmerBox height="14px" width="40%" borderRadius="6px" />
                    </div>
                    <ShimmerBox width="70px" height="28px" borderRadius="8px" />
                  </div>
                ))}
              </div>
            ) : transactions.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {transactions.map((transaction) => {
                  const badgeColors = getTransactionBadgeColor(transaction.status);
                  const iconData = getTransactionIcon(transaction.transaction_type);
                  return (
                    <div
                      key={transaction.id}
                      className="transaction-item"
                      style={{
                        display: "flex",
                        gap: "14px",
                        padding: "14px",
                        background: "#FAFAFA",
                        borderRadius: "16px",
                        alignItems: "center",
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          width: "52px",
                          height: "52px",
                          borderRadius: "14px",
                          background: iconData.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "24px",
                          flexShrink: 0,
                        }}
                      >
                        {iconData.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "14px", fontWeight: 600, color: "#1F1F1F", marginBottom: "4px" }}>
                          {getTransactionTypeText(transaction.transaction_type)}
                        </div>
                        <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "2px" }}>
                          {transaction.amount_irr && parseFloat(transaction.amount_irr) > 0
                            ? `${toPersianNumber(parseFloat(transaction.amount_irr).toLocaleString("fa-IR"))} تومان`
                            : transaction.amount_gold && parseFloat(transaction.amount_gold) > 0
                            ? `${toPersianNumber(parseFloat(transaction.amount_gold).toFixed(4))} گرم`
                            : ""}
                        </div>
                        <div style={{ fontSize: "10px", color: "#9CA3AF" }}>
                          {toPersianNumber(new Date(transaction.created_at).toLocaleDateString("fa-IR", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }))}
                        </div>
                      </div>
                      <div
                        style={{
                          padding: "6px 12px",
                          background: badgeColors.bg,
                          color: badgeColors.color,
                          borderRadius: "10px",
                          fontSize: "11px",
                          fontWeight: 700,
                          flexShrink: 0,
                          border: `1px solid ${badgeColors.border}`,
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
                  padding: "48px 20px",
                  color: "#6B7280",
                  fontSize: "14px",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "#F3F4F6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "36px",
                    margin: "0 auto 16px",
                  }}
                >
                  📭
                </div>
                <div style={{ fontWeight: 600, marginBottom: "6px" }}>هیچ تراکنشی وجود ندارد</div>
                <div style={{ fontSize: "12px", color: "#9CA3AF" }}>
                  تراکنش‌های شما اینجا نمایش داده می‌شود
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
