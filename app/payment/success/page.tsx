"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const goldAmount = searchParams.get("goldAmount") || "۱";
  const commission = searchParams.get("commission") || "۱۰,۰۰۰";
  const totalPrice = searchParams.get("totalPrice") || "۳۱,۵۰۰,۰۰۰";
  const weight = searchParams.get("weight") || "۱";
  const date = searchParams.get("date") || "";
  const trackingCode = searchParams.get("trackingCode") || "۴۴۶۵۲";

  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const currentDate = date || toPersianNumber(
    new Date().toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" })
  );

  const handleDownloadInvoice = () => {
    alert("دانلود فاکتور...");
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        maxWidth: "428px",
        margin: "0 auto",
      }}
    >
      {/* Header Badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "32px",
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            background: "#10B981",
            color: "#FFFFFF",
            padding: "8px 24px",
            borderRadius: "999px",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          پرداخت موفق
        </div>
      </div>

      {/* Illustration */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "0 32px",
          marginBottom: "16px",
        }}
      >
        <Image
          src="/assets/illustrations/payment-success.svg"
          alt="Payment Success"
          width={294}
          height={213}
          style={{ maxWidth: "260px", height: "auto" }}
          priority
        />
      </div>

      {/* Main Title */}
      <div style={{ textAlign: "center", padding: "0 24px", marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#1C1C1C",
            marginBottom: "0",
          }}
        >
          همه چیز با موفقیت انجام شد.
        </h1>
      </div>

      {/* Transaction Details */}
      <div style={{ padding: "0 24px", flex: 1 }}>
        {/* Purchase Type */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 0",
            borderBottom: "1px solid #F0F0F0",
          }}
        >
          <span style={{ fontSize: "14px", color: "#1C1C1C", fontWeight: 600 }}>
            خرید {goldAmount} گرم طلا
          </span>
        </div>

        {/* Commission */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 0",
            borderBottom: "1px solid #F0F0F0",
          }}
        >
          <span style={{ fontSize: "13px", color: "rgba(28,28,28,0.5)" }}>
            کمیسیون طلابین
          </span>
          <span style={{ fontSize: "13px", color: "#1C1C1C" }}>
            {commission} تومان
          </span>
        </div>

        {/* Total Price */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 0",
            borderBottom: "1px solid #F0F0F0",
          }}
        >
          <span style={{ fontSize: "13px", color: "rgba(28,28,28,0.5)" }}>
            قیمت هر گرم طلا
          </span>
          <span style={{ fontSize: "13px", color: "#1C1C1C" }}>
            {totalPrice} تومان
          </span>
        </div>

        {/* Weight */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 0",
            borderBottom: "1px solid #F0F0F0",
          }}
        >
          <span style={{ fontSize: "13px", color: "rgba(28,28,28,0.5)" }}>
            وزن طلا
          </span>
          <span style={{ fontSize: "13px", color: "#1C1C1C" }}>
            {weight} گرم
          </span>
        </div>

        {/* Date */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 0",
            borderBottom: "1px solid #F0F0F0",
          }}
        >
          <span style={{ fontSize: "13px", color: "rgba(28,28,28,0.5)" }}>
            تاریخ خرید
          </span>
          <span style={{ fontSize: "13px", color: "#1C1C1C" }}>
            {currentDate}
          </span>
        </div>

        {/* Tracking Code */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 0",
            borderBottom: "1px solid #F0F0F0",
          }}
        >
          <span style={{ fontSize: "13px", color: "rgba(28,28,28,0.5)" }}>
            رمز پیگیری
          </span>
          <span style={{ fontSize: "13px", color: "#1C1C1C", fontWeight: 600 }}>
            {trackingCode}
          </span>
        </div>

        {/* Success Note */}
        <div
          style={{
            textAlign: "center",
            padding: "20px 0",
            fontSize: "12px",
            color: "rgba(28,28,28,0.5)",
            lineHeight: "1.8",
          }}
        >
          خرید شما نهایی شد و دارایی طلا شما به کیف‌پولتان
          <br />
          اضافه شد.
        </div>
      </div>

      {/* Bottom Buttons */}
      <div
        style={{
          padding: "16px 24px 32px",
          display: "flex",
          gap: "12px",
        }}
      >
        <button
          onClick={handleDownloadInvoice}
          style={{
            flex: 1,
            padding: "14px",
            background: "#10B981",
            border: "none",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#FFFFFF",
            cursor: "pointer",
          }}
        >
          دانلود فاکتور
        </button>
        <Link
          href="/dashboard"
          style={{
            flex: 1,
            padding: "14px",
            background: "#F5F5F5",
            border: "none",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#1C1C1C",
            textAlign: "center",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );
}
