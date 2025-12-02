// pages/charge.tsx
import { useState } from "react";
import { useRouter } from "next/router";

export default function ChargePage() {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCharge = () => {
    if (amount <= 0) {
      setError("مبلغ باید بیشتر از صفر باشد.");
      return;
    }

    // اینجا می‌تونید منطق شارژ حساب رو بنویسید
    // به طور مثال با API یک درخواست ارسال کنید که موجودی کیف پول کاربر به روز بشه
    alert(`حساب با مبلغ ${amount.toLocaleString()} تومان شارژ شد.`);
    router.push("/profile");  // برگشت به صفحه پروفایل بعد از شارژ
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">شارژ حساب</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-2">مبلغ شارژ (تومان)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className="w-full p-3 bg-gray-200 text-black rounded-lg"
            placeholder="مبلغ را وارد کنید"
          />
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>

        <button
          onClick={handleCharge}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300"
        >
          شارژ حساب
        </button>
      </div>
    </div>
  );
}
