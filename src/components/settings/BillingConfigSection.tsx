import { useState } from 'react';
import { Switch } from '../ui/Switch';

export function BillingConfigSection() {
  const [attendanceBased, setAttendanceBased] = useState(true);
  const [timeBased, setTimeBased] = useState(false);

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Billing Configuration</h2>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>Configure default billing behavior</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Switch checked={attendanceBased} onChange={setAttendanceBased} label="Enable attendance-based billing (per session credits)" />
        <Switch checked={timeBased} onChange={setTimeBased} label="Enable time-based billing (flat monthly/term fees)" />
      </div>
    </div>
  );
}
