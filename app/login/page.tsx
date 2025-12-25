"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!phone || !password) {
      setError("لطفا تمام فیلدها را پر کنید");
      return;
    }

    setLoading(true);

    try {
      // TODO: Implement actual login API call
      // For now, just navigate to dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "خطا در ورود");
    } finally {
      setLoading(false);
    }
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
          <div style={{ fontSize: "14px", color: "var(--color-muted)" }}>
            پلتفرم امن خرید و فروش طلای آب‌شده
          </div>
        </div>

        {/* Login Form Card */}
        <div
          className="card"
          style={{ padding: "24px", marginBottom: "16px" }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: 600,
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            ورود
          </div>

          {error && (
            <div
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

          <form onSubmit={handleLogin}>
            {/* Phone Number Input */}
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  marginBottom: "8px",
                  textAlign: "right",
                }}
              >
                شماره همراه
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="۰۹۱۲۵۸۴۴۵۵۳"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "15px",
                  border: "2px solid rgba(0,0,0,0.1)",
                  borderRadius: "12px",
                  textAlign: "center",
                  direction: "ltr",
                }}
              />
            </div>

            {/* Password Input */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  marginBottom: "8px",
                  textAlign: "right",
                }}
              >
                رمز عبور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "15px",
                  border: "2px solid rgba(0,0,0,0.1)",
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              />
            </div>

            {/* Forgot Password Link */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <Link
                href="/forgot-password"
                style={{
                  fontSize: "13px",
                  color: "var(--color-primary)",
                  textDecoration: "none",
                }}
              >
                رمز عبور خود را فراموش کرده‌ام.
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "16px",
                fontWeight: 700,
                color: "#FFFFFF",
                background: loading ? "#999" : "#1C1C1C",
                border: "none",
                borderRadius: "12px",
                cursor: loading ? "not-allowed" : "pointer",
                marginBottom: "16px",
              }}
            >
              {loading ? "در حال ورود..." : "ورود"}
            </button>

            {/* Signup Link */}
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "14px", color: "var(--color-muted)" }}>
                کاربر جدید هستید؟{" "}
              </span>
              <Link
                href="/signup"
                style={{
                  fontSize: "14px",
                  color: "var(--color-primary)",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                ثبت‌نام
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
