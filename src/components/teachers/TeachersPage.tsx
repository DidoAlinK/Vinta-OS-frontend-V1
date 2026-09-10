import { useEffect, useState } from 'react';
import { useTeacherStore } from '../../store/teacherStore';
import { teachersApi } from '../../api/teachers';
import { TeacherCard } from './TeacherCard';
import { TeacherDrawer } from './TeacherDrawer';
import { AddTeacherModal } from './AddTeacherModal';
import type { Teacher } from '../../types';
import { useDebounce } from '../../hooks/useDebounce';

interface Props { searchQuery?: string; }

export default function TeachersPage({ searchQuery = '' }: Props) {
  const { teachers, setTeachers } = useTeacherStore();
  const [selected, setSelected] = useState<Teacher | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    teachersApi.list().then(setTeachers).catch(() => setTeachers([])).finally(() => setLoading(false));
  }, [setTeachers]);

  const query = useDebounce(searchQuery, 300);
  const filtered = teachers.filter((t) => !query || `${t.first_name} ${t.last_name}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ display: 'flex', gap: 14, height: '100%', minHeight: 0 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>
        <div className="glass" style={{ flex: 1, borderRadius: 'var(--r-lg)', padding: '8px', overflow: 'auto' }}>
          {loading ? <div style={{ textAlign: 'center', padding: 40, color: 'var(--muted)' }}>Loading…</div>
            : filtered.length === 0 ? <div style={{ textAlign: 'center', padding: 40, color: 'var(--muted)' }}>No teachers</div>
            : filtered.map((t) => <TeacherCard key={t.id} teacher={t} onClick={() => setSelected(t)} />)}
        </div>
        <button className="fab" onClick={() => setShowAdd(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
      {selected && <TeacherDrawer teacher={selected} onClose={() => setSelected(null)} />}
      {showAdd && <AddTeacherModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}
