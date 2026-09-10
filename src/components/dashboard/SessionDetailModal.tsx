import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { attendanceApi } from '../../api/attendance';
import type { Session, SessionStudent } from '../../types';
import { formatTime12 } from '../../utils/dates';
import { calendarApi } from '../../api/calendar';

interface Props {
  session: Session;
  onClose: () => void;
}

export function SessionDetailModal({ session, onClose }: Props) {
  const [students, setStudents] = useState<SessionStudent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    calendarApi.getSessionStudents(session.id)
      .then(setStudents)
      .catch(() => setStudents([]))
      .finally(() => setLoading(false));
  }, [session.id]);

  const handlePresence = async (studentId: string, isPresent: boolean) => {
    try {
      await attendanceApi.setPresence(session.id, studentId, isPresent);
      setStudents((prev) => prev.map((s) =>
        s.student_id === studentId ? { ...s, is_present: isPresent } : s
      ));
    } catch { /* ignore */ }
  };

  const handlePayment = async (studentId: string) => {
    const current = students.find((s) => s.student_id === studentId);
    if (!current) return;
    const next = current.payment_status === 'paid' ? 'due' : current.payment_status === 'due' ? 'overdue' : 'paid';
    try {
      await attendanceApi.setPayment(session.id, studentId, next);
      setStudents((prev) => prev.map((s) =>
        s.student_id === studentId ? { ...s, payment_status: next as any } : s
      ));
    } catch { /* ignore */ }
  };

  const presentCount = students.filter((s) => s.is_present).length;
  const paidCount = students.filter((s) => s.payment_status === 'paid').length;

  return (
    <Modal open={true} onClose={onClose} width="560px" maxWidth="92vw">
      <div style={{ padding: '4px 0' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>
            {session.subject || session.class_name}
          </h2>
          <Badge status={session.status}>{session.status}</Badge>
        </div>

        {/* Info chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          {[
            { icon: '🕐', label: `${formatTime12(session.start_time)} – ${formatTime12(session.end_time)}` },
            { icon: '👤', label: session.teacher_name || 'No teacher' },
            { icon: '🏫', label: session.classroom_name || 'No room' },
            { icon: '📅', label: session.date },
          ].map((chip) => (
            <div key={chip.label} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 100,
              background: 'var(--glass)', border: '1px solid var(--divider)',
              fontSize: 12, color: 'var(--muted)',
            }}>
              <span>{chip.icon}</span> {chip.label}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <div style={{ padding: '8px 14px', borderRadius: 'var(--r-sm)', background: 'var(--emerald-soft)', fontSize: 12, color: 'var(--emerald)', fontWeight: 600 }}>
            ✓ {presentCount} Present
          </div>
          <div style={{ padding: '8px 14px', borderRadius: 'var(--r-sm)', background: 'var(--gold-soft)', fontSize: 12, color: 'var(--gold)', fontWeight: 600 }}>
            💳 {paidCount} Paid
          </div>
        </div>

        {/* Student roster */}
        <div style={{ maxHeight: 300, overflow: 'auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 20, color: 'var(--muted)', fontSize: 13 }}>Loading students…</div>
          ) : students.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 20, color: 'var(--muted)', fontSize: 13 }}>No students enrolled</div>
          ) : (
            students.map((s) => (
              <div key={s.student_id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 'var(--r-sm)',
                border: '1px solid var(--divider)', margin: '4px 0',
              }}>
                {/* Checkbox */}
                <button
                  onClick={() => handlePresence(s.student_id, !s.is_present)}
                  style={{
                    width: 22, height: 22, borderRadius: 6,
                    border: `2px solid ${s.is_present ? 'var(--gold)' : 'var(--divider)'}`,
                    background: s.is_present ? 'var(--gold)' : 'transparent',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {s.is_present && <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2"><polyline points="2,6 5,9 10,3"/></svg>}
                </button>

                {/* Name */}
                <span style={{ flex: 1, fontSize: 13, color: 'var(--text)' }}>
                  {s.student_name || `Student ${s.student_id.slice(0, 6)}`}
                </span>

                {/* Payment badge */}
                <button
                  onClick={() => handlePayment(s.student_id)}
                  style={{
                    padding: '3px 10px', borderRadius: 100,
                    fontSize: 11, fontWeight: 600, cursor: 'pointer',
                    border: 'none',
                    color: s.payment_status === 'paid' ? 'var(--emerald)' : s.payment_status === 'due' ? 'var(--gold)' : 'var(--red)',
                    background: s.payment_status === 'paid' ? 'var(--emerald-soft)' : s.payment_status === 'due' ? 'var(--gold-soft)' : 'var(--red-soft)',
                    fontFamily: 'Space Grotesk',
                  }}
                >
                  {s.payment_status}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
}
