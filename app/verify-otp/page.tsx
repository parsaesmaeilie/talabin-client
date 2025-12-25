"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 4) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const otpCode = otp.join("");
    if (otpCode.length !== 5) {
      setError("لطفا کد تایید را کامل وارد کنید");
      return;
    }

    setLoading(true);

    try {
      // TODO: Implement actual OTP verification API call
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err: any) {
      setError("کد تایید اشتباه است");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (resendTimer > 0) return;

    // TODO: Implement actual resend OTP API call
    setResendTimer(60);
    setOtp(["", "", "", "", ""]);
  };

  const toPersianNumber = (num: number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const maskPhone = (phoneNumber: string) => {
    if (phoneNumber.length !== 11) return phoneNumber;
    return `${phoneNumber.slice(0, 4)}****${phoneNumber.slice(-3)}`;
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ padding: "20px 16px", background: "#F5F5F5" }}
    >
      <div style={{ maxWidth: "400px", width: "100%" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            طلابین
          </div>
        </div>

        {/* OTP Form Card */}
        <div
          className="card"
          style={{ padding: "24px", marginBottom: "16px" }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: 600,
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            تایید شماره موبایل
          </div>

          <div
            style={{
              fontSize: "14px",
              color: "var(--color-muted)",
              textAlign: "center",
              marginBottom: "32px",
              lineHeight: "1.6",
            }}
          >
            کد تأیید پیامک شده به {toPersianNumber(maskPhone(phone))} را وارد کنید.
          </div>

          {error && (
            <div
              className="slide-in-down"
              style={{
                padding: "12px",
                marginBottom: "16px",
                borderRadius: "12px",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#DC2626",
                fontSize: "13px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleVerify}>
            {/* OTP Input */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                marginBottom: "24px",
                direction: "ltr",
              }}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  style={{
                    width: "56px",
                    height: "56px",
                    fontSize: "24px",
                    fontWeight: 600,
                    textAlign: "center",
                    border: `2px solid ${digit ? "#1C1C1C" : "rgba(0,0,0,0.1)"}`,
                    borderRadius: "12px",
                    transition: "border-color 0.2s",
                  }}
                />
              ))}
            </div>

            {/* Resend Timer */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              {resendTimer > 0 ? (
                <span style={{ fontSize: "13px", color: "var(--color-muted)" }}>
                  ارسال مجدد کد در {toPersianNumber(resendTimer)} ثانیه
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "13px",
                    color: "var(--color-primary)",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  دریافت نکردم. ارسال مجدد
                </button>
              )}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading || otp.join("").length !== 5}
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "16px",
                fontWeight: 700,
                color: "#FFFFFF",
                background: loading || otp.join("").length !== 5 ? "#999" : "#1C1C1C",
                border: "none",
                borderRadius: "12px",
                cursor: loading || otp.join("").length !== 5 ? "not-allowed" : "pointer",
                marginBottom: "16px",
              }}
            >
              {loading ? "در حال تایید..." : "ادامه"}
            </button>

            {/* Back to Login */}
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "14px", color: "var(--color-muted)" }}>
                حساب کاربری دارید؟{" "}
              </span>
              <Link
                href="/login"
                style={{
                  fontSize: "14px",
                  color: "var(--color-primary)",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                ورود
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
}
