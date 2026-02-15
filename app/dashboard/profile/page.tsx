"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const menuItems = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M8 2V5" stroke="#1C1C1C" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 2V5" stroke="#1C1C1C" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.5 9.09H20.5" stroke="#1C1C1C" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#1C1C1C" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.9955 13.7H12.0045" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.29431 13.7H8.30329" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.29431 16.7H8.30329" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "تراکنش‌های من",
      href: "/dashboard/wallet/history",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "اطلاعات شخصی",
      href: "/dashboard/profile/personal-info",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M2 8.5H22" stroke="#1C1C1C" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 16.5H8" stroke="#1C1C1C" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.5 16.5H14.5" stroke="#1C1C1C" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6.44 3.5H17.55C21.11 3.5 22 4.39 22 7.95V16.05C22 19.61 21.11 20.5 17.56 20.5H6.44C2.89 20.5 2 19.61 2 16.05V7.95C2 4.39 2.89 3.5 6.44 3.5Z" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "حساب‌های بانکی",
      href: "/dashboard/profile/bank-accounts",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "امنیت و رمز عبور",
      href: "/dashboard/profile/security",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8V13" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.9945 16H12.0035" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "پشتیبانی",
      href: "/dashboard/support",
    },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FAFAFA",
      paddingBottom: "100px"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1C1C1C 0%, #2A2A2A 100%)",
        padding: "24px 16px 40px",
        borderRadius: "0 0 24px 24px",
        marginBottom: "16px"
      }}>
        {/* User Info */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "24px"
        }}>
          {/* Avatar */}
          <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "#FFC857",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: 700,
            color: "#1C1C1C",
            flexShrink: 0
          }}>
            {user?.first_name ? user.first_name.charAt(0) : "U"}
          </div>

          {/* User Details */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "4px"
            }}>
              {user?.first_name && user?.last_name
                ? `${user.first_name} ${user.last_name}`
                : "کاربر گرامی"}
            </div>
            <div style={{
              fontSize: "13px",
              color: "rgba(255, 255, 255, 0.7)",
              direction: "ltr",
              textAlign: "right"
            }}>
              {user?.phone_number || ""}
            </div>
          </div>

          {/* Edit Button */}
          <Link href="/dashboard/profile/edit" style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            flexShrink: 0
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.04 3.02001L8.16 10.9C7.86 11.2 7.56 11.79 7.5 12.22L7.07 15.23C6.91 16.32 7.68 17.08 8.77 16.93L11.78 16.5C12.2 16.44 12.79 16.14 13.1 15.84L20.98 7.96001C22.34 6.60001 22.98 5.02001 20.98 3.02001C18.98 1.02001 17.4 1.66001 16.04 3.02001Z" stroke="#FFFFFF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.91 4.1499C15.58 6.5399 17.45 8.4099 19.85 9.0899" stroke="#FFFFFF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* Menu Items */}
      <div style={{
        padding: "0 16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      }}>
        {menuItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              textDecoration: "none",
              border: "1px solid rgba(0,0,0,0.04)",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FAFAFA";
              e.currentTarget.style.transform = "translateX(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFFFFF";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            {/* Icon */}
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "rgba(255, 200, 87, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              {item.icon}
            </div>

            {/* Title */}
            <div style={{
              flex: 1,
              fontSize: "15px",
              fontWeight: 600,
              color: "#1C1C1C",
              textAlign: "right"
            }}>
              {item.title}
            </div>

            {/* Arrow */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 19L8 12L15 5" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            cursor: "pointer",
            marginTop: "16px",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#FFFFFF";
          }}
        >
          {/* Icon */}
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "rgba(239, 68, 68, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8.90002 7.56023C9.21002 3.96023 11.06 2.49023 15.11 2.49023H15.24C19.71 2.49023 21.5 4.28023 21.5 8.75023V15.2702C21.5 19.7402 19.71 21.5302 15.24 21.5302H15.11C11.09 21.5302 9.24002 20.0802 8.91002 16.5402" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 12H3.62" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.85 8.65027L2.5 12.0003L5.85 15.3503" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Title */}
          <div style={{
            flex: 1,
            fontSize: "15px",
            fontWeight: 600,
            color: "#EF4444",
            textAlign: "right"
          }}>
            خروج از حساب کاربری
          </div>

          {/* Arrow */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 19L8 12L15 5" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
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
          color: "rgba(255, 255, 255, 0.6)",
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
    </div>
  );
}
