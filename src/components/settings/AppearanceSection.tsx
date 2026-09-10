import { useThemeContext } from '../../context/ThemeContext';
import { LANGUAGE_OPTIONS, FONT_SIZE_OPTIONS } from '../../utils/constants';

export function AppearanceSection() {
  const { theme, setTheme, fontSize, setFontSize, language, setLanguage } = useThemeContext();

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Appearance</h2>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>Customize the look and feel of your academy</p>

      {/* Theme */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Theme</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['light', 'dark', 'system'] as const).map((t) => (
            <button key={t} onClick={() => setTheme(t)} style={{
              padding: '10px 20px', borderRadius: 'var(--r-sm)', fontSize: 13,
              background: theme === t ? 'linear-gradient(150deg, var(--gold), var(--emerald))' : 'var(--glass)',
              color: theme === t ? '#fff' : 'var(--muted)',
              border: '1px solid var(--glass-border)', cursor: 'pointer', fontFamily: 'Inter, sans-serif', textTransform: 'capitalize',
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Font Size</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {FONT_SIZE_OPTIONS.map((opt) => (
            <button key={opt.value} onClick={() => setFontSize(opt.value)} style={{
              padding: '10px 20px', borderRadius: 'var(--r-sm)', fontSize: 13,
              background: fontSize === opt.value ? 'linear-gradient(150deg, var(--gold), var(--emerald))' : 'var(--glass)',
              color: fontSize === opt.value ? '#fff' : 'var(--muted)',
              border: '1px solid var(--glass-border)', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            }}>{opt.label}</button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div>
        <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Language</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {LANGUAGE_OPTIONS.map((opt) => (
            <button key={opt.value} onClick={() => setLanguage(opt.value)} style={{
              padding: '10px 20px', borderRadius: 'var(--r-sm)', fontSize: 13,
              background: language === opt.value ? 'linear-gradient(150deg, var(--gold), var(--emerald))' : 'var(--glass)',
              color: language === opt.value ? '#fff' : 'var(--muted)',
              border: '1px solid var(--glass-border)', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            }}>{opt.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
