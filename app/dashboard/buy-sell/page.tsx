"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { tradingService, OrderPreview } from "@/lib/api/trading";
import { pricesService, GoldPrice } from "@/lib/api/prices";
import { walletService, Wallet } from "@/lib/api/wallet";

export default function BuySell() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<OrderPreview | null>(null);
  const [currentPrice, setCurrentPrice] = useState<GoldPrice | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch current price and wallet balance on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Update preview when amount or tab changes
  useEffect(() => {
    if (amount && parseFloat(amount) >= 100000) {
      fetchPreview();
    } else {
      setPreview(null);
    }
  }, [amount, activeTab]);

  const fetchData = async () => {
    try {
      const [priceResponse, walletResponse] = await Promise.all([
        pricesService.getCurrentPrice(),
        walletService.getBalance(),
      ]);

      if (priceResponse.success && priceResponse.data) {
        setCurrentPrice(priceResponse.data);
      }

      if (walletResponse.success && walletResponse.data) {
        setWallet(walletResponse.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const fetchPreview = async () => {
    if (!amount || parseFloat(amount) < 100000) return;

    try {
      const response = await tradingService.previewOrder({
        order_type: activeTab,
        amount_irr: parseFloat(amount),
      });

      if (response.success && response.data) {
        setPreview(response.data);
      }
    } catch (err) {
      console.error("Error fetching preview:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!amount || parseFloat(amount) < 100000) {
      setError("حداقل مبلغ 100,000 تومان است");
      return;
    }

    setLoading(true);

    try {
      const response = await tradingService.placeOrder({
        order_type: activeTab,
        amount_irr: parseFloat(amount),
      });

      if (response.success) {
        setSuccess(
          activeTab === "buy"
            ? "خرید با موفقیت انجام شد!"
            : "فروش با موفقیت انجام شد!"
        );
        setAmount("");
        setPreview(null);
        // Refresh wallet balance
        await fetchData();
        // Redirect to wallet after 2 seconds
        setTimeout(() => {
          router.push("/dashboard/wallet");
        }, 2000);
      } else {
        setError(response.error?.message || "خطا در انجام عملیات");
      }
    } catch (err: any) {
      console.error("Error placing order:", err);
      setError(err.message || "خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ padding: "20px 16px 80px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 600,
            margin: "0 0 6px",
          }}
        >
          خرید / فروش طلا
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "var(--color-muted)",
            margin: "0 0 20px",
          }}
        >
          یک صفحه ساده برای ثبت سفارش خرید یا فروش
        </p>

      {/* Success Message */}
      {success && (
        <div
          className="slide-in-down"
          style={{
            padding: "12px 16px",
            marginBottom: "16px",
            borderRadius: "12px",
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#059669",
            fontSize: "13px",
            textAlign: "center",
          }}
        >
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          className="slide-in-down"
          style={{
            padding: "12px 16px",
            marginBottom: "16px",
            borderRadius: "12px",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#DC2626",
            fontSize: "13px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      {/* Wallet Balance Card */}
      {wallet && (
        <Card style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "12px", color: "var(--color-muted)", marginBottom: "4px" }}>
                موجودی ریالی
              </div>
              <div style={{ fontSize: "16px", fontWeight: 600 }}>
                {parseFloat(wallet.available_balance_irr).toLocaleString('fa-IR')} تومان
              </div>
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "12px", color: "var(--color-muted)", marginBottom: "4px" }}>
                موجودی طلا
              </div>
              <div style={{ fontSize: "16px", fontWeight: 600 }}>
                {parseFloat(wallet.available_gold_balance).toFixed(4)} گرم
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Price Card */}
      <Card style={{ marginBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "6px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "var(--color-muted)",
                marginBottom: "6px",
              }}
            >
              قیمت لحظه‌ای طلا ({activeTab === "buy" ? "خرید" : "فروش"})
            </div>
            <div style={{ fontSize: "18px", fontWeight: 700 }}>
              {currentPrice
                ? parseFloat(
                    activeTab === "buy" ? currentPrice.sell_price : currentPrice.buy_price
                  ).toLocaleString('fa-IR')
                : "در حال بارگذاری..."}
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "var(--color-muted)",
                  marginRight: "6px",
                }}
              >
                تومان
              </span>
            </div>
          </div>
          <Badge variant="green">به‌روزرسانی لحظه‌ای</Badge>
        </div>

        {/* Tabs */}
        <div
          className="grid-2"
          style={{ gap: "6px", marginTop: "10px" }}
        >
          <button
            className="btn"
            onClick={() => setActiveTab("buy")}
            style={{
              background: activeTab === "buy" ? "var(--color-primary)" : "rgba(0,0,0,0.02)",
              borderColor: activeTab === "buy" ? "var(--color-primary)" : "rgba(0,0,0,0.06)",
              color: activeTab === "buy" ? "#1C1C1C" : "var(--color-muted)",
              borderRadius: "var(--radius-md)",
            }}
          >
            خرید
          </button>
          <button
            className="btn"
            onClick={() => setActiveTab("sell")}
            style={{
              background: activeTab === "sell" ? "var(--color-danger)" : "rgba(0,0,0,0.02)",
              borderColor: activeTab === "sell" ? "var(--color-danger)" : "rgba(0,0,0,0.06)",
              color: activeTab === "sell" ? "#FFFFFF" : "var(--color-muted)",
              borderRadius: "var(--radius-md)",
            }}
          >
            فروش
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label className="form-label">مبلغ به تومان</label>
              <span style={{ fontSize: "11px", color: "var(--color-muted)" }}>
                حداقل ۱۰۰,۰۰۰ تومان
              </span>
            </div>
            <input
              type="number"
              className="form-input"
              placeholder="مثلاً ۵۰۰,۰۰۰"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="100000"
              step="1000"
            />
            <small className="form-hint">
              می‌توانی بعداً این ورودی را به عددی واقعی و ماسک‌شده تبدیل کنی.
            </small>
          </div>

          {/* Summary */}
          {preview && (
            <div
              className="scale-in"
              style={{
                marginTop: "14px",
                borderRadius: "12px",
                background: "var(--color-soft)",
                padding: "10px 12px",
                fontSize: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <span>قیمت هر گرم</span>
                <span style={{ fontWeight: 600 }}>
                  {preview.gold_price_per_gram.toLocaleString('fa-IR')} تومان
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <span>مقدار طلا</span>
                <span style={{ fontWeight: 600 }}>
                  {preview.gold_amount.toFixed(4)} گرم
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <span>کارمزد (۰٫۵٪)</span>
                <span style={{ fontWeight: 600 }}>
                  {preview.fee.toLocaleString('fa-IR')} تومان
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid rgba(0,0,0,0.1)",
                  paddingTop: "6px",
                  marginTop: "6px",
                }}
              >
                <span style={{ fontWeight: 600 }}>مبلغ نهایی {activeTab === "buy" ? "پرداخت" : "دریافت"}</span>
                <span style={{ fontWeight: 700, fontSize: "14px" }}>
                  {preview.total_amount.toLocaleString('fa-IR')} تومان
                </span>
              </div>
            </div>
          )}

          {!preview && amount && parseFloat(amount) >= 100000 && (
            <div
              style={{
                marginTop: "14px",
                borderRadius: "12px",
                background: "var(--color-soft)",
                padding: "10px 12px",
                fontSize: "12px",
                textAlign: "center",
                color: "var(--color-muted)",
              }}
            >
              در حال محاسبه...
            </div>
          )}

          <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
            <Button
              type="submit"
              variant={activeTab === "buy" ? "success" : "danger"}
              style={{ flex: "1", minWidth: "180px" }}
              disabled={loading || !preview}
            >
              {loading ? "در حال انجام..." : "ادامه و ثبت سفارش"}
            </Button>

            <Button
              type="button"
              variant="outline"
              style={{ flex: "1", minWidth: "180px" }}
              disabled={loading}
            >
              مشاهده قوانین
            </Button>
          </div>
        </form>
      </Card>

      {/* Info Card */}
      <Card>
        <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>
          نکات مهم
        </div>
        <ul
          style={{
            fontSize: "12px",
            lineHeight: 1.8,
            color: "var(--color-muted)",
            paddingRight: "18px",
            margin: 0,
          }}
        >
          <li>قیمت طلا به‌صورت لحظه‌ای به‌روزرسانی می‌شود</li>
          <li>کارمزد خرید و فروش ۰٫۵٪ است</li>
          <li>حداقل مبلغ خرید ۱۰۰,۰۰۰ تومان است</li>
          <li>پس از ثبت سفارش، طلای شما در کیف پول ذخیره می‌شود</li>
        </ul>
      </Card>
      </div>
    </div>
  );
}
