"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { walletService, WalletTransaction } from "@/lib/api/wallet";

type FilterType = "all" | "deposit" | "withdraw" | "buy_gold" | "sell_gold" | "fee" | "refund";
type FilterStatus = "all" | "completed" | "pending" | "failed" | "cancelled" | "processing";

export default function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<FilterType>("all");
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [transactions, selectedType, selectedStatus, searchQuery, sortOrder]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await walletService.getTransactions();

      if (response.success && response.data) {
        setTransactions(response.data);
      }

      setError(null);
    } catch (err: any) {
      console.error("Error fetching transactions:", err);
      setError("خطا در بارگذاری تراکنش‌ها");
    } finally {
      setLoading(false);
    }
  };

  const toPersianNumber = (num: string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const applyFilters = () => {
    let filtered = [...transactions];

    // Type filter
    if (selectedType !== "all") {
      filtered = filtered.filter((t) => t.transaction_type === selectedType);
    }

    // Status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter((t) => t.status === selectedStatus);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.reference_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.amount_irr?.includes(searchQuery) ||
          t.amount_gold?.includes(searchQuery)
      );
    }

    // Sort by date
    filtered.sort((a, b) => {
      return sortOrder === "desc"
        ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        : new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });

    setFilteredTransactions(filtered);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return "💰";
      case "withdraw":
        return "💸";
      case "buy_gold":
        return "🪙";
      case "sell_gold":
        return "💎";
      case "fee":
        return "💳";
      case "refund":
        return "↩️";
      default:
        return "📄";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "deposit":
        return "واریز تومان";
      case "withdraw":
        return "برداشت تومان";
      case "buy_gold":
        return "خرید طلا";
      case "sell_gold":
        return "فروش طلا";
      case "fee":
        return "کارمزد";
      case "refund":
        return "برگشت وجه";
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { text: string; color: string; bg: string }> = {
      completed: { text: "موفق", color: "#059669", bg: "#D1FAE5" },
      pending: { text: "در انتظار", color: "#F59E0B", bg: "#FEF3C7" },
      failed: { text: "ناموفق", color: "#DC2626", bg: "#FEE2E2" },
      cancelled: { text: "لغو شده", color: "#6B7280", bg: "#F3F4F6" },
      processing: { text: "در حال پردازش", color: "#3B82F6", bg: "#DBEAFE" },
    };

    const badge = badges[status] || badges.pending;

    return (
      <div
        style={{
          padding: "6px 12px",
          background: badge.bg,
          color: badge.color,
          borderRadius: "8px",
          fontSize: "11px",
          fontWeight: 600,
          display: "inline-block",
        }}
      >
        {badge.text}
      </div>
    );
  };

  const ShimmerBox = ({ width = "100%", height = "20px", borderRadius = "8px" }: any) => (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: "linear-gradient(90deg, #F5F5F5 25%, #E5E5E5 50%, #F5F5F5 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
      }}
    />
  );

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#FAFAFA", paddingBottom: "100px" }}>
        {/* Header */}
        <div
          style={{
            background: "#FFFFFF",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
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
        <div style={{ padding: "16px" }}>
          {/* Error Message */}
          {error && (
            <div
              style={{
                padding: "12px 16px",
                marginBottom: "16px",
                borderRadius: "12px",
                background: "#FEE2E2",
                color: "#DC2626",
                fontSize: "14px",
                textAlign: "center",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>{error}</span>
              <button
                onClick={fetchTransactions}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#DC2626",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                تلاش مجدد
              </button>
            </div>
          )}

          {/* Search Box */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "16px",
              marginBottom: "16px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div style={{ position: "relative" }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <path
                  d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 19L14.65 14.65"
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو با کد پیگیری یا شرح..."
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 44px",
                  border: "2px solid #F3F4F6",
                  borderRadius: "12px",
                  fontSize: "14px",
                  background: "#FAFAFA",
                  color: "#1F1F1F",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Filters */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "16px",
              marginBottom: "16px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            }}
          >
            {/* Type Filter */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "10px", color: "#6B7280" }}>
                🏷️ نوع تراکنش
              </div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", overflowX: "auto" }}>
                {(["all", "deposit", "withdraw", "buy_gold", "sell_gold", "fee", "refund"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    style={{
                      padding: "8px 14px",
                      background: selectedType === type ? "#FDB022" : "#F5F5F5",
                      color: selectedType === type ? "#1F1F1F" : "#6B7280",
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {type === "all" ? "همه" : getTypeLabel(type)}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "10px", color: "#6B7280" }}>
                📊 وضعیت
              </div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {(["all", "completed", "pending", "failed", "cancelled", "processing"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    style={{
                      padding: "8px 14px",
                      background: selectedStatus === status ? "#FDB022" : "#F5F5F5",
                      color: selectedStatus === status ? "#1F1F1F" : "#6B7280",
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {status === "all"
                      ? "همه"
                      : status === "completed"
                      ? "موفق"
                      : status === "pending"
                      ? "در انتظار"
                      : status === "failed"
                      ? "ناموفق"
                      : status === "cancelled"
                      ? "لغو شده"
                      : "در حال پردازش"}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "10px", color: "#6B7280" }}>
                🔄 مرتب‌سازی
              </div>
              <button
                onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                style={{
                  padding: "8px 14px",
                  background: "#F5F5F5",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>{sortOrder === "desc" ? "جدیدترین ↓" : "قدیمی‌ترین ↑"}</span>
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div
            style={{
              padding: "12px 16px",
              background: "#FFFFFF",
              borderRadius: "12px",
              fontSize: "13px",
              color: "#6B7280",
              marginBottom: "12px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
              fontWeight: 600,
            }}
          >
            {loading ? "در حال بارگذاری..." : `📋 ${toPersianNumber(filteredTransactions.length.toString())} تراکنش یافت شد`}
          </div>

          {/* Transaction List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {loading ? (
              // Loading skeletons
              [1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    padding: "16px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" }}>
                    <ShimmerBox width="48px" height="48px" borderRadius="12px" />
                    <div style={{ flex: 1 }}>
                      <ShimmerBox height="16px" width="60%" borderRadius="6px" />
                      <div style={{ height: "8px" }} />
                      <ShimmerBox height="12px" width="40%" borderRadius="6px" />
                    </div>
                    <ShimmerBox width="80px" height="28px" borderRadius="8px" />
                  </div>
                  <ShimmerBox height="10px" width="100%" borderRadius="6px" />
                </div>
              ))
            ) : filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => {
                const isPositive = ["deposit", "buy_gold", "refund"].includes(transaction.transaction_type);
                const amount = transaction.amount_irr || transaction.amount_gold || "0";

                return (
                  <div
                    key={transaction.id}
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "16px",
                      padding: "16px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "12px",
                          background: "#FAFAFA",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "24px",
                          flexShrink: 0,
                        }}
                      >
                        {getTypeIcon(transaction.transaction_type)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px", color: "#1F1F1F" }}>
                          {getTypeLabel(transaction.transaction_type)}
                        </div>
                        <div style={{ fontSize: "11px", color: "#9CA3AF" }}>
                          {new Date(transaction.created_at).toLocaleDateString("fa-IR", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                      <div style={{ textAlign: "left", flexShrink: 0 }}>
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: 700,
                            marginBottom: "6px",
                            color: isPositive ? "#10B981" : "#EF4444",
                          }}
                        >
                          {isPositive ? "+" : "-"}
                          {toPersianNumber(parseFloat(amount).toLocaleString("fa-IR"))}
                          <span style={{ fontSize: "11px", fontWeight: 500, marginRight: "4px" }}>
                            {transaction.amount_irr ? "تومان" : "گرم"}
                          </span>
                        </div>
                        {getStatusBadge(transaction.status)}
                      </div>
                    </div>

                    {(transaction.description || transaction.reference_id) && (
                      <div
                        style={{
                          paddingTop: "12px",
                          borderTop: "1px solid #F3F4F6",
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "11px",
                          color: "#6B7280",
                        }}
                      >
                        {transaction.description && <span>{transaction.description}</span>}
                        {transaction.reference_id && <span>کد: {transaction.reference_id}</span>}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "40px 20px",
                  textAlign: "center",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                }}
              >
                <div style={{ fontSize: "64px", marginBottom: "16px" }}>📭</div>
                <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "6px", color: "#1F1F1F" }}>
                  تراکنشی یافت نشد
                </div>
                <div style={{ fontSize: "13px", color: "#6B7280" }}>
                  فیلترها را تغییر دهید یا جستجوی دیگری انجام دهید
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
