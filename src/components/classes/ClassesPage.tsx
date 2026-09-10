import { useEffect, useState } from 'react';
import { useClassStore } from '../../store/classStore';
import { classesApi } from '../../api/classes';
import { ClassCard } from './ClassCard';
import { AddClassModal } from './AddClassModal';
import { useDebounce } from '../../hooks/useDebounce';

interface Props { searchQuery?: string; }

export default function ClassesPage({ searchQuery = '' }: Props) {
  const { classes, setClasses } = useClassStore();
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    classesApi.list().then(setClasses).catch(() => setClasses([])).finally(() => setLoading(false));
  }, [setClasses]);

  const query = useDebounce(searchQuery, 300);
  const filtered = classes.filter((c) => !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.subject.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ position: 'relative', height: '100%', minHeight: 0, overflow: 'auto', padding: 4 }}>
      {loading ? <div style={{ textAlign: 'center', padding: 40, color: 'var(--muted)' }}>Loading…</div>
        : filtered.length === 0 ? <div style={{ textAlign: 'center', padding: 40, color: 'var(--muted)' }}>No classes</div>
        : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
            {filtered.map((c) => <ClassCard key={c.id} cls={c} />)}
          </div>
        )}
      <button className="fab" onClick={() => setShowAdd(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
      {showAdd && <AddClassModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}
