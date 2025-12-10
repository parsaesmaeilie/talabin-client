"use client";
import { useState } from "react";
import Link from "next/link";

export default function WithdrawPage() {
  const [amount, setAmount] = useState(0);
  const [shaba, setShaba] = useState("");

  const [amountError, setAmountError] = useState(""); // خطای مبلغ
  const [shabaError, setShabaError] = useState(""); // خطای شبا

  const [success, setSuccess] = useState(false);

  const isShabaValid = (shaba: string) => /^[0-9]{24}$/.test(shaba);

  const handleWithdraw = () => {
    let hasError = false;

    setAmountError("");
    setShabaError("");

    if (amount <= 0) {
      setAmountError("مبلغ باید بیشتر از صفر باشد.");
      hasError = true;
    }

    if (!isShabaValid(shaba)) {
      setShabaError("شماره شبا باید 24 رقم باشد.");
      hasError = true;
    }

    if (hasError) return;

    setSuccess(true);
    alert(`مبلغ ${amount.toLocaleString()} تومان از حساب شما برداشت شد.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-75 text-gray-900 p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg">
        
        <h1 className="text-3xl font-bold text-red-600 text-center mb-6">برداشت از حساب</h1>

        <div className="text-sm text-yellow-700 bg-yellow-100 p-3 rounded-lg mb-4">
          حساب مقصد باید به نام مالک اکانت باشد؛ در غیر این صورت تراکنش انجام نخواهد شد.
        </div>

        {/* مبلغ برداشت */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-2">مبلغ برداشت (تومان)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className="w-full p-3 bg-red-50 text-black rounded-lg"
            placeholder="مبلغ را وارد کنید"
          />
          {amountError && <p className="text-sm text-red-500 mt-2">{amountError}</p>}
        </div>

        {/* شماره شبا */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-2">شماره شبا</label>
          <input
            type="text"
            value={shaba}
            onChange={(e) => setShaba(e.target.value)}
            className="w-full p-3 bg-red-50 text-black rounded-lg"
            placeholder="IRXXXXXXXXXXXXX"
          />
          {shabaError && <p className="text-sm text-red-500 mt-2">{shabaError}</p>}
        </div>

        <button
          onClick={handleWithdraw}
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300"
        >
          برداشت از حساب
        </button>

        {success && (
          <div className="mt-4 text-center text-green-600 font-semibold">
            تراکنش با موفقیت انجام شد!
          </div>
        )}

        <div className="text-center mt-6">
          <Link href="/dashboard/wallet">
            <span className="text-yellow-600 font-semibold hover:underline">
              بازگشت به کیف پول
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
}
