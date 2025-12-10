"use client";
import { useState } from "react";

export default function InstallmentBuyPage() {
  const goldPrice = 11000000; // قیمت لحظه‌ای طلا (مثال)

  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [approvedCredit, setApprovedCredit] = useState<number | null>(null);
  const [boughtGold, setBoughtGold] = useState<number | null>(null);

  // ---- شبیه‌سازی درخواست به تامین‌کننده ----
  const requestFromSupplier = async (amount: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: "approved",
          creditAmount: amount * 0.75, // مثال: تامین‌کننده ۷۵٪ مبلغ را تایید می‌کند
        });
      }, 2000);
    });
  };

  // ---- ارسال درخواست خرید قسطی ----
  const handleInstallmentRequest = async () => {
    if (amount < 1000000) {
      alert("حداقل مبلغ درخواست ۱,۰۰۰,۰۰۰ تومان است");
      return;
    }

    setLoading(true);
    setStatusMsg("در حال ارسال درخواست به تامین‌کننده...");

    const response: any = await requestFromSupplier(amount);

    if (response.status === "approved") {
      setStatusMsg("درخواست تایید شد ✔");
      setApprovedCredit(response.creditAmount);

      // مقدار طلا
      const gold = response.creditAmount / goldPrice;
      setBoughtGold(gold);
    } else {
      setStatusMsg("درخواست رد شد ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 p-6">
      <div className="max-w-lg mx-auto bg-white rounded-xl p-6 shadow-lg">
        
        <h1 className="text-2xl font-bold text-yellow-600 text-center mb-6">
          خرید قسطی طلا
        </h1>

        {/* مبلغ */}
        <label className="block text-black font-medium mb-2">مبلغ موردنظر (تومان)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="w-full p-3 border rounded-lg text-black"
          placeholder="مثال: 20000000"
        />

        {/* دکمه ارسال */}
        <button
          onClick={handleInstallmentRequest}
          className="w-full mt-4 bg-yellow-500 text-black py-3 rounded-lg hover:bg-yellow-600 transition"
          disabled={loading}
        >
          {loading ? "در حال پردازش..." : "ارسال درخواست خرید قسطی"}
        </button>

        {/* پیام وضعیت */}
        {statusMsg && (
          <div className="mt-4 p-3 bg-yellow-50 text-black rounded-lg text-center">
            {statusMsg}
          </div>
        )}

        {/* نتیجه تایید */}
        {approvedCredit && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg text-black">
            <h2 className="font-semibold">اعتبار تایید شده:</h2>
            <p className="mt-1 text-lg font-bold text-green-700">
              {approvedCredit.toLocaleString()} تومان
            </p>

            <h2 className="mt-4 font-semibold">میزان طلای خریداری‌شده:</h2>
            <p className="mt-1 text-lg font-bold text-yellow-600">
              {boughtGold?.toFixed(4)} گرم
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
