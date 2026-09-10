import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export function AuthScreen() {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [academyName, setAcademyName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login({ email, password });
      } else {
        await signup({ name: academyName, email, password });
      }
    } catch (err: any) {
      const msg = err.response?.data?.error || err.response?.data?.message || err.message || 'An error occurred';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: 'var(--bg)', backgroundImage: 'var(--bg-grad)',
      padding: 20,
    }}>
      <div className="glass" style={{
        maxWidth: 400, width: '100%', borderRadius: 'var(--r-xl)',
        padding: '36px 32px', animation: 'fadeInUp 0.4s ease-out',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: 'linear-gradient(150deg, var(--gold), var(--emerald))',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700,
            marginBottom: 12,
          }}>V</div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>
            Vinta School OS
          </h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
            {mode === 'login' ? 'Sign in to your academy' : 'Create your academy'}
          </p>
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', gap: 3, padding: 3, borderRadius: 100, background: 'var(--glass-strong)', border: '1px solid var(--glass-border)', marginBottom: 24 }}>
          {(['login', 'signup'] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); }}
              style={{
                flex: 1, padding: '8px', borderRadius: 100, border: 'none',
                background: mode === m ? 'linear-gradient(150deg, var(--gold), var(--emerald))' : 'transparent',
                color: mode === m ? '#fff' : 'var(--muted)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', transition: 'all 0.2s',
              }}
            >
              {m === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div style={{
            padding: 10, borderRadius: 'var(--r-sm)', background: 'var(--red-soft)',
            color: 'var(--red)', fontSize: 13, marginBottom: 16,
            animation: 'shake 0.5s ease-in-out',
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Academy Name"
              value={academyName}
              onChange={(e) => setAcademyName(e.target.value)}
              className="input-field"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              style={{ paddingRight: 44 }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)',
                padding: 4,
              }}
            >
              {showPassword ? '🙈' : '👁'}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="confirm-btn"
            style={{
              width: '100%', padding: 14, fontSize: 15,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Academy'}
          </button>
        </form>
      </div>
    </div>
  );
}
