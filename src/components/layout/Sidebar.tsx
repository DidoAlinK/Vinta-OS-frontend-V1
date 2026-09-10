import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { NAV_ITEMS } from '../../utils/constants';

const icons: Record<string, React.JSX.Element> = {
  dashboard: (
    <>
      <rect x="2.5" y="2.5" width="6.5" height="7" rx="2"/>
      <rect x="11" y="2.5" width="6.5" height="4.5" rx="2"/>
      <rect x="2.5" y="12" width="6.5" height="5.5" rx="2"/>
      <rect x="11" y="10.5" width="6.5" height="7" rx="2"/>
    </>
  ),
  students: (
    <>
      <circle cx="7.5" cy="6.5" r="3"/>
      <path d="M2,17.5c0-3,2.2-5,5.5-5s5.5,2,5.5,5"/>
      <circle cx="14.5" cy="7" r="2"/>
      <path d="M14,12.5c2,.5,3.5,2,3.5,4.5"/>
    </>
  ),
  teachers: (
    <>
      <circle cx="10" cy="6" r="3.5"/>
      <path d="M3.5,17c0-3.6,2.9-6,6.5-6s6.5,2.4,6.5,6"/>
    </>
  ),
  classes: (
    <>
      <rect x="2.5" y="4" width="15" height="12.5" rx="2.5"/>
      <path d="M2.5,8h15"/>
      <circle cx="5.5" cy="6" r="0.5" fill="currentColor"/>
      <circle cx="7.5" cy="6" r="0.5" fill="currentColor"/>
      <circle cx="9.5" cy="6" r="0.5" fill="currentColor"/>
    </>
  ),
  calendar: (
    <>
      <rect x="2.5" y="3.5" width="15" height="14" rx="2.5"/>
      <path d="M2.5,8h15"/>
      <path d="M6.5,2v3.5"/>
      <path d="M13.5,2v3.5"/>
    </>
  ),
  billing: (
    <>
      <rect x="3" y="4.5" width="14" height="11.5" rx="2"/>
      <path d="M3,8.5h14"/>
      <path d="M7,12.5h3"/>
    </>
  ),
  settings: (
    <>
      <circle cx="10" cy="10" r="2.5"/>
      <path d="M10,1.5l1.1,2.5a6.5,6.5,0,0,1,2.2,1.3l2.7-.6,1.7,3-1.5,1.9a6.5,6.5,0,0,1,0,2.6l1.5,1.9-1.7,3-2.7-.6a6.5,6.5,0,0,1-2.2,1.3L10,18.5l-1.1-2.5a6.5,6.5,0,0,1-2.2-1.3l-2.7.6-1.7-3,1.5-1.9a6.5,6.5,0,0,1,0-2.6L3.4,5.4,5.1,2.4l2.7.6A6.5,6.5,0,0,1,10,1.5Z"/>
    </>
  ),
};

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isStaff = user?.role === 'staff';

  // Filter nav items for staff (hide billing and settings)
  const visibleItems = isStaff
    ? NAV_ITEMS.filter((item) => item.id !== 'billing' && item.id !== 'settings')
    : [...NAV_ITEMS];

  // Close mobile sidebar on resize
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 900) setMobileOpen(false);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const handleNav = (tab: string) => {
    onTabChange(tab);
    setMobileOpen(false);
  };

  const navContent = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 4px', marginBottom: 28 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 11,
          background: 'linear-gradient(150deg, var(--gold), var(--emerald))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontFamily: 'Space Grotesk', fontSize: 14, fontWeight: 700,
        }}>V</div>
        <div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: 14.5, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>
            Vinta School
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 500, color: 'var(--muted)' }}>
            Management OS
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav style={{ flex: 1 }}>
        {visibleItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNav(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 11,
              padding: '11px 14px',
              margin: '2px 0',
              borderRadius: 'var(--r-sm)',
              fontSize: 13.5,
              fontWeight: activeTab === item.id ? 600 : 500,
              color: activeTab === item.id ? 'var(--text)' : 'var(--muted)',
              background: activeTab === item.id ? 'var(--gold-soft)' : 'transparent',
              border: activeTab === item.id ? '1px solid var(--glass-border)' : '1px solid transparent',
              boxShadow: activeTab === item.id ? 'inset 0 0 0 1px var(--glass-border)' : 'none',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== item.id) {
                e.currentTarget.style.color = 'var(--text)';
                e.currentTarget.style.background = 'rgba(255,255,255,.06)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== item.id) {
                e.currentTarget.style.color = 'var(--muted)';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {icons[item.id]}
            </svg>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 11,
          padding: '11px 14px',
          borderRadius: 'var(--r-sm)',
          fontSize: 13.5,
          fontWeight: 500,
          color: 'var(--muted)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          marginTop: 'auto',
          transition: 'color 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--red)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; }}
      >
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17H4a2 2 0 01-2-2V5a2 2 0 012-2h3"/>
          <polyline points="14 14 18 10 14 6"/>
          <line x1="18" y1="10" x2="8" y2="10"/>
        </svg>
        Logout
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hide-mobile" style={{
        width: 222,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 0',
      }}>
        <div className="glass" style={{
          padding: '16px 12px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {navContent}
        </div>
      </div>

      {/* Mobile hamburger */}
      <button
        className="hide-desktop"
        onClick={() => setMobileOpen(true)}
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1100,
          width: 40,
          height: 40,
          borderRadius: 'var(--r-sm)',
          background: 'rgba(255,255,255,0.45)',
          backdropFilter: 'blur(22px) saturate(180%)',
          WebkitBackdropFilter: 'blur(22px) saturate(180%)',
          border: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--text)',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M4 6h12M4 10h12M4 14h12"/>
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="hide-desktop"
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1040,
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className="hide-desktop"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1050,
          width: 260,
          height: '100%',
          padding: 16,
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-110%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="glass" style={{
          padding: '16px 12px',
          height: '100%',
          borderRadius: `0 var(--r-lg) var(--r-lg) 0`,
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'absolute',
              top: 16,
              right: 12,
              width: 30,
              height: 30,
              borderRadius: 'var(--r-xs)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 5l10 10"/><path d="M15 5L5 15"/>
            </svg>
          </button>
          {navContent}
        </div>
      </div>
    </>
  );
}
