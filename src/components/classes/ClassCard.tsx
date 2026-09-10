import type { Class } from '../../types';

interface Props { cls: Class; }

export function ClassCard({ cls }: Props) {
  const enrolled = cls.enrolled_count ?? cls.enrolled ?? 0;
  const dotColor = enrolled >= cls.capacity ? 'var(--red)' : enrolled > 0 ? 'var(--emerald)' : '#888';

  return (
    <div className="glass" style={{ borderRadius: 'var(--r-md)', padding: 18, cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s' }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: dotColor }} />
          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{cls.name}</h3>
        </div>
        <div style={{ padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600, background: 'var(--glass)', color: 'var(--muted)', border: '1px solid var(--divider)' }}>
          {cls.subject}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>Enrolled</div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>{enrolled}<span style={{ fontSize: 12, fontWeight: 400, color: 'var(--muted)' }}> / {cls.capacity}</span></div>
        </div>
        {cls.teacher_name && (
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>👤 {cls.teacher_name}</div>
        )}
      </div>
    </div>
  );
}
