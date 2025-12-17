import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-yellow-50">
        <Navbar />
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 pt-20 select-none">
          {children}
        </div>
      </body>
    </html>
  );
}
