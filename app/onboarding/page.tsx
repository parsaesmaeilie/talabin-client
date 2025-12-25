"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const onboardingScreens = [
  {
    emoji: "🔒",
    title: "در خزانه‌ی امن، طلای تو",
    description: "نگهداری می‌شود، نه روی کاغذ.",
  },
  {
    emoji: "📱",
    title: "بدون واسطه، طلای آب‌شده",
    description: "روی موبایل شما.\n\nشفاف، سریع، و بدون نیاز به حضور در بازار طلا.",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleNext = () => {
    if (currentScreen < onboardingScreens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      // Navigate to signup or login
      router.push("/signup");
    }
  };

  const handleSkip = () => {
    router.push("/login");
  };

  const screen = onboardingScreens[currentScreen];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between"
      style={{ padding: "40px 24px", background: "#F5F5F5" }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", maxWidth: "400px" }}>
        {/* Emoji Illustration */}
        <div style={{ fontSize: "120px", marginBottom: "32px" }}>
          {screen.emoji}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "16px",
            lineHeight: "1.4",
          }}
        >
          {screen.title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "15px",
            color: "var(--color-muted)",
            lineHeight: "1.8",
            whiteSpace: "pre-line",
          }}
        >
          {screen.description}
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{ width: "100%", maxWidth: "400px" }}>
        {/* Pagination Dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          {onboardingScreens.map((_, index) => (
            <div
              key={index}
              style={{
                width: index === currentScreen ? "32px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: index === currentScreen ? "#1C1C1C" : "rgba(0,0,0,0.2)",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button
            onClick={handleNext}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "16px",
              fontWeight: 700,
              color: "#FFFFFF",
              background: "#1C1C1C",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            {currentScreen < onboardingScreens.length - 1 ? "بعدی" : "شروع"}
          </button>

          <button
            onClick={handleSkip}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "16px",
              fontWeight: 600,
              color: "#1C1C1C",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            رد کردن
          </button>
        </div>
      </div>
    </div>
  );
}
