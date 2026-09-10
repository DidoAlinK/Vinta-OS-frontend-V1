import type { Student } from '../../types';
import { getInitials } from '../../utils/initials';
import { AVATAR_PRESETS } from '../../utils/avatar';
import { Badge } from '../ui/Badge';
import { formatPhoneShort } from '../../utils/phone';

interface Props { student: Student; onClick: () => void; }

export function StudentCard({ student, onClick }: Props) {
  const preset = AVATAR_PRESETS[student.id.charCodeAt(1) % AVATAR_PRESETS.length];
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 14px', borderRadius: 'var(--r-sm)',
        cursor: 'pointer', transition: 'background 0.15s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--slot-hover)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
    >
      <div style={{
        width: 38, height: 38, borderRadius: '50%',
        background: `linear-gradient(150deg, ${preset[0]}, ${preset[1]})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontFamily: 'Space Grotesk', fontSize: 13, fontWeight: 700, flexShrink: 0,
      }}>
        {getInitials(`${student.first_name} ${student.last_name}`)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
          {student.first_name} {student.last_name}
        </div>
        <div style={{ fontSize: 11, color: 'var(--muted)' }}>
          {formatPhoneShort(student.phone)}
        </div>
      </div>
      <Badge status={student.status}>{student.status}</Badge>
    </div>
  );
}
