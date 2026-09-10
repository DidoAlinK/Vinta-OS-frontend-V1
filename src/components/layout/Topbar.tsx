import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import { ThemeToggle } from './ThemeToggle';
import { getInitials } from '../../utils/initials';
import { generateAvatarGradient } from '../../utils/avatar';

interface TopbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  showEntityFilter?: boolean;
  entityFilter?: string;
  showStatusFilter?: boolean;
  statusFilter?: string;
  onStatusFilterChange?: (value: string) => void;
}

const STATUS_OPTIONS = ['All', 'Present', 'Absent'];

export function Topbar({
  searchValue, onSearchChange,
  showEntityFilter, entityFilter = 'All',
  showStatusFilter, statusFilter = 'All', onStatusFilterChange,
}: TopbarProps) {
  const { user } = useAuth();
  const { unreadCount } = useNotifications();
  const avatarColors = user?.avatar_colors || ['#b3872a', '#0f6b4d'];
  const initials = user ? getInitials(user.name) : '?';

  return (
    <header className="glass" style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 16px',
      borderRadius: 'var(--r-lg)',
      minHeight: 56,
      flexShrink: 0,
    }}>
      {/* Search */}
      <div style={{
        flex: '0 1 260px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '9px 14px',
        borderRadius: 'var(--r-sm)',
        background: 'var(--input-bg)',
        border: '1px solid var(--divider)',
      }}>
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--muted)', flexShrink: 0 }}>
          <circle cx="8.5" cy="8.5" r="5.5" />
          <path d="M12.5 12.5L17 17" />
        </svg>
        <input
          type="text"
          placeholder="Search…"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            border: 'none',
            background: 'transparent',
            fontSize: 13,
            color: 'var(--text)',
            fontFamily: 'Inter, sans-serif',
            outline: 'none',
            width: '100%',
          }}
        />
      </div>

      {/* Entity filter */}
      {showEntityFilter && (
        <div className="hide-mobile" style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 12px', borderRadius: '100px',
          fontSize: 12, background: 'var(--glass)',
          border: '1px solid var(--glass-border)',
          cursor: 'pointer', color: 'var(--text)',
          fontFamily: 'Inter, sans-serif',
          position: 'relative',
        }}>
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M2 3h16M5 8h10M8 13h4"/>
          </svg>
          {entityFilter}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 4.5L6 7.5L9 4.5"/>
          </svg>
        </div>
      )}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Status filter chips */}
      {showStatusFilter && (
        <div className="hide-mobile" style={{ display: 'flex', gap: 6 }}>
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => onStatusFilterChange?.(opt)}
              style={{
                padding: '8px 13px',
                borderRadius: '100px',
                fontSize: 12,
                fontWeight: 500,
                color: statusFilter === opt ? '#fff' : 'var(--muted)',
                background: statusFilter === opt ? 'linear-gradient(150deg, var(--gold), var(--emerald))' : 'var(--glass)',
                border: statusFilter === opt ? '1px solid transparent' : '1px solid var(--glass-border)',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Bell */}
      <button style={{
        position: 'relative',
        width: 34, height: 34,
        borderRadius: 'var(--r-sm)',
        border: '1px solid var(--glass-border)',
        background: 'var(--glass)',
        color: 'var(--muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}>
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 17a2 2 0 004 0"/>
          <path d="M10 2a6 6 0 016 6c0 3.5 1 5.5 2 6H2c1-.5 2-2.5 2-6a6 6 0 016-6"/>
        </svg>
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: -2, right: -2,
            minWidth: 16, height: 16,
            padding: '0 4px',
            borderRadius: 100,
            background: 'var(--red)',
            color: '#fff',
            fontFamily: 'Space Grotesk',
            fontSize: 9,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* User pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '4px 14px 4px 4px',
        borderRadius: 100,
        border: '1px solid var(--glass-border)',
        background: 'var(--glass)',
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: generateAvatarGradient(avatarColors as [string, string]),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontFamily: 'Space Grotesk', fontSize: 11, fontWeight: 700,
        }}>
          {initials}
        </div>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>
            {user?.name || 'User'}
          </div>
          <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'capitalize', color: 'var(--muted)' }}>
            {user?.role || 'staff'}
          </div>
        </div>
      </div>
    </header>
  );
}
