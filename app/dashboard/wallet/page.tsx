// app/dashboard/wallet/index.tsx
"use client";
import Link from "next/link";
import { useState } from "react";

export default function WalletPage() {
  const [user, setUser] = useState({
    userMoney: 5000000,
    userGold: 2.5,
    transactions: [
      { type: "واریز", amount: 1000000, date: "1401/02/10" },
      { type: "برداشت", amount: 500000, date: "1401/03/15" },
      { type: "واریز", amount: 1500000, date: "1401/05/20" },
    ],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-200 text-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-yellow-600 text-center mb-6">کیف پول</h1>

        {/* نمایش موجودی کیف پول */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-sm font-medium text-black">موجودی کیف پول</label>
            <div className="p-3 bg-yellow-50 text-black rounded-lg font-semibold">
              {user.userMoney.toLocaleString()} تومان
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-black">موجودی طلا</label>
            <div className="p-3 bg-yellow-50 text-black rounded-lg font-semibold">
              {user.userGold.toFixed(2)} گرم
            </div>
          </div>
        </div>

        {/* تاریخچه تراکنش‌ها */}
        <h2 className="text-xl font-semibold text-yellow-600 mb-4">تاریخچه تراکنش‌ها</h2>
        <div className="space-y-4">
          {user.transactions.map((transaction, index) => (
            <div key={index} className="p-4 bg-yellow-50 rounded-lg text-black">
              <div className="flex justify-between">
                <span className="font-semibold">{transaction.type}</span>
                <span className="text-gray-700">{transaction.date}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>{transaction.amount.toLocaleString()} تومان</span>
              </div>
            </div>
          ))}
        </div>

        {/* دکمه‌های شارژ و برداشت */}
        <div className="mt-6 flex gap-4 justify-center">
          <Link href="/dashboard/wallet/deposit">
            <button className="px-6 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition duration-300">
              شارژ حساب
            </button>
          </Link>
          <Link href="/dashboard/wallet/withdraw">
            <button className="px-6 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition duration-300">
              برداشت از حساب
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
