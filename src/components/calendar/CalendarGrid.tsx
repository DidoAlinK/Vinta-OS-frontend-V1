import { useState } from 'react';
import type { Session } from '../../types';
import { CalendarBlock } from './CalendarBlock';
import { useCalendar } from '../../hooks/useCalendar';
import { formatWeekRange, formatHour, getDayName, isToday } from '../../utils/dates';
import { START_HOUR, END_HOUR, HOUR_HEIGHT, TOTAL_HOURS, snapToGrid, layoutOverlappingSessions } from '../../utils/calendar';

interface Props {
  sessions: Session[];
  weekStart: Date;
  onDragCreate: (subject: string, date: string, startTime: string) => void;
  onSessionUpdate: (id: string, data: any) => Promise<void>;
}

export function CalendarGrid({ sessions, weekStart, onDragCreate, onSessionUpdate }: Props) {
  const { weekDays, goToNextWeek, goToPrevWeek, goToToday, getSessionsForDay } = useCalendar();
  const [dragOverCell, setDragOverCell] = useState<{ day: number; hour: number } | null>(null);

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const showNowLine = nowMinutes >= START_HOUR * 60 && nowMinutes <= END_HOUR * 60;
  const nowTop = ((nowMinutes - START_HOUR * 60) / 60) * HOUR_HEIGHT;

  const handleDragOver = (e: React.DragEvent, dayIndex: number, hour: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOverCell({ day: dayIndex, hour });
  };

  const handleDragLeave = () => setDragOverCell(null);

  const handleDrop = (e: React.DragEvent, dayIndex: number, hour: number) => {
    e.preventDefault();
    const subject = e.dataTransfer.getData('subject');
    const dateStr = weekDays[dayIndex].toISOString().split('T')[0];
    const startHour = snapToGrid(hour * 60) / 60;
    const startTime = `${String(Math.floor(startHour)).padStart(2, '0')}:${String((startHour % 1) * 60).padStart(2, '0')}`;
    onDragCreate(subject, dateStr, startTime);
    setDragOverCell(null);
  };

  return (
    <div className="glass" style={{
      borderRadius: 'var(--r-lg)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden', flex: 1, minHeight: 0,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '18px 22px 14px' }}>
        <div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>Calendar</div>
          <div style={{ fontFamily: 'Inter', fontSize: 11.5, color: 'var(--muted)' }}>{formatWeekRange(weekStart)}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={goToPrevWeek} className="icon-btn" style={{ width: 28, height: 28 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2L4 6L8 10"/></svg>
          </button>
          <button onClick={goToToday} className="ghost-btn" style={{ padding: '4px 10px', fontSize: 11 }}>Today</button>
          <button onClick={goToNextWeek} className="icon-btn" style={{ width: 28, height: 28 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 2L8 6L4 10"/></svg>
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div style={{ display: 'flex', position: 'sticky', top: 0, zIndex: 10, background: 'var(--glass)', backdropFilter: 'blur(22px)' }}>
        <div style={{ width: 62, flexShrink: 0 }} />
        {weekDays.map((day, i) => {
          const today = isToday(day);
          return (
            <div key={i} style={{ flex: 1, textAlign: 'center', padding: '8px 0' }}>
              <div style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase' }}>
                {getDayName(day)}
              </div>
              <div style={{
                fontFamily: 'Space Grotesk', fontSize: 22, fontWeight: 700,
                color: today ? '#fff' : 'var(--text)',
                background: today ? 'linear-gradient(150deg, var(--gold), var(--emerald))' : 'transparent',
                borderRadius: '50%', width: 34, height: 34,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '2px auto 0',
              }}>
                {day.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ display: 'flex' }}>
          {/* Hours */}
          <div style={{ width: 62, flexShrink: 0 }}>
            {Array.from({ length: TOTAL_HOURS }, (_, i) => (
              <div key={i} style={{ height: HOUR_HEIGHT, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', paddingRight: 10 }}>
                <span style={{ fontFamily: 'Inter', fontSize: 11, color: 'var(--muted)', transform: 'translateY(-6px)' }}>
                  {formatHour(START_HOUR + i)}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDays.map((day, dayIndex) => {
            const daySessions = getSessionsForDay(day, sessions);
            const overlaps = layoutOverlappingSessions(daySessions);

            return (
              <div key={dayIndex} style={{ flex: 1, position: 'relative' }}>
                {Array.from({ length: TOTAL_HOURS }, (_, i) => (
                  <div
                    key={i}
                    style={{
                      height: HOUR_HEIGHT,
                      borderTop: '1px solid var(--divider)',
                      background: dragOverCell?.day === dayIndex && dragOverCell?.hour === i
                        ? 'rgba(15,107,77,0.08)' : 'transparent',
                      transition: 'background 0.15s',
                    }}
                    onDragOver={(e) => handleDragOver(e, dayIndex, i)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, dayIndex, i)}
                  />
                ))}

                {/* Now line */}
                {isToday(day) && showNowLine && (
                  <div style={{ position: 'absolute', left: 0, right: 0, top: nowTop, borderTop: '2px solid var(--red)', zIndex: 5 }}>
                    <div style={{ position: 'absolute', left: -4, top: -4, width: 8, height: 8, borderRadius: '50%', background: 'var(--red)' }} />
                  </div>
                )}

                {/* Sessions */}
                {daySessions.map((session) => {
                  const layout = overlaps.get(session.id);
                  return (
                    <CalendarBlock
                      key={session.id}
                      session={session}
                      layout={layout}
                      onUpdate={onSessionUpdate}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
