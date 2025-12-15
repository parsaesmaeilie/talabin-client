"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/Button";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    alert("✔ ورود انجام شد!");
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className="w-full max-w-md card"
        style={{ padding: "32px 28px" }}
      >
        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "var(--color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: 700,
              color: "#1C1C1C",
            }}
          >
            ط
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
          <div className="form-group">
            <label className="form-label">شماره موبایل</label>
            <input
              {...register("phone", { required: true })}
              type="tel"
              className="form-input"
              placeholder="09123456789"
              dir="ltr"
              style={{ textAlign: "right" }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">رمز عبور</label>
            <input
              {...register("password", { required: true })}
              type="password"
              className="form-input"
              placeholder="••••••••"
            />
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

          <Button type="submit" variant="primary" fullWidth style={{ marginTop: "8px" }}>
            ورود به حساب کاربری
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
