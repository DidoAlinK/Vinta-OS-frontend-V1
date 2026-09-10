interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

export function Skeleton({ width, height = 16, borderRadius = 'var(--r-xs)', className = '' }: SkeletonProps) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius,
        background: 'var(--divider)',
        animation: 'pulse 1.5s ease-in-out infinite',
      }}
    />
  );
}
