import { useState, useEffect } from 'react';
import type { Teacher, TeacherDetail } from '../../types';
import { teachersApi } from '../../api/teachers';
import { getInitials } from '../../utils/initials';
import { AVATAR_PRESETS } from '../../utils/avatar';
import { formatDZD } from '../../utils/currency';

interface Props { teacher: Teacher; onClose: () => void; }

export function TeacherDrawer({ teacher, onClose }: Props) {
  const [detail, setDetail] = useState<TeacherDetail | null>(null);
  useEffect(() => { teachersApi.get(teacher.id).then(setDetail).catch(() => null); }, [teacher.id]);
  const preset = AVATAR_PRESETS[(teacher.id.charCodeAt(1) + 2) % AVATAR_PRESETS.length];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'flex-end' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="glass" style={{ width: 400, maxWidth: '90vw', height: '100%', borderRadius: 'var(--r-lg) 0 0 var(--r-lg)', padding: 24, overflow: 'auto', animation: 'slideInRight 0.3s ease-out' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: `linear-gradient(150deg, ${preset[0]}, ${preset[1]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700 }}>
              {getInitials(`${teacher.first_name} ${teacher.last_name}`)}
            </div>
            <div>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>{teacher.first_name} {teacher.last_name}</h2>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{teacher.subject || 'General'} · {teacher.contract_type}</div>
            </div>
          </div>
          <button onClick={onClose} className="icon-btn"><svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 5l10 10"/><path d="M15 5L5 15"/></svg></button>
        </div>

        {/* Payroll summary */}
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>Payroll</h3>
          <div style={{ padding: '12px 14px', borderRadius: 'var(--r-sm)', border: '1px solid var(--divider)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>Total Hours</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{teacher.total_hours || 0}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>Rate</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{teacher.contract_type === 'hourly' ? formatDZD(teacher.hourly_rate || 0) + '/hr' : formatDZD(teacher.per_student_rate || 0) + '/student'}</span>
            </div>
          </div>
        </div>

        {/* Payroll history */}
        {detail?.payroll && detail.payroll.length > 0 && (
          <div>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>History</h3>
            {detail.payroll.map((p) => (
              <div key={p.id} style={{ padding: '10px 14px', borderRadius: 'var(--r-sm)', border: '1px solid var(--divider)', marginBottom: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{p.month}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: p.status === 'settled' ? 'var(--emerald)' : 'var(--gold)' }}>{formatDZD(p.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
