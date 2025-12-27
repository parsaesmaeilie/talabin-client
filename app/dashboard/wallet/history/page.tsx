"use client";

import { useState } from "react";
import Link from "next/link";
import { generateMockTransactions, Transaction, TransactionType, TransactionStatus } from "@/lib/mockData";

export default function TransactionHistoryPage() {
  const [transactions] = useState<Transaction[]>(generateMockTransactions(50));
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);
  const [selectedType, setSelectedType] = useState<TransactionType | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<TransactionStatus | "all">("all");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...transactions];

    // Type filter
    if (selectedType !== "all") {
      filtered = filtered.filter((t) => t.type === selectedType);
    }

    // Status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter((t) => t.status === selectedStatus);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.includes(searchQuery) ||
          t.amount.toString().includes(searchQuery)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "desc"
          ? b.date.localeCompare(a.date)
          : a.date.localeCompare(b.date);
      } else {
        return sortOrder === "desc" ? b.amount - a.amount : a.amount - b.amount;
      }
    });

    setFilteredTransactions(filtered);
  };

  // Apply filters whenever dependencies change
  useState(() => {
    applyFilters();
  });

  const getTypeIcon = (type: TransactionType) => {
    switch (type) {
      case "deposit":
        return "💰";
      case "withdraw":
        return "💸";
      case "buy":
        return "🛒";
      case "sell":
        return "💵";
      case "fee":
        return "📋";
      case "refund":
        return "↩️";
      default:
        return "📄";
    }
  };

  const getTypeLabel = (type: TransactionType) => {
    switch (type) {
      case "deposit":
        return "واریز";
      case "withdraw":
        return "برداشت";
      case "buy":
        return "خرید";
      case "sell":
        return "فروش";
      case "fee":
        return "کارمزد";
      case "refund":
        return "بازگشت";
      default:
        return type;
    }
  };

  const getStatusBadge = (status: TransactionStatus) => {
    const badges = {
      completed: { text: "موفق", color: "#10B981", bg: "rgba(16, 185, 129, 0.1)" },
      pending: { text: "در انتظار", color: "#F59E0B", bg: "rgba(245, 158, 11, 0.1)" },
      failed: { text: "ناموفق", color: "#EF4444", bg: "rgba(239, 68, 68, 0.1)" },
      cancelled: { text: "لغو شده", color: "#6B7280", bg: "rgba(107, 114, 128, 0.1)" },
      processing: { text: "در حال پردازش", color: "#3B82F6", bg: "rgba(59, 130, 246, 0.1)" },
    };

    const badge = badges[status];

    return (
      <div
        style={{
          padding: "4px 12px",
          background: badge.bg,
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
        <Link href="/dashboard/wallet">
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
          تاریخچه تراکنش‌ها
        </h1>
      </div>

      {/* Content */}
      <div style={{ padding: "0 16px 16px" }}>
        {/* Search Box */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "16px",
            marginBottom: "16px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              applyFilters();
            }}
            placeholder="جستجو با کد پیگیری یا مبلغ..."
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "2px solid #F3F4F6",
              borderRadius: "12px",
              fontSize: "14px",
              background: "#FAFAFA",
              color: "#1F1F1F",
              outline: "none",
            }}
          />
        </div>

        {/* Filters */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "16px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              نوع تراکنش
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              {(["all", "deposit", "withdraw", "buy", "sell", "fee", "refund"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    applyFilters();
                  }}
                  style={{
                    padding: "8px 16px",
                    background: selectedType === type ? "var(--color-primary)" : "#F5F5F5",
                    border: "none",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {type === "all" ? "همه" : getTypeLabel(type)}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              وضعیت
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              {(["all", "completed", "pending", "failed", "cancelled", "processing"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    applyFilters();
                  }}
                  style={{
                    padding: "8px 16px",
                    background: selectedStatus === status ? "var(--color-primary)" : "#F5F5F5",
                    border: "none",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {status === "all" ? "همه" :
                   status === "completed" ? "موفق" :
                   status === "pending" ? "در انتظار" :
                   status === "failed" ? "ناموفق" :
                   status === "cancelled" ? "لغو شده" : "در حال پردازش"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              مرتب‌سازی
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as "date" | "amount");
                  applyFilters();
                }}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  fontSize: "13px",
                  outline: "none",
                }}
              >
                <option value="date">تاریخ</option>
                <option value="amount">مبلغ</option>
              </select>
              <button
                onClick={() => {
                  setSortOrder(sortOrder === "desc" ? "asc" : "desc");
                  applyFilters();
                }}
                style={{
                  padding: "8px 16px",
                  background: "#F5F5F5",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {sortOrder === "desc" ? "جدیدترین" : "قدیمی‌ترین"}
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div
          style={{
            fontSize: "13px",
            color: "#6B7280",
            marginBottom: "12px",
            textAlign: "center",
          }}
        >
          {toPersianNumber(filteredTransactions.length)} تراکنش یافت شد
        </div>

        {/* Transaction List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  padding: "20px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                  cursor: "pointer",
                }}
                onClick={() => {
                  // TODO: Open transaction detail modal
                  alert(`جزئیات تراکنش:\n\nکد پیگیری: ${transaction.trackingId}\nمبلغ: ${transaction.amount.toLocaleString()} تومان\nوضعیت: ${transaction.status}`);
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "32px",
                      flexShrink: 0,
                    }}
                  >
                    {getTypeIcon(transaction.type)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        marginBottom: "4px",
                      }}
                    >
                      {transaction.description}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--color-muted)",
                      }}
                    >
                      {transaction.date}
                    </div>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        marginBottom: "4px",
                        color: ["deposit", "buy", "refund"].includes(transaction.type) ? "#10B981" : "#EF4444",
                      }}
                    >
                      {["deposit", "buy", "refund"].includes(transaction.type) ? "+" : "-"}
                      {toPersianNumber(transaction.amount.toLocaleString("fa-IR"))}
                    </div>
                    {getStatusBadge(transaction.status)}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "12px",
                    borderTop: "1px solid rgba(0,0,0,0.06)",
                    fontSize: "11px",
                    color: "var(--color-muted)",
                  }}
                >
                  <span>کد پیگیری: {transaction.trackingId}</span>
                  {transaction.goldAmount && (
                    <span>{toPersianNumber(transaction.goldAmount)} گرم</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "40px 20px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px", color: "#1F1F1F" }}>
                تراکنشی یافت نشد
              </div>
              <div style={{ fontSize: "12px", color: "#6B7280" }}>
                فیلترها را تغییر دهید یا جستجوی دیگری انجام دهید
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
