"use client";

import { useState } from "react";
import Link from "next/link";

interface BankCard {
  id: string;
  cardNumber: string;
  shaba: string;
  bankName: string;
  accountHolder: string;
  isDefault: boolean;
}

export default function BankCardsPage() {
  const [cards, setCards] = useState<BankCard[]>([
    {
      id: "1",
      cardNumber: "6037997012345678",
      shaba: "IR120170000000012345678901",
      bankName: "بانک سامان",
      accountHolder: "سعید سعیدی",
      isDefault: true,
    },
    {
      id: "2",
      cardNumber: "6104337812345678",
      shaba: "IR120120000000012345678901",
      bankName: "بانک ملت",
      accountHolder: "سعید سعیدی",
      isDefault: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    shaba: "",
    bankName: "",
    accountHolder: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toPersianNumber = (num: number | string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const formatCardNumber = (cardNumber: string) => {
    return cardNumber.replace(/(\d{4})/g, "$1 ").trim();
  };

  const formatShaba = (shaba: string) => {
    return shaba.replace(/(\w{4})/g, "$1 ").trim();
  };

  const maskCardNumber = (cardNumber: string) => {
    return cardNumber.slice(0, 6) + "******" + cardNumber.slice(-4);
  };

  const validateCardNumber = (cardNumber: string) => {
    return /^\d{16}$/.test(cardNumber);
  };

  const validateShaba = (shaba: string) => {
    return /^IR\d{24}$/.test(shaba);
  };

  const handleAddCard = () => {
    // Validate inputs
    if (!newCard.cardNumber || !newCard.shaba || !newCard.bankName || !newCard.accountHolder) {
      alert("لطفا تمام فیلدها را پر کنید");
      return;
    }

    if (!validateCardNumber(newCard.cardNumber)) {
      alert("شماره کارت باید ۱۶ رقم باشد");
      return;
    }

    if (!validateShaba(newCard.shaba)) {
      alert("شماره شبا باید با IR شروع شده و ۲۴ رقم داشته باشد");
      return;
    }

    // Mock add card
    setIsSubmitting(true);
    setTimeout(() => {
      const newCardData: BankCard = {
        id: String(cards.length + 1),
        cardNumber: newCard.cardNumber,
        shaba: newCard.shaba.toUpperCase(),
        bankName: newCard.bankName,
        accountHolder: newCard.accountHolder,
        isDefault: cards.length === 0,
      };

      setCards([...cards, newCardData]);
      setNewCard({ cardNumber: "", shaba: "", bankName: "", accountHolder: "" });
      setShowAddForm(false);
      setIsSubmitting(false);
      alert("کارت بانکی با موفقیت اضافه شد");
    }, 1500);
  };

  const handleDeleteCard = (id: string) => {
    const card = cards.find((c) => c.id === id);
    if (card?.isDefault && cards.length > 1) {
      alert("ابتدا یک کارت دیگر را به عنوان پیش‌فرض انتخاب کنید");
      return;
    }

    if (confirm("آیا از حذف این کارت اطمینان دارید؟")) {
      setCards(cards.filter((c) => c.id !== id));
      alert("کارت با موفقیت حذف شد");
    }
  };

  const handleSetDefault = (id: string) => {
    setCards(
      cards.map((card) => ({
        ...card,
        isDefault: card.id === id,
      }))
    );
    alert("کارت پیش‌فرض با موفقیت تغییر یافت");
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
            حساب‌های بانکی
          </h1>
          <div style={{ width: "40px" }} />
        </div>

        {/* Info Banner */}
        {cards.length === 0 && (
          <div
            style={{
              padding: "16px",
              background: "rgba(59, 130, 246, 0.1)",
              borderRadius: "12px",
              marginBottom: "20px",
              fontSize: "13px",
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: "4px" }}>
              ⓘ افزودن حساب بانکی
            </div>
            <div style={{ color: "var(--color-muted)", fontSize: "12px" }}>
              برای برداشت وجه از کیف پول، ابتدا حساب بانکی خود را اضافه کنید
            </div>
          </div>
        )}

        {/* Bank Cards List */}
        {cards.length > 0 && (
          <div style={{ marginBottom: "16px" }}>
            {cards.map((card, index) => (
              <div
                key={card.id}
                className="card"
                style={{
                  padding: "20px",
                  marginBottom: "12px",
                  animation: `slideInUp 0.3s ease-out ${index * 0.05}s backwards`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>
                      {card.bankName}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--color-muted)" }}>
                      {card.accountHolder}
                    </div>
                  </div>
                  {card.isDefault && (
                    <div
                      style={{
                        padding: "4px 12px",
                        background: "rgba(16, 185, 129, 0.1)",
                        color: "#10B981",
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: 600,
                      }}
                    >
                      پیش‌فرض
                    </div>
                  )}
                </div>

                <div
                  style={{
                    padding: "16px",
                    background: "linear-gradient(135deg, #FFC857 0%, #FFD666 100%)",
                    borderRadius: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ marginBottom: "12px" }}>
                    <div style={{ fontSize: "11px", marginBottom: "4px", opacity: 0.8 }}>
                      شماره کارت
                    </div>
                    <div style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "2px", direction: "ltr", textAlign: "right" }}>
                      {toPersianNumber(formatCardNumber(maskCardNumber(card.cardNumber)))}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: "11px", marginBottom: "4px", opacity: 0.8 }}>
                      شماره شبا
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "1px", direction: "ltr", textAlign: "right" }}>
                      {formatShaba(card.shaba)}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  {!card.isDefault && (
                    <button
                      onClick={() => handleSetDefault(card.id)}
                      style={{
                        flex: 1,
                        padding: "10px",
                        background: "rgba(255, 200, 87, 0.1)",
                        border: "1px solid var(--color-primary)",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      انتخاب به عنوان پیش‌فرض
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    style={{
                      flex: card.isDefault ? 1 : 0,
                      padding: "10px",
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid #EF4444",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#EF4444",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    🗑️ حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Card Form */}
        {showAddForm ? (
          <div className="card" style={{ padding: "24px", marginBottom: "16px" }}>
            <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "20px" }}>
              افزودن حساب بانکی جدید
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                نام بانک
              </label>
              <select
                value={newCard.bankName}
                onChange={(e) => setNewCard({ ...newCard, bankName: e.target.value })}
                className="form-input"
                disabled={isSubmitting}
              >
                <option value="">انتخاب کنید</option>
                <option value="بانک سامان">بانک سامان</option>
                <option value="بانک ملت">بانک ملت</option>
                <option value="بانک ملی">بانک ملی</option>
                <option value="بانک پاسارگاد">بانک پاسارگاد</option>
                <option value="بانک تجارت">بانک تجارت</option>
                <option value="بانک صادرات">بانک صادرات</option>
              </select>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                شماره کارت (۱۶ رقم)
              </label>
              <input
                type="tel"
                value={newCard.cardNumber}
                onChange={(e) =>
                  setNewCard({ ...newCard, cardNumber: e.target.value.replace(/\D/g, "") })
                }
                placeholder="1234567812345678"
                maxLength={16}
                className="form-input"
                style={{ direction: "ltr", textAlign: "right", letterSpacing: "2px" }}
                disabled={isSubmitting}
              />
              {newCard.cardNumber && (
                <div style={{ fontSize: "11px", color: "var(--color-muted)", marginTop: "6px" }}>
                  {toPersianNumber(newCard.cardNumber.length)}/۱۶ رقم
                </div>
              )}
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                شماره شبا
              </label>
              <input
                type="text"
                value={newCard.shaba}
                onChange={(e) =>
                  setNewCard({ ...newCard, shaba: e.target.value.toUpperCase() })
                }
                placeholder="IR000000000000000000000000"
                maxLength={26}
                className="form-input"
                style={{ direction: "ltr", textAlign: "right", letterSpacing: "1px" }}
                disabled={isSubmitting}
              />
              {newCard.shaba && (
                <div style={{ fontSize: "11px", color: "var(--color-muted)", marginTop: "6px" }}>
                  {newCard.shaba.length}/۲۶ کاراکتر
                </div>
              )}
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                نام صاحب حساب
              </label>
              <input
                type="text"
                value={newCard.accountHolder}
                onChange={(e) => setNewCard({ ...newCard, accountHolder: e.target.value })}
                placeholder="نام و نام خانوادگی"
                className="form-input"
                disabled={isSubmitting}
              />
              <div style={{ fontSize: "11px", color: "var(--color-muted)", marginTop: "6px" }}>
                باید با نام کاربری شما مطابقت داشته باشد
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewCard({ cardNumber: "", shaba: "", bankName: "", accountHolder: "" });
                }}
                className="btn btn-outline"
                style={{
                  flex: 1,
                  padding: "14px",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderRadius: "12px",
                }}
                disabled={isSubmitting}
              >
                انصراف
              </button>
              <button
                onClick={handleAddCard}
                className="btn btn-primary"
                style={{
                  flex: 1,
                  padding: "14px",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderRadius: "12px",
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "در حال افزودن..." : "افزودن حساب"}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "15px",
              fontWeight: 600,
              borderRadius: "16px",
            }}
          >
            + افزودن حساب بانکی جدید
          </button>
        )}
      </div>
    </div>
  );
}
