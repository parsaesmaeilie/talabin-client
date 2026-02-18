"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentFailurePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleRetry = () => {
    router.push("/dashboard/buy-sell");
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        maxWidth: "428px",
        margin: "0 auto",
      }}
    >
      {/* Header Badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "32px",
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            background: "#FF9036",
            color: "#FFFFFF",
            padding: "8px 24px",
            borderRadius: "999px",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          تراکنش ناموفق
        </div>
      </div>

      {/* Illustration */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "0 32px",
          marginBottom: "16px",
        }}
      >
        <Image
          src="/assets/illustrations/payment-failure.svg"
          alt="Payment Failed"
          width={259}
          height={195}
          style={{ maxWidth: "230px", height: "auto" }}
          priority
        />
      </div>

      {/* Main Title */}
      <div style={{ textAlign: "center", padding: "0 24px", marginBottom: "16px" }}>
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#1C1C1C",
            marginBottom: "0",
          }}
        >
          تراکنش ناموفق.
        </h1>
      </div>

      {/* Description */}
      <div
        style={{
          textAlign: "center",
          padding: "0 32px",
          marginBottom: "40px",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            color: "rgba(28,28,28,0.5)",
            lineHeight: "2",
            margin: 0,
          }}
        >
          مشکلی در فرایند پرداخت پیش آمد، لطفا دوباره تلاش کنید.
          <br />
          در صورت کسر مبلغ از حساب شما، حداکثر تا ۷۲ ساعت به
          <br />
          حساب شما بازمی‌گردد.
        </p>
      </div>

      {/* Spacer to push button down */}
      <div style={{ flex: 1 }} />

      {/* Retry Button */}
      <div
        style={{
          padding: "16px 24px 32px",
        }}
      >
        <button
          onClick={handleRetry}
          style={{
            width: "100%",
            padding: "14px",
            background: "#FF9036",
            border: "none",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#FFFFFF",
            cursor: "pointer",
          }}
        >
          تلاش مجدد
        </button>
      </div>
    </div>
  );
}
