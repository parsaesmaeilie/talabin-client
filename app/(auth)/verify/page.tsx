"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/Button";
import { authService } from "@/src/features/auth";

interface OTPFormData {
  code: string;
}

export default function OTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpType, setOtpType] = useState<"registration" | "login" | "password_reset">("registration");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormData>();

  useEffect(() => {
    // Reset body opacity in case it was set by the register page
    if (typeof window !== "undefined") {
      document.body.style.opacity = "1";
      document.body.style.transition = "";
    }

    // Get phone number and type from URL params
    const phone = searchParams.get("phone");
    const type = searchParams.get("type") as "registration" | "login" | "password_reset";

    if (!phone) {
      setError("شماره موبایل یافت نشد. لطفا دوباره ثبت‌نام کنید.");
      return;
    }

    // Convert phone from 09xxxxxxxxx to +989xxxxxxxxx for API
    const formattedPhone = phone.startsWith("+98") ? phone : `+98${phone.substring(1)}`;
    setPhoneNumber(formattedPhone);
    setOtpType(type || "registration");
  }, [searchParams]);

  const onSubmit = async (data: OTPFormData) => {
    if (!phoneNumber) {
      setError("شماره موبایل یافت نشد");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await authService.verifyOTP({
        phone_number: phoneNumber,
        otp_type: otpType,
        code: data.code,
      });

      if (response.success) {
        // Show success message
        const successDiv = document.createElement("div");
        successDiv.className = "success-toast";
        successDiv.textContent = "✔ کد تایید با موفقیت ثبت شد!";
        successDiv.style.cssText = `
          position: fixed;
          top: 24px;
          right: 24px;
          left: 24px;
          background: #4ADE80;
          color: white;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          z-index: 9999;
          font-weight: 600;
          text-align: center;
        `;
        document.body.appendChild(successDiv);

        // Remove after 1.5 seconds and redirect
        setTimeout(() => {
          document.body.removeChild(successDiv);
          // Redirect to login page after successful verification
          router.push("/login");
        }, 1500);
      } else {
        setError(response.error?.message || "کد تایید نادرست است");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setError("خطا در تایید کد. لطفا دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!phoneNumber) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await authService.sendOTP({
        phone_number: phoneNumber,
        otp_type: otpType,
      });

      if (response.success) {
        // Show success message
        const successDiv = document.createElement("div");
        successDiv.className = "success-toast";
        successDiv.textContent = "✔ کد جدید ارسال شد";
        successDiv.style.cssText = `
          position: fixed;
          top: 24px;
          right: 24px;
          left: 24px;
          background: #4ADE80;
          color: white;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          z-index: 9999;
          font-weight: 600;
          text-align: center;
        `;
        document.body.appendChild(successDiv);

        setTimeout(() => {
          document.body.removeChild(successDiv);
        }, 2000);
      } else {
        setError(response.error?.message || "خطا در ارسال مجدد کد");
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
      setError("خطا در ارسال مجدد کد. لطفا دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <div
        className="w-full max-w-md card"
        style={{
          padding: "32px 28px",
          animation: "scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/logo.svg"
              alt="Talabin Logo"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <h1
          style={{
            fontSize: "20px",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          تایید شماره موبایل
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "var(--color-muted)",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          کد ارسال شده به شماره {phoneNumber.replace("+98", "0")} را وارد کنید
        </p>

        {error && (
          <div
            style={{
              background: "#FEE2E2",
              color: "#EF4444",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "13px",
              textAlign: "center",
              animation: "shake 0.4s ease-in-out",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label">کد تایید</label>
            <input
              {...register("code", {
                required: "کد تایید الزامی است",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "کد تایید باید 6 رقم باشد"
                },
              })}
              type="text"
              inputMode="numeric"
              maxLength={6}
              className="form-input"
              placeholder="123456"
              dir="ltr"
              style={{
                textAlign: "center",
                fontSize: "18px",
                letterSpacing: "0.5em",
                fontWeight: "600"
              }}
              disabled={isLoading}
              autoFocus
            />
            {errors.code && (
              <span style={{ fontSize: "11px", color: "var(--color-danger)", marginTop: "4px", display: "block" }}>
                {errors.code.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            style={{ marginTop: "8px" }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                <div className="spinner" />
                در حال تایید...
              </div>
            ) : (
              "تایید و ادامه"
            )}
          </Button>
        </form>

        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "13px",
            color: "var(--color-muted)",
          }}
        >
          کد دریافت نکردید؟{" "}
          <button
            onClick={handleResendOTP}
            disabled={isLoading}
            style={{
              color: "var(--color-primary)",
              fontWeight: 600,
              background: "none",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            ارسال مجدد
          </button>
        </div>
      </div>
    </div>
  );
}
