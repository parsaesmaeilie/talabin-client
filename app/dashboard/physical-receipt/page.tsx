"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toPersianNumber } from "@/lib/utils/helpers";
import { spacing, fontSize, colors, borderRadius, shadows } from "@/lib/utils/design-tokens";

export default function PhysicalReceiptPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock data - replace with API call
  const walletGold = 102; // grams
  const availableForPhysical = 100; // grams

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
    setError("");
  };

  const incrementAmount = (increment: number) => {
    const currentAmount = parseFloat(amount) || 0;
    setAmount((currentAmount + increment).toString());
    setError("");
  };

  const decrementAmount = (decrement: number) => {
    const currentAmount = parseFloat(amount) || 0;
    const newAmount = Math.max(0, currentAmount - decrement);
    setAmount(newAmount.toString());
    setError("");
  };

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);

    // Validation: Empty field
    if (!amount) {
      setError("این فیلد اجباری است");
      return;
    }

    // Validation: Must be multiple of 10 and at least 10
    if (numAmount < 10 || numAmount % 10 !== 0) {
      setError("حداقل مقدار دریافت فیزیکی طلا ۱۰ گرم است و طلای فیزیکی مورد تقاضای شما باید مضربی از ۱۰ داشته باشد.");
      return;
    }

    // Validation: Exceeds available balance
    if (numAmount > availableForPhysical) {
      setError("مقدار وارد شده بیش از موجودی کیف طلا شما است.");
      return;
    }

    // Success - show success screen
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setAmount("");
    setError("");
    // Redirect to list page
    router.push("/dashboard/physical-receipt/list");
  };

  if (showSuccess) {
    return <SuccessPage onClose={handleSuccessClose} />;
  }

  return (
    <div style={{
      minHeight: "100vh",
      padding: `${spacing.md} ${spacing.md} 100px`,
      background: "#F5F5F5",
      paddingBottom: "100px"
    }}>
      <div style={{
        maxWidth: "600px",
        margin: "0 auto"
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: spacing.md,
          paddingBottom: spacing.md,
          borderBottom: `1px solid ${colors.border}`
        }}>
          {/* Info/Help Icon */}
          <div style={{
            width: "clamp(36px, 10vw, 40px)",
            height: "clamp(36px, 10vw, 40px)",
            borderRadius: "50%",
            background: "#E5E5E5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="10" stroke="#6B7280" strokeWidth="1.5" />
              <polyline points="12 6 12 12 16 14" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 style={{
            fontSize: fontSize.lg,
            fontWeight: 700,
            margin: 0,
            color: colors.dark
          }}>
            دریافت فیزیکی
          </h1>

          {/* Back Arrow */}
          <Link
            href="/dashboard/services"
            style={{
              width: "clamp(36px, 10vw, 40px)",
              height: "clamp(36px, 10vw, 40px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19L8 12L15 5" stroke={colors.dark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Info Banner */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: spacing.xs,
          padding: `${spacing.sm} ${spacing.md}`,
          background: "rgba(251, 191, 36, 0.15)",
          borderRadius: borderRadius.md,
          marginBottom: spacing.md
        }}>
          <div style={{
            width: "clamp(18px, 5vw, 20px)",
            height: "clamp(18px, 5vw, 20px)",
            borderRadius: "50%",
            background: colors.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: fontSize.xs,
            fontWeight: 700,
            color: colors.card,
            flexShrink: 0
          }}>
            i
          </div>
          <span style={{
            fontSize: fontSize.sm,
            fontWeight: 600,
            color: "#D97706"
          }}>
            راهنمای تحویل فیزیکی
          </span>
        </div>

        {/* Balance Card */}
        <div style={{
          padding: spacing.md,
          background: "#E8E4DD",
          borderRadius: borderRadius.lg,
          marginBottom: spacing.md,
          boxShadow: shadows.xs
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            gap: spacing.sm
          }}>
            <div style={{ textAlign: "right", flex: 1 }}>
              <div style={{
                fontSize: fontSize.sm,
                color: colors.muted,
                marginBottom: "4px"
              }}>
                موجودی کیف طلا:
              </div>
              <div style={{
                fontSize: fontSize.lg,
                fontWeight: 700,
                color: colors.dark
              }}>
                {toPersianNumber(walletGold)} گرم
              </div>
            </div>
            <div style={{ textAlign: "left", flex: 1 }}>
              <div style={{
                fontSize: fontSize.sm,
                color: colors.muted,
                marginBottom: "4px"
              }}>
                موجودی قابل دریافت فیزیکی:
              </div>
              <div style={{
                fontSize: fontSize.lg,
                fontWeight: 700,
                color: colors.dark
              }}>
                {toPersianNumber(availableForPhysical)} گرم
              </div>
            </div>
          </div>
        </div>

        {/* Amount Input */}
        <div style={{
          padding: spacing.md,
          border: `1px solid ${colors.border}`,
          borderRadius: borderRadius.lg,
          marginBottom: spacing.sm,
          background: colors.card
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <span style={{
              fontSize: fontSize.sm,
              color: colors.muted
            }}>
              گرم
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError("");
              }}
              placeholder="مقدار طلا"
              style={{
                fontSize: fontSize.lg,
                fontWeight: 600,
                border: "none",
                outline: "none",
                textAlign: "right",
                background: "transparent",
                flex: 1,
                color: colors.dark,
                marginRight: spacing.sm
              }}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            display: "flex",
            alignItems: error === "این فیلد اجباری است" ? "center" : "flex-start",
            justifyContent: error === "این فیلد اجباری است" ? "center" : "flex-start",
            gap: spacing.xs,
            marginBottom: spacing.md
          }}>
            {error !== "این فیلد اجباری است" && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
                <circle cx="12" cy="12" r="10" fill={colors.danger} />
                <path d="M12 8V12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 16H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
            <span style={{
              fontSize: fontSize.sm,
              color: colors.danger,
              lineHeight: "1.5",
              flex: 1,
              textAlign: error === "این فیلد اجباری است" ? "center" : "right"
            }}>
              {error}
            </span>
          </div>
        )}

        {/* Quick Amount Buttons */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: spacing.sm,
          marginBottom: spacing.lg
        }}>
          {[
            { value: 10, label: "۱۰" },
            { value: 45, label: "۴۵" },
            { value: 30, label: "۳۰" },
          ].map((item) => (
            <div
              key={item.value}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: `${spacing.xs} ${spacing.sm}`,
                background: colors.card,
                border: `1px solid ${colors.border}`,
                borderRadius: borderRadius.md
              }}
            >
              <button
                onClick={() => decrementAmount(item.value)}
                style={{
                  width: "clamp(20px, 6vw, 24px)",
                  height: "clamp(20px, 6vw, 24px)",
                  borderRadius: borderRadius.xs,
                  background: "transparent",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: fontSize.lg,
                  cursor: "pointer",
                  color: colors.muted,
                  padding: 0
                }}
              >
                −
              </button>
              <button
                onClick={() => handleQuickAmount(item.value)}
                style={{
                  padding: `0 ${spacing.xs}`,
                  background: "transparent",
                  border: "none",
                  fontSize: fontSize.sm,
                  fontWeight: 600,
                  cursor: "pointer",
                  color: colors.dark
                }}
              >
                {item.label} گرم
              </button>
              <button
                onClick={() => incrementAmount(item.value)}
                style={{
                  width: "clamp(20px, 6vw, 24px)",
                  height: "clamp(20px, 6vw, 24px)",
                  borderRadius: borderRadius.xs,
                  background: "transparent",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: fontSize.lg,
                  cursor: "pointer",
                  color: colors.muted,
                  padding: 0
                }}
              >
                +
              </button>
            </div>
          ))}
        </div>

        {/* Info Note */}
        <div style={{
          fontSize: fontSize.xs,
          color: "#9CA3AF",
          textAlign: "center",
          lineHeight: "1.6",
          marginBottom: "clamp(100px, 30vw, 120px)"
        }}>
          حداقل مقدار دریافت فیزیکی طلا ۱۰ گرم است و طلای فیزیکی مورد تقاضای شما
          باید مضربی از ۱۰ داشته باشد.
        </div>

        {/* Submit Button - Fixed at bottom */}
        <div style={{
          position: "fixed",
          bottom: "80px",
          left: spacing.md,
          right: spacing.md,
          maxWidth: "568px",
          margin: "0 auto",
          zIndex: 10
        }}>
          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: spacing.md,
              background: colors.dark,
              color: colors.card,
              border: "none",
              borderRadius: borderRadius.lg,
              fontSize: fontSize.lg,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: shadows.lg,
              transition: "all 0.2s"
            }}
          >
            ثبت درخواست
          </button>
        </div>
      </div>
    </div>
  );
}

// Success Page Component
function SuccessPage({ onClose }: { onClose: () => void }) {
  return (
    <div style={{
      minHeight: "100vh",
      padding: spacing.md,
      background: colors.card,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        maxWidth: "600px",
        width: "100%",
        textAlign: "center"
      }}>
        {/* Back Arrow */}
        <div style={{
          position: "absolute",
          top: spacing.md,
          right: spacing.md
        }}>
          <div
            onClick={onClose}
            style={{
              width: "clamp(36px, 10vw, 40px)",
              height: "clamp(36px, 10vw, 40px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19L8 12L15 5" stroke={colors.dark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Success Badge */}
        <div style={{
          display: "inline-block",
          padding: `${spacing.sm} ${spacing['2xl']}`,
          background: "rgba(147, 197, 253, 0.3)",
          borderRadius: borderRadius.xl,
          marginBottom: spacing['2xl']
        }}>
          <span style={{
            fontSize: fontSize.lg,
            fontWeight: 700,
            color: "#1E40AF"
          }}>
            درخواست شما  ثبت شد
          </span>
        </div>

        {/* Illustration */}
        <div style={{
          marginBottom: spacing['2xl'],
          display: "flex",
          justifyContent: "center"
        }}>
          <svg
            width="clamp(250px, 70vw, 300px)"
            height="clamp(250px, 70vw, 300px)"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Circle */}
            <circle cx="150" cy="150" r="140" fill="#EFF6FF" opacity="0.5" />

            {/* Blue geometric shapes */}
            <path
              d="M100 180 L140 220 L180 180 L220 220"
              stroke="#3B82F6"
              strokeWidth="4"
              fill="none"
            />
            <rect x="80" y="140" width="60" height="80" fill="#3B82F6" rx="4" />
            <rect x="160" y="140" width="60" height="80" fill="#3B82F6" rx="4" />

            {/* People illustration simplified */}
            <circle cx="110" cy="120" r="20" fill="#1F2937" />
            <path d="M90 140 Q110 150 130 140" stroke="#1F2937" strokeWidth="3" fill="none" />

            <circle cx="190" cy="120" r="20" fill="#1F2937" />
            <path d="M170 140 Q190 150 210 140" stroke="#1F2937" strokeWidth="3" fill="none" />

            {/* Gold/Hand icon in center */}
            <rect x="130" y="100" width="40" height="30" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2" rx="4" />
            <path d="M140 110 L160 110 M140 115 L160 115" stroke="#FFC857" strokeWidth="2" />
          </svg>
        </div>

        {/* Success Message */}
        <h2 style={{
          fontSize: fontSize.xl,
          fontWeight: 700,
          color: colors.dark,
          marginBottom: spacing.sm
        }}>
          درخواست شما را دریافت کردیم
        </h2>

        <p style={{
          fontSize: fontSize.sm,
          color: colors.muted,
          lineHeight: "1.6",
          marginBottom: "clamp(50px, 15vw, 60px)"
        }}>
          آدرس شعبه و زمان تحویل طلا به شما پیامک خواهد شد.
        </p>

        {/* Done Button - Fixed at bottom */}
        <div style={{
          position: "fixed",
          bottom: "80px",
          left: spacing.md,
          right: spacing.md,
          maxWidth: "568px",
          margin: "0 auto",
          zIndex: 10
        }}>
          <button
            onClick={onClose}
            style={{
              width: "100%",
              padding: spacing.md,
              background: colors.dark,
              color: colors.card,
              border: "none",
              borderRadius: borderRadius.lg,
              fontSize: fontSize.lg,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: shadows.lg,
              transition: "all 0.2s"
            }}
          >
            متوجه شدم
          </button>
        </div>
      </div>
    </div>
  );
}
