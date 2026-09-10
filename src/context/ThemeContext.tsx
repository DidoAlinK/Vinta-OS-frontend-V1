import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';
type FontSize = 'small' | 'normal' | 'large';
type Language = 'en' | 'fr' | 'ar';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolvedTheme: 'light' | 'dark';
  fontSize: FontSize;
  setFontSize: (s: FontSize) => void;
  language: Language;
  setLanguage: (l: Language) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function loadSetting<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(`vinta_${key}`);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => loadSetting('theme', 'light'));
  const [fontSize, setFontSizeState] = useState<FontSize>(() => loadSetting('fontSize', 'normal'));
  const [language, setLanguageState] = useState<Language>(() => loadSetting('language', 'fr'));

  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;

  // Apply theme to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);

  // Apply font size to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-fontsize', fontSize);
  }, [fontSize]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      document.documentElement.setAttribute('data-theme', getSystemTheme());
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem('vinta_theme', JSON.stringify(t));
  }, []);

  const setFontSize = useCallback((s: FontSize) => {
    setFontSizeState(s);
    localStorage.setItem('vinta_fontSize', JSON.stringify(s));
  }, []);

  const setLanguage = useCallback((l: Language) => {
    setLanguageState(l);
    localStorage.setItem('vinta_language', JSON.stringify(l));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, fontSize, setFontSize, language, setLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used within ThemeProvider');
  return ctx;
}
