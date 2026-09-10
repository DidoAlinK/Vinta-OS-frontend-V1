import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { classesApi } from '../../api/classes';
import { useClassStore } from '../../store/classStore';

interface Props { onClose: () => void; }

export function AddClassModal({ onClose }: Props) {
  const { addClass } = useClassStore();
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [capacity, setCapacity] = useState('12');
  const [billingModel, setBillingModel] = useState<'attendance' | 'time_based'>('attendance');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const cls = await classesApi.create({ name, subject, capacity: Number(capacity), billing_model: billingModel });
      addClass(cls);
      onClose();
    } catch (err: any) { setError(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  return (
    <Modal open={true} onClose={onClose} width="420px">
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Add Class</h2>
      {error && <div style={{ padding: 10, borderRadius: 'var(--r-sm)', background: 'var(--red-soft)', color: 'var(--red)', fontSize: 13, marginBottom: 14 }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input type="text" placeholder="Class Name (e.g. Math — CM2)" value={name} onChange={(e) => setName(e.target.value)} className="input-field" required />
        <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="input-field" required />
        <input type="number" placeholder="Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="input-field" min="1" />
        <div style={{ display: 'flex', gap: 8 }}>
          {(['attendance', 'time_based'] as const).map((bm) => (
            <button key={bm} type="button" onClick={() => setBillingModel(bm)} className={billingModel === bm ? 'confirm-btn' : 'ghost-btn'} style={{ flex: 1, padding: 10, fontSize: 12 }}>
              {bm === 'attendance' ? 'Attendance-based' : 'Time-based'}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <Button variant="ghost" onClick={onClose} style={{ flex: 1 }}>Cancel</Button>
          <Button variant="confirm" type="submit" style={{ flex: 1 }} disabled={loading}>{loading ? 'Creating…' : 'Create Class'}</Button>
        </div>
      </form>
    </Modal>
  );
}
