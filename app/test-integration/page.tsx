'use client';

import { useEffect, useState } from 'react';
import { pricesService, authService, walletService, GoldPrice, Wallet } from '@/lib/api';

export default function TestIntegrationPage() {
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginStatus, setLoginStatus] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadGoldPrice();
  }, []);

  const loadGoldPrice = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await pricesService.getCurrentPrice();

      if (response.success && response.data) {
        setGoldPrice(response.data);
      } else {
        setError(response.error?.message || 'خطا در دریافت قیمت طلا');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsLoading(false);
    }
  };

  const testLogin = async () => {
    setLoginStatus('در حال ورود...');
    setError('');

    try {
      const response = await authService.login({
        phone_number: '+989121234567',
        password: 'test123',
      });

      if (response.success && response.data) {
        setLoginStatus('ورود موفق! دریافت اطلاعات کیف پول...');

        // Load wallet after successful login
        const walletResponse = await walletService.getBalance();
        if (walletResponse.success && walletResponse.data) {
          setWallet(walletResponse.data);
          setLoginStatus('ورود و دریافت اطلاعات کیف پول موفق!');
        } else {
          setError(walletResponse.error?.message || 'خطا در دریافت اطلاعات کیف پول');
        }
      } else {
        setError(response.error?.message || 'خطا در ورود');
        setLoginStatus('');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
      setLoginStatus('');
    }
  };

  const testLogout = () => {
    authService.logout();
    setWallet(null);
    setLoginStatus('');
    setError('');
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('fa-IR').format(parseFloat(price));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          🧪 تست یکپارچه‌سازی Frontend & Backend
        </h1>

        {/* Connection Status */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">📡 وضعیت اتصال</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-500/20 rounded-lg p-4">
              <div className="text-green-400 font-bold">Backend (Django)</div>
              <div className="text-white text-sm">✅ http://localhost:8000</div>
            </div>
            <div className="bg-blue-500/20 rounded-lg p-4">
              <div className="text-blue-400 font-bold">Frontend (Next.js)</div>
              <div className="text-white text-sm">✅ http://localhost:3000</div>
            </div>
          </div>
        </div>

        {/* Gold Price Test */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">💰 قیمت طلا (بدون احراز هویت)</h2>

          {isLoading ? (
            <div className="text-white text-center">در حال بارگذاری...</div>
          ) : goldPrice ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-500/20 rounded-lg p-4">
                <div className="text-green-400 text-sm mb-2">قیمت خرید</div>
                <div className="text-white text-2xl font-bold">
                  {formatPrice(goldPrice.buy_price)} تومان
                </div>
              </div>
              <div className="bg-red-500/20 rounded-lg p-4">
                <div className="text-red-400 text-sm mb-2">قیمت فروش</div>
                <div className="text-white text-2xl font-bold">
                  {formatPrice(goldPrice.sell_price)} تومان
                </div>
              </div>
            </div>
          ) : (
            <div className="text-red-400 text-center">خطا در دریافت قیمت</div>
          )}

          <button
            onClick={loadGoldPrice}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            🔄 به‌روزرسانی قیمت
          </button>
        </div>

        {/* Authentication Test */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">🔐 تست احراز هویت و کیف پول</h2>

          {!wallet ? (
            <>
              <div className="bg-blue-500/20 rounded-lg p-4 mb-4">
                <div className="text-blue-400 text-sm">اطلاعات ورود تستی:</div>
                <div className="text-white mt-2">
                  <div>📱 شماره: +989121234567</div>
                  <div>🔑 رمز: test123</div>
                </div>
              </div>

              <button
                onClick={testLogin}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                ورود و دریافت اطلاعات کیف پول
              </button>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-green-500/20 rounded-lg p-4">
                  <div className="text-green-400 text-sm mb-2">موجودی تومان</div>
                  <div className="text-white text-2xl font-bold">
                    {formatPrice(wallet.balance_irr)}
                  </div>
                </div>
                <div className="bg-yellow-500/20 rounded-lg p-4">
                  <div className="text-yellow-400 text-sm mb-2">موجودی طلا</div>
                  <div className="text-white text-2xl font-bold">
                    {wallet.gold_balance} گرم
                  </div>
                </div>
              </div>

              <button
                onClick={testLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                خروج
              </button>
            </>
          )}

          {loginStatus && (
            <div className="mt-4 bg-blue-500/20 rounded-lg p-4">
              <div className="text-blue-400">{loginStatus}</div>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/20 backdrop-blur-lg rounded-2xl p-6 mb-6">
            <div className="text-red-400 font-bold mb-2">❌ خطا</div>
            <div className="text-white">{error}</div>
          </div>
        )}

        {/* API Documentation Link */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
          <h3 className="text-white font-bold mb-4">📚 مستندات API</h3>
          <div className="flex gap-4 justify-center">
            <a
              href="http://localhost:8000/api/docs/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Swagger UI
            </a>
            <a
              href="http://localhost:8000/admin/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Admin Panel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
