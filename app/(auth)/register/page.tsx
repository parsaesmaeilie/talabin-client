"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { authService } from "@/src/features/auth";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError("");

    try {
      // Call backend API
      const response = await authService.register({
        phone_number: data.phone,
        password: data.password,
        password_confirm: data.confirmPassword,
        first_name: data.firstName,
        last_name: data.lastName,
      });

      if (response.success) {
        // Show success message
        const successDiv = document.createElement("div");
        successDiv.className = "success-toast";
        successDiv.textContent = "✔ ثبت‌نام با موفقیت انجام شد!";
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
          animation: slideIn 0.3s ease-out;
          font-weight: 600;
          text-align: center;
        `;
        document.body.appendChild(successDiv);

        // Add animation
        const style = document.createElement("style");
        style.textContent = `
          @keyframes slideIn {
            from {
              transform: translateY(-100px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          @keyframes slideOut {
            from {
              transform: translateY(0);
              opacity: 1;
            }
            to {
              transform: translateY(-100px);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);

        // Remove after 2 seconds with animation
        setTimeout(() => {
          successDiv.style.animation = "slideOut 0.3s ease-in";
          setTimeout(() => {
            document.body.removeChild(successDiv);

            // Redirect to verify page with smooth transition
            document.body.style.opacity = "1";
            document.body.style.transition = "opacity 0.3s ease-out";
            requestAnimationFrame(() => {
              document.body.style.opacity = "0";
              setTimeout(() => {
                router.push(`/verify?phone=${encodeURIComponent(data.phone)}&type=registration`);
              }, 300);
            });
          }, 300);
        }, 2000);
      } else {
        // Show error
        setError(response.error?.message || "خطا در ثبت‌نام. لطفا دوباره تلاش کنید.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("خطا در ارتباط با سرور. لطفا دوباره تلاش کنید.");
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
          ثبت‌نام در طلابین
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "var(--color-muted)",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          حساب کاربری خود را ایجاد کنید
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
          <div className="grid-2" style={{ gap: "12px" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">نام</label>
              <input
                {...register("firstName", { required: "نام الزامی است" })}
                className="form-input"
                placeholder="نام خود را وارد کنید"
                disabled={isLoading}
              />
              {errors.firstName && (
                <span style={{ fontSize: "11px", color: "var(--color-danger)", marginTop: "4px", display: "block" }}>
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">نام خانوادگی</label>
              <input
                {...register("lastName", { required: "نام خانوادگی الزامی است" })}
                className="form-input"
                placeholder="نام خانوادگی"
                disabled={isLoading}
              />
              {errors.lastName && (
                <span style={{ fontSize: "11px", color: "var(--color-danger)", marginTop: "4px", display: "block" }}>
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">شماره موبایل</label>
            <input
              {...register("phone", {
                required: "شماره موبایل الزامی است",
                pattern: {
                  value: /^09[0-9]{9}$/,
                  message: "شماره موبایل معتبر نیست"
                },
              })}
              type="tel"
              className="form-input"
              placeholder="09123456789"
              dir="ltr"
              style={{ textAlign: "right" }}
              disabled={isLoading}
            />
            <small className="form-hint">
              کد تایید به این شماره ارسال خواهد شد
            </small>
            {errors.phone && (
              <span style={{ fontSize: "11px", color: "var(--color-danger)", marginTop: "4px", display: "block" }}>
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">رمز عبور</label>
            <input
              {...register("password", {
                required: "رمز عبور الزامی است",
                minLength: {
                  value: 6,
                  message: "رمز عبور باید حداقل 6 کاراکتر باشد",
                },
              })}
              type="password"
              className="form-input"
              placeholder="••••••••"
              disabled={isLoading}
            />
            <small className="form-hint">
              حداقل 6 کاراکتر، ترکیبی از حروف و اعداد
            </small>
            {errors.password && (
              <span style={{ fontSize: "11px", color: "var(--color-danger)", marginTop: "4px", display: "block" }}>
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">تایید رمز عبور</label>
            <input
              {...register("confirmPassword", {
                required: "تایید رمز عبور الزامی است",
                validate: (value) =>
                  value === watch("password") || "رمز عبور و تایید آن یکسان نیستند",
              })}
              type="password"
              className="form-input"
              placeholder="••••••••"
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <span style={{ fontSize: "11px", color: "var(--color-danger)", marginTop: "4px", display: "block" }}>
                {errors.confirmPassword.message}
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
                در حال ثبت‌نام...
              </div>
            ) : (
              "ثبت‌نام و ادامه"
            )}
          </Button>
        </form>

        <div
          style={{
            marginTop: "24px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            textAlign: "center",
            fontSize: "13px",
          }}
        >
          <span style={{ color: "var(--color-muted)" }}>قبلاً ثبت‌نام کرده‌اید؟ </span>
          <Link
            href="/login"
            style={{
              color: "var(--color-primary)",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            ورود به حساب
          </Link>
        </div>

        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "11px",
            color: "var(--color-muted)",
          }}
        >
          با ثبت‌نام،{" "}
          <Link href="/terms" style={{ textDecoration: "underline" }}>
            قوانین و مقررات
          </Link>{" "}
          و{" "}
          <Link href="/privacy" style={{ textDecoration: "underline" }}>
            حریم خصوصی
          </Link>{" "}
          طلابین را می‌پذیرید.
        </div>
      </div>
    </div>
  );
}
