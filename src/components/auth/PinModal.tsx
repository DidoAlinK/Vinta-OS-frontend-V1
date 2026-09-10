import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface Props {
  profileName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PinModal({ profileName, onSuccess, onCancel }: Props) {
  const { verifyPin } = useAuth();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleKey = useCallback((digit: string) => {
    if (pin.length >= 4) return;
    const newPin = pin + digit;
    setPin(newPin);
    setError(false);

    if (newPin.length === 4) {
      // Auto-submit after 300ms
      setTimeout(() => {
        handleSubmit(newPin);
      }, 300);
    }
  }, [pin]);

  const handleBackspace = useCallback(() => {
    setPin((p) => p.slice(0, -1));
    setError(false);
  }, []);

  const handleSubmit = async (submittedPin?: string) => {
    const p = submittedPin || pin;
    if (p.length !== 4) return;
    try {
      await verifyPin(p);
      onSuccess();
    } catch {
      setError(true);
      setTimeout(() => {
        setPin('');
        setError(false);
      }, 600);
    }
  };

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') handleKey(e.key);
      else if (e.key === 'Backspace') handleBackspace();
      else if (e.key === 'Enter' && pin.length === 4) handleSubmit();
      else if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleKey, handleBackspace, pin, onCancel]);

  const numpad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['⌫', '0', '✓'],
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div
        className={`glass pin-modal ${error ? 'shake' : ''}`}
        style={{
          maxWidth: 340, width: '90%', borderRadius: 'var(--r-xl)',
          padding: '32px 28px', textAlign: 'center',
          animation: error ? 'shake 0.5s ease-in-out' : 'fadeInUp 0.25s ease-out',
        }}
      >
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>
          Enter your PIN
        </h2>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
          4-digit PIN for {profileName}
        </p>

        {/* PIN dots */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', margin: '24px 0' }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: 48, height: 48, borderRadius: '50%',
                border: `2px solid ${i < pin.length ? 'var(--gold)' : 'var(--glass-border)'}`,
                background: i < pin.length ? 'var(--gold)' : 'var(--glass)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              {i < pin.length && (
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#fff' }} />
              )}
            </div>
          ))}
        </div>

        {/* Numpad */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, maxWidth: 260, margin: '0 auto' }}>
          {numpad.flat().map((key) => (
            <button
              key={key}
              onClick={() => {
                if (key === '⌫') handleBackspace();
                else if (key === '✓') handleSubmit();
                else handleKey(key);
              }}
              style={{
                width: '100%', aspectRatio: '1.4',
                borderRadius: 'var(--r-md)',
                border: key === '✓' ? 'none' : '1px solid var(--glass-border)',
                background: key === '✓' ? 'linear-gradient(150deg, var(--gold), var(--emerald))' : 'var(--glass)',
                fontFamily: 'Space Grotesk',
                fontSize: key === '✓' || key === '⌫' ? 14 : 22,
                fontWeight: 600,
                color: key === '✓' ? '#fff' : 'var(--text)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'transform 0.15s',
              }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)'; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              {key}
            </button>
          ))}
        </div>

        <button
          onClick={onCancel}
          style={{
            marginTop: 16, background: 'none', border: 'none',
            color: 'var(--muted)', fontSize: 13, cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
