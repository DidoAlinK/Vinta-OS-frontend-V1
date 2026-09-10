import type { Session } from '../types';

export const START_HOUR = 8;
export const END_HOUR = 20;
export const HOUR_HEIGHT = 60;
export const TOTAL_HOURS = END_HOUR - START_HOUR;
export const SNAP_MINUTES = 5;

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export function snapToGrid(minutes: number, snap: number = SNAP_MINUTES): number {
  return Math.round(minutes / snap) * snap;
}

export function getBlockStyle(startMinutes: number, endMinutes: number): { top: string; height: string } {
  const startOffset = START_HOUR * 60;
  const top = ((startMinutes - startOffset) / 60) * HOUR_HEIGHT;
  const height = ((endMinutes - startMinutes) / 60) * HOUR_HEIGHT;
  return { top: `${top}px`, height: `${Math.max(height, 20)}px` };
}

export function getBlockHeight(startMinutes: number, endMinutes: number): number {
  return ((endMinutes - startMinutes) / 60) * HOUR_HEIGHT;
}

export function yToMinutes(y: number): number {
  const totalMinutes = START_HOUR * 60 + (y / HOUR_HEIGHT) * 60;
  return snapToGrid(totalMinutes);
}

export function layoutOverlappingSessions(sessions: Session[]): Map<string, { left: string; width: string; multi: boolean }> {
  const layout = new Map<string, { left: string; width: string; multi: boolean }>();

  if (sessions.length === 0) return layout;
  if (sessions.length === 1) {
    layout.set(sessions[0].id, { left: '3px', width: 'calc(100% - 6px)', multi: false });
    return layout;
  }

  // Sort by start time
  const sorted = [...sessions].sort((a, b) => timeToMinutes(a.start_time) - timeToMinutes(b.start_time));

  // Find overlapping groups
  const groups: Session[][] = [];
  let currentGroup = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const prevEnd = timeToMinutes(currentGroup[currentGroup.length - 1].end_time);
    const currStart = timeToMinutes(sorted[i].start_time);

    if (currStart < prevEnd) {
      currentGroup.push(sorted[i]);
    } else {
      groups.push(currentGroup);
      currentGroup = [sorted[i]];
    }
  }
  groups.push(currentGroup);

  for (const group of groups) {
    const count = group.length;
    group.forEach((session, idx) => {
      const width = `calc(${100 / count}% - 6px)`;
      const left = `calc(${(idx * 100) / count}% + 3px)`;
      layout.set(session.id, { left, width, multi: count > 1 });
    });
  }

  return layout;
}

export type SubjectColorKey = 'gold' | 'emerald' | 'violet' | 'red';

export const colorMap: Record<SubjectColorKey, { bg: string; accent: string; text: string }> = {
  gold:    { bg: 'var(--gold-soft)',    accent: 'var(--gold)',    text: 'var(--gold)' },
  emerald: { bg: 'var(--emerald-soft)', accent: 'var(--emerald)', text: 'var(--emerald)' },
  violet:  { bg: 'var(--violet-soft)',  accent: 'var(--violet)',  text: 'var(--violet)' },
  red:     { bg: 'var(--red-soft)',     accent: 'var(--red)',     text: 'var(--red)' },
};

export const STATUS_COLORS: Record<string, SubjectColorKey> = {
  scheduled: 'gold',
  in_progress: 'emerald',
  completed: 'gold',
  cancelled: 'red',
};

const SUBJECT_ROTATION: SubjectColorKey[] = ['gold', 'emerald', 'violet', 'red'];

export function getSubjectColor(subjectName: string, subjectMap: Map<string, number>): SubjectColorKey {
  if (!subjectMap.has(subjectName)) {
    subjectMap.set(subjectName, subjectMap.size);
  }
  return SUBJECT_ROTATION[subjectMap.get(subjectName)! % SUBJECT_ROTATION.length];
}
