import Link from "next/link";
import { ServiceCard } from "@/components/ServiceCard";
import { HeroBanner } from "@/components/dashboard/HeroBanner";

const services = [
  {
    id: "installment",
    title: "خرید قسطی طلا",
    illustration: "📅",
    href: "/dashboard/installment",
  },
  {
    id: "physical-receipt",
    title: "دریافت فیزیکی طلا",
    illustration: "📦",
    href: "/dashboard/physical-receipt",
  },
  {
    id: "savings",
    title: "پس انداز",
    illustration: "🐷",
    href: "/dashboard/savings",
  },
  {
    id: "physical-charge",
    title: "شارژ فیزیکی",
    illustration: "🏦",
    href: "/dashboard/physical-charge",
  },
  {
    id: "gift",
    title: "کارت هدیه",
    illustration: "🎁",
    href: "/dashboard/gift",
    badge: "به‌زودی",
  },
];

export default function ServicesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA" }}>
      {/* Header */}
      <div
        style={{
          background: "#FFFFFF",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <Link href="/dashboard">
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "#F5F5F5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
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
        <h1 style={{ fontSize: "18px", fontWeight: 600, flex: 1, color: "#1F1F1F" }}>
          خدمات
        </h1>
      </div>

      {/* Content */}
      <div style={{ padding: "0 16px 16px" }}>
        {/* Hero Banner */}
        <HeroBanner />

        {/* Service Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              illustration={service.illustration}
              href={service.href}
              badge={service.badge}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
