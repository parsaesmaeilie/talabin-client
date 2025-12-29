import React from 'react';

interface ShimmerBoxProps {
  height?: string;
  width?: string;
  borderRadius?: string;
  className?: string;
}

/**
 * ShimmerBox - Loading placeholder with shimmer animation
 * Used for skeleton screens while content is loading
 */
export function ShimmerBox({
  height = '40px',
  width = '100%',
  borderRadius = '8px',
  className = '',
}: ShimmerBoxProps) {
  return (
    <>
      <div
        className={`shimmer-box ${className}`}
        style={{
          height,
          width,
          borderRadius,
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s ease-in-out infinite',
        }}
      />
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </>
  );
}

/**
 * ShimmerLine - Shimmer for text lines
 */
export function ShimmerLine({
  width = '100%',
  className = '',
}: { width?: string; className?: string }) {
  return <ShimmerBox height="16px" width={width} borderRadius="4px" className={className} />;
}

/**
 * ShimmerCard - Shimmer for card layout
 */
export function ShimmerCard() {
  return (
    <div style={{ padding: 'clamp(16px, 4vw, 24px)' }}>
      <ShimmerLine width="60%" />
      <div style={{ marginTop: '12px' }}>
        <ShimmerLine width="80%" />
      </div>
      <div style={{ marginTop: '8px' }}>
        <ShimmerLine width="40%" />
      </div>
    </div>
  );
}

/**
 * ShimmerCircle - Shimmer for circular elements (avatars, icons)
 */
export function ShimmerCircle({
  size = '48px',
  className = '',
}: { size?: string; className?: string }) {
  return <ShimmerBox height={size} width={size} borderRadius="50%" className={className} />;
}
