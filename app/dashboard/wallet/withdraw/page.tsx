"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

export default function WithdrawPage() {
  const [amount, setAmount] = useState(0);
  const [shaba, setShaba] = useState("");

  const [amountError, setAmountError] = useState("");
  const [shabaError, setShabaError] = useState("");

  const [success, setSuccess] = useState(false);

  const isShabaValid = (shaba: string) => /^[0-9]{24}$/.test(shaba);

  const handleWithdraw = () => {
    let hasError = false;

    setAmountError("");
    setShabaError("");

    if (amount <= 0) {
      setAmountError("مبلغ باید بیشتر از صفر باشد.");
      hasError = true;
    }

    if (!isShabaValid(shaba)) {
      setShabaError("شماره شبا باید 24 رقم باشد.");
      hasError = true;
    }

    if (hasError) return;

    setSuccess(true);
    alert(`مبلغ ${amount.toLocaleString()} تومان از حساب شما برداشت شد.`);
  };

  return (
    <div className="min-h-screen" style={{ padding: "20px 16px 80px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1
        style={{
          fontSize: "20px",
          fontWeight: 600,
          margin: "8px 0 6px",
        }}
      >
        برداشت از حساب
      </h1>
      <p
        style={{
          fontSize: "13px",
          color: "var(--color-muted)",
          margin: "0 0 16px",
        }}
      >
        برداشت تومان از کیف پول
      </p>

      <Card style={{ marginBottom: "12px", background: "var(--color-warning-bg)" }}>
        <div
          style={{
            fontSize: "12px",
            color: "var(--color-warning)",
            lineHeight: 1.7,
          }}
        >
          ⚠️ حساب مقصد باید به نام مالک اکانت باشد؛ در غیر این صورت تراکنش
          انجام نخواهد شد.
        </div>
      </Card>

      <Card style={{ marginBottom: "12px" }}>
        <div className="form-group">
          <label className="form-label">مبلغ برداشت (تومان)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
            className="form-input"
            placeholder="مثلاً 500000"
          />
          {amountError && (
            <small
              className="form-hint"
              style={{ color: "var(--color-danger)" }}
            >
              {amountError}
            </small>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">شماره شبا (بدون IR)</label>
          <input
            type="text"
            value={shaba}
            onChange={(e) => setShaba(e.target.value)}
            className="form-input"
            placeholder="مثلاً 123456789012345678901234"
            maxLength={24}
          />
          {shabaError && (
            <small
              className="form-hint"
              style={{ color: "var(--color-danger)" }}
            >
              {shabaError}
            </small>
          )}
          <small className="form-hint">24 رقم بدون IR</small>
        </div>
      </Card>

      <Button
        variant="danger"
        fullWidth
        onClick={handleWithdraw}
        style={{ marginBottom: "12px" }}
      >
        برداشت از حساب
      </Button>

      {success && (
        <Card style={{ marginBottom: "12px" }}>
          <div
            style={{
              fontSize: "13px",
              textAlign: "center",
              color: "var(--color-success)",
              fontWeight: 600,
            }}
          >
            ✓ تراکنش با موفقیت انجام شد
          </div>
        </Card>
      )}

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
          <li>حداقل مبلغ برداشت ۵۰ هزار تومان است</li>
          <li>برداشت معمولاً ظرف ۲۴ ساعت انجام می‌شود</li>
          <li>حساب مقصد باید به نام خود شما باشد</li>
          <li>کارمزد برداشت: رایگان</li>
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
