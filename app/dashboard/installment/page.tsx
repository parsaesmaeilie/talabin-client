"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InstallmentPage() {
  const router = useRouter();
  const [amount, setAmount] = useState(5000000);
  const [duration, setDuration] = useState<2 | 3 | 4>(2);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const goldPricePerGram = 13459000;
  const annualInterestRate = 0.12;
  const minAmount = 5000000;
  const maxAmount = 30000000;

  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const formatNumber = (num: number) => num.toLocaleString("en-US");
  const calculateGoldAmount = () => (amount / goldPricePerGram).toFixed(1);
  const calculateInstallmentAmount = () => Math.floor(amount / duration);
  const calculateTotalWithInterest = () => {
    const monthlyRate = annualInterestRate / 12;
    return Math.floor(amount + amount * monthlyRate * duration);
  };

  if (showConfirmation) {
    return (
      <div style={{ minHeight: "100vh", background: "#FFFFFF", padding: "20px 16px 100px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px", paddingBottom: "16px", borderBottom: "1px solid #E5E5E5" }}>
            <div onClick={() => setShowConfirmation(false)} style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#E5E5E5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "20px", color: "#6B7280" }}>?</div>
            <h1 style={{ fontSize: "18px", fontWeight: 700, margin: 0, color: "#1F2937" }}>خرید قسطی</h1>
            <div onClick={() => setShowConfirmation(false)} style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", cursor: "pointer", color: "#1F2937" }}>←</div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
            <div style={{ fontSize: "100px" }}>📅</div>
          </div>
          <div style={{ fontSize: "16px", fontWeight: 600, textAlign: "center", marginBottom: "40px", color: "#1F2937" }}>
            طلای دریافتی: {toPersianNumber(calculateGoldAmount())}گرم
          </div>
          <div style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid #E5E5E5" }}>
              <span style={{ fontSize: "14px", color: "#6B7280" }}>اعتبار دریافتی:</span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937" }}>{toPersianNumber(formatNumber(amount))} تومان</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid #E5E5E5" }}>
              <span style={{ fontSize: "14px", color: "#6B7280" }}>مبلغ هر قسط:</span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937" }}>{toPersianNumber(formatNumber(calculateInstallmentAmount()))} تومان</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid #E5E5E5" }}>
              <span style={{ fontSize: "14px", color: "#6B7280" }}>مجموع قسط‌ها (۱۲% سالیانه):</span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937" }}>{toPersianNumber(formatNumber(calculateTotalWithInterest()))} تومان</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #E5E5E5" }}>
              <span style={{ fontSize: "14px", color: "#6B7280" }}><span style={{ marginLeft: "8px" }}>📅</span>زمان بندی اقساط شما:</span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937" }}>{toPersianNumber(duration)}ماهه</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "16px", background: "#FFF9E6", borderRadius: "12px", marginBottom: "80px" }}>
            <div style={{ fontSize: "32px", flexShrink: 0 }}>⚠️</div>
            <p style={{ fontSize: "13px", color: "#92400E", lineHeight: "1.6", margin: 0 }}>
              طلای خریداری شده تا پایان پرداخت اقساط، نزد طلابین وثیقه می‌ماند و قابل فروش نیست.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div onClick={() => setAgreedToTerms(!agreedToTerms)} style={{ width: "24px", height: "24px", borderRadius: "4px", border: `2px solid ${agreedToTerms ? "#3B82F6" : "#D1D5DB"}`, background: agreedToTerms ? "#3B82F6" : "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#FFFFFF", fontSize: "16px", fontWeight: 700 }}>
              {agreedToTerms && "✓"}
            </div>
            <span style={{ fontSize: "14px", color: "#1F2937" }}>قوانین و مقررات را میپذیرم.</span>
          </div>
          <button onClick={() => router.push("/dashboard/wallet/history")} disabled={!agreedToTerms} style={{ width: "100%", padding: "16px", background: agreedToTerms ? "#1F2937" : "#D1D5DB", color: "#FFFFFF", border: "none", borderRadius: "16px", fontSize: "16px", fontWeight: 700, cursor: agreedToTerms ? "pointer" : "not-allowed" }}>
            تایید و ادامه
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F5", padding: "20px 16px 100px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #E5E5E5" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#E5E5E5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "20px", color: "#6B7280" }}>?</div>
          <h1 style={{ fontSize: "18px", fontWeight: 700, margin: 0, color: "#1F2937" }}>خرید قسطی</h1>
          <Link href="/dashboard/services" style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", cursor: "pointer", textDecoration: "none", color: "#1F2937" }}>←</Link>
        </div>
        <div style={{ padding: "20px", background: "#FFFFFF", borderRadius: "16px", marginBottom: "24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "inline-block", padding: "4px 12px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "999px", fontSize: "12px", fontWeight: 600, color: "#059669", marginBottom: "8px" }}>قیمت لحظه‌ای</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#1F2937" }}>{toPersianNumber(formatNumber(goldPricePerGram))} تومان</div>
          </div>
          <div style={{ textAlign: "left", fontSize: "14px", color: "#6B7280" }}>هر گرم طلا ۱۸ عیار</div>
        </div>
        <div style={{ fontSize: "14px", color: "#6B7280", textAlign: "center", marginBottom: "16px" }}>مبلغ خرید</div>
        <div style={{ fontSize: "36px", fontWeight: 700, textAlign: "center", marginBottom: "8px", color: "#1F2937" }}>{toPersianNumber(formatNumber(amount))} تومان</div>
        <div style={{ fontSize: "14px", color: "#6B7280", textAlign: "center", marginBottom: "40px" }}>طلای دریافتی: {toPersianNumber(calculateGoldAmount())}گرم</div>
        <div style={{ marginBottom: "40px", padding: "0 20px", position: "relative" }}>
          {/* Slider track with dots */}
          <div style={{ position: "relative", paddingTop: "30px", paddingBottom: "30px" }}>
            {/* Track line */}
            <div style={{ position: "absolute", top: "50%", left: "12px", right: "12px", height: "3px", background: "#1F2937", transform: "translateY(-50%)", borderRadius: "2px" }} />

            {/* Dots container */}
            <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const dotValue = minAmount + (i * (maxAmount - minAmount) / 5);
                const currentIndex = Math.round(((amount - minAmount) / (maxAmount - minAmount)) * 5);
                const isCurrentPosition = i === currentIndex;
                const isLeftMost = i === 0;

                return (
                  <div
                    key={i}
                    style={{
                      width: isLeftMost ? "26px" : "14px",
                      height: isLeftMost ? "26px" : "14px",
                      borderRadius: "50%",
                      background: isLeftMost ? "#FDB022" : "#1F2937",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: isLeftMost ? "0 3px 10px rgba(253, 176, 34, 0.5)" : "0 1px 3px rgba(0, 0, 0, 0.2)",
                      zIndex: isLeftMost ? 10 : 1,
                      position: "relative",
                    }}
                    onClick={() => setAmount(dotValue)}
                  />
                );
              })}
            </div>

            {/* Invisible input for smooth dragging */}
            <input
              type="range"
              min={minAmount}
              max={maxAmount}
              step={1000000}
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              style={{
                position: "absolute",
                top: "50%",
                left: "0",
                right: "0",
                width: "100%",
                transform: "translateY(-50%)",
                opacity: 0,
                cursor: "pointer",
                height: "50px",
                zIndex: 20,
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "13px", color: "#6B7280", fontWeight: 500 }}>
            <span>{toPersianNumber("5")} میلیون تومان</span>
            <span>{toPersianNumber("30")} میلیون تومان</span>
          </div>
        </div>
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid #E5E5E5" }}>
            <span style={{ fontSize: "14px", color: "#6B7280" }}>مبلغ هر قسط:</span>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937" }}>{toPersianNumber(formatNumber(calculateInstallmentAmount()))} تومان</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid #E5E5E5" }}>
            <span style={{ fontSize: "14px", color: "#6B7280" }}>مجموع قسط‌ها (۱۲% سالیانه):</span>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937" }}>{toPersianNumber(formatNumber(calculateTotalWithInterest()))} تومان</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "120px" }}>
          {[2, 3, 4].map((months) => (
            <button key={months} onClick={() => setDuration(months as 2 | 3 | 4)} style={{ padding: "16px", background: "#FFFFFF", border: `2px solid ${duration === months ? "#1F2937" : "#E5E7EB"}`, borderRadius: "12px", fontSize: "14px", fontWeight: 600, cursor: "pointer", color: "#1F2937" }}>
              {toPersianNumber(months)} ماهه
            </button>
          ))}
        </div>
        <div style={{ position: "fixed", bottom: "20px", left: "16px", right: "16px", maxWidth: "568px", margin: "0 auto" }}>
          <button onClick={() => setShowConfirmation(true)} style={{ width: "100%", padding: "16px", background: "#1F2937", color: "#FFFFFF", border: "none", borderRadius: "16px", fontSize: "16px", fontWeight: 700, cursor: "pointer" }}>خرید قسطی</button>
        </div>
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #FDB022;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(253, 176, 34, 0.4);
          }
          input[type="range"]::-moz-range-thumb {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #FDB022;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 8px rgba(253, 176, 34, 0.4);
          }
        `}</style>
      </div>
    </div>
  );
}
