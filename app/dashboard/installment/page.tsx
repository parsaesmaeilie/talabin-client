"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toPersianNumber, formatCurrency } from "@/lib/utils/helpers";
import { spacing, fontSize, colors, borderRadius, shadows } from "@/lib/utils/design-tokens";

export default function InstallmentPage() {
  const router = useRouter();
  const [amount, setAmount] = useState(5000000);
  const [duration, setDuration] = useState<2 | 3 | 4>(2);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const goldPricePerGram = 13459000;
  const annualInterestRate = 0.12;
  const minAmount = 5000000;
  const maxAmount = 30000000;
  const calculateGoldAmount = () => (amount / goldPricePerGram).toFixed(1);
  const calculateInstallmentAmount = () => Math.floor(amount / duration);
  const calculateTotalWithInterest = () => {
    const monthlyRate = annualInterestRate / 12;
    return Math.floor(amount + amount * monthlyRate * duration);
  };

  if (showConfirmation) {
    return (
      <div style={{
        minHeight: "100vh",
        background: colors.card,
        padding: `${spacing.md} ${spacing.md} 10px`,
        paddingBottom: "10px"
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
            marginBottom: spacing['2xl'],
            paddingBottom: spacing.md,
            borderBottom: `1px solid ${colors.border}`
          }}>
            {/* Help Icon */}
            <div onClick={() => setShowConfirmation(false)} style={{
              width: "clamp(36px, 10vw, 40px)",
              height: "clamp(36px, 10vw, 40px)",
              borderRadius: "50%",
              background: "#E5E5E5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V13" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.9945 16H12.0035" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 style={{
              fontSize: fontSize.lg,
              fontWeight: 700,
              margin: 0,
              color: colors.dark
            }}>خرید قسطی</h1>
            {/* Back Arrow */}
            <div onClick={() => setShowConfirmation(false)} style={{
              width: "clamp(36px, 10vw, 40px)",
              height: "clamp(36px, 10vw, 40px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 19L8 12L15 5" stroke={colors.dark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Calendar Icon */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: spacing.lg
          }}>
            <svg width="clamp(80px, 22vw, 100px)" height="clamp(80px, 22vw, 100px)" viewBox="0 0 24 24" fill="none">
              <path d="M8 2V5" stroke="#FDB022" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 2V5" stroke="#FDB022" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.5 9.09H20.5" stroke="#FDB022" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#FDB022" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.6947 13.7H15.7037" stroke="#FDB022" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.6947 16.7H15.7037" stroke="#FDB022" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.9955 13.7H12.0045" stroke="#FDB022" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.9955 16.7H12.0045" stroke="#FDB022" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.29431 13.7H8.30329" stroke="#FDB022" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.29431 16.7H8.30329" stroke="#FDB022" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div style={{
            fontSize: fontSize.lg,
            fontWeight: 600,
            textAlign: "center",
            marginBottom: spacing['2xl'],
            color: colors.dark
          }}>
            طلای دریافتی: {toPersianNumber(calculateGoldAmount())}گرم
          </div>

          {/* Details List */}
          <div style={{ marginBottom: spacing['2xl'] }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              padding: `${spacing.md} 0`,
              borderBottom: `1px solid ${colors.border}`
            }}>
              <span style={{ fontSize: fontSize.sm, color: colors.muted }}>اعتبار دریافتی:</span>
              <span style={{ fontSize: fontSize.sm, fontWeight: 600, color: colors.dark }}>
                {toPersianNumber(formatCurrency(amount))} تومان
              </span>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              padding: `${spacing.md} 0`,
              borderBottom: `1px solid ${colors.border}`
            }}>
              <span style={{ fontSize: fontSize.sm, color: colors.muted }}>مبلغ هر قسط:</span>
              <span style={{ fontSize: fontSize.sm, fontWeight: 600, color: colors.dark }}>
                {toPersianNumber(formatCurrency(calculateInstallmentAmount()))} تومان
              </span>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              padding: `${spacing.md} 0`,
              borderBottom: `1px solid ${colors.border}`
            }}>
              <span style={{ fontSize: fontSize.sm, color: colors.muted }}>مجموع قسط‌ها (۱۲% سالیانه):</span>
              <span style={{ fontSize: fontSize.sm, fontWeight: 600, color: colors.dark }}>
                {toPersianNumber(formatCurrency(calculateTotalWithInterest()))} تومان
              </span>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: `${spacing.md} 0`,
              borderBottom: `1px solid ${colors.border}`
            }}>
              <span style={{
                fontSize: fontSize.sm,
                color: colors.muted,
                display: "flex",
                alignItems: "center",
                gap: spacing.xs
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M8 2V5" stroke={colors.muted} strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M16 2V5" stroke={colors.muted} strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M3.5 9.09H20.5" stroke={colors.muted} strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke={colors.muted} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                زمان بندی اقساط شما:
              </span>
              <span style={{ fontSize: fontSize.sm, fontWeight: 600, color: colors.dark }}>
                {toPersianNumber(duration)}ماهه
              </span>
            </div>
          </div>

          {/* Warning Box */}
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: spacing.sm,
            padding: spacing.md,
            background: "#FFF9E6",
            borderRadius: borderRadius.md,
            marginBottom: "clamp(60px, 20vw, 80px)"
          }}>
            <svg width="clamp(24px, 8vw, 32px)" height="clamp(24px, 8vw, 32px)" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M12 9V14" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 21.41H5.94C2.47 21.41 1.02 18.93 2.7 15.9L5.82 10.28L8.76 5.00003C10.54 1.79003 13.46 1.79003 15.24 5.00003L18.18 10.29L21.3 15.91C22.98 18.94 21.52 21.42 18.06 21.42H12V21.41Z" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.9945 17H12.0035" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p style={{
              fontSize: fontSize.xs,
              color: "#92400E",
              lineHeight: "1.6",
              margin: 0
            }}>
              طلای خریداری شده تا پایان پرداخت اقساط، نزد طلابین وثیقه می‌ماند و قابل فروش نیست.
            </p>
          </div>

          {/* Checkbox */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: spacing.sm,
            marginBottom: spacing.md
          }}>
            <div onClick={() => setAgreedToTerms(!agreedToTerms)} style={{
              width: "clamp(20px, 6vw, 24px)",
              height: "clamp(20px, 6vw, 24px)",
              borderRadius: borderRadius.xs,
              border: `2px solid ${agreedToTerms ? "#3B82F6" : "#D1D5DB"}`,
              background: agreedToTerms ? "#3B82F6" : colors.card,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0
            }}>
              {agreedToTerms && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span style={{ fontSize: fontSize.sm, color: colors.dark }}>
              قوانین و مقررات را میپذیرم.
            </span>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => router.push("/dashboard/wallet/history")}
            disabled={!agreedToTerms}
            style={{
              width: "100%",
              padding: spacing.md,
              background: agreedToTerms ? colors.dark : "#D1D5DB",
              color: colors.card,
              border: "none",
              borderRadius: borderRadius.lg,
              fontSize: fontSize.lg,
              fontWeight: 700,
              cursor: agreedToTerms ? "pointer" : "not-allowed",
              transition: "all 0.2s"
            }}
          >
            تایید و ادامه
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "10vh",
      background: "#F5F5F5",
      padding: `${spacing.md} ${spacing.md} 10px`,
      paddingBottom: "10px"
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
          {/* Help Icon */}
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8V13" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.9945 16H12.0035" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 style={{
            fontSize: fontSize.lg,
            fontWeight: 700,
            margin: 0,
            color: colors.dark
          }}>خرید قسطی</h1>
          {/* Back Arrow */}
          <Link href="/dashboard/services" style={{
            width: "clamp(36px, 10vw, 40px)",
            height: "clamp(36px, 10vw, 40px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            textDecoration: "none"
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19L8 12L15 5" stroke={colors.dark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Price Card */}
        <div style={{
          padding: spacing.md,
          background: colors.card,
          borderRadius: borderRadius.lg,
          marginBottom: spacing.lg,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: shadows.xs
        }}>
          <div>
            <div style={{
              display: "inline-block",
              padding: `clamp(3px, 1vw, 4px) ${spacing.sm}`,
              background: "rgba(16, 185, 129, 0.1)",
              borderRadius: borderRadius.pill,
              fontSize: fontSize.xs,
              fontWeight: 600,
              color: "#059669",
              marginBottom: spacing.xs
            }}>قیمت لحظه‌ای</div>
            <div style={{
              fontSize: fontSize.xl,
              fontWeight: 700,
              color: colors.dark
            }}>
              {toPersianNumber(formatCurrency(goldPricePerGram))} تومان
            </div>
          </div>
          <div style={{
            textAlign: "left",
            fontSize: fontSize.sm,
            color: colors.muted
          }}>هر گرم طلا ۱۸ عیار</div>
        </div>

        {/* Amount Display */}
        <div style={{
          fontSize: fontSize.sm,
          color: colors.muted,
          textAlign: "center",
          marginBottom: spacing.md
        }}>مبلغ خرید</div>
        <div style={{
          fontSize: fontSize['4xl'],
          fontWeight: 700,
          textAlign: "center",
          marginBottom: spacing.xs,
          color: colors.dark
        }}>
          {toPersianNumber(formatCurrency(amount))} تومان
        </div>
        <div style={{
          fontSize: fontSize.sm,
          color: colors.muted,
          textAlign: "center",
          marginBottom: spacing['2xl']
        }}>
          طلای دریافتی: {toPersianNumber(calculateGoldAmount())}گرم
        </div>
        <div style={{ marginBottom: "40px", padding: "0 20px", position: "relative" }}>
          {/* Slider track with dots */}
          <div style={{ position: "relative", paddingTop: "30px", paddingBottom: "30px" }}>
            {/* Track line */}
            <div style={{ position: "absolute", top: "50%", left: "12px", right: "12px", height: "3px", background: "#E5E7EB", transform: "translateY(-50%)", borderRadius: "2px" }} />

            {/* Active track (filled portion) - RTL: fills from right to left */}
            <div style={{
              position: "absolute",
              top: "50%",
              right: "12px",
              width: `calc(${((amount - minAmount) / (maxAmount - minAmount)) * 100}% - 12px)`,
              height: "3px",
              background: "#FDB022",
              transform: "translateY(-50%)",
              borderRadius: "2px",
              transition: "width 0.2s ease"
            }} />

            {/* Dots container */}
            <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", pointerEvents: "none" }}>
              {[5, 4, 3, 2, 1, 0].map((i) => {
                const dotValue = minAmount + (i * (maxAmount - minAmount) / 5);
                const currentIndex = Math.floor(((amount - minAmount) / (maxAmount - minAmount)) * 5);
                const isActive = i >= (5 - currentIndex);

                return (
                  <div
                    key={i}
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      background: isActive ? "#FDB022" : "#D1D5DB",
                      transition: "all 0.2s ease",
                      boxShadow: isActive ? "0 2px 6px rgba(253, 176, 34, 0.3)" : "none",
                      position: "relative",
                    }}
                  />
                );
              })}
            </div>

            {/* Draggable slider thumb - RTL: position from right */}
            <div style={{
              position: "absolute",
              top: "50%",
              right: `calc(${((amount - minAmount) / (maxAmount - minAmount)) * 100}%)`,
              transform: "translate(50%, -50%)",
              width: "26px",
              height: "26px",
              borderRadius: "50%",
              background: "#FDB022",
              boxShadow: "0 3px 12px rgba(253, 176, 34, 0.5)",
              zIndex: 15,
              transition: "right 0.2s ease",
              pointerEvents: "none"
            }} />

            {/* Actual input slider */}
            <input
              type="range"
              min={minAmount}
              max={maxAmount}
              step={1000000}
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              style={{
                position: "absolute",
                top: "50%",
                left: "0",
                right: "0",
                width: "100%",
                transform: "translateY(-50%) scaleX(-1)",
                opacity: 0,
                cursor: "pointer",
                height: "50px",
                zIndex: 20,
                direction: "ltr"
              }}
            />
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: spacing.xs,
            fontSize: fontSize.sm,
            color: colors.muted,
            fontWeight: 500
          }}>
            <span>{toPersianNumber("30")} میلیون تومان</span>
            <span>{toPersianNumber("5")} میلیون تومان</span>
          </div>
        </div>

        {/* Installment Details */}
        <div style={{ marginBottom: spacing.lg }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: `${spacing.md} 0`,
            borderBottom: `1px solid ${colors.border}`
          }}>
            <span style={{ fontSize: fontSize.sm, color: colors.muted }}>مبلغ هر قسط:</span>
            <span style={{ fontSize: fontSize.sm, fontWeight: 600, color: colors.dark }}>
              {toPersianNumber(formatCurrency(calculateInstallmentAmount()))} تومان
            </span>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: `${spacing.md} 0`,
            borderBottom: `1px solid ${colors.border}`
          }}>
            <span style={{ fontSize: fontSize.sm, color: colors.muted }}>مجموع قسط‌ها (۱۲% سالیانه):</span>
            <span style={{ fontSize: fontSize.sm, fontWeight: 600, color: colors.dark }}>
              {toPersianNumber(formatCurrency(calculateTotalWithInterest()))} تومان
            </span>
          </div>
        </div>

        {/* Duration Buttons */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: spacing.sm,
          marginBottom: "clamp(100px, 30vw, 120px)"
        }}>
          {[2, 3, 4].map((months) => (
            <button
              key={months}
              onClick={() => setDuration(months as 2 | 3 | 4)}
              style={{
                padding: spacing.md,
                background: colors.card,
                border: `2px solid ${duration === months ? colors.dark : colors.border}`,
                borderRadius: borderRadius.md,
                fontSize: fontSize.sm,
                fontWeight: 600,
                cursor: "pointer",
                color: colors.dark,
                transition: "all 0.2s"
              }}
            >
              {toPersianNumber(months)} ماهه
            </button>
          ))}
        </div>

        {/* Submit Button - Fixed */}
        <div style={{
          position: "fixed",
          bottom: spacing.md,
          left: spacing.md,
          right: spacing.md,
          maxWidth: "568px",
          margin: "0 auto"
        }}>
          <button
            onClick={() => setShowConfirmation(true)}
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
            خرید قسطی
          </button>
        </div>
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #FDB022;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(253, 176, 34, 0.4);
          }
          input[type="range"]::-moz-range-thumb {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #FDB022;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 8px rgba(253, 176, 34, 0.4);
          }
        `}</style>
      </div>
    </div>
  );
}
