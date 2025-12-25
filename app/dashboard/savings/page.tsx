"use client";

import { useState } from "react";
import Link from "next/link";

export default function SavingsPage() {
  const [activeView, setActiveView] = useState<"chart" | "history">("chart");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Mock data - replace with API calls
  const savingsData = {
    goldGrams: 100,
    tomanValue: 1380000,
    monthlyHistory: [
      { month: "آذر", deposit: 15, withdraw: 0 },
      { month: "دی", deposit: 10, withdraw: 0 },
      { month: "بهمن", deposit: 20, withdraw: 0 },
      { month: "اسفند", deposit: 10, withdraw: 0 },
    ],
  };

  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
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
            href="/dashboard"
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
          <div
            onClick={() => setShowAddModal(!showAddModal)}
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
            }}
          >
            ✏️
          </div>
        </div>

        {/* Balance Card */}
        <div
          className="card"
          style={{
            marginBottom: "20px",
            padding: "24px",
            textAlign: "center",
            background: "linear-gradient(135deg, #FFF4E1 0%, #FFFFFF 100%)",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "var(--color-muted)",
              marginBottom: "8px",
            }}
          >
            مقدار پس‌انداز طلا به گرم:
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            {toPersianNumber(savingsData.goldGrams)} گرم
          </div>
          <div
            style={{
              fontSize: "13px",
              color: "var(--color-muted)",
              marginBottom: "4px",
            }}
          >
            مقدار پس‌انداز طلا به تومان:
          </div>
          <div style={{ fontSize: "20px", fontWeight: 600 }}>
            {toPersianNumber(savingsData.tomanValue.toLocaleString("fa-IR"))} تومان
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "12px 16px",
              background: "rgba(255, 200, 87, 0.2)",
              borderRadius: "12px",
              fontSize: "12px",
              color: "var(--color-dark)",
            }}
          >
            حتی با مبالغ کوچک‌هم می‌توان شروع کرد!
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary"
            style={{
              padding: "16px",
              fontSize: "14px",
              borderRadius: "16px",
            }}
          >
            افزایش پس‌انداز
          </button>
          <button
            onClick={() => setShowWithdrawModal(true)}
            className="btn btn-outline"
            style={{
              padding: "16px",
              fontSize: "14px",
              borderRadius: "16px",
            }}
          >
            برداشت از پس‌انداز
          </button>
        </div>

        {/* Auto Savings Banner */}
        <div
          className="card"
          style={{
            marginBottom: "20px",
            padding: "20px",
            background: "linear-gradient(135deg, #E8F5E9 0%, #FFFFFF 100%)",
            cursor: "pointer",
          }}
          onClick={() => (window.location.href = "/dashboard/savings/auto-setup")}
        >
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
              marginBottom: "16px",
            }}
          >
            آینده مالی‌ات رو گام‌به‌گام بساز
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                flex: 1,
                fontSize: "13px",
                color: "#1C1C1C",
              }}
            >
              پس‌انداز طلا؛ انتخاب هوشمند
            </div>
            <div
              style={{
                padding: "8px 16px",
                background: "#10B981",
                color: "#FFFFFF",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              شروع
            </div>
          </div>
        </div>

        {/* View Switcher */}
        <div
          className="tab-switcher"
          style={{ marginBottom: "20px" }}
        >
          <button
            className={`tab-button ${activeView === "chart" ? "active" : ""}`}
            onClick={() => setActiveView("chart")}
          >
            نمودار
          </button>
          <button
            className={`tab-button ${activeView === "history" ? "active" : ""}`}
            onClick={() => setActiveView("history")}
          >
            تاریخچه
          </button>
        </div>

        {/* Chart View */}
        {activeView === "chart" && (
          <div className="card" style={{ padding: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-around",
                height: "200px",
                paddingBottom: "20px",
                borderBottom: "2px solid rgba(0,0,0,0.1)",
              }}
            >
              {savingsData.monthlyHistory.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--color-dark)",
                    }}
                  >
                    {toPersianNumber(item.deposit)} گرم
                  </div>
                  <div
                    style={{
                      width: "40px",
                      height: `${item.deposit * 8}px`,
                      background: "linear-gradient(180deg, #FFC857 0%, #FFD666 100%)",
                      borderRadius: "8px 8px 0 0",
                      transition: "height 0.3s ease",
                    }}
                  />
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--color-muted)",
                    }}
                  >
                    {item.month}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    background: "#FFC857",
                    borderRadius: "3px",
                  }}
                />
                <span style={{ fontSize: "12px" }}>افزایش پس‌انداز</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    background: "#EF4444",
                    borderRadius: "3px",
                  }}
                />
                <span style={{ fontSize: "12px" }}>برداشت پس‌انداز</span>
              </div>
            </div>
          </div>
        )}

        {/* History View */}
        {activeView === "history" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {savingsData.monthlyHistory.length > 0 ? (
              savingsData.monthlyHistory.map((item, index) => (
                <div
                  key={index}
                  className="card"
                  style={{
                    padding: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
                      افزایش پس‌انداز
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--color-muted)" }}>
                      ماه {item.month}
                    </div>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: "#10B981" }}>
                      +{toPersianNumber(item.deposit)} گرم
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="card"
                style={{
                  padding: "40px 20px",
                  textAlign: "center",
                  color: "var(--color-muted)",
                }}
              >
                اطلاعاتی برای نمایش وجود ندارد.
              </div>
            )}
          </div>
        )}

        {/* Add to Savings Modal */}
        {showAddModal && (
          <AddToSavingsModal onClose={() => setShowAddModal(false)} />
        )}

        {/* Withdraw Modal */}
        {showWithdrawModal && (
          <WithdrawModal onClose={() => setShowWithdrawModal(false)} />
        )}
      </div>
    </div>
  );
}

// Add to Savings Modal Component
function AddToSavingsModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const toPersianNumber = (num: string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const handleSubmit = () => {
    if (!amount) {
      setError("وارد کردن مقدار الزامی است.");
      return;
    }
    // Add API call here
    alert("پس‌انداز شما افزایش یافت!");
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "flex-end",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        className="slide-in-up"
        style={{
          background: "#FFFFFF",
          borderRadius: "24px 24px 0 0",
          padding: "24px",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            fontSize: "18px",
            fontWeight: 700,
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          افزایش پس‌انداز
        </div>

        <div
          style={{
            padding: "16px",
            background: "rgba(255, 200, 87, 0.1)",
            borderRadius: "12px",
            marginBottom: "16px",
            fontSize: "13px",
            textAlign: "center",
          }}
        >
          از کیف طلای خود، به میزان دلخواه پس‌انداز کن.
        </div>

        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              fontSize: "13px",
              color: "var(--color-muted)",
              marginBottom: "8px",
            }}
          >
            موجودی کیف‌طلا: ۰ گرم
          </div>
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
            وارد کنید مقدار دلخواه گرم
          </div>
          <input
            type="text"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError("");
            }}
            placeholder="..."
            style={{
              width: "100%",
              fontSize: "20px",
              fontWeight: 600,
              border: "none",
              outline: "none",
              textAlign: "center",
              background: "transparent",
            }}
          />
        </div>

        {error && (
          <div
            style={{
              padding: "12px",
              background: "rgba(239, 68, 68, 0.1)",
              color: "#DC2626",
              borderRadius: "12px",
              fontSize: "12px",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={onClose}
            className="btn btn-outline"
            style={{ flex: 1, padding: "14px", borderRadius: "12px" }}
          >
            انصراف
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            style={{ flex: 1, padding: "14px", borderRadius: "12px" }}
          >
            افزایش
          </button>
        </div>
      </div>
    </div>
  );
}

// Withdraw Modal Component
function WithdrawModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!amount) {
      setError("وارد کردن مقدار الزامی است.");
      return;
    }
    // Add API call here
    alert("برداشت از پس‌انداز شما انجام شد.");
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "flex-end",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        className="slide-in-up"
        style={{
          background: "#FFFFFF",
          borderRadius: "24px 24px 0 0",
          padding: "24px",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            fontSize: "18px",
            fontWeight: 700,
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          برداشت از پس‌انداز
        </div>

        <div
          style={{
            padding: "16px",
            background: "rgba(239, 68, 68, 0.1)",
            borderRadius: "12px",
            marginBottom: "16px",
            fontSize: "13px",
            textAlign: "center",
          }}
        >
          از پس‌انداز به میزان دلخواه، طلا به کیف‌طلای خود منتقل کن
        </div>

        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              fontSize: "13px",
              color: "var(--color-muted)",
              marginBottom: "8px",
            }}
          >
            میزان پس‌انداز: ۰ گرم
          </div>
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
            وارد کنید مقدار دلخواه گرم
          </div>
          <input
            type="text"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError("");
            }}
            placeholder="..."
            style={{
              width: "100%",
              fontSize: "20px",
              fontWeight: 600,
              border: "none",
              outline: "none",
              textAlign: "center",
              background: "transparent",
            }}
          />
        </div>

        {error && (
          <div
            style={{
              padding: "12px",
              background: "rgba(239, 68, 68, 0.1)",
              color: "#DC2626",
              borderRadius: "12px",
              fontSize: "12px",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={onClose}
            className="btn btn-outline"
            style={{ flex: 1, padding: "14px", borderRadius: "12px" }}
          >
            انصراف
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-danger"
            style={{ flex: 1, padding: "14px", borderRadius: "12px" }}
          >
            برداشت
          </button>
        </div>
      </div>
    </div>
  );
}
