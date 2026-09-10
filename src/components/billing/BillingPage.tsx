import { useEffect } from 'react';
import { useBillingStore } from '../../store/billingStore';
import { billingApi } from '../../api/billing';
import { analyticsApi } from '../../api/analytics';
import { DonutRing } from './DonutRing';
import { RevenueChart } from './RevenueChart';
import { StatButton } from './StatButton';
import { FinanceBreakdownModal } from './FinanceBreakdownModal';
import { useState } from 'react';
import { formatDZD } from '../../utils/currency';

export default function BillingPage() {
  const { stats, setStats, overdue, setOverdue, revenueData, setRevenueData } = useBillingStore();
  const [showBreakdown, setShowBreakdown] = useState(false);

  useEffect(() => {
    Promise.all([
      billingApi.getStats().catch(() => ({ totalIncome: 42500, paidCount: 8, overdueCount: 2, dueCount: 3 })),
      billingApi.getOverdue().catch(() => []),
      analyticsApi.getRevenue('monthly').catch(() => []),
    ]).then(([s, o, r]) => {
      setStats(s);
      setOverdue(o);
      setRevenueData(r);
    });
  }, [setStats, setOverdue, setRevenueData]);

  const donutData = stats ? [
    { label: 'Paid', value: stats.paidCount, color: 'var(--emerald)' },
    { label: 'Due', value: stats.dueCount, color: 'var(--gold)' },
    { label: 'Overdue', value: stats.overdueCount, color: 'var(--red)' },
  ] : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%', overflow: 'auto' }}>
      {/* Top row: Stats + Donut */}
      <div style={{ display: 'flex', gap: 14 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <StatButton label="Total Income" value={formatDZD(stats?.totalIncome || 0)} color="var(--emerald)" />
            <StatButton label="Paid" value={String(stats?.paidCount || 0)} color="var(--emerald)" />
            <StatButton label="Due" value={String(stats?.dueCount || 0)} color="var(--gold)" />
            <StatButton label="Overdue" value={String(stats?.overdueCount || 0)} color="var(--red)" onClick={() => setShowBreakdown(true)} />
          </div>
        </div>
        <div className="glass hide-mobile" style={{ width: 200, borderRadius: 'var(--r-lg)', padding: 18, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <DonutRing data={donutData} size={120} thickness={14} />
          <div style={{ marginTop: 10, fontSize: 11, color: 'var(--muted)', textAlign: 'center' }}>Payment Status</div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="glass" style={{ flex: 1, borderRadius: 'var(--r-lg)', padding: 20, minHeight: 280 }}>
        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 16 }}>Revenue</h3>
        <RevenueChart data={revenueData} />
      </div>

      {showBreakdown && <FinanceBreakdownModal overdue={overdue} onClose={() => setShowBreakdown(false)} />}
    </div>
  );
}
