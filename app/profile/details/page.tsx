"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfileDetailsPage() {
  const router = useRouter();
  const kycStatus = "verified" as const; // Mock KYC status

  const [formData, setFormData] = useState({
    fullName: "سعید سعیدی",
    nationalId: "0123456789",
    phone: "09120005553",
    email: "saeed@example.com",
    birthDate: "۱۳۷۰/۰۱/۰۱",
    profilePicture: null as File | null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const handleSave = () => {
    // Validate email
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("لطفا یک ایمیل معتبر وارد کنید");
      return;
    }

    // Mock save with delay
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      alert("اطلاعات شما با موفقیت به‌روزرسانی شد");
    }, 1500);
  };

  const handleCancel = () => {
    // Reset to original values
    setFormData({
      fullName: "سعید سعیدی",
      nationalId: "0123456789",
      phone: "09120005553",
      email: "saeed@example.com",
      birthDate: "۱۳۷۰/۰۱/۰۱",
      profilePicture: null,
    });
    setIsEditing(false);
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("لطفا یک فایل تصویری انتخاب کنید");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("حجم فایل نباید بیشتر از ۵ مگابایت باشد");
        return;
      }

      setFormData({ ...formData, profilePicture: file });
    }
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
            مشخصات کاربری
          </h1>
          <div style={{ width: "40px" }} />
        </div>

        {/* Profile Picture */}
        <div
          className="card"
          style={{
            padding: "24px",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              margin: "0 auto 16px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FFC857 0%, #FFD666 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              fontWeight: 700,
              color: "#1C1C1C",
              position: "relative",
            }}
          >
            {formData.profilePicture ? (
              <img
                src={URL.createObjectURL(formData.profilePicture)}
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              "س"
            )}
            {isEditing && (
              <label
                htmlFor="profile-picture-upload"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "16px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                📷
                <input
                  id="profile-picture-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  style={{ display: "none" }}
                />
              </label>
            )}
          </div>
          <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
            {formData.fullName}
          </div>
          <div style={{ fontSize: "12px", color: "var(--color-muted)" }}>
            {toPersianNumber(formData.phone)}
          </div>
        </div>

        {/* Information Card */}
        <div className="card" style={{ padding: "24px", marginBottom: "16px" }}>
          {/* Full Name */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
                color: kycStatus === "verified" ? "var(--color-muted)" : "var(--color-dark)",
              }}
            >
              نام و نام خانوادگی
              {kycStatus === "verified" && (
                <span style={{ marginRight: "6px", fontSize: "11px" }}>
                  (غیرقابل ویرایش)
                </span>
              )}
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="form-input"
              disabled={!isEditing || kycStatus === "verified"}
              style={{
                background: !isEditing || kycStatus === "verified" ? "#F5F5F5" : "#FFFFFF",
              }}
            />
          </div>

          {/* National ID */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
                color: kycStatus === "verified" ? "var(--color-muted)" : "var(--color-dark)",
              }}
            >
              کد ملی
              {kycStatus === "verified" && (
                <span style={{ marginRight: "6px", fontSize: "11px" }}>
                  (غیرقابل ویرایش)
                </span>
              )}
            </label>
            <input
              type="text"
              value={toPersianNumber(formData.nationalId)}
              className="form-input"
              disabled
              style={{ background: "#F5F5F5", textAlign: "center" }}
            />
          </div>

          {/* Birth Date */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
                color: kycStatus === "verified" ? "var(--color-muted)" : "var(--color-dark)",
              }}
            >
              تاریخ تولد
              {kycStatus === "verified" && (
                <span style={{ marginRight: "6px", fontSize: "11px" }}>
                  (غیرقابل ویرایش)
                </span>
              )}
            </label>
            <input
              type="text"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              className="form-input"
              disabled={!isEditing || kycStatus === "verified"}
              style={{
                background: !isEditing || kycStatus === "verified" ? "#F5F5F5" : "#FFFFFF",
              }}
            />
          </div>

          {/* Phone Number */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              شماره موبایل
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="tel"
                value={toPersianNumber(formData.phone)}
                className="form-input"
                disabled
                style={{ background: "#F5F5F5", paddingLeft: "100px" }}
              />
              {isEditing && (
                <button
                  style={{
                    position: "absolute",
                    left: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    padding: "6px 12px",
                    background: "var(--color-primary)",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onClick={() => alert("برای تغییر شماره موبایل با پشتیبانی تماس بگیرید")}
                >
                  تغییر شماره
                </button>
              )}
            </div>
            {!isEditing && (
              <div style={{ fontSize: "11px", color: "var(--color-muted)", marginTop: "6px" }}>
                برای تغییر شماره موبایل با پشتیبانی تماس بگیرید
              </div>
            )}
          </div>

          {/* Email */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              ایمیل (اختیاری)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@email.com"
              className="form-input"
              disabled={!isEditing}
              style={{ background: !isEditing ? "#F5F5F5" : "#FFFFFF", direction: "ltr", textAlign: "right" }}
            />
          </div>

          {/* KYC Status Info */}
          {kycStatus === "verified" && (
            <div
              style={{
                padding: "12px",
                background: "rgba(16, 185, 129, 0.1)",
                borderRadius: "12px",
                fontSize: "12px",
                color: "#10B981",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "16px" }}>✓</span>
              <span>
                حساب شما احراز هویت شده است. برخی اطلاعات قابل ویرایش نیستند.
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "15px",
              fontWeight: 600,
              borderRadius: "16px",
            }}
          >
            ویرایش اطلاعات
          </button>
        ) : (
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handleCancel}
              className="btn btn-outline"
              style={{
                flex: 1,
                padding: "16px",
                fontSize: "15px",
                fontWeight: 600,
                borderRadius: "16px",
              }}
              disabled={isSaving}
            >
              انصراف
            </button>
            <button
              onClick={handleSave}
              className="btn btn-success"
              style={{
                flex: 1,
                padding: "16px",
                fontSize: "15px",
                fontWeight: 600,
                borderRadius: "16px",
                opacity: isSaving ? 0.7 : 1,
                cursor: isSaving ? "not-allowed" : "pointer",
              }}
              disabled={isSaving}
            >
              {isSaving ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
