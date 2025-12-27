"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/api/auth";
import { AuthGuard } from "@/components/AuthGuard";

const menuItems = [
  {
    id: "details",
    label: "مشخصات کاربری",
    href: "/profile/details",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10.1334 9.05005C10.05 9.04172 9.95002 9.04172 9.85835 9.05005C7.87502 8.98338 6.30002 7.36672 6.30002 5.36672C6.30002 3.32505 7.94169 1.67505 10 1.67505C12.05 1.67505 13.7 3.32505 13.7 5.36672C13.6917 7.36672 12.1167 8.98338 10.1334 9.05005Z"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.96665 12.1334C3.94999 13.4834 3.94999 15.6834 5.96665 17.025C8.25832 18.5584 12.0166 18.5584 14.3083 17.025C16.325 15.675 16.325 13.475 14.3083 12.1334C12.025 10.6084 8.26665 10.6084 5.96665 12.1334Z"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "history",
    label: "تاریخچه سفارشات",
    href: "/profile/history",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M7.08331 18.3334H12.9166C16.6666 18.3334 18.3333 16.6667 18.3333 12.9167V7.08341C18.3333 3.33341 16.6666 1.66675 12.9166 1.66675H7.08331C3.33331 1.66675 1.66665 3.33341 1.66665 7.08341V12.9167C1.66665 16.6667 3.33331 18.3334 7.08331 18.3334Z"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.0834 7.5H6.91669"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.0834 12.5H6.91669"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "cards",
    label: "حساب های بانکی",
    href: "/profile/cards",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M1.66669 7.70841V12.7084C1.66669 15.8334 2.91669 17.0834 6.04169 17.0834H13.9584C17.0834 17.0834 18.3334 15.8334 18.3334 12.7084V7.70841C18.3334 4.58341 17.0834 3.33341 13.9584 3.33341H6.04169C2.91669 3.33341 1.66669 4.58341 1.66669 7.70841Z"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.66669 8.33341H18.3334"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.66669 13.3334H8.33335"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.8334 13.3334H14.1667"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "messages",
    label: "پیام ها",
    href: "/profile/messages",
    badge: "۲",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M14.1667 15.2917H10.8334L6.67502 18.0167C6.10835 18.3667 5.41669 17.9667 5.41669 17.3V15.2917C2.91669 15.2917 1.25002 13.625 1.25002 11.125V5.95841C1.25002 3.45841 2.91669 1.79175 5.41669 1.79175H14.1667C16.6667 1.79175 18.3334 3.45841 18.3334 5.95841V11.125C18.3334 13.625 16.6667 15.2917 14.1667 15.2917Z"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 9.37508V9.20841C10 8.63341 10.35 8.33342 10.7 8.08342C11.0417 7.84175 11.3834 7.53341 11.3834 6.97508C11.3834 6.20841 10.7667 5.59175 10 5.59175C9.23335 5.59175 8.61669 6.20841 8.61669 6.97508"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.99626 11.4584H10.0038"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "password",
    label: "تغییر رمز عبور",
    href: "/profile/password",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M5.00002 8.33341V6.66675C5.00002 3.90841 5.83335 1.66675 10 1.66675C14.1667 1.66675 15 3.90841 15 6.66675V8.33341"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 15.4167C11.1506 15.4167 12.0834 14.4839 12.0834 13.3334C12.0834 12.1828 11.1506 11.25 10 11.25C8.84943 11.25 7.91669 12.1828 7.91669 13.3334C7.91669 14.4839 8.84943 15.4167 10 15.4167Z"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.1667 18.3334H5.83335C2.50002 18.3334 1.66669 17.5001 1.66669 14.1667V12.5001C1.66669 9.16675 2.50002 8.33341 5.83335 8.33341H14.1667C17.5 8.33341 18.3334 9.16675 18.3334 12.5001V14.1667C18.3334 17.5001 17.5 18.3334 14.1667 18.3334Z"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "licenses",
    label: "مجوزها",
    href: "/profile/licenses",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M7.50002 18.3334H12.5C16.6667 18.3334 18.3334 16.6667 18.3334 12.5V7.50008C18.3334 3.33341 16.6667 1.66675 12.5 1.66675H7.50002C3.33335 1.66675 1.66669 3.33341 1.66669 7.50008V12.5C1.66669 16.6667 3.33335 18.3334 7.50002 18.3334Z"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.08331 10L8.85831 11.775L12.9166 7.72508"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "terms",
    label: "قوانین و مقررات",
    href: "/profile/terms",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M7.08331 18.3334H12.9166C16.6666 18.3334 18.3333 16.6667 18.3333 12.9167V7.08341C18.3333 3.33341 16.6666 1.66675 12.9166 1.66675H7.08331C3.33331 1.66675 1.66665 3.33341 1.66665 7.08341V12.9167C1.66665 16.6667 3.33331 18.3334 7.08331 18.3334Z"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.0834 7.5H6.91669"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.0834 12.5H6.91669"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "faq",
    label: "سوالات متداول",
    href: "/profile/faq",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 18.3334C14.6024 18.3334 18.3334 14.6025 18.3334 10.0001C18.3334 5.39771 14.6024 1.66675 10 1.66675C5.39765 1.66675 1.66669 5.39771 1.66669 10.0001C1.66669 14.6025 5.39765 18.3334 10 18.3334Z"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 13.3334V10.0001"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.99626 6.66675H10.0038"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "support",
    label: "پشتیبانی",
    href: "/profile/support",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M7.50002 8.54175V6.04175C7.50002 3.94175 8.74169 2.91675 10.625 2.91675C12.5084 2.91675 13.75 3.94175 13.75 6.04175V8.54175"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.625 15.4167C11.7336 15.4167 12.6317 14.5186 12.6317 13.41C12.6317 12.3014 11.7336 11.4033 10.625 11.4033C9.51644 11.4033 8.61835 12.3014 8.61835 13.41C8.61835 14.5186 9.51644 15.4167 10.625 15.4167Z"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.75 17.0834H7.50002C3.33335 17.0834 2.08335 15.8334 2.08335 11.6667V13.75C2.08335 9.58341 3.33335 8.33341 7.50002 8.33341H13.75C17.9167 8.33341 19.1667 9.58341 19.1667 13.75C19.1667 17.9167 17.9167 17.0834 13.75 17.0834Z"
          stroke="#6B7280"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const [kycStatus] = useState<"not_started" | "pending" | "verified" | "rejected">("verified");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authService.logout();
      window.dispatchEvent(new Event("authChange"));
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      router.push("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <AuthGuard>
      <div style={{ minHeight: "100vh", background: "#FAFAFA" }}>
        {/* Header */}
        <div
          style={{
            background: "#FFFFFF",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
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
            حساب کاربری
          </h1>
        </div>

        {/* Content */}
        <div style={{ padding: "16px" }}>
          {/* User Info Card */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "16px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #FDB022 0%, #F5A815 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#1F1F1F",
                }}
              >
                س
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "16px", fontWeight: 600, color: "#1F1F1F" }}>
                    سعید سعیدی
                  </span>
                  {kycStatus === "verified" && (
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "#4ADE80",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2.5 6L4.5 8L9.5 3"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div style={{ fontSize: "13px", color: "#6B7280" }}>۰۹۱۲۰۰۰۵۵۵۳</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "0",
              overflow: "hidden",
              marginBottom: "16px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            }}
          >
            {menuItems.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "16px 20px",
                  textDecoration: "none",
                  borderBottom:
                    index < menuItems.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                  transition: "background 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
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
                    {item.icon}
                  </div>
                  <span style={{ fontSize: "14px", fontWeight: 500, color: "#1F1F1F" }}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span
                      style={{
                        background: "#EF4444",
                        color: "white",
                        fontSize: "10px",
                        fontWeight: 600,
                        padding: "2px 6px",
                        borderRadius: "999px",
                        minWidth: "18px",
                        textAlign: "center",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M12.5 15L7.5 10L12.5 5"
                    stroke="#9CA3AF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ))}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "15px",
              fontWeight: 600,
              color: "#EF4444",
              background: "#FFFFFF",
              border: "2px solid #EF4444",
              borderRadius: "16px",
              cursor: isLoggingOut ? "not-allowed" : "pointer",
              opacity: isLoggingOut ? 0.6 : 1,
              transition: "all 0.2s ease",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            }}
          >
            {isLoggingOut ? "در حال خروج..." : "خروج از حساب کاربری"}
          </button>
        </div>
      </div>
    </AuthGuard>
  );
}
