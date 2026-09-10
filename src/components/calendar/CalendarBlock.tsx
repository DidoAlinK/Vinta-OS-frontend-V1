import { useState, useRef } from 'react';
import type { Session } from '../../types';
import { START_HOUR, HOUR_HEIGHT, timeToMinutes, minutesToTime, snapToGrid, colorMap, type SubjectColorKey } from '../../utils/calendar';
import { formatTime12 } from '../../utils/dates';

const END_HOUR = 22;

const rotation: SubjectColorKey[] = ['gold', 'emerald', 'violet', 'red'];
const colorMap2 = new Map<string, SubjectColorKey>();
let ci = 0;
function getKey(s: string): SubjectColorKey {
  if (!colorMap2.has(s)) { colorMap2.set(s, rotation[ci++ % rotation.length]); }
  return colorMap2.get(s)!;
}

interface LayoutInfo { left: string; width: string; multi: boolean; }

interface Props {
  session: Session;
  layout?: LayoutInfo;
  onUpdate: (id: string, data: any) => Promise<void>;
}

export function CalendarBlock({ session, layout, onUpdate }: Props) {
  const [resizing, setResizing] = useState<'top' | 'bottom' | null>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  const startMinutes = timeToMinutes(session.start_time);
  const endMinutes = timeToMinutes(session.end_time);
  const top = ((startMinutes - START_HOUR * 60) / 60) * HOUR_HEIGHT;
  const height = ((endMinutes - startMinutes) / 60) * HOUR_HEIGHT;
  const colorKey = getKey(session.subject || '');
  const colors = colorMap[colorKey];

  const handleResizeStart = (edge: 'top' | 'bottom', e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setResizing(edge);

    const startY = e.clientY;
    const origStart = startMinutes;
    const origEnd = endMinutes;

    const onMove = (ev: MouseEvent) => {
      const dy = ev.clientY - startY;
      const dMinutes = snapToGrid((dy / HOUR_HEIGHT) * 60);

      let newStart = origStart;
      let newEnd = origEnd;

      if (edge === 'top') {
        newStart = Math.max(START_HOUR * 60, Math.min(origEnd - 5, origStart + dMinutes));
      } else {
        newEnd = Math.min(END_HOUR * 60, Math.max(origStart + 5, origEnd + dMinutes));
      }

      if (blockRef.current) {
        const newTop = ((newStart - START_HOUR * 60) / 60) * HOUR_HEIGHT;
        const newHeight = ((newEnd - newStart) / 60) * HOUR_HEIGHT;
        blockRef.current.style.top = `${newTop}px`;
        blockRef.current.style.height = `${Math.max(newHeight, 20)}px`;
      }
    };

    const onUp = (ev: MouseEvent) => {
      setResizing(null);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);

      const dy = ev.clientY - startY;
      const dMinutes = snapToGrid((dy / HOUR_HEIGHT) * 60);
      let newStart = origStart;
      let newEnd = origEnd;
      if (edge === 'top') {
        newStart = Math.max(START_HOUR * 60, Math.min(origEnd - 5, origStart + dMinutes));
      } else {
        newEnd = Math.min(END_HOUR * 60, Math.max(origStart + 5, origEnd + dMinutes));
      }
      onUpdate(session.id, {
        start_time: minutesToTime(newStart),
        end_time: minutesToTime(newEnd),
      });
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const showMeta = height > 62;
  const showTeacher = height > 42;

  return (
    <div
      ref={blockRef}
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
        transition: resizing ? 'none' : 'box-shadow 0.18s, transform 0.18s',
      }}
    >
      {/* Resize handles */}
      <div
        onMouseDown={(e) => handleResizeStart('top', e)}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, cursor: 'ns-resize', zIndex: 3 }}
      />
      <div
        onMouseDown={(e) => handleResizeStart('bottom', e)}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, cursor: 'ns-resize', zIndex: 3 }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: colors.accent, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {session.subject || session.class_name}
        </span>
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
