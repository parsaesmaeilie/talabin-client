"use client";

import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const goldPrice = 11000000; // قیمت طلا

export default function BuySell() {
  const [isBuying, setIsBuying] = useState(true);
  const [amount, setAmount] = useState(0);
  const [goldAmount, setGoldAmount] = useState(0);
  const [isByGold, setIsByGold] = useState(true);

  const [userGold, setUserGold] = useState(10);
  const [userMoney, setUserMoney] = useState(100000000);

  // 🔥 تاریخچه معاملات
  const [history, setHistory] = useState<
    { type: string; gold: number; money: number; time: string }[]
  >([{
    type: "خرید",
    gold: 2.5,
    money: 2.5 * goldPrice,
    time: "۱۴۰۳/۱۰/۲۰ - ۱۲:۳۰",
  },
  {
    type: "فروش",
    gold: 1.2,
    money: 1.2 * goldPrice,
    time: "۱۴۰۳/۱۰/۱۸ - ۱۶:۴۵",
  },
  {
    type: "خرید",
    gold: 0.75,
    money: 0.75 * goldPrice,
    time: "۱۴۰۳/۱۰/۱۵ - ۱۰:۱۰",
  },]);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = parseFloat(event.target.value);
    setAmount(inputAmount);

    if (isByGold) setGoldAmount(inputAmount);
    else setGoldAmount(inputAmount / goldPrice);
  };

  const toggleUnit = () => {
    setIsByGold(!isByGold);
    setAmount(0);
    setGoldAmount(0);
  };

  const handleBuyWithAllMoney = () => {
    const allGoldToBuy = userMoney / goldPrice;
    setGoldAmount(allGoldToBuy);
    setAmount(userMoney);
  };

  const handleSellAllGold = () => {
    setAmount(userGold);
    setGoldAmount(userGold);
  };

  // ⭐ انجام تراکنش + ثبت تاریخچه
  const handleTransaction = () => {
    if (goldAmount <= 0) return alert("مقدار وارد شده معتبر نیست");

    const money = goldAmount * goldPrice;
    const time = new Date().toLocaleString("fa-IR");

    if (isBuying) {
      if (money > userMoney) return alert("موجودی کافی نیست!");

      setUserMoney(userMoney - money);
      setUserGold(userGold + goldAmount);

      setHistory([
        { type: "خرید", gold: goldAmount, money, time },
        ...history,
      ]);
    } else {
      if (goldAmount > userGold) return alert("طلای کافی ندارید!");

      setUserGold(userGold - goldAmount);
      setUserMoney(userMoney + money);

      setHistory([
        { type: "فروش", gold: goldAmount, money, time },
        ...history,
      ]);
    }

    alert("✔ عملیات انجام شد!");
  };

  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        label: "قیمت طلا",
        data: [
          10000000, 10500000, 11000000, 11500000, 11000000, 10800000, 11000000,
        ],
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20 select-none">
      <h1 className="text-2xl font-bold text-yellow-700 mb-6 text-center">
        {isBuying ? "خرید طلا" : "فروش طلا"}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* سمت چپ */}
        <div className="bg-white p-6 shadow-lg rounded-xl border border-yellow-100">
          {/* خرید/فروش */}
          <div className="flex justify-center mb-6">
            <div className="relative inline-block w-full rounded-full bg-gray-200 overflow-hidden">
              <div className="flex w-full">
                <div
                  onClick={() => setIsBuying(true)}
                  className={`w-1/2 py-3 text-center cursor-pointer transition-all duration-300 rounded-l-full font-semibold text-lg ${
                    isBuying
                      ? "bg-yellow-500 text-white shadow-lg"
                      : "bg-gray-300 text-gray-600 hover:bg-yellow-300"
                  }`}
                >
                  خرید
                </div>
                <div
                  onClick={() => setIsBuying(false)}
                  className={`w-1/2 py-3 text-center cursor-pointer transition-all duration-300 rounded-r-full font-semibold text-lg ${
                    !isBuying
                      ? "bg-red-500 text-white shadow-lg"
                      : "bg-gray-300 text-gray-600 hover:bg-red-300"
                  }`}
                >
                  فروش
                </div>
              </div>
            </div>
          </div>

          {/* ورودی */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-full">
              <label className="block mb-2 text-lg text-gray-800">
                {isByGold ? "مقدار طلا (گرم)" : "مبلغ (تومان)"}
              </label>

              <div className="w-full flex items-center justify-between">
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  className="w-4/5 p-3 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-yellow-500"
                  placeholder={
                    isByGold
                      ? "مقدار طلا را وارد کنید"
                      : "مبلغ مورد نظر را وارد کنید"
                  }
                />

                <div
                  onClick={toggleUnit}
                  className="w-1/5 py-3 text-center bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-yellow-600 transition-all duration-300"
                >
                  {isByGold ? "تومان" : "گرم"}
                </div>
              </div>

              {/* موجودی */}
              <div className="text-right mt-2 text-sm text-gray-700">
                {isBuying ? (
                  <div>موجودی کیف پول: {userMoney.toLocaleString()} تومان</div>
                ) : (
                  <div>موجودی طلا: {userGold.toFixed(2)} گرم</div>
                )}
              </div>
            </div>
          </div>

          {/* محاسبه */}
          {isByGold ? (
            <div className="text-center text-lg font-semibold text-yellow-700">
              {amount > 0
                ? `مبلغ: ${(goldAmount * goldPrice).toLocaleString()} تومان`
                : "مبلغ محاسبه نشده"}
            </div>
          ) : (
            <div className="text-center text-lg font-semibold text-yellow-700">
              {amount > 0
                ? `مقدار طلا: ${goldAmount.toFixed(4)} گرم`
                : "مقدار طلا محاسبه نشده"}
            </div>
          )}

          {/* خرید با کل موجودی */}
          {isBuying && (
            <div
              className="text-center mt-4 cursor-pointer text-blue-500 hover:underline"
              onClick={handleBuyWithAllMoney}
            >
              خرید با کل موجودی
            </div>
          )}

          {/* فروش با کل موجودی */}
          {!isBuying && (
            <div
              className="text-center mt-4 cursor-pointer text-blue-500 hover:underline"
              onClick={handleSellAllGold}
            >
              فروش با کل موجودی
            </div>
          )}

          {/* دکمه */}
          <div className="mt-4">
            <button
              className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600"
              onClick={handleTransaction}
            >
              {isBuying ? "خرید طلا" : "فروش طلا"}
            </button>
          </div>
        </div>

        {/* سمت راست: نمودار */}
        <div className="bg-white p-6 shadow-lg rounded-xl border border-yellow-100">
          <h2 className="text-xl font-bold text-yellow-700 mb-4 text-center">
            نمودار قیمت طلا
          </h2>
          <Line data={data} />
        </div>
      </div>

      {/* 🔥 تاریخچه معاملات */}
      <div className="bg-white p-6 mt-10 shadow-lg rounded-xl border border-yellow-100">
        <h2 className="text-xl font-bold text-yellow-700 mb-4 text-center">
          تاریخچه معاملات
        </h2>

        {history.length === 0 ? (
          <div className="text-center text-gray-600">هنوز معامله‌ای انجام نشده</div>
        ) : (
          <table className="w-full text-center">
  <thead>
    <tr className="bg-yellow-200 text-gray-900">
      <th className="py-2">نوع</th>
      <th className="py-2">مقدار طلا (گرم)</th>
      <th className="py-2">مبلغ (تومان)</th>
      <th className="py-2">زمان</th>
    </tr>
  </thead>

  <tbody>
  {history.map((item, i) => (
    <tr
      key={i}
      className={`text-gray-800 ${
        item.type === "خرید" ? "bg-green-100" : "bg-red-100"
      }`}
    >
      <td className="py-2">{item.type}</td>
      <td className="py-2">{item.gold.toFixed(4)}</td>
      <td className="py-2">{item.money.toLocaleString()}</td>
      <td className="py-2">{item.time}</td>
    </tr>
  ))}
</tbody>


</table>

        )}
      </div>
    </div>
  );
}
