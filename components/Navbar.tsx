"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 z-50 w-full border-b"
      style={{
        backdropFilter: 'blur(12px)',
        background: 'rgba(250, 249, 246, 0.9)',
        borderColor: 'rgba(0,0,0,0.03)',
        boxShadow: '0 2px 16px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-3 md:py-3.5 flex justify-between items-center gap-3 md:gap-4">

        {/* برند */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-base transition-transform hover:scale-105">
          <div
            className="flex items-center justify-center text-lg"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              background: '#FFC857',
              color: '#1C1C1C',
              boxShadow: '0 4px 12px rgba(255, 200, 87, 0.3)',
            }}
          >
            ط
          </div>
          <span style={{ color: '#1C1C1C' }}>طلابین</span>
        </Link>

        {/* لینک‌های ناوبری */}
        <div className="hidden md:flex gap-4 text-sm font-medium items-center flex-1 justify-center">
          <Link
            href="/dashboard/prices/gold"
            className="transition-colors"
            style={{ color: 'rgba(28, 28, 28, 0.75)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1C1C1C'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(28, 28, 28, 0.75)'}
          >
            قیمت روز طلا
          </Link>
          <Link
            href="/dashboard/buy-sell"
            className="transition-colors"
            style={{ color: 'rgba(28, 28, 28, 0.75)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1C1C1C'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(28, 28, 28, 0.75)'}
          >
            خرید و فروش
          </Link>
          <Link
            href="/installment"
            className="transition-colors"
            style={{ color: 'rgba(28, 28, 28, 0.75)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1C1C1C'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(28, 28, 28, 0.75)'}
          >
            خرید قسطی
          </Link>
          <Link
            href="/dashboard/wallet"
            className="transition-colors"
            style={{ color: 'rgba(28, 28, 28, 0.75)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1C1C1C'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(28, 28, 28, 0.75)'}
          >
            کیف پول
          </Link>
          <Link
            href="/dashboard"
            className="transition-colors"
            style={{ color: 'rgba(28, 28, 28, 0.75)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1C1C1C'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(28, 28, 28, 0.75)'}
          >
            داشبورد
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-black/5 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="منوی موبایل"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* دکمه‌های ورود و ثبت‌نام */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-1.5 text-xs md:text-sm font-medium transition-all"
            style={{
              borderRadius: '999px',
              padding: '8px 14px',
              border: '1px solid transparent',
              background: 'rgba(28,28,28,0.02)',
              borderColor: 'rgba(28,28,28,0.06)',
              color: 'inherit',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(28,28,28,0.04)';
              e.currentTarget.style.borderColor = 'rgba(28,28,28,0.16)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(28,28,28,0.02)';
              e.currentTarget.style.borderColor = 'rgba(28,28,28,0.06)';
            }}
          >
            ورود
          </Link>

          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-1.5 text-xs md:text-sm font-medium transition-all"
            style={{
              borderRadius: '999px',
              padding: '8px 14px',
              border: '1px solid #FFC857',
              background: '#FFC857',
              color: '#1C1C1C',
              boxShadow: '0 10px 18px rgba(255, 200, 87, 0.35)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 14px 26px rgba(255, 200, 87, 0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 18px rgba(255, 200, 87, 0.35)';
            }}
          >
            ثبت‌نام
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden border-t"
          style={{
            borderColor: 'rgba(0,0,0,0.04)',
            background: 'rgba(250, 249, 246, 0.98)',
          }}
        >
          <div className="container py-4 flex flex-col gap-2">
            <Link
              href="/dashboard/prices/gold"
              className="px-4 py-2.5 rounded-lg transition-colors text-sm font-medium"
              style={{ color: 'rgba(28, 28, 28, 0.75)' }}
              onClick={() => setIsOpen(false)}
            >
              قیمت روز طلا
            </Link>
            <Link
              href="/dashboard/buy-sell"
              className="px-4 py-2.5 rounded-lg transition-colors text-sm font-medium"
              style={{ color: 'rgba(28, 28, 28, 0.75)' }}
              onClick={() => setIsOpen(false)}
            >
              خرید و فروش
            </Link>
            <Link
              href="/installment"
              className="px-4 py-2.5 rounded-lg transition-colors text-sm font-medium"
              style={{ color: 'rgba(28, 28, 28, 0.75)' }}
              onClick={() => setIsOpen(false)}
            >
              خرید قسطی
            </Link>
            <Link
              href="/dashboard/wallet"
              className="px-4 py-2.5 rounded-lg transition-colors text-sm font-medium"
              style={{ color: 'rgba(28, 28, 28, 0.75)' }}
              onClick={() => setIsOpen(false)}
            >
              کیف پول
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2.5 rounded-lg transition-colors text-sm font-medium"
              style={{ color: 'rgba(28, 28, 28, 0.75)' }}
              onClick={() => setIsOpen(false)}
            >
              داشبورد
            </Link>

            <div className="flex flex-col gap-2 mt-2 px-2">
              <Link
                href="/login"
                className="btn btn-ghost text-center"
                onClick={() => setIsOpen(false)}
              >
                ورود
              </Link>
              <Link
                href="/register"
                className="btn btn-primary text-center"
                onClick={() => setIsOpen(false)}
              >
                ثبت‌نام
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
