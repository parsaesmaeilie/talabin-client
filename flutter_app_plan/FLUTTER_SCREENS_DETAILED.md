# Talabin Mobile - Detailed Screen Specifications

## Overview
This document provides detailed specifications for each screen in the Talabin mobile application, including UI components, user interactions, and data requirements.

---

## 1. Splash Screen

### Purpose
Initial screen shown while app is loading

### Duration
2-3 seconds

### UI Elements
- App logo (centered)
- App name "طلابین" in Persian
- Loading animation (circular progress indicator in gold color)
- App version number (bottom)

### Logic
1. Show splash screen
2. Check if user is logged in (check stored tokens)
3. If logged in and token valid → Dashboard
4. If logged in but token expired → Login
5. If first launch → Onboarding
6. If not logged in → Login

### Design
```
┌─────────────────────┐
│                     │
│                     │
│      [Logo]         │
│                     │
│      طلابین         │
│                     │
│   [Loading...]      │
│                     │
│                     │
│   v1.0.0            │
└─────────────────────┘
```

---

## 2. Onboarding Screens (3-4 slides)

### Purpose
Introduce app features to first-time users

### Slide 1: Welcome
- **Title**: "به طلابین خوش آمدید"
- **Description**: "بهترین پلتفرم خرید و فروش طلای دیجیتال"
- **Image**: Gold bars or app logo
- **Button**: "بعدی"

### Slide 2: Real-time Prices
- **Title**: "قیمت‌های لحظه‌ای طلا"
- **Description**: "پیگیری قیمت طلا در هر لحظه"
- **Image**: Price chart illustration
- **Buttons**: "قبلی" | "بعدی"

### Slide 3: Easy Trading
- **Title**: "خرید و فروش آسان"
- **Description**: "با چند کلیک ساده طلا بخرید یا بفروشید"
- **Image**: Trading illustration
- **Buttons**: "قبلی" | "بعدی"

### Slide 4: Secure Wallet
- **Title**: "کیف پول امن"
- **Description**: "مدیریت موجودی طلا و تومان شما"
- **Image**: Wallet illustration
- **Buttons**: "قبلی" | "شروع"

### Features
- Swipeable slides
- Skip button (top-right)
- Dot indicators showing current slide
- RTL support

---

## 3. Login Screen

### UI Elements
1. **App Logo** (top, centered)
2. **Welcome Text**: "ورود به طلابین"
3. **Phone Number Input**
   - Label: "شماره موبایل"
   - Format: +98 9XX XXX XXXX
   - Input type: Phone number
   - Validation: Must be valid Iranian mobile number
4. **Login Button**: "ارسال کد تایید"
5. **Register Link**: "حساب کاربری ندارید؟ ثبت‌نام"

### User Flow
1. User enters phone number
2. App validates format
3. User taps "Send OTP"
4. App calls `POST /auth/send-otp/`
5. Navigate to OTP verification screen

### Validation
- Phone number must be 11 digits
- Must start with 09
- Show error message if invalid

### Error Handling
- Network error: "خطا در اتصال به سرور"
- Invalid phone: "شماره موبایل نامعتبر است"
- Too many attempts: "تعداد درخواست‌ها بیش از حد مجاز است"

### Design
```
┌─────────────────────────┐
│      [Logo]             │
│                         │
│   ورود به طلابین        │
│                         │
│   ┌─────────────────┐   │
│   │ شماره موبایل    │   │
│   │ +98 9XX XXX XXX │   │
│   └─────────────────┘   │
│                         │
│   [ ارسال کد تایید ]   │
│                         │
│   حساب کاربری ندارید؟  │
│        ثبت‌نام          │
└─────────────────────────┘
```

---

## 4. OTP Verification Screen

### UI Elements
1. **Back Button** (top-left)
2. **Title**: "کد تایید را وارد کنید"
3. **Description**: "کد ۶ رقمی به شماره +98 912 XXX XXXX ارسال شد"
4. **OTP Input**: 6 separate boxes for each digit
5. **Verify Button**: "تایید"
6. **Resend Timer**: "ارسال مجدد کد (XX ثانیه)"
7. **Resend Button**: Enabled after timer expires

### User Flow
1. User enters 6-digit OTP
2. App automatically verifies when all 6 digits entered
3. On success → Dashboard
4. On error → Show error message

### Features
- Auto-focus next input box
- Auto-submit when complete
- Countdown timer (60 seconds)
- Resend OTP option

### Validation
- Must be exactly 6 digits
- Numeric only

### Error Handling
- Invalid OTP: "کد تایید نامعتبر است"
- Expired OTP: "کد تایید منقضی شده است"
- Too many attempts: "تلاش‌های زیادی انجام شده. لطفا بعدا تلاش کنید"

### Design
```
┌─────────────────────────┐
│ <  کد تایید را وارد کنید│
│                         │
│ کد ۶ رقمی به شماره     │
│ +98 912 XXX XXXX ارسال │
│         شد              │
│                         │
│ [_] [_] [_] [_] [_] [_] │
│                         │
│     [  تایید  ]        │
│                         │
│ ارسال مجدد کد (45 ثانیه)│
└─────────────────────────┘
```

---

## 5. Dashboard (Home Screen)

### Top Section
1. **App Bar**
   - App logo (left)
   - Notification bell icon (right)
   - User avatar (right)

2. **Greeting**: "سلام، [نام کاربر]"

3. **Gold Price Card** (Large, prominent)
   - Current buy price (large number)
   - Current sell price
   - 24h change (+/- percentage with color)
   - Mini chart (sparkline)
   - Last update time
   - Refresh button

### Middle Section
4. **Wallet Summary Cards** (2 cards side-by-side)
   - **Toman Card**
     - Icon (currency symbol)
     - "موجودی تومان"
     - Amount: "5,000,000 تومان"
     - Deposit button

   - **Gold Card**
     - Icon (gold icon)
     - "موجودی طلا"
     - Amount: "1.500 گرم"
     - Value in Toman

5. **Quick Actions** (2 large buttons)
   - Buy Gold button (green, prominent)
   - Sell Gold button (red, prominent)

### Bottom Section
6. **Recent Transactions**
   - Section header: "آخرین تراکنش‌ها"
   - See all button
   - List of 3-5 recent transactions
   - Each item shows:
     - Transaction type icon
     - Description
     - Amount
     - Date/time
     - Status

7. **Bottom Navigation Bar**
   - Dashboard (Home icon - active)
   - Wallet (Wallet icon)
   - Trading (Exchange icon)
   - History (List icon)
   - Profile (Person icon)

### User Interactions
- Pull to refresh for price updates
- Tap price card → Price history screen
- Tap wallet cards → Wallet screen
- Tap Buy/Sell → Trading screen
- Tap transaction → Transaction detail

### Data Requirements
- Current gold price (`GET /prices/gold/current/`)
- Wallet balance (`GET /wallet/balance/`)
- Recent transactions (`GET /wallet/transactions/?page_size=5`)

### Auto-refresh
- Gold price: Every 30 seconds
- Wallet balance: On screen focus
- Transactions: On screen focus

---

## 6. Wallet Screen

### UI Elements
1. **App Bar**: "کیف پول"

2. **Total Balance Card**
   - "کل دارایی"
   - Total value in Toman (large)
   - Breakdown:
     - Toman: X,XXX,XXX
     - Gold: X.XXX گرم (worth Y,YYY,YYY تومان)

3. **Action Buttons** (3 buttons in row)
   - Deposit (icon + text)
   - Withdraw (icon + text)
   - Transfer (icon + text) [Optional]

4. **Tabs**
   - All Transactions
   - Deposits
   - Withdrawals
   - Trades

5. **Transaction List**
   - Infinite scroll
   - Each item shows:
     - Type icon (colored)
     - Description
     - Amount (colored: green for + , red for -)
     - Date
     - Status badge
   - Pull to refresh
   - Empty state if no transactions

6. **Filter & Sort Options**
   - Date range picker
   - Type filter
   - Sort by date/amount

### User Actions
- Tap Deposit → Deposit screen
- Tap Withdraw → Withdraw screen
- Tap transaction → Transaction detail modal
- Pull to refresh
- Infinite scroll for more transactions

### Data Requirements
- Wallet balance (`GET /wallet/balance/`)
- Transactions (`GET /wallet/transactions/`)

---

## 7. Deposit Screen

### UI Elements
1. **App Bar**: "واریز به کیف پول" with back button

2. **Instructions Card**
   - "اطلاعات حساب طلابین"
   - Bank name
   - Account number
   - IBAN
   - Account holder name
   - Copy button for each field

3. **Amount Input**
   - Label: "مبلغ واریز (تومان)"
   - Input field
   - Minimum amount note
   - Suggested amounts (chips): 500K, 1M, 2M, 5M

4. **Receipt Upload** [Optional]
   - "تصویر رسید واریز"
   - Upload button
   - Preview thumbnail

5. **Description Input** [Optional]
   - "توضیحات (اختیاری)"
   - Multi-line text field

6. **Submit Button**: "ثبت درخواست واریز"

### User Flow
1. User copies account details
2. User makes bank transfer
3. User enters amount
4. User optionally uploads receipt
5. User submits request
6. App calls `POST /wallet/deposit/`
7. Show success message
8. Navigate back to wallet

### Validation
- Amount must be >= minimum (e.g., 100,000 Toman)
- Amount must be numeric

### Success Message
"درخواست واریز شما ثبت شد و پس از تایید به کیف پول شما اضافه می‌شود"

---

## 8. Withdrawal Screen

### UI Elements
1. **App Bar**: "برداشت از کیف پول"

2. **Available Balance**
   - "موجودی قابل برداشت"
   - Amount (large)

3. **Bank Account Selector**
   - Dropdown/List of saved bank accounts
   - "افزودن حساب جدید" button

4. **Amount Input**
   - "مبلغ برداشت (تومان)"
   - Input field
   - Minimum amount note
   - Maximum = available balance
   - Quick select: 25%, 50%, 75%, 100%

5. **Fee Information**
   - "کارمزه: X,XXX تومان"
   - "مبلغ دریافتی: Y,YYY,YYY تومان"

6. **Submit Button**: "ثبت درخواست برداشت"

### User Flow
1. User selects bank account
2. User enters amount
3. System calculates fee
4. User reviews and confirms
5. App calls `POST /wallet/withdraw/`
6. Show success message
7. Navigate back

### Validation
- Must have selected bank account
- Amount >= minimum
- Amount <= available balance
- Sufficient balance after fee

### Success Message
"درخواست برداشت شما ثبت شد و در کمتر از ۲۴ ساعت به حساب شما واریز می‌شود"

---

## 9. Trading Screen

### Tabs
- Buy Gold
- Sell Gold

### Buy Gold Tab

#### UI Elements
1. **Current Price Display**
   - "قیمت خرید"
   - Price per gram (large, highlighted)
   - Last update time

2. **Amount Input**
   - "مقدار طلا (گرم)"
   - Input field
   - Minimum amount note
   - Quick select buttons: 0.1g, 0.5g, 1g, 2g

3. **Price Calculation**
   - "قیمت هر گرم: X,XXX,XXX تومان"
   - "مجموع: Y,YYY,YYY تومان"
   - Fee if applicable

4. **Available Balance**
   - "موجودی تومان: Z,ZZZ,ZZZ"

5. **Buy Button**: "خرید طلا" (Large, green)

#### User Flow
1. User enters gold amount
2. System calculates total price
3. User reviews calculation
4. User taps Buy
5. Confirmation dialog appears
6. User confirms
7. App calls `POST /trading/orders/` with type=BUY
8. Show success/error message

#### Confirmation Dialog
- "خرید X گرم طلا"
- "مبلغ پرداختی: Y,YYY,YYY تومان"
- "تایید" | "انصراف"

#### Validation
- Amount > 0
- Amount >= minimum
- Sufficient Toman balance

### Sell Gold Tab

#### UI Elements
Similar to Buy, but:
1. "قیمت فروش" for current price
2. "مقدار طلا (گرم)" - but max = user's gold balance
3. "دریافتی: X,XXX,XXX تومان"
4. "موجودی طلا: Y.YYY گرم"
5. Sell Button (Red)

#### Validation
- Amount > 0
- Amount <= user's gold balance

---

## 10. Transaction History Screen

### UI Elements
1. **App Bar**: "تاریخچه تراکنش‌ها"

2. **Filters** (Horizontal scroll chips)
   - All
   - Deposits
   - Withdrawals
   - Buy Orders
   - Sell Orders

3. **Date Range Filter**
   - This Week
   - This Month
   - Last 3 Months
   - Custom Range

4. **Transaction List**
   - Grouped by date
   - Each item:
     - Icon (type-specific, colored)
     - Title & description
     - Amount with +/- sign
     - Time
     - Status badge
   - Infinite scroll
   - Pull to refresh

5. **Empty State**
   - Icon
   - "تراکنشی وجود ندارد"
   - Message based on selected filter

### Transaction Detail Modal (Bottom Sheet)
When user taps a transaction:
- Transaction ID
- Type
- Amount
- Status
- Date & time
- Description
- Additional details based on type

---

## 11. Profile Screen

### UI Elements
1. **App Bar**: "پروفیل"

2. **Profile Header**
   - Avatar (editable)
   - Name
   - Phone number
   - Verification badge if verified

3. **Account Information Section**
   - "اطلاعات حساب کاربری"
   - Name (editable)
   - Email (editable)
   - National Code (editable)
   - Edit button

4. **Bank Accounts Section**
   - "حساب‌های بانکی"
   - List of saved bank accounts
   - Add new button

5. **Settings Section**
   - "تنظیمات"
   - Notifications
   - Security
   - Language (if multi-language)
   - Theme (if dark mode)

6. **Support Section**
   - Help & FAQ
   - Contact Support
   - Terms & Conditions
   - Privacy Policy

7. **App Info**
   - Version
   - About

8. **Logout Button** (Red, bottom)

### User Actions
- Edit profile → Edit profile screen
- Add bank account → Add bank account screen
- Logout → Confirmation dialog → Clear tokens → Login screen

---

## 12. Add Bank Account Screen

### UI Elements
1. **App Bar**: "افزودن حساب بانکی"

2. **Form Fields**
   - Account Holder Name
   - Bank Name (dropdown)
   - Account Number
   - IBAN (optional)

3. **Validation**
   - Real-time validation
   - Show errors below fields

4. **Save Button**: "ذخیره حساب"

### User Flow
1. User fills form
2. App validates
3. User submits
4. App calls `POST /wallet/bank-accounts/`
5. Success → Navigate back
6. Error → Show error message

---

## 13. Notifications Screen

### UI Elements
1. **App Bar**: "اعلان‌ها"

2. **Notification List**
   - Grouped by date
   - Each notification:
     - Icon
     - Title
     - Message
     - Time
     - Read/unread indicator
   - Swipe to delete
   - Mark all as read button

3. **Empty State**
   - "اعلانی وجود ندارد"

### Notification Types
- Price alerts
- Transaction updates
- Deposit/withdrawal approvals
- System announcements

---

## 14. Price Chart Screen (Price History)

### UI Elements
1. **App Bar**: "نمودار قیمت طلا"

2. **Large Chart**
   - Interactive line/candle chart
   - Zoom/pan support
   - Show price on touch

3. **Time Period Selector**
   - 1D, 1W, 1M, 3M, 1Y, All

4. **Statistics Cards**
   - Current price
   - 24h change
   - 24h high
   - 24h low
   - 7d change
   - Volume (if available)

5. **Price Alerts** [Optional]
   - Set alert button
   - Active alerts list

### Data
- `GET /prices/gold/history/?period=7d`

---

## Common UI Components

### Loading States
- Shimmer effect for cards
- Circular progress indicator
- Skeleton screens

### Error States
- Error icon
- Error message
- Retry button

### Empty States
- Relevant icon
- Message
- Call-to-action button if applicable

### Bottom Sheets
- For modals and confirmations
- Draggable
- Backdrop dimming

### Snackbars
- Success: Green
- Error: Red
- Info: Blue
- Warning: Orange

### Dialogs
- Confirmation dialogs
- Alert dialogs
- Loading dialogs

---

## Responsive Design

### Screen Sizes
- Small phones: 320-375px width
- Medium phones: 375-414px width
- Large phones: 414-480px width
- Tablets: 768px+ width

### Adaptations
- Adjust padding/margins
- Scale font sizes
- Reorganize layouts for tablets
- Use responsive grid system

---

## Accessibility

### Requirements
- Semantic labels for screen readers
- Minimum touch target size: 48x48dp
- Sufficient color contrast
- Support for larger text
- Keyboard navigation support

---

**Document Version**: 1.0
**Last Updated**: December 24, 2025
**Status**: Complete
