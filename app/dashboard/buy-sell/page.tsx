"use client";

import { useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

export default function BuySell() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✔ عملیات انجام شد!");
  };

  return (
    <div className="min-h-screen" style={{ padding: "20px 16px 80px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 600,
            margin: "0 0 6px",
          }}
        >
          خرید / فروش طلا
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "var(--color-muted)",
            margin: "0 0 20px",
          }}
        >
          یک صفحه ساده برای ثبت سفارش خرید یا فروش
        </p>

      {/* Price Card */}
      <Card style={{ marginBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "6px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "var(--color-muted)",
                marginBottom: "6px",
              }}
            >
              قیمت لحظه‌ای طلا
            </div>
            <div style={{ fontSize: "18px", fontWeight: 700 }}>
              ۲,۹۹۰,۰۰۰
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "var(--color-muted)",
                  marginRight: "6px",
                }}
              >
                تومان
              </span>
            </div>
          </div>
          <Badge variant="green">به‌روزرسانی لحظه‌ای</Badge>
        </div>

        {/* Tabs */}
        <div
          className="grid-2"
          style={{ gap: "6px", marginTop: "10px" }}
        >
          <button
            className="btn"
            onClick={() => setActiveTab("buy")}
            style={{
              background: activeTab === "buy" ? "var(--color-primary)" : "rgba(0,0,0,0.02)",
              borderColor: activeTab === "buy" ? "var(--color-primary)" : "rgba(0,0,0,0.06)",
              color: activeTab === "buy" ? "#1C1C1C" : "var(--color-muted)",
              borderRadius: "var(--radius-md)",
            }}
          >
            خرید
          </button>
          <button
            className="btn"
            onClick={() => setActiveTab("sell")}
            style={{
              background: activeTab === "sell" ? "var(--color-danger)" : "rgba(0,0,0,0.02)",
              borderColor: activeTab === "sell" ? "var(--color-danger)" : "rgba(0,0,0,0.06)",
              color: activeTab === "sell" ? "#FFFFFF" : "var(--color-muted)",
              borderRadius: "var(--radius-md)",
            }}
          >
            فروش
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label className="form-label">مبلغ به تومان</label>
              <span style={{ fontSize: "11px", color: "var(--color-muted)" }}>
                حداقل ۱۰۰,۰۰۰ تومان
              </span>
            </div>
            <input
              type="number"
              className="form-input"
              placeholder="مثلاً ۵۰۰,۰۰۰"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="100000"
              step="1000"
            />
            <small className="form-hint">
              می‌توانی بعداً این ورودی را به عددی واقعی و ماسک‌شده تبدیل کنی.
            </small>
          </div>

          {/* Summary */}
          <div
            style={{
              marginTop: "14px",
              borderRadius: "12px",
              background: "var(--color-soft)",
              padding: "10px 12px",
              fontSize: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "6px",
              }}
            >
              <span>کارمزد (۰٫۵٪)</span>
              <span>نمایشی – تومان</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "6px",
              }}
            >
              <span>مقدار تقریبی طلا</span>
              <span>نمایشی – گرم</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>مبلغ نهایی پرداخت</span>
              <span>نمایشی</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
            <Button
              type="submit"
              variant={activeTab === "buy" ? "success" : "danger"}
              style={{ flex: "1", minWidth: "180px" }}
            >
              ادامه و ثبت سفارش
            </Button>

            <Button
              type="button"
              variant="outline"
              style={{ flex: "1", minWidth: "180px" }}
            >
              مشاهده قوانین
            </Button>
          </div>
        </form>
      </Card>

      {/* Info Card */}
      <Card>
        <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>
          نکات مهم
        </div>
        <ul
          style={{
            fontSize: "12px",
            lineHeight: 1.8,
            color: "var(--color-muted)",
            paddingRight: "18px",
            margin: 0,
          }}
        >
          <li>قیمت طلا به‌صورت لحظه‌ای به‌روزرسانی می‌شود</li>
          <li>کارمزد خرید و فروش ۰٫۵٪ است</li>
          <li>حداقل مبلغ خرید ۱۰۰,۰۰۰ تومان است</li>
          <li>پس از ثبت سفارش، طلای شما در کیف پول ذخیره می‌شود</li>
        </ul>
      </Card>
      </div>
    </div>
  );
}
