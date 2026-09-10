import type { Subject } from '../../types';
import { useState } from 'react';

interface Props {
  subjects: Subject[];
}

export function SubjectPalette({ subjects }: Props) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="glass hide-mobile" style={{
      width: expanded ? 180 : 48,
      flexShrink: 0,
      borderRadius: 'var(--r-lg)',
      padding: expanded ? '16px 12px' : '16px 8px',
      transition: 'width 0.2s, padding 0.2s',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--muted)', fontSize: 11, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.06em',
          padding: '4px 0 12px',
          textAlign: expanded ? 'left' : 'center',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {expanded ? 'Subjects' : 'S'}
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {subjects.map((subject) => (
          <div
            key={subject.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('subject', subject.name);
              e.dataTransfer.effectAllowed = 'copy';
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: expanded ? '8px 10px' : '8px',
              borderRadius: 'var(--r-sm)',
              background: 'var(--slot-bg)',
              border: '1px solid var(--divider)',
              cursor: 'grab',
              transition: 'background 0.15s',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--slot-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--slot-bg)'; }}
          >
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: subject.color, flexShrink: 0,
            }} />
            {expanded && (
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>
                {subject.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
