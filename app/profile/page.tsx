"use client";

import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

export default function ProfilePage() {
  return (
    <div className="min-h-screen" style={{ padding: "16px 12px 80px" }}>
      <h1
        style={{
          fontSize: "18px",
          fontWeight: 600,
          margin: "8px 0 6px",
        }}
      >
        پروفایل و تنظیمات
      </h1>
      <p
        style={{
          fontSize: "13px",
          color: "var(--color-muted)",
          margin: "0 0 16px",
        }}
      >
        اطلاعات حساب، امنیت، کارت‌ها و تنظیمات اعلان‌ها
      </p>

      {/* User Info Card */}
      <Card style={{ marginBottom: "12px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <span style={{ fontSize: "12px", color: "var(--color-muted)" }}>
            مشخصات کاربر
          </span>
          <Link
            href="/profile/edit"
            style={{ fontSize: "11px", color: "var(--color-muted)" }}
          >
            ویرایش
          </Link>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <div
            style={{
              fontSize: "12px",
              color: "var(--color-muted)",
              marginBottom: "3px",
            }}
          >
            نام و نام خانوادگی
          </div>
          <div style={{ fontSize: "13px" }}>علی رضایی</div>
        </div>

        <div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--color-muted)",
              marginBottom: "3px",
            }}
          >
            شماره موبایل
          </div>
          <div style={{ fontSize: "13px" }}>۰۹۱۲ ۳۴۵ ۶۷۸۹</div>
        </div>
      </Card>

      {/* Verification Status Card */}
      <Card style={{ marginBottom: "12px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "12px", color: "var(--color-muted)" }}>
            وضعیت احراز هویت
          </span>
          <Badge variant="green">تایید شده</Badge>
        </div>

        <div style={{ fontSize: "12px", color: "var(--color-muted)" }}>
          در صورت نیاز به ویرایش اطلاعات هویتی، با پشتیبانی در تماس باش.
        </div>
      </Card>

      {/* Bank Cards Card */}
      <Card style={{ marginBottom: "12px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "12px", color: "var(--color-muted)" }}>
            کارت‌های بانکی
          </span>
          <Link
            href="/profile/cards"
            style={{ fontSize: "11px", color: "var(--color-muted)" }}
          >
            مدیریت کارت‌ها
          </Link>
        </div>

        <div
          style={{
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(0,0,0,0.04)",
            background: "#FBFAF7",
            padding: "6px 8px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 4px",
              borderBottom: "1px solid rgba(0,0,0,0.04)",
              fontSize: "12px",
            }}
          >
            <div>
              <div>کارت پایان با ۶۵۳۲</div>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--color-muted)",
                  marginTop: "3px",
                }}
              >
                بانک ملت
              </div>
            </div>
            <Badge>پیش‌فرض</Badge>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 4px",
              fontSize: "12px",
            }}
          >
            <div>افزودن کارت جدید</div>
            <Badge>+</Badge>
          </div>
        </div>
      </Card>

      {/* Security Card */}
      <Card style={{ marginBottom: "12px" }}>
        <div
          style={{
            fontSize: "12px",
            color: "var(--color-muted)",
            marginBottom: "8px",
          }}
        >
          امنیت حساب
        </div>

        <div
          style={{
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(0,0,0,0.04)",
            background: "#FBFAF7",
            padding: "6px 8px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 4px",
              borderBottom: "1px solid rgba(0,0,0,0.04)",
              fontSize: "12px",
            }}
          >
            <span>تغییر رمز عبور</span>
            <span style={{ color: "var(--color-muted)" }}>••••••</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 4px",
              borderBottom: "1px solid rgba(0,0,0,0.04)",
              fontSize: "12px",
            }}
          >
            <span>ورود دو مرحله‌ای</span>
            <Badge variant="green">فعال</Badge>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 4px",
              fontSize: "12px",
            }}
          >
            <span>دستگاه‌های وارد شده</span>
            <span style={{ color: "var(--color-muted)" }}>۲ دستگاه</span>
          </div>
        </div>
      </Card>

      {/* Logout Button */}
      <Button
        variant="outline"
        fullWidth
        asLink
        href="/login"
        style={{ marginTop: "10px" }}
      >
        خروج از حساب کاربری
      </Button>
    </div>
  );
}
