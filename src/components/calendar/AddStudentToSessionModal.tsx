import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { calendarApi } from '../../api/calendar';
import { studentsApi } from '../../api/students';
import type { Student } from '../../types';
import { getInitials } from '../../utils/initials';
import { AVATAR_PRESETS } from '../../utils/avatar';

interface Props {
  sessionId: string;
  onClose: () => void;
  onAdded: () => void;
}

export function AddStudentToSessionModal({ sessionId, onClose, onAdded }: Props) {
  const [students, setStudents] = useState<Student[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentsApi.list().then(setStudents).catch(() => []).finally(() => setLoading(false));
  }, []);

  const filtered = students.filter((s) =>
    `${s.first_name} ${s.last_name}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Modal open={true} onClose={onClose} width="400px">
      <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
        Add Students
      </h3>
      <input
        type="text"
        placeholder="Search students…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input-field"
        style={{ marginBottom: 12 }}
      />
      <div style={{ maxHeight: 300, overflow: 'auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 20, color: 'var(--muted)', fontSize: 12 }}>Loading…</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 20, color: 'var(--muted)', fontSize: 12 }}>No students found</div>
        ) : (
          filtered.map((s, i) => (
            <div key={s.id} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 10px', borderRadius: 'var(--r-sm)',
              cursor: 'pointer', transition: 'background 0.15s',
            }}
              onClick={async () => {
                try {
                  await calendarApi.addStudentsToSession(sessionId, [s.id]);
                  onAdded();
                } catch { /* ignore */ }
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--slot-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: `linear-gradient(150deg, ${AVATAR_PRESETS[i % AVATAR_PRESETS.length][0]}, ${AVATAR_PRESETS[i % AVATAR_PRESETS.length][1]})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontFamily: 'Space Grotesk', fontSize: 10, fontWeight: 700,
              }}>
                {getInitials(`${s.first_name} ${s.last_name}`)}
              </div>
              <span style={{ fontSize: 13, color: 'var(--text)' }}>{s.first_name} {s.last_name}</span>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
}
