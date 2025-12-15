import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(0,0,0,0.04)",
        padding: "18px 0 24px",
        fontSize: "11px",
        color: "rgba(28,28,28,0.6)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "18px",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Brand and description */}
          <div style={{ minWidth: "210px", flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "10px",
                  background: "#FFC857",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#1C1C1C",
                }}
              >
                ط
              </div>
              <div style={{ fontWeight: 700, fontSize: "14px", color: "#1C1C1C" }}>
                طلا بین
              </div>
            </div>
            <p
              style={{
                margin: "0 0 10px",
                fontSize: "11px",
                lineHeight: 1.9,
                color: "rgba(28,28,28,0.7)",
              }}
            >
              پلتفرم خرید و فروش طلای دیجیتال با پشتوانه طلای واقعی در خزانه بانک
              کارگشایی؛ مناسب سرمایه‌گذاران و تازه‌کارها با کارمزد شفاف ۰٫۵٪.
            </p>
            <div style={{ fontSize: "11px", color: "rgba(28,28,28,0.6)", marginTop: "4px" }}>
              © ۱۴۰۳ طلابین – تمام حقوق محفوظ است.
            </div>
          </div>

          {/* Important links */}
          <div style={{ minWidth: "150px" }}>
            <div style={{ fontWeight: 600, fontSize: "12px", marginBottom: "8px", color: "#1C1C1C" }}>
              لینک‌های مهم
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <a href="#" style={{ fontSize: "11px", color: "rgba(28,28,28,0.7)" }}>
                درباره طلابین
              </a>
              <a href="#" style={{ fontSize: "11px", color: "rgba(28,28,28,0.7)" }}>
                قوانین و حریم خصوصی
              </a>
              <a href="#" style={{ fontSize: "11px", color: "rgba(28,28,28,0.7)" }}>
                راهنما و سؤالات متداول
              </a>
              <a href="#blog" style={{ fontSize: "11px", color: "rgba(28,28,28,0.7)" }}>
                بلاگ
              </a>
            </div>
          </div>

          {/* Contact */}
          <div style={{ minWidth: "180px" }}>
            <div style={{ fontWeight: 600, fontSize: "12px", marginBottom: "8px", color: "#1C1C1C" }}>
              ارتباط با ما
            </div>
            <div style={{ fontSize: "11px", marginBottom: "6px" }}>
              ایمیل پشتیبانی:{" "}
              <a
                href="mailto:support@example.com"
                style={{ color: "rgba(28,28,28,0.8)" }}
              >
                support@example.com
              </a>
            </div>
            <div style={{ fontSize: "11px", marginBottom: "8px" }}>
              پشتیبانی ۲۴ ساعته در روزهای کاری و تعطیل.
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              <a href="#" style={{ fontSize: "11px" }}>
                اینستاگرام
              </a>
              <a href="#" style={{ fontSize: "11px" }}>
                تلگرام
              </a>
              <a href="#" style={{ fontSize: "11px" }}>
                توئیتر / ایکس
              </a>
            </div>
          </div>

          {/* Certifications */}
          <div style={{ minWidth: "190px" }}>
            <div style={{ fontWeight: 600, fontSize: "12px", marginBottom: "8px", color: "#1C1C1C" }}>
              مجوزها و نمادها
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              {/* E-namad placeholder */}
              <div
                style={{
                  width: "78px",
                  height: "78px",
                  borderRadius: "10px",
                  background: "#FFFFFF",
                  boxShadow: "0 8px 18px rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  textAlign: "center",
                  padding: "6px",
                  color: "#1C1C1C",
                }}
              >
                نماد اعتماد الکترونیکی
              </div>

              {/* License placeholder */}
              <div
                style={{
                  width: "78px",
                  height: "78px",
                  borderRadius: "10px",
                  background: "#FFFFFF",
                  boxShadow: "0 8px 18px rgba(0,0,0,0.06)",
                  padding: "6px",
                  fontSize: "10px",
                  textAlign: "center",
                  lineHeight: 1.7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1C1C1C",
                }}
              >
                پروانه کسب فروش طلای آب‌شده
              </div>
            </div>

            <p
              style={{
                margin: 0,
                fontSize: "10px",
                lineHeight: 1.8,
                color: "rgba(28,28,28,0.7)",
              }}
            >
              طلابین دارای <strong>اینماد</strong> و{" "}
              <strong>پروانه کسب فروش طلای آب‌شده</strong> است و معاملات تحت
              قوانین جاری کشور انجام می‌شود.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
