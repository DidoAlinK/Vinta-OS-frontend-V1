import type { Class } from '../../types';
import { Modal } from '../ui/Modal';

interface Props { cls: Class; onClose: () => void; }

export function ClassDetail({ cls, onClose }: Props) {
  return (
    <Modal open={true} onClose={onClose} width="500px">
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>{cls.name}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ padding: '10px 14px', borderRadius: 'var(--r-sm)', border: '1px solid var(--divider)' }}>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>Subject</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{cls.subject}</div>
        </div>
        <div style={{ padding: '10px 14px', borderRadius: 'var(--r-sm)', border: '1px solid var(--divider)' }}>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>Capacity</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{cls.enrolled_count ?? 0} / {cls.capacity}</div>
        </div>
        {cls.teacher_name && (
          <div style={{ padding: '10px 14px', borderRadius: 'var(--r-sm)', border: '1px solid var(--divider)' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>Teacher</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{cls.teacher_name}</div>
          </div>
        )}
      </div>
    </Modal>
  );
}
