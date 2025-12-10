"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [openPrices, setOpenPrices] = useState(false);

  return (
    <nav className="w-full bg-white/90 backdrop-blur shadow-sm border-b border-yellow-200 fixed top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center" dir="rtl">
        
        {/* لوگو */}
        <Link href="/" className="text-yellow-700 text-xl font-bold">
          طلا بین
        </Link>

        {/* لینک‌ها */}
        <div className="hidden sm:flex gap-6 text-gray-700 font-medium items-center relative">
          
          <Link href="/profile" className="hover:text-yellow-600">پروفایل</Link>
          <Link href="/dashboard" className="hover:text-yellow-600">داشبورد</Link>
          <Link href="/installment" className="hover:text-yellow-600">خرید قسطی طلا</Link>
          <Link href="/dashboard/wallet" className="hover:text-yellow-600">کیف پول</Link>
          <Link href="/dashboard/buy-sell" className="hover:text-yellow-600">خرید و فروش طلا</Link>
          <Link href="/" className="hover:text-yellow-600">بلاگ</Link>
          <Link href="/dashboard/prices/gold" className="hover:text-yellow-600">قیمت روز طلا و سکه</Link>

         
        </div>

        {/* دکمه‌ها */}
        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm rounded-lg border border-yellow-400 text-yellow-700 hover:bg-yellow-100 transition"
          >
            ورود
          </Link>

          <Link
            href="/register"
            className="px-4 py-2 text-sm rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition"
          >
            ثبت‌نام
          </Link>
        </div>
      </div>
    </nav>
  );
}
