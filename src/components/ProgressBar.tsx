interface ProgressBarProps {
  value: number;
  label?: string;
  showPercent?: boolean;
}

export default function ProgressBar({
  value,
  label,
  showPercent = true,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="mb-1.5 flex items-center justify-between">
          {label && (
            <span className="text-sm text-text-secondary">{label}</span>
          )}
          {showPercent && (
            <span className="text-sm font-medium text-text-primary">
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-bg-secondary">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
