"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const handleSendOTP = () => {
    // Validate phone number
    if (!phoneNumber || phoneNumber.length !== 11) {
      alert("لطفا شماره موبایل ۱۱ رقمی معتبر وارد کنید");
      return;
    }

    if (!phoneNumber.startsWith("09")) {
      alert("شماره موبایل باید با ۰۹ شروع شود");
      return;
    }

    // Mock OTP send - simulate delay
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to OTP verification page
      router.push(`/forgot-password/verify?phone=${phoneNumber}`);
    }, 1500);
  };

  return (
    <div
      className="min-h-screen"
      style={{ padding: "20px 16px", background: "#F5F5F5" }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "40px",
          }}
        >
          <Link
            href="/login"
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
            بازیابی رمز عبور
          </h1>
          <div style={{ width: "40px" }} />
        </div>

        {/* Icon */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              margin: "0 auto 20px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FFC857 0%, #FFD666 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              animation: "scaleIn 0.5s ease-out",
            }}
          >
            🔑
          </div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            فراموشی رمز عبور
          </div>
          <div
            style={{
              fontSize: "13px",
              color: "var(--color-muted)",
              lineHeight: "1.6",
            }}
          >
            شماره موبایل خود را وارد کنید
            <br />
            کد تایید به شماره شما ارسال می‌شود
          </div>
        </div>

        {/* Form Card */}
        <div
          className="card"
          style={{
            padding: "24px",
            marginBottom: "20px",
            animation: "slideInUp 0.4s ease-out 0.1s backwards",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              شماره موبایل
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
              placeholder="۰۹۱۲۰۰۰۵۵۵۳"
              maxLength={11}
              className="form-input"
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "2px",
              }}
              disabled={isLoading}
            />
            {phoneNumber && (
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--color-muted)",
                  marginTop: "6px",
                  textAlign: "center",
                }}
              >
                {toPersianNumber(phoneNumber.length)}/۱۱ رقم
              </div>
            )}
          </div>

          <button
            onClick={handleSendOTP}
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "15px",
              fontWeight: 600,
              borderRadius: "16px",
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
            disabled={isLoading}
          >
            {isLoading ? "در حال ارسال..." : "ارسال کد تایید"}
          </button>
        </div>

        {/* Info Box */}
        <div
          style={{
            padding: "16px",
            background: "rgba(59, 130, 246, 0.1)",
            borderRadius: "12px",
            fontSize: "12px",
            color: "var(--color-muted)",
            marginBottom: "20px",
            animation: "fadeIn 0.4s ease-out 0.2s backwards",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: "4px" }}>
            ⓘ نکات مهم
          </div>
          <ul style={{ margin: 0, paddingRight: "20px" }}>
            <li>شماره موبایل باید با اطلاعات حساب شما مطابقت داشته باشد</li>
            <li>کد تایید از طریق پیامک ارسال می‌شود</li>
            <li>اعتبار کد تایید ۲ دقیقه است</li>
          </ul>
        </div>

        {/* Back to Login */}
        <div style={{ textAlign: "center", animation: "fadeIn 0.4s ease-out 0.3s backwards" }}>
          <Link
            href="/login"
            style={{
              fontSize: "13px",
              color: "var(--color-primary)",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            بازگشت به صفحه ورود
          </Link>
        </div>
      </div>
    </div>
  );
}
