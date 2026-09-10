import { useEffect, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
  maxWidth?: string;
  zIndex?: number;
}

export function Modal({ open, onClose, children, width, maxWidth, zIndex = 1000 }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex,
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="glass"
        style={{
          width: width || '90%',
          maxWidth: maxWidth || '500px',
          maxHeight: '85vh',
          borderRadius: 'var(--r-lg)',
          padding: '24px',
          overflow: 'auto',
          animation: 'fadeInUp 0.25s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}
