"use client";

import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// تنظیمات نمودار
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const goldPrice = 11000000; // قیمت طلا به تومان (مثال: 11 میلیون تومان)

export default function BuySell() {
  const [isBuying, setIsBuying] = useState(true); // حالت خرید یا فروش
  const [amount, setAmount] = useState(0); // مبلغ یا گرم وارد شده برای خرید یا فروش
  const [goldAmount, setGoldAmount] = useState(0); // مقدار طلا محاسبه‌شده
  const [isByGold, setIsByGold] = useState(true); // سوییچ برای انتخاب بین گرم و مبلغ

  // موجودی فرضی کاربر (مقدار طلا و پول)
  const [userGold, setUserGold] = useState(10); // موجودی طلا (مثلاً 10 گرم)
  const [userMoney, setUserMoney] = useState(100000000); // موجودی تومان (مثلاً 100 میلیون تومان)

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = parseFloat(event.target.value);
    setAmount(inputAmount);
    if (isByGold) {
      setGoldAmount(inputAmount); // اگر در حالت گرم باشه، مقدار طلا رو از همون میزان گرم وارد شده بگیریم
    } else {
      setGoldAmount(inputAmount / goldPrice); // در غیر این صورت، میزان طلا را بر اساس مبلغ محاسبه می‌کنیم
    }
  };

  const toggleUnit = () => {
    setIsByGold(!isByGold);
    setAmount(0); // وقتی واحد تغییر کرد، مقدار وارد شده رو پاک کنیم
    setGoldAmount(0); // مقدار طلا رو هم پاک کنیم
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

  // داده‌های نمودار قیمت طلا
  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7"], // زمان‌ها (مثال)
    datasets: [
      {
        label: "قیمت طلا",
        data: [10000000, 10500000, 11000000, 11500000, 11000000, 10800000, 11000000], // تغییرات قیمت طلا
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20 select-none">
      <h1 className="text-2xl font-bold text-yellow-700 mb-6 text-center">{isBuying ? "خرید طلا" : "فروش طلا"}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* باکس سمت چپ (فرم خرید/فروش) */}
        <div className="bg-white p-6 shadow-lg rounded-xl border border-yellow-100">
          {/* Toggle Switch برای خرید و فروش طلا */}
          <div className="flex justify-center mb-6">
            <div className="relative inline-block w-full rounded-full bg-gray-200 overflow-hidden">
              <div className="flex w-full">
                <div
                  onClick={() => setIsBuying(true)}
                  className={`w-1/2 py-3 text-center cursor-pointer transition-all duration-300 rounded-l-full font-semibold text-lg ${isBuying ? 'bg-yellow-500 text-white shadow-lg' : 'bg-gray-300 text-gray-600 hover:bg-yellow-300'}`}
                >
                  خرید
                </div>
                <div
                  onClick={() => setIsBuying(false)}
                  className={`w-1/2 py-3 text-center cursor-pointer transition-all duration-300 rounded-r-full font-semibold text-lg ${!isBuying ? 'bg-red-500 text-white shadow-lg' : 'bg-gray-300 text-gray-600 hover:bg-red-300'}`}
                >
                  فروش
                </div>
              </div>
            </div>
          </div>

          

          {/* فرم برای وارد کردن مبلغ یا گرم */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-full ">
              <label htmlFor="amount" className="block mb-2 text-lg text-gray-800">
                {isByGold ? "مقدار طلا (گرم)" : "مبلغ (تومان)"}
              </label>
              
              <div className="w-full flex items-center justify-between">
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                className="w-4/5 p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder={isByGold ? "مقدار طلا را وارد کنید" : "مبلغ مورد نظر را وارد کنید"}
              />
              <div
                onClick={toggleUnit}
                className="w-1/5 py-3 items-center  text-center bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-yellow-600 transition-all duration-300"
              >
                {isByGold ? "تومان" : "گرم"}
              </div>
            </div>
            {/* نمایش موجودی یوزر */}
          
          <div className="text-right mt-2  text-sm text-gray-700 select-none ">
          {isBuying && (
            <div >موجودی کیف پول: {userMoney.toLocaleString()} تومان</div>
          )}
            {!isBuying && (
                        <div>موجودی طلا: {userGold.toFixed(2)} گرم</div>

          )}
          </div>
            </div>
            
          </div>

          {/* وقتی بر اساس گرم محاسبه می‌کنیم، نمایش میزان مبلغ */}
          {isByGold ? (
            <div className="text-center text-lg font-semibold text-yellow-700 select-none">
              {amount > 0 ? `مبلغ: ${(goldAmount * goldPrice).toLocaleString()} تومان` : "مبلغ محاسبه نشده"}
            </div>
          ) : (
            // وقتی بر اساس تومان محاسبه می‌کنیم، نمایش مقدار طلا
            <div className="text-center text-lg font-semibold text-yellow-700 select-none">
              {amount > 0 ? `مقدار طلا: ${goldAmount.toFixed(4)} گرم` : "مقدار طلا محاسبه نشده"}
            </div>
          )}

          

          {/* متن خرید با کل موجودی */}
          {isBuying && (
            <div className="text-center mt-4 cursor-pointer text-blue-500 hover:underline select-none" onClick={handleBuyWithAllMoney}>
              خرید با کل موجودی
            </div>
          )}

          {/* متن فروش با کل موجودی */}
          {!isBuying && (
            <div className="text-center mt-4 cursor-pointer text-blue-500 hover:underline select-none" onClick={handleSellAllGold}>
              فروش با کل موجودی
            </div>
          )}

          {/* دکمه خرید یا فروش */}
          <div className="mt-4 text-center select-none">
            <button
              className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
              onClick={() => alert("✔ عملیات انجام شد!")}
            >
              {isBuying ? "خرید طلا" : "فروش طلا"}
            </button>
          </div>
        </div>

        {/* باکس سمت راست (نمودار قیمت طلا) */}
        <div className="bg-white p-6 shadow-lg rounded-xl border border-yellow-100">
          <h2 className="text-xl font-bold text-yellow-700 mb-4 text-center">نمودار قیمت طلا</h2>
          <Line data={data} />
        </div>
      </div>
    </div>
  );
}
