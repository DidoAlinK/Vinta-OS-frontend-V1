import client from './client';
import type { PaymentPlan, StudentBilling, BillingStats, OverdueAccount } from '../types';

export const billingApi = {
  getPlans: async (): Promise<PaymentPlan[]> => {
    const res = await client.get('/billing/plans');
    return res.data;
  },

  createPlan: async (data: Partial<PaymentPlan>): Promise<PaymentPlan> => {
    const res = await client.post('/billing/plans', data);
    return res.data;
  },

  getStudentBilling: async (studentId: string): Promise<StudentBilling[]> => {
    const res = await client.get(`/billing/students/${studentId}`);
    return res.data;
  },

  createBillingCycle: async (studentId: string, data: Partial<StudentBilling>): Promise<StudentBilling> => {
    const res = await client.post(`/billing/students/${studentId}`, data);
    return res.data;
  },

  updateCycle: async (studentId: string, cycleId: string, data: Partial<StudentBilling>): Promise<StudentBilling> => {
    const res = await client.put(`/billing/students/${studentId}/cycle/${cycleId}`, data);
    return res.data;
  },

  recordPayment: async (data: { student_billing_id: string; amount_da: number; payment_method?: string; notes?: string }): Promise<void> => {
    await client.post('/billing/payments', data);
  },

  getOverdue: async (): Promise<OverdueAccount[]> => {
    const res = await client.get('/billing/overdue');
    return res.data;
  },

  getStats: async (): Promise<BillingStats> => {
    const res = await client.get('/billing/stats');
    return res.data;
  },
};
