"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/src/features/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [goldBalance, setGoldBalance] = useState(0);
  const [goldValue, setGoldValue] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(15348000);

  useEffect(() => {
    // Check authentication
    if (!authService.isAuthenticated()) {
      router.push("/(auth)/login");
    }
  }, [router]);

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA" }}>
      {/* Header */}
      <div
        style={{
          background: "#FFFFFF",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/notifications" style={{ position: "relative" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "#F5F5F5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10.0167 2.42505C7.70008 2.42505 5.81675 4.30838 5.81675 6.62505V8.80005C5.81675 9.27505 5.61675 10.0084 5.37508 10.4084L4.48341 11.925C3.93341 12.8167 4.27508 13.8084 5.26675 14.1417C8.65008 15.3334 12.3751 15.3334 15.7584 14.1417C16.6834 13.8334 17.0584 12.75 16.5417 11.925L15.6501 10.4084C15.4167 10.0084 15.2167 9.27505 15.2167 8.80005V6.62505C15.2167 4.31672 13.3251 2.42505 11.0167 2.42505H10.0167Z"
                stroke="#1F1F1F"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                d="M11.575 2.66672C11.3417 2.60005 11.1 2.54172 10.85 2.50005C10.175 2.38338 9.52502 2.40005 8.91669 2.54172C9.14169 1.99172 9.66669 1.60005 10.2834 1.60005C10.9 1.60005 11.425 1.99172 11.65 2.54172L11.575 2.66672Z"
                stroke="#1F1F1F"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.6833 14.4667C12.6833 15.9167 11.45 17.0834 9.99998 17.0834C9.27498 17.0834 8.59998 16.7667 8.12498 16.2834C7.64998 15.8084 7.33331 15.1334 7.33331 14.4667"
                stroke="#1F1F1F"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
            </svg>
          </div>
          <div
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#EF4444",
              color: "white",
              fontSize: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
            }}
          >
            2
          </div>
        </Link>

        {/* Logo */}
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #FDB022 0%, #F5A815 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: 700,
            color: "#1F1F1F",
            boxShadow: "0 4px 12px rgba(253, 176, 34, 0.3)",
          }}
        >
          ط
        </div>

        <Link href="/profile">
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "#F5F5F5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10.1334 9.05005C10.05 9.04172 9.95002 9.04172 9.85835 9.05005C7.87502 8.98338 6.30002 7.36672 6.30002 5.36672C6.30002 3.32505 7.94169 1.67505 10 1.67505C12.05 1.67505 13.7 3.32505 13.7 5.36672C13.6917 7.36672 12.1167 8.98338 10.1334 9.05005Z"
                stroke="#1F1F1F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.96665 12.1334C3.94999 13.4834 3.94999 15.6834 5.96665 17.025C8.25832 18.5584 12.0166 18.5584 14.3083 17.025C16.325 15.675 16.325 13.475 14.3083 12.1334C12.025 10.6084 8.26665 10.6084 5.96665 12.1334Z"
                stroke="#1F1F1F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Link>
      </div>

      {/* Content */}
      <div style={{ padding: "16px" }}>
        {/* Balance Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "16px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M7.49998 18.3334H12.5C16.6666 18.3334 18.3333 16.6667 18.3333 12.5V7.50002C18.3333 3.33335 16.6666 1.66669 12.5 1.66669H7.49998C3.33331 1.66669 1.66665 3.33335 1.66665 7.50002V12.5C1.66665 16.6667 3.33331 18.3334 7.49998 18.3334Z"
                stroke="#1F1F1F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#1F1F1F", margin: 0 }}>
              موجودی طلا
            </h3>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "4px" }}>
            <span style={{ fontSize: "32px", fontWeight: 700, color: "#1F1F1F" }}>
              {goldBalance}
            </span>
            <span style={{ fontSize: "16px", color: "#6B7280" }}>گرم</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "13px", color: "#6B7280" }}>معادل</span>
            <span style={{ fontSize: "15px", fontWeight: 600, color: "#1F1F1F" }}>
              {goldValue.toLocaleString()}
            </span>
            <span style={{ fontSize: "13px", color: "#6B7280" }}>تومان</span>
          </div>
        </div>

        {/* Action Grid */}
        <div
          style={{
            background: "#1F1F1F",
            borderRadius: "24px",
            padding: "20px",
            marginBottom: "16px",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
        >
          <Link
            href="/dashboard/buy-sell?type=buy"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              padding: "12px",
            }}
          >
            <div style={{ fontSize: "32px" }}>🪙</div>
            <span style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 500 }}>
              خرید طلا
            </span>
          </Link>

          <Link
            href="/dashboard/buy-sell?type=sell"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              padding: "12px",
            }}
          >
            <div style={{ fontSize: "32px" }}>💎</div>
            <span style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 500 }}>
              فروش طلا
            </span>
          </Link>

          <Link
            href="/dashboard/savings"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              padding: "12px",
            }}
          >
            <div style={{ fontSize: "32px" }}>⭐</div>
            <span style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 500 }}>
              کسب‌درآمد
            </span>
          </Link>

          <Link
            href="/dashboard/physical-receipt"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              padding: "12px",
            }}
          >
            <div style={{ fontSize: "32px" }}>🔋</div>
            <span style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 500 }}>
              شارژ فیزیکی
            </span>
          </Link>
        </div>

        {/* Hero Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
            borderRadius: "20px",
            padding: "24px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            boxShadow: "0 4px 12px rgba(253, 176, 34, 0.2)",
          }}
        >
          <div style={{ fontSize: "64px" }}>🔐</div>
          <div>
            <h3
              style={{
                fontSize: "17px",
                fontWeight: 700,
                color: "#1F1F1F",
                margin: "0 0 4px 0",
              }}
            >
              <span style={{ color: "#F59E0B" }}>طلابین</span> پلتفرم امن خرید و
            </h3>
            <p style={{ fontSize: "17px", fontWeight: 700, color: "#1F1F1F", margin: 0 }}>
              فروش طلای آب‌شده
            </p>
          </div>
        </div>

        {/* Two Column Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "16px" }}>
          {/* Installment Card */}
          <Link
            href="/dashboard/installment"
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "20px",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div style={{ fontSize: "48px" }}>📅</div>
            <h4
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#1F1F1F",
                margin: 0,
                textAlign: "center",
              }}
            >
              خرید قسطی
            </h4>
          </Link>

          {/* Price Card */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 5.33337L8 1.33337L14 5.33337V11.3334C14 11.687 13.8595 12.0261 13.6095 12.2762C13.3594 12.5262 13.0203 12.6667 12.6667 12.6667H3.33333C2.97971 12.6667 2.64057 12.5262 2.39052 12.2762C2.14048 12.0261 2 11.687 2 11.3334V5.33337Z"
                  stroke="#FDB022"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span style={{ fontSize: "12px", color: "#6B7280" }}>قیمت طلا</span>
            </div>
            <div>
              <span style={{ fontSize: "11px", color: "#6B7280" }}>هرگرم</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "18px", fontWeight: 700, color: "#1F1F1F" }}>
                {currentPrice.toLocaleString()}
              </span>
              <span style={{ fontSize: "11px", color: "#6B7280" }}>تومان</span>
            </div>
            <div style={{ fontSize: "10px", color: "#4ADE80" }}>
              ↑ 2.41% تغییر 24 ساعته
            </div>
          </div>
        </div>

        {/* Physical Charge Card */}
        <Link
          href="/dashboard/physical-receipt"
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "24px",
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div style={{ fontSize: "56px" }}>📦</div>
          <div>
            <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#1F1F1F", margin: "0 0 4px 0" }}>
              شارژ فیزیکی
            </h4>
            <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
              تبدیل طلای فیزیکی به دیجیتال
            </p>
          </div>
        </Link>

        {/* Savings Card */}
        <Link
          href="/dashboard/savings"
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "24px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div style={{ fontSize: "56px" }}>💰</div>
          <div>
            <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#1F1F1F", margin: "0 0 4px 0" }}>
              کسب درآمد
            </h4>
            <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
              پس‌انداز و دریافت سود
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
