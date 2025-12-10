"use client";
import { useEffect, useState } from "react";

type GoldPriceDetail = {
  name: string;
  currentRate: number;
  highRate: number;
  lowRate: number;
  maxFluctuation: number;
  maxFluctuationPercent: number;
  openRate: number;
  lastUpdate: string;
  prevRate: number;
  changePercent: number;
  changeAmount: number;
};

export default function GoldPricesPage() {
  const [prices, setPrices] = useState<GoldPriceDetail[]>([]);

  useEffect(() => {
    const samplePrices: GoldPriceDetail[] = [
      {
        name: "طلای ۱۸ عیار",
        currentRate: 12699000,
        highRate: 12721000,
        lowRate: 12607900,
        maxFluctuation: 39400,
        maxFluctuationPercent: 0.28,
        openRate: 12681600,
        lastUpdate: "۱۹:۰۶:۱۷",
        prevRate: 12679700,
        changePercent: 0.05,
        changeAmount: 6200,
      },
      {
        name: "طلای ۲۱ عیار",
        currentRate: 14850000,
        highRate: 14890000,
        lowRate: 14780000,
        maxFluctuation: 60000,
        maxFluctuationPercent: 0.40,
        openRate: 14810000,
        lastUpdate: "۱۹:۰۶:۲۲",
        prevRate: 14820000,
        changePercent: -0.05,
        changeAmount: -7000,
      },
      {
        name: "طلای ۲۴ عیار",
        currentRate: 16950000,
        highRate: 16990000,
        lowRate: 16870000,
        maxFluctuation: 120000,
        maxFluctuationPercent: 0.71,
        openRate: 16920000,
        lastUpdate: "۱۹:۰۶:۳۰",
        prevRate: 16930000,
        changePercent: 0.12,
        changeAmount: 20000,
      },
      {
        name: "طلای آب‌شده",
        currentRate: 16920000,
        highRate: 16950000,
        lowRate: 16850000,
        maxFluctuation: 100000,
        maxFluctuationPercent: 0.59,
        openRate: 16890000,
        lastUpdate: "۱۹:۰۶:۳۵",
        prevRate: 16900000,
        changePercent: 0.12,
        changeAmount: 20000,
      },
      {
        name: "انس جهانی طلا",
        currentRate: 1960,
        highRate: 1970,
        lowRate: 1950,
        maxFluctuation: 20,
        maxFluctuationPercent: 1.02,
        openRate: 1955,
        lastUpdate: "۱۹:۰۶:۴۰",
        prevRate: 1958,
        changePercent: 0.10,
        changeAmount: 2,
      },
      {
        name: "سکه امامی",
        currentRate: 13750000,
        highRate: 13800000,
        lowRate: 13720000,
        maxFluctuation: 80000,
        maxFluctuationPercent: 0.58,
        openRate: 13730000,
        lastUpdate: "۱۹:۰۶:۴۵",
        prevRate: 13740000,
        changePercent: 0.07,
        changeAmount: 10000,
      },
      {
        name: "ربع سکه",
        currentRate: 4500000,
        highRate: 4600000,
        lowRate: 4450000,
        maxFluctuation: 150000,
        maxFluctuationPercent: 3.33,
        openRate: 4480000,
        lastUpdate: "۱۹:۰۶:۵۰",
        prevRate: 4490000,
        changePercent: 0.22,
        changeAmount: 10000,
      },
      {
        name: "سکه گرمی",
        currentRate: 3000000,
        highRate: 3050000,
        lowRate: 2950000,
        maxFluctuation: 100000,
        maxFluctuationPercent: 3.33,
        openRate: 2980000,
        lastUpdate: "۱۹:۰۶:۵۵",
        prevRate: 2990000,
        changePercent: 0.33,
        changeAmount: 10000,
      },
    ];

    setPrices(samplePrices);

    const interval = setInterval(() => setPrices(samplePrices), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-600 text-center mb-6">
          قیمت لحظه‌ای طلا و سکه
        </h1>

        {/* grid چند ستونه: موبایل 1، تبلت 2، دسکتاپ 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prices.map((price, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-yellow-700 mb-4">
                {price.name}
              </h2>
              <div className="grid grid-cols-1 gap-2 text-black">
                <div className="flex justify-between bg-yellow-50 p-2 rounded-lg">
                  <span>نرخ فعلی</span>
                  <span>{price.currentRate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between bg-yellow-50 p-2 rounded-lg">
                  <span>بالاترین قیمت روز</span>
                  <span>{price.highRate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between bg-yellow-50 p-2 rounded-lg">
                  <span>پایین‌ترین قیمت روز</span>
                  <span>{price.lowRate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between bg-yellow-50 p-2 rounded-lg">
                  <span>بیشترین مقدار نوسان روز</span>
                  <span>{price.maxFluctuation.toLocaleString()}</span>
                </div>
                <div className="flex justify-between bg-yellow-50 p-2 rounded-lg">
                  <span>درصد بیشترین نوسان روز</span>
                  <span>{price.maxFluctuationPercent}%</span>
                </div>
                <div className="flex justify-between bg-yellow-50 p-2 rounded-lg">
                  <span>نرخ بازگشایی بازار</span>
                  <span>{price.openRate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between bg-yellow-50 p-2 rounded-lg">
                  <span>زمان ثبت آخرین نرخ</span>
                  <span>{price.lastUpdate}</span>
                </div>
                <div className="flex justify-between bg-yellow-50 p-2 rounded-lg">
                  <span>نرخ روز گذشته</span>
                  <span>{price.prevRate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between bg-yellow-50 p-2 rounded-lg">
                  <span>درصد تغییر نسبت به روز گذشته</span>
                  <span>{price.changePercent}%</span>
                </div>
                <div className="flex justify-between bg-yellow-50 p-2 rounded-lg">
                  <span>میزان تغییر نسبت به روز گذشته</span>
                  <span>{price.changeAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
