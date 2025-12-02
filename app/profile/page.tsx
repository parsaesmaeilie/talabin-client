"use client";

import Link from "next/link";

export default function ProfilePage() {
  // فرض کنید اطلاعات کاربر از جایی مثل Context یا API دریافت می‌شود
  const user = {
    firstName: "علی",
    lastName: "رضایی",
    phone: "09123456789",
    email: "ali@example.com",
    nationalId: "1234567890",
    registrationDate: "1400/01/01",
    totalPurchases: 5,
    userMoney: 5000000, // موجودی کیف پول (تومان)
    userGold: 10.5 // موجودی طلا (گرم)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 text-gray-900">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-yellow-200" dir="rtl">
        <h1 className="text-2xl font-bold text-center mb-6 text-yellow-700">پروفایل کاربری</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* نام و نام خانوادگی */}
          <div>
            <label className="text-sm font-medium text-gray-900">نام</label>
            <div className="p-3 bg-gray-100 rounded-lg">{user.firstName} {user.lastName}</div>
          </div>

          {/* شماره موبایل */}
          <div>
            <label className="text-sm font-medium text-gray-900">شماره موبایل</label>
            <div className="p-3 bg-gray-100 rounded-lg">{user.phone}</div>
          </div>

          {/* ایمیل */}
          <div>
            <label className="text-sm font-medium text-gray-900">ایمیل</label>
            <div className="p-3 bg-gray-100 rounded-lg">{user.email}</div>
          </div>

          {/* کد ملی */}
          <div>
            <label className="text-sm font-medium text-gray-900">کد ملی</label>
            <div className="p-3 bg-gray-100 rounded-lg">{user.nationalId}</div>
          </div>

          {/* تاریخ ثبت نام */}
          <div>
            <label className="text-sm font-medium text-gray-900">تاریخ ثبت‌نام</label>
            <div className="p-3 bg-gray-100 rounded-lg">{user.registrationDate}</div>
          </div>

          {/* تعداد کل خریدها */}
          <div>
            <label className="text-sm font-medium text-gray-900">تعداد کل خریدها</label>
            <div className="p-3 bg-gray-100 rounded-lg">{user.totalPurchases}</div>
          </div>

          {/* موجودی کیف پول */}
          <div>
            <label className="text-sm font-medium text-black">موجودی کیف پول</label>
            <div className="p-3 bg-gray-200 text-black rounded-lg font-semibold">
              {user.userMoney.toLocaleString()} تومان
            </div>
            <div className="mt-2 flex gap-4">
              {/* دکمه شارژ حساب */}
              <Link href="/charge">
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
                  شارژ حساب
                </button>
              </Link>
              {/* دکمه برداشت از حساب */}
              <Link href="/withdraw">
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
                  برداشت از حساب
                </button>
              </Link>
            </div>
          </div>

          {/* موجودی طلا */}
          <div>
            <label className="text-sm font-medium text-gray-900">موجودی طلا</label>
            <div className="p-3 bg-gray-100 rounded-lg">{user.userGold.toFixed(2)} گرم</div>
          </div>
        </div>

        {/* دکمه احراز هویت */}
        <div className="flex justify-center mt-6">
          <Link
            href="/profile/verification"
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-semibold transition duration-300"
          >
            احراز هویت
          </Link>
        </div>
      </div>
    </div>
  );
}
