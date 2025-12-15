"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

export default function DepositPage() {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  // تابع برای شارژ حساب
  const handleDeposit = () => {
    if (amount <= 0) {
      setError("مبلغ باید بیشتر از صفر باشد.");
      return;
    }

    setError("");
    alert(`حساب شما با مبلغ ${amount.toLocaleString()} تومان شارژ شد.`);
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
          شارژ حساب
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "var(--color-muted)",
            margin: "0 0 20px",
          }}
      >
        واریز تومان به کیف پول
      </p>

      <Card style={{ marginBottom: "12px" }}>
        <div
          style={{
            fontSize: "12px",
            color: "var(--color-muted)",
            marginBottom: "8px",
          }}
        >
          روش‌های واریز
        </div>
        <div
          style={{
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(0,0,0,0.04)",
            background: "#FBFAF7",
            padding: "6px 8px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 4px",
              borderBottom: "1px solid rgba(0,0,0,0.04)",
              fontSize: "12px",
            }}
          >
            <span>درگاه پرداخت بانکی</span>
            <Badge variant="green">فعال</Badge>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 4px",
              fontSize: "12px",
            }}
          >
            <span>کارت به کارت</span>
            <Badge>فعال</Badge>
          </div>
        </div>
      </Card>

      <Card style={{ marginBottom: "12px" }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">مبلغ شارژ (تومان)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
            className="form-input"
            placeholder="مثلاً 500000"
          />
          {error && (
            <small
              className="form-hint"
              style={{ color: "var(--color-danger)" }}
            >
              {error}
            </small>
          )}
          <small className="form-hint">حداقل مبلغ واریز: ۱۰۰,۰۰۰ تومان</small>
        </div>
      </Card>

      <Button
        variant="success"
        fullWidth
        onClick={handleDeposit}
        style={{ marginBottom: "12px" }}
      >
        شارژ حساب
      </Button>

      <Card>
        <div
          style={{
            fontSize: "12px",
            color: "var(--color-muted)",
            marginBottom: "8px",
          }}
        >
          نکات مهم
        </div>
        <ul
          style={{
            fontSize: "13px",
            lineHeight: 1.8,
            margin: 0,
            paddingRight: "18px",
            color: "var(--color-text-light)",
          }}
        >
          <li>واریزی‌های زیر ۱۰۰ هزار تومان پردازش نمی‌شود</li>
          <li>موجودی معمولاً ظرف ۱۰ دقیقه به حساب شما واریز می‌شود</li>
          <li>در صورت عدم واریز، با پشتیبانی تماس بگیرید</li>
        </ul>
      </Card>

      <div
        style={{
          marginTop: "16px",
          textAlign: "center",
        }}
      >
        <Link href="/dashboard/wallet">
          <span
            style={{
              fontSize: "13px",
              color: "var(--color-primary)",
              fontWeight: 600,
            }}
          >
            بازگشت به کیف پول
          </span>
        </Link>
      </div>
      </div>
    </div>
  );
}
