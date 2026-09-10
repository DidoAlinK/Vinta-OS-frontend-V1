import type { Session } from '../../types';
import { SessionBlock } from './SessionBlock';
import { MultiSessionOverlay } from './MultiSessionOverlay';
import { useCalendar } from '../../hooks/useCalendar';
import { formatWeekRange, formatHour, getDayName, isToday } from '../../utils/dates';
import { START_HOUR, END_HOUR, HOUR_HEIGHT, TOTAL_HOURS, layoutOverlappingSessions } from '../../utils/calendar';
import { useState } from 'react';

interface Props {
  sessions: Session[];
  onSessionClick: (session: Session) => void;
}

export function ScheduleAgenda({ sessions, onSessionClick }: Props) {
  const { weekStart, weekDays, viewMode, setViewMode, goToNextWeek, goToPrevWeek, goToToday, getSessionsForDay } = useCalendar();
  const [multiSessionDay, setMultiSessionDay] = useState<Session[] | null>(null);

  // Current time line position
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const showNowLine = nowMinutes >= START_HOUR * 60 && nowMinutes <= END_HOUR * 60;
  const nowTop = ((nowMinutes - START_HOUR * 60) / 60) * HOUR_HEIGHT;

  return (
    <div className="glass" style={{
      borderRadius: 'var(--r-lg)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden', flex: 1, minHeight: 0,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '18px 22px 14px' }}>
        <div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>
            Schedule
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: 11.5, color: 'var(--muted)' }}>
            {formatWeekRange(weekStart)}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={goToPrevWeek} className="icon-btn" style={{ width: 28, height: 28 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2L4 6L8 10"/></svg>
          </button>
          <button onClick={goToToday} className="ghost-btn" style={{ padding: '4px 10px', fontSize: 11 }}>Today</button>
          <button onClick={goToNextWeek} className="icon-btn" style={{ width: 28, height: 28 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 2L8 6L4 10"/></svg>
          </button>
          <div style={{ display: 'flex', gap: 3, padding: 3, borderRadius: 100, background: 'var(--glass-strong)', border: '1px solid var(--glass-border)', marginLeft: 8 }}>
            {['Week', 'Day'].map((v) => (
              <button
                key={v}
                onClick={() => setViewMode(v.toLowerCase() as 'week' | 'day')}
                style={{
                  padding: '4px 10px', borderRadius: 100, border: 'none',
                  background: viewMode === v.toLowerCase() ? 'linear-gradient(150deg, var(--gold), var(--emerald))' : 'transparent',
                  color: viewMode === v.toLowerCase() ? '#fff' : 'var(--muted)',
                  fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                }}
              >
                {v}
              </button>
            ))}
          </div>
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
                fontFamily: 'Space Grotesk', fontSize: 22, fontWeight: 700, color: today ? '#fff' : 'var(--text)',
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

      {/* Grid body */}
      <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
        <div style={{ display: 'flex', position: 'relative' }}>
          {/* Hours column */}
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
                {/* Hour grid lines */}
                {Array.from({ length: TOTAL_HOURS }, (_, i) => (
                  <div key={i} style={{ height: HOUR_HEIGHT, borderTop: '1px solid var(--divider)' }} />
                ))}

                {/* Now line */}
                {isToday(day) && showNowLine && (
                  <div style={{ position: 'absolute', left: 0, right: 0, top: nowTop, borderTop: '2px solid var(--red)', zIndex: 5 }}>
                    <div style={{ position: 'absolute', left: -4, top: -4, width: 8, height: 8, borderRadius: '50%', background: 'var(--red)' }} />
                  </div>
                )}

                {/* Session blocks */}
                {daySessions.map((session) => {
                  const layout = overlaps.get(session.id);
                  return (
                    <SessionBlock
                      key={session.id}
                      session={session}
                      layout={layout}
                      onClick={() => onSessionClick(session)}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Multi-session overlay */}
      {multiSessionDay && (
        <MultiSessionOverlay sessions={multiSessionDay} onClose={() => setMultiSessionDay(null)} onSelect={onSessionClick} />
      )}
    </div>
  );
}
