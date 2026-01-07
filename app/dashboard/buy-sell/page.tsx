"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TabSwitcher } from "@/components/buy-sell/TabSwitcher";
import { NumberPad } from "@/components/buy-sell/NumberPad";
import { tradingService, OrderPreview } from "@/lib/api/trading";
import { pricesService, GoldPrice } from "@/lib/api/prices";
import { walletService, Wallet } from "@/lib/api/wallet";

const isMobile =
  typeof window !== "undefined" && window.innerWidth < 480;

export default function BuySell() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<OrderPreview | null>(null);
  const [currentPrice, setCurrentPrice] = useState<GoldPrice | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const isBuy = activeTab === "buy";

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setAmount("");
    setPreview(null);
  }, [activeTab]);

  useEffect(() => {
    if (amount) fetchPreview();
    else setPreview(null);
  }, [amount]);

  const fetchData = async () => {
    try {
      const [priceRes, walletRes] = await Promise.all([
        pricesService.getCurrentPrice(),
        walletService.getBalance(),
      ]);
      if (priceRes.success) setCurrentPrice(priceRes.data!);
      if (walletRes.success) setWallet(walletRes.data!);
    } catch {}
  };

  const getCalculatedValues = () => {
    if (!amount || !currentPrice) return { tomanAmount: 0, goldAmount: 0 };
    const val = parseFloat(amount);
    if (isNaN(val)) return { tomanAmount: 0, goldAmount: 0 };

    if (isBuy) {
      return {
        tomanAmount: val,
        goldAmount: val / parseFloat(currentPrice.sell_price),
      };
    }

    return {
      goldAmount: val,
      tomanAmount: val * parseFloat(currentPrice.buy_price),
    };
  };

  const { tomanAmount, goldAmount } = getCalculatedValues();
  const isValid = tomanAmount >= 100000 && parseFloat(amount) > 0;

  const fetchPreview = async () => {
    if (tomanAmount < 100000) return;
    const res = await tradingService.previewOrder({
      order_type: activeTab,
      amount_irr: tomanAmount,
    });
    if (res.success) setPreview(res.data!);
  };

  const handleSubmit = async () => {
    if (!isValid) return;

    setLoading(true);
    const res = await tradingService.placeOrder({
      order_type: activeTab,
      amount_irr: tomanAmount,
    });

    if (res.success) {
      setAmount("");
      await fetchData();
      setTimeout(() => router.push("/dashboard/wallet"), 1500);
    }
    setLoading(false);
  };

  const toFa = (n: number | string) =>
    n.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

  const fmt = (n: number) => n.toLocaleString("fa-IR");

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#FAFAFA",
        paddingInline: isMobile ? 4 : 0,
        paddingTop: 12,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{
        width: "100%",
        maxWidth: isMobile ? "100%" : 428,
        margin: isMobile ? "0" : "0 auto",
        paddingInline: isMobile ? 0 : 12,
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}>
        {/* Price Card */}
        <div
          style={{
            background: "#F3F3F3",
            borderRadius: 12,
            padding: "12px 14px",
            margin: "12px 0",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {/* Top row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 12, color: "#1F1F1F", direction: "rtl" }}>
              هر گرم طلا ۱۸ عیار
            </div>
            <div
              style={{
                fontSize: 10,
                background: "#C5FFD1",
                color: "#218E00",
                padding: "2px 6px",
                borderRadius: 6,
              }}
            >
              قیمت لحظه‌ای
            </div>
          </div>

          {/* Bottom row */}
          <div style={{ fontSize: 22, fontWeight: 700, color: "#1F1F1F" }}>
            {currentPrice
              ? toFa(
                  fmt(
                    parseFloat(isBuy ? currentPrice.sell_price : currentPrice.buy_price)
                  )
                )
              : "..."}{" "}
            تومان
          </div>
        </div>

        <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Inputs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
          <InputCard
            label={
              amount
                ? `${toFa(isBuy ? fmt(+amount) : amount)} ${
                    isBuy ? "تومان" : "گرم"
                  }`
                : isBuy
                ? "مبلغ (تومان)"
                : "مقدار طلا (گرم)"
            }
            active={true}
          />
          <InputCard
            label={
              tomanAmount > 0
                ? `${toFa(fmt(tomanAmount))} تومان`
                : "مبلغ نهایی"
            }
            active={false}
          />
        </div>

        {/* Quick amounts */}
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            marginTop: "24px",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          {(isBuy ? [500000, 1000000, 2000000] : [0.5, 1, 2]).map((v) => (
            <button
              key={v}
              onClick={() => setAmount(v.toString())}
              style={{
                padding: "8px 16px",
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 600,
                border: amount === v.toString() ? "2px solid #FFC857" : "1px solid #E5E7EB",
                background: amount === v.toString() ? "#FFF9E6" : "#FFF",
                color: amount === v.toString() ? "#1F1F1F" : "#6B7280",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {isBuy ? toFa(fmt(v)) : toFa(v)} {isBuy ? "تومان" : "گرم"}
            </button>
          ))}
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "#6B7280",
            margin: "12px 0 16px",
            fontWeight: 500,
          }}
        >
          کارمزد: {preview ? toFa(fmt(preview.fee)) : "۱۰,۰۰۰"} تومان
        </div>

        <NumberPad
          onNumberClick={(n) => setAmount((p) => p + n)}
          onBackspace={() => setAmount((p) => p.slice(0, -1))}
        />

        <button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          style={{
            width: "100%",
            marginTop: 16,
            height: 52,
            borderRadius: 14,
            fontSize: 16,
            fontWeight: 700,
            color: "#FFFFFF",
            background: loading
              ? "#9CA3AF"
              : !isValid
              ? "#D1D5DB"
              : isBuy
              ? "#1C1C1C"
              : "#EF4444",
            border: "none",
            cursor: !isValid || loading ? "not-allowed" : "pointer",
            boxShadow: isValid && !loading ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (isValid && !loading) {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.2)";
            }
          }}
          onMouseLeave={(e) => {
            if (isValid && !loading) {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
            }
          }}
        >
          {loading ? "در حال پردازش..." : isBuy ? "خرید طلا" : "فروش طلا"}
        </button>
      </div>
    </div>
  );
}

function InputCard({ label, active }: { label: string; active: boolean }) {
  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: 12,
        background: "#FFF",
        border: active ? "2px solid #1F1F1F" : "1px solid #E5E7EB",
        fontSize: 14,
        fontWeight: active ? 600 : 500,
        textAlign: "right",
        color: label.includes("مبلغ") || label.includes("مقدار") ? "#9CA3AF" : "#1F1F1F",
        minHeight: "50px",
        display: "flex",
        alignItems: "center",
        transition: "all 0.2s ease",
      }}
    >
      {label}
    </div>
  );
}
