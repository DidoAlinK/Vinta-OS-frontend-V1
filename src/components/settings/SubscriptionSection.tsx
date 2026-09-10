export function SubscriptionSection() {
  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Subscription</h2>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>Manage your subscription plan</p>

      <div style={{ padding: '20px', borderRadius: 'var(--r-md)', border: '1px solid var(--divider)', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, color: 'var(--emerald)', marginBottom: 4 }}>Pro Plan</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>Active · Renews Dec 2026</div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', fontSize: 12, color: 'var(--muted)' }}>
          <span>50 Students</span>·<span>10 Teachers</span>·<span>Unlimited Classes</span>
        </div>
      </div>
    </div>
  );
}
