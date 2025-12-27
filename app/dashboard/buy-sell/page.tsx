"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/Badge";
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
    <div
      className="min-h-screen"
      style={{ padding: "20px 16px", background: "#F5F5F5" }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Success/Error Messages */}
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

        {/* Price Display - Matching mockup */}
        <div
          className="card"
          style={{
            marginBottom: "16px",
            padding: "20px",
            textAlign: "center",
            background: "#FFFFFF",
          }}
        >
          <div style={{ marginBottom: "8px" }}>
            <Badge variant="green">
              قیمت لحظه‌ای
            </Badge>
          </div>
          <div
            style={{
              fontSize: "13px",
              color: "var(--color-muted)",
              marginBottom: "8px",
            }}
          >
            هر گرم طلا ۱۸ عیار
          </div>
          <div style={{ fontSize: "32px", fontWeight: 700 }}>
            {currentPrice
              ? toPersianNumber(
                  parseFloat(
                    activeTab === "buy"
                      ? currentPrice.sell_price
                      : currentPrice.buy_price
                  ).toLocaleString("fa-IR")
                )
              : "..."}
            <span
              style={{
                fontSize: "16px",
                fontWeight: 400,
                color: "var(--color-muted)",
                marginRight: "8px",
              }}
            >
              تومان
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ marginBottom: "16px" }}>
          <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Input Fields - Matching mockup exactly */}
        <div
          className="card"
          style={{ marginBottom: "16px", padding: "20px", background: "#FFFFFF" }}
        >
          {/* Amount Input */}
          <div
            style={{
              padding: "16px",
              border: "2px solid rgba(0,0,0,0.1)",
              borderRadius: "16px",
              marginBottom: "12px",
              background: "#FFFFFF",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "var(--color-muted)",
                marginBottom: "8px",
                textAlign: "right",
              }}
            >
              مبلغ پرداختی به تومان
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 600,
                textAlign: "center",
                minHeight: "36px",
              }}
            >
              {amount ? toPersianNumber(amount) : ""}
            </div>
          </div>

          {/* Gold Amount Display */}
          <div
            style={{
              padding: "16px",
              border: "2px solid rgba(0,0,0,0.1)",
              borderRadius: "16px",
              marginBottom: "20px",
              background: "#FFFFFF",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "var(--color-muted)",
                marginBottom: "8px",
                textAlign: "right",
              }}
            >
              مقدار طلا به گرم
            </div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 600,
                textAlign: "center",
                minHeight: "30px",
              }}
            >
              {preview ? toPersianNumber(preview.gold_amount.toFixed(4)) : ""}
            </div>
          </div>

          {/* Number Pad */}
          <NumberPad
            onNumberClick={handleNumberClick}
            onBackspace={handleBackspace}
          />

          {/* Fee Display */}
          {preview && (
            <div
              style={{
                marginTop: "20px",
                padding: "12px",
                background: "rgba(0,0,0,0.02)",
                borderRadius: "12px",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              کارمزد:{" "}
              <span style={{ fontWeight: 600 }}>
                {toPersianNumber(preview.fee.toLocaleString("fa-IR"))} تومان
              </span>
            </div>
          )}
        </div>

        {/* CTA Button - Large and prominent */}
        <button
          onClick={handleSubmit}
          disabled={loading || !preview}
          style={{
            width: "100%",
            padding: "18px",
            fontSize: "17px",
            fontWeight: 700,
            color: "#FFFFFF",
            background: loading || !preview ? "#999" : "#1C1C1C",
            border: "none",
            borderRadius: "16px",
            cursor: loading || !preview ? "not-allowed" : "pointer",
            transition: "all 0.2s",
          }}
        >
          {loading
            ? "در حال انجام..."
            : activeTab === "buy"
            ? "خرید طلا"
            : "فروش طلا"}
        </button>
      </div>
    </div>
  );
}
