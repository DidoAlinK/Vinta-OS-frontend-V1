import type { Session } from '../../types';
import { colorMap, type SubjectColorKey } from '../../utils/calendar';
import { formatTime12 } from '../../utils/dates';

const rotation: SubjectColorKey[] = ['gold', 'emerald', 'violet', 'red'];
const colorMap2 = new Map<string, SubjectColorKey>();
let ci = 0;

function getKey(s: string): SubjectColorKey {
  if (!colorMap2.has(s)) { colorMap2.set(s, rotation[ci++ % rotation.length]); }
  return colorMap2.get(s)!;
}

interface Props {
  sessions: Session[];
  onClose: () => void;
  onSelect: (session: Session) => void;
}

export function MultiSessionOverlay({ sessions, onClose, onSelect }: Props) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div className="glass" style={{
        minWidth: 280, maxWidth: 'min(360px, 92vw)', maxHeight: '70vh',
        borderRadius: 'var(--r-lg)', padding: 20, overflow: 'auto',
      }} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 15, fontWeight: 600, marginBottom: 14, color: 'var(--text)' }}>
          {sessions.length} Sessions
        </h3>
        {sessions.map((s) => {
          const key = getKey(s.subject || '');
          const c = colorMap[key];
          return (
            <button
              key={s.id}
              onClick={() => { onSelect(s); onClose(); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '10px 12px', borderRadius: 'var(--r-sm)',
                background: 'transparent', border: '1px solid var(--divider)',
                cursor: 'pointer', marginBottom: 6, textAlign: 'left',
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.accent, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.accent }}>{s.subject || s.class_name}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                  {formatTime12(s.start_time)} – {formatTime12(s.end_time)} · {s.teacher_name || 'TBA'}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
