import { useState, useEffect } from 'react';
import type { ActivityLog } from '../../types';
import { ActivityEntry } from './ActivityEntry';
import client from '../../api/client';

export function ActivityPanel() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try fetching from API, fall back to mock data
    client.get('/notifications').then((res) => {
      // Map notifications to activity-like data
      const data = (res.data || []).slice(0, 10).map((n: any, i: number) => ({
        id: n.id || `act-${i}`,
        academy_id: '',
        user_id: n.user_id || '',
        user_name: n.user_name || 'System',
        type: n.type || 'general',
        action: n.action || n.title || 'Activity',
        description: n.message || n.description || '',
        entity_type: n.entity_type,
        entity_id: n.entity_id,
        created_at: n.created_at || new Date().toISOString(),
      }));
      setActivities(data);
    }).catch(() => {
      // Mock activities for demo
      setActivities([
        { id: '1', academy_id: '', user_id: '1', user_name: 'Ali', type: 'checkin', action: 'Check-in', description: 'Ali checked in 3 students to Math — CM2', created_at: new Date(Date.now() - 300000).toISOString() },
        { id: '2', academy_id: '', user_id: '2', user_name: 'Nadia', type: 'payment', action: 'Payment', description: 'Nadia recorded 3,500 DA payment from Yasmine Benali', created_at: new Date(Date.now() - 1800000).toISOString() },
        { id: '3', academy_id: '', user_id: '1', user_name: 'Ali', type: 'student', action: 'New Student', description: 'Ali added Rachid Mebarki to English — 5ème B', created_at: new Date(Date.now() - 7200000).toISOString() },
        { id: '4', academy_id: '', user_id: '2', user_name: 'Nadia', type: 'alert', action: 'Overdue', description: 'Payment overdue for Sarah Ait Ahmed — 12 days', created_at: new Date(Date.now() - 14400000).toISOString() },
        { id: '5', academy_id: '', user_id: '1', user_name: 'Ali', type: 'checkin', action: 'Check-in', description: 'Ali checked in 8 students to French — 6ème A', created_at: new Date(Date.now() - 21600000).toISOString() },
      ]);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="glass" style={{
      borderRadius: 'var(--r-lg)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%', minHeight: 0,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 18px 10px' }}>
        <span style={{ fontFamily: 'Space Grotesk', fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>Activity</span>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>{activities.length}</span>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 8px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 20, color: 'var(--muted)', fontSize: 12 }}>Loading…</div>
        ) : activities.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 20, color: 'var(--muted)', fontSize: 12 }}>No recent activity</div>
        ) : (
          activities.map((a) => <ActivityEntry key={a.id} activity={a} />)
        )}
      </div>
    </div>
  );
}
