// Mock data for the application
// This file contains sample data for development and testing

export type TransactionType = "deposit" | "withdraw" | "buy" | "sell" | "fee" | "refund";
export type TransactionStatus = "completed" | "pending" | "failed" | "cancelled" | "processing";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  goldAmount?: number;
  fee: number;
  status: TransactionStatus;
  date: string;
  trackingId: string;
  description: string;
  bankName?: string;
  paymentMethod?: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "buy",
    amount: 15000000,
    goldAmount: 1.2,
    fee: 150000,
    status: "completed",
    date: "1404/10/25 - 14:30",
    trackingId: "454th9t5-g5g5g5g",
    description: "خرید طلا",
    paymentMethod: "کیف پول"
  },
  {
    id: "2",
    type: "deposit",
    amount: 10000000,
    fee: 1200,
    status: "completed",
    date: "1404/10/24 - 10:15",
    trackingId: "343def4r-343434",
    description: "واریز به کیف پول",
    bankName: "بانک سامان",
    paymentMethod: "درگاه بانکی"
  },
  {
    id: "3",
    type: "sell",
    amount: 8500000,
    goldAmount: 0.5,
    fee: 85000,
    status: "completed",
    date: "1404/10/23 - 16:45",
    trackingId: "abc123-def456",
    description: "فروش طلا",
    paymentMethod: "کیف پول"
  },
  {
    id: "4",
    type: "withdraw",
    amount: 5000000,
    fee: 50000,
    status: "pending",
    date: "1404/10/22 - 09:20",
    trackingId: "xyz789-uvw012",
    description: "برداشت از کیف پول",
    bankName: "بانک ملت"
  },
  {
    id: "5",
    type: "buy",
    amount: 20000000,
    goldAmount: 1.5,
    fee: 200000,
    status: "completed",
    date: "1404/10/20 - 11:30",
    trackingId: "ghi345-jkl678",
    description: "خرید طلا",
    paymentMethod: "کیف پول"
  },
  {
    id: "6",
    type: "deposit",
    amount: 30000000,
    fee: 3000,
    status: "failed",
    date: "1404/10/19 - 13:00",
    trackingId: "mno901-pqr234",
    description: "واریز به کیف پول",
    bankName: "بانک پاسارگاد",
    paymentMethod: "درگاه بانکی"
  },
  {
    id: "7",
    type: "fee",
    amount: 50000,
    fee: 0,
    status: "completed",
    date: "1404/10/18 - 15:20",
    trackingId: "stu567-vwx890",
    description: "کارمزد تراکنش"
  },
  {
    id: "8",
    type: "buy",
    amount: 12000000,
    goldAmount: 0.9,
    fee: 120000,
    status: "completed",
    date: "1404/10/17 - 10:10",
    trackingId: "yza123-bcd456",
    description: "خرید طلا",
    paymentMethod: "کیف پول"
  },
  {
    id: "9",
    type: "refund",
    amount: 2000000,
    fee: 0,
    status: "completed",
    date: "1404/10/16 - 12:45",
    trackingId: "efg789-hij012",
    description: "بازگشت وجه"
  },
  {
    id: "10",
    type: "sell",
    amount: 18000000,
    goldAmount: 1.3,
    fee: 180000,
    status: "completed",
    date: "1404/10/15 - 14:50",
    trackingId: "klm345-nop678",
    description: "فروش طلا",
    paymentMethod: "کیف پول"
  }
];

// Generate more transactions for pagination testing
export const generateMockTransactions = (count: number = 50): Transaction[] => {
  const types: TransactionType[] = ["deposit", "withdraw", "buy", "sell", "fee", "refund"];
  const statuses: TransactionStatus[] = ["completed", "pending", "failed", "cancelled", "processing"];
  const banks = ["بانک سامان", "بانک ملت", "بانک پاسارگاد", "بانک ملی", "بانک تجارت"];

  const transactions: Transaction[] = [];

  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const amount = Math.floor(Math.random() * 50000000) + 1000000;

    transactions.push({
      id: `txn-${i + 1}`,
      type,
      amount,
      goldAmount: ["buy", "sell"].includes(type) ? parseFloat((amount / 13459000).toFixed(2)) : undefined,
      fee: Math.floor(amount * 0.01),
      status,
      date: `1404/10/${String(Math.floor(Math.random() * 30) + 1).padStart(2, '0')} - ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      trackingId: `${Math.random().toString(36).substring(7)}-${Math.random().toString(36).substring(7)}`,
      description: type === "buy" ? "خرید طلا" :
                   type === "sell" ? "فروش طلا" :
                   type === "deposit" ? "واریز به کیف پول" :
                   type === "withdraw" ? "برداشت از کیف پول" :
                   type === "fee" ? "کارمزد تراکنش" : "بازگشت وجه",
      bankName: ["deposit", "withdraw"].includes(type) ? banks[Math.floor(Math.random() * banks.length)] : undefined,
      paymentMethod: ["buy", "sell"].includes(type) ? "کیف پول" :
                     ["deposit"].includes(type) ? "درگاه بانکی" : undefined
    });
  }

  return transactions;
};

export interface Order {
  id: string;
  type: "buy" | "sell" | "installment" | "physical_receipt" | "savings";
  amount: number;
  goldAmount: number;
  status: "completed" | "pending" | "cancelled" | "processing";
  date: string;
  description: string;
}

export const mockOrders: Order[] = [
  {
    id: "ord-1",
    type: "buy",
    amount: 15000000,
    goldAmount: 1.2,
    status: "completed",
    date: "1404/10/25 - 14:30",
    description: "خرید طلای آبشده"
  },
  {
    id: "ord-2",
    type: "installment",
    amount: 20000000,
    goldAmount: 1.5,
    status: "processing",
    date: "1404/10/20 - 10:00",
    description: "خرید قسطی 4 ماهه"
  },
  {
    id: "ord-3",
    type: "physical_receipt",
    amount: 0,
    goldAmount: 10,
    status: "pending",
    date: "1404/10/18 - 11:20",
    description: "درخواست تحویل فیزیکی"
  },
  {
    id: "ord-4",
    type: "sell",
    amount: 8500000,
    goldAmount: 0.5,
    status: "completed",
    date: "1404/10/15 - 16:45",
    description: "فروش طلای آبشده"
  },
  {
    id: "ord-5",
    type: "savings",
    amount: 5000000,
    goldAmount: 0.3,
    status: "completed",
    date: "1404/10/12 - 09:30",
    description: "افزایش پس‌انداز"
  }
];

export interface Message {
  id: string;
  title: string;
  body: string;
  date: string;
  isRead: boolean;
  type: "system" | "transaction" | "kyc" | "announcement";
}

export const mockMessages: Message[] = [
  {
    id: "msg-1",
    title: "خوش آمدید به طلابین",
    body: "از اینکه طلابین را برای معاملات طلای خود انتخاب کردید متشکریم. برای دسترسی به تمام امکانات، لطفا احراز هویت خود را تکمیل کنید.",
    date: "1404/10/25 - 10:00",
    isRead: false,
    type: "system"
  },
  {
    id: "msg-2",
    title: "خرید طلا با موفقیت انجام شد",
    body: "خرید 1.2 گرم طلا به مبلغ 15,000,000 تومان با موفقیت انجام شد. کد پیگیری: 454th9t5-g5g5g5g",
    date: "1404/10/24 - 14:30",
    isRead: false,
    type: "transaction"
  },
  {
    id: "msg-3",
    title: "احراز هویت شما در انتظار بررسی است",
    body: "مدارک احراز هویت شما دریافت شد و در حال بررسی است. نتیجه تا 24 ساعت آینده اعلام خواهد شد.",
    date: "1404/10/23 - 16:00",
    isRead: true,
    type: "kyc"
  },
  {
    id: "msg-4",
    title: "اعلان سیستمی",
    body: "به اطلاع می‌رساند که امکان خرید قسطی طلا با شرایط ویژه اضافه شده است.",
    date: "1404/10/22 - 09:00",
    isRead: true,
    type: "announcement"
  },
  {
    id: "msg-5",
    title: "واریز به کیف پول",
    body: "مبلغ 10,000,000 تومان با موفقیت به کیف پول شما واریز شد.",
    date: "1404/10/21 - 11:15",
    isRead: true,
    type: "transaction"
  }
];

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const mockFAQs: FAQ[] = [
  {
    id: "faq-1",
    category: "شروع به کار",
    question: "چگونه می‌توانم در طلابین ثبت‌نام کنم؟",
    answer: "برای ثبت‌نام در طلابین کافی است روی دکمه ثبت‌نام کلیک کرده و شماره موبایل خود را وارد کنید. سپس کد تایید ارسال شده را وارد کنید و رمز عبور خود را تعیین کنید."
  },
  {
    id: "faq-2",
    category: "شروع به کار",
    question: "احراز هویت چیست و چرا لازم است؟",
    answer: "احراز هویت فرآیندی است که در آن هویت شما با ارائه مدارک شناسایی تایید می‌شود. این کار برای امنیت حساب شما و جلوگیری از سوء استفاده الزامی است."
  },
  {
    id: "faq-3",
    category: "خرید و فروش طلا",
    question: "چگونه می‌توانم طلا بخرم؟",
    answer: "پس از شارژ کیف پول، از منوی خرید/فروش مقدار دلخواه را وارد کرده و خرید خود را تایید کنید. طلای خریداری شده بلافاصله به حساب شما اضافه می‌شود."
  },
  {
    id: "faq-4",
    category: "خرید و فروش طلا",
    question: "کارمزد خرید و فروش چقدر است؟",
    answer: "کارمزد خرید و فروش طلا 0.5% از مبلغ معامله است که به صورت شفاف قبل از تایید به شما نمایش داده می‌شود."
  },
  {
    id: "faq-5",
    category: "کیف پول و پرداخت",
    question: "چگونه می‌توانم کیف پول خود را شارژ کنم؟",
    answer: "از بخش کیف پول، گزینه واریز را انتخاب کرده و مبلغ دلخواه را وارد کنید. سپس از طریق درگاه بانکی پرداخت خود را انجام دهید."
  },
  {
    id: "faq-6",
    category: "کیف پول و پرداخت",
    question: "حداقل و حداکثر مبلغ واریز چقدر است؟",
    answer: "حداقل مبلغ واریز 100,000 تومان و حداکثر آن 100,000,000 تومان است."
  },
  {
    id: "faq-7",
    category: "خرید قسطی",
    question: "شرایط خرید قسطی چیست؟",
    answer: "برای خرید قسطی باید احراز هویت خود را تکمیل کرده باشید. می‌توانید با نرخ سود 23% سالانه و تا 4 قسط طلا خریداری کنید."
  },
  {
    id: "faq-8",
    category: "پس‌انداز",
    question: "پس‌انداز طلا چگونه کار می‌کند؟",
    answer: "شما می‌توانید به صورت دوره‌ای (هفتگی یا ماهانه) مبلغ مشخصی را به حساب پس‌انداز طلای خود اضافه کنید. این طلا در حساب جداگانه‌ای نگهداری می‌شود."
  },
  {
    id: "faq-9",
    category: "طلای فیزیکی",
    question: "چگونه می‌توانم طلای فیزیکی دریافت کنم؟",
    answer: "از بخش دریافت فیزیکی، مقدار دلخواه را انتخاب کرده و درخواست ثبت کنید. پس از تایید، می‌توانید به شعبه طلابین مراجعه کنید."
  },
  {
    id: "faq-10",
    category: "امنیت",
    question: "امنیت حساب من چگونه تامین می‌شود؟",
    answer: "ما از رمزنگاری پیشرفته، احراز هویت دو مرحله‌ای و استانداردهای بانکی برای محافظت از اطلاعات و دارایی شما استفاده می‌کنیم."
  }
];
