"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
    <div style={{ minHeight: "100vh", background: "#FAFAFA", overflow: "auto", display: "flex", flexDirection: "column", position: "relative" }} className="fade-in">
      {/* Content */}
      <div style={{ flex: 1, padding: "20px 16px", maxWidth: "400px", margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", paddingBottom: "32px" }}>
        {/* Tab Switcher */}
        <div style={{ marginBottom: "12px" }}>
          <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "#FEE2E2",
              border: "1px solid #EF4444",
              borderRadius: "12px",
              color: "#DC2626",
              fontSize: "13px",
              fontWeight: 500,
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "#D1FAE5",
              border: "1px solid #10B981",
              borderRadius: "12px",
              color: "#047857",
              fontSize: "13px",
              fontWeight: 500,
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            {success}
          </div>
        )}

        {/* Current Price Card */}
        <div
          className="scale-in"
          style={{
            width: "100%",
            height: "70px",
            background: "#FFFFFF",
            borderRadius: "18px",
            marginBottom: "16px",
            textAlign: "center",
            border: "none",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
            transition: "all 0.3s ease",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "6px",
              right: "10px",
              padding: "4px 10px",
              background: "#C5FFD1",
              color: "#000000",
              borderRadius: "6px",
              fontSize: "10px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            قیمت لحظه‌ای
          </div>
          <div style={{ fontSize: "26px", fontWeight: 700, lineHeight: 1, color: "#242424" }}>
            {currentPrice
              ? toPersianNumber(
                  formatNumber(activeTab === "buy" ? currentPrice.sell_price : currentPrice.buy_price)
                )
              : "..."}
          </div>
        </div>

        {/* Recommended Prices */}
        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              display: "flex",
              gap: "6px",
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
                    padding: "9px 16px",
                    background: amount === value.toString() ? "#FDB022" : "#FFFFFF",
                    border: `2px solid ${amount === value.toString() ? "#FDB022" : "#E5E7EB"}`,
                    borderRadius: "12px",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: amount === value.toString() ? "#FFFFFF" : "#6B7280",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    touchAction: "manipulation",
                    boxShadow: amount === value.toString() ? "0 4px 12px rgba(253, 176, 34, 0.25)" : "0 2px 8px rgba(0, 0, 0, 0.04)",
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
                    padding: "9px 16px",
                    background: amount === value.toString() ? "#EF8B8B" : "#FFFFFF",
                    border: `2px solid ${amount === value.toString() ? "#EF8B8B" : "#E5E7EB"}`,
                    borderRadius: "12px",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: amount === value.toString() ? "#FFFFFF" : "#6B7280",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    touchAction: "manipulation",
                    boxShadow: amount === value.toString() ? "0 4px 12px rgba(239, 139, 139, 0.3)" : "0 2px 8px rgba(0, 0, 0, 0.04)",
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
            gap: "10px",
          }}
        >
          {/* First Input - Order depends on buy/sell */}
          {activeTab === "buy" ? (
            <>
              {/* Amount in Toman Input - User enters this */}
              <div
                style={{
                  width: "100%",
                  height: "52px",
                  border: "2px solid #1F1F1F",
                  borderRadius: "14px",
                  background: "#FFFFFF",
                  textAlign: "right",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 16px",
                  boxShadow: amount ? "0 0 0 3px rgba(31, 31, 31, 0.1)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ fontSize: "14px", color: amount ? "#1F1F1F" : "#9CA3AF", fontWeight: 600, width: "100%" }}>
                  {amount ? toPersianNumber(formatNumber(amount)) + " تومان" : "مبلغ پرداختی به تومان"}
                </div>
              </div>

              {/* Gold Amount Display - Calculated */}
              <div
                style={{
                  width: "100%",
                  height: "52px",
                  border: "2px solid #E5E7EB",
                  borderRadius: "14px",
                  background: "#F8F9FA",
                  textAlign: "right",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 16px",
                }}
              >
                <div style={{ fontSize: "14px", color: goldAmount > 0 ? "#000000" : "#9CA3AF", fontWeight: 500, width: "100%" }}>
                  {goldAmount > 0 ? toPersianNumber(goldAmount.toFixed(4)) + " گرم" : "مقدار طلا به گرم"}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Gold Amount Input for Sell - User enters this */}
              <div
                style={{
                  width: "100%",
                  height: "52px",
                  border: "2px solid #1F1F1F",
                  borderRadius: "14px",
                  background: "#FFFFFF",
                  textAlign: "right",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 16px",
                  boxShadow: amount ? "0 0 0 3px rgba(31, 31, 31, 0.1)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ fontSize: "14px", color: amount ? "#1F1F1F" : "#9CA3AF", fontWeight: 600, width: "100%" }}>
                  {amount ? toPersianNumber(amount) + " گرم" : "مقدار طلا به گرم"}
                </div>
              </div>

              {/* Amount in Toman Display - Calculated */}
              <div
                style={{
                  width: "100%",
                  height: "52px",
                  border: "2px solid #E5E7EB",
                  borderRadius: "14px",
                  background: "#F8F9FA",
                  textAlign: "right",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 16px",
                }}
              >
                <div style={{ fontSize: "14px", color: tomanAmount > 0 ? "#000000" : "#9CA3AF", fontWeight: 500, width: "100%" }}>
                  {tomanAmount > 0 ? toPersianNumber(formatNumber(tomanAmount)) + " تومان" : "مبلغ دریافتی به تومان"}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Number Pad with Fee */}
        <div style={{
          marginBottom: "24px",
          background: "#FFFFFF",
          borderRadius: "20px",
          padding: "20px 16px",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)"
        }}>
          {/* Fee Display */}
          <div
            style={{
              marginBottom: "24px",
              textAlign: "center",
              fontSize: "13px",
              color: "#6B7280",
              fontWeight: 500,
            }}
          >
            کارمزد: {preview ? toPersianNumber(formatNumber(preview.fee)) : "۱۰,۰۰۰"} تومان
          </div>

          <NumberPad onNumberClick={handleNumberClick} onBackspace={handleBackspace} />
        </div>

        {/* Submit Button - ALWAYS VISIBLE */}
        <button
          onClick={handleSubmit}
          disabled={loading || !isValidAmount}
          style={{
            width: "100%",
            height: "54px",
            fontSize: "16px",
            fontWeight: 700,
            color: "#FFFFFF",
            background: loading
              ? "#9CA3AF"
              : !isValidAmount
              ? "#D1D5DB"
              : activeTab === "buy"
              ? "#1F1F1F"
              : "#EF8B8B",
            border: "none",
            borderRadius: "18px",
            cursor: loading || !isValidAmount ? "not-allowed" : "pointer",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            touchAction: "manipulation",
            boxShadow: isValidAmount && !loading
              ? activeTab === "buy"
                ? "0 4px 16px rgba(31, 31, 31, 0.2)"
                : "0 4px 16px rgba(239, 139, 139, 0.3)"
              : "none",
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
