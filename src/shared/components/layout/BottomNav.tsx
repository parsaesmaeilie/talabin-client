"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  id: string;
  href: string;
  icon: string;
  activeIcon: string; // حالت فعال (رنگی)
  label: string; // برچسب متنی
}

export function BottomNav() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { id: "home", href: "/dashboard", icon: "/icons/home.svg", activeIcon: "/icons/home-active.svg", label: "خانه" },
    { id: "easy-buy", href: "/dashboard/buy-sell", icon: "/icons/buy.svg", activeIcon: "/icons/buy-active.svg", label: "خریدآسان" },
    { id: "services", href: "/dashboard/services", icon: "/icons/service.svg", activeIcon: "/icons/service-active.svg", label: "خدمات" },
    { id: "wallet", href: "/dashboard/wallet", icon: "/icons/wallet.svg", activeIcon: "/icons/wallet-active.svg", label: "کیف‌پول" },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 12,
        left: 12,
        right: 12,
        background: "#1F1F1F",
        borderRadius: "24px",
        padding: "12px 16px 16px 16px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "8px",
        backdropFilter: "blur(10px)",
      }}
    >
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.id}
            href={item.href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              gap: "4px",
              textDecoration: "none",
            }}
          >
            <img
              src={active ? item.activeIcon : item.icon}
              alt={item.label}
              style={{
                width: 24,
                height: 24,
                transition: "all 0.2s ease",
                transform: active ? "scale(1.1)" : "scale(1)",
              }}
            />
            <span
              style={{
                fontSize: "10px",
                fontWeight: active ? 600 : 500,
                color: active ? "#FFC857" : "#9CA3AF",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
