interface NavGroup { group: string; items: { id: string; label: string; ownerOnly: boolean }[]; }

const SETTINGS_NAV: NavGroup[] = [
  { group: 'General', items: [
    { id: 'appearance', label: 'Appearance', ownerOnly: false },
    { id: 'account', label: 'My Account', ownerOnly: false },
  ]},
  { group: 'Academy', items: [
    { id: 'academy', label: 'Academy Profile', ownerOnly: true },
    { id: 'staff', label: 'Staff & Roles', ownerOnly: true },
    { id: 'billing-config', label: 'Billing Configuration', ownerOnly: true },
    { id: 'automations', label: 'Automations', ownerOnly: true },
  ]},
  { group: 'Other', items: [
    { id: 'export', label: 'Data & Export', ownerOnly: false },
    { id: 'subscription', label: 'Subscription', ownerOnly: true },
    { id: 'danger', label: 'Danger Zone', ownerOnly: true },
  ]},
];

import React from 'react';

interface Props { active: string; onChange: (id: string) => void; isOwner: boolean; }

const navIcons: Record<string, React.JSX.Element> = {
  appearance: <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="10" r="4"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.93 4.93l1.41 1.41M13.66 13.66l1.41 1.41M4.93 15.07l1.41-1.41M13.66 6.34l1.41-1.41"/></svg>,
  account: <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="7" r="4"/><path d="M3 18c0-3.87 3.13-7 7-7s7 3.13 7 7"/></svg>,
  academy: <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="14" height="14" rx="2"/><path d="M3 8h14"/></svg>,
  staff: <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="6" r="3"/><path d="M2 17c0-3 2.2-5 5-5s5 2 5 5"/><circle cx="14" cy="7" r="2"/><path d="M14 12c2 .5 3.5 2 3.5 5"/></svg>,
  'billing-config': <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="14" height="12" rx="2"/><path d="M3 8h14"/></svg>,
  automations: <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  export: <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3v10M6 9l4 4 4-4"/><path d="M3 14v2a1 1 0 001 1h12a1 1 0 001-1v-2"/></svg>,
  subscription: <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="16" height="11" rx="2"/><path d="M2 9h16"/></svg>,
  danger: <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
};

export function SettingsNav({ active, onChange, isOwner }: Props) {
  return (
    <div style={{ width: 230, flexShrink: 0, padding: '20px 12px', borderRight: '1px solid var(--divider)', overflowY: 'auto' }}>
      {SETTINGS_NAV.map((group) => {
        const visibleItems = group.items.filter((item) => !item.ownerOnly || isOwner);
        if (visibleItems.length === 0) return null;
        return (
          <div key={group.group} style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', padding: '16px 12px 6px' }}>
              {group.group}
            </div>
            {visibleItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 'var(--r-sm)',
                  fontSize: 13, color: active === item.id ? 'var(--text)' : 'var(--muted)',
                  background: active === item.id ? 'var(--gold-soft)' : 'transparent',
                  fontWeight: active === item.id ? 600 : 400,
                  cursor: 'pointer', width: '100%', textAlign: 'left',
                  border: 'none', fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { if (active !== item.id) { e.currentTarget.style.background = 'var(--glass)'; e.currentTarget.style.color = 'var(--text)'; } }}
                onMouseLeave={(e) => { if (active !== item.id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; } }}
              >
                {navIcons[item.id]}
                {item.label}
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );
}
