"use client";

import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

export default function WalletPage() {
  return (
    <div className="min-h-screen" style={{ padding: "20px 16px 80px" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 600,
            margin: "0 0 6px",
          }}
        >
          کیف پول
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "var(--color-muted)",
            margin: "0 0 20px",
          }}
        >
          مدیریت موجودی تومان و طلای دیجیتال در طلابین
        </p>

      {/* Total Balance Card */}
      <Card style={{ marginBottom: "12px" }}>
        <div
          style={{
            fontSize: "12px",
            color: "var(--color-muted)",
            marginBottom: "8px",
          }}
        >
          موجودی کل
        </div>
        <div style={{ marginTop: "6px" }}>
          <span style={{ fontSize: "22px", fontWeight: 700 }}>۸,۳۵۰,۰۰۰</span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 400,
              color: "var(--color-muted)",
              marginRight: "6px",
            }}
          >
            تومان (تقریبی)
          </span>
        </div>
        <div
          style={{
            marginTop: "6px",
            fontSize: "11px",
            color: "var(--color-muted)",
          }}
        >
          شامل طلای دیجیتال و موجودی نقدی
        </div>
      </Card>

      {/* Balance Cards */}
      <div className="grid-2" style={{ gap: "10px", marginBottom: "12px" }}>
        <Card>
          <div
            style={{
              fontSize: "12px",
              color: "var(--color-muted)",
              marginBottom: "6px",
            }}
          >
            طلای دیجیتال
          </div>
          <div style={{ marginTop: "6px" }}>
            <span style={{ fontSize: "18px", fontWeight: 700 }}>۲٫۳۴</span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 400,
                color: "var(--color-muted)",
                marginRight: "4px",
              }}
            >
              گرم
            </span>
          </div>
        </Card>

        <Card>
          <div
            style={{
              fontSize: "12px",
              color: "var(--color-muted)",
              marginBottom: "6px",
            }}
          >
            موجودی تومان
          </div>
          <div style={{ marginTop: "6px" }}>
            <span style={{ fontSize: "18px", fontWeight: 700 }}>
              ۱,۳۵۰,۰۰۰
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 400,
                color: "var(--color-muted)",
                marginRight: "4px",
              }}
            >
              تومان
            </span>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="grid-2" style={{ gap: "10px", marginBottom: "16px" }}>
        <Button variant="primary" fullWidth asLink href="/dashboard/wallet/deposit">
          واریز
        </Button>
        <Button variant="outline" fullWidth asLink href="/dashboard/wallet/withdraw">
          برداشت
        </Button>
      </div>

      {/* Recent Wallet History */}
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "12px", color: "var(--color-muted)" }}>
            تاریخچه اخیر کیف پول
          </span>
          <Link
            href="/dashboard/wallet/history"
            style={{ fontSize: "11px", color: "var(--color-muted)" }}
          >
            مشاهده همه
          </Link>
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
            <div>
              <div>واریز تومان</div>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--color-muted)",
                  marginTop: "3px",
                }}
              >
                ۱,۰۰۰,۰۰۰ تومان • شبا بانکی
              </div>
            </div>
            <Badge variant="green">موفق</Badge>
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
            <div>
              <div>برداشت تومان</div>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--color-muted)",
                  marginTop: "3px",
                }}
              >
                ۵۰۰,۰۰۰ تومان • در انتظار بانک
              </div>
            </div>
            <Badge>در حال انجام</Badge>
          </div>
        </div>
      </Card>
      </div>
    </div>
  );
}
