"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { walletService, Wallet, WalletTransaction } from "@/lib/api/wallet";
import { pricesService } from "@/lib/api/prices";

export default function WalletPage() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentGoldPrice, setCurrentGoldPrice] = useState<number>(0);

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const [walletResponse, transactionsResponse, priceResponse] = await Promise.all([
        walletService.getBalance(),
        walletService.getTransactions(),
        pricesService.getCurrentPrice(),
      ]);

      if (walletResponse.success && walletResponse.data) {
        setWallet(walletResponse.data);
      }

      if (transactionsResponse.success && transactionsResponse.data) {
        setTransactions(transactionsResponse.data.slice(0, 5)); // Show last 5 transactions
      }

      if (priceResponse.success && priceResponse.data) {
        setCurrentGoldPrice(parseFloat(priceResponse.data.sell_price));
      }
    } catch (err) {
      console.error("Error fetching wallet data:", err);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'failed':
      case 'cancelled':
        return 'red';
      default:
        return 'yellow';
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
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA" }}>
      {/* Header */}
      <div
        style={{
          background: "#FFFFFF",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
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
      <div style={{ padding: "0 16px 16px" }}>

      {/* Total Balance Card */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "16px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        }}
        className={loading ? "" : "scale-in"}
      >
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <div className="skeleton" style={{ height: "60px", width: "100%" }}></div>
          </div>
        ) : wallet ? (
          <>
            <div
              style={{
                fontSize: "12px",
                color: "var(--color-muted)",
                marginBottom: "8px",
              }}
            >
              موجودی کل
            </div>
            <div style={{ marginTop: "6px" }}>
              <span style={{ fontSize: "22px", fontWeight: 700 }}>
                {wallet.total_value_irr.toLocaleString('fa-IR')}
              </span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "var(--color-muted)",
                  marginRight: "6px",
                }}
              >
                تومان (تقریبی)
              </span>
            </div>
            <div
              style={{
                marginTop: "6px",
                fontSize: "11px",
                color: "var(--color-muted)",
              }}
            >
              شامل طلای دیجیتال و موجودی نقدی
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px", color: "var(--color-muted)" }}>
            خطا در بارگذاری اطلاعات
          </div>
        )}
      </div>

      {/* Balance Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "16px" }}>
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          }}
          className={loading ? "" : "scale-in"}
        >
          {loading ? (
            <div className="skeleton" style={{ height: "50px", width: "100%" }}></div>
          ) : wallet ? (
            <>
              <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "8px" }}>
                طلای دیجیتال
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                <span style={{ fontSize: "20px", fontWeight: 700, color: "#1F1F1F" }}>
                  {parseFloat(wallet.available_gold_balance).toFixed(4)}
                </span>
                <span style={{ fontSize: "13px", color: "#6B7280" }}>گرم</span>
              </div>
              {parseFloat(wallet.frozen_gold_balance) > 0 && (
                <div style={{ fontSize: "10px", color: "#6B7280", marginTop: "4px" }}>
                  مسدود شده: {parseFloat(wallet.frozen_gold_balance).toFixed(4)} گرم
                </div>
              )}
            </>
          ) : null}
        </div>

        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          }}
          className={loading ? "" : "scale-in"}
        >
          {loading ? (
            <div className="skeleton" style={{ height: "50px", width: "100%" }}></div>
          ) : wallet ? (
            <>
              <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "8px" }}>
                موجودی تومان
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                <span style={{ fontSize: "20px", fontWeight: 700, color: "#1F1F1F" }}>
                  {parseFloat(wallet.available_balance_irr).toLocaleString('fa-IR')}
                </span>
                <span style={{ fontSize: "13px", color: "#6B7280" }}>تومان</span>
              </div>
              {parseFloat(wallet.frozen_balance_irr) > 0 && (
                <div style={{ fontSize: "10px", color: "#6B7280", marginTop: "4px" }}>
                  مسدود شده: {parseFloat(wallet.frozen_balance_irr).toLocaleString('fa-IR')} تومان
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
              padding: "16px",
              fontSize: "15px",
              fontWeight: 600,
              color: "#1F1F1F",
              background: "#FDB022",
              border: "none",
              borderRadius: "16px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(253, 176, 34, 0.3)",
            }}
          >
            واریز
          </button>
        </Link>
        <Link href="/dashboard/wallet/withdraw" style={{ textDecoration: "none" }}>
          <button
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "15px",
              fontWeight: 600,
              color: "#1F1F1F",
              background: "#FFFFFF",
              border: "2px solid #F3F4F6",
              borderRadius: "16px",
              cursor: "pointer",
            }}
          >
            برداشت
          </button>
        </Link>
      </div>

      {/* Recent Wallet History */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        }}
        className={loading ? "" : "scale-in"}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "12px", color: "var(--color-muted)" }}>
            تاریخچه اخیر کیف پول
          </span>
          <Link
            href="/dashboard/wallet/history"
            style={{ fontSize: "11px", color: "var(--color-muted)" }}
          >
            مشاهده همه
          </Link>
        </div>

        {loading ? (
          <div className="skeleton" style={{ height: "150px", width: "100%" }}></div>
        ) : transactions.length > 0 ? (
          <div
            style={{
              borderRadius: "var(--radius-md)",
              border: "1px solid rgba(0,0,0,0.04)",
              background: "#FBFAF7",
              padding: "6px 8px",
            }}
          >
            {transactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className="fade-in"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 4px",
                  borderBottom: index < transactions.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none",
                  fontSize: "12px",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div>
                  <div>{getTransactionTypeText(transaction.transaction_type)}</div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--color-muted)",
                      marginTop: "3px",
                    }}
                  >
                    {transaction.amount_irr && parseFloat(transaction.amount_irr) > 0
                      ? `${parseFloat(transaction.amount_irr).toLocaleString('fa-IR')} تومان`
                      : transaction.amount_gold && parseFloat(transaction.amount_gold) > 0
                      ? `${parseFloat(transaction.amount_gold).toFixed(4)} گرم`
                      : ''}
                    {transaction.description && ` • ${transaction.description.substring(0, 30)}`}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "var(--color-muted)",
                      marginTop: "2px",
                    }}
                  >
                    {new Date(transaction.created_at).toLocaleDateString('fa-IR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                <Badge variant={getTransactionBadgeVariant(transaction.status)}>
                  {getTransactionBadgeText(transaction.status)}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "var(--color-muted)",
              fontSize: "13px",
            }}
          >
            هیچ تراکنشی یافت نشد
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
