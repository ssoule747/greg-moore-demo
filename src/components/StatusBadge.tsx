interface StatusBadgeProps {
  status: string;
}

const statusConfig: Record<
  string,
  { className: string; label: string }
> = {
  building: {
    className: "bg-success/10 text-success",
    label: "Building",
  },
  permitting: {
    className: "bg-warning/10 text-warning",
    label: "Permitting",
  },
  complete: {
    className: "bg-accent/10 text-accent",
    label: "Complete",
  },
  on_hold: {
    className: "bg-danger/10 text-danger",
    label: "On Hold",
  },
  planning: {
    className: "bg-blue-100 text-blue-700",
    label: "Planning",
  },
  approved: {
    className: "bg-success/10 text-success",
    label: "Approved",
  },
  pending: {
    className: "bg-warning/10 text-warning",
    label: "Pending",
  },
  rejected: {
    className: "bg-danger/10 text-danger",
    label: "Rejected",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] ?? {
    className: "bg-bg-secondary text-text-secondary",
    label: status,
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
