"use client";

import { useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

export default function InstallmentBuyPage() {
  const goldPrice = 11000000; // قیمت لحظه‌ای طلا (مثال)

  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [approvedCredit, setApprovedCredit] = useState<number | null>(null);
  const [boughtGold, setBoughtGold] = useState<number | null>(null);

  // شبیه‌سازی درخواست به تامین‌کننده
  const requestFromSupplier = async (amount: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: "approved",
          creditAmount: amount * 0.75, // مثال: تامین‌کننده ۷۵٪ مبلغ را تایید می‌کند
        });
      }, 2000);
    });
  };

  // ارسال درخواست خرید قسطی
  const handleInstallmentRequest = async () => {
    if (amount < 1000000) {
      alert("حداقل مبلغ درخواست ۱,۰۰۰,۰۰۰ تومان است");
      return;
    }

    setLoading(true);
    setStatusMsg("در حال ارسال درخواست به تامین‌کننده...");

    const response: any = await requestFromSupplier(amount);

    if (response.status === "approved") {
      setStatusMsg("درخواست تایید شد");
      setApprovedCredit(response.creditAmount);

      // مقدار طلا
      const gold = response.creditAmount / goldPrice;
      setBoughtGold(gold);
    } else {
      setStatusMsg("درخواست رد شد");
    }

    setLoading(false);
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
          خرید قسطی طلا
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "var(--color-muted)",
            margin: "0 0 20px",
          }}
        >
          خرید طلا با تسهیلات قسطی
        </p>

      <Card style={{ marginBottom: "12px" }}>
        <div
          style={{
            fontSize: "12px",
            color: "var(--color-muted)",
            marginBottom: "8px",
          }}
        >
          قیمت لحظه‌ای طلا
        </div>
        <div style={{ marginTop: "6px" }}>
          <span style={{ fontSize: "22px", fontWeight: 700 }}>
            {goldPrice.toLocaleString()}
          </span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 400,
              color: "var(--color-muted)",
              marginRight: "6px",
            }}
          >
            تومان (هر گرم)
          </span>
        </div>
      </Card>

      <Card style={{ marginBottom: "12px" }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">مبلغ موردنظر (تومان)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
            className="form-input"
            placeholder="مثال: 20,000,000"
          />
          <small className="form-hint">
            حداقل مبلغ درخواست: ۱,۰۰۰,۰۰۰ تومان
          </small>
        </div>
      </Card>

      <Button
        variant="primary"
        onClick={handleInstallmentRequest}
        disabled={loading}
        style={{ marginBottom: "12px", width: "100%" }}
      >
        {loading ? "در حال پردازش..." : "ارسال درخواست خرید قسطی"}
      </Button>

      {statusMsg && (
        <Card style={{ marginBottom: "12px" }}>
          <div
            style={{
              fontSize: "13px",
              textAlign: "center",
              color: "var(--color-muted)",
            }}
          >
            {statusMsg}
          </div>
        </Card>
      )}

      {approvedCredit && (
        <Card style={{ marginBottom: "12px" }}>
          <div
            style={{
              fontSize: "12px",
              color: "var(--color-muted)",
              marginBottom: "12px",
            }}
          >
            نتیجه درخواست
          </div>

          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                fontSize: "12px",
                color: "var(--color-muted)",
                marginBottom: "4px",
              }}
            >
              اعتبار تایید شده
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--color-success)",
              }}
            >
              {approvedCredit.toLocaleString()} تومان
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: "12px",
                color: "var(--color-muted)",
                marginBottom: "4px",
              }}
            >
              میزان طلای خریداری‌شده
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              {boughtGold?.toFixed(4)} گرم
            </div>
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
          نحوه کار خرید قسطی
        </div>
        <ul
          style={{
            fontSize: "13px",
            lineHeight: 1.8,
            margin: 0,
            paddingRight: "18px",
          }}
        >
          <li>درخواست خرید قسطی خود را ثبت کنید</li>
          <li>پس از بررسی، میزان اعتبار تایید شده اعلام می‌شود</li>
          <li>طلای خریداری شده به حساب شما واریز می‌گردد</li>
          <li>اقساط ماهانه از حساب شما کسر خواهد شد</li>
        </ul>
      </Card>
      </div>
    </div>
  );
}
