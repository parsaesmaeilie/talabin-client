/**
 * Design Tokens - Centralized design system values
 * Based on UI mockups and responsive design requirements
 */

// Responsive Spacing System
export const spacing = {
  xs: 'clamp(8px, 2vw, 12px)',
  sm: 'clamp(12px, 3vw, 16px)',
  md: 'clamp(16px, 4vw, 20px)',
  lg: 'clamp(20px, 5vw, 24px)',
  xl: 'clamp(24px, 6vw, 32px)',
  '2xl': 'clamp(32px, 8vw, 48px)',
};

// Responsive Font Sizes
export const fontSize = {
  xs: 'clamp(11px, 2.8vw, 13px)',
  sm: 'clamp(13px, 3.2vw, 14px)',
  base: 'clamp(14px, 3.5vw, 16px)',
  lg: 'clamp(16px, 4vw, 18px)',
  xl: 'clamp(18px, 4.5vw, 20px)',
  '2xl': 'clamp(20px, 5vw, 24px)',
  '3xl': 'clamp(24px, 6vw, 32px)',
  '4xl': 'clamp(32px, 8vw, 48px)',
};

// Color Palette (from UI mockups)
export const colors = {
  primary: '#FFC857',
  primaryDark: '#F59E0B',
  dark: '#1C1C1C',
  darkCard: '#2A2A2A',
  background: '#FAF9F6',
  backgroundSoft: '#FFF4E1',
  card: '#FFFFFF',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  muted: '#6B7280',
  border: 'rgba(0, 0, 0, 0.08)',
};

// Border Radius System
export const borderRadius = {
  xs: 'clamp(6px, 1.5vw, 8px)',
  sm: 'clamp(8px, 2vw, 10px)',
  md: 'clamp(12px, 3vw, 14px)',
  lg: 'clamp(16px, 4vw, 18px)',
  xl: 'clamp(20px, 5vw, 24px)',
  '2xl': 'clamp(24px, 6vw, 32px)',
  pill: '999px',
};

// Shadows
export const shadows = {
  xs: '0 1px 3px rgba(0, 0, 0, 0.06)',
  sm: '0 2px 8px rgba(0, 0, 0, 0.08)',
  md: '0 4px 16px rgba(0, 0, 0, 0.1)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
  xl: '0 12px 40px rgba(0, 0, 0, 0.15)',
  primary: '0 4px 12px rgba(255, 200, 87, 0.3)',
  success: '0 4px 12px rgba(16, 185, 129, 0.3)',
  danger: '0 4px 12px rgba(239, 68, 68, 0.3)',
};

// Breakpoints
export const breakpoints = {
  mobile: '320px',
  mobileLg: '375px',
  tablet: '768px',
  desktop: '1024px',
  desktopLg: '1440px',
  desktopXl: '1920px',
};

// Container Max Widths
export const containers = {
  mobile: '100%',
  tablet: 'clamp(100%, 90vw, 768px)',
  desktop: 'clamp(600px, 85vw, 1200px)',
  narrow: 'clamp(100%, 90vw, 600px)',
};

// Z-index Scale
export const zIndex = {
  base: 1,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  toast: 60,
};

// Transition Durations
export const transitions = {
  fast: '150ms',
  normal: '250ms',
  slow: '350ms',
  slower: '500ms',
};
