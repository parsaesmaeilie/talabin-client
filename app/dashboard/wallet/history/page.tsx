"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { walletService, WalletTransaction } from "@/lib/api/wallet";

type MainTab = "buy-sell" | "deposit" | "payment" | "installment" | "delivery";
type SubTab = "all" | "buy" | "sell";

export default function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainTab, setMainTab] = useState<MainTab>("buy-sell");
  const [subTab, setSubTab] = useState<SubTab>("buy");
  const [selectedTransaction, setSelectedTransaction] = useState<WalletTransaction | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(false);
      const response = await walletService.getTransactions();

      if (response.success && response.data) {
        setTransactions(response.data);
      }

      setError(null);
    } catch (err: any) {
      console.error("Error fetching transactions:", err);
      setError("خطا در بارگذاری تراکنش‌ها");
    } finally {
      setLoading(false);
    }
  };

  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const getFilteredTransactions = () => {
    let filtered = transactions;

    if (mainTab === "buy-sell") {
      if (subTab === "buy") {
        filtered = filtered.filter((t) => t.transaction_type === "buy_gold");
      } else if (subTab === "sell") {
        filtered = filtered.filter((t) => t.transaction_type === "sell_gold");
      } else {
        filtered = filtered.filter((t) =>
          t.transaction_type === "buy_gold" || t.transaction_type === "sell_gold"
        );
      }
    } else if (mainTab === "deposit") {
      filtered = filtered.filter((t) => t.transaction_type === "deposit");
    } else if (mainTab === "payment") {
      filtered = filtered.filter((t) => t.transaction_type === "withdraw");
    } else if (mainTab === "installment") {
      filtered = filtered.filter((t) => t.transaction_type === "installment");
    }

    return filtered;
  };

  const filteredTransactions = getFilteredTransactions();

  return (
    <>
      <div style={{ minHeight: "100vh", background: "#FFFFFF", paddingBottom: "100px" }}>
        {/* Header */}
        <div
          style={{
            padding: "20px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #E5E5E5",
          }}
        >
          <div style={{ width: "40px" }} />

          <h1
            style={{
              fontSize: "18px",
              fontWeight: 700,
              margin: 0,
              color: "#1F2937",
            }}
          >
            تاریخچه
          </h1>

          <Link
            href="/dashboard/wallet"
            style={{
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              cursor: "pointer",
              textDecoration: "none",
              color: "#1F2937",
            }}
          >
            ←
          </Link>
        </div>

        {/* Main Tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            padding: "16px",
            overflowX: "auto",
          }}
        >
          {[
            { key: "buy-sell" as MainTab, label: "خرید و فروش" },
            { key: "deposit" as MainTab, label: "واریز" },
            { key: "payment" as MainTab, label: "پرداخت" },
            { key: "installment" as MainTab, label: "خرید قسطی" },
            { key: "delivery" as MainTab, label: "تحویل" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setMainTab(tab.key)}
              style={{
                padding: "8px 16px",
                background: mainTab === tab.key ? "#FFFFFF" : "transparent",
                border: `1px solid ${mainTab === tab.key ? "#E5E7EB" : "transparent"}`,
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                color: mainTab === tab.key ? "#1F2937" : "#9CA3AF",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sub Tabs (for Buy & Sell) */}
        {mainTab === "buy-sell" && (
          <div
            style={{
              display: "flex",
              gap: "24px",
              padding: "0 16px 12px",
              borderBottom: "1px solid #F3F4F6",
            }}
          >
            {[
              { key: "all" as SubTab, label: "همه موارد" },
              { key: "buy" as SubTab, label: "خرید ها" },
              { key: "sell" as SubTab, label: "فروش ها" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSubTab(tab.key)}
                style={{
                  padding: "8px 0",
                  background: "transparent",
                  border: "none",
                  borderBottom: `2px solid ${subTab === tab.key ? "#FDB022" : "transparent"}`,
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  color: subTab === tab.key ? "#FDB022" : "#6B7280",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div style={{ padding: "0" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#9CA3AF" }}>
              در حال بارگذاری...
            </div>
          ) : filteredTransactions.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {filteredTransactions.map((transaction, index) => {
                const isBuy = transaction.transaction_type === "buy_gold";
                const isDeposit = transaction.transaction_type === "deposit";
                const isWithdraw = transaction.transaction_type === "withdraw";
                const isInstallment = transaction.transaction_type === "installment";
                const amount = isDeposit || isWithdraw
                  ? (transaction.amount_irr || "15000000")
                  : isInstallment
                  ? (transaction.amount_gold || "10")
                  : (transaction.amount_gold || "12");

                return (
                  <div
                    key={transaction.id}
                    onClick={() => setSelectedTransaction(transaction)}
                    style={{
                      padding: "16px",
                      borderBottom: index < filteredTransactions.length - 1 ? "1px solid #F3F4F6" : "none",
                      cursor: "pointer",
                      transition: "background 0.2s",
                      background: "#FFFFFF",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#FAFAFA";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#FFFFFF";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        {/* Icon */}
                        <div
                          style={{
                            width: "24px",
                            height: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {isInstallment ? (
                            <div style={{ fontSize: "24px" }}>📅</div>
                          ) : isWithdraw ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" fill="#FDB022"/>
                              <path d="M12 17V7M12 7L15 10M12 7L9 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : isDeposit ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" fill="#FDB022"/>
                              <path d="M12 7V17M12 17L15 14M12 17L9 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : (
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {isBuy ? (
                                <>
                                  <path
                                    d="M12 19V5"
                                    stroke="#FDB022"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M5 12L12 5L19 12"
                                    stroke="#FDB022"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </>
                              ) : (
                                <>
                                  <path
                                    d="M12 5V19"
                                    stroke="#EF4444"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M5 12L12 19L19 12"
                                    stroke="#EF4444"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </>
                              )}
                            </svg>
                          )}
                        </div>

                        <div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#1F2937",
                              marginBottom: "4px",
                            }}
                          >
                            {isInstallment ? "خرید قسطی" : isDeposit ? "واریز موفق به کیف پول" : isWithdraw ? "برداشت موفق از کیف پول" : (isBuy ? "خرید طلا" : "فروش طلا")}
                          </div>
                          <div style={{ fontSize: "12px", color: "#9CA3AF" }}>
                            ۱۴۰۴/۱۰/۲۵
                          </div>
                        </div>
                      </div>

                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#1F2937" }}>
                        {toPersianNumber(amount)} {isDeposit || isWithdraw ? "تومان" : "گرم"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        selectedTransaction.transaction_type === "installment" ? (
          <InstallmentDetailModal
            transaction={selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
          />
        ) : selectedTransaction.transaction_type === "deposit" ? (
          <DepositDetailModal
            transaction={selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
          />
        ) : selectedTransaction.transaction_type === "withdraw" ? (
          <WithdrawDetailModal
            transaction={selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
          />
        ) : (
          <BuySellDetailModal
            transaction={selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
          />
        )
      )}
    </>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div
      style={{
        padding: "60px 40px",
        textAlign: "center",
      }}
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="40" y="80" width="120" height="80" fill="#FFF4E1" rx="8" transform="rotate(-5 100 120)" />
        <rect x="50" y="70" width="100" height="90" fill="#FFC857" rx="8" transform="rotate(10 100 115)" opacity="0.3" />
        <circle cx="100" cy="80" r="20" fill="#92400E" />
        <path
          d="M70 120 Q100 140 130 120 L130 160 L70 160 Z"
          fill="#FFFFFF"
          stroke="#92400E"
          strokeWidth="2"
        />
        <rect x="85" y="100" width="30" height="40" fill="#FFFFFF" stroke="#92400E" strokeWidth="2" rx="2" />
        <line x1="90" y1="110" x2="110" y2="110" stroke="#92400E" strokeWidth="1" />
        <line x1="90" y1="115" x2="110" y2="115" stroke="#92400E" strokeWidth="1" />
        <line x1="90" y1="120" x2="105" y2="120" stroke="#92400E" strokeWidth="1" />
      </svg>

      <div
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#6B7280",
          marginTop: "24px",
        }}
      >
        اطلاعاتی برای نمایش وجود ندارد.
      </div>
    </div>
  );
}

// Deposit Transaction Detail Modal
function DepositDetailModal({
  transaction,
  onClose,
}: {
  transaction: WalletTransaction;
  onClose: () => void;
}) {
  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const isSuccess = transaction.status === "completed";
  const amountIRR = transaction.amount_irr || "17589000";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("کپی شد!");
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "flex-end",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#FFFFFF",
          borderRadius: "24px 24px 0 0",
          padding: "0",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Drag handle */}
        <div style={{ padding: "12px 0", display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "60px",
              height: "4px",
              background: "#E5E7EB",
              borderRadius: "2px",
            }}
          />
        </div>

        <div style={{ padding: "0 24px 24px" }}>
          {/* Close button */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
            <button
              onClick={onClose}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                color: "#1F2937",
              }}
            >
              ×
            </button>
          </div>

          {/* Status Icon */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            <div style={{ position: "relative" }}>
              {/* Concentric rings */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "130px",
                  height: "130px",
                  border: `2px solid ${isSuccess ? "#10B981" : "#EF4444"}`,
                  borderRadius: "50%",
                  opacity: 0.3,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100px",
                  height: "100px",
                  border: `2px solid ${isSuccess ? "#10B981" : "#EF4444"}`,
                  borderRadius: "50%",
                  opacity: 0.5,
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  background: `linear-gradient(135deg, ${isSuccess ? "#10B981" : "#EF4444"} 0%, ${isSuccess ? "#059669" : "#DC2626"} 100%)`,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  boxShadow: `0 4px 12px ${isSuccess ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                }}
              >
                {isSuccess ? (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M10 20L17 27L30 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M14 14L26 26M26 14L14 26" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Status message */}
          <div
            style={{
              fontSize: "16px",
              fontWeight: 600,
              textAlign: "center",
              marginBottom: "32px",
              color: "#1F2937",
            }}
          >
            {isSuccess ? "کیف‌پول شما با موفقیت شارژ شد" : "شارژ کیف‌پول انجام نشد"}
          </div>

          {/* Details */}
          <div
            style={{
              background: "#F9FAFB",
              borderRadius: "16px",
              padding: "4px 16px",
              marginBottom: "24px",
            }}
          >
            {/* Amount */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>
                مبلغ پرداختی:
              </span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F2937" }}>
                {toPersianNumber(amountIRR)} تومان
              </span>
            </div>

            {/* Transaction type */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>نوع تراکنش:</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F2937" }}>
                واریز با درگاه
              </span>
            </div>

            {/* Bank */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>بانک مبدا:</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F2937" }}>
                بانک ساسمان
              </span>
            </div>

            {/* Timestamp */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>زمان:</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F2937", direction: "ltr", textAlign: "right" }}>
                ۱۴۰۴/۱۰/۲۵ - ۱۳:۲۱
              </span>
            </div>

            {/* Fee */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>کارمزد:</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F2937" }}>
                {toPersianNumber("130")} تومان...
              </span>
            </div>

            {/* Status */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>وضعیت:</span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: isSuccess ? "#10B981" : "#EF4444",
                }}
              >
                {isSuccess ? "موفق" : "ناموفق"}
              </span>
            </div>

            {/* Reference ID */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>شماره پیگیری:</span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#1F2937",
                    maxWidth: "140px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  45441015-g5g5g5g...
                </span>
                <button
                  onClick={() => copyToClipboard("45441015-g5g5g5g")}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                  }}
                >
                  📋
                </button>
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={onClose}
            style={{
              width: "100%",
              padding: "14px",
              background: "#F3F4F6",
              border: "none",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              color: "#1F2937",
            }}
          >
            بازگشت
          </button>
        </div>
      </div>
    </div>
  );
}

// Installment Transaction Detail Modal
function InstallmentDetailModal({
  transaction,
  onClose,
}: {
  transaction: WalletTransaction;
  onClose: () => void;
}) {
  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const amount = transaction.amount_gold || "10";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "flex-end",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#FFFFFF",
          borderRadius: "24px 24px 0 0",
          padding: "24px",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px", textAlign: "center" }}>
          خرید قسطی
        </h3>
        <p style={{ fontSize: "14px", color: "#6B7280", textAlign: "center", marginBottom: "24px" }}>
          {toPersianNumber(amount)} گرم طلا
        </p>
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "14px",
            background: "#F3F4F6",
            border: "none",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            color: "#1F2937",
          }}
        >
          بازگشت
        </button>
      </div>
    </div>
  );
}

// Withdraw Transaction Detail Modal
function WithdrawDetailModal({
  transaction,
  onClose,
}: {
  transaction: WalletTransaction;
  onClose: () => void;
}) {
  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const isSuccess = transaction.status === "completed";
  const amountIRR = transaction.amount_irr || "17598000";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("کپی شد!");
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "flex-end",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#FFFFFF",
          borderRadius: "24px 24px 0 0",
          padding: "0",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Drag handle */}
        <div style={{ padding: "12px 0", display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "60px",
              height: "4px",
              background: "#E5E7EB",
              borderRadius: "2px",
            }}
          />
        </div>

        <div style={{ padding: "0 24px 24px" }}>
          {/* Close button */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
            <button
              onClick={onClose}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                color: "#1F2937",
              }}
            >
              ×
            </button>
          </div>

          {/* Status Icon */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            <div style={{ position: "relative" }}>
              {/* Concentric rings */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "130px",
                  height: "130px",
                  border: `2px solid ${isSuccess ? "#10B981" : "#EF4444"}`,
                  borderRadius: "50%",
                  opacity: 0.3,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100px",
                  height: "100px",
                  border: `2px solid ${isSuccess ? "#10B981" : "#EF4444"}`,
                  borderRadius: "50%",
                  opacity: 0.5,
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  background: `linear-gradient(135deg, ${isSuccess ? "#10B981" : "#EF4444"} 0%, ${isSuccess ? "#059669" : "#DC2626"} 100%)`,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  boxShadow: `0 4px 12px ${isSuccess ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                }}
              >
                {isSuccess ? (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M10 20L17 27L30 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M14 14L26 26M26 14L14 26" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Status message */}
          <div
            style={{
              fontSize: "16px",
              fontWeight: 600,
              textAlign: "center",
              marginBottom: "32px",
              color: "#1F2937",
            }}
          >
            {isSuccess ? "برداشت شما با موفقیت انجام شد" : "برداشت انجام نشد"}
          </div>

          {/* Details */}
          <div
            style={{
              background: "#F9FAFB",
              borderRadius: "16px",
              padding: "4px 16px",
              marginBottom: "24px",
            }}
          >
            {/* Amount */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>
                مبلغ درخواستی:
              </span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F2937" }}>
                {toPersianNumber(amountIRR)} تومان
              </span>
            </div>

            {/* Transaction type */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>نوع تراکنش:</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F2937" }}>
                خرید طلا
              </span>
            </div>

            {/* Bank */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>بانک مبدا:</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F2937" }}>
                بانک سامان
              </span>
            </div>

            {/* Timestamp */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>زمان:</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F2937", direction: "ltr", textAlign: "right" }}>
                ۱۴:۲۱ - ۱۴۰۴/۰۲/۱۵
              </span>
            </div>

            {/* Fee */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>کارمزد:</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F2937" }}>
                {toPersianNumber("150,000")} تومان...
              </span>
            </div>

            {/* Status */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>وضعیت:</span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: isSuccess ? "#10B981" : "#EF4444",
                }}
              >
                {isSuccess ? "موفق" : "ناموفق"}
              </span>
            </div>

            {/* Reference ID */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>شماره پیگیری:</span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#1F2937",
                    maxWidth: "140px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  45441015-g5g5g5g...
                </span>
                <button
                  onClick={() => copyToClipboard("45441015-g5g5g5g")}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="#6B7280" strokeWidth="1.5"/>
                    <path d="M3 11V3C3 2.44772 3.44772 2 4 2H10" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={onClose}
            style={{
              width: "100%",
              padding: "14px",
              background: "#F3F4F6",
              border: "none",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              color: "#1F2937",
            }}
          >
            بازگشت
          </button>
        </div>
      </div>
    </div>
  );
}

// Buy/Sell Transaction Detail Modal (existing)
function BuySellDetailModal({
  transaction,
  onClose,
}: {
  transaction: WalletTransaction;
  onClose: () => void;
}) {
  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const isBuy = transaction.transaction_type === "buy_gold";
  const amount = transaction.amount_gold || "12";
  const amountIRR = transaction.amount_irr || "151176000";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("کپی شد!");
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "flex-end",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#FFFFFF",
          borderRadius: "24px 24px 0 0",
          padding: "0",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Drag handle */}
        <div style={{ padding: "12px 0", display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "60px",
              height: "4px",
              background: "#E5E7EB",
              borderRadius: "2px",
            }}
          />
        </div>

        <div style={{ padding: "0 24px 24px" }}>
          {/* Close button */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
            <button
              onClick={onClose}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                color: "#1F2937",
              }}
            >
              ×
            </button>
          </div>

          {/* Gold Icon with rings */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            <div style={{ position: "relative" }}>
              {/* Concentric rings */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "130px",
                  height: "130px",
                  border: "2px solid #FDB022",
                  borderRadius: "50%",
                  opacity: 0.3,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100px",
                  height: "100px",
                  border: "2px solid #FDB022",
                  borderRadius: "50%",
                  opacity: 0.5,
                }}
              />

              {/* Gold bar icon */}
              <div
                style={{
                  width: "70px",
                  height: "50px",
                  background: "linear-gradient(135deg, #FDB022 0%, #FBBF24 50%, #F59E0B 100%)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  boxShadow: "0 4px 12px rgba(251, 176, 34, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
                  transform: "perspective(200px) rotateY(-10deg)",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 900,
                    color: "#92400E",
                    textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  }}
                >
                  GOLD
                </div>
              </div>
            </div>
          </div>

          {/* Amount */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "8px",
              color: "#1F2937",
            }}
          >
            {toPersianNumber(amount)} گرم
          </div>

          {/* Success message */}
          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              textAlign: "center",
              marginBottom: "32px",
              color: "#6B7280",
            }}
          >
            طلا با موفقیت {isBuy ? "خریداری" : "فروخته"} شد
          </div>

          {/* Details */}
          <div
            style={{
              background: "#F9FAFB",
              borderRadius: "16px",
              padding: "4px 16px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>
                قیمت لحظه فروش (گرمی):
              </span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F2937" }}>
                {toPersianNumber("17,589,000")} تومان
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>نوع تراکنش:</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F2937" }}>
                {isBuy ? "خرید طلا" : "فروش طلا"}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>
                مبلغ پرداختی از کیف پول:
              </span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F2937" }}>
                {toPersianNumber("151,176,000")} تومان
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>زمان:</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F2937", direction: "ltr", textAlign: "right" }}>
                ۱۴۰۴/۱۰/۲۵ - ۱۳:۲۱
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>کارمزد:</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F2937" }}>
                {toPersianNumber("150,000")} تومان...
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>وضعیت:</span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#10B981",
                }}
              >
                موفق
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6B7280" }}>شماره پیگیری:</span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#1F2937",
                    maxWidth: "140px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  45441015-g5g5g5g...
                </span>
                <button
                  onClick={() => copyToClipboard("45441015-g5g5g5g")}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                  }}
                >
                  📋
                </button>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "14px",
                background: "#F3F4F6",
                border: "none",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                color: "#1F2937",
              }}
            >
              بازگشت
            </button>
            <button
              style={{
                flex: 1,
                padding: "14px",
                background: "#1F2937",
                border: "none",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                color: "#FFFFFF",
              }}
            >
              دانلود فاکتور
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
