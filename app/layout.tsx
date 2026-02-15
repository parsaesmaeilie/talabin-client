import type { Metadata, Viewport } from "next";
import "./globals.css";
import SupportButton from "@/components/SupportButton";

export const metadata: Metadata = {
  title: "طلابین – خرید و فروش طلای دیجیتال با پشتوانه واقعی",
  description: "سرمایه‌گذاری روی طلا، ساده برای تازه‌کارها؛ مطمئن برای حرفه‌ای‌ها",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FDB022",
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
        <div className="select-none page-transition">
          {children}
          <SupportButton />
        </div>
      </body>
    </html>
  );
}

