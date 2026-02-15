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
      <div style={{ width: "100%",
    maxWidth: isMobile ? "100%" : 520,
    margin: isMobile ? "0" : "0 auto",
    paddingInline: isMobile ? 0 : 12,
    display: "flex",
    flexDirection: "column",
    flex: 1,}}>
       

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
  {/* ردیف بالا */}
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
        background: "#C5FFD1", // سبز آبی
        color: "#218E00",
        padding: "2px 6px",
        borderRadius: 6,
      }}
    >
      قیمت لحظه‌ای
    </div>
  </div>

  {/* ردیف پایین */}
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
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
          />
          <InputCard
            label={
              tomanAmount > 0
                ? `${toFa(fmt(tomanAmount))} تومان`
                : "مبلغ نهایی"
            }
          />
        </div>
{/* Quick amounts */}
        <div
          style={{
            display: "flex",
            gap: 6,
            justifyContent: "center",
            marginTop: "50px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          {(isBuy ? [500000, 1000000, 2000000] : [0.5, 1, 2]).map((v) => (
            <button
              key={v}
              onClick={() => setAmount(v.toString())}
              style={{
                padding: "6px 12px",
                borderRadius: 10,
                fontSize: 12,
                border: "1px solid #E5E7EB",
                background: "#FFF",
              }}
            >
              {isBuy ? toFa(fmt(v)) : toFa(v)} {isBuy ? "" : "گرم"}
            </button>
          ))}
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#6B7280",
            margin: "8px 0",
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
            marginTop: 12,
            height: 48,
            borderRadius: 14,
            fontSize: 15,
            fontWeight: 700,
            color: isBuy ? "#ffffff" : "#242424",
            background: isBuy ? "#1C1C1C" : "#F26464",
            opacity: !isValid ? 0.5 : 1,
            border: "none",
          }}
        >
          {loading ? "در حال پردازش..." : isBuy ? "خرید طلا" : "فروش طلا"}
        </button>
      </div>
    </div>
  );
}

function InputCard({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: "12px 14px",
        borderRadius: 12,
        background: "#FFF",
        border: "1px solid #0a0a0aff",
        fontSize: 13,
        textAlign: "right",
      }}
    >
      {label}
    </div>
  );
}
