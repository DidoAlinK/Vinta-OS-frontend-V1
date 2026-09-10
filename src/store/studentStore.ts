import { create } from 'zustand';
import type { Student } from '../types';

interface StudentStore {
  students: Student[];
  setStudents: (s: Student[]) => void;
  addStudent: (s: Student) => void;
  updateStudent: (id: string, data: Partial<Student>) => void;
  removeStudent: (id: string) => void;
  statusFilter: string;
  setStatusFilter: (f: string) => void;
  query: string;
  setQuery: (q: string) => void;
  filtered: () => Student[];
}

export const useStudentStore = create<StudentStore>((set, get) => ({
  students: [],
  setStudents: (students) => set({ students }),
  addStudent: (s) => set((state) => ({ students: [...state.students, s] })),
  updateStudent: (id, data) => set((state) => ({
    students: state.students.map((s) => s.id === id ? { ...s, ...data } : s),
  })),
  removeStudent: (id) => set((state) => ({
    students: state.students.filter((s) => s.id !== id),
  })),
  statusFilter: 'All',
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  query: '',
  setQuery: (query) => set({ query }),
  filtered: () => {
    const { students, statusFilter, query } = get();
    return students.filter((s) => {
      const matchesQuery = !query ||
        `${s.first_name} ${s.last_name}`.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === 'All' || s.status === statusFilter.toLowerCase();
      return matchesQuery && matchesStatus;
    });
  },
}));
