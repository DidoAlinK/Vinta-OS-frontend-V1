import type { Teacher } from '../../types';
import { getInitials } from '../../utils/initials';
import { AVATAR_PRESETS } from '../../utils/avatar';
import { formatPhoneShort } from '../../utils/phone';

interface Props { teacher: Teacher; onClick: () => void; }

export function TeacherCard({ teacher, onClick }: Props) {
  const preset = AVATAR_PRESETS[(teacher.id.charCodeAt(1) + 2) % AVATAR_PRESETS.length];
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 'var(--r-sm)', cursor: 'pointer', transition: 'background 0.15s' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--slot-hover)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
      <div style={{ width: 38, height: 38, borderRadius: '50%', background: `linear-gradient(150deg, ${preset[0]}, ${preset[1]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Space Grotesk', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
        {getInitials(`${teacher.first_name} ${teacher.last_name}`)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{teacher.first_name} {teacher.last_name}</div>
        <div style={{ fontSize: 11, color: 'var(--muted)' }}>{teacher.subject || 'General'} · {teacher.contract_type === 'hourly' ? 'Hourly' : 'Per Student'}</div>
      </div>
      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{formatPhoneShort(teacher.phone)}</div>
    </div>
  );
}
