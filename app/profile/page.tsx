"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Icon } from "@/components/Icon";
import { KYCStatus } from "@/components/kyc/KYCStatus";
import { authService } from "@/lib/api/auth";
import { AuthGuard } from "@/components/AuthGuard";

const menuItems = [
  { id: "details", label: "مشخصات کاربری", icon: "personalcard", href: "/profile/details" },
  { id: "history", label: "تاریخچه سفارشات", icon: "copy", href: "/profile/history" },
  { id: "cards", label: "حساب های بانکی", icon: "card", href: "/profile/cards" },
  { id: "messages", label: "پیام ها", icon: "ticket-star", href: "/profile/messages", badge: "۲" },
  { id: "password", label: "تغییر رمز عبور", icon: "copy", href: "/profile/password" },
  { id: "licenses", label: "مجوزها", icon: "ticket-star", href: "/profile/licenses" },
  { id: "terms", label: "قوانین و مقررات", icon: "copy", href: "/profile/terms" },
  { id: "faq", label: "سوالات متداول", icon: "ticket-star", href: "/profile/faq" },
  { id: "support", label: "پشتیبانی", icon: "ticket-star", href: "/profile/support" },
];

export default function ProfilePage() {
  const router = useRouter();
  // Mock KYC status - in real app this would come from API
  const [kycStatus, setKycStatus] = useState<"not_started" | "pending" | "verified" | "rejected">("not_started");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authService.logout();
      window.dispatchEvent(new Event('authChange'));
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      router.push('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50" style={{ padding: "20px 16px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", gap: "12px" }}>
          <Link
            href="/dashboard"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            ‹
          </Link>
          <h1 style={{ fontSize: "20px", fontWeight: 600, flex: 1 }}>حساب کاربری</h1>
        </div>

        {/* User Info Card */}
        <Card style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FFC857 0%, #FFD666 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: 700,
                color: "#1C1C1C",
              }}
            >
              س
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <div style={{ fontSize: "16px", fontWeight: 600 }}>
                  سعید سعیدی
                </div>
                {kycStatus === "verified" && (
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "rgba(16, 185, 129, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      color: "#10B981",
                    }}
                  >
                    ✓
                  </div>
                )}
              </div>
              <div style={{ marginBottom: "6px" }}>
                <KYCStatus status={kycStatus} size="small" />
              </div>
              <div style={{ fontSize: "13px", color: "var(--color-muted)" }}>
                ۰۹۱۲۰۰۰۵۵۵۳
              </div>
              {kycStatus !== "verified" && (
                <Link
                  href="/kyc"
                  style={{
                    display: "inline-block",
                    marginTop: "6px",
                    fontSize: "12px",
                    color: "var(--color-primary)",
                    textDecoration: "underline",
                  }}
                >
                  {kycStatus === "not_started" && "تکمیل احراز هویت"}
                  {kycStatus === "pending" && "مشاهده وضعیت"}
                  {kycStatus === "rejected" && "تلاش مجدد"}
                </Link>
              )}
            </div>
          </div>
        </Card>

        {/* Menu Items */}
        <Card style={{ padding: "0", overflow: "hidden", marginBottom: "16px" }}>
          {menuItems.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              className="profile-menu-item"
              style={{
                borderBottom:
                  index < menuItems.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
                <div className="profile-menu-icon">
                  <Icon name={item.icon} variant="bulk" size={20} />
                </div>
                <span className="profile-menu-label">{item.label}</span>
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
              <div className="profile-menu-arrow">‹</div>
            </Link>
          ))}
        </Card>

        {/* Logout Button */}
        <Button
          variant="outline"
          fullWidth
          style={{
            color: "#EF4444",
            borderColor: "#EF4444",
            padding: "16px",
            fontSize: "15px",
            fontWeight: 600,
          }}
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "در حال خروج..." : "خروج از حساب کاربری"}
        </Button>
      </div>
    </div>
    </AuthGuard>
  );
}
