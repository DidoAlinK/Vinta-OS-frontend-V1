import type { Academy, AcademySettings, Subscription } from './index';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface CreateOwnerRequest {
  academy_id: string;
  name: string;
  email: string;
  password: string;
  pin: string;
}

export interface SignupResponse {
  academy_id: string;
  name: string;
}

export interface CreateOwnerResponse {
  id: string;
  name: string;
  role: string;
  academy_id: string;
}

export interface SelectProfileRequest {
  userId: string;
}

export interface VerifyPinRequest {
  userId: string;
  pin: string;
}

export interface CreateStudentRequest {
  first_name: string;
  last_name: string;
  phone: string;
  parent_phone?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female';
  notes?: string;
}

export interface CreateTeacherRequest {
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  subject?: string;
  contract_type: 'hourly' | 'per_student';
  hourly_rate?: number;
  per_student_rate?: number;
}

export interface CreateClassRequest {
  name: string;
  subject: string;
  subject_color?: string;
  teacher_id?: string;
  classroom_id?: string;
  capacity: number;
  billing_model: 'attendance' | 'time_based';
}

export interface CreateSessionRequest {
  class_id: string;
  date: string;
  start_time: string;
  end_time: string;
  classroom_id?: string;
  notes?: string;
}

export interface UpdateSessionRequest {
  date?: string;
  start_time?: string;
  end_time?: string;
  status?: string;
  classroom_id?: string;
  notes?: string;
}

export interface CreatePaymentPlanRequest {
  name: string;
  duration_days: number;
  amount_da: number;
  billing_model: 'attendance' | 'time_based';
}

export interface AcademySettingsResponse {
  academy: Academy;
  settings: AcademySettings;
  subscription: Subscription;
}
