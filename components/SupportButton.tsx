"use client";

import Link from "next/link";

export default function SupportButton() {
  return (
    <>
      <Link href="/profile/support" className="support-floating-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 13.75 2.5 15.38 3.36 16.78L2 22L7.22 20.64C8.62 21.5 10.25 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="currentColor" fillOpacity="0.1"/>
          <path d="M12 2C6.48 2 2 6.48 2 12C2 13.75 2.5 15.38 3.36 16.78L2 22L7.22 20.64C8.62 21.5 10.25 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 10.5C8.82843 10.5 9.5 9.82843 9.5 9C9.5 8.17157 8.82843 7.5 8 7.5C7.17157 7.5 6.5 8.17157 6.5 9C6.5 9.82843 7.17157 10.5 8 10.5Z" fill="currentColor"/>
          <path d="M16 10.5C16.8284 10.5 17.5 9.82843 17.5 9C17.5 8.17157 16.8284 7.5 16 7.5C15.1716 7.5 14.5 8.17157 14.5 9C14.5 9.82843 15.1716 10.5 16 10.5Z" fill="currentColor"/>
          <path d="M8.5 13.5C8.5 13.5 10 15.5 12 15.5C14 15.5 15.5 13.5 15.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="support-btn-text">پشتیبانی</span>
      </Link>

      <style jsx>{`
        .support-floating-btn {
          position: fixed;
          bottom: 24px;
          left: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 18px;
          background: linear-gradient(135deg, #FFC857 0%, #FFB020 100%);
          backdrop-filter: blur(12px);
          border-radius: 50px;
          box-shadow: 0 8px 24px rgba(255, 200, 87, 0.4);
          color: #1C1C1C;
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 999;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .support-floating-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 32px rgba(255, 200, 87, 0.5);
          background: linear-gradient(135deg, #FFD066 0%, #FFC857 100%);
        }

        .support-floating-btn:active {
          transform: translateY(-1px) scale(0.98);
        }

        .support-floating-btn svg {
          flex-shrink: 0;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .support-btn-text {
          display: none;
        }

        /* Small phones */
        @media (min-width: 375px) {
          .support-floating-btn {
            padding: 12px 14px;
          }
        }

        /* Tablet and up */
        @media (min-width: 640px) {
          .support-floating-btn {
            padding: 14px 20px;
            font-size: 15px;
            bottom: 28px;
            left: 28px;
          }

          .support-btn-text {
            display: block;
          }
        }

        /* Desktop */
        @media (min-width: 1024px) {
          .support-floating-btn {
            padding: 15px 24px;
            font-size: 16px;
            bottom: 32px;
            left: 32px;
          }
        }

        /* When bottom navigation is present (mobile dashboard) */
        @media (max-width: 639px) {
          .support-floating-btn {
            bottom: 84px;
          }
        }

        /* Animation on mount */
        @keyframes slideInLeft {
          from {
            transform: translateX(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .support-floating-btn {
          animation: slideInLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
        }
      `}</style>
    </>
  );
}
