import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Trade Demo Section */}
      <Section
        id="trade-demo"
        style={{ background: "#FFFDF8", padding: "32px 0 40px" }}
      >
        <div
          className="card"
          style={{
            maxWidth: "520px",
            margin: "0 auto",
            padding: 0,
            overflow: "hidden",
          }}
        >
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <button
              className="btn"
              style={{
                flex: 1,
                padding: "14px 0",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                background: "var(--color-primary)",
                color: "var(--color-dark)",
                borderRadius: 0,
                border: "none",
              }}
            >
              خرید
            </button>
            <button
              className="btn"
              style={{
                flex: 1,
                padding: "14px 0",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                background: "var(--color-bg)",
                borderRadius: 0,
                border: "none",
              }}
            >
              فروش
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: "18px 16px 22px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px",
                marginBottom: "16px",
                color: "rgba(28,28,28,0.75)",
              }}
            >
              <span>قیمت لحظه‌ای طلا:</span>
              <strong>۲,۹۹۰,۰۰۰ تومان</strong>
            </div>

            <div className="form-group">
              <label className="form-label">مقدار (به تومان)</label>
              <input
                type="number"
                className="form-input"
                placeholder="مثلاً 200000"
                min="100000"
                step="1000"
              />
              <small className="form-hint">حداقل مبلغ نمایشی: ۱۰۰,۰۰۰ تومان</small>
            </div>

            <div
              style={{
                marginTop: "14px",
                borderRadius: "var(--radius-md)",
                background: "var(--color-soft)",
                padding: "10px 12px",
                fontSize: "12px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span>کارمزد (۰٫۵٪)</span>
                <span>نمایشی</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>مقدار تقریبی طلا</span>
                <span>نمایشی</span>
              </div>
            </div>

            <Button variant="success" fullWidth style={{ marginTop: "18px" }}>
              خرید طلا (ورود به ثبت‌نام)
            </Button>

            <p style={{ marginTop: "10px", fontSize: "11px", color: "rgba(28,28,28,0.55)", textAlign: "center" }}>
              برای معامله واقعی ابتدا باید ثبت‌نام و احراز هویت انجام شود.
            </p>
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section id="why">
        <Section.Header>
          <div>
            <Section.Title>چرا طلابین</Section.Title>
            <Section.Subtitle>
              طلای واقعی، رابط کاربری ساده و کارمزد شفاف برای همه‌ی سطوح تجربه.
            </Section.Subtitle>
          </div>
        </Section.Header>

        <div className="grid grid-3">
          <Card>
            <Card.Body>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "26px",
                    height: "26px",
                    borderRadius: "999px",
                    background: "rgba(255, 200, 87, 0.2)",
                    fontSize: "14px",
                    marginLeft: "6px",
                  }}
                >
                  💰
                </span>
                شروع از ۱۰۰ هزار تومان
              </div>
              <p style={{ fontSize: "13px", margin: 0 }}>
                لازم نیست سرمایه‌ بزرگی داشته باشی. از مبالغ کم شروع کن و کم‌کم سبد
                طلای خودت را بساز.
              </p>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "26px",
                    height: "26px",
                    borderRadius: "999px",
                    background: "rgba(255, 200, 87, 0.2)",
                    fontSize: "14px",
                    marginLeft: "6px",
                  }}
                >
                  🏦
                </span>
                پشتوانه در خزانه بانک کارگشایی
              </div>
              <p style={{ fontSize: "13px", margin: 0 }}>
                طلای خریداری‌شده واقعاً وجود دارد و در خزانه بانکی نگهداری و بیمه
                می‌شود؛ گزارش‌گیری شفاف و قابل پیگیری.
              </p>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "26px",
                    height: "26px",
                    borderRadius: "999px",
                    background: "rgba(255, 200, 87, 0.2)",
                    fontSize: "14px",
                    marginLeft: "6px",
                  }}
                >
                  📱
                </span>
                اپلیکیشن مخصوص سرمایه‌گذاران و تازه‌کارها
              </div>
              <p style={{ fontSize: "13px", margin: 0 }}>
                رابط کاربری ساده برای افراد تازه‌کار و ابزارهای حرفه‌ای‌تر برای
                کسانی که بازار را جدی دنبال می‌کنند.
              </p>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "26px",
                    height: "26px",
                    borderRadius: "999px",
                    background: "rgba(255, 200, 87, 0.2)",
                    fontSize: "14px",
                    marginLeft: "6px",
                  }}
                >
                  ✅
                </span>
                اینماد و مجوز فروش طلای آب‌شده
              </div>
              <p style={{ fontSize: "13px", margin: 0 }}>
                طلابین دارای نماد اعتماد الکترونیکی و پروانه کسب معتبر برای فروش
                طلای آب‌شده است تا با خیال راحت معامله کنی.
              </p>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "26px",
                    height: "26px",
                    borderRadius: "999px",
                    background: "rgba(255, 200, 87, 0.2)",
                    fontSize: "14px",
                    marginLeft: "6px",
                  }}
                >
                  ⚖️
                </span>
                کارمزد شفاف ۰٫۵٪
              </div>
              <p style={{ fontSize: "13px", margin: 0 }}>
                کارمزد ثابت و مشخص؛ بدون هزینه‌های پنهان. پیش از معامله، کارمزد دقیق
                به تو نمایش داده می‌شود.
              </p>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "26px",
                    height: "26px",
                    borderRadius: "999px",
                    background: "rgba(255, 200, 87, 0.2)",
                    fontSize: "14px",
                    marginLeft: "6px",
                  }}
                >
                  🔐
                </span>
                امنیت و نگهداری امن دارایی
              </div>
              <p style={{ fontSize: "13px", margin: 0 }}>
                زیرساخت امن، احراز هویت چندمرحله‌ای و استانداردهای امنیتی به‌روز
                برای محافظت از حساب و دارایی‌ات.
              </p>
            </Card.Body>
          </Card>
        </div>
      </Section>

      {/* How it Works */}
      <Section id="how-it-works">
        <Section.Header>
          <div>
            <Section.Title>طلابین چطور کار می‌کند؟</Section.Title>
            <Section.Subtitle>
              چهار قدم ساده، از ثبت‌نام تا دریافت فیزیکی طلا.
            </Section.Subtitle>
          </div>
        </Section.Header>

        <div className="grid grid-4" style={{ counterReset: "step" }}>
          {[
            {
              title: "ثبت‌نام و احراز هویت",
              desc: "در کمتر از چند دقیقه حساب کاربری بساز و مراحل احراز هویت آنلاین را تکمیل کن.",
              icon: "Rectangle 1073-006.png",
            },
            {
              title: "واریز تومان",
              desc: "با کارت بانکی‌ات حساب را شارژ کن تا آماده خرید طلای دیجیتال شوی.",
              icon: "Rectangle 1076-007.png",
            },
            {
              title: "خرید طلای دیجیتال",
              desc: "مقدار دلخواه طلا را با کارمزد ۰٫۵٪ و قیمت لحظه‌ای بخرد؛ هر ساعت شبانه‌روز.",
              icon: "Rectangle 2-011.png",
            },
            {
              title: "فروش یا دریافت فیزیکی",
              desc: "هر زمان خواستی می‌توانی طلای خودت را بفروشی یا درخواست دریافت فیزیکی ثبت کنی.",
              icon: "Rectangle 974-012.png",
            },
          ].map((step, idx) => (
            <Card
              key={idx}
              style={{
                position: "relative",
                counterIncrement: "step",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "14px",
                  width: "24px",
                  height: "24px",
                  borderRadius: "999px",
                  background: "var(--color-soft)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(0,0,0,0.6)",
                }}
              >
                {idx + 1}
              </div>
              <Card.Body style={{ paddingTop: "16px" }}>
                {/* Icon */}
                <div
                  style={{
                    position: "relative",
                    width: "48px",
                    height: "48px",
                    marginBottom: "12px",
                  }}
                >
                  <Image
                    src={`/assets/illustrations/${step.icon}`}
                    alt=""
                    width={48}
                    height={48}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "5px" }}>
                  {step.title}
                </div>
                <p style={{ fontSize: "13px", margin: 0 }}>{step.desc}</p>
              </Card.Body>
            </Card>
          ))}
        </div>

        <div
          style={{
            marginTop: "20px",
            background: "var(--color-dark)",
            color: "#FFFFFF",
            borderRadius: "var(--radius-lg)",
            padding: "16px 16px 18px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <div>
            <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>
              آماده‌ای اولین گرم طلای دیجیتال خودت را بخری؟
            </div>
            <div style={{ fontSize: "12px", opacity: 0.8 }}>
              همین حالا ثبت‌نام کن و از ۱۰۰ هزار تومان شروع کن.
            </div>
          </div>
          <Button variant="primary">ثبت‌نام و شروع</Button>
        </div>
      </Section>

      {/* App Section */}
      <Section id="app">
        <div
          style={{
            background: "var(--color-dark)",
            color: "#FFFFFF",
            borderRadius: "var(--radius-xl)",
            padding: "24px 20px",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
            gap: "24px",
            alignItems: "center",
            boxShadow: "var(--shadow-soft)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background decorative images */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "200px",
              height: "200px",
              opacity: 0.05,
              zIndex: 0,
            }}
          >
            <Image
              src="/assets/illustrations/Rectangle 975-010.png"
              alt=""
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontSize: "20px", fontWeight: 600, margin: "0 0 8px" }}>
              اپلیکیشن طلابین
            </h2>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", margin: "0 0 16px", lineHeight: 1.8 }}>
              تجربه معامله طلا در موبایل؛ قیمت‌های لحظه‌ای، اعلان‌های هوشمند و مدیریت
              آسان سبد سرمایه‌گذاری.
            </p>

            {/* App preview images grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              {[
                "IMG_7814 1-008.png",
                "IMG_7813 1-009.png",
                "IMG_7855 1-013.png",
              ].map((img, idx) => (
                <div
                  key={idx}
                  style={{
                    position: "relative",
                    aspectRatio: "3/4",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "2px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.05)",
                  }}
                >
                  <Image
                    src={`/assets/illustrations/${img}`}
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              <a
                href="#"
                style={{
                  borderRadius: "999px",
                  padding: "10px 16px",
                  border: "1px solid rgba(255,255,255,0.4)",
                  fontSize: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s",
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                <span>📱</span>
                <span>دانلود نسخه اندروید</span>
              </a>
              <a
                href="#"
                style={{
                  borderRadius: "999px",
                  padding: "10px 16px",
                  border: "1px solid rgba(255,255,255,0.4)",
                  fontSize: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s",
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                <span>🍎</span>
                <span>دانلود نسخه iOS</span>
              </a>
            </div>
          </div>

          <div
            style={{
              borderRadius: "18px",
              border: "1px dashed rgba(255,255,255,0.25)",
              padding: "16px 14px",
              fontSize: "12px",
              lineHeight: 1.9,
              background: "rgba(255,255,255,0.05)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: "10px", fontSize: "13px" }}>
              ویژگی‌های اپلیکیشن:
            </div>
            <ul style={{ paddingRight: "20px", margin: 0, listStyleType: "disc" }}>
              <li>نمایش قیمت لحظه‌ای طلا</li>
              <li>سوابق خرید و فروش و کارمزد</li>
              <li>نمودار عملکرد سبد تو در طول زمان</li>
              <li>اعلان هنگام رسیدن قیمت به حد دلخواه</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Blog Section */}
      <Section id="blog">
        <Section.Header>
          <div>
            <Section.Title>آخرین مطالب بلاگ</Section.Title>
            <Section.Subtitle>
              یاد بگیر چطور هوشمندانه در طلا سرمایه‌گذاری کنی.
            </Section.Subtitle>
          </div>
          <Button variant="ghost" size="sm">
            مشاهده همه مقالات
          </Button>
        </Section.Header>

        <div className="grid grid-3">
          {[
            {
              chip: "آموزش پایه",
              title: "چطور طلای دیجیتال بخریم؟",
              excerpt:
                "قدم به قدم از ساخت حساب کاربری تا اولین خرید، بدون اصطلاحات پیچیده و مناسب برای تازه‌کارها.",
              time: "۵ دقیقه",
            },
            {
              chip: "تحلیل بازار",
              title: "مزایای خرید طلای آنلاین نسبت به فیزیکی",
              excerpt:
                "مقایسه ریسک‌ها، کارمزدها، نگهداری و نقدشوندگی بین طلای فیزیکی و طلای دیجیتال در طلابین.",
              time: "۷ دقیقه",
            },
            {
              chip: "امنیت و قانون",
              title: "چطور دارایی‌ام در طلابین امن می‌ماند؟",
              excerpt:
                "نگاهی به پشت‌صحنه: نحوه نگهداری طلا در خزانه بانک کارگشایی، بیمه، گزارش‌دهی شفاف و مجوزهای قانونی پلتفرم.",
              time: "۶ دقیقه",
            },
          ].map((blog, idx) => (
            <Card key={idx} style={{ cursor: "pointer" }}>
              <Card.Body>
                <div style={{ fontSize: "11px", color: "rgba(28, 28, 28, 0.55)" }}>
                  {blog.chip}
                </div>
                <h3 style={{ fontSize: "15px", fontWeight: 600, margin: "6px 0" }}>
                  {blog.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "rgba(28, 28, 28, 0.75)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {blog.excerpt}
                </p>
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "11px",
                    color: "rgba(28, 28, 28, 0.55)",
                  }}
                >
                  زمان مطالعه: {blog.time}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section id="faq">
        <Section.Header>
          <div>
            <Section.Title>سؤالات متداول</Section.Title>
            <Section.Subtitle>
              سؤالی داری؟ احتمالاً جوابش اینجاست.
            </Section.Subtitle>
          </div>
        </Section.Header>

        <div style={{ display: "grid", gap: "8px" }}>
          {[
            {
              q: "آیا طلای خریداری‌شده در طلابین واقعی است؟",
              a: 'بله. هر واحد طلای دیجیتال در طلابین توسط طلای واقعی در خزانه <strong>بانک کارگشایی</strong> پشتیبانی می‌شود و موجودی به‌صورت دوره‌ای کنترل و گزارش می‌شود.',
            },
            {
              q: "آیا امکان دریافت فیزیکی طلا وجود دارد؟",
              a: "بله. می‌توانی هر زمان که خواستی درخواست دریافت فیزیکی ثبت کنی تا طلای تو طبق قوانین و حداقل وزن تحویل، به‌صورت حضوری تحویل داده شود.",
            },
            {
              q: "حداقل مبلغ خرید در طلابین چقدر است؟",
              a: 'حداقل خرید در طلابین فقط <strong>۱۰۰ هزار تومان</strong> است تا هر کسی با هر سطح سرمایه بتواند وارد بازار طلا شود.',
            },
            {
              q: "کارمزد معاملات در طلابین چقدر است؟",
              a: 'کارمزد خرید و فروش در طلابین <strong>۰٫۵٪</strong> است و قبل از نهایی‌شدن معامله، مبلغ کارمزد به‌طور شفاف به تو نمایش داده می‌شود.',
            },
            {
              q: "طلابین چه مجوزهایی دارد؟",
              a: 'طلابین دارای <strong>نماد اعتماد الکترونیکی (اینماد)</strong> و <strong>پروانه کسب فروش طلای آب‌شده</strong> است و زیر نظر مراجع مربوطه فعالیت می‌کند.',
            },
          ].map((faq, idx) => (
            <details key={idx} className="card" style={{ fontSize: "13px" }}>
              <summary style={{ cursor: "pointer", listStyle: "none", outline: "none" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{faq.q}</span>
                  <span style={{ fontSize: "16px", opacity: 0.5 }}>+</span>
                </div>
              </summary>
              <p
                style={{
                  margin: "8px 0 0",
                  color: "rgba(28,28,28,0.75)",
                  lineHeight: 1.8,
                }}
                dangerouslySetInnerHTML={{ __html: faq.a }}
              />
            </details>
          ))}
        </div>

        <div
          style={{
            marginTop: "16px",
            background: "var(--color-dark)",
            color: "#FFFFFF",
            borderRadius: "var(--radius-lg)",
            padding: "16px 16px 18px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <div>
            <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>
              سؤال دیگه‌ای داری؟
            </div>
            <div style={{ fontSize: "12px", opacity: 0.8 }}>
              از طریق پشتیبانی ۲۴ ساعته با ما در ارتباط باش یا همین حالا ثبت‌نام کن.
            </div>
          </div>
          <Button variant="primary">شروع سرمایه‌گذاری</Button>
        </div>
      </Section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
