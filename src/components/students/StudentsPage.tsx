import { useEffect, useState } from 'react';
import { useStudentStore } from '../../store/studentStore';
import { studentsApi } from '../../api/students';
import { StudentCard } from './StudentCard';
import { StudentDrawer } from './StudentDrawer';
import { AddStudentModal } from './AddStudentModal';
import type { Student } from '../../types';
import { useDebounce } from '../../hooks/useDebounce';

interface Props { searchQuery?: string; }

export default function StudentsPage({ searchQuery = '' }: Props) {
  const { students, setStudents } = useStudentStore();
  const [selected, setSelected] = useState<Student | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentsApi.list().then(setStudents).catch(() => setStudents([])).finally(() => setLoading(false));
  }, [setStudents]);

  const query = useDebounce(searchQuery, 300);
  const filtered = students.filter((s) => {
    const match = !query || `${s.first_name} ${s.last_name}`.toLowerCase().includes(query.toLowerCase());
    return match && s.is_active !== false;
  });

  const stats = {
    total: students.length,
    paid: students.filter((s) => s.status === 'paid').length,
    due: students.filter((s) => s.status === 'due').length,
    overdue: students.filter((s) => s.status === 'overdue').length,
  };

  return (
    <div style={{ display: 'flex', gap: 14, height: '100%', minHeight: 0 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>
        {/* Stats rail */}
        <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          {[
            { label: 'Total', value: stats.total, color: 'var(--text)' },
            { label: 'Paid', value: stats.paid, color: 'var(--emerald)' },
            { label: 'Due', value: stats.due, color: 'var(--gold)' },
            { label: 'Overdue', value: stats.overdue, color: 'var(--red)' },
          ].map((s) => (
            <div key={s.label} className="glass" style={{ padding: '10px 16px', borderRadius: 'var(--r-sm)', flex: 1, textAlign: 'center' }}>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
        {/* List */}
        <div className="glass" style={{ flex: 1, borderRadius: 'var(--r-lg)', padding: '8px', overflow: 'auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 40, color: 'var(--muted)' }}>Loading students…</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: 'var(--muted)' }}>No students found</div>
          ) : (
            filtered.map((s) => <StudentCard key={s.id} student={s} onClick={() => setSelected(s)} />)
          )}
        </div>
        <button className="fab" onClick={() => setShowAdd(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
      {selected && <StudentDrawer student={selected} onClose={() => setSelected(null)} />}
      {showAdd && <AddStudentModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}
