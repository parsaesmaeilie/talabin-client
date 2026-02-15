"use client";

import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: "installment",
    title: "خرید قسطی طلا",
    illustration: "/assets/illustrations/installment.png",
    href: "/dashboard/installment",
  },
  {
    id: "physical-receipt",
    title: "دریافت فیزیکی طلا",
    illustration: "/assets/illustrations/phisici.png",
    href: "/dashboard/physical-receipt",
  },
  {
    id: "savings",
    title: "پس‌انداز",
    illustration: "/assets/illustrations/saving.png",
    href: "/dashboard/savings",
  },
  {
    id: "physical-charge",
    title: "شارژ فیزیکی",
    illustration: "/assets/illustrations/chargePhisici.png",
    href: "/dashboard/physical-charge",
  },
  {
    id: "gift",
    title: "کارت هدیه",
    href: "#",
    badge: "بزودی",
  },
];

export default function ServicesPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #FFF7E6 0%, #FFFBF0 100%)",
          borderRadius: "0 0 28px 28px",
          padding: "28px 16px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Image
          src="/assets/illustrations/Rectangle 975-010.png"
          alt="Vault"
          width={100}
          height={100}
          style={{ objectFit: "contain" }}
        />

        <div
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#1C1C1C",
            lineHeight: 1.7,
            textAlign: "right",
          }}
        >
          <span style={{ color: "#FDB022" }}>طلابین</span> پلتفرم امن خرید و فروش
          طلای آب‌شده
        </div>
      </div>

      {/* Services */}
      <div
        style={{
          padding: "0 16px 40px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
        {services.map((service) => {
          const isGift = service.id === "gift";

          return (
            <Link
              key={service.id}
              href={isGift ? "#" : service.href}
              style={{
                textDecoration: "none",
                pointerEvents: isGift ? "none" : "auto",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "95px",
                  background: isGift ? "#F8F3E8" : "#F2EEE5",
                  borderRadius: "26px",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 18px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                  if (!isGift) {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 25px rgba(0,0,0,0.08)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 18px rgba(0,0,0,0.04)";
                }}
              >
                {/* Floating Image */}
                {/* Floating Image */}
              {!isGift && (
                <div
                  style={{
                    position: "absolute",
                    top: "-28px",
                    right: "18px", // ← این تغییر کرد
                    width: "110px",
                    height: "110px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                  }}
                >
                  <Image
                    src={service.illustration}
                    alt={service.title}
                    width={110}
                    height={110}
                    style={{
                      objectFit: "contain",
                      filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.15))",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </div>
              )}

              {/* Title */}
              <div
                style={{
                  flex: 1,
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "#1C1C1C",
                  textAlign: "right",
                  paddingRight: isGift ? "0" : "120px", // ← این هم راست شد
                }}
              >
                {service.title}
              </div>


                {/* Arrow */}
                {!isGift && (
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M15 19L8 12L15 5"
                        stroke="#1C1C1C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}

                {/* Coming Soon */}
                {isGift && (
                  <div
                    style={{
                      background: "#FFC857",
                      color: "#1C1C1C",
                      fontSize: "12px",
                      fontWeight: 700,
                      padding: "6px 14px",
                      borderRadius: "999px",
                    }}
                  >
                    بزودی
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
