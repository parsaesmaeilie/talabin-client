"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Icon } from "../Icon";

export const TopBar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="top-bar">
      <button
        onClick={() => router.push('/profile/messages')}
        className="top-bar-icon"
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
        aria-label="پیام‌ها و اعلان‌ها"
      >
        <Icon name="ticket-star" variant="bulk" size={20} />
        <span className="notification-badge">۳</span>
      </button>

      <button
        onClick={() => router.push('/dashboard')}
        className="top-bar-logo"
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
        aria-label="صفحه اصلی"
      >
        T
      </button>

      <button
        onClick={() => router.push('/profile')}
        className="top-bar-icon"
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
        aria-label="پروفایل کاربری"
      >
        <Icon name="personalcard" variant="linear" size={20} />
      </button>
    </div>
  );
};
