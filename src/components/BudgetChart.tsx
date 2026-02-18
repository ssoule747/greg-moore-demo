import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BudgetCategory {
  name: string;
  estimated: number;
  actual: number;
  status: string;
}

interface BudgetChartProps {
  categories: BudgetCategory[];
}

function formatDollar(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

export default function BudgetChart({ categories }: BudgetChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={categories}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
        barGap={4}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E0DA" />
        <XAxis type="number" tickFormatter={formatDollar} />
        <YAxis
          type="category"
          dataKey="name"
          width={70}
          tick={{ fontSize: 13 }}
        />
        <Tooltip
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(value: any) =>
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            }).format(Number(value))
          }
        />
        <Legend />
        <Bar
          dataKey="estimated"
          name="Estimated"
          fill="#E5E0DA"
          radius={[0, 4, 4, 0]}
        />
        <Bar
          dataKey="actual"
          name="Actual"
          fill="#8B7355"
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
