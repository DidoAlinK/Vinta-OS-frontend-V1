import { analyticsApi } from '../../api/analytics';
import { Button } from '../ui/Button';

export function ExportSection() {
  const handleExport = async (dataset: string) => {
    try {
      const blob = await analyticsApi.exportCSV(dataset);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${dataset}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Export not available yet');
    }
  };

  const datasets = [
    { id: 'roster', label: 'Student Roster', desc: 'All students with contact info and enrollment' },
    { id: 'billing', label: 'Billing History', desc: 'Payment records and billing cycles' },
    { id: 'hours', label: 'Teacher Hours', desc: 'Teacher attendance and hour logs' },
    { id: 'attendance', label: 'Attendance Records', desc: 'Session attendance data' },
  ];

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Data & Export</h2>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>Download your academy data as CSV files</p>

      {datasets.map((d) => (
        <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderRadius: 'var(--r-sm)', border: '1px solid var(--divider)', marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{d.label}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>{d.desc}</div>
          </div>
          <Button variant="ghost" onClick={() => handleExport(d.id)} style={{ padding: '6px 14px', fontSize: 12 }}>Download CSV</Button>
        </div>
      ))}
    </div>
  );
}
