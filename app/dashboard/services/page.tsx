"use client";

import Link from "next/link";
import styles from "./styles.module.css";



// icon map for services (use available 3D illustration assets)
const ICONS: Record<string, string> = {
  installment: 'illustrations/IMG_7814 1-008.png',
  'physical-receipt': 'illustrations/IMG_7813 1-009.png',
  savings: 'illustrations/IMG_7812 1-005.png',
  'physical-charge': 'illustrations/IMG_7818 2-003.png',
  gift: 'illustrations/Rectangle 975-010.png',
};

// recreate services array after ICONS mapping in case used in iterating below
const _services = [
  {
    id: 'installment',
    title: 'خرید قسطی طلا',
    description: 'خرید طلا به صورت اقساطی',
    href: '/dashboard/installment',
    color: '#FDB022',
  },
  {
    id: 'physical-receipt',
    title: 'دریافت فیزیکی طلا',
    description: 'تحویل طلای فیزیکی',
    href: '/dashboard/physical-receipt',
    color: '#10B981',
  },
  {
    id: 'savings',
    title: 'پس‌انداز طلا',
    description: 'سرمایه‌گذاری و پس‌انداز',
    href: '/dashboard/savings',
    color: '#3B82F6',
  },
  {
    id: 'physical-charge',
    title: 'شارژ فیزیکی',
    description: 'شارژ حساب با طلای فیزیکی',
    href: '/dashboard/physical-charge',
    color: '#8B5CF6',
  },
  {
    id: 'gift',
    title: 'کارت هدیه',
    description: 'ارسال هدیه به دیگران',
    href: '/dashboard/gift',
    color: '#EF4444',
    badge: 'بزودی',
    disabled: true,
  },
];

export default function ServicesPage() {
  return (
    <div className={styles.wrapper}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles['hero-left']}>
          {/* hero artwork from uploaded assets */}
          <img src="/assets/illustrations/Rectangle 975-010.png" alt="hero" />
        </div>
        <div className={styles['hero-content']}>
          <div className={styles['hero-title']}>طلابین</div>
          <div className={styles['hero-sub']}>پلتفرم امن خرید و فروش طلای آب‌شده</div>
        </div>
      </div>

      {/* Section header */}
      <div className={styles.sectionHeader}>
        <h2>خدمات ویژه</h2>
        <p>از خدمات زیر استفاده کنید</p>
      </div>

      {/* Services list */}
      <div className={styles.services}>
        {_services.map((service, idx) => (
          <Link
            key={service.id}
            href={service.disabled ? '#' : service.href}
            style={{ textDecoration: 'none', pointerEvents: service.disabled ? 'none' : 'auto', opacity: service.disabled ? 0.85 : 1 }}
          >
            <div className={styles.serviceCard}>
              {/* illustration floats on the right, overlapping */}
              {!service.disabled && (
                <div className={`${styles.illustration} ${idx === 0 ? styles.firstIcon : ''} ${idx === 3 ? styles.lastIcon : ''}`}>
                  <img src={ICONS[service.id] ? `/assets/${ICONS[service.id]}` : '/assets/receipt-item.svg'} alt={service.title} onError={(e)=>{(e.target as HTMLImageElement).src='/assets/receipt-item.svg'}} />
                </div>
              )}

              {/* content */}
              <div className={styles['content-wrap']}>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.desc}>{service.description}</p>
              </div>

              {/* left circular arrow */}
              <div className={styles.arrowCircle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {service.disabled && <div className={styles.soonBadge}>بزودی</div>}
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom navbar (Figma) */}
      <div className={styles.navbar}>
        <div className={styles.frame}>
          <div className={`${styles.item}`}>
            <img className={styles.icon} src="/assets/wallet.svg" alt="" />
            کیف‌پول
          </div>
          <div className={`${styles.item}`}>
            <img className={styles.icon} src="/assets/diagram.svg" alt="" />
            خرید‌آسان
          </div>
          <div className={`${styles.item} ${styles.active}`}>
            <img className={styles.icon} src="/assets/medal-star.svg" alt="" />
            خدمات
          </div>
          <div className={`${styles.item}`}>
            <img className={styles.icon} src="/assets/lock.svg" alt="" />
            خانه
          </div>
        </div>
      </div>
    </div>
  );
}
