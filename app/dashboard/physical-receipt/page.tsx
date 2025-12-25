"use client";

import { useState } from "react";
import Link from "next/link";

type RequestStatus = "pending" | "ready" | "received" | "failed";

interface PhysicalRequest {
  id: string;
  amount: number;
  status: RequestStatus;
  date: string;
}

export default function PhysicalReceiptPage() {
  const [activeTab, setActiveTab] = useState<RequestStatus | "all">("all");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);

  // Mock data
  const walletGold = 102; // grams
  const availableForPhysical = 100; // grams

  const requests: PhysicalRequest[] = [
    { id: "1", amount: 10, status: "ready", date: "۱۴۰۴/۱۰/۲۵" },
    { id: "2", amount: 50, status: "received", date: "۱۴۰۴/۱۰/۲۰" },
  ];

  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const getStatusBadge = (status: RequestStatus) => {
    const badges = {
      pending: { text: "در حال بررسی", color: "#F59E0B" },
      ready: { text: "آماده دریافت", color: "#10B981" },
      received: { text: "دریافت شده", color: "#6B7280" },
      failed: { text: "ناموفق", color: "#EF4444" },
    };

    const badge = badges[status];

    return (
      <div
        style={{
          padding: "4px 12px",
          background: `${badge.color}20`,
          color: badge.color,
          borderRadius: "999px",
          fontSize: "11px",
          fontWeight: 600,
          display: "inline-block",
        }}
      >
        {badge.text}
      </div>
    );
  };

  const filteredRequests =
    activeTab === "all"
      ? requests
      : requests.filter((req) => req.status === activeTab);

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
            href="/dashboard/services"
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
            دریافت فیزیکی
          </h1>
          <div
            onClick={() => setShowInstructionsModal(true)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            ⓘ
          </div>
        </div>

        {/* Balance Card */}
        <div
          className="card"
          style={{
            marginBottom: "20px",
            padding: "20px",
            background: "linear-gradient(135deg, #FFF4E1 0%, #FFFFFF 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--color-muted)",
                  marginBottom: "4px",
                }}
              >
                موجودی کیف طلا:
              </div>
              <div style={{ fontSize: "24px", fontWeight: 700 }}>
                {toPersianNumber(walletGold)} گرم
              </div>
            </div>
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--color-muted)",
                  marginBottom: "4px",
                }}
              >
                موجودی قابل دریافت فیزیکی:
              </div>
              <div style={{ fontSize: "24px", fontWeight: 700, color: "#10B981" }}>
                {toPersianNumber(availableForPhysical)} گرم
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowRequestModal(true)}
            className="btn btn-primary btn-block"
            style={{
              marginTop: "16px",
              padding: "14px",
              fontSize: "14px",
              borderRadius: "12px",
            }}
          >
            ثبت درخواست
          </button>
        </div>

        {/* Info Card */}
        <div
          style={{
            padding: "16px",
            background: "rgba(59, 130, 246, 0.1)",
            borderRadius: "12px",
            fontSize: "12px",
            marginBottom: "20px",
            display: "flex",
            gap: "12px",
          }}
        >
          <span>ⓘ</span>
          <div>
            <div style={{ fontWeight: 600, marginBottom: "4px" }}>
              راهنمای تحویل فیزیکی
            </div>
            <div style={{ color: "var(--color-muted)" }}>
              ۱ باید مضربی از ۱۰ داشته باشد.
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "20px",
            overflowX: "auto",
            padding: "4px",
          }}
        >
          {[
            { key: "all", label: "همه موارد" },
            { key: "pending", label: "در حال بررسی" },
            { key: "ready", label: "آماده دریافت" },
            { key: "received", label: "دریافت شده" },
            { key: "failed", label: "ناموفق" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as RequestStatus | "all")}
              style={{
                padding: "10px 16px",
                background:
                  activeTab === tab.key ? "var(--color-primary)" : "#FFFFFF",
                border: "none",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Requests List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                className="card"
                style={{
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ fontSize: "16px", fontWeight: 700 }}>
                    {toPersianNumber(request.amount)} گرم
                  </div>
                  {getStatusBadge(request.status)}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color: "var(--color-muted)",
                  }}
                >
                  <span>تاریخ درخواست</span>
                  <span>{request.date}</span>
                </div>

                {request.status === "ready" && (
                  <div
                    style={{
                      marginTop: "12px",
                      padding: "12px",
                      background: "rgba(16, 185, 129, 0.1)",
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: "#065F46",
                      textAlign: "center",
                    }}
                  >
                    آماده دریافت از شعبه طلابین
                  </div>
                )}
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

        {/* Request Modal */}
        {showRequestModal && (
          <RequestModal
            availableGold={availableForPhysical}
            onClose={() => setShowRequestModal(false)}
          />
        )}

        {/* Instructions Modal */}
        {showInstructionsModal && (
          <InstructionsModal onClose={() => setShowInstructionsModal(false)} />
        )}
      </div>
    </div>
  );
}

// Request Modal Component
function RequestModal({
  availableGold,
  onClose,
}: {
  availableGold: number;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const toPersianNumber = (num: string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);

    if (!amount) {
      setError("این فیلد الزامی است");
      return;
    }

    if (numAmount % 10 !== 0) {
      setError("۱ باید مضربی از ۱۰ داشته باشد.");
      return;
    }

    if (numAmount > availableGold) {
      setError("مقدار وارد شده بیش از موجودی کیف طلای شما می‌باشد.");
      return;
    }

    // API call here
    alert("درخواست شما ثبت شد\n\nآدرس شعبه و زمان تحویل طلا به شما پیامک خواهد شد.");
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
          ثبت درخواست
        </div>

        <div
          style={{
            padding: "16px",
            background: "rgba(59, 130, 246, 0.1)",
            borderRadius: "12px",
            fontSize: "12px",
            marginBottom: "16px",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: "4px" }}>
            ⓘ راهنمای تحویل فیزیکی
          </div>
          <div style={{ color: "var(--color-muted)" }}>
            ۱ باید مضربی از ۱۰ داشته باشد.
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              fontSize: "13px",
              color: "var(--color-muted)",
              marginBottom: "8px",
            }}
          >
            موجودی کیف‌طلا: {toPersianNumber(availableGold)} گرم
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
            مقدار طلا گرم
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

        {/* Quick Amounts */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          {[10, 20, 30].map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => {
                setAmount(quickAmount.toString());
                setError("");
              }}
              style={{
                padding: "10px",
                background: "rgba(0,0,0,0.04)",
                border: "none",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {toPersianNumber(quickAmount)} گرم
            </button>
          ))}
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
            ثبت درخواست
          </button>
        </div>
      </div>
    </div>
  );
}

// Instructions Modal Component
function InstructionsModal({ onClose }: { onClose: () => void }) {
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
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          راهنمای تحویل فیزیکی
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            دریافت فیزیکی طلا در ۳ مرحله
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", gap: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                ۱
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: "4px" }}>
                  ارائه کارت ملی معتبر به نماینده طلابین
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-muted)" }}>
                  لطفا کارت ملی خود را همراه داشته باشید
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                ۲
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: "4px" }}>
                  مراجعه به شعبه تحویل فیزیکی طلابین
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-مuted)" }}>
                  در زمان مشخص شده به شعبه مراجعه کنید
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                ۳
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: "4px" }}>
                  سنجش‌حصت و واریز به حساب کاربری شما
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-muted)" }}>
                  (جزئیات برداشت فیزیکی شما در تاریخچه ثبت شده است)
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "16px",
            background: "rgba(255, 200, 87, 0.1)",
            borderRadius: "12px",
            fontSize: "12px",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: "4px" }}>
            شعبه تحویل فیزیکی طلابین
          </div>
          <div style={{ color: "var(--color-muted)" }}>
            شعبه۱: آذربایجان شرقی، مراغه، ............
            <br />
            شنبه تا چهارشنبه ۰۰:۱۶ الی ۰۰:۲۰
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn btn-primary btn-block"
          style={{ padding: "14px", borderRadius: "12px" }}
        >
          متوجه شدم
        </button>
      </div>
    </div>
  );
}
