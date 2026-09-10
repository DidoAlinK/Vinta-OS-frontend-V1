import { useState } from 'react';
import { Button } from '../ui/Button';

export function DangerZoneSection() {
  const [confirmText, setConfirmText] = useState('');

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--red)' }}>Danger Zone</h2>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>Irreversible actions</p>

      <div style={{ padding: '16px', borderRadius: 'var(--r-md)', border: '1px solid var(--red-soft)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>Delete Academy</h3>
        <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>
          This will permanently delete your academy and all associated data. This action cannot be undone.
        </p>
        <input
          type="text"
          placeholder='Type "DELETE" to confirm'
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          className="input-field"
          style={{ marginBottom: 12, maxWidth: 300 }}
        />
        <div>
          <Button variant="danger" disabled={confirmText !== 'DELETE'}>
            Delete Academy
          </Button>
        </div>
      </div>
    </div>
  );
}
