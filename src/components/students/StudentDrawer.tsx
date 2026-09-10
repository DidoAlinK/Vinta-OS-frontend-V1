import { useState, useEffect } from 'react';
import type { Student, StudentDetail } from '../../types';
import { studentsApi } from '../../api/students';
import { getInitials } from '../../utils/initials';
import { AVATAR_PRESETS } from '../../utils/avatar';
import { Badge } from '../ui/Badge';
import { formatPhone } from '../../utils/phone';
import { formatDZD } from '../../utils/currency';
import { Button } from '../ui/Button';

interface Props { student: Student; onClose: () => void; }

export function StudentDrawer({ student, onClose }: Props) {
  const [detail, setDetail] = useState<StudentDetail | null>(null);

  useEffect(() => {
    studentsApi.get(student.id).then(setDetail).catch(() => null);
  }, [student.id]);

  const preset = AVATAR_PRESETS[student.id.charCodeAt(1) % AVATAR_PRESETS.length];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
      display: 'flex', justifyContent: 'flex-end',
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="glass" style={{
        width: 400, maxWidth: '90vw', height: '100%',
        borderRadius: 'var(--r-lg) 0 0 var(--r-lg)',
        padding: 24, overflow: 'auto',
        animation: 'slideInRight 0.3s ease-out',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16,
              background: `linear-gradient(150deg, ${preset[0]}, ${preset[1]})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700,
            }}>
              {getInitials(`${student.first_name} ${student.last_name}`)}
            </div>
            <div>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>
                {student.first_name} {student.last_name}
              </h2>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
                <Badge status={student.status}>{student.status}</Badge>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="icon-btn">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 5l10 10"/><path d="M15 5L5 15"/></svg>
          </button>
        </div>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          <div style={{ padding: '10px 14px', borderRadius: 'var(--r-sm)', background: 'var(--input-bg)', border: '1px solid var(--divider)' }}>
            <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 2 }}>Phone</div>
            <div style={{ fontSize: 13, color: 'var(--text)' }}>{formatPhone(student.phone)}</div>
          </div>
        </div>

        {/* Billing */}
        {detail?.billing && detail.billing.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>Billing</h3>
            {detail.billing.map((b) => (
              <div key={b.id} style={{ padding: '10px 14px', borderRadius: 'var(--r-sm)', border: '1px solid var(--divider)', marginBottom: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{b.plan_name || 'Billing Cycle'}</span>
                  <Badge status={b.status}>{b.status}</Badge>
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                  {formatDZD(b.amount_da)} · {b.start_date} – {b.end_date}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Guardians */}
        {detail?.guardians && detail.guardians.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>Guardians</h3>
            {detail.guardians.map((g) => (
              <div key={g.id} style={{ padding: '10px 14px', borderRadius: 'var(--r-sm)', border: '1px solid var(--divider)', marginBottom: 6 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{g.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{g.relationship} · {formatPhone(g.phone)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
