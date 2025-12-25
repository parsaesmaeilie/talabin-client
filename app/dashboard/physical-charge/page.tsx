"use client";

import { useState } from "react";
import Link from "next/link";

export default function PhysicalChargePage() {
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);

  return (
    <div
      className="min-h-screen"
      style={{ padding: "20px 16px 100px", background: "#F5F5F5" }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <Link
            href="/dashboard/services"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            ←
          </Link>
          <h1
            style={{
              fontSize: "18px",
              fontWeight: 700,
              margin: 0,
            }}
          >
            شارژ فیزیکی
          </h1>
          <div
            onClick={() => setShowInstructionsModal(true)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            ⓘ
          </div>
        </div>

        {/* Hero Card */}
        <div
          className="card"
          style={{
            marginBottom: "24px",
            padding: "32px 24px",
            textAlign: "center",
            background: "linear-gradient(135deg, #FFF4E1 0%, #FFFFFF 100%)",
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🏦</div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            شارژ فیزیکی طلا
          </div>
          <div
            style={{
              fontSize: "13px",
              color: "var(--color-muted)",
              marginBottom: "20px",
            }}
          >
            طلای فیزیکی خود را به حساب کاربری‌تان اضافه کنید
          </div>
          <button
            onClick={() => setShowInstructionsModal(true)}
            className="btn btn-primary"
            style={{
              padding: "14px 32px",
              fontSize: "14px",
              borderRadius: "12px",
            }}
          >
            مشاهده راهنما
          </button>
        </div>

        {/* Features */}
        <div
          className="card"
          style={{
            marginBottom: "20px",
            padding: "20px",
          }}
        >
          <div
            style={{
              fontSize: "15px",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            مزایای شارژ فیزیکی
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ fontSize: "24px" }}>✓</div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: "4px", fontSize: "14px" }}>
                  نگهداری ایمن
                </div>
                <div style={{ fontSize: "12px", color: "var(--color-muted)" }}>
                  طلای شما در خزانه‌ امن، نه روی کاغذ، نگهداری می‌شود.
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ fontSize: "24px" }}>✓</div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: "4px", fontSize: "14px" }}>
                  معامله آسان
                </div>
                <div style={{ fontSize: "12px", color: "var(--color-muted)" }}>
                  سریع، شفاف و بدون نیاز به حضور در بازار طلا.
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ fontSize: "24px" }}>✓</div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: "4px", fontSize: "14px" }}>
                  قابلیت خرید و فروش
                </div>
                <div style={{ fontSize: "12px", color: "var(--color-مuted)" }}>
                  امکان خرید و فروش طلا به صورت آنلاین
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions Modal */}
        {showInstructionsModal && (
          <InstructionsModal onClose={() => setShowInstructionsModal(false)} />
        )}
      </div>
    </div>
  );
}

// Instructions Modal Component
function InstructionsModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "flex-end",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        className="slide-in-up"
        style={{
          background: "#FFFFFF",
          borderRadius: "24px 24px 0 0",
          padding: "24px",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            fontSize: "18px",
            fontWeight: 700,
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          راهنمای شارژ فیزیکی
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            شارژ فیزیکی طلا در ۴ مرحله
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", gap: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                ۱
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: "4px" }}>
                  مراجعه به شعبه طلابین
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-muted)" }}>
                  با طلای فیزیکی خود به شعبه مراجعه کنید
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                ۲
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: "4px" }}>
                  تحویل طلا به نماینده طلابین
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-muted)" }}>
                  طلای خود را به نماینده ما تحویل دهید
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                ۳
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: "4px" }}>
                  سنجش‌حصت و واریز به حساب کاربری شما
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-muted)" }}>
                  طلا را بررسی و وزن آن را تعیین می‌کنیم
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                ۴
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: "4px" }}>
                  ارائه کارت ملی معتبر به نماینده طلابین
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-muted)" }}>
                  برای تایید هویت، کارت ملی خود را ارائه دهید
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "16px",
            background: "rgba(255, 200, 87, 0.1)",
            borderRadius: "12px",
            fontSize: "12px",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: "4px" }}>
            شعبه تحویل فیزیکی طلابین
          </div>
          <div style={{ color: "var(--color-muted)" }}>
            شعبه۱: آذربایجان شرقی، مراغه، ............
            <br />
            شنبه تا چهارشنبه ۰۰:۱۶ الی ۰۰:۲۰
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn btn-primary btn-block"
          style={{ padding: "14px", borderRadius: "12px" }}
        >
          متوجه شدم
        </button>
      </div>
    </div>
  );
}
