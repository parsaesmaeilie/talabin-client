"use client";

import { useState } from "react";
import Link from "next/link";

export default function TermsPage() {
  const [acceptedTerms, setAcceptedTerms] = useState(true); // Mock: user already accepted

  const handleDownload = () => {
    alert("فایل PDF قوانین و مقررات در حال دانلود است...");
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
            قوانین و مقررات
          </h1>
          <button
            onClick={handleDownload}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "#FFFFFF",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            📥
          </button>
        </div>

        {/* Last Updated */}
        <div
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "var(--color-muted)",
            marginBottom: "20px",
          }}
        >
          آخرین به‌روزرسانی: ۱۴۰۴/۱۰/۰۱
        </div>

        {/* Terms Content */}
        <div className="card" style={{ padding: "24px", marginBottom: "16px" }}>
          {/* Section 1: User Agreement */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                marginBottom: "16px",
                color: "var(--color-dark)",
              }}
            >
              ۱. قرارداد کاربری
            </h2>
            <div
              style={{
                fontSize: "13px",
                lineHeight: "1.8",
                color: "var(--color-muted)",
              }}
            >
              <p>
                با استفاده از خدمات طلابین، شما با تمام شرایط و قوانین ذکر شده در این قرارداد
                موافقت می‌کنید. لطفا قبل از استفاده از خدمات، این قرارداد را با دقت مطالعه کنید.
              </p>
              <p>
                طلابین یک پلتفرم آنلاین برای خرید، فروش و سرمایه‌گذاری در طلا است که تحت نظارت
                بانک مرکزی و سازمان بورس و اوراق بهادار فعالیت می‌کند.
              </p>
            </div>
          </div>

          {/* Section 2: Privacy Policy */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                marginBottom: "16px",
                color: "var(--color-dark)",
              }}
            >
              ۲. حریم خصوصی
            </h2>
            <div
              style={{
                fontSize: "13px",
                lineHeight: "1.8",
                color: "var(--color-muted)",
              }}
            >
              <p>
                حفظ حریم خصوصی و امنیت اطلاعات کاربران برای ما بسیار مهم است. ما متعهد
                می‌شویم که اطلاعات شخصی شما را محرمانه نگه داریم و بدون اجازه شما در اختیار
                اشخاص ثالث قرار ندهیم.
              </p>
              <ul style={{ paddingRight: "20px", margin: "12px 0" }}>
                <li>اطلاعات شخصی شما با رمزنگاری پیشرفته محافظت می‌شود</li>
                <li>ما هرگز رمز عبور شما را از طریق ایمیل یا تلفن درخواست نمی‌کنیم</li>
                <li>اطلاعات تراکنش‌ها به صورت محرمانه نگهداری می‌شود</li>
                <li>شما می‌توانید هر زمان درخواست حذف حساب کاربری خود را داشته باشید</li>
              </ul>
            </div>
          </div>

          {/* Section 3: Trading Rules */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                marginBottom: "16px",
                color: "var(--color-dark)",
              }}
            >
              ۳. قوانین معاملات
            </h2>
            <div
              style={{
                fontSize: "13px",
                lineHeight: "1.8",
                color: "var(--color-muted)",
              }}
            >
              <p style={{ fontWeight: 600, marginBottom: "8px" }}>قیمت‌گذاری:</p>
              <ul style={{ paddingRight: "20px", margin: "12px 0" }}>
                <li>قیمت طلا بر اساس نرخ جهانی و به‌روزرسانی لحظه‌ای تعیین می‌شود</li>
                <li>کارمزد خرید و فروش ۰.۵% از مبلغ معامله است</li>
                <li>مالیات بر ارزش افزوده طبق قوانین مالیاتی کشور محاسبه می‌شود</li>
              </ul>

              <p style={{ fontWeight: 600, marginBottom: "8px", marginTop: "16px" }}>
                محدودیت‌ها:
              </p>
              <ul style={{ paddingRight: "20px", margin: "12px 0" }}>
                <li>حداقل مبلغ خرید: ۱۰۰,۰۰۰ تومان</li>
                <li>حداکثر مبلغ خرید روزانه: ۱۰۰,۰۰۰,۰۰۰ تومان (برای حساب‌های تایید شده)</li>
                <li>زمان تسویه: تراکنش‌ها در کمتر از ۲۴ ساعت تسویه می‌شوند</li>
              </ul>
            </div>
          </div>

          {/* Section 4: KYC Policy */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                marginBottom: "16px",
                color: "var(--color-dark)",
              }}
            >
              ۴. احراز هویت (KYC)
            </h2>
            <div
              style={{
                fontSize: "13px",
                lineHeight: "1.8",
                color: "var(--color-muted)",
              }}
            >
              <p>
                طبق قوانین مبارزه با پولشویی و تامین مالی تروریسم، تمام کاربران موظف به
                انجام احراز هویت هستند:
              </p>
              <ul style={{ paddingRight: "20px", margin: "12px 0" }}>
                <li>ارائه تصویر کارت ملی (رو و پشت)</li>
                <li>ارائه تصویر سلفی با کارت ملی</li>
                <li>تایید شماره موبایل و آدرس ایمیل</li>
                <li>تکمیل اطلاعات حساب بانکی</li>
              </ul>
              <p>
                در صورت عدم تکمیل احراز هویت، امکان برداشت وجه و دریافت طلای فیزیکی
                وجود نخواهد داشت.
              </p>
            </div>
          </div>

          {/* Section 5: Responsibilities */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                marginBottom: "16px",
                color: "var(--color-dark)",
              }}
            >
              ۵. مسئولیت‌ها و تعهدات
            </h2>
            <div
              style={{
                fontSize: "13px",
                lineHeight: "1.8",
                color: "var(--color-muted)",
              }}
            >
              <p style={{ fontWeight: 600, marginBottom: "8px" }}>
                مسئولیت‌های کاربر:
              </p>
              <ul style={{ paddingRight: "20px", margin: "12px 0" }}>
                <li>حفظ امنیت نام کاربری و رمز عبور</li>
                <li>صحت اطلاعات ارائه شده</li>
                <li>رعایت قوانین و مقررات کشور</li>
                <li>استفاده قانونی از خدمات</li>
              </ul>

              <p style={{ fontWeight: 600, marginBottom: "8px", marginTop: "16px" }}>
                مسئولیت‌های طلابین:
              </p>
              <ul style={{ paddingRight: "20px", margin: "12px 0" }}>
                <li>حفظ امنیت دارایی‌های کاربران</li>
                <li>ارائه قیمت‌های شفاف و به‌روز</li>
                <li>پشتیبانی ۲۴ ساعته</li>
                <li>تسویه به موقع تراکنش‌ها</li>
              </ul>
            </div>
          </div>

          {/* Section 6: Termination */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                marginBottom: "16px",
                color: "var(--color-dark)",
              }}
            >
              ۶. لغو و تعلیق حساب
            </h2>
            <div
              style={{
                fontSize: "13px",
                lineHeight: "1.8",
                color: "var(--color-muted)",
              }}
            >
              <p>
                طلابین این حق را برای خود محفوظ می‌دارد که در صورت تخلف از قوانین، حساب
                کاربری را به صورت موقت یا دائم تعلیق کند:
              </p>
              <ul style={{ paddingRight: "20px", margin: "12px 0" }}>
                <li>فعالیت‌های مشکوک یا غیرقانونی</li>
                <li>ارائه اطلاعات نادرست</li>
                <li>سوء استفاده از سیستم</li>
                <li>نقض قوانین و مقررات</li>
              </ul>
            </div>
          </div>

          {/* Section 7: Changes to Terms */}
          <div>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                marginBottom: "16px",
                color: "var(--color-dark)",
              }}
            >
              ۷. تغییرات در قوانین
            </h2>
            <div
              style={{
                fontSize: "13px",
                lineHeight: "1.8",
                color: "var(--color-muted)",
              }}
            >
              <p>
                طلابین می‌تواند در هر زمان این قوانین را به‌روزرسانی کند. تغییرات از طریق
                ایمیل و اعلان‌های داخل برنامه به اطلاع کاربران خواهد رسید. استفاده مستمر
                از خدمات پس از اعمال تغییرات، به معنی پذیرش آن‌ها است.
              </p>
            </div>
          </div>
        </div>

        {/* Acceptance Status */}
        {acceptedTerms && (
          <div
            className="card"
            style={{
              padding: "16px 20px",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              marginBottom: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ fontSize: "24px" }}>✓</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "2px" }}>
                  شما قوانین و مقررات را پذیرفته‌اید
                </div>
                <div style={{ fontSize: "11px", color: "var(--color-muted)" }}>
                  تاریخ پذیرش: ۱۴۰۴/۰۹/۰۱
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="card" style={{ padding: "20px", textAlign: "center" }}>
          <div style={{ fontSize: "13px", color: "var(--color-muted)", marginBottom: "12px" }}>
            در صورت داشتن سوال یا ابهام در مورد قوانین
          </div>
          <Link
            href="/profile/support"
            style={{
              display: "inline-block",
              padding: "10px 24px",
              background: "var(--color-primary)",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
              color: "var(--color-dark)",
            }}
          >
            تماس با پشتیبانی
          </Link>
        </div>
      </div>
    </div>
  );
}
