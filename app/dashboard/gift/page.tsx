"use client";

import Link from "next/link";

export default function GiftCardPage() {
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
            کارت هدیه
          </h1>
          <div style={{ width: "40px" }} />
        </div>

        {/* Coming Soon Card */}
        <div
          className="card"
          style={{
            padding: "60px 24px",
            textAlign: "center",
            background: "linear-gradient(135deg, #FFF4E1 0%, #FFFFFF 100%)",
          }}
        >
          <div style={{ fontSize: "96px", marginBottom: "24px" }}>🎁</div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            به‌زودی
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "var(--color-muted)",
              marginBottom: "32px",
              maxWidth: "300px",
              margin: "0 auto",
            }}
          >
            امکان خرید و ارسال کارت هدیه طلا به زودی اضافه خواهد شد
          </div>

          <Link
            href="/dashboard/services"
            className="btn btn-primary"
            style={{
              padding: "14px 32px",
              fontSize: "14px",
              borderRadius: "12px",
              display: "inline-flex",
            }}
          >
            بازگشت به خدمات
          </Link>
        </div>

        {/* Features Preview */}
        <div
          className="card"
          style={{
            marginTop: "20px",
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
            قابلیت‌های آینده
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", gap: "12px", fontSize: "13px" }}>
              <div style={{ fontSize: "20px" }}>✨</div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: "2px" }}>
                  خرید کارت هدیه طلا
                </div>
                <div style={{ color: "var(--color-muted)", fontSize: "12px" }}>
                  برای دوستان و عزیزان خود کارت هدیه بخرید
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", fontSize: "13px" }}>
              <div style={{ fontSize: "20px" }}>✨</div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: "2px" }}>
                  ارسال آنلاین
                </div>
                <div style={{ color: "var(--color-muted)", fontSize: "12px" }}>
                  ارسال کارت هدیه به صورت دیجیتال
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", fontSize: "13px" }}>
              <div style={{ fontSize: "20px" }}>✨</div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: "2px" }}>
                  مبالغ متنوع
                </div>
                <div style={{ color: "var(--color-muted)", fontSize: "12px" }}>
                  انتخاب مبلغ دلخواه برای کارت هدیه
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
