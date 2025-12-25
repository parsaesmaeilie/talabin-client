"use client";

import { useState } from "react";
import Link from "next/link";
import { mockMessages, Message } from "@/lib/mockData";

type MessageFilter = "all" | "unread" | "system" | "transaction" | "kyc" | "announcement";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedFilter, setSelectedFilter] = useState<MessageFilter>("all");

  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const filteredMessages = messages.filter((message) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "unread") return !message.isRead;
    return message.type === selectedFilter;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  const getTypeLabel = (type: Message["type"]) => {
    switch (type) {
      case "system":
        return "سیستمی";
      case "transaction":
        return "تراکنش";
      case "kyc":
        return "احراز هویت";
      case "announcement":
        return "اعلان";
      default:
        return type;
    }
  };

  const getTypeColor = (type: Message["type"]) => {
    switch (type) {
      case "system":
        return { bg: "rgba(59, 130, 246, 0.1)", color: "#3B82F6" };
      case "transaction":
        return { bg: "rgba(16, 185, 129, 0.1)", color: "#10B981" };
      case "kyc":
        return { bg: "rgba(245, 158, 11, 0.1)", color: "#F59E0B" };
      case "announcement":
        return { bg: "rgba(139, 92, 246, 0.1)", color: "#8B5CF6" };
      default:
        return { bg: "rgba(0,0,0,0.05)", color: "var(--color-muted)" };
    }
  };

  const handleMarkAsRead = (id: string) => {
    setMessages(
      messages.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg))
    );
  };

  const handleMarkAsUnread = (id: string) => {
    setMessages(
      messages.map((msg) => (msg.id === id ? { ...msg, isRead: false } : msg))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("آیا از حذف این پیام اطمینان دارید؟")) {
      setMessages(messages.filter((msg) => msg.id !== id));
      alert("پیام با موفقیت حذف شد");
    }
  };

  const handleMarkAllAsRead = () => {
    setMessages(messages.map((msg) => ({ ...msg, isRead: true })));
    alert("همه پیام‌ها به عنوان خوانده شده علامت‌گذاری شدند");
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
            پیام‌ها
            {unreadCount > 0 && (
              <span
                style={{
                  marginRight: "8px",
                  background: "#EF4444",
                  color: "white",
                  fontSize: "11px",
                  fontWeight: 600,
                  padding: "2px 8px",
                  borderRadius: "999px",
                  minWidth: "20px",
                  display: "inline-block",
                  textAlign: "center",
                }}
              >
                {toPersianNumber(unreadCount)}
              </span>
            )}
          </h1>
          <div style={{ width: "40px" }} />
        </div>

        {/* Mark All as Read Button */}
        {unreadCount > 0 && (
          <div style={{ marginBottom: "16px", textAlign: "center" }}>
            <button
              onClick={handleMarkAllAsRead}
              style={{
                padding: "10px 20px",
                background: "rgba(59, 130, 246, 0.1)",
                border: "1px solid #3B82F6",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#3B82F6",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              علامت‌گذاری همه به عنوان خوانده شده
            </button>
          </div>
        )}

        {/* Filters */}
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
            { key: "all" as const, label: "همه" },
            { key: "unread" as const, label: "خوانده نشده" },
            { key: "transaction" as const, label: "تراکنش‌ها" },
            { key: "system" as const, label: "سیستمی" },
            { key: "kyc" as const, label: "احراز هویت" },
            { key: "announcement" as const, label: "اعلان‌ها" },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              style={{
                padding: "10px 20px",
                background:
                  selectedFilter === filter.key ? "var(--color-primary)" : "#FFFFFF",
                border: "none",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                boxShadow:
                  selectedFilter === filter.key
                    ? "0 2px 8px rgba(255, 200, 87, 0.3)"
                    : "none",
              }}
            >
              {filter.label}
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
          {toPersianNumber(filteredMessages.length)} پیام یافت شد
        </div>

        {/* Messages List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message, index) => (
              <div
                key={message.id}
                className="card"
                style={{
                  padding: "20px",
                  cursor: "pointer",
                  animation: `slideInUp 0.3s ease-out ${index * 0.05}s backwards`,
                  position: "relative",
                  background: message.isRead ? "#FFFFFF" : "rgba(255, 200, 87, 0.05)",
                  border: message.isRead ? "none" : "1px solid rgba(255, 200, 87, 0.3)",
                }}
                onClick={() => !message.isRead && handleMarkAsRead(message.id)}
              >
                {/* Unread Indicator */}
                {!message.isRead && (
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      left: "20px",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#EF4444",
                    }}
                  />
                )}

                {/* Message Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ flex: 1, paddingLeft: "12px" }}>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        marginBottom: "6px",
                      }}
                    >
                      {message.title}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--color-muted)",
                      }}
                    >
                      {message.date}
                    </div>
                  </div>

                  {/* Type Badge */}
                  <div
                    style={{
                      padding: "4px 12px",
                      background: getTypeColor(message.type).bg,
                      color: getTypeColor(message.type).color,
                      borderRadius: "999px",
                      fontSize: "11px",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {getTypeLabel(message.type)}
                  </div>
                </div>

                {/* Message Body */}
                <div
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.6",
                    color: "var(--color-dark)",
                    marginBottom: "12px",
                  }}
                >
                  {message.body}
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    paddingTop: "12px",
                    borderTop: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  {message.isRead ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsUnread(message.id);
                      }}
                      style={{
                        flex: 1,
                        padding: "8px",
                        background: "rgba(0,0,0,0.03)",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "var(--color-muted)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      علامت به عنوان خوانده نشده
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(message.id);
                      }}
                      style={{
                        flex: 1,
                        padding: "8px",
                        background: "rgba(59, 130, 246, 0.1)",
                        border: "1px solid #3B82F6",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#3B82F6",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      علامت به عنوان خوانده شده
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(message.id);
                    }}
                    style={{
                      padding: "8px 16px",
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid #EF4444",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#EF4444",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    🗑️
                  </button>
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
              <div style={{ fontSize: "64px", marginBottom: "16px" }}>📭</div>
              <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>
                پیامی یافت نشد
              </div>
              <div style={{ fontSize: "13px" }}>
                {selectedFilter !== "all"
                  ? "فیلتر را تغییر دهید یا بعداً مجدداً بررسی کنید"
                  : "هنوز پیامی دریافت نکرده‌اید"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
