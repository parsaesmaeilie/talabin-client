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
    // Clear amount when switching tabs
    setAmount("");
    setPreview(null);
  }, [activeTab]);

  useEffect(() => {
    if (amount) {
      fetchPreview();
    } else {
      setPreview(null);
    }
  }, [amount]);

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
    if (!amount) return;

    // Calculate toman amount for preview
    const { tomanAmount: previewToman } = (() => {
      if (!currentPrice) return { tomanAmount: 0 };
      const amountNum = parseFloat(amount);
      if (activeTab === "buy") {
        return { tomanAmount: amountNum };
      } else {
        const price = parseFloat(currentPrice.buy_price);
        return { tomanAmount: amountNum * price };
      }
    })();

    if (previewToman < 100000) return;

    try {
      const response = await tradingService.previewOrder({
        order_type: activeTab,
        amount_irr: previewToman,
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

    // Validate input
    if (!amount || parseFloat(amount) <= 0) {
      setError(activeTab === "buy" ? "لطفا مبلغ را وارد کنید" : "لطفا مقدار طلا را وارد کنید");
      return;
    }

    // Validate minimum toman amount (100k)
    if (tomanAmount < 100000) {
      setError("حداقل مبلغ معامله 100,000 تومان است");
      return;
    }

    setLoading(true);

    try {
      const response = await tradingService.placeOrder({
        order_type: activeTab,
        amount_irr: tomanAmount, // Always send toman amount to API
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

  const formatNumber = (value: number | string): string => {
    if (!value && value !== 0) return "";
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(numValue)) return "";
    return numValue.toLocaleString("fa-IR");
  };

  // Calculate conversions in real-time
  const getCalculatedValues = () => {
    if (!amount || !currentPrice) return { tomanAmount: 0, goldAmount: 0 };

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) return { tomanAmount: 0, goldAmount: 0 };

    if (activeTab === "buy") {
      // Buy mode: user enters toman, calculate gold
      const price = parseFloat(currentPrice.sell_price);
      return {
        tomanAmount: amountNum,
        goldAmount: amountNum / price,
      };
    } else {
      // Sell mode: user enters gold grams, calculate toman
      const price = parseFloat(currentPrice.buy_price);
      return {
        tomanAmount: amountNum * price,
        goldAmount: amountNum,
      };
    }
  };

  const { tomanAmount, goldAmount } = getCalculatedValues();

  // Validation: check if toman amount is >= 100k and amount is entered
  const isValidAmount = amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0 && tomanAmount >= 100000;

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", paddingBottom: "120px", paddingTop: "clamp(16px, 4vw, 20px)" }} className="fade-in">
      {/* Content */}
      <div style={{ padding: "clamp(12px, 3vw, 16px)", maxWidth: "600px", margin: "0 auto" }}>
        {/* Tab Switcher */}
        <div style={{ marginBottom: "20px" }}>
          <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Current Price Card */}
        <div
          className="scale-in"
          style={{
            background: "#F8F9FA",
            borderRadius: "clamp(16px, 4vw, 20px)",
            padding: "clamp(20px, 5vw, 24px)",
            marginBottom: "16px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: "translateZ(0)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "#10B981",
              color: "#FFFFFF",
              padding: "6px 12px",
              borderRadius: "12px",
              fontSize: "11px",
              fontWeight: 600,
            }}
          >
            قیمت لحظه‌ای
          </div>
          <div style={{ fontSize: "clamp(13px, 3vw, 14px)", marginBottom: "8px", color: "#6B7280", fontWeight: 500 }}>
            هر گرم طلا ۱۸ عیار
          </div>
          <div style={{ fontSize: "clamp(28px, 8vw, 36px)", fontWeight: 700, lineHeight: 1.2, color: "#1F1F1F" }}>
            {currentPrice
              ? toPersianNumber(
                  formatNumber(activeTab === "buy" ? currentPrice.sell_price : currentPrice.buy_price)
                )
              : "..."}
          </div>
          <div style={{ fontSize: "clamp(13px, 3vw, 14px)", marginTop: "4px", color: "#6B7280" }}>
            تومان
          </div>
        </div>

        {/* Recommended Prices */}
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {activeTab === "buy" ? (
              // Buy mode: show toman amounts
              [500000, 1000000, 2000000, 5000000].map((value) => (
                <button
                  key={value}
                  onClick={() => handleQuickAmount(value)}
                  style={{
                    padding: "10px 18px",
                    background: amount === value.toString() ? "#FFC857" : "#FFFFFF",
                    border: `2px solid ${amount === value.toString() ? "#FFC857" : "#E5E7EB"}`,
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: amount === value.toString() ? "#1F1F1F" : "#6B7280",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    touchAction: "manipulation",
                  }}
                  onMouseEnter={(e) => {
                    if (amount !== value.toString()) {
                      e.currentTarget.style.borderColor = "#9CA3AF";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (amount !== value.toString()) {
                      e.currentTarget.style.borderColor = "#E5E7EB";
                    }
                  }}
                >
                  {value >= 1000000
                    ? `${toPersianNumber((value / 1000000).toString())}M`
                    : `${toPersianNumber((value / 1000).toString())}K`}
                </button>
              ))
            ) : (
              // Sell mode: show gold amounts
              [0.5, 1, 2, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleQuickAmount(value)}
                  style={{
                    padding: "10px 18px",
                    background: amount === value.toString() ? "#EF8B8B" : "#FFFFFF",
                    border: `2px solid ${amount === value.toString() ? "#EF8B8B" : "#E5E7EB"}`,
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: amount === value.toString() ? "#1F1F1F" : "#6B7280",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    touchAction: "manipulation",
                  }}
                  onMouseEnter={(e) => {
                    if (amount !== value.toString()) {
                      e.currentTarget.style.borderColor = "#9CA3AF";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (amount !== value.toString()) {
                      e.currentTarget.style.borderColor = "#E5E7EB";
                    }
                  }}
                >
                  {toPersianNumber(value.toString())} گرم
                </button>
              ))
            )}
          </div>
        </div>

        {/* Input Fields */}
        <div
          style={{
            marginBottom: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* First Input - Order depends on buy/sell */}
          {activeTab === "buy" ? (
            <>
              {/* Amount in Toman Input - User enters this */}
              <div
                style={{
                  padding: "18px 20px",
                  border: "2px solid #E5E7EB",
                  borderRadius: "16px",
                  background: "#FFFFFF",
                  textAlign: "right",
                }}
              >
                <div style={{ fontSize: "14px", color: amount ? "#1F1F1F" : "#9CA3AF", fontWeight: 500 }}>
                  {amount ? toPersianNumber(formatNumber(amount)) + " تومان" : "مبلغ پرداختی به تومان"}
                </div>
              </div>

              {/* Gold Amount Display - Calculated */}
              <div
                style={{
                  padding: "18px 20px",
                  border: "2px solid #E5E7EB",
                  borderRadius: "16px",
                  background: "#FFFFFF",
                  textAlign: "right",
                }}
              >
                <div style={{ fontSize: "14px", color: goldAmount > 0 ? "#1F1F1F" : "#9CA3AF", fontWeight: 500 }}>
                  {goldAmount > 0 ? toPersianNumber(goldAmount.toFixed(4)) + " گرم" : "مقدار طلا به گرم"}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Gold Amount Input for Sell - User enters this */}
              <div
                style={{
                  padding: "18px 20px",
                  border: "2px solid #E5E7EB",
                  borderRadius: "16px",
                  background: "#FFFFFF",
                  textAlign: "right",
                }}
              >
                <div style={{ fontSize: "14px", color: amount ? "#1F1F1F" : "#9CA3AF", fontWeight: 500 }}>
                  {amount ? toPersianNumber(amount) + " گرم" : "مقدار طلا به گرم"}
                </div>
              </div>

              {/* Amount in Toman Display - Calculated */}
              <div
                style={{
                  padding: "18px 20px",
                  border: "2px solid #E5E7EB",
                  borderRadius: "16px",
                  background: "#FFFFFF",
                  textAlign: "right",
                }}
              >
                <div style={{ fontSize: "14px", color: tomanAmount > 0 ? "#1F1F1F" : "#9CA3AF", fontWeight: 500 }}>
                  {tomanAmount > 0 ? toPersianNumber(formatNumber(tomanAmount)) + " تومان" : "مبلغ دریافتی به تومان"}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Fee Display */}
        <div
          style={{
            marginBottom: "16px",
            textAlign: "center",
            fontSize: "13px",
            color: "#6B7280",
          }}
        >
          کارمزد: {preview ? toPersianNumber(formatNumber(preview.fee)) : "۱۰,۰۰۰"} تومان
        </div>

        {/* Number Pad */}
        <div style={{ marginBottom: "16px" }}>
          <NumberPad onNumberClick={handleNumberClick} onBackspace={handleBackspace} />
        </div>

        {/* Submit Button - ALWAYS VISIBLE */}
        <button
          onClick={handleSubmit}
          disabled={loading || !isValidAmount}
          style={{
            width: "100%",
            padding: "clamp(16px, 4vw, 20px)",
            fontSize: "clamp(16px, 4vw, 18px)",
            fontWeight: 700,
            color: "#FFFFFF",
            background: loading
              ? "#9CA3AF"
              : !isValidAmount
              ? "#9CA3AF"
              : activeTab === "buy"
              ? "#1F1F1F"
              : "#EF8B8B",
            border: "none",
            borderRadius: "clamp(20px, 5vw, 24px)",
            cursor: loading || !isValidAmount ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            display: "block",
            position: "relative",
            minHeight: "56px",
            touchAction: "manipulation",
          }}
          onMouseEnter={(e) => {
            if (isValidAmount && !loading) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.2)";
            }
          }}
          onMouseLeave={(e) => {
            if (isValidAmount && !loading) {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
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
            <span>در حال پردازش...</span>
          ) : activeTab === "buy" ? (
            <span>خرید طلا</span>
          ) : (
            <span>فروش طلا</span>
          )}
        </button>
      </div>
    </div>
  );
}
