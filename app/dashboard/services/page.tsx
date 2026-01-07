"use client";

import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: 'installment',
    title: 'خرید قسطی طلا',
    illustration: '/assets/illustrations/IMG_7814 1-008.png',
    href: '/dashboard/installment',
  },
  {
    id: 'physical-receipt',
    title: 'دریافت فیزیکی طلا',
    illustration: '/assets/illustrations/IMG_7820 1-002.png',
    href: '/dashboard/physical-receipt',
  },
  {
    id: 'savings',
    title: 'پس‌انداز',
    illustration: '/assets/illustrations/IMG_7882 1-004.png',
    href: '/dashboard/savings',
  },
  {
    id: 'physical-charge',
    title: 'شارژ فیزیکی',
    illustration: '/assets/illustrations/IMG_7818 2-003.png',
    href: '/dashboard/physical-charge',
  },
  {
    id: 'gift',
    title: 'کارت هدیه',
    illustration: '/assets/illustrations/Rectangle 974-012.png',
    href: '/dashboard/gift',
    badge: 'بزودی',
  },
];

export default function ServicesPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#EDEDED",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      {/* Hero Banner */}
      <div style={{
        background: "linear-gradient(135deg, #FFF7E6 0%, #FFFBF0 100%)",
        borderRadius: "0 0 24px 24px",
        padding: "24px 16px",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)"
      }}>
        <div style={{
          width: "100px",
          height: "100px",
          flexShrink: 0
        }}>
          <Image
            src="/assets/illustrations/Rectangle 975-010.png"
            alt="Vault"
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#1C1C1C",
            lineHeight: 1.6,
            textAlign: "right"
          }}>
            <span style={{ color: "#FDB022" }}>طلابین</span> پلتفرم امن خرید و فروش طلای آب‌شده
          </div>
        </div>
      </div>

      {/* Services List */}
      <div style={{
        padding: "0 16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px"
      }}>
        {services.map((service) => (
          <Link
            key={service.id}
            href={service.href}
            style={{ textDecoration: "none" }}
          >
            <div style={{
              background: "#F5F5F5",
              borderRadius: "20px",
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              transition: "all 0.3s",
              cursor: "pointer",
              border: "1px solid transparent",
              position: "relative"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FFFFFF";
              e.currentTarget.style.borderColor = "rgba(255, 200, 87, 0.3)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#F5F5F5";
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}>
              {/* Illustration */}
              <div style={{
                width: "80px",
                height: "80px",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Image
                  src={service.illustration}
                  alt={service.title}
                  width={80}
                  height={80}
                  style={{ objectFit: "contain" }}
                />
              </div>

              {/* Title */}
              <div style={{
                flex: 1,
                fontSize: "16px",
                fontWeight: 600,
                color: "#1C1C1C",
                textAlign: "right"
              }}>
                {service.title}
              </div>

              {/* Arrow */}
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 19L8 12L15 5" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Badge */}
              {service.badge && (
                <div style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  background: "#FFC857",
                  color: "#1C1C1C",
                  fontSize: "10px",
                  fontWeight: 600,
                  padding: "4px 8px",
                  borderRadius: "999px"
                }}>
                  {service.badge}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
