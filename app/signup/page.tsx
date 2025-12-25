"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (pass: string) => {
    const hasLowerCase = /[a-z]/.test(pass);
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasNumber = /\d/.test(pass);
    const isLongEnough = pass.length >= 8;

    return hasLowerCase && hasUpperCase && hasNumber && isLongEnough;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !phone || !password || !confirmPassword) {
      setError("لطفا تمام فیلدها را پر کنید");
      return;
    }

    if (password !== confirmPassword) {
      setError("رمز عبور و تکرار آن یکسان نیستند");
      return;
    }

    if (!validatePassword(password)) {
      setError("رمز عبور باید حداقل ۸ کاراکتر و شامل حروف بزرگ، کوچک و عدد باشد");
      return;
    }

    setLoading(true);

    try {
      // TODO: Implement actual signup API call
      // For now, navigate to OTP verification
      setTimeout(() => {
        router.push(`/verify-otp?phone=${phone}`);
      }, 1000);
    } catch (err: any) {
      setError(err.message || "خطا در ثبت‌نام");
    } finally {
      setLoading(false);
    }
  };

  const passwordRequirements = [
    { label: "حداقل ۸ کاراکتر", met: password.length >= 8 },
    { label: "یک حرف بزرگ", met: /[A-Z]/.test(password) },
    { label: "یک حرف کوچک", met: /[a-z]/.test(password) },
    { label: "یک عدد", met: /\d/.test(password) },
  ];

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

        {/* Signup Form Card */}
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
            ثبت‌نام
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

          <form onSubmit={handleSignup}>
            {/* Name Input */}
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  marginBottom: "8px",
                  textAlign: "right",
                }}
              >
                نام و نام‌خانوادگی
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="سعید سعیدی"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "15px",
                  border: "2px solid rgba(0,0,0,0.1)",
                  borderRadius: "12px",
                  textAlign: "right",
                }}
              />
            </div>

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
                شماره تلفن
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
            <div style={{ marginBottom: "16px" }}>
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

              {/* Password Requirements */}
              {password && (
                <div style={{ marginTop: "12px" }}>
                  {passwordRequirements.map((req, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: "8px",
                        fontSize: "12px",
                        marginBottom: "6px",
                        color: req.met ? "#059669" : "var(--color-muted)",
                      }}
                    >
                      <span>{req.label}</span>
                      <span>{req.met ? "✓" : "○"}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  marginBottom: "8px",
                  textAlign: "right",
                }}
              >
                تکرار رمز عبور
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="تکرار رمز عبور"
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

            {/* Signup Button */}
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
              {loading ? "در حال ثبت‌نام..." : "ثبت نام"}
            </button>

            {/* Login Link */}
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "14px", color: "var(--color-muted)" }}>
                قبلا ثبت‌نام کرده‌اید؟{" "}
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
