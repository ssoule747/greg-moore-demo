import { DollarSign, Calendar, Star, Clock, Link2, Info } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { projects, monthlyRevenue } from '../data/demo-data';
import StatCard from '../components/StatCard';

const STATUS_COLORS: Record<string, string> = {
  building: '#4A7C59',
  permitting: '#C4883A',
  complete: '#8B7355',
};

function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value.toLocaleString()}`;
}

function formatAxisCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value}`;
}

export default function Analytics() {
  // Aggregate projects by status for the pie chart
  const statusCounts = projects.reduce<Record<string, number>>((acc, p) => {
    const key = p.status.toLowerCase();
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
    color: STATUS_COLORS[status] || '#8B7355',
  }));

  // Budget performance table data
  const budgetRows = projects.map((p) => {
    const variance = p.budget - p.spent;
    const variancePct = p.budget > 0 ? (variance / p.budget) * 100 : 0;
    return {
      name: p.name,
      budget: p.budget,
      spent: p.spent,
      variance,
      variancePct,
    };
  });

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-primary">Analytics</h1>
        <p className="text-secondary mt-1">Performance overview</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue YTD" value="$2.87M" icon={DollarSign} trend="up" />
        <StatCard title="Avg Project Duration" value="11.5 mo" icon={Calendar} />
        <StatCard title="Client Satisfaction" value="98%" icon={Star} trend="up" />
        <StatCard title="On-Time Delivery" value="75%" icon={Clock} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <div className="bg-white border border-border rounded-xl p-6">
          <h2 className="text-lg font-serif font-semibold text-primary mb-4">
            Monthly Revenue
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E0DA" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#888' }}
                  axisLine={{ stroke: '#E5E0DA' }}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={formatAxisCurrency}
                  tick={{ fontSize: 12, fill: '#888' }}
                  axisLine={{ stroke: '#E5E0DA' }}
                  tickLine={false}
                />
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [formatCurrency(Number(value)), 'Revenue']}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E5E0DA',
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="revenue" fill="#8B7355" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Projects by Status */}
        <div className="bg-white border border-border rounded-xl p-6">
          <h2 className="text-lg font-serif font-semibold text-primary mb-4">
            Projects by Status
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name} (${value})`}
                >
                  {pieData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E5E0DA',
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{ fontSize: 13, color: '#555' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Finance Integration Note */}
      <div className="flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/5 p-5">
        <Info className="w-5 h-5 text-accent mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-medium text-text-primary">Finance Integration Ready</p>
          <p className="text-sm text-text-secondary mt-1 leading-relaxed">
            The financial data shown here can plug directly into your existing accounting and bookkeeping systems.
            The Command Center supports integrations with <strong>QuickBooks</strong>, <strong>Sage</strong>, <strong>Xero</strong>,
            and <strong>Foundation Software</strong> — as well as spreadsheet exports for any custom workflow.
            Your budgeting categories, change orders, and payment schedules sync automatically so Pam and Allison
            aren't double-entering data between systems.
          </p>
          <div className="flex items-center gap-4 mt-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-border px-3 py-1 text-xs font-medium text-text-secondary">
              <Link2 className="w-3 h-3" /> QuickBooks
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-border px-3 py-1 text-xs font-medium text-text-secondary">
              <Link2 className="w-3 h-3" /> Sage
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-border px-3 py-1 text-xs font-medium text-text-secondary">
              <Link2 className="w-3 h-3" /> Xero
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-border px-3 py-1 text-xs font-medium text-text-secondary">
              <Link2 className="w-3 h-3" /> Foundation
            </span>
          </div>
        </div>
      </div>

      {/* Budget Performance Table */}
      <div className="bg-white border border-border rounded-xl p-6">
        <h2 className="text-lg font-serif font-semibold text-primary mb-4">
          Budget Performance
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 font-semibold text-secondary">Project</th>
                <th className="pb-3 font-semibold text-secondary text-right">Budget</th>
                <th className="pb-3 font-semibold text-secondary text-right">Spent</th>
                <th className="pb-3 font-semibold text-secondary text-right">Variance</th>
                <th className="pb-3 font-semibold text-secondary text-right">Variance %</th>
              </tr>
            </thead>
            <tbody>
              {budgetRows.map((row) => {
                const isOver = row.variance < 0;
                const colorClass = isOver ? 'text-danger' : 'text-success';
                return (
                  <tr key={row.name} className="border-b border-border/50 last:border-0">
                    <td className="py-3 text-primary font-medium">{row.name}</td>
                    <td className="py-3 text-right text-secondary">
                      {formatCurrency(row.budget)}
                    </td>
                    <td className="py-3 text-right text-secondary">
                      {formatCurrency(row.spent)}
                    </td>
                    <td className={`py-3 text-right font-medium ${colorClass}`}>
                      {isOver ? '-' : '+'}
                      {formatCurrency(Math.abs(row.variance))}
                    </td>
                    <td className={`py-3 text-right font-medium ${colorClass}`}>
                      {isOver ? '' : '+'}
                      {row.variancePct.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
