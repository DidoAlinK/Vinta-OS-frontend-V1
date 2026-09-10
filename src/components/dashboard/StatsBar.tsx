import type { DashboardStats } from '../../types';

interface Props {
  stats: DashboardStats;
}

export function StatsBar({ stats }: Props) {
  const cards = [
    {
      label: 'Students',
      value: stats.totalStudents,
      iconColor: 'var(--emerald)',
      iconBg: 'var(--emerald-soft)',
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="7.5" cy="6.5" r="3"/>
          <path d="M2,17.5c0-3,2.2-5,5.5-5s5.5,2,5.5,5"/>
          <circle cx="14.5" cy="7" r="2"/>
          <path d="M14,12.5c2,.5,3.5,2,3.5,4.5"/>
        </svg>
      ),
    },
    {
      label: "Today's Sessions",
      value: stats.todaySessions,
      iconColor: 'var(--gold)',
      iconBg: 'var(--gold-soft)',
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2.5" y="3.5" width="15" height="14" rx="2.5"/>
          <path d="M2.5,8h15"/>
          <path d="M6.5,2v3.5"/>
          <path d="M13.5,2v3.5"/>
        </svg>
      ),
    },
    {
      label: 'Active Now',
      value: stats.activeNow,
      iconColor: 'var(--emerald)',
      iconBg: 'var(--emerald-soft)',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
      {cards.map((card) => (
        <div key={card.label} className="glass" style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: 14,
          padding: '14px 18px', borderRadius: 'var(--r-md)',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: card.iconBg, color: card.iconColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {card.icon}
          </div>
          <div>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>
              {card.value}
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
              {card.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
