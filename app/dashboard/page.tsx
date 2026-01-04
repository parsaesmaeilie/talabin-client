"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authService } from "@/src/features/auth";
import { walletService, Wallet } from "@/lib/api/wallet";
import { pricesService, GoldPrice } from "@/lib/api/prices";
import { toPersianNumber, formatCurrencyPersian } from "@/lib/utils/helpers";
import { spacing, fontSize, colors, borderRadius, shadows } from "@/lib/utils/design-tokens";
import { ShimmerBox, ShimmerCard, ShimmerCircle } from "@/components/ui/ShimmerBox";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

export default function DashboardPage() {
  const router = useRouter();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [currentPrice, setCurrentPrice] = useState<GoldPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push("/login");
      return;
    }
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [router]);

  const fetchData = async () => {
    try {
      setError(null);
      const [walletResponse, priceResponse] = await Promise.all([
        walletService.getBalance(),
        pricesService.getCurrentPrice(),
      ]);
      if (walletResponse.success && walletResponse.data) setWallet(walletResponse.data);
      if (priceResponse.success && priceResponse.data) setCurrentPrice(priceResponse.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("خطا در بارگذاری اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  const goldValueInToman = wallet && currentPrice
    ? parseFloat(wallet.gold_balance) * parseFloat(currentPrice.sell_price)
    : 0;

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#EDEDED", paddingBottom: "100px" }}>
        <div style={{ padding: spacing.md }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: spacing.lg }}>
            <ShimmerCircle size="44px" />
            <ShimmerCircle size="56px" />
            <ShimmerCircle size="44px" />
          </div>
          <ShimmerCard />
          <div style={{ marginTop: spacing.lg }}>
            <ShimmerBox height="120px" borderRadius={borderRadius.xl} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: spacing.md, marginTop: spacing.lg }}>
            <ShimmerCard />
            <ShimmerCard />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#EDEDED", paddingBottom: "100px" }}>
      {/* Responsive Container for Desktop */}
      <div style={{
        maxWidth: "428px",
        margin: "0 auto",
        background: "#EDEDED",
        minHeight: "100vh",
        position: "relative"
      }}
      className="desktop-shadow">
        {/* Header */}
        <div style={{
          background: "#EDEDED",
          padding: spacing.md,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
        {/* Notification Bell */}
        <div style={{ position: "relative", cursor: "pointer" }}>
          <div style={{
            width: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12.02 2.91C8.71 2.91 6.02 5.6 6.02 8.91V11.8C6.02 12.41 5.76 13.34 5.45 13.86L4.3 15.77C3.59 16.95 4.08 18.26 5.38 18.7C9.69 20.14 14.34 20.14 18.65 18.7C19.86 18.3 20.39 16.87 19.73 15.77L18.58 13.86C18.28 13.34 18.02 12.41 18.02 11.8V8.91C18.02 5.61 15.32 2.91 12.02 2.91Z" stroke="#6B7280" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
              <path d="M13.87 3.2C13.56 3.11 13.24 3.04 12.91 3C11.95 2.88 11.03 2.95 10.17 3.2C10.46 2.46 11.18 1.94 12.02 1.94C12.86 1.94 13.58 2.46 13.87 3.2Z" stroke="#6B7280" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.02 19.06C15.02 20.71 13.67 22.06 12.02 22.06C11.2 22.06 10.44 21.72 9.90002 21.18C9.36002 20.64 9.02002 19.88 9.02002 19.06" stroke="#6B7280" strokeWidth="1.5" strokeMiterlimit="10"/>
            </svg>
          </div>
          <div style={{
            position: "absolute",
            top: "-2px",
            right: "-2px",
            minWidth: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#EF4444",
            color: "white",
            fontSize: "11px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            padding: "0 4px"
          }}>
            {toPersianNumber("2")}
          </div>
        </div>

        {/* Logo */}
        <div style={{
          width: "56px",
          height: "56px",
          borderRadius: borderRadius.lg,
          background: "linear-gradient(135deg, #FDB022 0%, #F59E0B 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: shadows.primary
        }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="6" y="12" width="20" height="14" rx="2" fill="#1C1C1C"/>
            <rect x="10" y="6" width="12" height="8" rx="1" fill="#FDB022"/>
            <circle cx="16" cy="19" r="3" fill="#FDB022"/>
          </svg>
        </div>

        {/* Profile Icon */}
        <Link href="/profile" style={{ textDecoration: "none" }}>
          <div style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "#9CA3AF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            cursor: "pointer"
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="white"/>
              <path d="M12 14.5C6.99 14.5 2.91 17.86 2.91 22C2.91 22.28 3.13 22.5 3.41 22.5H20.59C20.87 22.5 21.09 22.28 21.09 22C21.09 17.86 17.01 14.5 12 14.5Z" fill="white"/>
            </svg>
          </div>
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{ padding: `0 ${spacing.md}`, maxWidth: "600px", margin: "0 auto" }}>
          <ErrorMessage message={error} onRetry={fetchData} />
        </div>
      )}

      {/* Content */}
      <div style={{
        padding: `0 ${spacing.md}`,
        maxWidth: "600px",
        margin: "0 auto"
      }}>
        {/* اولین خرید طلا Card - FIRST CARD */}
        <Link href="/dashboard/buy-sell" style={{ textDecoration: "none" }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: borderRadius.xl,
            padding: spacing.lg,
            marginBottom: spacing.md,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: shadows.sm,
            cursor: "pointer",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = shadows.sm;
          }}>
            {/* Gold Coin Icon */}
            <div style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FDB022 0%, #F59E0B 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 4px 12px rgba(253, 176, 34, 0.3)"
            }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" fill="#1C1C1C"/>
                <circle cx="16" cy="16" r="10" fill="#FDB022"/>
                <path d="M16 10V22M12 16H20" stroke="#1C1C1C" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Text + Button */}
            <div style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: spacing.sm,
              paddingRight: spacing.md
            }}>
              <div style={{
                fontSize: fontSize.lg,
                fontWeight: 700,
                color: colors.dark,
                textAlign: "right"
              }}>
                اولین خرید طلا
              </div>
              <div style={{
                width: "100%",
                padding: "10px 20px",
                background: colors.dark,
                color: "#FFFFFF",
                borderRadius: borderRadius.lg,
                fontSize: fontSize.md,
                fontWeight: 700,
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(28, 28, 28, 0.2)"
              }}>
                خرید طلا
              </div>
            </div>
          </div>
        </Link>

        {/* Balance Card - Updated to match Figma */}
        <div style={{
          background: "#FFFFFF",
          borderRadius: borderRadius.xl,
          padding: spacing.lg,
          marginBottom: spacing.md,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          boxShadow: shadows.sm
        }}>
          {/* Receipt Icon - LEFT SIDE */}
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: borderRadius.md,
            background: colors.dark,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8 2V5" stroke="#FDB022" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 2V5" stroke="#FDB022" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.5 9.08997H20.5" stroke="#FDB022" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#FDB022" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.9955 13.7H12.0045" stroke="#FDB022" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.29431 13.7H8.30329" stroke="#FDB022" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.29431 16.7H8.30329" stroke="#FDB022" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Text Content - RIGHT SIDE */}
          <div style={{
            flex: 1,
            paddingRight: spacing.md,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end"
          }}>
            <div style={{
              fontSize: fontSize.lg,
              fontWeight: 600,
              color: colors.dark,
              marginBottom: spacing.xs,
              textAlign: "right"
            }}>
              موجودی طلا
            </div>
            <div style={{
              display: "flex",
              alignItems: "baseline",
              gap: spacing.xs,
              marginBottom: "4px"
            }}>
              <span style={{ fontSize: fontSize.sm, color: colors.muted }}>گرم</span>
              <span style={{
                fontSize: fontSize['2xl'],
                fontWeight: 700,
                color: colors.dark
              }}>
                {wallet ? toPersianNumber(parseFloat(wallet.gold_balance).toFixed(1)) : toPersianNumber("۰")}
              </span>
            </div>
            <div style={{
              fontSize: fontSize.sm,
              color: colors.muted,
              textAlign: "right"
            }}>
              معادل
            </div>
            <div style={{
              fontSize: fontSize.md,
              fontWeight: 600,
              color: colors.dark,
              textAlign: "right"
            }}>
              {formatCurrencyPersian(Math.floor(goldValueInToman))} تومان
            </div>
          </div>
        </div>

        {/* Quick Actions - Dark Container */}
        <div style={{
          background: colors.darkCard,
          borderRadius: borderRadius['2xl'],
          padding: `${spacing.lg} ${spacing.md}`,
          marginBottom: spacing.md
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: spacing.md
          }}>
            {/* خرید طلا */}
            <Link href="/dashboard/buy-sell?type=buy" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: spacing.sm,
              textDecoration: "none"
            }}>
              <div style={{
                width: "clamp(52px, 14vw, 56px)",
                height: "clamp(52px, 14vw, 56px)",
                borderRadius: borderRadius.md,
                background: "rgba(251, 176, 34, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden"
              }}>
                <Image
                  src="/assets/illustrations/IMG_7855 1-013.png"
                  alt="Buy Gold"
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span style={{
                fontSize: fontSize.xs,
                color: colors.card,
                textAlign: "center",
                fontWeight: 500
              }}>خریدطلا</span>
            </Link>

            {/* فروش طلا */}
            <Link href="/dashboard/buy-sell?type=sell" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: spacing.sm,
              textDecoration: "none"
            }}>
              <div style={{
                width: "clamp(52px, 14vw, 56px)",
                height: "clamp(52px, 14vw, 56px)",
                borderRadius: borderRadius.md,
                background: "rgba(251, 176, 34, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden"
              }}>
                <Image
                  src="/assets/illustrations/IMG_7813 1-009.png"
                  alt="Sell Gold"
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span style={{
                fontSize: fontSize.xs,
                color: colors.card,
                textAlign: "center",
                fontWeight: 500
              }}>فروش‌طلا</span>
            </Link>

            {/* کسب درآمد */}
            <Link href="/dashboard/savings" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: spacing.sm,
              textDecoration: "none"
            }}>
              <div style={{
                width: "clamp(52px, 14vw, 56px)",
                height: "clamp(52px, 14vw, 56px)",
                borderRadius: borderRadius.md,
                background: "rgba(251, 176, 34, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden"
              }}>
                <Image
                  src="/assets/illustrations/IMG_7882 1-004.png"
                  alt="Earn Income"
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span style={{
                fontSize: fontSize.xs,
                color: colors.card,
                textAlign: "center",
                fontWeight: 500
              }}>کسب‌درآمد</span>
            </Link>

            {/* شارژ فیزیکی */}
            <Link href="/dashboard/physical-receipt" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: spacing.sm,
              textDecoration: "none"
            }}>
              <div style={{
                width: "clamp(52px, 14vw, 56px)",
                height: "clamp(52px, 14vw, 56px)",
                borderRadius: borderRadius.md,
                background: "rgba(251, 176, 34, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden"
              }}>
                <Image
                  src="/assets/illustrations/IMG_7820 1-002.png"
                  alt="Physical Charge"
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span style={{
                fontSize: fontSize.xs,
                color: colors.card,
                textAlign: "center",
                fontWeight: 500
              }}>شارژ فیزیکی</span>
            </Link>
          </div>
        </div>

        {/* Featured Vault Card */}
        <div style={{
          background: "linear-gradient(135deg, #FFF7E6 0%, #FFFBF0 100%)",
          borderRadius: borderRadius['2xl'],
          padding: spacing.lg,
          marginBottom: spacing.md,
          display: "flex",
          alignItems: "center",
          gap: spacing.md,
          boxShadow: shadows.sm
        }}>
          {/* Vault Icon */}
          <div style={{
            width: "clamp(90px, 25vw, 110px)",
            height: "clamp(90px, 25vw, 110px)",
            flexShrink: 0,
            position: "relative"
          }}>
            <Image
              src="/assets/illustrations/Rectangle 975-010.png"
              alt="Vault"
              width={110}
              height={110}
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Text */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: fontSize.lg,
              fontWeight: 700,
              color: colors.dark,
              lineHeight: 1.6,
              textAlign: "right"
            }}>
              <span style={{ color: colors.primaryDark }}>طلابین</span> پلتفرم امن خرید و فروش طلای آب‌شده
            </div>
          </div>
        </div>

        {/* Two Column Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: spacing.md,
          marginBottom: spacing.md
        }}>
          {/* Installment Card */}
          <Link href="/dashboard/installment" style={{
            background: colors.card,
            borderRadius: borderRadius.xl,
            padding: `${spacing.lg} ${spacing.md}`,
            textDecoration: "none",
            minHeight: "clamp(180px, 50vw, 200px)",
            display: "flex",
            flexDirection: "column",
            boxShadow: shadows.sm
          }}>
            <div style={{
              marginBottom: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "clamp(100px, 28vw, 120px)",
              position: "relative"
            }}>
              <Image
                src="/assets/illustrations/IMG_7814 1-008.png"
                alt="Installment"
                width={120}
                height={120}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div style={{
              fontSize: fontSize.lg,
              fontWeight: 700,
              color: colors.dark,
              textAlign: "center"
            }}>
              خرید قسطی
            </div>
          </Link>

          {/* Price Card */}
          <div style={{
            background: colors.card,
            borderRadius: borderRadius.xl,
            padding: spacing.md,
            minHeight: "clamp(180px, 50vw, 200px)",
            display: "flex",
            flexDirection: "column",
            boxShadow: shadows.sm
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: spacing.xs,
              marginBottom: "2px",
              justifyContent: "flex-end"
            }}>
              <span style={{
                fontSize: fontSize.sm,
                color: colors.muted,
                fontWeight: 500
              }}>قیمت طلا</span>
              {/* Chart Icon SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 22H21" stroke="#FDB022" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.6 8.80005L10.25 13.45L13.75 9.95005L18.4 14.6" stroke="#FDB022" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 14.6H18.4V11.2" stroke="#FDB022" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{
              fontSize: fontSize.xs,
              color: "#9CA3AF",
              marginBottom: spacing.xs,
              textAlign: "right"
            }}>هرگرم</div>
            <div style={{
              fontSize: fontSize['2xl'],
              fontWeight: 700,
              color: colors.dark,
              marginBottom: "auto",
              textAlign: "right",
              direction: "rtl"
            }}>
              {currentPrice ? toPersianNumber(parseFloat(currentPrice.sell_price).toLocaleString("fa-IR")) : "۱۵،۳۴۸،۰۰۰"} تومان
            </div>
            {/* Wavy chart */}
            <div style={{
              height: "clamp(40px, 12vw, 50px)",
              position: "relative",
              marginBottom: spacing.xs
            }}>
              <svg width="100%" height="50" viewBox="0 0 200 50" preserveAspectRatio="none" fill="none">
                <path d="M0 40 Q25 30 50 35 T100 25 T150 30 T200 20" stroke="#FDB022" strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{
              fontSize: fontSize.xs,
              color: colors.success,
              display: "flex",
              alignItems: "center",
              gap: spacing.xs,
              justifyContent: "flex-end"
            }}>
              <span>{toPersianNumber("0.2")}% تغییر ۲۴ ساعته</span>
              <span style={{ fontSize: fontSize.sm }}>▲</span>
            </div>
          </div>
        </div>

        {/* Two Column Bottom Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: spacing.md,
          marginBottom: spacing.md
        }}>
          {/* Physical Charge Card */}
          <Link href="/dashboard/physical-receipt" style={{
            background: colors.card,
            borderRadius: borderRadius.xl,
            padding: `${spacing.lg} ${spacing.md}`,
            textDecoration: "none",
            minHeight: "clamp(180px, 50vw, 200px)",
            display: "flex",
            flexDirection: "column",
            boxShadow: shadows.sm
          }}>
            <div style={{
              marginBottom: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "clamp(100px, 28vw, 120px)",
              position: "relative"
            }}>
              <Image
                src="/assets/illustrations/IMG_7818 2-003.png"
                alt="Physical Charge"
                width={120}
                height={120}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div style={{
              fontSize: fontSize.lg,
              fontWeight: 700,
              color: colors.dark,
              textAlign: "center"
            }}>
              شارژ فیزیکی
            </div>
          </Link>

          {/* Earnings/Savings Card */}
          <Link href="/dashboard/savings" style={{
            background: colors.card,
            borderRadius: borderRadius.xl,
            padding: `${spacing.lg} ${spacing.md}`,
            textDecoration: "none",
            minHeight: "clamp(180px, 50vw, 200px)",
            display: "flex",
            flexDirection: "column",
            boxShadow: shadows.sm
          }}>
            <div style={{
              marginBottom: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "clamp(100px, 28vw, 120px)",
              position: "relative"
            }}>
              <Image
                src="/assets/illustrations/IMG_7812 1-005.png"
                alt="Earn Income"
                width={120}
                height={120}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div style={{
              fontSize: fontSize.lg,
              fontWeight: 700,
              color: colors.dark,
              textAlign: "center"
            }}>
              کسب درآمد
            </div>
          </Link>
        </div>
      </div>
      {/* Close Responsive Container */}
      </div>
    </div>
  );
}
