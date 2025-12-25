"use client";

import { useState } from "react";
import Link from "next/link";
import { mockFAQs, FAQ } from "@/lib/mockData";

export default function FAQPage() {
  const [faqs] = useState<FAQ[]>(mockFAQs);
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(faqs.map((faq) => faq.category)))];

  // Filter FAQs
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      faq.question.includes(searchQuery) ||
      faq.answer.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Group FAQs by category
  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div
      className="min-h-screen"
      style={{ padding: "20px 16px 100px", background: "#F5F5F5" }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <Link
            href="/profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            ←
          </Link>
          <h1
            style={{
              fontSize: "18px",
              fontWeight: 700,
              margin: 0,
            }}
          >
            سوالات متداول
          </h1>
          <div style={{ width: "40px" }} />
        </div>

        {/* Info Banner */}
        <div
          style={{
            padding: "16px",
            background: "linear-gradient(135deg, rgba(255, 200, 87, 0.1) 0%, rgba(255, 214, 102, 0.1) 100%)",
            borderRadius: "12px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>💡</div>
          <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
            پاسخ سوالات شما اینجاست
          </div>
          <div style={{ fontSize: "12px", color: "var(--color-muted)" }}>
            اگر پاسخ سوال خود را پیدا نکردید، با پشتیبانی تماس بگیرید
          </div>
        </div>

        {/* Search Box */}
        <div
          className="card"
          style={{
            marginBottom: "16px",
            padding: "12px 16px",
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در سوالات..."
            style={{
              width: "100%",
              padding: "10px 14px",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: "12px",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </div>

        {/* Category Filter */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "20px",
            overflowX: "auto",
            padding: "4px",
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: "10px 20px",
                background:
                  selectedCategory === category ? "var(--color-primary)" : "#FFFFFF",
                border: "none",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                boxShadow:
                  selectedCategory === category
                    ? "0 2px 8px rgba(255, 200, 87, 0.3)"
                    : "none",
              }}
            >
              {category === "all" ? "همه" : category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        {filteredFaqs.length > 0 ? (
          <div style={{ marginBottom: "16px" }}>
            {Object.entries(groupedFaqs).map(([category, categoryFaqs], categoryIndex) => (
              <div key={category} style={{ marginBottom: "24px" }}>
                {/* Category Header */}
                {selectedCategory === "all" && (
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      marginBottom: "12px",
                      color: "var(--color-dark)",
                    }}
                  >
                    {category}
                  </div>
                )}

                {/* FAQ Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {categoryFaqs.map((faq, index) => {
                    const isOpen = openFaqId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className="card"
                        style={{
                          padding: "0",
                          overflow: "hidden",
                          animation: `slideInUp 0.3s ease-out ${(categoryIndex * 0.1 + index * 0.05)}s backwards`,
                        }}
                      >
                        {/* Question */}
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          style={{
                            width: "100%",
                            padding: "16px 20px",
                            background: isOpen ? "rgba(255, 200, 87, 0.05)" : "transparent",
                            border: "none",
                            textAlign: "right",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            transition: "all 0.2s",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "var(--color-dark)",
                              flex: 1,
                              paddingLeft: "16px",
                            }}
                          >
                            {faq.question}
                          </div>
                          <div
                            style={{
                              fontSize: "20px",
                              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "transform 0.2s",
                            }}
                          >
                            ▼
                          </div>
                        </button>

                        {/* Answer */}
                        {isOpen && (
                          <div
                            style={{
                              padding: "0 20px 20px",
                              fontSize: "13px",
                              lineHeight: "1.8",
                              color: "var(--color-muted)",
                              animation: "slideInDown 0.2s ease-out",
                            }}
                          >
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="card"
            style={{
              padding: "60px 20px",
              textAlign: "center",
              color: "var(--color-muted)",
              marginBottom: "16px",
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🔍</div>
            <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>
              نتیجه‌ای یافت نشد
            </div>
            <div style={{ fontSize: "13px" }}>
              سوال مورد نظر خود را با کلمات دیگری جستجو کنید
            </div>
          </div>
        )}

        {/* Contact Support Card */}
        <div
          className="card"
          style={{
            padding: "24px",
            background: "linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)",
            color: "#FFFFFF",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>💬</div>
          <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>
            پاسخ سوال خود را پیدا نکردید؟
          </div>
          <div style={{ fontSize: "13px", marginBottom: "20px", opacity: 0.9 }}>
            تیم پشتیبانی ما آماده کمک به شماست
          </div>
          <Link
            href="/profile/support"
            style={{
              display: "inline-block",
              padding: "12px 32px",
              background: "#FFFFFF",
              color: "#3B82F6",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            تماس با پشتیبانی
          </Link>
        </div>
      </div>
    </div>
  );
}
