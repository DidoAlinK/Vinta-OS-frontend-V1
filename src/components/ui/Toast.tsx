import type { Toast as ToastType } from '../../types';
import { TOAST_ICONS } from '../../utils/constants';

interface ToastItemProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

export function ToastItem({ toast, onDismiss }: ToastItemProps) {
  return (
    <div className="toast" onClick={() => onDismiss(toast.id)} style={{ animation: 'fadeInUp 0.3s ease-out' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <span style={{ fontSize: 18, lineHeight: 1 }}>{TOAST_ICONS[toast.type] || 'ℹ️'}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text)' }}>
            {toast.title}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
            {toast.message}
          </div>
          {toast.detail && (
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
              {toast.detail}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ToastStack({ toasts, onDismiss }: { toasts: ToastType[]; onDismiss: (id: string) => void }) {
  if (toasts.length === 0) return null;
  return (
    <div className="toast-stack">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
