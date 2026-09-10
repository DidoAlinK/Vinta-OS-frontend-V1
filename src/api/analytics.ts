import client from './client';
import type { DashboardStats, RevenueDataPoint } from '../types';

export const analyticsApi = {
  getDashboard: async (): Promise<DashboardStats> => {
    const res = await client.get('/analytics/dashboard');
    return res.data;
  },

  getRevenue: async (period: string = 'monthly'): Promise<RevenueDataPoint[]> => {
    const res = await client.get('/analytics/revenue', { params: { property: 'income', period } });
    return res.data;
  },

  exportCSV: async (dataset: string): Promise<Blob> => {
    const res = await client.get(`/analytics/export/${dataset}`, { responseType: 'blob' });
    return res.data;
  },
};
