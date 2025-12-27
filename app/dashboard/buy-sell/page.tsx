"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TabSwitcher } from "@/components/buy-sell/TabSwitcher";
import { NumberPad } from "@/components/buy-sell/NumberPad";
import { tradingService, OrderPreview } from "@/lib/api/trading";
import { pricesService, GoldPrice } from "@/lib/api/prices";
import { walletService, Wallet } from "@/lib/api/wallet";
import { BottomNav } from "@/src/shared/components/layout/BottomNav";

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

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleSubmit = async () => {
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
        await fetchData();
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

  const handleNumberClick = (num: string) => {
    setAmount((prev) => prev + num);
  };

  const handleBackspace = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  const toPersianNumber = (num: string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", paddingBottom: "100px" }}>
      {/* Header */}
      <div
        style={{
          background: "#FFFFFF",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
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
          {activeTab === "buy" ? "خرید طلا" : "فروش طلا"}
        </h1>
      </div>

      {/* Content */}
      <div style={{ padding: "16px" }}>
        {/* Success/Error Messages */}
        {success && (
          <div
            style={{
              padding: "12px 16px",
              marginBottom: "16px",
              borderRadius: "12px",
              background: "#D1FAE5",
              color: "#059669",
              fontSize: "13px",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {success}
          </div>
        )}

        {error && (
          <div
            style={{
              padding: "12px 16px",
              marginBottom: "16px",
              borderRadius: "12px",
              background: "#FEE2E2",
              color: "#DC2626",
              fontSize: "13px",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {error}
          </div>
        )}

        {/* Price Display */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "16px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div style={{ marginBottom: "8px" }}>
            <span
              style={{
                display: "inline-block",
                padding: "4px 12px",
                background: "#D1FAE5",
                color: "#059669",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              قیمت لحظه‌ای
            </span>
          </div>
          <div style={{ fontSize: "13px", color: "#6B7280", marginBottom: "8px" }}>
            هر گرم طلا ۱۸ عیار
          </div>
          <div style={{ fontSize: "32px", fontWeight: 700, color: "#1F1F1F" }}>
            {currentPrice
              ? toPersianNumber(
                  parseFloat(
                    activeTab === "buy" ? currentPrice.sell_price : currentPrice.buy_price
                  ).toLocaleString("fa-IR")
                )
              : "..."}
            <span style={{ fontSize: "16px", fontWeight: 400, color: "#6B7280", marginRight: "8px" }}>
              تومان
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ marginBottom: "16px" }}>
          <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Input Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "16px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          }}
        >
          {/* Amount Input */}
          <div
            style={{
              padding: "16px",
              border: "2px solid #F3F4F6",
              borderRadius: "16px",
              marginBottom: "12px",
              background: "#FAFAFA",
            }}
          >
            <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "8px", textAlign: "right" }}>
              مبلغ پرداختی به تومان
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 600,
                textAlign: "center",
                minHeight: "36px",
                color: "#1F1F1F",
              }}
            >
              {amount ? toPersianNumber(amount) : ""}
            </div>
          </div>

          {/* Gold Amount Display */}
          <div
            style={{
              padding: "16px",
              border: "2px solid #F3F4F6",
              borderRadius: "16px",
              marginBottom: "20px",
              background: "#FAFAFA",
            }}
          >
            <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "8px", textAlign: "right" }}>
              مقدار طلا به گرم
            </div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 600,
                textAlign: "center",
                minHeight: "30px",
                color: "#1F1F1F",
              }}
            >
              {preview ? toPersianNumber(preview.gold_amount.toFixed(4)) : ""}
            </div>
          </div>

          {/* Number Pad */}
          <NumberPad onNumberClick={handleNumberClick} onBackspace={handleBackspace} />

          {/* Fee Display */}
          {preview && (
            <div
              style={{
                marginTop: "20px",
                padding: "12px",
                background: "#FEF3C7",
                borderRadius: "12px",
                textAlign: "center",
                fontSize: "13px",
                color: "#92400E",
              }}
            >
              کارمزد:{" "}
              <span style={{ fontWeight: 600 }}>
                {toPersianNumber(preview.fee.toLocaleString("fa-IR"))} تومان
              </span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !preview}
          style={{
            width: "100%",
            padding: "18px",
            fontSize: "17px",
            fontWeight: 700,
            color: "#FFFFFF",
            background: loading || !preview ? "#9CA3AF" : "#1F1F1F",
            border: "none",
            borderRadius: "16px",
            cursor: loading || !preview ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          {loading ? "در حال انجام..." : activeTab === "buy" ? "خرید طلا" : "فروش طلا"}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
