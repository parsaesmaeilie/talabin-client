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
          <h1 style={{ fontSize: "18px", fontWeight: 600, flex: 1, color: "#1F1F1F" }}>
            کیف پول
          </h1>
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
                onClick={fetchWalletData}
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

          {/* Total Balance Card */}
          <div
            style={{
              background: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
              borderRadius: "20px",
              padding: "24px",
              marginBottom: "16px",
              boxShadow: "0 8px 20px rgba(251, 191, 36, 0.25)",
              color: "#FFFFFF",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 12H14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 style={{ fontSize: "15px", fontWeight: 600, margin: 0, opacity: 0.9 }}>
                ارزش کل دارایی
              </h3>
            </div>

            {loading ? (
              <>
                <ShimmerBox height="48px" borderRadius="12px" width="70%" />
                <div style={{ height: "8px" }} />
                <ShimmerBox height="20px" borderRadius="8px" width="50%" />
              </>
            ) : wallet ? (
              <>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "36px", fontWeight: 700 }}>
                    {toPersianNumber(wallet.total_value_irr.toLocaleString("fa-IR"))}
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
                  شامل طلای دیجیتال و موجودی نقدی
                </div>
              </>
            ) : null}
          </div>

          {/* Balance Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "16px" }}>
            {/* Gold Balance */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  fontSize: "60px",
                  opacity: 0.1,
                }}
              >
                🪙
              </div>
              {loading ? (
                <>
                  <ShimmerBox height="16px" width="60%" borderRadius="6px" />
                  <div style={{ height: "12px" }} />
                  <ShimmerBox height="28px" width="80%" borderRadius="8px" />
                </>
              ) : wallet ? (
                <>
                  <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "8px", fontWeight: 500 }}>
                    💎 طلای دیجیتال
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "22px", fontWeight: 700, color: "#1F1F1F" }}>
                      {toPersianNumber(parseFloat(wallet.available_gold_balance).toFixed(4))}
                    </span>
                    <span style={{ fontSize: "13px", color: "#6B7280" }}>گرم</span>
                  </div>
                  {parseFloat(wallet.frozen_gold_balance) > 0 && (
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#F59E0B",
                        background: "#FEF3C7",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        marginTop: "6px",
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
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  fontSize: "60px",
                  opacity: 0.1,
                }}
              >
                💰
              </div>
              {loading ? (
                <>
                  <ShimmerBox height="16px" width="60%" borderRadius="6px" />
                  <div style={{ height: "12px" }} />
                  <ShimmerBox height="28px" width="80%" borderRadius="8px" />
                </>
              ) : wallet ? (
                <>
                  <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "8px", fontWeight: 500 }}>
                    💵 موجودی تومان
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "22px", fontWeight: 700, color: "#1F1F1F" }}>
                      {toPersianNumber(parseFloat(wallet.available_balance_irr).toLocaleString("fa-IR"))}
                    </span>
                    <span style={{ fontSize: "11px", color: "#6B7280" }}>تومان</span>
                  </div>
                  {parseFloat(wallet.frozen_balance_irr) > 0 && (
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#F59E0B",
                        background: "#FEF3C7",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        marginTop: "6px",
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "16px" }}>
            <Link href="/dashboard/wallet/deposit" style={{ textDecoration: "none" }}>
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
                  transition: "all 0.2s",
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
                style={{
                  width: "100%",
                  padding: "18px",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#1F1F1F",
                  background: "#FFFFFF",
                  border: "2px solid #E5E7EB",
                  borderRadius: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s",
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
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#1F1F1F", margin: 0 }}>
                📋 تراکنش‌های اخیر
              </h3>
              <Link
                href="/dashboard/wallet/history"
                style={{
                  fontSize: "12px",
                  color: "#F59E0B",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                مشاهده همه ←
              </Link>
            </div>

            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <ShimmerBox width="40px" height="40px" borderRadius="12px" />
                    <div style={{ flex: 1 }}>
                      <ShimmerBox height="16px" width="60%" borderRadius="6px" />
                      <div style={{ height: "6px" }} />
                      <ShimmerBox height="12px" width="40%" borderRadius="6px" />
                    </div>
                  </div>
                ))}
              </div>
            ) : transactions.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {transactions.map((transaction) => {
                  const badgeColors = getTransactionBadgeColor(transaction.status);
                  return (
                    <div
                      key={transaction.id}
                      style={{
                        display: "flex",
                        gap: "12px",
                        padding: "12px",
                        background: "#FAFAFA",
                        borderRadius: "12px",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "12px",
                          background: "#FFFFFF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                          flexShrink: 0,
                        }}
                      >
                        {getTransactionIcon(transaction.transaction_type)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "13px", fontWeight: 600, color: "#1F1F1F", marginBottom: "4px" }}>
                          {getTransactionTypeText(transaction.transaction_type)}
                        </div>
                        <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "2px" }}>
                          {transaction.amount_irr && parseFloat(transaction.amount_irr) > 0
                            ? `${toPersianNumber(parseFloat(transaction.amount_irr).toLocaleString("fa-IR"))} تومان`
                            : transaction.amount_gold && parseFloat(transaction.amount_gold) > 0
                            ? `${toPersianNumber(parseFloat(transaction.amount_gold).toFixed(4))} گرم`
                            : ""}
                        </div>
                        <div style={{ fontSize: "10px", color: "#9CA3AF" }}>
                          {new Date(transaction.created_at).toLocaleDateString("fa-IR", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                      <div
                        style={{
                          padding: "6px 12px",
                          background: badgeColors.bg,
                          color: badgeColors.color,
                          borderRadius: "8px",
                          fontSize: "11px",
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
                  padding: "40px 20px",
                  color: "#6B7280",
                  fontSize: "13px",
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
                <div>هیچ تراکنشی یافت نشد</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
