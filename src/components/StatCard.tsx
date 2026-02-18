import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-text-muted">{title}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <p className="text-2xl font-bold text-text-primary">{value}</p>
            {trend && trend !== "neutral" && (
              <span
                className={`flex items-center text-xs font-medium ${
                  trend === "up" ? "text-success" : "text-danger"
                }`}
              >
                {trend === "up" ? (
                  <TrendingUp className="mr-0.5 h-3 w-3" />
                ) : (
                  <TrendingDown className="mr-0.5 h-3 w-3" />
                )}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="mt-1 text-xs text-text-secondary">{subtitle}</p>
          )}
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-secondary">
          <Icon className="h-5 w-5 text-text-secondary" />
        </div>
      </div>
    </div>
  );
}
