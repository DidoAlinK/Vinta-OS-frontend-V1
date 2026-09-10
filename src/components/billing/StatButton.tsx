interface Props {
  label: string;
  value: string;
  color: string;
  onClick?: () => void;
}

export function StatButton({ label, value, color, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="glass"
      style={{
        flex: 1, padding: '14px 16px', borderRadius: 'var(--r-md)',
        textAlign: 'left', cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.15s',
        border: 'none',
        width: '100%',
      }}
      onMouseEnter={(e) => { if (onClick) e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4, fontFamily: 'Inter, sans-serif' }}>{label}</div>
      <div style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, color }}>{value}</div>
    </button>
  );
}
