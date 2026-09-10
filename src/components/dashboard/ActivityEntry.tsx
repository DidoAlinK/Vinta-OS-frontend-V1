import React from 'react';
import type { ActivityLog } from '../../types';
import { relativeTime } from '../../utils/dates';
import { ACTIVITY_TYPES } from '../../utils/constants';

interface Props {
  activity: ActivityLog;
}

const activityIcons: Record<string, React.JSX.Element> = {
  'dollar-sign': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17,5H9.5a3.5,3.5,0,0,0,0,7h5a3.5,3.5,0,0,1,0,7H6"/>
    </svg>
  ),
  'check-circle': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22,11.08V12a10,10,0,1,1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>
    </svg>
  ),
  'user-plus': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20,21v-2a4,4,0,0,0-4-4H8a4,4,0,0,0-4,4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  'alert-triangle': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29,3.86L1.82,18a2,2,0,0,0,1.71,3h16.94a2,2,0,0,0,1.71-3L13.71,3.86a2,2,0,0,0-3.42,0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
};

export function ActivityEntry({ activity }: Props) {
  const config = ACTIVITY_TYPES[activity.type as keyof typeof ACTIVITY_TYPES] || ACTIVITY_TYPES.alert;
  const icon = activityIcons[config.icon];

  return (
    <div className="al-entry" style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      padding: '10px 8px', borderRadius: 'var(--r-sm)',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 10,
        background: config.bg, color: config.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, lineHeight: 1.4, color: 'var(--text)' }}>
          <span style={{ fontWeight: 600 }}>{activity.user_name || 'System'}</span>
          {' '}
          {activity.description || activity.action}
        </div>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
          {relativeTime(activity.created_at)}
        </div>
      </div>
    </div>
  );
}
