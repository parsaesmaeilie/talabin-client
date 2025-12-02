import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-yellow-50">
        <Navbar />
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 pt-20 select-none">{children}</div>
      </body>
    </html>
  );
}

