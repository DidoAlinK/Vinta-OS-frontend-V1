import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { teachersApi } from '../../api/teachers';
import { useTeacherStore } from '../../store/teacherStore';

interface Props { onClose: () => void; }

export function AddTeacherModal({ onClose }: Props) {
  const { addTeacher } = useTeacherStore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('+213');
  const [subject, setSubject] = useState('');
  const [contractType, setContractType] = useState<'hourly' | 'per_student'>('hourly');
  const [rate, setRate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const teacher = await teachersApi.create({
        first_name: firstName, last_name: lastName, phone, subject, contract_type: contractType,
        ...(contractType === 'hourly' ? { hourly_rate: Number(rate) } : { per_student_rate: Number(rate) }),
      });
      addTeacher(teacher);
      onClose();
    } catch (err: any) { setError(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  return (
    <Modal open={true} onClose={onClose} width="420px">
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Add Teacher</h2>
      {error && <div style={{ padding: 10, borderRadius: 'var(--r-sm)', background: 'var(--red-soft)', color: 'var(--red)', fontSize: 13, marginBottom: 14 }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input-field" required style={{ flex: 1 }} />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input-field" required style={{ flex: 1 }} />
        </div>
        <input type="tel" placeholder="Phone (+213)" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" />
        <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="input-field" />
        <div style={{ display: 'flex', gap: 8 }}>
          {(['hourly', 'per_student'] as const).map((ct) => (
            <button key={ct} type="button" onClick={() => setContractType(ct)} className={contractType === ct ? 'confirm-btn' : 'ghost-btn'} style={{ flex: 1, padding: 10, fontSize: 12 }}>
              {ct === 'hourly' ? 'Hourly' : 'Per Student'}
            </button>
          ))}
        </div>
        <input type="number" placeholder={contractType === 'hourly' ? 'Hourly Rate (DA)' : 'Per Student Rate (DA)'} value={rate} onChange={(e) => setRate(e.target.value)} className="input-field" required />
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <Button variant="ghost" onClick={onClose} style={{ flex: 1 }}>Cancel</Button>
          <Button variant="confirm" type="submit" style={{ flex: 1 }} disabled={loading}>{loading ? 'Adding…' : 'Add Teacher'}</Button>
        </div>
      </form>
    </Modal>
  );
}
