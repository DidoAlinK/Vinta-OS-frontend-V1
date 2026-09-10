import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { RevenueDataPoint } from '../../types';
import { formatDZD } from '../../utils/currency';

interface Props {
  data: RevenueDataPoint[];
}

export function RevenueChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: 'var(--muted)', fontSize: 13 }}>
        No revenue data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--divider)" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: 'var(--muted)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
        <Tooltip
          contentStyle={{
            background: 'var(--glass-strong)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--r-sm)',
            fontSize: 12,
            color: 'var(--text)',
          }}
          formatter={(value) => [formatDZD(Number(value)), 'Income']}
        />
        <Area type="monotone" dataKey="income" stroke="var(--gold)" strokeWidth={2} fill="url(#goldGradient)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
