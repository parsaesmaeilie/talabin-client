"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const onboardingScreens = [
  {
    illustration: "/assets/illustrations/Rectangle 975-010.png",
    title: "",
    description: "",
    isSplash: true,
  },
  {
    illustration: "/assets/illustrations/Rectangle 975-010.png",
    title: "طلای آب‌شده، بدون واسطه روی موبایل شما",
    description: "در طلابین می‌توانید طلای آب‌شده را با نرخ لحظه‌ای بازار، به‌صورت آنلاین و ۲۴ ساعته بخرید و بفروشید؛ شفاف، سریع و بدون نیاز به حضور در بازار طلا.",
  },
  {
    illustration: "/assets/illustrations/IMG_7814 1-008.png",
    title: "طلای تو، در خزانه‌ی امن",
    description: "طلای خریداری‌شده‌ی شما در طلابین به‌صورت واقعی و قابل‌ردیابی در خزانه‌های رسمی و مورد تأیید نگهداری می‌شود، نه روی کاغذ.",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleNext = () => {
    if (currentScreen < onboardingScreens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      router.push("/register");
    }
  };

  const handleSkip = () => {
    router.push("/login");
  };

  const screen = onboardingScreens[currentScreen];

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA" }}>
      {/* Responsive Container */}
      <div className="app-container desktop-shadow" style={{
        display: "flex",
        flexDirection: "column",
        padding: "24px",
        position: "relative"
      }}>
      {/* Skip Button - Only show on non-splash screens */}
      {!screen.isSplash && (
        <div style={{
          position: "absolute",
          top: "24px",
          right: "24px",
          fontSize: "14px",
          fontWeight: 600,
          color: "#1C1C1C",
          cursor: "pointer",
          zIndex: 10
        }}
        onClick={handleSkip}>
          رد کردن
        </div>
      )}

      {/* Content */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "500px",
        margin: "0 auto",
        width: "100%"
      }}>
        {/* 3D Illustration */}
        <div style={{
          width: "min(350px, 80vw)",
          height: "min(350px, 80vw)",
          marginBottom: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative"
        }}>
          <Image
            src={screen.illustration}
            alt="Onboarding"
            width={350}
            height={350}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        {/* Title - Only show on non-splash screens */}
        {!screen.isSplash && (
          <>
            <h1 style={{
              fontSize: "clamp(20px, 5vw, 28px)",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "16px",
              lineHeight: 1.5,
              color: "#1C1C1C"
            }}>
              {screen.title}
            </h1>

            {/* Description */}
            <p style={{
              fontSize: "clamp(14px, 3.5vw, 16px)",
              color: "rgba(28, 28, 28, 0.6)",
              textAlign: "center",
              lineHeight: 1.8,
              maxWidth: "420px"
            }}>
              {screen.description}
            </p>
          </>
        )}
      </div>

      {/* Bottom Section */}
      <div style={{
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto"
      }}>
        {/* Pagination Dots */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginBottom: "32px"
        }}>
          {onboardingScreens.map((_, index) => (
            <div
              key={index}
              style={{
                width: index === currentScreen ? "24px" : "8px",
                height: "8px",
                borderRadius: "999px",
                background: index === currentScreen ? "#FFC857" : "rgba(28, 28, 28, 0.2)",
                transition: "all 0.3s ease"
              }}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          style={{
            width: "100%",
            padding: "16px 24px",
            fontSize: "16px",
            fontWeight: 700,
            color: "#1C1C1C",
            background: "#FFC857",
            border: "none",
            borderRadius: "999px",
            cursor: "pointer",
            boxShadow: "0 10px 22px rgba(255, 200, 87, 0.35)",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 14px 28px rgba(255, 200, 87, 0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 22px rgba(255, 200, 87, 0.35)";
          }}
        >
          {currentScreen < onboardingScreens.length - 1 ? "بعدی" : "شروع"}
        </button>
      </div>
      {/* Close Responsive Container */}
      </div>
    </div>
  );
}
