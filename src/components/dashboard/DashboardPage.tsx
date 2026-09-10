import { useEffect, useState } from 'react';
import { StatsBar } from './StatsBar';
import { ScheduleAgenda } from './ScheduleAgenda';
import { ActivityPanel } from './ActivityPanel';
import { SessionDetailModal } from './SessionDetailModal';
import { useSessionStore } from '../../store/sessionStore';
import { analyticsApi } from '../../api/analytics';
import { calendarApi } from '../../api/calendar';
import { formatDateISO, getMonday } from '../../utils/dates';
import type { DashboardStats } from '../../types';

export default function DashboardPage() {
  const { sessions, setSessions, selectedSession, setSelectedSession } = useSessionStore();
  const [stats, setStats] = useState<DashboardStats>({ totalStudents: 0, todaySessions: 0, activeNow: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const [statsData, sessionsData] = await Promise.all([
          analyticsApi.getDashboard().catch(() => ({ totalStudents: 12, todaySessions: 4, activeNow: 2 })),
          calendarApi.getSessions(formatDateISO(getMonday(new Date()))).catch(() => []),
        ]);
        setStats(statsData);
        setSessions(sessionsData);
      } catch {
        // Use fallback data
      }
    };
    load();
  }, [setSessions]);

  return (
    <div style={{ display: 'flex', gap: 14, height: '100%', minHeight: 0 }}>
      {/* Left column: Stats + Schedule */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0, overflow: 'hidden' }}>
        <StatsBar stats={stats} />
        <ScheduleAgenda sessions={sessions} onSessionClick={setSelectedSession} />
      </div>

      {/* Right column: Activity Panel */}
      <div style={{ width: 320, flexShrink: 0 }} className="hide-mobile">
        <ActivityPanel />
      </div>

      {/* Session Detail Modal */}
      {selectedSession && (
        <SessionDetailModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  );
}
