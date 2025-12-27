"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/Badge";

type GoldPriceDetail = {
  name: string;
  currentRate: number;
  highRate: number;
  lowRate: number;
  maxFluctuation: number;
  maxFluctuationPercent: number;
  openRate: number;
  lastUpdate: string;
  prevRate: number;
  changePercent: number;
  changeAmount: number;
};

export default function GoldPricesPage() {
  const [prices, setPrices] = useState<GoldPriceDetail[]>([]);

  useEffect(() => {
    const samplePrices: GoldPriceDetail[] = [
      {
        name: "طلای ۱۸ عیار",
        currentRate: 12699000,
        highRate: 12721000,
        lowRate: 12607900,
        maxFluctuation: 39400,
        maxFluctuationPercent: 0.28,
        openRate: 12681600,
        lastUpdate: "۱۹:۰۶:۱۷",
        prevRate: 12679700,
        changePercent: 0.05,
        changeAmount: 6200,
      },
      {
        name: "طلای ۲۱ عیار",
        currentRate: 14850000,
        highRate: 14890000,
        lowRate: 14780000,
        maxFluctuation: 60000,
        maxFluctuationPercent: 0.40,
        openRate: 14810000,
        lastUpdate: "۱۹:۰۶:۲۲",
        prevRate: 14820000,
        changePercent: -0.05,
        changeAmount: -7000,
      },
      {
        name: "طلای ۲۴ عیار",
        currentRate: 16950000,
        highRate: 16990000,
        lowRate: 16870000,
        maxFluctuation: 120000,
        maxFluctuationPercent: 0.71,
        openRate: 16920000,
        lastUpdate: "۱۹:۰۶:۳۰",
        prevRate: 16930000,
        changePercent: 0.12,
        changeAmount: 20000,
      },
      {
        name: "طلای آب‌شده",
        currentRate: 16920000,
        highRate: 16950000,
        lowRate: 16850000,
        maxFluctuation: 100000,
        maxFluctuationPercent: 0.59,
        openRate: 16890000,
        lastUpdate: "۱۹:۰۶:۳۵",
        prevRate: 16900000,
        changePercent: 0.12,
        changeAmount: 20000,
      },
      {
        name: "انس جهانی طلا",
        currentRate: 1960,
        highRate: 1970,
        lowRate: 1950,
        maxFluctuation: 20,
        maxFluctuationPercent: 1.02,
        openRate: 1955,
        lastUpdate: "۱۹:۰۶:۴۰",
        prevRate: 1958,
        changePercent: 0.10,
        changeAmount: 2,
      },
      {
        name: "سکه امامی",
        currentRate: 13750000,
        highRate: 13800000,
        lowRate: 13720000,
        maxFluctuation: 80000,
        maxFluctuationPercent: 0.58,
        openRate: 13730000,
        lastUpdate: "۱۹:۰۶:۴۵",
        prevRate: 13740000,
        changePercent: 0.07,
        changeAmount: 10000,
      },
      {
        name: "ربع سکه",
        currentRate: 4500000,
        highRate: 4600000,
        lowRate: 4450000,
        maxFluctuation: 150000,
        maxFluctuationPercent: 3.33,
        openRate: 4480000,
        lastUpdate: "۱۹:۰۶:۵۰",
        prevRate: 4490000,
        changePercent: 0.22,
        changeAmount: 10000,
      },
      {
        name: "سکه گرمی",
        currentRate: 3000000,
        highRate: 3050000,
        lowRate: 2950000,
        maxFluctuation: 100000,
        maxFluctuationPercent: 3.33,
        openRate: 2980000,
        lastUpdate: "۱۹:۰۶:۵۵",
        prevRate: 2990000,
        changePercent: 0.33,
        changeAmount: 10000,
      },
    ];

    setPrices(samplePrices);

    const interval = setInterval(() => setPrices(samplePrices), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA" }}>
      {/* Header */}
      <div
        style={{
          background: "#FFFFFF",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
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
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "18px", fontWeight: 600, margin: 0, color: "#1F1F1F" }}>
            قیمت لحظه‌ای طلا و سکه
          </h1>
          <p style={{ fontSize: "11px", color: "#6B7280", margin: "2px 0 0" }}>
            قیمت‌های به‌روز شده هر دقیقه
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "0 16px 16px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "12px",
          }}
        >
          {prices.map((price, index) => (
            <div
              key={index}
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    margin: 0,
                    color: "#1F1F1F",
                  }}
                >
                  {price.name}
                </h2>
                <Badge
                  variant={price.changePercent >= 0 ? "green" : "red"}
                >
                  {price.changePercent >= 0 ? "+" : ""}
                  {price.changePercent}٪
                </Badge>
              </div>

              <div
                style={{
                  background: "#FBFAF7",
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    color: "#6B7280",
                    marginBottom: "6px",
                  }}
                >
                  نرخ فعلی
                </div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#1F1F1F",
                  }}
                >
                  {price.currentRate.toLocaleString("fa-IR")}
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 400,
                      color: "#6B7280",
                      marginRight: "6px",
                    }}
                  >
                    {price.name === "انس جهانی طلا" ? "دلار" : "تومان"}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "8px",
                  fontSize: "13px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    background: "#F9FAFB",
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ color: "#6B7280" }}>بالاترین</span>
                  <span style={{ fontWeight: 500, color: "#1F1F1F" }}>
                    {price.highRate.toLocaleString("fa-IR")}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    background: "#F9FAFB",
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ color: "#6B7280" }}>پایین‌ترین</span>
                  <span style={{ fontWeight: 500, color: "#1F1F1F" }}>
                    {price.lowRate.toLocaleString("fa-IR")}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    background: "#F9FAFB",
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ color: "#6B7280" }}>نوسان</span>
                  <span style={{ fontWeight: 500, color: "#1F1F1F" }}>
                    {price.maxFluctuation.toLocaleString("fa-IR")} (
                    {price.maxFluctuationPercent}٪)
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    background: "#F9FAFB",
                    borderRadius: "8px",
                  }}
                >
                  <span style={{ color: "#6B7280" }}>
                    آخرین به‌روزرسانی
                  </span>
                  <span style={{ fontSize: "12px", fontWeight: 500, color: "#1F1F1F" }}>
                    {price.lastUpdate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
