import { create } from 'zustand';
import type { Class } from '../types';

interface ClassStore {
  classes: Class[];
  setClasses: (c: Class[]) => void;
  addClass: (c: Class) => void;
  updateClass: (id: string, data: Partial<Class>) => void;
  removeClass: (id: string) => void;
  query: string;
  setQuery: (q: string) => void;
  filtered: () => Class[];
}

export const useClassStore = create<ClassStore>((set, get) => ({
  classes: [],
  setClasses: (classes) => set({ classes }),
  addClass: (c) => set((state) => ({ classes: [...state.classes, c] })),
  updateClass: (id, data) => set((state) => ({
    classes: state.classes.map((c) => c.id === id ? { ...c, ...data } : c),
  })),
  removeClass: (id) => set((state) => ({
    classes: state.classes.filter((c) => c.id !== id),
  })),
  query: '',
  setQuery: (query) => set({ query }),
  filtered: () => {
    const { classes, query } = get();
    if (!query) return classes;
    return classes.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.subject.toLowerCase().includes(query.toLowerCase())
    );
  },
}));
