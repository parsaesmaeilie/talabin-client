"use client";

import { useState } from "react";
import Link from "next/link";

export default function InstallmentPurchase() {
  const [goldAmount, setGoldAmount] = useState<number>(5);
  const [installmentMonths, setInstallmentMonths] = useState<number>(4);
  const [step, setStep] = useState(1);

  // Mock data - replace with API
  const goldPricePerGram = 13459000;
  const annualInterestRate = 0.23; // 23%

  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const calculateInstallment = () => {
    const totalPrice = goldAmount * goldPricePerGram;
    const monthlyInterest = annualInterestRate / 12;
    const totalInterest = totalPrice * monthlyInterest * installmentMonths;
    const totalAmount = totalPrice + totalInterest;
    const monthlyPayment = totalAmount / installmentMonths;

    return {
      totalPrice,
      totalInterest,
      totalAmount,
      monthlyPayment,
    };
  };

  const calc = calculateInstallment();

  const handleContinue = () => {
    setStep(2);
  };

  const handleConfirm = () => {
    // Add API call here
    alert("خرید قسطی شما ثبت شد!");
    window.location.href = "/dashboard/wallet";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA" }}>
      {/* Header */}
      <div
        style={{
          background: "#FFFFFF",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <Link href="/dashboard/services">
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
          خرید قسطی طلا
        </h1>
      </div>

      {/* Content */}
      <div style={{ padding: "0 16px 16px" }}>

        {step === 1 && (
          <>
            {/* Price Display */}
            <div
              className="card"
              style={{
                marginBottom: "20px",
                padding: "20px",
                textAlign: "center",
                background: "#FFFFFF",
              }}
            >
              <div style={{ marginBottom: "8px" }}>
                <div
                  className="badge-pill green"
                  style={{
                    display: "inline-flex",
                    fontSize: "11px",
                    padding: "4px 10px",
                  }}
                >
                  قیمت لحظه‌ای
                </div>
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--color-muted)",
                  marginBottom: "8px",
                }}
              >
                هر ۱ گرم طلا ۱۸ عیار
              </div>
              <div style={{ fontSize: "32px", fontWeight: 700 }}>
                {toPersianNumber(goldPricePerGram.toLocaleString("fa-IR"))}
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

            {/* Gold Amount Selector */}
            <div
              className="card"
              style={{
                marginBottom: "20px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                مبلغ خرید
              </div>

              {/* Amount Display */}
              <div
                style={{
                  padding: "20px",
                  background: "rgba(255, 200, 87, 0.1)",
                  borderRadius: "16px",
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "36px",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  {toPersianNumber(goldAmount)}
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 400,
                      marginRight: "8px",
                    }}
                  >
                    گرم
                  </span>
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-muted)" }}>
                  {toPersianNumber(calc.totalPrice.toLocaleString("fa-IR"))} تومان
                </div>
              </div>

              {/* Amount Slider */}
              <input
                type="range"
                min="0.5"
                max="30"
                step="0.5"
                value={goldAmount}
                onChange={(e) => setGoldAmount(parseFloat(e.target.value))}
                style={{
                  width: "100%",
                  marginBottom: "12px",
                }}
              />

              {/* Quick Amount Buttons */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "8px",
                }}
              >
                {[5, 15, 30].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setGoldAmount(amount)}
                    style={{
                      padding: "12px",
                      background:
                        goldAmount === amount
                          ? "var(--color-primary)"
                          : "rgba(0,0,0,0.04)",
                      border: "none",
                      borderRadius: "12px",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {toPersianNumber(amount)} گرم
                  </button>
                ))}
              </div>
            </div>

            {/* Installment Period Selector */}
            <div
              className="card"
              style={{
                marginBottom: "20px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                زمان‌بندی اقساط شما
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                {[2, 3, 4].map((months) => (
                  <button
                    key={months}
                    onClick={() => setInstallmentMonths(months)}
                    style={{
                      padding: "16px",
                      background:
                        installmentMonths === months
                          ? "var(--color-primary)"
                          : "rgba(0,0,0,0.04)",
                      border: "none",
                      borderRadius: "12px",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {toPersianNumber(months)} ماهه
                  </button>
                ))}
              </div>

              {/* Payment Details */}
              <div
                style={{
                  padding: "16px",
                  background: "rgba(0,0,0,0.02)",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                    fontSize: "13px",
                  }}
                >
                  <span style={{ color: "var(--color-muted)" }}>مبلغ هر قسط</span>
                  <span style={{ fontWeight: 600 }}>
                    {toPersianNumber(Math.round(calc.monthlyPayment).toLocaleString("fa-IR"))} تومان
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "13px",
                  }}
                >
                  <span style={{ color: "var(--color-muted)" }}>
                    مجموع اقساط (سالانه ۲۳٪)
                  </span>
                  <span style={{ fontWeight: 600 }}>
                    {toPersianNumber(Math.round(calc.totalAmount).toLocaleString("fa-IR"))} تومان
                  </span>
                </div>
              </div>
            </div>

            {/* Gold Received Info */}
            <div
              style={{
                padding: "16px",
                background: "rgba(16, 185, 129, 0.1)",
                borderRadius: "12px",
                fontSize: "13px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              ⓘ طلای دریافتی: {toPersianNumber(goldAmount)} گرم
              <br />
              قابل فروش نیست و پس از فعال‌سازی حداکثر ۲۴ ساعت قابل بازگشت است.
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="btn btn-primary btn-block"
              style={{
                padding: "18px",
                fontSize: "16px",
                fontWeight: 700,
                borderRadius: "16px",
              }}
            >
              خرید قسطی
            </button>
          </>
        )}

        {step === 2 && (
          <>
            {/* Confirmation Header */}
            <div
              className="card"
              style={{
                marginBottom: "20px",
                padding: "24px",
                textAlign: "center",
                background: "linear-gradient(135deg, #FFF4E1 0%, #FFFFFF 100%)",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>📅</div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                تایید و ادامه خرید قسطی
              </div>
            </div>

            {/* Summary */}
            <div
              className="card"
              style={{
                marginBottom: "20px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <span style={{ color: "var(--color-muted)" }}>مبلغ هر قسط</span>
                <span style={{ fontWeight: 600 }}>
                  {toPersianNumber(Math.round(calc.monthlyPayment).toLocaleString("fa-IR"))} تومان
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <span style={{ color: "var(--color-muted)" }}>زمان‌بندی اقساط شما</span>
                <span style={{ fontWeight: 600 }}>{toPersianNumber(installmentMonths)}ماهه</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <span style={{ color: "var(--color-muted)" }}>
                  مجموع اقساط (سالانه ۲۳٪)
                </span>
                <span style={{ fontWeight: 600 }}>
                  {toPersianNumber(Math.round(calc.totalAmount).toLocaleString("fa-IR"))} تومان
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                }}
              >
                <span style={{ color: "var(--color-muted)" }}>اعتبار دریافتی</span>
                <span style={{ fontWeight: 600 }}>
                  {toPersianNumber(calc.totalPrice.toLocaleString("fa-IR"))} تومان
                </span>
              </div>
            </div>

            {/* Payment Schedule */}
            <div
              className="card"
              style={{
                marginBottom: "20px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                زمان‌بندی اقساط
              </div>

              {Array.from({ length: installmentMonths }, (_, i) => {
                const installmentNames = ["اول", "دوم", "سوم", "چهارم"];
                const date = new Date();
                date.setMonth(date.getMonth() + i + 1);
                const persianMonth = date.toLocaleDateString("fa-IR", { month: "long" });

                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      background: i % 2 === 0 ? "rgba(0,0,0,0.02)" : "transparent",
                      borderRadius: "8px",
                      fontSize: "13px",
                      marginBottom: "4px",
                    }}
                  >
                    <span>قسط {installmentNames[i]}</span>
                    <span style={{ color: "var(--color-muted)" }}>
                      ۲۰ {persianMonth} ۱۴۰۴
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Terms */}
            <div
              style={{
                padding: "16px",
                background: "rgba(255, 200, 87, 0.1)",
                borderRadius: "12px",
                fontSize: "12px",
                marginBottom: "20px",
              }}
            >
              ✓ من قوانین و مقررات را می‌پذیرم.
              <br />و قابل فروش نیست.
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setStep(1)}
                className="btn btn-outline"
                style={{
                  flex: 1,
                  padding: "16px",
                  borderRadius: "16px",
                }}
              >
                بازگشت
              </button>
              <button
                onClick={handleConfirm}
                className="btn btn-success"
                style={{
                  flex: 1,
                  padding: "16px",
                  borderRadius: "16px",
                }}
              >
                تایید و ادامه
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
