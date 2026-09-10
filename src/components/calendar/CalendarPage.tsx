import { useState, useEffect } from 'react';
import { SubjectPalette } from './SubjectPalette';
import { CalendarGrid } from './CalendarGrid';
import { AddSessionModal } from './AddSessionModal';
import { useSessionStore } from '../../store/sessionStore';
import { calendarApi } from '../../api/calendar';
import { formatDateISO, getMonday } from '../../utils/dates';
import type { Session, Subject } from '../../types';

export default function CalendarPage() {
  const { sessions, setSessions } = useSessionStore();
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));
  const [subjects] = useState<Subject[]>([
    { id: 's1', academy_id: '', name: 'Math', color: '#b3872a' },
    { id: 's2', academy_id: '', name: 'French', color: '#7c3aed' },
    { id: 's3', academy_id: '', name: 'English', color: '#0ea5e9' },
    { id: 's4', academy_id: '', name: 'Science', color: '#0f6b4d' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalDefaults, setModalDefaults] = useState<{ subject?: string; date?: string; startTime?: string }>({});

  const weekParam = formatDateISO(weekStart);

  useEffect(() => {
    calendarApi.getSessions(weekParam)
      .then(setSessions)
      .catch(() => setSessions([]));
  }, [weekParam, setSessions]);

  const handleDragCreate = (subject: string, date: string, startTime: string) => {
    setModalDefaults({ subject, date, startTime });
    setShowAddModal(true);
  };

  const handleSessionCreated = (session: Session) => {
    setSessions([...sessions, session]);
    setShowAddModal(false);
  };

  return (
    <div style={{ display: 'flex', gap: 14, height: '100%', minHeight: 0 }}>
      <SubjectPalette subjects={subjects} />
      <CalendarGrid
        sessions={sessions}
        weekStart={weekStart}
        onDragCreate={handleDragCreate}
        onSessionUpdate={async (id, data) => {
          await calendarApi.updateSession(id, data);
          setSessions(sessions.map(s => s.id === id ? { ...s, ...data } : s));
        }}
      />
      {showAddModal && (
        <AddSessionModal
          defaults={modalDefaults}
          onClose={() => setShowAddModal(false)}
          onCreated={handleSessionCreated}
        />
      )}
    </div>
  );
}
