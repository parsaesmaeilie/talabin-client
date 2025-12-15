import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "طلابین – خرید و فروش طلای دیجیتال با پشتوانه واقعی",
  description: "سرمایه‌گذاری روی طلا، ساده برای تازه‌کارها؛ مطمئن برای حرفه‌ای‌ها",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700&display=swap"
        />
      </head>
      <body style={{ fontFamily: '"Vazirmatn", system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
        <Navbar />
        <div className="pt-16 md:pt-20 select-none">{children}</div>
      </body>
    </html>
  );
}

