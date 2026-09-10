import { useState } from 'react';
import { Button } from '../ui/Button';

export function AcademySection() {
  const [name, setName] = useState('École Al Amal');
  const [phone, setPhone] = useState('+213 555 000 000');
  const [email, setEmail] = useState('admin@ecole-alamal.dz');
  const [address, setAddress] = useState('123 Rue Didouche Mourad, Algiers');

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Academy Profile</h2>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>Edit your academy information</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" placeholder="Academy Name" />
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" placeholder="Phone" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="Email" />
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="input-field" placeholder="Address" rows={3} style={{ resize: 'vertical' }} />
        <div>
          <Button variant="confirm">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
