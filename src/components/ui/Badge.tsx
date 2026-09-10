interface BadgeProps {
  status: 'paid' | 'due' | 'overdue' | string;
  children?: React.ReactNode;
  className?: string;
}

export function Badge({ status, children, className = '' }: BadgeProps) {
  const label = children || status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span className={`badge ${status} ${className}`}>
      {status === 'paid' && '✓ '}
      {status === 'due' && '● '}
      {status === 'overdue' && '⚠ '}
      {label}
    </span>
  );
}
