import client from './client';
import type { Teacher, TeacherDetail, TeacherPayroll, TeacherHoursLog } from '../types';
import type { CreateTeacherRequest } from '../types/api';

export const teachersApi = {
  list: async (): Promise<Teacher[]> => {
    const res = await client.get('/teachers');
    return res.data;
  },

  get: async (id: string): Promise<TeacherDetail> => {
    const res = await client.get(`/teachers/${id}`);
    return res.data;
  },

  create: async (data: CreateTeacherRequest): Promise<Teacher> => {
    const res = await client.post('/teachers', data);
    return res.data;
  },

  update: async (id: string, data: Partial<CreateTeacherRequest>): Promise<Teacher> => {
    const res = await client.put(`/teachers/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await client.delete(`/teachers/${id}`);
  },

  getPayroll: async (id: string): Promise<TeacherPayroll[]> => {
    const res = await client.get(`/teachers/${id}/payroll`);
    return res.data;
  },

  getHours: async (id: string): Promise<TeacherHoursLog[]> => {
    const res = await client.get(`/teachers/${id}/hours`);
    return res.data;
  },
};
