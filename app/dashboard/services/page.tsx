"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", background: "#EDEDED" }}>
      {/* Responsive Container */}
      <div className="app-container desktop-shadow" style={{ paddingBottom: "100px" }}>
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

      {/* Bottom Navigation */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "428px",
        background: "#1C1C1C",
        borderRadius: "24px 24px 0 0",
        padding: "12px 8px",
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
        zIndex: 100,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
      }}>
        <Link href="/dashboard/wallet" style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          padding: "8px 12px",
          borderRadius: "12px",
          color: "rgba(255, 255, 255, 0.6)",
          textDecoration: "none",
          transition: "all 0.2s",
          flex: 1,
          maxWidth: "100px"
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.5 12.41V7.84C2.5 6.65 3.23 5.59 4.34 5.17L12.28 2.17C13.52 1.70 14.85 2.62 14.85 3.95V7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: "11px", fontWeight: 500 }}>کیف‌پول</span>
        </Link>

        <Link href="/dashboard/buy-sell" style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          padding: "8px 12px",
          borderRadius: "12px",
          color: "rgba(255, 255, 255, 0.6)",
          textDecoration: "none",
          transition: "all 0.2s",
          flex: 1,
          maxWidth: "100px"
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M2 2V19C2 20.66 3.34 22 5 22H22" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 17L9.59 11.64C10.35 10.76 11.7 10.7 12.52 11.53L13.47 12.48C14.29 13.3 15.64 13.25 16.4 12.37L21 7" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: "11px", fontWeight: 500 }}>خرید‌آسان</span>
        </Link>

        <Link href="/dashboard/services" style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          padding: "8px 12px",
          borderRadius: "12px",
          color: "#FFC857",
          background: "rgba(255, 200, 87, 0.1)",
          textDecoration: "none",
          transition: "all 0.2s",
          flex: 1,
          maxWidth: "100px"
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M10.75 2.45C11.44 1.86 12.57 1.86 13.27 2.45L14.85 3.81C15.15 4.07 15.71 4.28 16.11 4.28H17.81C18.87 4.28 19.74 5.15 19.74 6.21V7.91C19.74 8.3 19.95 8.87 20.21 9.17L21.57 10.75C22.16 11.44 22.16 12.57 21.57 13.27L20.21 14.85C19.95 15.15 19.74 15.71 19.74 16.11V17.81C19.74 18.87 18.87 19.74 17.81 19.74H16.11C15.72 19.74 15.15 19.95 14.85 20.21L13.27 21.57C12.58 22.16 11.45 22.16 10.75 21.57L9.17 20.21C8.87 19.95 8.31 19.74 7.91 19.74H6.18C5.12 19.74 4.25 18.87 4.25 17.81V16.1C4.25 15.71 4.04 15.15 3.79 14.85L2.44 13.26C1.86 12.57 1.86 11.45 2.44 10.76L3.79 9.17C4.04 8.87 4.25 8.3 4.25 7.91V6.20C4.25 5.14 5.12 4.27 6.18 4.27H7.91C8.3 4.27 8.87 4.06 9.17 3.80L10.75 2.45Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: "11px", fontWeight: 500 }}>خدمات</span>
        </Link>

        <Link href="/dashboard" style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          padding: "8px 12px",
          borderRadius: "12px",
          color: "rgba(255, 255, 255, 0.6)",
          textDecoration: "none",
          transition: "all 0.2s",
          flex: 1,
          maxWidth: "100px"
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9.02 2.84L3.63 7.04C2.73 7.74 2 9.23 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.29 21.19 7.74 20.2 7.05L14.02 2.72C12.62 1.74 10.37 1.79 9.02 2.84Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 17.99V14.99" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: "11px", fontWeight: 500 }}>خانه</span>
        </Link>
      </div>
      {/* Close Responsive Container */}
      </div>
    </div>
  );
}
