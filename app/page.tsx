import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100"  dir="rtl">

      {/* سکشن معرفی */}
      <section className="text-center py-20 bg-gradient-to-br from-yellow-100 to-yellow-200">
        <h1 className="text-4xl font-extrabold text-yellow-700 mb-4">
          خرید و فروش طلای دیجیتال
        </h1>
        <p className="text-gray-700 max-w-xl mx-auto text-lg mb-8">
          خرید و فروش لحظه‌ای، امن و آسان طلا بدون محدودیت زمانی.
          هر لحظه قیمت لحظه‌ای طلا را مشاهده کنید و با چند کلیک معامله کنید.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/register"
            className="bg-yellow-500 text-white px-8 py-3 rounded-lg text-lg shadow hover:bg-yellow-600 transition"
          >
            شروع کنید
          </Link>
          <Link
            href="/dashboard"
            className="border border-yellow-500 text-yellow-700 px-8 py-3 rounded-lg text-lg hover:bg-yellow-100 transition"
          >
            مشاهده داشبورد
          </Link>
        </div>
      </section>

      {/* سکشن بلاگ */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-2xl font-bold text-yellow-700 mb-8">آخرین مطالب بلاگ</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          {/* بلاگ ۱ */}
          <div className="bg-white shadow-sm border border-yellow-200 rounded-xl p-5 hover:shadow-lg transition">
            <h3 className="font-bold text-lg text-yellow-700 mb-2">چطور طلای دیجیتال بخریم؟</h3>
            <p className="text-gray-600 text-sm">
              این فقط یک متن تستی است. بعداً محتوای واقعی را جایگزین می‌کنید.
            </p>
          </div>

          {/* بلاگ ۲ */}
          <div className="bg-white shadow-sm border border-yellow-200 rounded-xl p-5 hover:shadow-lg transition">
            <h3 className="font-bold text-lg text-yellow-700 mb-2">مزایای خرید طلای آنلاین</h3>
            <p className="text-gray-600 text-sm">
              این فقط یک متن تستی است. بعداً محتوای واقعی را جایگزین می‌کنید.
            </p>
          </div>

          {/* بلاگ ۳ */}
          <div className="bg-white shadow-sm border border-yellow-200 rounded-xl p-5 hover:shadow-lg transition">
            <h3 className="font-bold text-lg text-yellow-700 mb-2">سریع‌ترین روش فروش طلا</h3>
            <p className="text-gray-600 text-sm">
              این فقط یک متن تستی است. بعداً محتوای واقعی را جایگزین می‌کنید.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
