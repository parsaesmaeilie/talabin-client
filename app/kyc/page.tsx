"use client";

import { useState } from "react";
import Link from "next/link";
import { StepIndicator } from "@/components/kyc/StepIndicator";
import { DocumentUpload } from "@/components/kyc/DocumentUpload";
import { SelfieCapture } from "@/components/kyc/SelfieCapture";

export default function KYCPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    nationalId: "",
    birthDate: "",
    phone: "",
    idCardFront: null as File | null,
    idCardBack: null as File | null,
    selfie: null as string | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = ["اطلاعات شخصی", "تصویر کارت ملی", "تصویر سلفی", "بررسی و ثبت"];

  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const handleNext = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!formData.fullName || !formData.nationalId || !formData.birthDate) {
        alert("لطفا تمام فیلدها را پر کنید");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.idCardFront || !formData.idCardBack) {
        alert("لطفا تصاویر کارت ملی را آپلود کنید");
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.selfie) {
        alert("لطفا سلفی خود را بگیرید");
        return;
      }
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Mock API call - simulate 2 second delay
    setTimeout(() => {
      setIsSubmitting(false);
      alert("احراز هویت شما با موفقیت ثبت شد!\n\nدر حال بررسی اطلاعات شما هستیم. نتیجه تا ۲۴ ساعت آینده اعلام خواهد شد.");
      window.location.href = "/dashboard";
    }, 2000);
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
            href="/dashboard"
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
            تکمیل احراز هویت
          </h1>
          <div style={{ width: "40px" }} />
        </div>

        {/* Info Banner */}
        <div
          style={{
            padding: "16px",
            background: "rgba(59, 130, 246, 0.1)",
            borderRadius: "12px",
            marginBottom: "24px",
            fontSize: "13px",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: "4px" }}>
            ⓘ برای دسترسی به همه امکانات طلابین
          </div>
          <div style={{ color: "var(--color-muted)" }}>
            لطفا احراز هویت خود را تکمیل کنید
          </div>
        </div>

        {/* Step Indicator */}
        <StepIndicator
          currentStep={currentStep}
          totalSteps={4}
          steps={steps}
        />

        {/* Step Content */}
        <div className="card" style={{ padding: "24px", marginBottom: "20px" }}>
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "20px",
                }}
              >
                اطلاعات شخصی
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="نام کامل خود را وارد کنید"
                  className="form-input"
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  کد ملی
                </label>
                <input
                  type="text"
                  value={formData.nationalId}
                  onChange={(e) =>
                    setFormData({ ...formData, nationalId: e.target.value })
                  }
                  placeholder="کد ملی ۱۰ رقمی"
                  maxLength={10}
                  className="form-input"
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  تاریخ تولد
                </label>
                <input
                  type="text"
                  value={formData.birthDate}
                  onChange={(e) =>
                    setFormData({ ...formData, birthDate: e.target.value })
                  }
                  placeholder="مثال: ۱۳۷۰/۰۱/۰۱"
                  className="form-input"
                />
              </div>

              <div
                style={{
                  padding: "12px",
                  background: "rgba(255, 200, 87, 0.1)",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "var(--color-muted)",
                }}
              >
                ⓘ اطلاعات وارد شده باید با مدارک شناسایی شما مطابقت داشته باشد
              </div>
            </div>
          )}

          {/* Step 2: ID Card Upload */}
          {currentStep === 2 && (
            <div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "20px",
                }}
              >
                تصویر کارت ملی
              </div>

              <DocumentUpload
                label="تصویر روی کارت ملی"
                description="لطفا تصویر واضح از روی کارت ملی خود آپلود کنید"
                onFileSelect={(file) =>
                  setFormData({ ...formData, idCardFront: file })
                }
              />

              <DocumentUpload
                label="تصویر پشت کارت ملی"
                description="لطفا تصویر واضح از پشت کارت ملی خود آپلود کنید"
                onFileSelect={(file) =>
                  setFormData({ ...formData, idCardBack: file })
                }
              />

              <div
                style={{
                  padding: "12px",
                  background: "rgba(255, 200, 87, 0.1)",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "var(--color-muted)",
                }}
              >
                ⓘ تصاویر باید واضح و خوانا باشند. از گرفتن عکس با نور کافی اطمینان حاصل کنید
              </div>
            </div>
          )}

          {/* Step 3: Selfie */}
          {currentStep === 3 && (
            <div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "20px",
                }}
              >
                تصویر سلفی
              </div>

              <SelfieCapture
                onCapture={(imageData) =>
                  setFormData({ ...formData, selfie: imageData })
                }
              />
            </div>
          )}

          {/* Step 4: Review and Submit */}
          {currentStep === 4 && (
            <div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                بررسی اطلاعات
              </div>

              <div style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <span style={{ color: "var(--color-muted)" }}>نام و نام خانوادگی</span>
                  <span style={{ fontWeight: 600 }}>{formData.fullName}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <span style={{ color: "var(--color-muted)" }}>کد ملی</span>
                  <span style={{ fontWeight: 600 }}>
                    {toPersianNumber(formData.nationalId)}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                  }}
                >
                  <span style={{ color: "var(--color-muted)" }}>تاریخ تولد</span>
                  <span style={{ fontWeight: 600 }}>{formData.birthDate}</span>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      margin: "0 auto 8px",
                      borderRadius: "12px",
                      background: "#10B981",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "32px",
                    }}
                  >
                    ✓
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--color-muted)" }}>
                    روی کارت ملی
                  </div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      margin: "0 auto 8px",
                      borderRadius: "12px",
                      background: "#10B981",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "32px",
                    }}
                  >
                    ✓
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--color-muted)" }}>
                    پشت کارت ملی
                  </div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      margin: "0 auto 8px",
                      borderRadius: "12px",
                      background: "#10B981",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "32px",
                    }}
                  >
                    ✓
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--color-muted)" }}>
                    تصویر سلفی
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: "16px",
                  background: "rgba(16, 185, 129, 0.1)",
                  borderRadius: "12px",
                  fontSize: "13px",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                ✓ همه اطلاعات و مدارک آپلود شده‌اند
                <br />
                <span style={{ fontSize: "12px", color: "var(--color-muted)" }}>
                  پس از ثبت، اطلاعات شما توسط تیم طلابین بررسی خواهد شد
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: "flex", gap: "12px" }}>
          {currentStep > 1 && (
            <button
              onClick={handlePrevious}
              className="btn btn-outline"
              style={{
                flex: 1,
                padding: "16px",
                fontSize: "15px",
                borderRadius: "16px",
              }}
              disabled={isSubmitting}
            >
              مرحله قبل
            </button>
          )}

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="btn btn-primary"
              style={{
                flex: 1,
                padding: "16px",
                fontSize: "15px",
                borderRadius: "16px",
              }}
            >
              مرحله بعد
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn btn-success"
              style={{
                flex: 1,
                padding: "16px",
                fontSize: "15px",
                borderRadius: "16px",
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "در حال ثبت..." : "ثبت و ارسال"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
