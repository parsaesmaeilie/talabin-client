"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
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
    <div className="min-h-screen" style={{ padding: "16px 12px 80px" }}>
      <h1
        style={{
          fontSize: "18px",
          fontWeight: 600,
          margin: "8px 0 6px",
        }}
      >
        قیمت لحظه‌ای طلا و سکه
      </h1>
      <p
        style={{
          fontSize: "13px",
          color: "var(--color-muted)",
          margin: "0 0 16px",
        }}
      >
        قیمت‌های به‌روز شده هر دقیقه
      </p>

      <div className="grid grid-3" style={{ gap: "12px" }}>
        {prices.map((price, index) => (
          <Card key={index} style={{ padding: "16px 14px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <h2
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  margin: 0,
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
                background: "var(--color-soft)",
                borderRadius: "var(--radius-md)",
                padding: "12px 10px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--color-muted)",
                  marginBottom: "4px",
                }}
              >
                نرخ فعلی
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                }}
              >
                {price.currentRate.toLocaleString()}
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 400,
                    color: "var(--color-muted)",
                    marginRight: "4px",
                  }}
                >
                  {price.name === "انس جهانی طلا" ? "دلار" : "تومان"}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gap: "6px",
                fontSize: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 8px",
                  background: "rgba(0,0,0,0.02)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <span style={{ color: "var(--color-muted)" }}>بالاترین</span>
                <span>{price.highRate.toLocaleString()}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 8px",
                  background: "rgba(0,0,0,0.02)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <span style={{ color: "var(--color-muted)" }}>پایین‌ترین</span>
                <span>{price.lowRate.toLocaleString()}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 8px",
                  background: "rgba(0,0,0,0.02)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <span style={{ color: "var(--color-muted)" }}>نوسان</span>
                <span>
                  {price.maxFluctuation.toLocaleString()} (
                  {price.maxFluctuationPercent}٪)
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 8px",
                  background: "rgba(0,0,0,0.02)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <span style={{ color: "var(--color-muted)" }}>
                  آخرین به‌روزرسانی
                </span>
                <span style={{ fontSize: "11px" }}>{price.lastUpdate}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
