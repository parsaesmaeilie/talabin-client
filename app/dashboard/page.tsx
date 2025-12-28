"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/src/features/auth";
import { walletService, Wallet } from "@/lib/api/wallet";
import { pricesService, GoldPrice } from "@/lib/api/prices";

export default function DashboardPage() {
  const router = useRouter();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [currentPrice, setCurrentPrice] = useState<GoldPrice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push("/(auth)/login");
      return;
    }
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [router]);

  const fetchData = async () => {
    try {
      const [walletResponse, priceResponse] = await Promise.all([
        walletService.getBalance(),
        pricesService.getCurrentPrice(),
      ]);
      if (walletResponse.success && walletResponse.data) setWallet(walletResponse.data);
      if (priceResponse.success && priceResponse.data) setCurrentPrice(priceResponse.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const toPersianNumber = (num: string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const goldValueInToman = wallet && currentPrice
    ? parseFloat(wallet.gold_balance) * parseFloat(currentPrice.sell_price)
    : 0;

  return (
    <div style={{ minHeight: "100vh", background: "#EDEDED", paddingBottom: "100px" }}>
      {/* Header */}
      <div style={{ background: "#EDEDED", padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Notification Bell */}
        <div style={{ position: "relative" }}>
          <div style={{ width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
            🔔
          </div>
          <div style={{ position: "absolute", top: "2px", left: "2px", width: "22px", height: "22px", borderRadius: "50%", background: "#EF4444", color: "white", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
            {toPersianNumber("2")}
          </div>
        </div>

        {/* Logo */}
        <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "linear-gradient(135deg, #FDB022 0%, #F59E0B 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(253, 176, 34, 0.25)", fontSize: "32px" }}>
          💰
        </div>

        {/* Profile Icon */}
        <Link href="/profile">
          <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#9CA3AF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
            👤
          </div>
        </Link>
      </div>

      {/* Content */}
      <div style={{ padding: "0 16px", maxWidth: "600px", margin: "0 auto" }}>
        {/* Balance Card */}
        <div style={{ background: "#FFFFFF", borderRadius: "24px", padding: "20px", marginBottom: "16px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
          {/* Icon */}
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#1F2937", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "24px" }}>
            📦
          </div>

          {/* Text Content */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "16px", fontWeight: 600, color: "#1F2937", marginBottom: "8px", textAlign: "right" }}>
              موجودی طلا
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "4px", justifyContent: "flex-end" }}>
              <span style={{ fontSize: "14px", color: "#6B7280" }}>گرم</span>
              <span style={{ fontSize: "24px", fontWeight: 700, color: "#1F2937" }}>
                {wallet ? toPersianNumber(parseFloat(wallet.gold_balance).toFixed(1)) : toPersianNumber("0")}
              </span>
            </div>
            <div style={{ fontSize: "13px", color: "#6B7280", textAlign: "right" }}>
              معادل <span style={{ fontWeight: 600, color: "#6B7280" }}>{toPersianNumber(Math.floor(goldValueInToman).toLocaleString("fa-IR"))}</span> تومان
            </div>
          </div>
        </div>

        {/* Quick Actions - Dark Container */}
        <div style={{ background: "#2A2A2A", borderRadius: "32px", padding: "24px 20px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            {/* خرید طلا */}
            <Link href="/dashboard/buy-sell?type=buy" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textDecoration: "none" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "rgba(251, 176, 34, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>
                💰
              </div>
              <span style={{ fontSize: "13px", color: "#FFFFFF", textAlign: "center", fontWeight: 500 }}>خریدطلا</span>
            </Link>

            {/* فروش طلا */}
            <Link href="/dashboard/buy-sell?type=sell" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textDecoration: "none" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "rgba(251, 176, 34, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>
                💎
              </div>
              <span style={{ fontSize: "13px", color: "#FFFFFF", textAlign: "center", fontWeight: 500 }}>فروش‌طلا</span>
            </Link>

            {/* کسب درآمد */}
            <Link href="/dashboard/savings" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textDecoration: "none" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "rgba(251, 176, 34, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>
                ⭐
              </div>
              <span style={{ fontSize: "13px", color: "#FFFFFF", textAlign: "center", fontWeight: 500 }}>کسب‌درآمد</span>
            </Link>

            {/* شارژ فیزیکی */}
            <Link href="/dashboard/physical-receipt" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textDecoration: "none" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "rgba(251, 176, 34, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>
                📦
              </div>
              <span style={{ fontSize: "13px", color: "#FFFFFF", textAlign: "center", fontWeight: 500 }}>شارژ فیزیکی</span>
            </Link>
          </div>
        </div>

        {/* Featured Vault Card */}
        <div style={{ background: "linear-gradient(135deg, #FFF7E6 0%, #FFFBF0 100%)", borderRadius: "28px", padding: "28px 24px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "20px", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)" }}>
          {/* Vault Icon */}
          <div style={{ width: "110px", height: "110px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "90px" }}>
            🔒
          </div>

          {/* Text */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "17px", fontWeight: 700, color: "#1F2937", lineHeight: 1.6, textAlign: "right" }}>
              <span style={{ color: "#F59E0B" }}>طلابین</span> پلتفرم امن خرید و فروش طلای آب‌شده
            </div>
          </div>
        </div>

        {/* Two Column Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "16px" }}>
          {/* Installment Card */}
          <Link href="/dashboard/installment" style={{ background: "#FFFFFF", borderRadius: "24px", padding: "24px 20px", textDecoration: "none", minHeight: "200px", display: "flex", flexDirection: "column", boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)" }}>
            <div style={{ marginBottom: "auto", display: "flex", justifyContent: "center", alignItems: "center", height: "120px", fontSize: "90px" }}>
              📅
            </div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#1F2937", textAlign: "center" }}>
              خرید قسطی
            </div>
          </Link>

          {/* Price Card */}
          <div style={{ background: "#FFFFFF", borderRadius: "24px", padding: "20px", minHeight: "200px", display: "flex", flexDirection: "column", boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px", justifyContent: "flex-end" }}>
              <span style={{ fontSize: "13px", color: "#6B7280", fontWeight: 500 }}>قیمت طلا</span>
              <span style={{ fontSize: "20px" }}>📈</span>
            </div>
            <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "8px", textAlign: "right" }}>هرگرم</div>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "#1F2937", marginBottom: "auto", textAlign: "right", direction: "rtl" }}>
              {currentPrice ? toPersianNumber(parseFloat(currentPrice.sell_price).toLocaleString("fa-IR")) : "۱۵،۳۴۸،۰۰۰"} تومان
            </div>
            {/* Wavy chart */}
            <div style={{ height: "50px", position: "relative", marginBottom: "8px" }}>
              <svg width="100%" height="50" viewBox="0 0 200 50" preserveAspectRatio="none" fill="none">
                <path d="M0 40 Q25 30 50 35 T100 25 T150 30 T200 20" stroke="#FDB022" strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{ fontSize: "11px", color: "#10B981", display: "flex", alignItems: "center", gap: "6px", justifyContent: "flex-end" }}>
              <span>{toPersianNumber("0.2")}% تغییر ۲۴ ساعته</span>
              <span style={{ fontSize: "14px" }}>▲</span>
            </div>
          </div>
        </div>

        {/* Physical Charge Card */}
        <Link href="/dashboard/physical-receipt" style={{ background: "#FFFFFF", borderRadius: "24px", padding: "24px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "20px", textDecoration: "none", boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)" }}>
          <div style={{ width: "80px", height: "80px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "64px" }}>
            🔌
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "17px", fontWeight: 700, color: "#1F2937", marginBottom: "4px", textAlign: "right" }}>
              شارژ فیزیکی
            </div>
          </div>
        </Link>

        {/* Earnings/Savings Card */}
        <Link href="/dashboard/savings" style={{ background: "#FFFFFF", borderRadius: "24px", padding: "24px", display: "flex", alignItems: "center", gap: "20px", textDecoration: "none", boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)" }}>
          <div style={{ width: "80px", height: "80px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "64px" }}>
            💰
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "17px", fontWeight: 700, color: "#1F2937", marginBottom: "4px", textAlign: "right" }}>
              کسب درآمد
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
