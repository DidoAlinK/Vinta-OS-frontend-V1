export function SuccessScreen() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#131315',
    }}>
      <div style={{ textAlign: 'center', animation: 'fadeInUp 0.5s ease-out' }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'linear-gradient(150deg, var(--gold), var(--emerald))',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 20,
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 style={{
          fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700,
          color: '#fff', marginBottom: 8,
        }}>
          Welcome back!
        </h1>
        <p style={{ fontSize: 14, color: '#9497a1' }}>
          Loading your academy…
        </p>
      </div>
    </div>
  );
}
