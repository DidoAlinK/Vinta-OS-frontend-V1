import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { calendarApi } from '../../api/calendar';
import type { Session } from '../../types';

interface Props {
  defaults?: { subject?: string; date?: string; startTime?: string };
  onClose: () => void;
  onCreated: (session: Session) => void;
}

export function AddSessionModal({ defaults, onClose, onCreated }: Props) {
  const [subject, setSubject] = useState(defaults?.subject || '');
  const [date, setDate] = useState(defaults?.date || new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState(defaults?.startTime || '09:00');
  const [endTime, setEndTime] = useState(() => {
    if (defaults?.startTime) {
      const [h, m] = defaults.startTime.split(':').map(Number);
      return `${String(h + 1).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    }
    return '10:00';
  });
  const [classId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const session = await calendarApi.createSession({
        class_id: classId || 'default',
        date,
        start_time: startTime,
        end_time: endTime,
      });
      onCreated(session);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={true} onClose={onClose} width="420px">
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
        New Session
      </h2>

      {error && (
        <div style={{ padding: 10, borderRadius: 'var(--r-sm)', background: 'var(--red-soft)', color: 'var(--red)', fontSize: 13, marginBottom: 14 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 4, display: 'block' }}>Subject</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="input-field" placeholder="e.g. Math" />
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 4, display: 'block' }}>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field" required />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 4, display: 'block' }}>Start Time</label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="input-field" required />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 4, display: 'block' }}>End Time</label>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="input-field" required />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <Button variant="ghost" onClick={onClose} style={{ flex: 1 }}>Cancel</Button>
          <Button variant="confirm" type="submit" style={{ flex: 1, padding: 12 }} disabled={loading}>
            {loading ? 'Creating…' : 'Create Session'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
