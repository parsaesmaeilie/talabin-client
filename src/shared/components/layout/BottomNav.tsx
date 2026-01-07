"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  id: string;
  href: string;
  icon: string;
    activeIcon: string; // حالت فعال (رنگی)

}

export function BottomNav() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { id: "home", href: "/dashboard", icon: "/icons/home.svg",activeIcon: "/icons/home-active.svg" },
    { id: "easy-buy", href: "/dashboard/buy-sell", icon: "/icons/buy.svg",activeIcon: "/icons/buy-active.svg" },
    { id: "services", href: "/dashboard/services", icon: "/icons/service.svg" ,activeIcon: "/icons/service-active.svg"},
    { id: "wallet", href: "/dashboard/wallet", icon: "/icons/wallet.svg" ,activeIcon: "/icons/wallet-active.svg"},
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
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <img
              src={active ? item.activeIcon:item.icon}
              alt=""
              style={{
                width: 75,
                height: 60,
  
                transition: "transform 0.2s ease",
                transform: active ? "scale(1.2)" : "scale(1)",
              }}
            />
          </Link>
        );
      })}
    </nav>
  );
}
