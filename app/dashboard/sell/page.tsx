"use client";

import { useState } from "react";

export default function SellPage() {
  const [gram, setGram] = useState("");

  return (
    <div className="min-h-screen bg-yellow-50 p-6" dir="rtl">
      <h1 className="text-2xl font-bold text-yellow-700 mb-6">فروش طلا</h1>

      <div className="bg-white p-6 rounded-xl shadow border border-yellow-200 max-w-md">

        <label className="block mb-2">مقدار طلا (گرم)</label>
        <input
          value={gram}
          onChange={(e) => setGram(e.target.value)}
          placeholder="مثلاً 1.2"
          className="w-full border p-3 rounded-lg"
        />

        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg mt-4 font-semibold">
          فروش
        </button>

      </div>
    </div>
  );
}
