import React from 'react';
import { useState } from 'react';
import { SettingsNav } from './SettingsNav';
import { AppearanceSection } from './AppearanceSection';
import { AccountSection } from './AccountSection';
import { AcademySection } from './AcademySection';
import { StaffSection } from './StaffSection';
import { BillingConfigSection } from './BillingConfigSection';
import { AutomationsSection } from './AutomationsSection';
import { ExportSection } from './ExportSection';
import { SubscriptionSection } from './SubscriptionSection';
import { DangerZoneSection } from './DangerZoneSection';
import { useAuth } from '../../hooks/useAuth';

interface Props { open: boolean; onClose: () => void; }

export function SettingsFlyout({ open, onClose }: Props) {
  const [section, setSection] = useState('appearance');
  const { user } = useAuth();
  const isOwner = user?.role === 'owner';

  if (!open) return null;

  const sections: Record<string, React.JSX.Element> = {
    appearance: <AppearanceSection />,
    account: <AccountSection />,
    academy: <AcademySection />,
    staff: <StaffSection />,
    'billing-config': <BillingConfigSection />,
    automations: <AutomationsSection />,
    export: <ExportSection />,
    subscription: <SubscriptionSection />,
    danger: <DangerZoneSection />,
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 8000,
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="glass" style={{
        maxWidth: 920, width: '92vw', height: 'min(680px, 88vh)',
        borderRadius: 'var(--r-xl)', display: 'flex', overflow: 'hidden',
        animation: 'fadeInUp 0.25s ease-out',
      }}>
        <SettingsNav active={section} onChange={setSection} isOwner={isOwner} />
        <div style={{ flex: 1, padding: '24px 28px', overflow: 'auto' }}>
          <button onClick={onClose} style={{
            position: 'absolute', top: 16, right: 16, background: 'none', border: 'none',
            cursor: 'pointer', color: 'var(--muted)', padding: 4, zIndex: 10,
          }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 5l10 10"/><path d="M15 5L5 15"/></svg>
          </button>
          {sections[section] || <AppearanceSection />}
        </div>
      </div>
    </div>
  );
}
