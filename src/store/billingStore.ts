import { create } from 'zustand';
import type { BillingStats, OverdueAccount, PaymentPlan, RevenueDataPoint } from '../types';

interface BillingStore {
  stats: BillingStats | null;
  setStats: (s: BillingStats) => void;
  overdue: OverdueAccount[];
  setOverdue: (o: OverdueAccount[]) => void;
  plans: PaymentPlan[];
  setPlans: (p: PaymentPlan[]) => void;
  revenueData: RevenueDataPoint[];
  setRevenueData: (r: RevenueDataPoint[]) => void;
}

export const useBillingStore = create<BillingStore>((set) => ({
  stats: null,
  setStats: (stats) => set({ stats }),
  overdue: [],
  setOverdue: (overdue) => set({ overdue }),
  plans: [],
  setPlans: (plans) => set({ plans }),
  revenueData: [],
  setRevenueData: (revenueData) => set({ revenueData }),
}));
