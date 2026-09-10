import client from './client';
import type { Session, SessionStudent } from '../types';
import type { CreateSessionRequest, UpdateSessionRequest } from '../types/api';

export const calendarApi = {
  getSessions: async (week: string): Promise<Session[]> => {
    const res = await client.get('/calendar/sessions', { params: { week } });
    return res.data;
  },

  createSession: async (data: CreateSessionRequest): Promise<Session> => {
    const res = await client.post('/calendar/sessions', data);
    return res.data;
  },

  updateSession: async (id: string, data: UpdateSessionRequest): Promise<Session> => {
    const res = await client.put(`/calendar/sessions/${id}`, data);
    return res.data;
  },

  deleteSession: async (id: string): Promise<void> => {
    await client.delete(`/calendar/sessions/${id}`);
  },

  getSessionStudents: async (sessionId: string): Promise<SessionStudent[]> => {
    const res = await client.get(`/calendar/sessions/${sessionId}/students`);
    return res.data;
  },

  addStudentsToSession: async (sessionId: string, studentIds: string[]): Promise<SessionStudent[]> => {
    const res = await client.post(`/calendar/sessions/${sessionId}/students`, { studentIds });
    return res.data;
  },

  removeStudentFromSession: async (sessionId: string, studentId: string): Promise<void> => {
    await client.delete(`/calendar/sessions/${sessionId}/students/${studentId}`);
  },
};
