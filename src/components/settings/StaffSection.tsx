import { useEffect, useState } from 'react';
import { settingsApi } from '../../api/settings';
import type { User } from '../../types';
import { getInitials } from '../../utils/initials';
import { Button } from '../ui/Button';

export function StaffSection() {
  const [staff, setStaff] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    settingsApi.getStaff().then(setStaff).catch(() => setStaff([])).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Staff & Roles</h2>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>Manage staff access and roles</p>

      {loading ? <div style={{ color: 'var(--muted)', fontSize: 13 }}>Loading…</div> : (
        <div>
          {staff.map((s) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 'var(--r-sm)', border: '1px solid var(--divider)', marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gold-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', fontFamily: 'Space Grotesk', fontSize: 12, fontWeight: 700 }}>
                {getInitials(s.name)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{s.name}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'capitalize' }}>{s.role}</div>
              </div>
              <div style={{ padding: '3px 10px', borderRadius: 100, fontSize: 11, background: s.is_active ? 'var(--emerald-soft)' : 'var(--red-soft)', color: s.is_active ? 'var(--emerald)' : 'var(--red)' }}>
                {s.is_active ? 'Active' : 'Inactive'}
              </div>
            </div>
          ))}
          <Button variant="ghost" style={{ marginTop: 12 }}>+ Add Staff Member</Button>
        </div>
      )}
    </div>
  );
}
