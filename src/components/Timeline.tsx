interface Milestone {
  id: string;
  name: string;
  date: string;
  completed: boolean;
}

interface TimelineProps {
  milestones: Milestone[];
}

export default function Timeline({ milestones }: TimelineProps) {
  return (
    <div className="relative">
      {milestones.map((milestone, index) => {
        const isLast = index === milestones.length - 1;

        return (
          <div key={milestone.id} className="relative flex gap-4 pb-6 last:pb-0">
            {/* Vertical connecting line */}
            {!isLast && (
              <div className="absolute left-[7px] top-4 h-full w-px bg-border" />
            )}

            {/* Dot */}
            <div className="relative z-10 mt-0.5 shrink-0">
              {milestone.completed ? (
                <div className="h-4 w-4 rounded-full bg-accent" />
              ) : (
                <div className="h-4 w-4 rounded-full border-2 border-accent bg-white" />
              )}
            </div>

            {/* Content */}
            <div className="flex flex-1 items-start justify-between gap-4">
              <p
                className={`text-sm ${
                  milestone.completed
                    ? "font-medium text-text-primary"
                    : "text-text-secondary"
                }`}
              >
                {milestone.name}
              </p>
              <span
                className={`shrink-0 text-xs ${
                  milestone.completed
                    ? "text-text-muted line-through"
                    : "text-text-secondary"
                }`}
              >
                {milestone.date}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
