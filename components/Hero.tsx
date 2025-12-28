"use client";

import React from "react";
import { Button } from "./Button";
import Image from "next/image";

export const Hero: React.FC = () => {
  return (
    <section className="hero" style={{ position: "relative", overflow: "hidden" }}>
      {/* Background decorative element */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "400px",
          height: "400px",
          opacity: 0.1,
          zIndex: 0,
        }}
      >
        <Image
          src="/assets/illustrations/Ellipse 3871-001.png"
          alt=""
          width={400}
          height={400}
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          className="grid"
          style={{
            gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1.2fr)",
            gap: "32px",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 10px",
                borderRadius: "999px",
                background: "rgba(255, 200, 87, 0.17)",
                fontSize: "12px",
                marginBottom: "14px",
              }}
            >
              <span>طلای دیجیتال با پشتوانه واقعی</span>
              <span>•</span>
              <span>خزانه بانک کارگشایی</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(24px, 5vw, 32px)",
                lineHeight: 1.4,
                margin: "0 0 12px",
                fontWeight: 700,
              }}
            >
              سرمایه‌گذاری روی طلا، ساده برای تازه‌کارها؛ مطمئن برای حرفه‌ای‌ها
            </h1>

            <p
              style={{
                margin: "0 0 16px",
                color: "rgba(28, 28, 28, 0.7)",
                fontSize: "14px",
                lineHeight: 1.9,
              }}
            >
              در طلابین هر واحد طلای دیجیتال با طلای واقعی در خزانه{" "}
              <strong>بانک کارگشایی</strong> پشتیبانی می‌شود. از{" "}
              <strong>۱۰۰ هزار تومان</strong> شروع کن، ۲۴ ساعته معامله کن و هر زمان
              خواستی طلای خودت را به‌صورت <strong>فیزیکی دریافت</strong> یا نقد
              کنی.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginBottom: "16px",
                fontSize: "11px",
              }}
            >
              <span className="pill-badge">حداقل خرید: ۱۰۰,۰۰۰ تومان</span>
              <span className="pill-badge">کارمزد ثابت معامله: ۰٫۵٪</span>
              <span className="pill-badge">
                دارای اینماد و مجوز فروش طلای آب‌شده
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "18px",
              }}
            >
              <Button variant="primary" asLink href="/register">
                شروع سرمایه‌گذاری
              </Button>
              <Button variant="ghost" asLink href="#how-it-works">
                طلابین چطور کار می‌کند؟
              </Button>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                fontSize: "12px",
                color: "rgba(28, 28, 28, 0.6)",
              }}
            >
              <span>✓ پشتیبانی ۲۴ ساعته</span>
              <span>✓ نگهداری امن در خزانه بانکی</span>
              <span>✓ مناسب برای سرمایه‌گذاران و تازه‌کارها</span>
            </div>

            {/* Product showcase grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "8px",
                marginTop: "20px",
              }}
            >
              {[
                "IMG_7820 1-002.png",
                "IMG_7818 2-003.png",
                "IMG_7882 1-004.png",
                "IMG_7812 1-005.png",
              ].map((img, idx) => (
                <div
                  key={idx}
                  style={{
                    position: "relative",
                    aspectRatio: "1",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    border: "1px solid rgba(0,0,0,0.06)",
                    background: "var(--color-bg)",
                  }}
                >
                  <Image
                    src={`/assets/illustrations/${img}`}
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>

          <aside
            className="card"
            style={{
              background: "var(--color-soft)",
              padding: "18px 16px",
              display: "grid",
              gap: "14px",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "13px",
                  color: "rgba(28, 28, 28, 0.7)",
                }}
              >
                <span>طلای ۱۸ عیار</span>
                <span>به‌روزرسانی لحظه‌ای</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginTop: "6px",
                }}
              >
                <div style={{ fontSize: "20px", fontWeight: 700 }}>
                  ۲,۹۸۰,۰۰۰{" "}
                  <span style={{ fontSize: "12px", fontWeight: 400 }}>تومان</span>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    padding: "3px 8px",
                    borderRadius: "999px",
                    background: "rgba(29, 191, 115, 0.08)",
                    color: "#1DBF73",
                  }}
                >
                  + ۰٫۸٪ امروز
                </div>
              </div>
            </div>

            <div
              className="grid-2"
              style={{ fontSize: "11px", gap: "8px" }}
            >
              <div
                style={{
                  borderRadius: "var(--radius-sm)",
                  padding: "8px 9px",
                  background: "rgba(250, 249, 246, 0.9)",
                  border: "1px solid rgba(0,0,0,0.03)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "rgba(28,28,28,0.6)" }}>کمترین امروز</span>
                <span style={{ fontWeight: 500 }}>۲,۹۶۰,۰۰۰</span>
              </div>
              <div
                style={{
                  borderRadius: "var(--radius-sm)",
                  padding: "8px 9px",
                  background: "rgba(250, 249, 246, 0.9)",
                  border: "1px solid rgba(0,0,0,0.03)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "rgba(28,28,28,0.6)" }}>بیشترین امروز</span>
                <span style={{ fontWeight: 500 }}>۳,۰۱۰,۰۰۰</span>
              </div>
              <div
                style={{
                  borderRadius: "var(--radius-sm)",
                  padding: "8px 9px",
                  background: "rgba(250, 249, 246, 0.9)",
                  border: "1px solid rgba(0,0,0,0.03)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "rgba(28,28,28,0.6)" }}>کارمزد خرید</span>
                <span style={{ fontWeight: 500 }}>۰٫۵٪</span>
              </div>
              <div
                style={{
                  borderRadius: "var(--radius-sm)",
                  padding: "8px 9px",
                  background: "rgba(250, 249, 246, 0.9)",
                  border: "1px solid rgba(0,0,0,0.03)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "rgba(28,28,28,0.6)" }}>کارمزد فروش</span>
                <span style={{ fontWeight: 500 }}>۰٫۵٪</span>
              </div>
            </div>

            <Button variant="primary" fullWidth style={{ marginTop: "6px" }} asLink href="/login">
              ورود به معامله لحظه‌ای
            </Button>
          </aside>
        </div>
      </div>
    </section>
  );
};
