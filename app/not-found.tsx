"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const popularPages = [
    { title: "داشبورد", href: "/dashboard", icon: "🏠" },
    { title: "کیف پول", href: "/dashboard/wallet", icon: "💰" },
    { title: "خرید و فروش", href: "/dashboard/buy-sell", icon: "📊" },
    { title: "پروفایل", href: "/profile", icon: "👤" },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        padding: "20px 16px",
        background: "#F5F5F5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "600px", width: "100%", textAlign: "center" }}>
        {/* 404 Icon */}
        <div
          style={{
            fontSize: "120px",
            fontWeight: 700,
            color: "var(--color-primary)",
            marginBottom: "20px",
            animation: "scaleIn 0.6s ease-out",
            lineHeight: 1,
          }}
        >
          ۴۰۴
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "12px",
            animation: "slideInUp 0.6s ease-out 0.1s backwards",
          }}
        >
          صفحه یافت نشد
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "14px",
            color: "var(--color-muted)",
            marginBottom: "40px",
            lineHeight: 1.8,
            animation: "slideInUp 0.6s ease-out 0.2s backwards",
          }}
        >
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا ممکن است حذف شده باشد.
          <br />
          لطفا از لینک‌های زیر برای بازگشت استفاده کنید.
        </p>

        {/* Search-like Box (Decorative) */}
        <div
          className="card"
          style={{
            padding: "16px 20px",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            animation: "slideInUp 0.6s ease-out 0.3s backwards",
          }}
        >
          <div style={{ fontSize: "20px" }}>🔍</div>
          <div style={{ flex: 1, textAlign: "right", color: "var(--color-muted)", fontSize: "14px" }}>
            جستجو در طلابین...
          </div>
        </div>

        {/* Popular Pages */}
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              fontSize: "15px",
              fontWeight: 600,
              marginBottom: "16px",
              animation: "fadeIn 0.6s ease-out 0.4s backwards",
            }}
          >
            صفحات پرکاربرد
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "12px",
            }}
          >
            {popularPages.map((page, index) => (
              <Link
                key={page.href}
                href={page.href}
                className="card"
                style={{
                  padding: "20px",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  animation: `slideInUp 0.6s ease-out ${0.5 + index * 0.1}s backwards`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>
                  {page.icon}
                </div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-dark)" }}>
                  {page.title}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            animation: "slideInUp 0.6s ease-out 0.9s backwards",
          }}
        >
          <button
            onClick={() => router.back()}
            style={{
              flex: 1,
              padding: "16px",
              background: "#FFFFFF",
              border: "2px solid rgba(0,0,0,0.1)",
              borderRadius: "16px",
              fontSize: "15px",
              fontWeight: 600,
              color: "var(--color-dark)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            ← بازگشت
          </button>
          <Link
            href="/dashboard"
            style={{
              flex: 1,
              padding: "16px",
              background: "var(--color-primary)",
              border: "none",
              borderRadius: "16px",
              fontSize: "15px",
              fontWeight: 600,
              color: "var(--color-dark)",
              textAlign: "center",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            🏠 رفتن به داشبورد
          </Link>
        </div>

        {/* Help Link */}
        <div
          style={{
            marginTop: "32px",
            fontSize: "13px",
            color: "var(--color-muted)",
            animation: "fadeIn 0.6s ease-out 1s backwards",
          }}
        >
          در صورت نیاز به کمک،{" "}
          <Link
            href="/profile/support"
            style={{
              color: "var(--color-primary)",
              textDecoration: "underline",
            }}
          >
            با پشتیبانی تماس بگیرید
          </Link>
        </div>
      </div>
    </div>
  );
}
