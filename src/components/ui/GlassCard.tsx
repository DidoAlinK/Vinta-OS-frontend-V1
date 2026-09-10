import type { ReactNode, HTMLAttributes } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: string;
  radius?: string;
  className?: string;
}

export function GlassCard({ children, padding, radius, className = '', ...props }: GlassCardProps) {
  return (
    <div
      className={`glass ${className}`}
      style={{ padding: padding || undefined, borderRadius: radius || undefined }}
      {...props}
    >
      {children}
    </div>
  );
}
