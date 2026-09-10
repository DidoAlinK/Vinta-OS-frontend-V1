import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../utils/initials';
import { AVATAR_PRESETS } from '../../utils/avatar';
import { Button } from '../ui/Button';

export function AccountSection() {
  const { user } = useAuth();
  const [pin, setPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const preset = AVATAR_PRESETS[0];

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>My Account</h2>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>Manage your personal profile</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, padding: '16px', borderRadius: 'var(--r-md)', border: '1px solid var(--divider)' }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: `linear-gradient(150deg, ${preset[0]}, ${preset[1]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700 }}>
          {getInitials(user?.name || 'U')}
        </div>
        <div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{user?.name || 'User'}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'capitalize' }}>{user?.role || 'staff'}</div>
        </div>
      </div>

      <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>Change PIN</h3>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <input type="password" placeholder="Current PIN" value={pin} onChange={(e) => setPin(e.target.value)} className="input-field" maxLength={4} style={{ flex: 1 }} />
        <input type="password" placeholder="New PIN" value={newPin} onChange={(e) => setNewPin(e.target.value)} className="input-field" maxLength={4} style={{ flex: 1 }} />
      </div>
      <Button variant="confirm">Update PIN</Button>
    </div>
  );
}
