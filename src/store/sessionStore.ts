import { create } from 'zustand';
import type { Session, Subject } from '../types';

interface SessionStore {
  sessions: Session[];
  setSessions: (s: Session[]) => void;
  addSession: (s: Session) => void;
  updateSession: (id: string, data: Partial<Session>) => void;
  removeSession: (id: string) => void;
  calendarSubjects: Subject[];
  setCalendarSubjects: (s: Subject[]) => void;
  selectedSession: Session | null;
  setSelectedSession: (s: Session | null) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  sessions: [],
  setSessions: (sessions) => set({ sessions }),
  addSession: (s) => set((state) => ({ sessions: [...state.sessions, s] })),
  updateSession: (id, data) => set((state) => ({
    sessions: state.sessions.map((s) => s.id === id ? { ...s, ...data } : s),
  })),
  removeSession: (id) => set((state) => ({
    sessions: state.sessions.filter((s) => s.id !== id),
  })),
  calendarSubjects: [],
  setCalendarSubjects: (calendarSubjects) => set({ calendarSubjects }),
  selectedSession: null,
  setSelectedSession: (selectedSession) => set({ selectedSession }),
}));
