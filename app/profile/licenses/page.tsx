"use client";

import Link from "next/link";

export default function LicensesPage() {
  const licenses = [
    {
      id: "1",
      title: "مجوز فعالیت از بانک مرکزی",
      issuer: "بانک مرکزی جمهوری اسلامی ایران",
      licenseNumber: "۹۸۷۶۵۴۳۲۱",
      issueDate: "۱۴۰۰/۰۱/۰۱",
      expiryDate: "۱۴۰۵/۰۱/۰۱",
      status: "active",
      icon: "🏛️",
      color: { bg: "rgba(16, 185, 129, 0.1)", color: "#10B981" },
    },
    {
      id: "2",
      title: "مجوز فعالیت از سازمان بورس",
      issuer: "سازمان بورس و اوراق بهادار",
      licenseNumber: "۱۲۳۴۵۶۷۸۹",
      issueDate: "۱۴۰۰/۰۳/۱۵",
      expiryDate: "۱۴۰۵/۰۳/۱۵",
      status: "active",
      icon: "📊",
      color: { bg: "rgba(59, 130, 246, 0.1)", color: "#3B82F6" },
    },
    {
      id: "3",
      title: "گواهی ثبت شرکت",
      issuer: "سازمان ثبت شرکت‌ها",
      licenseNumber: "۵۶۷۸۹۰۱۲۳",
      issueDate: "۱۳۹۹/۱۰/۲۰",
      expiryDate: "-",
      status: "active",
      icon: "📋",
      color: { bg: "rgba(245, 158, 11, 0.1)", color: "#F59E0B" },
    },
    {
      id: "4",
      title: "گواهینامه استاندارد ISO 27001",
      issuer: "سازمان ملی استاندارد ایران",
      licenseNumber: "ISO-۲۷۰۰۱-۲۰۲۳",
      issueDate: "۱۴۰۲/۰۶/۱۰",
      expiryDate: "۱۴۰۵/۰۶/۱۰",
      status: "active",
      icon: "🔒",
      color: { bg: "rgba(139, 92, 246, 0.1)", color: "#8B5CF6" },
    },
  ];

  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const handleDownload = (title: string) => {
    alert(`دانلود ${title}...`);
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
            مجوزها و گواهینامه‌ها
          </h1>
          <div style={{ width: "40px" }} />
        </div>

        {/* Info Banner */}
        <div
          className="card"
          style={{
            padding: "20px",
            marginBottom: "20px",
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.1) 100%)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>✅</div>
          <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "6px" }}>
            طلابین دارای تمام مجوزهای لازم است
          </div>
          <div style={{ fontSize: "12px", color: "var(--color-muted)" }}>
            فعالیت ما تحت نظارت بانک مرکزی و سازمان بورس می‌باشد
          </div>
        </div>

        {/* Company Info */}
        <div className="card" style={{ padding: "20px", marginBottom: "16px" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>
            اطلاعات شرکت
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <span style={{ fontSize: "12px", color: "var(--color-muted)" }}>
                نام شرکت
              </span>
              <span style={{ fontSize: "13px", fontWeight: 600 }}>
                شرکت سرمایه‌گذاری طلابین
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <span style={{ fontSize: "12px", color: "var(--color-muted)" }}>
                شناسه ملی
              </span>
              <span style={{ fontSize: "13px", fontWeight: 600 }}>
                {toPersianNumber("14007654321")}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <span style={{ fontSize: "12px", color: "var(--color-muted)" }}>
                شماره ثبت
              </span>
              <span style={{ fontSize: "13px", fontWeight: 600 }}>
                {toPersianNumber("567890")}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
              }}
            >
              <span style={{ fontSize: "12px", color: "var(--color-muted)" }}>
                تاریخ تاسیس
              </span>
              <span style={{ fontSize: "13px", fontWeight: 600 }}>
                ۱۳۹۹/۱۰/۲۰
              </span>
            </div>
          </div>
        </div>

        {/* Licenses List */}
        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              fontSize: "15px",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            مجوزها و گواهینامه‌ها
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {licenses.map((license, index) => (
              <div
                key={license.id}
                className="card"
                style={{
                  padding: "20px",
                  animation: `slideInUp 0.3s ease-out ${index * 0.1}s backwards`,
                }}
              >
                <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "16px",
                      background: license.color.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                      flexShrink: 0,
                    }}
                  >
                    {license.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        marginBottom: "6px",
                      }}
                    >
                      {license.title}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--color-muted)",
                        marginBottom: "8px",
                      }}
                    >
                      {license.issuer}
                    </div>
                    <div
                      style={{
                        padding: "4px 12px",
                        background: license.color.bg,
                        color: license.color.color,
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: 600,
                        display: "inline-block",
                      }}
                    >
                      فعال
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: "16px",
                    background: "rgba(0,0,0,0.02)",
                    borderRadius: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "var(--color-muted)",
                          marginBottom: "4px",
                        }}
                      >
                        شماره مجوز
                      </div>
                      <div style={{ fontSize: "13px", fontWeight: 600 }}>
                        {license.licenseNumber}
                      </div>
                    </div>

                    <div style={{ textAlign: "left" }}>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "var(--color-muted)",
                          marginBottom: "4px",
                        }}
                      >
                        تاریخ صدور
                      </div>
                      <div style={{ fontSize: "13px", fontWeight: 600 }}>
                        {license.issueDate}
                      </div>
                    </div>

                    {license.expiryDate !== "-" && (
                      <>
                        <div>
                          <div
                            style={{
                              fontSize: "11px",
                              color: "var(--color-muted)",
                              marginBottom: "4px",
                            }}
                          >
                            تاریخ انقضا
                          </div>
                          <div style={{ fontSize: "13px", fontWeight: 600 }}>
                            {license.expiryDate}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(license.title)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "rgba(255, 200, 87, 0.1)",
                    border: "1px solid var(--color-primary)",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  📄 دانلود تصویر مجوز
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Card */}
        <div className="card" style={{ padding: "20px", textAlign: "center" }}>
          <div style={{ fontSize: "13px", color: "var(--color-muted)", marginBottom: "12px" }}>
            برای اطلاعات بیشتر درباره مجوزها و فعالیت‌های ما
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
