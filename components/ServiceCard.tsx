import React from "react";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  illustration: string; // emoji for now
  href: string;
  badge?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  illustration,
  href,
  badge,
}) => {
  return (
    <Link href={href} className="service-card">
      {/* Left arrow */}
      <div style={{ fontSize: "24px", color: "rgba(0,0,0,0.3)", marginLeft: "16px" }}>
        ‹
      </div>

      {/* Title and badge */}
      <div style={{ flex: 1, textAlign: "right" }}>
        <div className="service-card-title">{title}</div>
        {badge && <span className="service-card-badge">{badge}</span>}
      </div>

      {/* Illustration on the RIGHT */}
      <div className="service-card-illustration" style={{ fontSize: "56px", marginRight: "16px" }}>
        {illustration}
      </div>
    </Link>
  );
};
