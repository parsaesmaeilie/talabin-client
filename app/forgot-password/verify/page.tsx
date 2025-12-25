"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phone") || "";

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(120); // 2 minutes
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${toPersianNumber(mins)}:${toPersianNumber(String(secs).padStart(2, "0"))}`;
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 5);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp([...newOtp, ...Array(5 - newOtp.length).fill("")]);
      inputRefs.current[Math.min(pastedData.length, 4)]?.focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 5) {
      alert("لطفا کد ۵ رقمی را وارد کنید");
      return;
    }

    // Mock OTP: 12345
    setIsLoading(true);
    setTimeout(() => {
      if (otpValue === "12345") {
        router.push(`/forgot-password/new-password?phone=${phoneNumber}&token=${otpValue}`);
      } else {
        setIsLoading(false);
        alert("کد وارد شده صحیح نمی‌باشد");
        setOtp(["", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    }, 1000);
  };

  const handleResend = () => {
    if (!canResend) return;

    // Mock resend
    setCountdown(120);
    setCanResend(false);
    setOtp(["", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    alert("کد تایید مجدداً ارسال شد");
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
            href="/forgot-password"
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
            تایید شماره موبایل
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
              background: "linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              animation: "scaleIn 0.5s ease-out",
            }}
          >
            📱
          </div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            کد تایید ارسال شد
          </div>
          <div
            style={{
              fontSize: "13px",
              color: "var(--color-muted)",
              lineHeight: "1.6",
            }}
          >
            کد ۵ رقمی ارسال شده به شماره
            <br />
            <span style={{ fontWeight: 600, color: "var(--color-dark)" }}>
              {toPersianNumber(phoneNumber)}
            </span>
            {" "}را وارد کنید
          </div>
        </div>

        {/* OTP Input Card */}
        <div
          className="card"
          style={{
            padding: "24px",
            marginBottom: "20px",
            animation: "slideInUp 0.4s ease-out 0.1s backwards",
          }}
        >
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                marginBottom: "20px",
                direction: "ltr",
              }}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="tel"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="form-input"
                  style={{
                    width: "56px",
                    height: "56px",
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: 700,
                    padding: 0,
                    border: digit ? "2px solid var(--color-primary)" : "2px solid rgba(0,0,0,0.1)",
                    background: digit ? "rgba(255, 200, 87, 0.1)" : "#FFFFFF",
                    transition: "all 0.2s",
                  }}
                  disabled={isLoading}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {/* Countdown Timer */}
            <div
              style={{
                textAlign: "center",
                fontSize: "14px",
                color: countdown < 30 ? "#EF4444" : "var(--color-muted)",
                marginBottom: "20px",
                fontWeight: 600,
              }}
            >
              {canResend ? (
                <span style={{ color: "var(--color-primary)" }}>
                  می‌توانید کد را مجدداً ارسال کنید
                </span>
              ) : (
                <>
                  زمان باقی‌مانده: {formatTime(countdown)}
                </>
              )}
            </div>

            {/* Resend Button */}
            <button
              onClick={handleResend}
              style={{
                width: "100%",
                padding: "14px",
                background: canResend ? "rgba(255, 200, 87, 0.1)" : "rgba(0,0,0,0.03)",
                border: canResend ? "1px solid var(--color-primary)" : "1px solid rgba(0,0,0,0.1)",
                borderRadius: "12px",
                fontSize: "13px",
                fontWeight: 600,
                color: canResend ? "var(--color-dark)" : "var(--color-muted)",
                cursor: canResend ? "pointer" : "not-allowed",
                marginBottom: "16px",
                transition: "all 0.2s",
              }}
              disabled={!canResend}
            >
              📨 ارسال مجدد کد تایید
            </button>

            <button
              onClick={handleVerify}
              className="btn btn-primary"
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "15px",
                fontWeight: 600,
                borderRadius: "16px",
                opacity: isLoading || otp.join("").length !== 5 ? 0.7 : 1,
                cursor: isLoading || otp.join("").length !== 5 ? "not-allowed" : "pointer",
              }}
              disabled={isLoading || otp.join("").length !== 5}
            >
              {isLoading ? "در حال بررسی..." : "تایید و ادامه"}
            </button>
          </div>
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
            ⓘ برای تست
          </div>
          <div>کد تایید: <span style={{ fontWeight: 600 }}>{toPersianNumber("12345")}</span></div>
        </div>

        {/* Change Number */}
        <div style={{ textAlign: "center", animation: "fadeIn 0.4s ease-out 0.3s backwards" }}>
          <Link
            href="/forgot-password"
            style={{
              fontSize: "13px",
              color: "var(--color-muted)",
              textDecoration: "none",
            }}
          >
            تغییر شماره موبایل
          </Link>
        </div>
      </div>
    </div>
  );
}
