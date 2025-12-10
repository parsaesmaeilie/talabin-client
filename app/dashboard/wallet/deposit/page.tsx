// app/dashboard/wallet/deposit.tsx
"use client"; // اضافه کردن این خط
import { useState } from "react";
import Link from "next/link"; // ایمپورت Link برای هدایت به صفحات

export default function DepositPage() {
  const [amount, setAmount] = useState(0); // ذخیره مقدار ورودی مبلغ
  const [error, setError] = useState(""); // ذخیره خطا

  // تابع برای شارژ حساب
  const handleDeposit = () => {
    if (amount <= 0) {
      setError("مبلغ باید بیشتر از صفر باشد.");
      return;
    }

    // عملیات شارژ
    alert(`حساب شما با مبلغ ${amount.toLocaleString()} تومان شارژ شد.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 text-gray-900 p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-yellow-600 text-center mb-6">شارژ حساب</h1>

        {/* ورودی مبلغ شارژ */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-2">مبلغ شارژ (تومان)</label>
          <input
            type="number"
            value={amount} // نمایش مقدار ورودی
            onChange={(e) => setAmount(parseInt(e.target.value))} // به‌روزرسانی مقدار ورودی
            className="w-full p-3 bg-yellow-50 text-black rounded-lg"
            placeholder="مبلغ را وارد کنید"
          />
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>} {/* نمایش خطا در صورت وجود */}
        </div>

        {/* دکمه شارژ */}
        <button
          onClick={handleDeposit}
          className="w-full bg-yellow-500 text-black py-3 rounded-lg hover:bg-yellow-600 transition duration-300"
        >
          شارژ حساب
        </button>

        {/* لینک هدایت به صفحه کیف پول بعد از شارژ */}
        <div className="text-center mt-6">
          <Link href="/dashboard/wallet">
            <span className="text-yellow-600 font-semibold hover:underline">
              به صفحه کیف پول بروید
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

