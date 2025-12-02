"use client";

import { useForm } from "react-hook-form";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    alert("✔ ورود انجام شد!");
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-yellow-200" dir="rtl">
        
        <h1 className="text-2xl font-bold text-center mb-6 text-yellow-700">
          ورود به حساب کاربری
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">شماره موبایل</label>
            <input
              {...register("phone", { required: true })}
              placeholder="09123456789"
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 
              focus:ring-yellow-400 focus:border-yellow-400 transition text-gray-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">رمز عبور</label>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="******"
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 
              focus:ring-yellow-400 focus:border-yellow-400 transition text-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg 
            font-semibold shadow-md transition duration-300"
          >
            ورود
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          حساب نداری؟{" "}
          <a href="/register" className="text-yellow-600 font-semibold hover:underline">
            ثبت‌نام
          </a>
        </p>
      </div>
    </div>
  );
}
