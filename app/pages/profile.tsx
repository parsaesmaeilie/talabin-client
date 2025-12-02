"use client";

import Link from "next/link";

export default function ProfilePage() {
  // فرض کنید اطلاعات کاربر از جایی مثل Context یا API دریافت می‌شود
  const user = {
    firstName: "علی",
    lastName: "رضایی",
    phone: "09123456789",
    email: "ali@example.com"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 p-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-yellow-200" dir="rtl">
        <h1 className="text-2xl font-bold text-center mb-6 text-yellow-700">پروفایل کاربری</h1>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">نام</label>
            <div className="p-3 bg-gray-100 rounded-lg">{user.firstName} {user.lastName}</div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">شماره موبایل</label>
            <div className="p-3 bg-gray-100 rounded-lg">{user.phone}</div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">ایمیل</label>
            <div className="p-3 bg-gray-100 rounded-lg">{user.email}</div>
          </div>

          <div className="flex justify-center mt-6">
            <Link
              href="/verification"
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-semibold transition duration-300"
            >
              احراز هویت
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
