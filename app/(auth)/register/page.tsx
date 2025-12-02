"use client";

import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors },watch } = useForm();

  const onSubmit = (data: any) => {
    alert("✔ ثبت‌نام انجام شد!");
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-yellow-200" dir="rtl">
        
        <h1 className="text-2xl font-bold text-center mb-6 text-yellow-700">
          ثبت‌نام در حساب کاربری
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="w-full flex items-center justify-between">
          {/* نام */}
          <div className="w-5/11 ">
            <label className="block mb-1 text-sm font-medium text-gray-700">نام</label>
            <input
              {...register("firstName", { required: "نام الزامی است" })}
              placeholder=" خود را وارد کنید"
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition text-gray-500"
            />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
          </div>

          {/* نام خانوادگی */}
          <div className="w-5/11 ">
            <label className="block mb-1 text-sm font-medium text-gray-700">نام خانوادگی</label>
            <input
              {...register("lastName", { required: "نام خانوادگی الزامی است" })}
              placeholder="نام خانوادگی "
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition text-gray-500"
            />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
          </div>
          </div>

          {/* شماره موبایل */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">شماره موبایل</label>
            <input
              {...register("phone", { required: "شماره موبایل الزامی است", pattern: /^[0-9]{11}$/ })}
              placeholder="09123456789"
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition text-gray-500"
            />
            {errors.phone && <p className="text-sm text-red-500">لطفا شماره موبایل معتبر وارد کنید</p>}
          </div>

          {/* کد ملی */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">کد ملی</label>
            <input
              {...register("nationalId", { required: "کد ملی الزامی است", pattern: /^[0-9]{10}$/ })}
              placeholder="کد ملی خود را وارد کنید"
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition text-gray-500"
            />
            {errors.nationalId && <p className="text-sm text-red-500">کد ملی باید شامل 10 رقم باشد</p>}
          </div>



          {/* رمز عبور */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">رمز عبور</label>
            <input
              {...register("password", { required: "رمز عبور الزامی است", minLength: { value: 6, message: "رمز عبور باید حداقل 6 کاراکتر باشد" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
                  message: "رمز عبور باید شامل حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک علامت خاص باشد"
                } })}
              type="password"
              placeholder="******"
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition text-gray-500"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {/* تایید رمز عبور */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">تایید رمز عبور</label>
            <input
              {...register("confirmPassword", { 
                required: "تایید رمز عبور الزامی است", 
                validate: (value) => value === watch("password") || "رمز عبور باید یکسان باشد"
              })}
              type="password"
              placeholder="تایید رمز عبور"
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition text-gray-500"
            />
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg font-semibold shadow-md transition duration-300"
          >
            ثبت‌نام
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          حساب داری؟{" "}
          <a href="/login" className="text-yellow-600 font-semibold hover:underline">
            ورود به حساب
          </a>
        </p>
      </div>
    </div>
  );
}
