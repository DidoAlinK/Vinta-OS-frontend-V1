import { useState, useCallback, useMemo } from 'react';
import { getMonday, addDays, formatDateISO, getWeekDays } from '../utils/dates';
import type { Session } from '../types';
import { layoutOverlappingSessions } from '../utils/calendar';

export function useCalendar() {
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');

  const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart]);

  const goToNextWeek = useCallback(() => {
    setWeekStart((prev) => addDays(prev, 7));
  }, []);

  const goToPrevWeek = useCallback(() => {
    setWeekStart((prev) => addDays(prev, -7));
  }, []);

  const goToToday = useCallback(() => {
    setWeekStart(getMonday(new Date()));
  }, []);

  const weekParam = useMemo(() => formatDateISO(weekStart), [weekStart]);

  const getSessionsForDay = useCallback((date: Date, sessions: Session[]) => {
    const dateStr = formatDateISO(date);
    return sessions.filter((s) => s.date === dateStr);
  }, []);

  const getOverlaps = useCallback((daySessions: Session[]) => {
    return layoutOverlappingSessions(daySessions);
  }, []);

  return {
    weekStart,
    weekDays,
    weekParam,
    viewMode,
    setViewMode,
    goToNextWeek,
    goToPrevWeek,
    goToToday,
    getSessionsForDay,
    getOverlaps,
  };
}
