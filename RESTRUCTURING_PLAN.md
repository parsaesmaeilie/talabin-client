# Project Restructuring Plan

## Current Issues Identified

### 1. Duplicate Routes (High Priority)
- `app/login/` vs `app/(auth)/login3/` - Two login pages
- `app/signup/` vs `app/(auth)/register/` - Two registration pages
- `app/verify-otp/` vs `app/(auth)/verify/` - Two verification pages
- **Impact**: Confusing for developers, inconsistent URLs for users
- **Solution**: Keep `app/(auth)/*` versions, remove old ones

### 2. Test/Debug Files (High Priority)
- `app/test-integration/` - Leftover test page
- **Solution**: Remove entirely

### 3. Mixed Architecture Patterns (Medium Priority)
- API services in `lib/api/` (507 lines total)
- New structure in `src/shared/` but not fully adopted
- `src/features/` exists but is empty
- **Impact**: Unclear where to add new code, inconsistent patterns
- **Solution**: Migrate to feature-based architecture in `src/`

### 4. Component Organization (Medium Priority)
- Mix of domain components (`dashboard/`, `kyc/`, `buy-sell/`)
- Generic components at root level
- No clear separation of concerns
- **Solution**: Organize by feature + shared components

### 5. State Management (Medium Priority)
- Zustand installed but not used
- Using localStorage + window events for auth
- Each component manages its own state
- **Solution**: Implement Zustand for global state (auth, user, prices)

### 6. Styling Issues (Low Priority)
- Heavy use of inline styles in components
- Not fully leveraging Tailwind CSS
- **Solution**: Gradual migration to Tailwind utility classes

---

## Proposed New Structure

```
talabin-client/
├── src/
│   ├── features/                    # Feature-based modules
│   │   ├── auth/                    # Authentication feature
│   │   │   ├── api/                 # Auth API calls
│   │   │   │   ├── authService.ts
│   │   │   │   └── index.ts
│   │   │   ├── components/          # Auth-specific components
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── OTPInput.tsx
│   │   │   ├── store/               # Auth state management
│   │   │   │   └── authStore.ts
│   │   │   ├── types/               # Auth types
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── wallet/                  # Wallet feature
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── store/
│   │   │   └── types/
│   │   │
│   │   ├── trading/                 # Trading feature
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── store/
│   │   │   └── types/
│   │   │
│   │   ├── prices/                  # Prices feature
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── store/
│   │   │   └── types/
│   │   │
│   │   └── kyc/                     # KYC feature
│   │       ├── api/
│   │       ├── components/
│   │       └── types/
│   │
│   ├── shared/                      # Shared resources (already exists)
│   │   ├── components/              # Shared UI components
│   │   │   ├── ui/                  # Base UI components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   └── FormInput.tsx
│   │   │   ├── layout/              # Layout components
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── BottomNavigation.tsx
│   │   │   │   └── AuthGuard.tsx
│   │   │   └── index.ts
│   │   ├── config/                  # Configuration (existing)
│   │   ├── constants/               # Constants (existing)
│   │   ├── hooks/                   # Shared hooks (existing)
│   │   ├── utils/                   # Utilities (existing)
│   │   ├── types/                   # Shared TypeScript types
│   │   │   ├── api.types.ts
│   │   │   └── index.ts
│   │   └── lib/                     # Core API client
│   │       ├── apiClient.ts
│   │       └── index.ts
│   │
│   └── __tests__/                   # Test files (future)
│
├── app/                             # Next.js App Router (cleaned)
│   ├── (auth)/                      # Auth route group (KEEP)
│   │   ├── login/                   # Renamed from login3
│   │   ├── register/
│   │   └── verify/
│   ├── dashboard/                   # Dashboard routes
│   ├── profile/
│   ├── kyc/
│   ├── payment/
│   ├── forgot-password/
│   ├── onboarding/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/                      # DEPRECATED - Migrate to src/
│   └── [gradual migration to src/]
│
└── lib/                             # DEPRECATED - Migrate to src/
    └── [gradual migration to src/]
```

---

## Migration Strategy (Phase 1 - Immediate)

### Step 1: Remove Duplicates and Test Files ✓
- [x] Delete `app/login/`
- [x] Delete `app/signup/`
- [x] Delete `app/verify-otp/`
- [x] Delete `app/test-integration/`
- [x] Rename `app/(auth)/login3/` to `app/(auth)/login/`

### Step 2: Create Feature Structure ✓
- [x] Create feature folders in `src/features/`
- [x] Move API services from `lib/api/` to feature-based structure
- [x] Keep `src/shared/lib/` for core API client

### Step 3: Set Up State Management ✓
- [x] Create Zustand stores for auth, user, prices
- [x] Implement auth store with token management
- [x] Update AuthGuard to use auth store

### Step 4: Organize Components ✓
- [x] Move shared UI components to `src/shared/components/ui/`
- [x] Move layout components to `src/shared/components/layout/`
- [x] Move feature components to respective feature folders

### Step 5: Update Imports ✓
- [x] Update all imports to use new paths
- [x] Add path aliases to `tsconfig.json` if needed
- [x] Ensure no broken imports

---

## Migration Strategy (Phase 2 - Future)

### Step 6: Refactor Styling (Future)
- [ ] Replace inline styles with Tailwind classes
- [ ] Create utility classes for common patterns
- [ ] Update `globals.css` to use Tailwind @apply

### Step 7: Add Tests (Future)
- [ ] Set up Jest properly
- [ ] Add unit tests for utilities
- [ ] Add integration tests for API services

### Step 8: Performance Optimization (Future)
- [ ] Implement code splitting
- [ ] Add React.lazy for large components
- [ ] Optimize bundle size

---

## Benefits of New Structure

1. **Clear Feature Boundaries**: Each feature is self-contained
2. **Scalability**: Easy to add new features
3. **Maintainability**: Related code is grouped together
4. **Reusability**: Shared code is clearly separated
5. **Type Safety**: Better TypeScript support with proper imports
6. **State Management**: Centralized state with Zustand
7. **Testing**: Clear structure for test organization
8. **Onboarding**: New developers can understand structure quickly

---

## Risk Mitigation

1. **Broken Imports**: Update all imports systematically
2. **Build Errors**: Test build after each major change
3. **Runtime Errors**: Test key user flows after migration
4. **Git History**: Use git mv to preserve file history where possible

---

## Success Metrics

- [ ] All duplicate routes removed
- [ ] All test files cleaned up
- [ ] Feature folders populated
- [ ] State management implemented
- [ ] All imports working
- [ ] Build successful
- [ ] No TypeScript errors
- [ ] Key features tested and working
