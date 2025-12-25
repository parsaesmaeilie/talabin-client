"use client";

import { useState } from "react";
import Link from "next/link";

export default function AutoSavingsSetup() {
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState<"weekly" | "monthly">("weekly");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [step, setStep] = useState(1);

  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const weekDays = [
    { id: 0, name: "شنبه", short: "ش" },
    { id: 1, name: "یکشنبه", short: "ی" },
    { id: 2, name: "دوشنبه", short: "د" },
    { id: 3, name: "سه‌شنبه", short: "س" },
    { id: 4, name: "چهارشنبه", short: "چ" },
    { id: 5, name: "پنج‌شنبه", short: "پ" },
    { id: 6, name: "جمعه", short: "ج" },
  ];

  const quickAmounts = [1000000, 5000000, 10000000, 15000000];

  const handleContinue = () => {
    if (step === 1 && amount && selectedDay !== null) {
      setStep(2);
    }
  };

  const handleConfirm = () => {
    // Add API call here
    alert("پس‌انداز خودکار شما ثبت شد!");
    window.location.href = "/dashboard/savings";
  };

  const getDayName = () => {
    if (frequency === "weekly" && selectedDay !== null) {
      return weekDays[selectedDay].name;
    }
    if (frequency === "monthly" && selectedDay !== null) {
      return `روز ${toPersianNumber(selectedDay)} ماه هر`;
    }
    return "";
  };

  return (
    <div
      className="min-h-screen"
      style={{ padding: "20px 16px 100px", background: "#F5F5F5" }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <Link
            href="/dashboard/savings"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            ←
          </Link>
          <h1
            style={{
              fontSize: "18px",
              fontWeight: 700,
              margin: 0,
            }}
          >
            پس‌انداز طلا
          </h1>
          <div style={{ width: "40px" }} />
        </div>

        {step === 1 && (
          <>
            {/* Hero Card */}
            <div
              className="card"
              style={{
                marginBottom: "24px",
                padding: "24px",
                textAlign: "center",
                background: "linear-gradient(135deg, #E8F5E9 0%, #FFFFFF 100%)",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🏆</div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                پس‌انداز با طلابین
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--color-muted)",
                }}
              >
                آینده مالی‌ات رو گام‌به‌گام بساز
              </div>
              <div
                style={{
                  marginTop: "16px",
                  display: "inline-block",
                  padding: "8px 16px",
                  background: "rgba(16, 185, 129, 0.2)",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#065F46",
                }}
              >
                یک قدم جلوتر، هر ماه
              </div>
            </div>

            {/* Amount Input */}
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
                  marginBottom: "12px",
                }}
              >
                مقدار دلخواه را وارد کنید
              </div>

              <div
                style={{
                  padding: "16px",
                  border: "2px solid rgba(0,0,0,0.1)",
                  borderRadius: "16px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--color-muted)",
                    marginBottom: "8px",
                  }}
                >
                  تومان
                </div>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  style={{
                    width: "100%",
                    fontSize: "24px",
                    fontWeight: 600,
                    border: "none",
                    outline: "none",
                    textAlign: "center",
                    background: "transparent",
                  }}
                />
              </div>

              {/* Quick Amount Buttons */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "8px",
                }}
              >
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount.toString())}
                    style={{
                      padding: "12px",
                      background:
                        amount === quickAmount.toString()
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
                    {toPersianNumber(quickAmount.toLocaleString("fa-IR"))}
                  </button>
                ))}
              </div>

              <div
                style={{
                  marginTop: "12px",
                  fontSize: "11px",
                  color: "var(--color-muted)",
                  textAlign: "center",
                }}
              >
                معادل: {amount ? toPersianNumber((parseFloat(amount) / 13459000).toFixed(4)) : "۰"} گرم
              </div>
            </div>

            {/* Frequency Selector */}
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
                  marginBottom: "12px",
                }}
              >
                روز پس‌انداز شما کدام روز هفته می‌شود؟
              </div>

              {/* Frequency Tabs */}
              <div
                className="tab-switcher"
                style={{ marginBottom: "16px" }}
              >
                <button
                  className={`tab-button ${frequency === "weekly" ? "active" : ""}`}
                  onClick={() => {
                    setFrequency("weekly");
                    setSelectedDay(null);
                  }}
                >
                  هفتگی
                </button>
                <button
                  className={`tab-button ${frequency === "monthly" ? "active" : ""}`}
                  onClick={() => {
                    setFrequency("monthly");
                    setSelectedDay(null);
                  }}
                >
                  ماهانه
                </button>
              </div>

              {/* Weekly Day Selector */}
              {frequency === "weekly" && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "8px",
                  }}
                >
                  {weekDays.map((day) => (
                    <button
                      key={day.id}
                      onClick={() => setSelectedDay(day.id)}
                      style={{
                        padding: "16px 8px",
                        background:
                          selectedDay === day.id
                            ? "var(--color-primary)"
                            : "rgba(0,0,0,0.04)",
                        border: "none",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {day.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Monthly Day Selector */}
              {frequency === "monthly" && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 1fr)",
                    gap: "8px",
                    maxHeight: "300px",
                    overflowY: "auto",
                    padding: "4px",
                  }}
                >
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      style={{
                        aspectRatio: "1",
                        background:
                          selectedDay === day
                            ? "var(--color-primary)"
                            : "rgba(0,0,0,0.04)",
                        border: "none",
                        borderRadius: "12px",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {toPersianNumber(day)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={!amount || selectedDay === null}
              className="btn btn-primary btn-block"
              style={{
                padding: "16px",
                fontSize: "16px",
                borderRadius: "16px",
                opacity: !amount || selectedDay === null ? 0.5 : 1,
              }}
            >
              ادامه
            </button>

            {(!amount || selectedDay === null) && (
              <div
                style={{
                  marginTop: "12px",
                  fontSize: "12px",
                  color: "#DC2626",
                  textAlign: "center",
                }}
              >
                وارد کردن مبلغ الزامی است.
                <br />
                مشخص کنید را روز پس‌انداز.
              </div>
            )}
          </>
        )}

        {step === 2 && (
          <>
            {/* Confirmation Card */}
            <div
              className="card"
              style={{
                marginBottom: "24px",
                padding: "24px",
                textAlign: "center",
                background: "linear-gradient(135deg, #FFF4E1 0%, #FFFFFF 100%)",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>✓</div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                تایید پس‌انداز طلا
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
                <span style={{ color: "var(--color-muted)" }}>مبلغ پس‌انداز</span>
                <span style={{ fontWeight: 600 }}>
                  {toPersianNumber(parseFloat(amount).toLocaleString("fa-IR"))} تومان
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                }}
              >
                <span style={{ color: "var(--color-muted)" }}>روز پس‌انداز</span>
                <span style={{ fontWeight: 600 }}>{getDayName()}</span>
              </div>
            </div>

            {/* Confirmation Text */}
            <div
              style={{
                padding: "16px",
                background: "rgba(255, 200, 87, 0.1)",
                borderRadius: "12px",
                fontSize: "13px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              ✓ من قوانین و مقررات را می‌پذیرم.
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
                شروع پس‌انداز
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
