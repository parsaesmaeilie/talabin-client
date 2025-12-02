"use client";

import { useForm } from "react-hook-form";

export default function VerificationPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    alert("✔ احراز هویت انجام شد!");
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 p-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-yellow-200" dir="rtl">
        <h1 className="text-2xl font-bold text-center mb-6 text-yellow-700">احراز هویت</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">کد ملی</label>
            <input
              {...register("nationalId", { required: "کد ملی الزامی است", pattern: /^[0-9]{10}$/ })}
              placeholder="کد ملی خود را وارد کنید"
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition text-gray-500"
            />
            {errors.nationalId && <p className="text-sm text-red-500">کد ملی باید شامل 10 رقم باشد</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">تاریخ تولد</label>
            <input
              {...register("birthDate", { required: "تاریخ تولد الزامی است" })}
              type="date"
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition text-gray-500"
            />
            {errors.birthDate && <p className="text-sm text-red-500">تاریخ تولد الزامی است</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg font-semibold shadow-md transition duration-300"
          >
            ارسال اطلاعات
          </button>
        </form>
      </div>
    </div>
  );
}
