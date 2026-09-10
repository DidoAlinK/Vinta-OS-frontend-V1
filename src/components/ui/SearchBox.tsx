import type { InputHTMLAttributes } from 'react';

interface SearchBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  onSearch?: (value: string) => void;
}

export function SearchBox({ onSearch, className = '', ...props }: SearchBoxProps) {
  return (
    <div className={`search-box ${className}`} style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '9px 14px',
      borderRadius: 'var(--r-sm)',
      background: 'var(--input-bg)',
      border: '1px solid var(--divider)',
      flex: '0 1 260px',
    }}>
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--muted)', flexShrink: 0 }}>
        <circle cx="8.5" cy="8.5" r="5.5" />
        <path d="M12.5 12.5L17 17" />
      </svg>
      <input
        type="text"
        placeholder="Search…"
        style={{
          border: 'none',
          background: 'transparent',
          fontSize: 13,
          color: 'var(--text)',
          fontFamily: 'Inter, sans-serif',
          outline: 'none',
          width: '100%',
        }}
        onChange={(e) => onSearch?.(e.target.value)}
        {...props}
      />
    </div>
  );
}
