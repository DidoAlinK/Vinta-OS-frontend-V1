import type { Session } from '../../types';
import { timeToMinutes } from '../../utils/calendar';
import { START_HOUR, HOUR_HEIGHT, colorMap, STATUS_COLORS, type SubjectColorKey } from '../../utils/calendar';
import { formatTime12 } from '../../utils/dates';

interface LayoutInfo {
  left: string;
  width: string;
  multi: boolean;
}

interface Props {
  session: Session;
  layout?: LayoutInfo;
  onClick?: () => void;
  readonly?: boolean;
}

const subjectColorMap = new Map<string, SubjectColorKey>();
let colorIndex = 0;
const rotation: SubjectColorKey[] = ['gold', 'emerald', 'violet', 'red'];

function getSubjectColorKey(subject?: string): SubjectColorKey {
  if (!subject) return 'gold';
  if (!subjectColorMap.has(subject)) {
    subjectColorMap.set(subject, rotation[colorIndex % rotation.length]);
    colorIndex++;
  }
  return subjectColorMap.get(subject)!;
}

export function SessionBlock({ session, layout, onClick, readonly = true }: Props) {
  const startMinutes = timeToMinutes(session.start_time);
  const endMinutes = timeToMinutes(session.end_time);
  const top = ((startMinutes - START_HOUR * 60) / 60) * HOUR_HEIGHT;
  const height = ((endMinutes - startMinutes) / 60) * HOUR_HEIGHT;
  const colorKey = getSubjectColorKey(session.subject);
  const colors = colorMap[colorKey];
  const statusKey = STATUS_COLORS[session.status] || 'gold';
  const statusColors = colorMap[statusKey];
  const showTeacher = height > 42;
  const showMeta = height > 62;

  const statusLabel = session.status === 'in_progress' ? '● LIVE'
    : session.status === 'completed' ? '✓ Done'
    : session.status === 'cancelled' ? '✕'
    : '●';

  return (
    <div
      onClick={onClick}
      className={`ab-block ${session.status === 'cancelled' ? 'ab-block--cancelled' : ''} ${readonly ? 'ab-block--readonly' : ''} ${layout?.multi ? 'ab-block--multi' : ''}`}
      style={{
        position: 'absolute',
        left: layout?.left || '3px',
        width: layout?.width || 'calc(100% - 6px)',
        top: `${top}px`,
        height: `${Math.max(height, 20)}px`,
        borderRadius: 'var(--r-sm)',
        padding: '5px 8px',
        cursor: 'pointer',
        overflow: 'hidden',
        zIndex: 2,
        borderLeft: `3px solid ${colors.accent}`,
        background: colors.bg,
        transition: 'box-shadow 0.18s, transform 0.18s',
      }}
      onMouseEnter={(e) => {
        if (readonly) {
          e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.15)';
          e.currentTarget.style.transform = 'scale(1.015)';
          e.currentTarget.style.zIndex = '5';
        }
      }}
      onMouseLeave={(e) => {
        if (readonly) {
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.zIndex = '2';
        }
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: colors.accent, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {session.subject || session.class_name || 'Session'}
        </span>
        {height > 30 && (
          <span style={{ fontSize: 10, fontWeight: 600, color: statusColors.text, flexShrink: 0 }}>
            {statusLabel}
          </span>
        )}
      </div>
      {showTeacher && session.teacher_name && (
        <div style={{ fontSize: 10.5, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 1 }}>
          {session.teacher_name}
        </div>
      )}
      {showMeta && (
        <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 1 }}>
          {formatTime12(session.start_time)} – {formatTime12(session.end_time)}
          {session.enrolled_count !== undefined && ` · ${session.enrolled_count}`}
        </div>
      )}
    </div>
  );
}
