"use client";

import Link from "next/link";
import { TopBar } from "@/components/dashboard/TopBar";
import { ActionGrid } from "@/components/dashboard/ActionGrid";
import { HeroBanner } from "@/components/dashboard/HeroBanner";
import { InstallmentCard } from "@/components/dashboard/InstallmentCard";
import { PriceCard } from "@/components/dashboard/PriceCard";
import { KYCBanner } from "@/components/dashboard/KYCBanner";
import { AuthGuard } from "@/components/AuthGuard";

export default function Dashboard() {
  return (
    <AuthGuard>
      <div className="min-h-screen" style={{ padding: "20px 16px", background: "#F5F5F5" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Top Bar: Notification + Logo + Profile */}
        <TopBar />

        {/* KYC Banner - Show when not verified */}
        <KYCBanner />

        {/* Balance Card - Matching mockup exactly */}
        <div
          className="card"
          style={{
            marginBottom: "16px",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              border: "1px solid rgba(0,0,0,0.1)",
              background: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            ☰
          </button>

          <div style={{ textAlign: "right", flex: 1, marginRight: "16px" }}>
            <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>
              موجودی طلا
            </div>
            <div style={{ fontSize: "24px", fontWeight: 700, marginBottom: "4px" }}>
              ۵ گرم
            </div>
            <div style={{ fontSize: "13px", color: "var(--color-muted)" }}>
              معادل
              <span style={{ marginRight: "4px" }}>۰ تومان</span>
            </div>
          </div>
        </div>

        {/* 4-Button Action Grid (Dark Card) */}
        <ActionGrid />

        {/* Hero Banner with Vault */}
        <HeroBanner />

        {/* Two-Column Cards */}
        <div className="grid-2" style={{ gap: "16px", marginBottom: "16px" }}>
          <InstallmentCard />
          <PriceCard />
        </div>

        {/* Bottom Feature Cards */}
        <div className="grid-2" style={{ gap: "16px" }}>
          {/* Physical Charge Card */}
          <Link
            href="/dashboard/physical-charge"
            className="card"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px 20px",
              background: "linear-gradient(135deg, #FFF4E1 0%, #FFFFFF 100%)",
              minHeight: "160px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: "12px" }}>🏦</div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: 600,
                textAlign: "center",
                marginBottom: "4px",
              }}
            >
              شارژ فیزیکی
            </div>
          </Link>

          {/* Savings Card */}
          <Link
            href="/dashboard/savings"
            className="card"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px 20px",
              background: "linear-gradient(135deg, #F0FFF4 0%, #FFFFFF 100%)",
              minHeight: "160px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: "12px" }}>💰</div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: 600,
                textAlign: "center",
                marginBottom: "4px",
              }}
            >
              پس‌انداز
            </div>
          </Link>
        </div>
      </div>
    </div>
    </AuthGuard>
  );
}
