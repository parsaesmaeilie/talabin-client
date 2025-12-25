"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
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
    if (!currentPassword) {
      alert("لطفا رمز عبور فعلی را وارد کنید");
      return;
    }

    if (!allCriteriaMet) {
      alert("رمز عبور جدید باید تمام شرایط را داشته باشد");
      return;
    }

    if (!passwordsMatch) {
      alert("رمز عبور جدید و تکرار آن یکسان نیستند");
      return;
    }

    if (currentPassword === newPassword) {
      alert("رمز عبور جدید نباید با رمز عبور فعلی یکسان باشد");
      return;
    }

    // Mock password change - verify current password first
    setIsLoading(true);
    setTimeout(() => {
      // Mock verification of current password (in real app, this would be an API call)
      const mockCurrentPassword = "Test1234";

      if (currentPassword !== mockCurrentPassword) {
        setIsLoading(false);
        alert("رمز عبور فعلی صحیح نمی‌باشد");
        return;
      }

      // Success
      setIsLoading(false);
      alert("رمز عبور شما با موفقیت تغییر یافت!\n\nلطفا با رمز عبور جدید وارد شوید.");
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
            marginBottom: "24px",
          }}
        >
          <Link
            href="/profile"
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
            تغییر رمز عبور
          </h1>
          <div style={{ width: "40px" }} />
        </div>

        {/* Info Banner */}
        <div
          style={{
            padding: "16px",
            background: "rgba(59, 130, 246, 0.1)",
            borderRadius: "12px",
            marginBottom: "20px",
            fontSize: "13px",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: "4px" }}>
            ⓘ تغییر رمز عبور
          </div>
          <div style={{ color: "var(--color-muted)", fontSize: "12px" }}>
            برای افزایش امنیت حساب خود، رمز عبور قوی انتخاب کنید
          </div>
        </div>

        {/* Form Card */}
        <div className="card" style={{ padding: "24px", marginBottom: "20px" }}>
          {/* Current Password */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              رمز عبور فعلی
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="رمز عبور فعلی خود را وارد کنید"
                className="form-input"
                style={{ paddingLeft: "40px" }}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
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
                {showCurrentPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <Link
              href="/forgot-password"
              style={{
                display: "inline-block",
                marginTop: "6px",
                fontSize: "11px",
                color: "var(--color-primary)",
                textDecoration: "none",
              }}
            >
              رمز عبور را فراموش کرده‌اید؟
            </Link>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "rgba(0,0,0,0.06)",
              margin: "24px 0",
            }}
          />

          {/* New Password */}
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
                placeholder="رمز عبور جدید خود را وارد کنید"
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

          {/* Confirm Password */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              تکرار رمز عبور جدید
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="رمز عبور جدید را مجدداً وارد کنید"
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

          {/* Test Credentials Info */}
          <div
            style={{
              padding: "12px",
              background: "rgba(59, 130, 246, 0.1)",
              borderRadius: "12px",
              fontSize: "11px",
              color: "var(--color-muted)",
              marginBottom: "20px",
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: "4px" }}>
              ⓘ برای تست
            </div>
            <div>رمز عبور فعلی: <span style={{ fontWeight: 600 }}>Test1234</span></div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "15px",
              fontWeight: 600,
              borderRadius: "16px",
              opacity: isLoading || !currentPassword || !allCriteriaMet || !passwordsMatch ? 0.7 : 1,
              cursor: isLoading || !currentPassword || !allCriteriaMet || !passwordsMatch ? "not-allowed" : "pointer",
            }}
            disabled={isLoading || !currentPassword || !allCriteriaMet || !passwordsMatch}
          >
            {isLoading ? "در حال تغییر..." : "تغییر رمز عبور"}
          </button>
        </div>
      </div>
    </div>
  );
}
