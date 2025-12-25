"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";

const navItems = [
  { id: "home", label: "خانه", icon: "home", href: "/dashboard" },
  { id: "buy-sell", label: "خرید/فروش", icon: "money-tick", href: "/dashboard/buy-sell" },
  { id: "services", label: "خدمات", icon: "grid", href: "/dashboard/services" },
  { id: "wallet", label: "کیف‌پول", icon: "wallet", href: "/dashboard/wallet" },
];

export const BottomNavigation: React.FC = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav className="bottom-nav bottom-nav-enter">
      {navItems.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={`bottom-nav-item ${isActive(item.href) ? "active" : ""}`}
        >
          <div className="bottom-nav-icon">
            <Icon name={item.icon} variant="bulk" size={24} />
          </div>
          <span className="bottom-nav-label">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};
