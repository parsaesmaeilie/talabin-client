"use client";

import Link from "next/link";
import { ServiceCard } from "@/components/ServiceCard";
import { HeroBanner } from "@/components/dashboard/HeroBanner";

const services = [
  {
    id: "installment",
    title: "خرید قسطی طلا",
    description: "خرید طلا به صورت اقساطی",
    illustration: "📅",
    href: "/dashboard/installment",
    color: "#FDB022",
  },
  {
    id: "physical-receipt",
    title: "دریافت فیزیکی طلا",
    description: "تحویل طلای فیزیکی",
    illustration: "📦",
    href: "/dashboard/physical-receipt",
    color: "#10B981",
  },
  {
    id: "savings",
    title: "پس‌انداز طلا",
    description: "سرمایه‌گذاری و پس‌انداز",
    illustration: "🐷",
    href: "/dashboard/savings",
    color: "#3B82F6",
  },
  {
    id: "physical-charge",
    title: "شارژ فیزیکی",
    description: "شارژ حساب با طلای فیزیکی",
    illustration: "🏦",
    href: "/dashboard/physical-charge",
    color: "#8B5CF6",
  },
  {
    id: "gift",
    title: "کارت هدیه",
    description: "ارسال هدیه به دیگران",
    illustration: "🎁",
    href: "/dashboard/gift",
    badge: "به‌زودی",
    color: "#EF4444",
    disabled: true,
  },
];

export default function ServicesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", paddingBottom: "100px" }}>
      {/* Header */}
      <div
        style={{
          background: "#FFFFFF",
          padding: "clamp(14px, 4vw, 16px)",
          display: "flex",
          alignItems: "center",
          gap: "clamp(10px, 3vw, 12px)",
          marginBottom: "clamp(12px, 4vw, 16px)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Link href="/dashboard">
          <div
            style={{
              width: "clamp(38px, 10vw, 40px)",
              height: "clamp(38px, 10vw, 40px)",
              borderRadius: "12px",
              background: "#F5F5F5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19L8 12L15 5"
                stroke="#1F1F1F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Link>
        <h1 style={{ fontSize: "clamp(16px, 4.5vw, 18px)", fontWeight: 700, flex: 1, color: "#1F1F1F", margin: 0 }}>
          خدمات
        </h1>
      </div>

      {/* Content */}
      <div style={{ padding: "0 clamp(12px, 4vw, 16px) clamp(12px, 4vw, 16px)", maxWidth: "600px", margin: "0 auto" }}>
        {/* Hero Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #FFF4E1 0%, #FFFBF0 100%)",
            borderRadius: "clamp(20px, 5vw, 24px)",
            padding: "clamp(20px, 5.5vw, 24px)",
            marginBottom: "clamp(16px, 5vw, 20px)",
            display: "flex",
            alignItems: "center",
            gap: "clamp(14px, 4vw, 18px)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
            animation: "slideInUp 0.4s ease-out",
          }}
        >
          <div style={{ fontSize: "clamp(48px, 15vw, 64px)" }}>🏦</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "clamp(14px, 4vw, 16px)", fontWeight: 700, marginBottom: "4px", color: "#1F1F1F" }}>
              طلابین
            </div>
            <div style={{ fontSize: "clamp(11px, 3vw, 12px)", color: "#6B7280", lineHeight: 1.5 }}>
              پلتفرم امن خرید و فروش طلای آب‌شده
            </div>
          </div>
        </div>

        {/* Services Section Header */}
        <div style={{ marginBottom: "clamp(14px, 4vw, 16px)" }}>
          <h2 style={{ fontSize: "clamp(14px, 4vw, 15px)", fontWeight: 700, color: "#1F1F1F", margin: "0 0 6px 0" }}>
            خدمات ویژه
          </h2>
          <p style={{ fontSize: "clamp(11px, 3vw, 12px)", color: "#6B7280", margin: 0 }}>
            از خدمات زیر استفاده کنید
          </p>
        </div>

        {/* Service Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(clamp(280px, 90vw, 100%), 1fr))",
            gap: "clamp(10px, 3vw, 12px)",
          }}
        >
          {services.map((service, index) => (
            <Link
              key={service.id}
              href={service.disabled ? "#" : service.href}
              style={{
                textDecoration: "none",
                opacity: service.disabled ? 0.6 : 1,
                pointerEvents: service.disabled ? "none" : "auto",
                animation: `slideInUp ${0.4 + index * 0.1}s ease-out`,
              }}
            >
              <div
                className="service-card-enhanced"
                style={{
                  background: "#FFFFFF",
                  borderRadius: "clamp(18px, 5vw, 20px)",
                  padding: "clamp(18px, 5vw, 20px)",
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(12px, 3.5vw, 16px)",
                  cursor: service.disabled ? "not-allowed" : "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  border: "2px solid transparent",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Colored accent line */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "4px",
                    background: service.color,
                    opacity: 0.8,
                  }}
                />

                {/* Illustration */}
                <div
                  style={{
                    fontSize: "clamp(44px, 14vw, 56px)",
                    flexShrink: 0,
                    width: "clamp(60px, 18vw, 72px)",
                    height: "clamp(60px, 18vw, 72px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "16px",
                    background: `${service.color}15`,
                  }}
                >
                  {service.illustration}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <h3
                      style={{
                        fontSize: "clamp(14px, 4vw, 16px)",
                        fontWeight: 700,
                        color: "#1F1F1F",
                        margin: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {service.title}
                    </h3>
                    {service.badge && (
                      <span
                        style={{
                          background: "#FDB022",
                          color: "#FFFFFF",
                          fontSize: "clamp(9px, 2.5vw, 10px)",
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: "999px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: "clamp(11px, 3vw, 12px)",
                      color: "#6B7280",
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Arrow */}
                <div style={{ fontSize: "clamp(20px, 6vw, 24px)", color: "#9CA3AF", flexShrink: 0 }}>
                  ‹
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Help Section */}
        <div
          style={{
            marginTop: "clamp(20px, 6vw, 24px)",
            background: "#F8F9FA",
            borderRadius: "clamp(16px, 4.5vw, 18px)",
            padding: "clamp(16px, 4.5vw, 18px) clamp(18px, 5vw, 20px)",
            border: "1px solid #E5E7EB",
            animation: "slideInUp 0.8s ease-out",
          }}
        >
          <div style={{ display: "flex", alignItems: "start", gap: "clamp(10px, 3vw, 12px)" }}>
            <div style={{ fontSize: "clamp(20px, 6vw, 24px)", flexShrink: 0 }}>💬</div>
            <div>
              <h4 style={{ fontSize: "clamp(13px, 3.5vw, 14px)", fontWeight: 700, margin: "0 0 6px", color: "#1F1F1F" }}>
                نیاز به راهنمایی دارید؟
              </h4>
              <p style={{ fontSize: "clamp(11px, 3vw, 12px)", color: "#6B7280", margin: "0 0 12px", lineHeight: 1.6 }}>
                تیم پشتیبانی ما آماده است تا به سوالات شما پاسخ دهد.
              </p>
              <Link
                href="/dashboard/support"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  background: "#1F1F1F",
                  color: "#FFFFFF",
                  borderRadius: "10px",
                  fontSize: "clamp(12px, 3.2vw, 13px)",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                تماس با پشتیبانی
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (hover: hover) {
          .service-card-enhanced:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
            border-color: rgba(253, 176, 34, 0.3);
          }
        }

        .service-card-enhanced:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}
