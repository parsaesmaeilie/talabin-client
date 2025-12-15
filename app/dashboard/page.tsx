import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen" style={{ padding: "20px 16px 80px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Header */}
        <h1 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "6px" }}>
          داشبورد
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "var(--color-muted)",
            marginBottom: "20px",
          }}
        >
          نمای کلی قیمت طلا، دارایی‌ها و دسترسی سریع
        </p>

        {/* Price Card */}
        <Card style={{ marginBottom: "16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "10px",
            }}
          >
            <div>
              <div style={{ fontSize: "12px", color: "var(--color-muted)" }}>
                قیمت لحظه‌ای طلای ۱۸ عیار
              </div>
              <div style={{ fontSize: "22px", fontWeight: 700 }}>
                ۲,۹۸۰,۰۰۰
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--color-muted)",
                    marginRight: "6px",
                  }}
                >
                  تومان
                </span>
              </div>
            </div>
            <Badge variant="green">+۰٫۸٪ امروز</Badge>
          </div>

          {/* Mini Chart */}
          <div
            style={{
              height: "56px",
              borderRadius: "12px",
              background:
                "linear-gradient(to left, rgba(255,200,87,0.08), rgba(84,65,255,0.12))",
              marginBottom: "14px",
            }}
          />

          <Button
            variant="primary"
            fullWidth
            asLink
            href="/dashboard/buy-sell"
          >
            شروع خرید یا فروش
          </Button>
        </Card>

        {/* Balances */}
        <div className="grid-2" style={{ gap: "10px", marginBottom: "16px" }}>
          <Card>
            <div style={{ fontSize: "12px", color: "var(--color-muted)" }}>
              موجودی طلا
            </div>
            <div style={{ fontSize: "20px", fontWeight: 700, marginTop: "6px" }}>
              ۲٫۳۴
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--color-muted)",
                  marginRight: "4px",
                }}
              >
                گرم
              </span>
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--color-muted)",
                marginTop: "4px",
              }}
            >
              ≈ ۷,۰۰۰,۰۰۰ تومان
            </div>
          </Card>

          <Card>
            <div style={{ fontSize: "12px", color: "var(--color-muted)" }}>
              موجودی تومان
            </div>
            <div style={{ fontSize: "20px", fontWeight: 700, marginTop: "6px" }}>
              ۱,۳۵۰,۰۰۰
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--color-muted)",
                  marginRight: "4px",
                }}
              >
                تومان
              </span>
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--color-muted)",
                marginTop: "4px",
              }}
            >
              آماده معامله
            </div>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card style={{ marginBottom: "16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span style={{ fontSize: "12px", color: "var(--color-muted)" }}>
              آخرین معاملات
            </span>
            <Link
              href="/dashboard/transactions"
              style={{ fontSize: "11px", color: "var(--color-muted)" }}
            >
              مشاهده همه
            </Link>
          </div>

          {[
            { title: "خرید طلا", desc: "۱ گرم • ۴,۰۰۰,۰۰۰ تومان", badge: "موفق", v: "green" },
            { title: "فروش طلا", desc: "۰٫۵ گرم • ۲,۰۰۰,۰۰۰ تومان", badge: "تسویه شد" },
            { title: "برداشت", desc: "۱,۰۰۰,۰۰۰ تومان", badge: "در انتظار" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 4px",
                borderBottom: i !== 2 ? "1px solid rgba(0,0,0,0.04)" : "none",
                fontSize: "12px",
              }}
            >
              <div>
                <div>{item.title}</div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--color-muted)",
                    marginTop: "3px",
                  }}
                >
                  {item.desc}
                </div>
              </div>
              <Badge variant={item.v as any}>{item.badge}</Badge>
            </div>
          ))}
        </Card>

        {/* Quick Actions */}
        <div className="grid-2" style={{ gap: "10px" }}>
          {[
            { href: "/dashboard/buy-sell", icon: "📈", title: "خرید / فروش" },
            { href: "/dashboard/wallet", icon: "💳", title: "کیف پول" },
            { href: "/dashboard/wallet/deposit", icon: "💰", title: "واریز" },
            { href: "/profile", icon: "👤", title: "پروفایل" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="card"
              style={{ textDecoration: "none" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ fontSize: "20px" }}>{item.icon}</div>
                <div style={{ fontSize: "14px", fontWeight: 600 }}>
                  {item.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
