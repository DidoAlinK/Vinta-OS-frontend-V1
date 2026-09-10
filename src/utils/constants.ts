export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'students', label: 'Students' },
  { id: 'teachers', label: 'Teachers' },
  { id: 'classes', label: 'Classes' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'billing', label: 'Billing' },
  { id: 'settings', label: 'Settings' },
] as const;

export type NavItemId = typeof NAV_ITEMS[number]['id'];

export const SUBJECT_COLORS_HEX: Record<string, string> = {
  Math: '#b3872a',
  French: '#7c3aed',
  English: '#0ea5e9',
  Science: '#0f6b4d',
  Arabic: '#b3423a',
  History: '#7a5a95',
  Geography: '#14b8a6',
  Physics: '#6366f1',
  default: '#75726a',
};

export const ACTIVITY_TYPES = {
  payment: { color: 'var(--emerald)', bg: 'var(--emerald-soft)', icon: 'dollar-sign' as const },
  checkin: { color: 'var(--gold)', bg: 'var(--gold-soft)', icon: 'check-circle' as const },
  student: { color: 'var(--violet)', bg: 'var(--violet-soft)', icon: 'user-plus' as const },
  alert: { color: 'var(--red)', bg: 'var(--red-soft)', icon: 'alert-triangle' as const },
} as const;

export const TOAST_ICONS: Record<string, string> = {
  payment: '💳',
  checkin: '✅',
  student: '👤',
  alert: '⚠️',
  general: 'ℹ️',
};

export const AVATAR_PRESETS_HEX = [
  ['#b3872a', '#0f6b4d'],
  ['#7a5a95', '#0ea5e9'],
  ['#b3423a', '#f59e0b'],
  ['#14b8a6', '#22c55e'],
  ['#ec4899', '#f472b6'],
  ['#6366f1', '#a07cc5'],
  ['#f59e0b', '#ef4444'],
  ['#14b8a6', '#06b6d4'],
] as const;

export const PAYMENT_STATUS_OPTIONS = ['paid', 'due', 'overdue'] as const;

export const ENTITY_FILTER_OPTIONS = ['All', 'Students', 'Teachers', 'Payments', 'Classes'] as const;

export const STATUS_FILTER_OPTIONS = ['All', 'Present', 'Absent'] as const;

export const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'ar', label: 'العربية' },
] as const;

export const FONT_SIZE_OPTIONS = [
  { value: 'small', label: 'Small' },
  { value: 'normal', label: 'Normal' },
  { value: 'large', label: 'Large' },
] as const;

export const SESSION_STATUS_LABELS: Record<string, string> = {
  scheduled: '● Scheduled',
  in_progress: '● LIVE',
  completed: '✓ Done',
  cancelled: '✕ Cancelled',
};
