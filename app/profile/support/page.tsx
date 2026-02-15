"use client";

import { useState } from "react";
import Link from "next/link";
import { spacing, fontSize, colors, borderRadius, shadows } from "@/lib/utils/design-tokens";

export default function SupportPage() {
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketData, setTicketData] = useState({
    subject: "",
    category: "",
    priority: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitTicket = () => {
    if (!ticketData.subject || !ticketData.category || !ticketData.priority || !ticketData.message) {
      alert("لطفا تمام فیلدها را پر کنید");
      return;
    }

    // Mock ticket submission
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowTicketForm(false);
      setTicketData({ subject: "", category: "", priority: "", message: "" });
      alert("تیکت شما با موفقیت ثبت شد!\n\nشماره تیکت: #12345\nکارشناسان ما در اسرع وقت به تیکت شما پاسخ خواهند داد.");
    }, 1500);
  };

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
          marginBottom: spacing.lg
        }}>
          <Link
            href="/profile"
            style={{
              width: "clamp(36px, 10vw, 40px)",
              height: "clamp(36px, 10vw, 40px)",
              borderRadius: borderRadius.md,
              background: colors.card,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              textDecoration: "none",
              boxShadow: shadows.xs
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19L8 12L15 5" stroke={colors.dark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <h1 style={{
            fontSize: fontSize.lg,
            fontWeight: 700,
            margin: 0,
            color: colors.dark
          }}>
            پشتیبانی
          </h1>
          <div style={{ width: "clamp(36px, 10vw, 40px)" }} />
        </div>

        {/* Hero Card */}
        <div style={{
          padding: `${spacing['2xl']} ${spacing.lg}`,
          marginBottom: spacing.md,
          textAlign: "center",
          background: "linear-gradient(135deg, #FFC857 0%, #FFD666 100%)",
          borderRadius: borderRadius.xl,
          boxShadow: shadows.md
        }}>
          {/* Waving Hand SVG */}
          <svg width="clamp(56px, 16vw, 64px)" height="clamp(56px, 16vw, 64px)" viewBox="0 0 64 64" fill="none" style={{ margin: "0 auto", marginBottom: spacing.sm }}>
            <circle cx="32" cy="32" r="28" fill="#FDB022"/>
            <path d="M20 25L32 15L44 25M32 15V40" stroke={colors.dark} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M25 35L32 40L39 35" stroke={colors.dark} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div style={{
            fontSize: fontSize.lg,
            fontWeight: 700,
            marginBottom: spacing.xs,
            color: colors.dark
          }}>
            چطور می‌توانیم کمکتان کنیم؟
          </div>
          <div style={{
            fontSize: fontSize.sm,
            color: colors.dark,
            opacity: 0.8
          }}>
            تیم پشتیبانی طلابین ۲۴ ساعته آماده پاسخگویی به سوالات شماست
          </div>
        </div>

        {/* Support Hours */}
        <div style={{
          padding: `${spacing.md} ${spacing.lg}`,
          marginBottom: spacing.md,
          background: "rgba(16, 185, 129, 0.1)",
          border: "1px solid rgba(16, 185, 129, 0.2)",
          borderRadius: borderRadius.lg,
          boxShadow: shadows.xs
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
            {/* Clock SVG Icon */}
            <svg width="clamp(20px, 6vw, 24px)" height="clamp(20px, 6vw, 24px)" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2"/>
              <path d="M12 6V12L16 14" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: fontSize.sm, fontWeight: 600, marginBottom: "2px", color: colors.dark }}>
                ساعات پاسخگویی
              </div>
              <div style={{ fontSize: fontSize.xs, color: colors.muted }}>
                همه روزه ۲۴ ساعته
              </div>
            </div>
            <div style={{
              padding: `${spacing.xs} ${spacing.sm}`,
              background: colors.success,
              color: colors.card,
              borderRadius: borderRadius.pill,
              fontSize: fontSize.xs,
              fontWeight: 600,
            }}>
              آنلاین
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div style={{ marginBottom: spacing.md }}>
          <div style={{
            fontSize: fontSize.base,
            fontWeight: 700,
            marginBottom: spacing.sm,
            color: colors.dark
          }}>
            راه‌های ارتباطی
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
            {/* Phone Support */}
            <a
              href="tel:02188888888"
              style={{
                padding: spacing.lg,
                display: "flex",
                alignItems: "center",
                gap: spacing.md,
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                background: colors.card,
                borderRadius: borderRadius.xl,
                boxShadow: shadows.sm
              }}
            >
              <div style={{
                width: "clamp(48px, 14vw, 56px)",
                height: "clamp(48px, 14vw, 56px)",
                borderRadius: borderRadius.lg,
                background: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                {/* Phone SVG Icon */}
                <svg width="clamp(24px, 7vw, 28px)" height="clamp(24px, 7vw, 28px)" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92V19.92C22 20.48 21.54 20.95 20.97 20.97C20.76 20.98 20.56 21 20.35 21C10.63 21 3 13.37 3 3.65C3 3.44 3.01 3.24 3.03 3.03C3.05 2.46 3.52 2 4.08 2H7.18C7.71 2 8.16 2.42 8.23 2.94C8.3 3.45 8.39 3.96 8.51 4.45C8.63 4.94 8.48 5.46 8.13 5.82L6.57 7.38C8.22 10.93 11.06 13.76 14.61 15.42L16.16 13.87C16.52 13.52 17.04 13.37 17.53 13.49C18.02 13.61 18.53 13.7 19.04 13.77C19.56 13.84 19.98 14.29 19.98 14.82V17.92C19.98 18.48 19.52 18.94 18.97 18.97C18.76 18.98 18.56 19 18.35 19C14.63 19 11.37 15.74 11.37 12.02C11.37 11.81 11.38 11.61 11.4 11.4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: fontSize.sm, fontWeight: 600, marginBottom: spacing.xs, color: colors.dark }}>
                  تماس تلفنی
                </div>
                <div style={{ fontSize: fontSize.sm, color: colors.muted, marginBottom: spacing.xs }}>
                  ۰۲۱-۸۸۸۸۸۸۸۸
                </div>
                <div style={{ fontSize: fontSize.xs, color: colors.success }}>
                  تماس رایگان
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 19L8 12L15 5" stroke={colors.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Email Support */}
            <a
              href="mailto:support@talabin.com"
              style={{
                padding: spacing.lg,
                display: "flex",
                alignItems: "center",
                gap: spacing.md,
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                background: colors.card,
                borderRadius: borderRadius.xl,
                boxShadow: shadows.sm
              }}
            >
              <div style={{
                width: "clamp(48px, 14vw, 56px)",
                height: "clamp(48px, 14vw, 56px)",
                borderRadius: borderRadius.lg,
                background: "linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                {/* Email SVG Icon */}
                <svg width="clamp(24px, 7vw, 28px)" height="clamp(24px, 7vw, 28px)" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: fontSize.sm, fontWeight: 600, marginBottom: spacing.xs, color: colors.dark }}>
                  ایمیل
                </div>
                <div style={{ fontSize: fontSize.xs, color: colors.muted, direction: "ltr", textAlign: "right" }}>
                  support@talabin.com
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 19L8 12L15 5" stroke={colors.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Live Chat */}
            <button
              onClick={() => alert("چت آنلاین به زودی راه‌اندازی می‌شود")}
              style={{
                padding: spacing.lg,
                display: "flex",
                alignItems: "center",
                gap: spacing.md,
                border: "none",
                textAlign: "right",
                cursor: "pointer",
                transition: "all 0.2s",
                width: "100%",
                background: colors.card,
                borderRadius: borderRadius.xl,
                boxShadow: shadows.sm
              }}
            >
              <div style={{
                width: "clamp(48px, 14vw, 56px)",
                height: "clamp(48px, 14vw, 56px)",
                borderRadius: borderRadius.lg,
                background: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                {/* Chat SVG Icon */}
                <svg width="clamp(24px, 7vw, 28px)" height="clamp(24px, 7vw, 28px)" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: fontSize.sm, fontWeight: 600, marginBottom: spacing.xs, color: colors.dark }}>
                  چت آنلاین
                </div>
                <div style={{ fontSize: fontSize.xs, color: colors.muted }}>
                  گفتگو با پشتیبانی
                </div>
              </div>
              <div style={{
                padding: `${spacing.xs} ${spacing.sm}`,
                background: "rgba(245, 158, 11, 0.1)",
                color: "#F59E0B",
                borderRadius: borderRadius.pill,
                fontSize: fontSize.xs,
                fontWeight: 600,
              }}>
                به زودی
              </div>
            </button>
          </div>
        </div>

        {/* Submit Ticket Section */}
        <div style={{ marginBottom: spacing.md }}>
          <div style={{
            fontSize: fontSize.base,
            fontWeight: 700,
            marginBottom: spacing.sm,
            color: colors.dark
          }}>
            ثبت تیکت پشتیبانی
          </div>

          {!showTicketForm ? (
            <button
              onClick={() => setShowTicketForm(true)}
              style={{
                padding: spacing.xl,
                border: `2px dashed ${colors.border}`,
                textAlign: "center",
                cursor: "pointer",
                width: "100%",
                transition: "all 0.2s",
                background: colors.card,
                borderRadius: borderRadius.xl,
                boxShadow: shadows.xs
              }}
            >
              {/* Ticket SVG Icon */}
              <svg width="clamp(40px, 12vw, 48px)" height="clamp(40px, 12vw, 48px)" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto", marginBottom: spacing.sm }}>
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div style={{ fontSize: fontSize.sm, fontWeight: 600, marginBottom: spacing.xs, color: colors.dark }}>
                ثبت تیکت جدید
              </div>
              <div style={{ fontSize: fontSize.xs, color: colors.muted }}>
                برای مشکلات پیچیده‌تر، تیکت پشتیبانی ثبت کنید
              </div>
            </button>
          ) : (
            <div style={{
              padding: spacing.xl,
              background: colors.card,
              borderRadius: borderRadius.xl,
              boxShadow: shadows.sm
            }}>
              <div style={{ fontSize: fontSize.lg, fontWeight: 600, marginBottom: spacing.lg, color: colors.dark }}>
                فرم ثبت تیکت
              </div>

              <div style={{ marginBottom: spacing.md }}>
                <label style={{
                  display: "block",
                  fontSize: fontSize.sm,
                  fontWeight: 600,
                  marginBottom: spacing.xs,
                  color: colors.dark
                }}>
                  موضوع تیکت
                </label>
                <input
                  type="text"
                  value={ticketData.subject}
                  onChange={(e) => setTicketData({ ...ticketData, subject: e.target.value })}
                  placeholder="عنوان مشکل یا سوال خود را بنویسید"
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>

              <div style={{ marginBottom: spacing.md }}>
                <label style={{
                  display: "block",
                  fontSize: fontSize.sm,
                  fontWeight: 600,
                  marginBottom: spacing.xs,
                  color: colors.dark
                }}>
                  دسته‌بندی
                </label>
                <select
                  value={ticketData.category}
                  onChange={(e) => setTicketData({ ...ticketData, category: e.target.value })}
                  className="form-input"
                  disabled={isSubmitting}
                >
                  <option value="">انتخاب کنید</option>
                  <option value="technical">مشکل فنی</option>
                  <option value="transaction">تراکنش و پرداخت</option>
                  <option value="kyc">احراز هویت</option>
                  <option value="account">حساب کاربری</option>
                  <option value="other">سایر موارد</option>
                </select>
              </div>

              <div style={{ marginBottom: spacing.md }}>
                <label style={{
                  display: "block",
                  fontSize: fontSize.sm,
                  fontWeight: 600,
                  marginBottom: spacing.xs,
                  color: colors.dark
                }}>
                  اولویت
                </label>
                <select
                  value={ticketData.priority}
                  onChange={(e) => setTicketData({ ...ticketData, priority: e.target.value })}
                  className="form-input"
                  disabled={isSubmitting}
                >
                  <option value="">انتخاب کنید</option>
                  <option value="low">کم</option>
                  <option value="medium">متوسط</option>
                  <option value="high">زیاد</option>
                  <option value="urgent">فوری</option>
                </select>
              </div>

              <div style={{ marginBottom: spacing.lg }}>
                <label style={{
                  display: "block",
                  fontSize: fontSize.sm,
                  fontWeight: 600,
                  marginBottom: spacing.xs,
                  color: colors.dark
                }}>
                  توضیحات
                </label>
                <textarea
                  value={ticketData.message}
                  onChange={(e) => setTicketData({ ...ticketData, message: e.target.value })}
                  placeholder="لطفا مشکل یا سوال خود را به طور کامل توضیح دهید..."
                  className="form-input"
                  rows={6}
                  style={{ resize: "vertical", minHeight: "120px" }}
                  disabled={isSubmitting}
                />
              </div>

              <div style={{ display: "flex", gap: spacing.sm }}>
                <button
                  onClick={() => {
                    setShowTicketForm(false);
                    setTicketData({ subject: "", category: "", priority: "", message: "" });
                  }}
                  className="btn btn-outline"
                  style={{
                    flex: 1,
                    padding: spacing.md,
                    fontSize: fontSize.sm,
                    fontWeight: 600,
                    borderRadius: borderRadius.lg,
                  }}
                  disabled={isSubmitting}
                >
                  انصراف
                </button>
                <button
                  onClick={handleSubmitTicket}
                  className="btn btn-primary"
                  style={{
                    flex: 1,
                    padding: spacing.md,
                    fontSize: fontSize.sm,
                    fontWeight: 600,
                    borderRadius: borderRadius.lg,
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "در حال ارسال..." : "ثبت تیکت"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FAQ Link */}
        <Link
          href="/profile/faq"
          style={{
            padding: spacing.lg,
            display: "flex",
            alignItems: "center",
            gap: spacing.md,
            textDecoration: "none",
            cursor: "pointer",
            transition: "all 0.2s",
            background: colors.card,
            borderRadius: borderRadius.xl,
            boxShadow: shadows.sm
          }}
        >
          <div style={{
            width: "clamp(44px, 12vw, 48px)",
            height: "clamp(44px, 12vw, 48px)",
            borderRadius: borderRadius.md,
            background: "rgba(255, 200, 87, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {/* Lightbulb SVG Icon */}
            <svg width="clamp(20px, 6vw, 24px)" height="clamp(20px, 6vw, 24px)" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H15M12 3C8.68629 3 6 5.68629 6 9C6 11.0926 7.06708 12.9299 8.66935 14.0431C9.15225 14.3702 9.43925 14.9044 9.43925 15.4761V16C9.43925 16.5523 9.88697 17 10.4393 17H13.5607C14.113 17 14.5607 16.5523 14.5607 16V15.4761C14.5607 14.9044 14.8477 14.3702 15.3306 14.0431C16.9329 12.9299 18 11.0926 18 9C18 5.68629 15.3137 3 12 3Z" stroke="#FDB022" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: fontSize.sm, fontWeight: 600, marginBottom: "2px", color: colors.dark }}>
              سوالات متداول
            </div>
            <div style={{ fontSize: fontSize.xs, color: colors.muted }}>
              ممکن است پاسخ سوال شما اینجا باشد
            </div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 19L8 12L15 5" stroke={colors.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}
