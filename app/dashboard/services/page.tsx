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
    <div
      className="min-h-screen"
      style={{ padding: "20px 16px", background: "#F5F5F5" }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
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
