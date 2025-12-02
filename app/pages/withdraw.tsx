// pages/withdraw.tsx
import { useState } from "react";
import { useRouter } from "next/router";

export default function WithdrawPage() {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleWithdraw = () => {
    if (amount <= 0) {
      setError("مبلغ باید بیشتر از صفر باشد.");
      return;
    }

    // اینجا می‌تونید منطق برداشت از حساب رو بنویسید
    // به طور مثال با API یک درخواست ارسال کنید که موجودی کیف پول کاربر به روز بشه
    alert(`از حساب شما مبلغ ${amount.toLocaleString()} تومان برداشت شد.`);
    router.push("/profile");  // برگشت به صفحه پروفایل بعد از برداشت
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">برداشت از حساب</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-2">مبلغ برداشت (تومان)</label>
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
          onClick={handleWithdraw}
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300"
        >
          برداشت از حساب
        </button>
      </div>
    </div>
  );
}
