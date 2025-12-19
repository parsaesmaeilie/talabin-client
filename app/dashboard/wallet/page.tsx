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
    <div className="min-h-screen" style={{ padding: "20px 16px 80px" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 600,
            margin: "0 0 6px",
          }}
        >
          کیف پول
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "var(--color-muted)",
            margin: "0 0 20px",
          }}
        >
          مدیریت موجودی تومان و طلای دیجیتال در طلابین
        </p>

      {/* Total Balance Card */}
      <Card style={{ marginBottom: "12px" }} className={loading ? "" : "scale-in"}>
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
      </Card>

      {/* Balance Cards */}
      <div className="grid-2" style={{ gap: "10px", marginBottom: "12px" }}>
        <Card className={loading ? "" : "scale-in"}>
          {loading ? (
            <div className="skeleton" style={{ height: "50px", width: "100%" }}></div>
          ) : wallet ? (
            <>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--color-muted)",
                  marginBottom: "6px",
                }}
              >
                طلای دیجیتال
              </div>
              <div style={{ marginTop: "6px" }}>
                <span style={{ fontSize: "18px", fontWeight: 700 }}>
                  {parseFloat(wallet.available_gold_balance).toFixed(4)}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "var(--color-muted)",
                    marginRight: "4px",
                  }}
                >
                  گرم
                </span>
              </div>
              {parseFloat(wallet.frozen_gold_balance) > 0 && (
                <div style={{ fontSize: "10px", color: "var(--color-muted)", marginTop: "4px" }}>
                  مسدود شده: {parseFloat(wallet.frozen_gold_balance).toFixed(4)} گرم
                </div>
              )}
            </>
          ) : null}
        </Card>

        <Card className={loading ? "" : "scale-in"}>
          {loading ? (
            <div className="skeleton" style={{ height: "50px", width: "100%" }}></div>
          ) : wallet ? (
            <>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--color-muted)",
                  marginBottom: "6px",
                }}
              >
                موجودی تومان
              </div>
              <div style={{ marginTop: "6px" }}>
                <span style={{ fontSize: "18px", fontWeight: 700 }}>
                  {parseFloat(wallet.available_balance_irr).toLocaleString('fa-IR')}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "var(--color-muted)",
                    marginRight: "4px",
                  }}
                >
                  تومان
                </span>
              </div>
              {parseFloat(wallet.frozen_balance_irr) > 0 && (
                <div style={{ fontSize: "10px", color: "var(--color-muted)", marginTop: "4px" }}>
                  مسدود شده: {parseFloat(wallet.frozen_balance_irr).toLocaleString('fa-IR')} تومان
                </div>
              )}
            </>
          ) : null}
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="grid-2" style={{ gap: "10px", marginBottom: "16px" }}>
        <Button variant="primary" fullWidth asLink href="/dashboard/wallet/deposit">
          واریز
        </Button>
        <Button variant="outline" fullWidth asLink href="/dashboard/wallet/withdraw">
          برداشت
        </Button>
      </div>

      {/* Recent Wallet History */}
      <Card className={loading ? "" : "scale-in"}>
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
      </Card>
      </div>
    </div>
  );
}
