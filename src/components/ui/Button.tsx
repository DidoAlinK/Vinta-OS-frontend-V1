import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'confirm' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  fullWidth?: boolean;
}

export function Button({ variant = 'confirm', children, fullWidth, className = '', style, ...props }: ButtonProps) {
  const baseClass = variant === 'confirm' ? 'confirm-btn' : variant === 'ghost' ? 'ghost-btn' : 'danger-btn';

  return (
    <button
      className={`${baseClass} ${fullWidth ? 'w-full' : ''} ${className}`}
      style={{
        padding: '12px 20px',
        fontSize: '14px',
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
