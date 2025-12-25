"use client";

import { useState } from "react";
import Link from "next/link";

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
            پشتیبانی
          </h1>
          <div style={{ width: "40px" }} />
        </div>

        {/* Hero Card */}
        <div
          className="card"
          style={{
            padding: "32px 24px",
            marginBottom: "20px",
            textAlign: "center",
            background: "linear-gradient(135deg, #FFC857 0%, #FFD666 100%)",
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "12px" }}>👋</div>
          <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>
            چطور می‌توانیم کمکتان کنیم؟
          </div>
          <div style={{ fontSize: "13px", color: "var(--color-dark)", opacity: 0.8 }}>
            تیم پشتیبانی طلابین ۲۴ ساعته آماده پاسخگویی به سوالات شماست
          </div>
        </div>

        {/* Support Hours */}
        <div
          className="card"
          style={{
            padding: "16px 20px",
            marginBottom: "16px",
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ fontSize: "24px" }}>🕐</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "2px" }}>
                ساعات پاسخگویی
              </div>
              <div style={{ fontSize: "12px", color: "var(--color-muted)" }}>
                همه روزه ۲۴ ساعته
              </div>
            </div>
            <div
              style={{
                padding: "4px 12px",
                background: "#10B981",
                color: "#FFFFFF",
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: 600,
              }}
            >
              آنلاین
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              fontSize: "15px",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            راه‌های ارتباطی
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* Phone Support */}
            <a
              href="tel:02188888888"
              className="card"
              style={{
                padding: "20px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  flexShrink: 0,
                }}
              >
                📞
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
                  تماس تلفنی
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-muted)", marginBottom: "6px" }}>
                  ۰۲۱-۸۸۸۸۸۸۸۸
                </div>
                <div style={{ fontSize: "11px", color: "#10B981" }}>
                  تماس رایگان
                </div>
              </div>
              <div style={{ fontSize: "20px", color: "var(--color-muted)" }}>‹</div>
            </a>

            {/* Email Support */}
            <a
              href="mailto:support@talabin.com"
              className="card"
              style={{
                padding: "20px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  flexShrink: 0,
                }}
              >
                📧
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
                  ایمیل
                </div>
                <div style={{ fontSize: "12px", color: "var(--color-muted)", direction: "ltr", textAlign: "right" }}>
                  support@talabin.com
                </div>
              </div>
              <div style={{ fontSize: "20px", color: "var(--color-muted)" }}>‹</div>
            </a>

            {/* Live Chat */}
            <button
              onClick={() => alert("چت آنلاین به زودی راه‌اندازی می‌شود")}
              className="card"
              style={{
                padding: "20px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                border: "none",
                textAlign: "right",
                cursor: "pointer",
                transition: "all 0.2s",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  flexShrink: 0,
                }}
              >
                💬
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
                  چت آنلاین
                </div>
                <div style={{ fontSize: "12px", color: "var(--color-muted)" }}>
                  گفتگو با پشتیبانی
                </div>
              </div>
              <div
                style={{
                  padding: "4px 12px",
                  background: "rgba(245, 158, 11, 0.1)",
                  color: "#F59E0B",
                  borderRadius: "999px",
                  fontSize: "10px",
                  fontWeight: 600,
                }}
              >
                به زودی
              </div>
            </button>
          </div>
        </div>

        {/* Submit Ticket Section */}
        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              fontSize: "15px",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            ثبت تیکت پشتیبانی
          </div>

          {!showTicketForm ? (
            <button
              onClick={() => setShowTicketForm(true)}
              className="card"
              style={{
                padding: "24px",
                border: "2px dashed rgba(0,0,0,0.1)",
                textAlign: "center",
                cursor: "pointer",
                width: "100%",
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎫</div>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
                ثبت تیکت جدید
              </div>
              <div style={{ fontSize: "12px", color: "var(--color-muted)" }}>
                برای مشکلات پیچیده‌تر، تیکت پشتیبانی ثبت کنید
              </div>
            </button>
          ) : (
            <div className="card" style={{ padding: "24px" }}>
              <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "20px" }}>
                فرم ثبت تیکت
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

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
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

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
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

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
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

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => {
                    setShowTicketForm(false);
                    setTicketData({ subject: "", category: "", priority: "", message: "" });
                  }}
                  className="btn btn-outline"
                  style={{
                    flex: 1,
                    padding: "14px",
                    fontSize: "14px",
                    fontWeight: 600,
                    borderRadius: "12px",
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
                    padding: "14px",
                    fontSize: "14px",
                    fontWeight: 600,
                    borderRadius: "12px",
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
          className="card"
          style={{
            padding: "20px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            textDecoration: "none",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "rgba(255, 200, 87, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            💡
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "2px" }}>
              سوالات متداول
            </div>
            <div style={{ fontSize: "12px", color: "var(--color-muted)" }}>
              ممکن است پاسخ سوال شما اینجا باشد
            </div>
          </div>
          <div style={{ fontSize: "20px", color: "var(--color-muted)" }}>‹</div>
        </Link>
      </div>
    </div>
  );
}
