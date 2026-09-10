import type { Student, Teacher, Class, Session, BillingStats, OverdueAccount, RevenueDataPoint, Activity } from '../types';

// ── Students ──
export const MOCK_STUDENTS: Student[] = [
  { id: 'st-001', first_name: 'Amina', last_name: 'Benali', phone: '+213555001001', parent_phone: '+213555002001', status: 'paid', is_active: true, academy_id: 'acad-001', created_at: '2026-01-15T00:00:00Z', updated_at: '2026-09-01T00:00:00Z' },
  { id: 'st-002', first_name: 'Yacine', last_name: 'Khelifi', phone: '+213555001002', parent_phone: '+213555002002', status: 'paid', is_active: true, academy_id: 'acad-001', created_at: '2026-01-15T00:00:00Z', updated_at: '2026-09-01T00:00:00Z' },
  { id: 'st-003', first_name: 'Fatima', last_name: 'Zahra', phone: '+213555001003', parent_phone: '+213555002003', status: 'due', is_active: true, academy_id: 'acad-001', created_at: '2026-02-10T00:00:00Z', updated_at: '2026-08-15T00:00:00Z' },
  { id: 'st-004', first_name: 'Omar', last_name: 'Saadi', phone: '+213555001004', parent_phone: '+213555002004', status: 'overdue', is_active: true, academy_id: 'acad-001', created_at: '2026-02-10T00:00:00Z', updated_at: '2026-07-20T00:00:00Z' },
  { id: 'st-005', first_name: 'Sara', last_name: 'Mansouri', phone: '+213555001005', parent_phone: '+213555002005', status: 'paid', is_active: true, academy_id: 'acad-001', created_at: '2026-03-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z' },
  { id: 'st-006', first_name: 'Mohamed', last_name: 'Aidi', phone: '+213555001006', parent_phone: '+213555002006', status: 'paid', is_active: true, academy_id: 'acad-001', created_at: '2026-03-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z' },
  { id: 'st-007', first_name: 'Ines', last_name: 'Bouzid', phone: '+213555001007', parent_phone: '+213555002007', status: 'due', is_active: true, academy_id: 'acad-001', created_at: '2026-04-01T00:00:00Z', updated_at: '2026-08-20T00:00:00Z' },
  { id: 'st-008', first_name: 'Karim', last_name: 'Tlemcani', phone: '+213555001008', parent_phone: '+213555002008', status: 'paid', is_active: true, academy_id: 'acad-001', created_at: '2026-04-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z' },
  { id: 'st-009', first_name: 'Lina', last_name: 'Ferhat', phone: '+213555001009', parent_phone: '+213555002009', status: 'overdue', is_active: true, academy_id: 'acad-001', created_at: '2026-05-01T00:00:00Z', updated_at: '2026-08-25T00:00:00Z' },
  { id: 'st-010', first_name: 'Rachid', last_name: 'Boukrouba', phone: '+213555001010', parent_phone: '+213555002010', status: 'paid', is_active: true, academy_id: 'acad-001', created_at: '2026-06-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z' },
];

// ── Teachers ──
export const MOCK_TEACHERS: Teacher[] = [
  { id: 'te-001', first_name: 'Khaled', last_name: 'Mebarki', phone: '+213555003001', subject: 'Mathematics', contract_type: 'hourly', hourly_rate: 1500, is_active: true, academy_id: 'acad-001', created_at: '2026-01-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z' },
  { id: 'te-002', first_name: 'Nadia', last_name: 'Charef', phone: '+213555003002', subject: 'French', contract_type: 'per_student', per_student_rate: 800, is_active: true, academy_id: 'acad-001', created_at: '2026-01-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z' },
  { id: 'te-003', first_name: 'Amine', last_name: 'Brahimi', phone: '+213555003003', subject: 'Arabic', contract_type: 'hourly', hourly_rate: 1200, is_active: true, academy_id: 'acad-001', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z' },
  { id: 'te-004', first_name: 'Samira', last_name: 'Djelloul', phone: '+213555003004', subject: 'English', contract_type: 'per_student', per_student_rate: 1000, is_active: true, academy_id: 'acad-001', created_at: '2026-03-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z' },
  { id: 'te-005', first_name: 'Youcef', last_name: 'Hamidi', phone: '+213555003005', subject: 'Physics', contract_type: 'hourly', hourly_rate: 1800, is_active: true, academy_id: 'acad-001', created_at: '2026-03-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z' },
];

// ── Classes ──
export const MOCK_CLASSES: Class[] = [
  { id: 'cl-001', name: 'Math — CM2', subject: 'Mathematics', capacity: 12, enrolled_count: 10, billing_model: 'attendance', teacher_name: 'Khaled Mebarki', teacher_id: 'te-001', is_active: true, academy_id: 'acad-001', created_at: '2026-01-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z' },
  { id: 'cl-002', name: 'French — 3ème', subject: 'French', capacity: 10, enrolled_count: 8, billing_model: 'time_based', teacher_name: 'Nadia Charef', teacher_id: 'te-002', is_active: true, academy_id: 'acad-001', created_at: '2026-01-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z' },
  { id: 'cl-003', name: 'Arabic — 4ème', subject: 'Arabic', capacity: 14, enrolled_count: 14, billing_model: 'attendance', teacher_name: 'Amine Brahimi', teacher_id: 'te-003', is_active: true, academy_id: 'acad-001', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z' },
  { id: 'cl-004', name: 'English — 5ème', subject: 'English', capacity: 10, enrolled_count: 6, billing_model: 'time_based', teacher_name: 'Samira Djelloul', teacher_id: 'te-004', is_active: true, academy_id: 'acad-001', created_at: '2026-03-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z' },
  { id: 'cl-005', name: 'Physics — Terminale', subject: 'Physics', capacity: 8, enrolled_count: 5, billing_model: 'attendance', teacher_name: 'Youcef Hamidi', teacher_id: 'te-005', is_active: true, academy_id: 'acad-001', created_at: '2026-03-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z' },
];

// ── Sessions (Calendar) ──
export const MOCK_SESSIONS: Session[] = [
  { id: 'ss-001', class_id: 'cl-001', class_name: 'Math — CM2', teacher_id: 'te-001', teacher_name: 'Khaled Mebarki', subject: 'Mathematics', date: '2026-09-14', start_time: '08:00', end_time: '10:00', classroom_name: 'Room 1', status: 'scheduled', enrolled_count: 10, created_at: '2026-09-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z', academy_id: 'acad-001' },
  { id: 'ss-002', class_id: 'cl-002', class_name: 'French — 3ème', teacher_id: 'te-002', teacher_name: 'Nadia Charef', subject: 'French', date: '2026-09-14', start_time: '10:00', end_time: '12:00', classroom_name: 'Room 2', status: 'scheduled', enrolled_count: 8, created_at: '2026-09-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z', academy_id: 'acad-001' },
  { id: 'ss-003', class_id: 'cl-003', class_name: 'Arabic — 4ème', teacher_id: 'te-003', teacher_name: 'Amine Brahimi', subject: 'Arabic', date: '2026-09-15', start_time: '08:00', end_time: '10:00', classroom_name: 'Room 1', status: 'scheduled', enrolled_count: 14, created_at: '2026-09-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z', academy_id: 'acad-001' },
  { id: 'ss-004', class_id: 'cl-004', class_name: 'English — 5ème', teacher_id: 'te-004', teacher_name: 'Samira Djelloul', subject: 'English', date: '2026-09-16', start_time: '14:00', end_time: '16:00', classroom_name: 'Room 3', status: 'scheduled', enrolled_count: 6, created_at: '2026-09-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z', academy_id: 'acad-001' },
  { id: 'ss-005', class_id: 'cl-005', class_name: 'Physics — Terminale', teacher_id: 'te-005', teacher_name: 'Youcef Hamidi', subject: 'Physics', date: '2026-09-17', start_time: '10:00', end_time: '12:00', classroom_name: 'Room 4', status: 'scheduled', enrolled_count: 5, created_at: '2026-09-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z', academy_id: 'acad-001' },
  { id: 'ss-006', class_id: 'cl-001', class_name: 'Math — CM2', teacher_id: 'te-001', teacher_name: 'Khaled Mebarki', subject: 'Mathematics', date: '2026-09-18', start_time: '08:00', end_time: '10:00', classroom_name: 'Room 1', status: 'scheduled', enrolled_count: 10, created_at: '2026-09-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z', academy_id: 'acad-001' },
  { id: 'ss-007', class_id: 'cl-002', class_name: 'French — 3ème', teacher_id: 'te-002', teacher_name: 'Nadia Charef', subject: 'French', date: '2026-09-19', start_time: '10:00', end_time: '12:00', classroom_name: 'Room 2', status: 'scheduled', enrolled_count: 8, created_at: '2026-09-01T00:00:00Z', updated_at: '2026-09-01T00:00:00Z', academy_id: 'acad-001' },
];

// ── Billing Stats ──
export const MOCK_BILLING_STATS: BillingStats = {
  totalIncome: 425000,
  paidCount: 8,
  dueCount: 3,
  overdueCount: 2,
};

// ── Overdue Accounts ──
export const MOCK_OVERDUE: OverdueAccount[] = [
  { student_id: 'st-004', student_name: 'Omar Saadi', overdue_amount: 12000, days_overdue: 45, aging_bucket: '30d+' },
  { student_id: 'st-009', student_name: 'Lina Ferhat', overdue_amount: 8000, days_overdue: 15, aging_bucket: '8-30d' },
  { student_id: 'st-003', student_name: 'Fatima Zahra', overdue_amount: 6000, days_overdue: 3, aging_bucket: '1-7d' },
];

// ── Revenue Data (Monthly) ──
export const MOCK_REVENUE: RevenueDataPoint[] = [
  { date: '2026-03', income: 35000 },
  { date: '2026-04', income: 42000 },
  { date: '2026-05', income: 38000 },
  { date: '2026-06', income: 45000 },
  { date: '2026-07', income: 30000 },
  { date: '2026-08', income: 48000 },
  { date: '2026-09', income: 42500 },
];

// ── Activity Log ──
export const MOCK_ACTIVITIES: Activity[] = [
  { id: 'act-001', action: 'Checked in 10 students for Math — CM2', user_name: 'Khaled', timestamp: new Date().toISOString(), icon: 'check' },
  { id: 'act-002', action: 'Marked billing as paid for Amina Benali', user_name: 'Admin', timestamp: new Date(Date.now() - 3600000).toISOString(), icon: 'billing' },
  { id: 'act-003', action: 'Added new student Rachid Boukrouba', user_name: 'Admin', timestamp: new Date(Date.now() - 7200000).toISOString(), icon: 'student' },
  { id: 'act-004', action: 'Created French — 3ème class', user_name: 'Admin', timestamp: new Date(Date.now() - 14400000).toISOString(), icon: 'class' },
];
