// ============================================================
// AUTH & USER TYPES
// ============================================================
export type UserRole = 'owner' | 'staff';
export type Screen = 'auth' | 'profiles' | 'success' | 'app';

export interface User {
  id: string;
  academy_id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  pin_hash?: string;
  avatar_colors: [string, string];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  access_token: string;
  token?: string;
  refresh_token?: string;
  academy_id?: string;
  academy?: Academy;
  user?: User;
  user_id?: string;
  name?: string;
  role?: string;
}

export interface ProfileSelectResponse {
  user: User;
}

export interface PinVerifyResponse {
  access_token: string;
  token?: string;
  user_id: string;
  name: string;
  role: string;
  academy_id: string;
}

// ============================================================
// ACADEMY TYPES
// ============================================================
export interface Academy {
  id: string;
  name: string;
  subtitle?: string;
  email: string;
  phone: string;
  address?: string;
  logo_url?: string;
  created_at: string;
}

export interface AcademySettings {
  id: string;
  academy_id: string;
  theme: 'light' | 'dark' | 'system';
  font_size: 'small' | 'normal' | 'large';
  language: 'en' | 'fr' | 'ar';
  timezone: string;
  currency: string;
  auto_checkout_enabled: boolean;
  end_class_popup_enabled: boolean;
  billing_model: 'attendance' | 'time_based' | 'mixed';
  week_start: number; // 0=Sunday, 5=Friday
}

export interface Subscription {
  id: string;
  academy_id: string;
  plan: string;
  status: 'active' | 'trial' | 'expired' | 'cancelled';
  starts_at: string;
  expires_at: string;
  max_students: number;
  max_teachers: number;
}

// ============================================================
// STUDENT TYPES
// ============================================================
export type StudentStatus = 'paid' | 'due' | 'overdue';

export interface Student {
  id: string;
  academy_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  parent_phone?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female';
  notes?: string;
  status: StudentStatus; // computed from latest billing
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Guardian {
  id: string;
  student_id: string;
  name: string;
  phone: string;
  relationship: string;
  is_primary: boolean;
}

export interface Enrollment {
  id: string;
  student_id: string;
  class_id: string;
  enrolled_at: string;
  withdrawn_at?: string;
  is_active: boolean;
}

export interface StudentDetail extends Student {
  guardians: Guardian[];
  enrollments: Enrollment[];
  billing: StudentBilling[];
}

// ============================================================
// TEACHER TYPES
// ============================================================
export type ContractType = 'hourly' | 'per_student';

export interface Teacher {
  id: string;
  academy_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  subject?: string;
  contract_type: ContractType;
  hourly_rate?: number;
  per_student_rate?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Computed
  total_hours?: number;
  active_students?: number;
}

export interface TeacherPayroll {
  id: string;
  teacher_id: string;
  month: string; // YYYY-MM
  total_hours?: number;
  hourly_rate?: number;
  active_students?: number;
  per_student_rate?: number;
  amount: number;
  status: 'pending' | 'settled' | 'overdue';
  settled_at?: string;
  created_at: string;
}

export interface TeacherHoursLog {
  id: string;
  teacher_id: string;
  session_id: string;
  date: string;
  hours: number;
  notes?: string;
}

export interface TeacherDetail extends Teacher {
  classes: Class[];
  payroll: TeacherPayroll[];
  hours_log: TeacherHoursLog[];
}

// ============================================================
// CLASS & SCHEDULING TYPES
// ============================================================
export interface Classroom {
  id: string;
  academy_id: string;
  name: string;
  capacity?: number;
  is_active: boolean;
}

export interface Subject {
  id: string;
  academy_id: string;
  name: string;
  color: string;
}

export interface Class {
  id: string;
  academy_id: string;
  name: string;
  subject: string;
  subject_color?: string;
  teacher_id?: string;
  teacher_name?: string;
  classroom_id?: string;
  classroom_name?: string;
  capacity: number;
  billing_model: 'attendance' | 'time_based';
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Computed
  enrolled_count: number;
  enrolled?: number; // alias for enrolled_count
  status_dot?: 'red' | 'green' | 'grey'; // computed: red=full, green=has room, grey=empty
}

export interface Schedule {
  id: string;
  class_id: string;
  day_of_week: number; // 0=Sunday
  start_time: string; // "HH:MM"
  end_time: string; // "HH:MM"
  classroom_id?: string;
  is_active: boolean;
}

export interface ClassDetail extends Class {
  schedules: Schedule[];
  enrollments: Enrollment[];
}

// ============================================================
// SESSION TYPES (Calendar)
// ============================================================
export type SessionStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface Session {
  id: string;
  academy_id: string;
  class_id: string;
  class_name?: string;
  subject?: string;
  subject_color?: string;
  teacher_id?: string;
  teacher_name?: string;
  classroom_id?: string;
  classroom_name?: string;
  date: string; // YYYY-MM-DD
  start_time: string; // "HH:MM"
  end_time: string; // "HH:MM"
  status: SessionStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
  // Computed
  enrolled_count?: number;
  present_count?: number;
  paid_count?: number;
  students?: SessionStudent[];
}

export interface SessionStudent {
  id: string;
  session_id: string;
  student_id: string;
  student_name?: string;
  is_present: boolean;
  checked_in_at?: string;
  checked_out_at?: string;
  payment_status: StudentStatus;
  payment_amount?: number;
  notes?: string;
}

// ============================================================
// ATTENDANCE TYPES
// ============================================================
export interface AttendanceCheckin {
  sessionId: string;
  studentId: string;
}

export interface AttendancePresence {
  sessionId: string;
  studentId: string;
  isPresent: boolean;
}

export interface AttendancePayment {
  sessionId: string;
  studentId: string;
  paymentStatus: StudentStatus;
}

// ============================================================
// BILLING TYPES
// ============================================================
export interface PaymentPlan {
  id: string;
  academy_id: string;
  name: string;
  duration_days: number;
  amount_da: number;
  billing_model: 'attendance' | 'time_based';
  is_active: boolean;
  created_at: string;
}

export interface StudentBilling {
  id: string;
  student_id: string;
  payment_plan_id?: string;
  plan_name?: string;
  class_id?: string;
  class_name?: string;
  status: StudentStatus;
  amount_da: number;
  start_date: string;
  end_date: string;
  paid_at?: string;
  created_at: string;
  // Aging
  aging_bucket?: 'current' | '1-7d' | '8-30d' | '30d+';
}

export interface PaymentLog {
  id: string;
  student_billing_id: string;
  student_id: string;
  amount_da: number;
  payment_method?: string;
  reference?: string;
  notes?: string;
  recorded_by?: string;
  recorded_at: string;
}

export interface BillingStats {
  totalIncome: number;
  paidCount: number;
  overdueCount: number;
  dueCount: number;
}

export interface OverdueAccount {
  student_id: string;
  student_name: string;
  overdue_amount: number;
  aging_bucket: '1-7d' | '8-30d' | '30d+';
  days_overdue: number;
}

// ============================================================
// ANALYTICS TYPES
// ============================================================
export interface DashboardStats {
  totalStudents: number;
  todaySessions: number;
  activeNow: number;
}

export interface RevenueDataPoint {
  date: string;
  income: number;
  expenses?: number;
}

// ============================================================
// ACTIVITY LOG TYPES
// ============================================================
export type ActivityType = 'payment' | 'checkin' | 'student' | 'alert' | 'schedule' | 'system';

export interface Activity {
  id: string;
  academy_id?: string;
  user_id?: string;
  user_name?: string;
  type?: ActivityType;
  action: string;
  description?: string;
  entity_type?: string;
  entity_id?: string;
  metadata?: Record<string, unknown>;
  icon?: string;
  timestamp?: string;
  created_at?: string;
}

export interface ActivityLog {
  id: string;
  academy_id: string;
  user_id: string;
  user_name?: string;
  type: ActivityType;
  action: string;
  description: string;
  entity_type?: string;
  entity_id?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

// ============================================================
// NOTIFICATION TYPES
// ============================================================
export type NotificationType = 'payment' | 'checkin' | 'student' | 'alert' | 'general';

export interface Notification {
  id: string;
  academy_id: string;
  user_id?: string;
  type: NotificationType;
  title: string;
  message: string;
  is_read: boolean;
  action_url?: string;
  created_at: string;
}

// ============================================================
// TOAST TYPES (Frontend only)
// ============================================================
export interface Toast {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  detail?: string;
  action?: { label: string; onClick: () => void };
  duration?: number;
}

// ============================================================
// API RESPONSE TYPES
// ============================================================
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  pages: number;
}

// ============================================================
// CALENDAR / DRAG-DROP TYPES
// ============================================================
export interface CalendarDragData {
  session?: Session;
  subject?: Subject;
  sourceDay?: number;
  sourceTime?: number;
}

export interface CalendarDropTarget {
  day: number;
  startTime: number; // decimal hours
  endTime: number;
}

// ============================================================
// SETTINGS TYPES
// ============================================================
export interface StaffUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  is_active: boolean;
  last_login?: string;
}

export interface AcademySettingsResponse {
  settings: AcademySettings;
  subscription?: Subscription;
}
