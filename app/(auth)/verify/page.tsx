"use client";

import { useForm } from "react-hook-form";

export default function OTPPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    alert("✔ کد تأیید شد!");
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 border border-yellow-200" dir="rtl">

        <h2 className="text-xl text-center mb-6 text-yellow-700 font-bold">کد پیامکی را وارد کنید</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input
            {...register("code")}
            placeholder="123456"
            className="w-full rounded-lg border border-gray-300 p-3 text-center tracking-widest text-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
          />

          <button
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg 
              font-semibold shadow-md transition duration-300"
          >
            تأیید
          </button>

        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          کد دریافت نکردی؟{" "}
          <button className="text-yellow-600 font-semibold hover:underline">ارسال مجدد</button>
        </p>

      </div>
    </div>
  );
}
