"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { walletService, Wallet } from "@/lib/api/wallet";
import { pricesService } from "@/lib/api/prices";

export default function WalletPage() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentGoldPrice, setCurrentGoldPrice] = useState<number>(0);

  useEffect(() => {
    fetchWalletData();
    const interval = setInterval(fetchWalletData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchWalletData = async () => {
    try {
      const [walletResponse, priceResponse] = await Promise.all([
        walletService.getBalance(),
        pricesService.getCurrentPrice(),
      ]);

      if (walletResponse.success && walletResponse.data) {
        setWallet(walletResponse.data);
      }

      if (priceResponse.success && priceResponse.data) {
        setCurrentGoldPrice(parseFloat(priceResponse.data.sell_price));
      }
    } catch (err: any) {
      console.error("Error fetching wallet data:", err);
    } finally {
      setLoading(false);
    }
  };

  const toPersianNumber = (num: string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const goldValueInToman = wallet && currentGoldPrice
    ? parseFloat(wallet.available_gold_balance) * currentGoldPrice
    : 0;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FFFFFF",
      paddingBottom: "100px",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      maxWidth: "428px",
      margin: "0 auto",
    }}>
      {/* Header */}
      <div style={{
        background: "#FFFFFF",
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "0.5px solid #E8E8E8",
      }}>
        <div style={{ width: "24px" }} />
        <h1 style={{
          fontSize: "17px",
          fontWeight: 600,
          color: "#000000",
          margin: 0,
        }}>
          کیف‌پول
        </h1>
        <Link href="/dashboard" style={{ display: 'flex' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 19L8 12L15 5"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      {/* Content */}
      <div style={{
        padding: "16px",
      }}>
        {/* Balance Card */}
        <div style={{
          background: "#2C2C2C",
          borderRadius: "20px",
          padding: "16px",
          position: "relative",
          marginBottom: "200px",
        }}>
          {/* Menu Icon */}
          <button style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.15)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="3" width="12" height="1.5" rx="0.75" fill="white"/>
              <rect x="2" y="7.25" width="12" height="1.5" rx="0.75" fill="white"/>
              <rect x="2" y="11.5" width="12" height="1.5" rx="0.75" fill="white"/>
            </svg>
          </button>

          {/* Gold Balance */}
          <div style={{
            textAlign: "right",
            marginBottom: "12px",
          }}>
            <div style={{
              color: "#FFC857",
              fontSize: "12px",
              fontWeight: 500,
              marginBottom: "2px",
            }}>
              موجودی طلا
            </div>
            <div style={{
              color: "#FFC857",
              fontSize: "18px",
              fontWeight: 700,
              marginBottom: "8px",
              direction: "rtl",
            }}>
              {loading ? "..." : `${toPersianNumber(parseFloat(wallet?.available_gold_balance || "0").toFixed(2))} گرم`}
            </div>
          </div>

          {/* Equivalent */}
          <div style={{
            textAlign: "right",
            marginBottom: "14px",
          }}>
            <div style={{
              color: "#8E8E8E",
              fontSize: "11px",
              marginBottom: "2px",
            }}>
              معادل
            </div>
            <div style={{
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 600,
              direction: "rtl",
            }}>
              {loading ? "..." : `${toPersianNumber(Math.floor(goldValueInToman).toLocaleString("fa-IR"))} تومان`}
            </div>
          </div>

          {/* Divider */}
          <div style={{
            height: "0.5px",
            background: "rgba(255, 255, 255, 0.2)",
            margin: "14px 0",
          }} />

          {/* Cash Balance */}
          <div style={{
            textAlign: "right",
            marginBottom: "20px",
          }}>
            <div style={{
              color: "#8E8E8E",
              fontSize: "11px",
              marginBottom: "2px",
            }}>
              دارایی نقد
            </div>
            <div style={{
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 600,
              direction: "rtl",
            }}>
              {loading ? "..." : `${toPersianNumber(parseFloat(wallet?.available_balance_irr || "0").toLocaleString("fa-IR"))} تومان`}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "14px",
          }}>
            {/* واریز طلا - RIGHT */}
            <Link href="/dashboard/wallet/deposit" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              textDecoration: "none",
            }}>
              <div style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "#FFC857",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4V16M12 4L8 8M12 4L16 8" stroke="#2C2C2C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 17V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V17" stroke="#2C2C2C" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{
                fontSize: "9px",
                color: "#FFFFFF",
                textAlign: "center",
                fontWeight: 500,
              }}>
                واریز تومان
              </div>
            </Link>

            {/* برداشت تومان - MIDDLE */}
            <Link href="/dashboard/wallet/withdraw" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              textDecoration: "none",
            }}>
              <div style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="5" width="20" height="14" rx="2" stroke="white" strokeWidth="2"/>
                  <path d="M6 9H10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="16" cy="12" r="1.5" fill="white"/>
                </svg>
              </div>
              <div style={{
                fontSize: "9px",
                color: "#FFFFFF",
                textAlign: "center",
                whiteSpace: "nowrap",
                fontWeight: 500,
              }}>
                برداشت تومان
              </div>
            </Link>

            {/* معامله - LEFT */}
            <Link href="/dashboard/wallet/history" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              textDecoration: "none",
            }}>
              <div style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M8 6H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 12H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 18H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="4" cy="6" r="1" fill="white"/>
                  <circle cx="4" cy="12" r="1" fill="white"/>
                  <circle cx="4" cy="18" r="1" fill="white"/>
                </svg>
              </div>
              <div style={{
                fontSize: "9px",
                color: "#FFFFFF",
                textAlign: "center",
                fontWeight: 500,
              }}>
                معامله
              </div>
            </Link>
          </div>
        </div>

        {/* Promotional Banner */}
        <Link href="/dashboard/services" style={{
          background: "#2C2C2C",
          borderRadius: "20px",
          padding: "18px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          textDecoration: "none",
          cursor: "pointer",
        }}>
          {/* Arrow - LEFT */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path
              d="M15 19L8 12L15 5"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Text Content */}
          <div style={{
            flex: 1,
            textAlign: "right",
            paddingLeft: "12px",
            paddingRight: "12px",
          }}>
            <div style={{
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 700,
              marginBottom: "2px",
            }}>
              بدون کارمزد طلا بخر
            </div>
            <div style={{
              color: "#8E8E8E",
              fontSize: "11px",
              fontWeight: 400,
            }}>
              ۲۴ ساعته، لحظه ای
            </div>
          </div>

          {/* Gold Bar Image - RIGHT */}
          <div style={{
            width: "75px",
            height: "75px",
            position: "relative",
            flexShrink: 0,
          }}>
            <Image
              src="/assets/wallet/Rectangle 1074.png"
              alt="gold bar"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
