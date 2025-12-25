"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function NewPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phone") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Password strength criteria
  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);

  const allCriteriaMet = hasMinLength && hasUpperCase && hasLowerCase && hasNumber;
  const passwordsMatch = newPassword === confirmPassword && confirmPassword !== "";

  const getPasswordStrength = () => {
    if (!newPassword) return { text: "", color: "", width: "0%" };

    let strength = 0;
    if (hasMinLength) strength += 25;
    if (hasUpperCase) strength += 25;
    if (hasLowerCase) strength += 25;
    if (hasNumber) strength += 25;

    if (strength <= 25) return { text: "ضعیف", color: "#EF4444", width: "25%" };
    if (strength <= 50) return { text: "متوسط", color: "#F59E0B", width: "50%" };
    if (strength <= 75) return { text: "خوب", color: "#3B82F6", width: "75%" };
    return { text: "عالی", color: "#10B981", width: "100%" };
  };

  const strength = getPasswordStrength();

  const handleSubmit = () => {
    if (!allCriteriaMet) {
      alert("رمز عبور باید تمام شرایط را داشته باشد");
      return;
    }

    if (!passwordsMatch) {
      alert("رمز عبور و تکرار آن یکسان نیستند");
      return;
    }

    // Mock password reset
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("رمز عبور شما با موفقیت تغییر یافت!\n\nاکنون می‌توانید با رمز عبور جدید وارد شوید.");
      router.push("/login");
    }, 1500);
  };

  return (
    <div
      className="min-h-screen"
      style={{ padding: "20px 16px 100px", background: "#F5F5F5" }}
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
            href="/forgot-password/verify"
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
            تعیین رمز عبور جدید
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
              background: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              animation: "scaleIn 0.5s ease-out",
            }}
          >
            🔐
          </div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            رمز عبور جدید
          </div>
          <div
            style={{
              fontSize: "13px",
              color: "var(--color-muted)",
              lineHeight: "1.6",
            }}
          >
            رمز عبور جدید خود را وارد کنید
            <br />
            رمز باید قوی و ایمن باشد
          </div>
        </div>

        {/* Form Card */}
        <div
          className="card"
          style={{
            padding: "24px",
            marginBottom: "20px",
            animation: "slideInUp 0.4s ease-out 0.1s backwards",
          }}
        >
          {/* New Password Input */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              رمز عبور جدید
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="رمز عبور خود را وارد کنید"
                className="form-input"
                style={{ paddingLeft: "40px" }}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                {showNewPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Password Strength Meter */}
            {newPassword && (
              <div style={{ marginTop: "12px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "6px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "var(--color-muted)" }}>
                    قدرت رمز عبور:
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: strength.color,
                    }}
                  >
                    {strength.text}
                  </span>
                </div>
                <div
                  style={{
                    height: "6px",
                    background: "rgba(0,0,0,0.06)",
                    borderRadius: "999px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: strength.width,
                      background: strength.color,
                      transition: "all 0.3s ease",
                      borderRadius: "999px",
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              تکرار رمز عبور
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="رمز عبور را مجدداً وارد کنید"
                className="form-input"
                style={{
                  paddingLeft: "40px",
                  border: confirmPassword && !passwordsMatch ? "2px solid #EF4444" : undefined,
                }}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {confirmPassword && !passwordsMatch && (
              <div
                style={{
                  fontSize: "11px",
                  color: "#EF4444",
                  marginTop: "6px",
                }}
              >
                رمز عبور و تکرار آن یکسان نیستند
              </div>
            )}
            {passwordsMatch && (
              <div
                style={{
                  fontSize: "11px",
                  color: "#10B981",
                  marginTop: "6px",
                }}
              >
                ✓ رمز عبور مطابقت دارد
              </div>
            )}
          </div>

          {/* Password Requirements */}
          <div
            style={{
              padding: "16px",
              background: "rgba(0,0,0,0.02)",
              borderRadius: "12px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              شرایط رمز عبور:
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: hasMinLength ? "#10B981" : "rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    color: "#FFFFFF",
                    transition: "all 0.2s",
                  }}
                >
                  {hasMinLength && "✓"}
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    color: hasMinLength ? "var(--color-dark)" : "var(--color-muted)",
                  }}
                >
                  حداقل ۸ کاراکتر
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: hasUpperCase ? "#10B981" : "rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    color: "#FFFFFF",
                    transition: "all 0.2s",
                  }}
                >
                  {hasUpperCase && "✓"}
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    color: hasUpperCase ? "var(--color-dark)" : "var(--color-muted)",
                  }}
                >
                  حداقل یک حرف بزرگ انگلیسی
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: hasLowerCase ? "#10B981" : "rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    color: "#FFFFFF",
                    transition: "all 0.2s",
                  }}
                >
                  {hasLowerCase && "✓"}
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    color: hasLowerCase ? "var(--color-dark)" : "var(--color-muted)",
                  }}
                >
                  حداقل یک حرف کوچک انگلیسی
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: hasNumber ? "#10B981" : "rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    color: "#FFFFFF",
                    transition: "all 0.2s",
                  }}
                >
                  {hasNumber && "✓"}
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    color: hasNumber ? "var(--color-dark)" : "var(--color-muted)",
                  }}
                >
                  حداقل یک عدد
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="btn btn-success"
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "15px",
              fontWeight: 600,
              borderRadius: "16px",
              opacity: isLoading || !allCriteriaMet || !passwordsMatch ? 0.7 : 1,
              cursor: isLoading || !allCriteriaMet || !passwordsMatch ? "not-allowed" : "pointer",
            }}
            disabled={isLoading || !allCriteriaMet || !passwordsMatch}
          >
            {isLoading ? "در حال ثبت..." : "تغییر رمز عبور"}
          </button>
        </div>

        {/* Back to Login */}
        <div style={{ textAlign: "center", animation: "fadeIn 0.4s ease-out 0.3s backwards" }}>
          <Link
            href="/login"
            style={{
              fontSize: "13px",
              color: "var(--color-muted)",
              textDecoration: "none",
            }}
          >
            بازگشت به صفحه ورود
          </Link>
        </div>
      </div>
    </div>
  );
}
