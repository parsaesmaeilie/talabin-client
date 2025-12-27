"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TabSwitcher } from "@/components/buy-sell/TabSwitcher";
import { NumberPad } from "@/components/buy-sell/NumberPad";
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
            ? "✅ خرید با موفقیت انجام شد!"
            : "✅ فروش با موفقیت انجام شد!"
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

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  const toPersianNumber = (num: string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  // Calculate gold amount in real-time (even for amounts < 100,000)
  const calculateGoldAmount = () => {
    if (!amount || !currentPrice) return 0;
    const amountNum = parseFloat(amount);
    const price = activeTab === "buy"
      ? parseFloat(currentPrice.sell_price)
      : parseFloat(currentPrice.buy_price);
    return amountNum / price;
  };

  const goldAmount = calculateGoldAmount();
  const isValidAmount = amount && parseFloat(amount) >= 100000;

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", paddingBottom: "120px" }} className="fade-in">
      {/* Header */}
      <div
        style={{
          background: "#FFFFFF",
          padding: "clamp(12px, 3vw, 16px)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          position: "sticky",
          top: 0,
          zIndex: 10,
          transition: "all 0.3s ease",
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
      <div style={{ padding: "clamp(12px, 3vw, 16px)", maxWidth: "600px", margin: "0 auto" }}>
        {/* Success/Error Messages */}
        {success && (
          <div
            className="slide-in-down"
            style={{
              padding: "12px 16px",
              marginBottom: "16px",
              borderRadius: "12px",
              background: "#D1FAE5",
              color: "#059669",
              fontSize: "clamp(13px, 3vw, 14px)",
              textAlign: "center",
              fontWeight: 600,
              transition: "all 0.3s ease",
            }}
          >
            {success}
          </div>
        )}

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
              transition: "all 0.3s ease",
            }}
          >
            {error}
          </div>
        )}

        {/* Tab Switcher */}
        <div style={{ marginBottom: "16px" }}>
          <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Current Price Card */}
        <div
          className="scale-in"
          style={{
            background: activeTab === "buy" ? "linear-gradient(135deg, #10B981 0%, #059669 100%)" : "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
            borderRadius: "clamp(16px, 4vw, 20px)",
            padding: "clamp(20px, 5vw, 24px)",
            marginBottom: "16px",
            textAlign: "center",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
            color: "#FFFFFF",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: "translateZ(0)",
          }}
        >
          <div style={{ fontSize: "clamp(12px, 3vw, 13px)", marginBottom: "8px", opacity: 0.9 }}>
            قیمت {activeTab === "buy" ? "خرید" : "فروش"} هر گرم طلای ۱۸ عیار
          </div>
          <div style={{ fontSize: "clamp(28px, 8vw, 36px)", fontWeight: 700, lineHeight: 1.2 }}>
            {currentPrice
              ? toPersianNumber(
                  parseFloat(
                    activeTab === "buy" ? currentPrice.sell_price : currentPrice.buy_price
                  ).toLocaleString("fa-IR")
                )
              : "..."}
          </div>
          <div style={{ fontSize: "clamp(13px, 3vw, 14px)", marginTop: "4px", opacity: 0.9 }}>
            تومان
          </div>
        </div>

        {/* Wallet Balance */}
        {wallet && (
          <div
            className="slide-in-up"
            style={{
              background: "#FFFFFF",
              borderRadius: "clamp(14px, 3.5vw, 16px)",
              padding: "clamp(14px, 3.5vw, 16px)",
              marginBottom: "16px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.06)";
            }}
          >
            <div>
              <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)", color: "#6B7280", marginBottom: "4px" }}>
                موجودی {activeTab === "buy" ? "تومان" : "طلا"}
              </div>
              <div style={{ fontSize: "clamp(15px, 3.5vw, 16px)", fontWeight: 600, color: "#1F1F1F" }}>
                {activeTab === "buy"
                  ? `${toPersianNumber(parseFloat(wallet.balance_irr).toLocaleString("fa-IR"))} تومان`
                  : `${toPersianNumber(parseFloat(wallet.gold_balance).toFixed(4))} گرم`}
              </div>
            </div>
            <div
              style={{
                width: "clamp(44px, 10vw, 48px)",
                height: "clamp(44px, 10vw, 48px)",
                borderRadius: "12px",
                background: activeTab === "buy" ? "#D1FAE5" : "#FEE2E2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "clamp(20px, 5vw, 24px)",
                transition: "transform 0.3s ease",
              }}
            >
              {activeTab === "buy" ? "💰" : "⭐"}
            </div>
          </div>
        )}

        {/* Quick Amount Buttons */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "clamp(12px, 3vw, 13px)", color: "#6B7280", marginBottom: "8px", fontWeight: 500 }}>
            مبالغ پیشنهادی:
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))",
            gap: "clamp(6px, 2vw, 8px)"
          }}>
            {[100000, 500000, 1000000, 5000000].map((value) => (
              <button
                key={value}
                onClick={() => handleQuickAmount(value)}
                style={{
                  padding: "clamp(10px, 3vw, 12px) clamp(6px, 2vw, 8px)",
                  background: amount === value.toString() ? "#FFC857" : "#FFFFFF",
                  border: amount === value.toString() ? "2px solid #E6A700" : "1px solid #E5E7EB",
                  borderRadius: "clamp(10px, 2.5vw, 12px)",
                  fontSize: "clamp(10px, 2.5vw, 11px)",
                  fontWeight: 600,
                  color: amount === value.toString() ? "#1F1F1F" : "#6B7280",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: amount === value.toString() ? "scale(1.05)" : "scale(1)",
                  boxShadow: amount === value.toString() ? "0 4px 8px rgba(252, 176, 69, 0.3)" : "none",
                  minHeight: "44px",
                  touchAction: "manipulation",
                }}
                onMouseEnter={(e) => {
                  if (amount !== value.toString()) {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.borderColor = "#D1D5DB";
                  }
                }}
                onMouseLeave={(e) => {
                  if (amount !== value.toString()) {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.borderColor = "#E5E7EB";
                  }
                }}
              >
                {value >= 1000000
                  ? `${toPersianNumber((value / 1000000).toString())}M`
                  : `${toPersianNumber((value / 1000).toString())}K`}
              </button>
            ))}
          </div>
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
              padding: "20px",
              border: "2px solid #F3F4F6",
              borderRadius: "16px",
              marginBottom: "12px",
              background: "#FAFAFA",
            }}
          >
            <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "8px", textAlign: "center" }}>
              مبلغ پرداختی (تومان)
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
                textAlign: "center",
                minHeight: "40px",
                color: amount ? "#1F1F1F" : "#D1D5DB",
              }}
            >
              {amount ? toPersianNumber(parseFloat(amount).toLocaleString("fa-IR")) : "۰"}
            </div>
          </div>

          {/* Gold Amount Display - NOW SHOWS ALWAYS */}
          <div
            style={{
              padding: "20px",
              border: `3px solid ${activeTab === "buy" ? "#10B981" : "#EF4444"}`,
              borderRadius: "16px",
              marginBottom: "20px",
              background: activeTab === "buy" ? "#ECFDF5" : "#FEF2F2",
            }}
          >
            <div style={{
              fontSize: "12px",
              color: activeTab === "buy" ? "#059669" : "#DC2626",
              marginBottom: "8px",
              textAlign: "center",
              fontWeight: 600,
            }}>
              🪙 مقدار طلا (گرم)
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 700,
                textAlign: "center",
                minHeight: "36px",
                color: activeTab === "buy" ? "#059669" : "#DC2626",
              }}
            >
              {goldAmount > 0 ? toPersianNumber(goldAmount.toFixed(4)) : "۰.۰۰۰۰"}
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
                fontWeight: 600,
              }}
            >
              💳 کارمزد:{" "}
              <span style={{ fontWeight: 700 }}>
                {toPersianNumber(preview.fee.toLocaleString("fa-IR"))} تومان
              </span>
            </div>
          )}
        </div>

        {/* Submit Button - ALWAYS VISIBLE */}
        <button
          onClick={handleSubmit}
          disabled={loading || !isValidAmount}
          className="pulse"
          style={{
            width: "100%",
            padding: "clamp(16px, 4vw, 20px)",
            fontSize: "clamp(16px, 4vw, 18px)",
            fontWeight: 700,
            color: "#FFFFFF",
            background: loading
              ? "#9CA3AF"
              : !isValidAmount
              ? "linear-gradient(135deg, #6B7280 0%, #4B5563 100%)"
              : activeTab === "buy"
              ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
              : "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
            border: "none",
            borderRadius: "clamp(14px, 3.5vw, 16px)",
            cursor: loading || !isValidAmount ? "not-allowed" : "pointer",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: isValidAmount && !loading
              ? "0 8px 20px rgba(0, 0, 0, 0.2)"
              : "0 4px 8px rgba(0, 0, 0, 0.1)",
            display: "block",
            position: "relative",
            minHeight: "56px",
            touchAction: "manipulation",
            transform: "translateZ(0)",
          }}
          onMouseEnter={(e) => {
            if (isValidAmount && !loading) {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.25)";
            }
          }}
          onMouseLeave={(e) => {
            if (isValidAmount && !loading) {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
            }
          }}
          onTouchStart={(e) => {
            if (isValidAmount && !loading) {
              e.currentTarget.style.transform = "scale(0.98)";
            }
          }}
          onTouchEnd={(e) => {
            if (isValidAmount && !loading) {
              e.currentTarget.style.transform = "scale(1)";
            }
          }}
        >
          {loading ? (
            <span>⏳ در حال پردازش...</span>
          ) : !amount ? (
            <span>مبلغ مورد نظر را وارد کنید</span>
          ) : !isValidAmount ? (
            <span>⚠️ حداقل مبلغ ۱۰۰,۰۰۰ تومان</span>
          ) : activeTab === "buy" ? (
            <span>✅ تایید و خرید طلا</span>
          ) : (
            <span>✅ تایید و فروش طلا</span>
          )}
        </button>

        {/* Helper Text */}
        {!isValidAmount && amount && parseFloat(amount) < 100000 && (
          <div
            style={{
              marginTop: "12px",
              padding: "12px",
              background: "#FEF3C7",
              borderRadius: "12px",
              textAlign: "center",
              fontSize: "13px",
              color: "#92400E",
              fontWeight: 500,
            }}
          >
            ⚠️ برای ثبت سفارش، حداقل ۱۰۰,۰۰۰ تومان وارد کنید
          </div>
        )}
      </div>
    </div>
  );
}
