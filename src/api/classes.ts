import client from './client';
import type { Class, ClassDetail, Schedule } from '../types';
import type { CreateClassRequest } from '../types/api';

export const classesApi = {
  list: async (): Promise<Class[]> => {
    const res = await client.get('/classes');
    return res.data;
  },

  get: async (id: string): Promise<ClassDetail> => {
    const res = await client.get(`/classes/${id}`);
    return res.data;
  },

  create: async (data: CreateClassRequest): Promise<Class> => {
    const res = await client.post('/classes', data);
    return res.data;
  },

  update: async (id: string, data: Partial<CreateClassRequest>): Promise<Class> => {
    const res = await client.put(`/classes/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await client.delete(`/classes/${id}`);
  },

  getSchedules: async (classId: string): Promise<Schedule[]> => {
    const res = await client.get(`/classes/${classId}/schedules`);
    return res.data;
  },

  addSchedule: async (classId: string, data: Partial<Schedule>): Promise<Schedule> => {
    const res = await client.post(`/classes/${classId}/schedules`, data);
    return res.data;
  },

  updateSchedule: async (classId: string, scheduleId: string, data: Partial<Schedule>): Promise<Schedule> => {
    const res = await client.put(`/classes/${classId}/schedules/${scheduleId}`, data);
    return res.data;
  },

  deleteSchedule: async (classId: string, scheduleId: string): Promise<void> => {
    await client.delete(`/classes/${classId}/schedules/${scheduleId}`);
  },
};
