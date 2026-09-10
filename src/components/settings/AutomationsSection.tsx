import { useState } from 'react';
import { Switch } from '../ui/Switch';

export function AutomationsSection() {
  const [autoCheckout, setAutoCheckout] = useState(true);
  const [popupEnabled, setPopupEnabled] = useState(true);

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Automations</h2>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>Configure automatic behaviors</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Switch checked={autoCheckout} onChange={setAutoCheckout} label="Auto checkout at session end time" />
        <Switch checked={popupEnabled} onChange={setPopupEnabled} label="Show 'Is the class done?' popup at end time" />
      </div>
    </div>
  );
}
