"use client";
import { useState } from "react";
import Link from "next/link"; // برای هدایت به صفحات

export default function WithdrawPage() {
  const [amount, setAmount] = useState(0); // ذخیره مقدار برداشت
  const [shaba, setShaba] = useState(""); // ذخیره شماره شبا
  const [error, setError] = useState(""); // ذخیره خطا
  const [success, setSuccess] = useState(false); // نمایش موفقیت برداشت

  // تابع برای بررسی صحت شماره شبا
  const isShabaValid = (shaba: string) => {
    const regex = /^[0-9]{24}$/; // شماره شبا باید 24 رقم باشد
    return regex.test(shaba);
  };

  // تابع برای برداشت از حساب
  const handleWithdraw = () => {
    if (amount <= 0) {
      setError("مبلغ باید بیشتر از صفر باشد.");
      return;
    }

    if (!isShabaValid(shaba)) {
      setError("شماره شبا باید 24 رقم باشد.");
      return;
    }

    // فرض می‌کنیم که برداشت موفقیت‌آمیز است
    setSuccess(true);
    setError(""); // خطا را پاک می‌کنیم در صورت موفقیت

    alert(`مبلغ ${amount.toLocaleString()} تومان از حساب شما برداشت شد.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200 text-gray-900 p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-red-600 text-center mb-6">برداشت از حساب</h1>

        {/* پیام هشدار */}
        <div className="text-sm text-yellow-700 bg-yellow-100 p-3 rounded-lg mb-4">
          حساب مقصد باید به اسم فرد تایید هویت شده مالک اکانت باشد و در غیر این صورت تراکنش انجام نخواهد شد.
        </div>

        {/* ورودی مبلغ برداشت */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-2">مبلغ برداشت (تومان)</label>
          <input
            type="number"
            value={amount} // نمایش مقدار ورودی
            onChange={(e) => setAmount(parseInt(e.target.value))} // به‌روزرسانی مقدار ورودی
            className="w-full p-3 bg-red-50 text-black rounded-lg"
            placeholder="مبلغ را وارد کنید"
          />
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>} {/* نمایش خطا در صورت وجود */}
        </div>

        {/* ورودی شماره شبا */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-2">شماره شبا</label>
          <input
            type="text"
            value={shaba} // نمایش شماره شبا
            onChange={(e) => setShaba(e.target.value)} // به‌روزرسانی شماره شبا
            className="w-full p-3 bg-red-50 text-black rounded-lg"
            placeholder="IRxxxxxxxxxxxxx"
          />
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>} {/* نمایش خطا در صورت وجود */}
        </div>

        {/* دکمه برداشت */}
        <button
          onClick={handleWithdraw}
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300"
        >
          برداشت از حساب
        </button>

        {/* نمایش پیام موفقیت در برداشت */}
        {success && (
          <div className="mt-4 text-center text-green-600 font-semibold">
            تراکنش با موفقیت انجام شد!
          </div>
        )}

        {/* لینک هدایت به صفحه کیف پول بعد از برداشت */}
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
