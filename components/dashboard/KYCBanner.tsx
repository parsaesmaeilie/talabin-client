import Link from "next/link";

export const KYCBanner = () => {
  return (
    <div
      className="card slide-in-down"
      style={{
        marginBottom: "16px",
        padding: "16px 20px",
        background: "linear-gradient(135deg, #FFF4E1 0%, #FFFFFF 100%)",
        border: "2px solid #FFC857",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <Link
          href="/kyc"
          style={{
            padding: "10px 20px",
            background: "#1C1C1C",
            color: "#FFFFFF",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          شروع
        </Link>

        <div style={{ flex: 1, textAlign: "right" }}>
          <div
            style={{
              fontSize: "15px",
              fontWeight: 600,
              marginBottom: "4px",
            }}
          >
            تکمیل احراز هویت
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--color-muted)",
              lineHeight: "1.5",
            }}
          >
            برای دسترسی به همه امکانات طلابین احراز هویت خود را تکمیل کنید
          </div>
        </div>

        <div style={{ fontSize: "36px" }}>🔐</div>
      </div>
    </div>
  );
};
