import { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { authApi } from '../../api/auth';
import { AVATAR_PRESETS } from '../../utils/avatar';
import { getInitials } from '../../utils/initials';
import type { User } from '../../types';

interface Props {
  onClose: () => void;
}

export function CreateProfileModal({ onClose }: Props) {
  const { setProfiles, profiles } = useAuthContext();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+213');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [role, setRole] = useState<'owner' | 'staff'>('staff');
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const preset = AVATAR_PRESETS[selectedPreset];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 4) { setError('PIN must be 4 digits'); return; }
    if (pin !== confirmPin) { setError('PINs do not match'); return; }
    setLoading(true);
    setError('');
    try {
      // Call the backend to create the profile
      const res = await authApi.createProfile({ name, pin, role, phone }) as any;

      // Build the new profile from the response
      const newProfile: User = {
        id: res.id,
        academy_id: res.academy_id || localStorage.getItem('vinta_academy_id') || '',
        name: res.name || name,
        email: '',
        phone,
        role: res.role || role,
        avatar_colors: preset as [string, string],
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setProfiles([...profiles, newProfile]);
      onClose();
    } catch (err: any) {
      const msg = err.response?.data?.error || err.response?.data?.message || err.message || 'Failed to create profile';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="glass" style={{
        width: 440, borderRadius: 'var(--r-lg)', padding: 28,
        animation: 'fadeInUp 0.25s ease-out',
      }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>
          Create Profile
        </h2>

        {/* Avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 18,
            background: `linear-gradient(150deg, ${preset[0]}, ${preset[1]})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, color: '#fff',
            marginBottom: 12,
          }}>
            {name ? getInitials(name) : '?'}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {AVATAR_PRESETS.map((p, i) => (
              <button
                key={i}
                onClick={() => setSelectedPreset(i)}
                style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: `linear-gradient(150deg, ${p[0]}, ${p[1]})`,
                  border: selectedPreset === i ? '2px solid var(--gold)' : '2px solid transparent',
                  cursor: 'pointer', transition: 'border-color 0.2s',
                }}
              />
            ))}
          </div>
        </div>

        {error && (
          <div style={{ padding: 10, borderRadius: 'var(--r-sm)', background: 'var(--red-soft)', color: 'var(--red)', fontSize: 13, marginBottom: 14 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="tel"
            placeholder="Phone (+213)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input-field"
          />

          {/* Role selector */}
          <div style={{ display: 'flex', gap: 8 }}>
            {(['staff', 'owner'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                style={{
                  flex: 1, padding: 10, borderRadius: 'var(--r-sm)',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  border: '1px solid var(--glass-border)',
                  background: role === r
                    ? 'linear-gradient(150deg, var(--gold), var(--emerald))'
                    : 'var(--glass)',
                  color: role === r ? '#fff' : 'var(--muted)',
                  fontFamily: 'Inter, sans-serif', textTransform: 'capitalize',
                  transition: 'all 0.2s',
                }}
              >
                {r === 'owner' ? '👑 Owner' : '🧑‍🏫 Staff'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <input
              type="password"
              placeholder="PIN (4 digits)"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="input-field"
              maxLength={4}
              required
            />
            <input
              type="password"
              placeholder="Confirm PIN"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="input-field"
              maxLength={4}
              required
            />
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button type="button" onClick={onClose} className="ghost-btn" style={{ flex: 1, padding: 12 }}>
              Cancel
            </button>
            <button type="submit" className="confirm-btn" style={{ flex: 1, padding: 12 }} disabled={loading}>
              {loading ? 'Creating…' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
