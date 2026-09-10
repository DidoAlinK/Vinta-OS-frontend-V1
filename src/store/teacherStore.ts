import { create } from 'zustand';
import type { Teacher } from '../types';

interface TeacherStore {
  teachers: Teacher[];
  setTeachers: (t: Teacher[]) => void;
  addTeacher: (t: Teacher) => void;
  updateTeacher: (id: string, data: Partial<Teacher>) => void;
  removeTeacher: (id: string) => void;
  query: string;
  setQuery: (q: string) => void;
  filtered: () => Teacher[];
}

export const useTeacherStore = create<TeacherStore>((set, get) => ({
  teachers: [],
  setTeachers: (teachers) => set({ teachers }),
  addTeacher: (t) => set((state) => ({ teachers: [...state.teachers, t] })),
  updateTeacher: (id, data) => set((state) => ({
    teachers: state.teachers.map((t) => t.id === id ? { ...t, ...data } : t),
  })),
  removeTeacher: (id) => set((state) => ({
    teachers: state.teachers.filter((t) => t.id !== id),
  })),
  query: '',
  setQuery: (query) => set({ query }),
  filtered: () => {
    const { teachers, query } = get();
    if (!query) return teachers;
    return teachers.filter((t) =>
      `${t.first_name} ${t.last_name}`.toLowerCase().includes(query.toLowerCase())
    );
  },
}));
