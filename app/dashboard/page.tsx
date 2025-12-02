export default function Dashboard() {
  return (
    <div className="min-h-screen bg-yellow-50 p-6 " dir="rtl">
      <h1 className="text-2xl font-bold text-yellow-700 mb-6">داشبورد</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <a href="/dashboard/buy-sell" className="bg-white p-6 rounded-xl shadow border border-yellow-200 hover:shadow-lg transition">
          <h2 className="font-semibold text-yellow-700 text-lg">خرید طلا</h2>
          <p className="text-gray-600 text-sm mt-2">خرید طلای دیجیتال به قیمت لحظه‌ای</p>
        </a>

        <a href="/dashboard/buy-sell" className="bg-white p-6 rounded-xl shadow border border-yellow-200 hover:shadow-lg transition">
          <h2 className="font-semibold text-yellow-700 text-lg">فروش طلا</h2>
          <p className="text-gray-600 text-sm mt-2">فروش فوری طلای دیجیتال</p>
        </a>

        <a href="/dashboard/wallet" className="bg-white p-6 rounded-xl shadow border border-yellow-200 hover:shadow-lg transition">
          <h2 className="font-semibold text-yellow-700 text-lg">کیف پول</h2>
          <p className="text-gray-600 text-sm mt-2">مشاهده موجودی و تراکنش‌ها</p>
        </a>

        <a href="/dashboard/wallet/deposit" className="bg-white p-6 rounded-xl shadow border border-yellow-200 hover:shadow-lg transition">
          <h2 className="font-semibold text-yellow-700 text-lg">شارژ حساب</h2>
          <p className="text-gray-600 text-sm mt-2">واریز پول به کیف پول</p>
        </a>

      </div>
    </div>
  );
}
