import { Modal } from '../ui/Modal';
import type { OverdueAccount } from '../../types';
import { formatDZD } from '../../utils/currency';

interface Props {
  overdue: OverdueAccount[];
  onClose: () => void;
}

export function FinanceBreakdownModal({ overdue, onClose }: Props) {
  const agingBuckets = {
    '1-7d': overdue.filter((o) => o.aging_bucket === '1-7d'),
    '8-30d': overdue.filter((o) => o.aging_bucket === '8-30d'),
    '30d+': overdue.filter((o) => o.aging_bucket === '30d+'),
  };

  return (
    <Modal open={true} onClose={onClose} width="500px">
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
        Overdue Breakdown
      </h2>

      {Object.entries(agingBuckets).map(([bucket, accounts]) => (
        <div key={bucket} style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {bucket} overdue ({accounts.length})
          </h3>
          {accounts.length === 0 ? (
            <div style={{ fontSize: 12, color: 'var(--muted)', padding: 8 }}>None</div>
          ) : (
            accounts.map((a) => (
              <div key={a.student_id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 14px', borderRadius: 'var(--r-sm)',
                border: '1px solid var(--divider)', marginBottom: 4,
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{a.student_name}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{a.days_overdue} days overdue</div>
                </div>
                <div style={{ fontFamily: 'Space Grotesk', fontSize: 14, fontWeight: 700, color: 'var(--red)' }}>
                  {formatDZD(a.overdue_amount)}
                </div>
              </div>
            ))
          )}
        </div>
      ))}
    </Modal>
  );
}
