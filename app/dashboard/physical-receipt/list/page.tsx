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

export default function PhysicalReceiptListPage() {
  const [activeTab, setActiveTab] = useState<RequestStatus>("pending");

  // Mock data - replace with API call
  const requests: PhysicalRequest[] = [
    { id: "1", amount: 10, status: "pending", date: "۱۴۰۴/۱۰/۲۵" },
    { id: "2", amount: 50, status: "ready", date: "۱۴۰۴/۱۰/۲۴" },
    { id: "3", amount: 25, status: "received", date: "۱۴۰۴/۱۰/۲۰" },
    { id: "4", amount: 30, status: "failed", date: "۱۴۰۴/۱۰/۱۸" },
  ];

  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const getStatusBadge = (status: RequestStatus) => {
    const badges = {
      pending: { text: "در حال بررسی", bgColor: "rgba(59, 130, 246, 0.1)", textColor: "#2563EB" },
      ready: { text: "آماده دریافت", bgColor: "rgba(16, 185, 129, 0.1)", textColor: "#059669" },
      received: { text: "دریافت شده", bgColor: "rgba(107, 114, 128, 0.1)", textColor: "#4B5563" },
      failed: { text: "ناموفق", bgColor: "rgba(239, 68, 68, 0.1)", textColor: "#DC2626" },
    };

    const badge = badges[status];

    return (
      <div
        style={{
          padding: "6px 12px",
          background: badge.bgColor,
          color: badge.textColor,
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: 600,
          display: "inline-block",
        }}
      >
        {badge.text}
      </div>
    );
  };

  const filteredRequests = requests.filter((req) => req.status === activeTab);

  const tabs = [
    { key: "pending" as RequestStatus, label: "درحال بررسی" },
    { key: "ready" as RequestStatus, label: "آماده دریافت" },
    { key: "received" as RequestStatus, label: "دریافت شده" },
    { key: "failed" as RequestStatus, label: "ناموفق" },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ padding: "20px 16px 100px", background: "#FFFFFF" }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
            paddingBottom: "16px",
            borderBottom: "1px solid #E5E5E5",
          }}
        >
          <div style={{ width: "40px" }} /> {/* Spacer */}

          <h1
            style={{
              fontSize: "18px",
              fontWeight: 700,
              margin: 0,
              color: "#1F2937",
            }}
          >
            لیست درخواست ها
          </h1>

          <Link
            href="/dashboard/physical-receipt"
            style={{
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              cursor: "pointer",
              textDecoration: "none",
              color: "#1F2937",
            }}
          >
            ←
          </Link>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "24px",
            overflowX: "auto",
            padding: "4px 0",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "10px 20px",
                background: activeTab === tab.key ? "#93C5FD" : "#FFFFFF",
                border: `1px solid ${activeTab === tab.key ? "#93C5FD" : "#E5E7EB"}`,
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                color: activeTab === tab.key ? "#1E3A8A" : "#6B7280",
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
                style={{
                  padding: "16px",
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {request.status === "pending" && (
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "12px",
                        background: "rgba(59, 130, 246, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        className="spin"
                      >
                        <circle cx="12" cy="12" r="10" opacity="0.25" />
                        <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: "#1F2937", marginBottom: "4px" }}>
                      {toPersianNumber(request.amount)} گرم
                    </div>
                    {getStatusBadge(request.status)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "60px 20px",
                textAlign: "center",
                color: "#9CA3AF",
                fontSize: "14px",
              }}
            >
              درخواستی یافت نشد
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
