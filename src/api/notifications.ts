import client from './client';
import type { Notification } from '../types';

export const notificationsApi = {
  list: async (): Promise<Notification[]> => {
    const res = await client.get('/notifications');
    return res.data;
  },

  markRead: async (id: string): Promise<void> => {
    await client.put(`/notifications/${id}/read`);
  },

  markAllRead: async (): Promise<void> => {
    await client.put('/notifications/read-all');
  },
};
