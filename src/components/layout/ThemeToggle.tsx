import { useThemeContext } from '../../context/ThemeContext';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useThemeContext();
  const isDark = resolvedTheme === 'dark';

  const toggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div
      className={`theme-toggle ${isDark ? 'dark' : ''}`}
      onClick={toggle}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle(); }}
      role="button"
      tabIndex={0}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: 100,
        padding: 5,
        position: 'relative',
        width: 60,
        height: 30,
        flexShrink: 0,
        background: 'var(--glass)',
        border: '1px solid var(--glass-border)',
      }}
    >
      <div style={{
        width: 20, height: 20,
        borderRadius: '50%',
        background: 'linear-gradient(160deg, var(--gold), var(--emerald))',
        position: 'absolute',
        top: 4,
        left: isDark ? 34 : 4,
        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
      }} />
      <span style={{
        fontSize: 10,
        color: 'var(--muted)',
        width: 13,
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>☀</span>
      <span style={{
        fontSize: 10,
        color: 'var(--muted)',
        width: 13,
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        marginLeft: 'auto',
      }}>☾</span>
    </div>
  );
}
