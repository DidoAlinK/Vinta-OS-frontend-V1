import client from './client';
import type { Student, StudentDetail, Guardian, Enrollment } from '../types';
import type { CreateStudentRequest } from '../types/api';

export const studentsApi = {
  list: async (): Promise<Student[]> => {
    const res = await client.get('/students');
    return res.data;
  },

  get: async (id: string): Promise<StudentDetail> => {
    const res = await client.get(`/students/${id}`);
    return res.data;
  },

  create: async (data: CreateStudentRequest): Promise<Student> => {
    const res = await client.post('/students', data);
    return res.data;
  },

  update: async (id: string, data: Partial<CreateStudentRequest>): Promise<Student> => {
    const res = await client.put(`/students/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await client.delete(`/students/${id}`);
  },

  getGuardians: async (studentId: string): Promise<Guardian[]> => {
    const res = await client.get(`/students/${studentId}/guardians`);
    return res.data;
  },

  addGuardian: async (studentId: string, data: Partial<Guardian>): Promise<Guardian> => {
    const res = await client.post(`/students/${studentId}/guardians`, data);
    return res.data;
  },

  enroll: async (studentId: string, classId: string): Promise<Enrollment> => {
    const res = await client.post(`/students/${studentId}/enroll`, { classId });
    return res.data;
  },

  withdraw: async (studentId: string, classId: string): Promise<void> => {
    await client.delete(`/students/${studentId}/enroll/${classId}`);
  },
};
