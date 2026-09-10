import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { studentsApi } from '../../api/students';
import { useStudentStore } from '../../store/studentStore';

interface Props { onClose: () => void; }

export function AddStudentModal({ onClose }: Props) {
  const { addStudent } = useStudentStore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('+213');
  const [parentPhone, setParentPhone] = useState('+213');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const student = await studentsApi.create({ first_name: firstName, last_name: lastName, phone, parent_phone: parentPhone });
      addStudent(student);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create student');
    } finally { setLoading(false); }
  };

  return (
    <Modal open={true} onClose={onClose} width="420px">
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Add Student</h2>
      {error && <div style={{ padding: 10, borderRadius: 'var(--r-sm)', background: 'var(--red-soft)', color: 'var(--red)', fontSize: 13, marginBottom: 14 }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input-field" required style={{ flex: 1 }} />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input-field" required style={{ flex: 1 }} />
        </div>
        <input type="tel" placeholder="Phone (+213)" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" required />
        <input type="tel" placeholder="Parent Phone (+213)" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} className="input-field" />
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <Button variant="ghost" onClick={onClose} style={{ flex: 1 }}>Cancel</Button>
          <Button variant="confirm" type="submit" style={{ flex: 1 }} disabled={loading}>{loading ? 'Adding…' : 'Add Student'}</Button>
        </div>
      </form>
    </Modal>
  );
}
