import React from 'react';
import { spacing, colors, borderRadius, fontSize } from '@/lib/utils/design-tokens';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
  type?: 'error' | 'warning' | 'info';
}

/**
 * ErrorMessage - Standardized error display component
 * Shows error messages with optional retry button
 */
export function ErrorMessage({
  message,
  onRetry,
  className = '',
  type = 'error',
}: ErrorMessageProps) {
  const styles = getTypeStyles(type);

  return (
    <div
      className={`error-message ${className}`}
      style={{
        padding: spacing.md,
        background: styles.background,
        border: `1px solid ${styles.border}`,
        borderRadius: borderRadius.md,
        color: styles.color,
        marginBottom: spacing.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing.sm,
        animation: 'slideDown 0.3s ease-out',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, flex: 1 }}>
        <span style={{ fontSize: '20px', flexShrink: 0 }}>
          {type === 'error' && '⚠️'}
          {type === 'warning' && '⚡'}
          {type === 'info' && 'ℹ️'}
        </span>
        <span style={{ fontSize: fontSize.sm, lineHeight: '1.5' }}>{message}</span>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: `${spacing.xs} ${spacing.sm}`,
            background: styles.color,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: borderRadius.sm,
            fontSize: fontSize.sm,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          تلاش مجدد
        </button>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Get styling based on error type
 */
function getTypeStyles(type: 'error' | 'warning' | 'info') {
  switch (type) {
    case 'error':
      return {
        background: '#FEE2E2',
        border: '#FCA5A5',
        color: colors.danger,
      };
    case 'warning':
      return {
        background: '#FEF3C7',
        border: '#FDE68A',
        color: colors.warning,
      };
    case 'info':
      return {
        background: '#DBEAFE',
        border: '#93C5FD',
        color: '#2563EB',
      };
  }
}

/**
 * ErrorBoundary fallback component
 */
export function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.lg,
        background: colors.background,
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          padding: spacing.xl,
          background: colors.card,
          borderRadius: borderRadius.xl,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '64px', marginBottom: spacing.md }}>😔</div>
        <h2
          style={{
            fontSize: fontSize['2xl'],
            fontWeight: 700,
            marginBottom: spacing.sm,
            color: colors.dark,
          }}
        >
          مشکلی پیش آمده است
        </h2>
        <p
          style={{
            fontSize: fontSize.base,
            color: colors.muted,
            marginBottom: spacing.lg,
            lineHeight: '1.6',
          }}
        >
          متاسفانه خطایی رخ داده است. لطفا صفحه را بازخوانی کنید یا با پشتیبانی تماس بگیرید.
        </p>
        {error && (
          <div
            style={{
              padding: spacing.md,
              background: '#FEE2E2',
              borderRadius: borderRadius.md,
              marginBottom: spacing.lg,
              direction: 'ltr',
              textAlign: 'left',
              fontSize: fontSize.sm,
              color: colors.danger,
              fontFamily: 'monospace',
            }}
          >
            {error.message}
          </div>
        )}
        <button
          onClick={resetErrorBoundary}
          style={{
            padding: `${spacing.md} ${spacing.xl}`,
            background: colors.primary,
            color: colors.dark,
            border: 'none',
            borderRadius: borderRadius.md,
            fontSize: fontSize.base,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          بازخوانی صفحه
        </button>
      </div>
    </div>
  );
}
