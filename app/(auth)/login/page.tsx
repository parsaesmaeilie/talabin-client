"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/Button";
import { authService } from "@/lib/api/auth";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      setError(null);

      // Clear any previous session data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
      }

      // Format phone number to include +98
      let phoneNumber = data.phone.trim();
      if (phoneNumber.startsWith('0')) {
        phoneNumber = '+98' + phoneNumber.substring(1);
      } else if (!phoneNumber.startsWith('+')) {
        phoneNumber = '+98' + phoneNumber;
      }

      const response = await authService.login({
        phone_number: phoneNumber,
        password: data.password,
      });

      if (response.success) {
        // Small delay to ensure token is saved
        await new Promise(resolve => setTimeout(resolve, 100));
        // Trigger auth state update
        window.dispatchEvent(new Event('authChange'));
        // Redirect to dashboard on success
        router.push('/dashboard');
      } else {
        setError(response.error?.message || 'خطا در ورود به سیستم');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className="w-full max-w-md card scale-in"
        style={{ padding: "32px 28px" }}
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
          ورود به حساب کاربری
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "var(--color-muted)",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          برای دسترسی به حساب کاربری خود وارد شوید
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div
              style={{
                padding: "12px 16px",
                marginBottom: "16px",
                borderRadius: "8px",
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

          <div className="form-group">
            <label className="form-label">شماره موبایل</label>
            <input
              {...register("phone", { required: "شماره موبایل الزامی است" })}
              type="tel"
              className="form-input"
              placeholder="09123456789"
              dir="ltr"
              style={{ textAlign: "right" }}
              disabled={loading}
            />
            {errors.phone && (
              <span style={{ fontSize: "12px", color: "#DC2626", marginTop: "4px", display: "block" }}>
                {errors.phone.message as string}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">رمز عبور</label>
            <input
              {...register("password", { required: "رمز عبور الزامی است" })}
              type="password"
              className="form-input"
              placeholder="••••••••"
              disabled={loading}
            />
            {errors.password && (
              <span style={{ fontSize: "12px", color: "#DC2626", marginTop: "4px", display: "block" }}>
                {errors.password.message as string}
              </span>
            )}
            <div style={{ marginTop: "8px", textAlign: "left" }}>
              <Link
                href="/forgot-password"
                style={{
                  fontSize: "12px",
                  color: "var(--color-primary)",
                  textDecoration: "none",
                }}
              >
                رمز عبور را فراموش کرده‌اید؟
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            style={{ marginTop: "8px" }}
            disabled={loading}
          >
            {loading ? "در حال ورود..." : "ورود به حساب کاربری"}
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
          <span style={{ color: "var(--color-muted)" }}>حساب کاربری ندارید؟ </span>
          <Link
            href="/register"
            style={{
              color: "var(--color-primary)",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            ثبت‌نام کنید
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
          با ورود به حساب کاربری،{" "}
          <Link href="/terms" style={{ textDecoration: "underline" }}>
            قوانین و مقررات
          </Link>{" "}
          طلابین را می‌پذیرید.
        </div>
      </div>
    </div>
  );
}
