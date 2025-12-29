"use client";

import { useState } from "react";
import Link from "next/link";
import { toPersianNumber, formatCurrency } from "@/lib/utils/helpers";
import { spacing, fontSize, colors, borderRadius, shadows } from "@/lib/utils/design-tokens";

export default function SavingsPage() {
  const [activeView, setActiveView] = useState<"chart" | "history">("chart");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Mock data - replace with API calls
  const savingsData = {
    goldGrams: 100,
    tomanValue: 1380000,
    monthlyHistory: [
      { month: "آذر", deposit: 15, withdraw: 0 },
      { month: "دی", deposit: 10, withdraw: 0 },
      { month: "بهمن", deposit: 20, withdraw: 0 },
      { month: "اسفند", deposit: 10, withdraw: 0 },
    ],
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FAFAFA",
      paddingBottom: "100px"
    }}>
      {/* Header */}
      <div style={{
        background: colors.card,
        padding: spacing.md,
        display: "flex",
        alignItems: "center",
        gap: spacing.sm,
        marginBottom: spacing.md,
        boxShadow: shadows.xs
      }}>
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          <div style={{
            width: "clamp(36px, 10vw, 40px)",
            height: "clamp(36px, 10vw, 40px)",
            borderRadius: borderRadius.md,
            background: "#F5F5F5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19L8 12L15 5"
                stroke={colors.dark}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Link>
        <h1 style={{
          fontSize: fontSize.lg,
          fontWeight: 600,
          flex: 1,
          color: colors.dark,
          margin: 0
        }}>
          پس‌انداز طلا
        </h1>
        <div
          onClick={() => setShowAddModal(!showAddModal)}
          style={{
            width: "clamp(36px, 10vw, 40px)",
            height: "clamp(36px, 10vw, 40px)",
            borderRadius: borderRadius.md,
            background: "#F5F5F5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
              stroke={colors.dark}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
              stroke={colors.dark}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: `0 ${spacing.md} ${spacing.md}`,
        maxWidth: "600px",
        margin: "0 auto"
      }}>

        {/* Balance Card */}
        <div style={{
          marginBottom: spacing.md,
          padding: spacing.lg,
          textAlign: "center",
          background: "linear-gradient(135deg, #FFF4E1 0%, #FFFFFF 100%)",
          borderRadius: borderRadius.xl,
          boxShadow: shadows.sm
        }}>
          <div style={{
            fontSize: fontSize.sm,
            color: colors.muted,
            marginBottom: spacing.xs
          }}>
            مقدار پس‌انداز طلا به گرم:
          </div>
          <div style={{
            fontSize: fontSize['4xl'],
            fontWeight: 700,
            marginBottom: spacing.sm,
            color: colors.dark
          }}>
            {toPersianNumber(savingsData.goldGrams)} گرم
          </div>
          <div style={{
            fontSize: fontSize.sm,
            color: colors.muted,
            marginBottom: "4px"
          }}>
            مقدار پس‌انداز طلا به تومان:
          </div>
          <div style={{
            fontSize: fontSize.xl,
            fontWeight: 600,
            color: colors.dark
          }}>
            {toPersianNumber(formatCurrency(savingsData.tomanValue))} تومان
          </div>

          <div style={{
            marginTop: spacing.md,
            padding: `${spacing.sm} ${spacing.md}`,
            background: "rgba(255, 200, 87, 0.2)",
            borderRadius: borderRadius.md,
            fontSize: fontSize.xs,
            color: colors.dark
          }}>
            حتی با مبالغ کوچک‌هم می‌توان شروع کرد!
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: spacing.sm,
          marginBottom: spacing.md
        }}>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              padding: spacing.md,
              fontSize: fontSize.sm,
              borderRadius: borderRadius.lg,
              background: colors.dark,
              color: colors.card,
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            افزایش پس‌انداز
          </button>
          <button
            onClick={() => setShowWithdrawModal(true)}
            style={{
              padding: spacing.md,
              fontSize: fontSize.sm,
              borderRadius: borderRadius.lg,
              background: colors.card,
              color: colors.dark,
              border: `2px solid ${colors.border}`,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            برداشت از پس‌انداز
          </button>
        </div>

        {/* Auto Savings Banner */}
        <div style={{
          marginBottom: spacing.md,
          padding: spacing.md,
          background: "linear-gradient(135deg, #E8F5E9 0%, #FFFFFF 100%)",
          cursor: "pointer",
          borderRadius: borderRadius.xl,
          boxShadow: shadows.sm
        }}
          onClick={() => (window.location.href = "/dashboard/savings/auto-setup")}
        >
          <div style={{
            fontSize: fontSize.lg,
            fontWeight: 600,
            marginBottom: spacing.xs,
            color: colors.dark
          }}>
            پس‌انداز با طلابین
          </div>
          <div style={{
            fontSize: fontSize.sm,
            color: colors.muted,
            marginBottom: spacing.md
          }}>
            آینده مالی‌ات رو گام‌به‌گام بساز
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: spacing.xs
          }}>
            <div style={{
              flex: 1,
              fontSize: fontSize.sm,
              color: colors.dark
            }}>
              پس‌انداز طلا؛ انتخاب هوشمند
            </div>
            <div style={{
              padding: `${spacing.xs} ${spacing.md}`,
              background: colors.success,
              color: colors.card,
              borderRadius: borderRadius.pill,
              fontSize: fontSize.xs,
              fontWeight: 600
            }}>
              شروع
            </div>
          </div>
        </div>

        {/* View Switcher */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: spacing.xs,
          marginBottom: spacing.md,
          background: "#F5F5F5",
          padding: "4px",
          borderRadius: borderRadius.md
        }}>
          <button
            onClick={() => setActiveView("chart")}
            style={{
              padding: spacing.sm,
              background: activeView === "chart" ? colors.card : "transparent",
              color: activeView === "chart" ? colors.dark : colors.muted,
              border: "none",
              borderRadius: borderRadius.sm,
              fontSize: fontSize.sm,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: activeView === "chart" ? shadows.xs : "none"
            }}
          >
            نمودار
          </button>
          <button
            onClick={() => setActiveView("history")}
            style={{
              padding: spacing.sm,
              background: activeView === "history" ? colors.card : "transparent",
              color: activeView === "history" ? colors.dark : colors.muted,
              border: "none",
              borderRadius: borderRadius.sm,
              fontSize: fontSize.sm,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: activeView === "history" ? shadows.xs : "none"
            }}
          >
            تاریخچه
          </button>
        </div>

        {/* Chart View */}
        {activeView === "chart" && (
          <div style={{
            padding: spacing.md,
            background: colors.card,
            borderRadius: borderRadius.xl,
            boxShadow: shadows.sm
          }}>
            <div style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-around",
              height: "clamp(160px, 50vw, 200px)",
              paddingBottom: spacing.md,
              borderBottom: `2px solid ${colors.border}`
            }}>
              {savingsData.monthlyHistory.map((item, index) => {
                // Calculate max value for scaling
                const maxDeposit = Math.max(...savingsData.monthlyHistory.map(h => h.deposit));
                const heightPercentage = (item.deposit / maxDeposit) * 100;

                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: spacing.xs
                    }}
                  >
                    <div style={{
                      fontSize: fontSize.xs,
                      fontWeight: 600,
                      color: colors.dark
                    }}>
                      {toPersianNumber(item.deposit)} گرم
                    </div>
                    <div style={{
                      width: "clamp(32px, 10vw, 40px)",
                      height: `${heightPercentage}%`,
                      minHeight: "20px",
                      background: "linear-gradient(180deg, #FFC857 0%, #FFD666 100%)",
                      borderRadius: `${borderRadius.xs} ${borderRadius.xs} 0 0`,
                      transition: "height 0.3s ease"
                    }} />
                    <div style={{
                      fontSize: fontSize.xs,
                      color: colors.muted
                    }}>
                      {item.month}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: spacing.md,
              marginTop: spacing.md
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: spacing.xs
              }}>
                <div style={{
                  width: "12px",
                  height: "12px",
                  background: colors.primary,
                  borderRadius: borderRadius.xs
                }} />
                <span style={{
                  fontSize: fontSize.xs,
                  color: colors.dark
                }}>افزایش پس‌انداز</span>
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: spacing.xs
              }}>
                <div style={{
                  width: "12px",
                  height: "12px",
                  background: colors.danger,
                  borderRadius: borderRadius.xs
                }} />
                <span style={{
                  fontSize: fontSize.xs,
                  color: colors.dark
                }}>برداشت پس‌انداز</span>
              </div>
            </div>
          </div>
        )}

        {/* History View */}
        {activeView === "history" && (
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.sm
          }}>
            {savingsData.monthlyHistory.length > 0 ? (
              savingsData.monthlyHistory.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: spacing.md,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: colors.card,
                    borderRadius: borderRadius.lg,
                    boxShadow: shadows.xs
                  }}
                >
                  <div>
                    <div style={{
                      fontSize: fontSize.sm,
                      fontWeight: 600,
                      marginBottom: "4px",
                      color: colors.dark
                    }}>
                      افزایش پس‌انداز
                    </div>
                    <div style={{
                      fontSize: fontSize.xs,
                      color: colors.muted
                    }}>
                      ماه {item.month}
                    </div>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{
                      fontSize: fontSize.lg,
                      fontWeight: 700,
                      color: colors.success
                    }}>
                      +{toPersianNumber(item.deposit)} گرم
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                padding: `${spacing['2xl']} ${spacing.md}`,
                textAlign: "center",
                color: colors.muted,
                background: colors.card,
                borderRadius: borderRadius.lg,
                boxShadow: shadows.xs
              }}>
                اطلاعاتی برای نمایش وجود ندارد.
              </div>
            )}
          </div>
        )}

        {/* Add to Savings Modal */}
        {showAddModal && (
          <AddToSavingsModal onClose={() => setShowAddModal(false)} />
        )}

        {/* Withdraw Modal */}
        {showWithdrawModal && (
          <WithdrawModal onClose={() => setShowWithdrawModal(false)} />
        )}
      </div>
    </div>
  );
}

// Add to Savings Modal Component
function AddToSavingsModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!amount) {
      setError("وارد کردن مقدار الزامی است.");
      return;
    }
    // Add API call here
    alert("پس‌انداز شما افزایش یافت!");
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "flex-end",
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: colors.card,
          borderRadius: `${borderRadius.xl} ${borderRadius.xl} 0 0`,
          padding: spacing.lg,
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          animation: "slideUp 0.3s ease-out"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          fontSize: fontSize.lg,
          fontWeight: 700,
          marginBottom: spacing.md,
          textAlign: "center",
          color: colors.dark
        }}>
          افزایش پس‌انداز
        </div>

        <div style={{
          padding: spacing.md,
          background: "rgba(255, 200, 87, 0.1)",
          borderRadius: borderRadius.md,
          marginBottom: spacing.md,
          fontSize: fontSize.sm,
          textAlign: "center",
          color: colors.dark
        }}>
          از کیف طلای خود، به میزان دلخواه پس‌انداز کن.
        </div>

        <div style={{ marginBottom: spacing.md }}>
          <div style={{
            fontSize: fontSize.sm,
            color: colors.muted,
            marginBottom: spacing.xs
          }}>
            موجودی کیف‌طلا: ۰ گرم
          </div>
        </div>

        <div style={{
          padding: spacing.md,
          border: `2px solid ${colors.border}`,
          borderRadius: borderRadius.lg,
          marginBottom: spacing.md
        }}>
          <div style={{
            fontSize: fontSize.xs,
            color: colors.muted,
            marginBottom: spacing.xs
          }}>
            وارد کنید مقدار دلخواه گرم
          </div>
          <input
            type="text"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError("");
            }}
            placeholder="..."
            style={{
              width: "100%",
              fontSize: fontSize.xl,
              fontWeight: 600,
              border: "none",
              outline: "none",
              textAlign: "center",
              background: "transparent",
              color: colors.dark
            }}
          />
        </div>

        {error && (
          <div style={{
            padding: spacing.sm,
            background: "rgba(239, 68, 68, 0.1)",
            color: colors.danger,
            borderRadius: borderRadius.md,
            fontSize: fontSize.xs,
            marginBottom: spacing.md,
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <div style={{
          display: "flex",
          gap: spacing.sm
        }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: spacing.sm,
              borderRadius: borderRadius.md,
              background: colors.card,
              color: colors.dark,
              border: `2px solid ${colors.border}`,
              fontSize: fontSize.sm,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            انصراف
          </button>
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              padding: spacing.sm,
              borderRadius: borderRadius.md,
              background: colors.dark,
              color: colors.card,
              border: "none",
              fontSize: fontSize.sm,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            افزایش
          </button>
        </div>
      </div>
    </div>
  );
}

// Withdraw Modal Component
function WithdrawModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!amount) {
      setError("وارد کردن مقدار الزامی است.");
      return;
    }
    // Add API call here
    alert("برداشت از پس‌انداز شما انجام شد.");
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "flex-end",
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: colors.card,
          borderRadius: `${borderRadius.xl} ${borderRadius.xl} 0 0`,
          padding: spacing.lg,
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          animation: "slideUp 0.3s ease-out"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          fontSize: fontSize.lg,
          fontWeight: 700,
          marginBottom: spacing.md,
          textAlign: "center",
          color: colors.dark
        }}>
          برداشت از پس‌انداز
        </div>

        <div style={{
          padding: spacing.md,
          background: "rgba(239, 68, 68, 0.1)",
          borderRadius: borderRadius.md,
          marginBottom: spacing.md,
          fontSize: fontSize.sm,
          textAlign: "center",
          color: colors.danger
        }}>
          از پس‌انداز به میزان دلخواه، طلا به کیف‌طلای خود منتقل کن
        </div>

        <div style={{ marginBottom: spacing.md }}>
          <div style={{
            fontSize: fontSize.sm,
            color: colors.muted,
            marginBottom: spacing.xs
          }}>
            میزان پس‌انداز: ۰ گرم
          </div>
        </div>

        <div style={{
          padding: spacing.md,
          border: `2px solid ${colors.border}`,
          borderRadius: borderRadius.lg,
          marginBottom: spacing.md
        }}>
          <div style={{
            fontSize: fontSize.xs,
            color: colors.muted,
            marginBottom: spacing.xs
          }}>
            وارد کنید مقدار دلخواه گرم
          </div>
          <input
            type="text"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError("");
            }}
            placeholder="..."
            style={{
              width: "100%",
              fontSize: fontSize.xl,
              fontWeight: 600,
              border: "none",
              outline: "none",
              textAlign: "center",
              background: "transparent",
              color: colors.dark
            }}
          />
        </div>

        {error && (
          <div style={{
            padding: spacing.sm,
            background: "rgba(239, 68, 68, 0.1)",
            color: colors.danger,
            borderRadius: borderRadius.md,
            fontSize: fontSize.xs,
            marginBottom: spacing.md,
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <div style={{
          display: "flex",
          gap: spacing.sm
        }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: spacing.sm,
              borderRadius: borderRadius.md,
              background: colors.card,
              color: colors.dark,
              border: `2px solid ${colors.border}`,
              fontSize: fontSize.sm,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            انصراف
          </button>
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              padding: spacing.sm,
              borderRadius: borderRadius.md,
              background: colors.danger,
              color: colors.card,
              border: "none",
              fontSize: fontSize.sm,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            برداشت
          </button>
        </div>
      </div>
    </div>
  );
}
