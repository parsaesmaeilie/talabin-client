import React from "react";
import Link from "next/link";

const actions = [
  { id: "buy", label: "خرید طلا", icon: "💰", href: "/dashboard/buy-sell?tab=buy" },
  { id: "sell", label: "فروش طلا", icon: "💎", href: "/dashboard/buy-sell?tab=sell" },
  { id: "earn", label: "کسب‌درآمد", icon: "⭐", href: "/dashboard/earn" },
  { id: "charge", label: "شارژ فیزیکی", icon: "🪙", href: "/dashboard/physical-charge" },
];

export const ActionGrid: React.FC = () => {
  return (
    <div className="action-grid">
      {actions.map((action) => (
        <Link key={action.id} href={action.href} className="action-button">
          <div className="action-button-icon">{action.icon}</div>
          <span className="action-button-label">{action.label}</span>
        </Link>
      ))}
    </div>
  );
};
