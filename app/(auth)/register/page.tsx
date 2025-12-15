"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/Button";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data: any) => {
    alert("✔ ثبت‌نام انجام شد!");
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
          حساب کاربری خود را ایجاد کنید و از ۱۰۰ هزار تومان شروع کنید
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid-2" style={{ gap: "12px" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">نام</label>
              <input
                {...register("firstName", { required: "نام الزامی است" })}
                className="form-input"
                placeholder="نام خود را وارد کنید"
              />
              {errors.firstName && (
                <span style={{ fontSize: "11px", color: "var(--color-danger)", marginTop: "4px", display: "block" }}>
                  {errors.firstName.message as string}
                </span>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">نام خانوادگی</label>
              <input
                {...register("lastName", { required: "نام خانوادگی الزامی است" })}
                className="form-input"
                placeholder="نام خانوادگی"
              />
              {errors.lastName && (
                <span style={{ fontSize: "11px", color: "var(--color-danger)", marginTop: "4px", display: "block" }}>
                  {errors.lastName.message as string}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">شماره موبایل</label>
            <input
              {...register("phone", {
                required: "شماره موبایل الزامی است",
                pattern: /^[0-9]{11}$/,
              })}
              type="tel"
              className="form-input"
              placeholder="09123456789"
              dir="ltr"
              style={{ textAlign: "right" }}
            />
            <small className="form-hint">
              کد تایید به این شماره ارسال خواهد شد
            </small>
            {errors.phone && (
              <span style={{ fontSize: "11px", color: "var(--color-danger)", marginTop: "4px", display: "block" }}>
                لطفا شماره موبایل معتبر وارد کنید
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">کد ملی</label>
            <input
              {...register("nationalId", {
                required: "کد ملی الزامی است",
                pattern: /^[0-9]{10}$/,
              })}
              type="text"
              className="form-input"
              placeholder="کد ملی خود را وارد کنید"
              dir="ltr"
              style={{ textAlign: "right" }}
            />
            {errors.nationalId && (
              <span style={{ fontSize: "11px", color: "var(--color-danger)", marginTop: "4px", display: "block" }}>
                کد ملی باید شامل 10 رقم باشد
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
            />
            <small className="form-hint">
              حداقل 6 کاراکتر، ترکیبی از حروف و اعداد
            </small>
            {errors.password && (
              <span style={{ fontSize: "11px", color: "var(--color-danger)", marginTop: "4px", display: "block" }}>
                {errors.password.message as string}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">تایید رمز عبور</label>
            <input
              {...register("confirmPassword", {
                required: "تایید رمز عبور الزامی است",
                validate: (value) =>
                  value === watch("password") || "رمز عبور باید یکسان باشد",
              })}
              type="password"
              className="form-input"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <span style={{ fontSize: "11px", color: "var(--color-danger)", marginTop: "4px", display: "block" }}>
                {errors.confirmPassword.message as string}
              </span>
            )}
          </div>

          <Button type="submit" variant="primary" fullWidth style={{ marginTop: "8px" }}>
            ثبت‌نام و ادامه
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
