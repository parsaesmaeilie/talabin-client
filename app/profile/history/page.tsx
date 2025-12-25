"use client";

import { useState } from "react";
import Link from "next/link";
import { mockOrders, Order } from "@/lib/mockData";

export default function OrderHistoryPage() {
  const [activeTab, setActiveTab] = useState<"all" | "buy_sell" | "installment" | "physical" | "savings">("all");
  const [orders] = useState<Order[]>(mockOrders);

  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    if (activeTab === "buy_sell") return ["buy", "sell"].includes(order.type);
    if (activeTab === "installment") return order.type === "installment";
    if (activeTab === "physical") return order.type === "physical_receipt";
    if (activeTab === "savings") return order.type === "savings";
    return true;
  });

  const getTypeIcon = (type: Order["type"]) => {
    switch (type) {
      case "buy":
        return "🛒";
      case "sell":
        return "💵";
      case "installment":
        return "📅";
      case "physical_receipt":
        return "📦";
      case "savings":
        return "🐷";
      default:
        return "📄";
    }
  };

  const getTypeLabel = (type: Order["type"]) => {
    switch (type) {
      case "buy":
        return "خرید";
      case "sell":
        return "فروش";
      case "installment":
        return "خرید قسطی";
      case "physical_receipt":
        return "تحویل فیزیکی";
      case "savings":
        return "پس‌انداز";
      default:
        return type;
    }
  };

  const getStatusBadge = (status: Order["status"]) => {
    const badges = {
      completed: { text: "تکمیل شده", color: "#10B981", bg: "rgba(16, 185, 129, 0.1)" },
      pending: { text: "در انتظار", color: "#F59E0B", bg: "rgba(245, 158, 11, 0.1)" },
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
            href="/profile"
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
            تاریخچه سفارشات
          </h1>
          <div style={{ width: "40px" }} />
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
            { key: "all", label: "همه" },
            { key: "buy_sell", label: "خرید و فروش" },
            { key: "installment", label: "قسطی" },
            { key: "physical", label: "فیزیکی" },
            { key: "savings", label: "پس‌انداز" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              style={{
                padding: "10px 20px",
                background: activeTab === tab.key ? "var(--color-primary)" : "#FFFFFF",
                border: "none",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                boxShadow: activeTab === tab.key ? "0 2px 8px rgba(255, 200, 87, 0.3)" : "none",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div
          style={{
            fontSize: "13px",
            color: "var(--color-muted)",
            marginBottom: "12px",
            textAlign: "center",
          }}
        >
          {toPersianNumber(filteredOrders.length)} سفارش یافت شد
        </div>

        {/* Order List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <div
                key={order.id}
                className="card"
                style={{
                  padding: "20px",
                  cursor: "pointer",
                  animation: `slideInUp 0.3s ease-out ${index * 0.05}s backwards`,
                }}
                onClick={() => {
                  alert(`جزئیات سفارش:\n\nنوع: ${getTypeLabel(order.type)}\nمبلغ: ${order.amount.toLocaleString()} تومان\nطلا: ${order.goldAmount} گرم\nوضعیت: ${order.status}`);
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, #FFF4E1 0%, #FFFFFF 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                      flexShrink: 0,
                    }}
                  >
                    {getTypeIcon(order.type)}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "8px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            marginBottom: "4px",
                          }}
                        >
                          {order.description}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "var(--color-muted)",
                          }}
                        >
                          {order.date}
                        </div>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>

                    {/* Details */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "12px",
                        marginTop: "12px",
                        padding: "12px",
                        background: "rgba(0,0,0,0.02)",
                        borderRadius: "12px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "var(--color-muted)",
                            marginBottom: "2px",
                          }}
                        >
                          مقدار طلا
                        </div>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          {toPersianNumber(order.goldAmount)} گرم
                        </div>
                      </div>

                      {order.amount > 0 && (
                        <div style={{ textAlign: "left" }}>
                          <div
                            style={{
                              fontSize: "11px",
                              color: "var(--color-muted)",
                              marginBottom: "2px",
                            }}
                          >
                            مبلغ
                          </div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: order.type === "sell" ? "#10B981" : "#1C1C1C",
                            }}
                          >
                            {toPersianNumber(order.amount.toLocaleString("fa-IR"))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Download Receipt Button */}
                    {order.status === "completed" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("دانلود رسید");
                        }}
                        style={{
                          marginTop: "12px",
                          width: "100%",
                          padding: "10px",
                          background: "rgba(255, 200, 87, 0.1)",
                          border: "1px solid var(--color-primary)",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "var(--color-dark)",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--color-primary)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(255, 200, 87, 0.1)";
                        }}
                      >
                        📄 دانلود فاکتور
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              className="card"
              style={{
                padding: "60px 20px",
                textAlign: "center",
                color: "var(--color-muted)",
              }}
            >
              <div style={{ fontSize: "64px", marginBottom: "16px" }}>📦</div>
              <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>
                سفارشی یافت نشد
              </div>
              <div style={{ fontSize: "13px" }}>
                در این دسته‌بندی هنوز سفارشی ثبت نشده است
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
